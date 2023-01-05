import { it, expect, describe } from 'vitest';
import { createStubBuilder } from '@modern-js/builder-webpack-provider/src/stub';
import { PluginImage } from '@modern-js/builder-webpack-provider/src/plugins/image';
import { PluginImageCompress } from '../src';

describe('plugin/image-compress', () => {
  it('should generate correct options', async () => {
    process.env.NODE_ENV = 'production';
    const builder = await createStubBuilder({
      plugins: [PluginImage(), PluginImageCompress()],
    });
    expect(await builder.unwrapWebpackConfig()).toMatchSnapshot();
    process.env.NODE_ENV = 'test';
  });
});
