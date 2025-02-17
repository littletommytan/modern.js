import { expect, describe, it } from 'vitest';
import { PluginAssetsRetry } from '@/plugins/assetsRetry';
import { createStubBuilder } from '@/stub/builder';

describe('plugins/assetsRetry', () => {
  it('should add assets retry plugin', async () => {
    const builder = await createStubBuilder({
      plugins: [PluginAssetsRetry()],
      builderConfig: {
        output: {
          assetsRetry: {},
        },
      },
    });
    const config = await builder.unwrapWebpackConfig();

    expect(config).toMatchSnapshot();
  });

  it("should't add assets retry plugin when target is set to 'node'", async () => {
    const builder = await createStubBuilder({
      plugins: [PluginAssetsRetry()],
      target: 'node',
      builderConfig: {
        output: {},
      },
    });
    const config = await builder.unwrapWebpackConfig();

    expect(config).toMatchSnapshot();
  });
});
