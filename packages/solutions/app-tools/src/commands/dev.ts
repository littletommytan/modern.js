import { PluginAPI, ResolvedConfigContext } from '@modern-js/core';
import { createFileWatcher } from '../utils/createFileWatcher';
import { printInstructions } from '../utils/printInstructions';
import {
  setServer,
  createServer,
  injectDataLoaderPlugin,
} from '../utils/createServer';
import { generateRoutes } from '../utils/routes';
import { DevOptions } from '../utils/types';
import { getSpecifiedEntries } from '../utils/getSpecifiedEntries';
import { buildServerConfig } from '../utils/config';
import type { AppTools } from '../types';
import { getServerInternalPlugins } from '../utils/getServerInternalPlugins';

export const dev = async (api: PluginAPI<AppTools>, options: DevOptions) => {
  if (options.analyze) {
    // Builder will read this env var to enable bundle analyzer
    process.env.BUNDLE_ANALYZE = 'true';
  }
  let normalizedConfig = api.useResolvedConfigContext();
  const appContext = api.useAppContext();
  const hookRunners = api.useHookRunners();

  normalizedConfig = { ...normalizedConfig, cliOptions: options };
  ResolvedConfigContext.set(normalizedConfig);

  const {
    appDirectory,
    distDirectory,
    port,
    apiOnly,
    entrypoints,
    serverConfigFile,
  } = appContext;
  const checkedEntries = await getSpecifiedEntries(
    options.entry || false,
    entrypoints,
  );

  api.setAppContext({
    ...appContext,
    checkedEntries,
  });
  appContext.checkedEntries = checkedEntries;

  await buildServerConfig({
    appDirectory,
    distDirectory,
    configFile: serverConfigFile,
    options: {
      esbuildOptions: {
        watch: true,
      },
    },
  });

  await hookRunners.beforeDev();

  if (!appContext.builder && !apiOnly) {
    throw new Error(
      'Expect the Builder to have been initialized, But the appContext.builder received `undefined`',
    );
  }

  await generateRoutes(appContext);
  const serverInternalPlugins = await getServerInternalPlugins(api);

  const serverOptions = {
    dev: {
      port,
      https: normalizedConfig.dev.https,
      ...normalizedConfig.tools?.devServer,
    },
    pwd: appDirectory,
    config: normalizedConfig,
    serverConfigFile,
    internalPlugins: injectDataLoaderPlugin(serverInternalPlugins),
  };

  if (apiOnly) {
    const app = await createServer({
      ...serverOptions,
      compiler: null,
    });
    app.listen(port, async (err: Error) => {
      if (err) {
        throw err;
      }
      printInstructions(hookRunners, appContext, normalizedConfig);
    });
  } else {
    const { server } = await appContext.builder!.startDevServer({
      printURLs: false,
      serverOptions,
    });
    setServer(server);
  }

  await createFileWatcher(
    appContext,
    normalizedConfig.source.configDir,
    hookRunners,
  );
};
