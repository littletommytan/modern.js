import { join, resolve } from 'path';
import { expect, test } from '@modern-js/e2e/playwright';
import { build, getHrefByEntryName } from '../scripts/shared';
import { webpackOnlyTest, allProviderTest } from './helper';

const fixtures = resolve(__dirname, '../fixtures/source');

test.describe('source configure multi', () => {
  let builder: Awaited<ReturnType<typeof build>>;

  test.beforeAll(async () => {
    builder = await build(
      {
        cwd: join(fixtures, 'basic'),
        entry: {
          main: join(fixtures, 'basic/src/index.js'),
        },
      },
      {
        source: {
          alias: {
            '@common': './src/common',
          },
          preEntry: ['./src/pre.js'],
        },
      },
    );
  });

  allProviderTest('alias', async ({ page }) => {
    await page.goto(getHrefByEntryName('main', builder.port));
    await expect(page.innerHTML('#test')).resolves.toBe('Hello Builder! 1');
  });

  allProviderTest('pre-entry', async ({ page }) => {
    await page.goto(getHrefByEntryName('main', builder.port));
    await expect(page.innerHTML('#test-el')).resolves.toBe('aaaaa');
  });
});

webpackOnlyTest('module-scopes', async ({ page }) => {
  const buildOpts = {
    cwd: join(fixtures, 'module-scopes'),
    entry: {
      main: join(fixtures, 'module-scopes/src/index.js'),
    },
  };

  await expect(
    build(buildOpts, {
      source: {
        moduleScopes: ['./src'],
      },
    }),
  ).rejects.toThrowError('webpack build failed!');

  let builder = await build(buildOpts, {});

  await page.goto(getHrefByEntryName('main', builder.port));

  await expect(page.innerHTML('#test')).resolves.toBe('Hello Builder! 1');

  // should not throw
  builder = await build(buildOpts, {
    source: {
      moduleScopes: ['./src', './common'],
    },
  });
});

allProviderTest('resolve-extension-prefix', async ({ page }) => {
  const buildOpts = {
    cwd: join(fixtures, 'resolve-extension-prefix'),
    entry: {
      main: join(fixtures, 'resolve-extension-prefix/src/index.js'),
    },
  };

  // ex.js take effect when not set resolveExtensionPrefix
  let builder = await build(buildOpts);
  await page.goto(getHrefByEntryName('main', builder.port));
  await expect(page.innerHTML('#test-el')).resolves.toBe('aaaaa');

  // ex.web.js take effect when set resolveExtensionPrefix
  builder = await build(buildOpts, {
    source: {
      resolveExtensionPrefix: '.web',
    },
  });
  await page.goto(getHrefByEntryName('main', builder.port));
  await expect(page.innerHTML('#test-el')).resolves.toBe('web');
});

allProviderTest('global-vars & tsConfigPath', async ({ page }) => {
  const buildOpts = {
    cwd: join(fixtures, 'global-vars'),
    entry: {
      main: join(fixtures, 'global-vars/src/index.ts'),
    },
  };

  const builder = await build(buildOpts, {
    source: {
      globalVars: {
        ENABLE_TEST: true,
      },
    },
  });
  await page.goto(getHrefByEntryName('main', builder.port));
  await expect(
    page.evaluate(`document.getElementById('test-el').innerHTML`),
  ).resolves.toBe('aaaaa');

  await expect(
    page.evaluate(`document.getElementById('test-alias-el').innerHTML`),
  ).resolves.toBe('alias work correctly');
});

allProviderTest('define', async ({ page }) => {
  const buildOpts = {
    cwd: join(fixtures, 'global-vars'),
    entry: {
      main: join(fixtures, 'global-vars/src/index.ts'),
    },
  };

  const builder = await build(buildOpts, {
    source: {
      define: {
        ENABLE_TEST: JSON.stringify(true),
      },
    },
  });
  await page.goto(getHrefByEntryName('main', builder.port));
  await expect(
    page.evaluate(`document.getElementById('test-el').innerHTML`),
  ).resolves.toBe('aaaaa');
});
