// @ts-check

import { rspack } from '@rspack/core';
import config from '../rspack.config';

async function main() {
  const compiler = rspack([
    {
      ...config,
      name: 'Client',
      entry: {
        client: './src/entry-client.jsx',
      },
      mode: 'production',
      devtool: 'source-map',
      builtins: { noEmitAssets: false },
      stats: { preset: 'errors-warnings', timings: true, colors: true },
      target: 'web',
    },
    {
      ...config,
      name: 'Server',
      entry: {
        server: './src/entry-server.jsx',
      },
      mode: 'production',
      devtool: 'source-map',
      builtins: { noEmitAssets: false },
      stats: { preset: 'errors-warnings', timings: true, colors: true },
      target: 'node',
      output: {
        library: {
          type: 'commonjs-module',
        },
      },
    },
  ]);

  await compiler.run((error, stats) => {
    if (error) {
      console.error(error);
      process.exit(2);
    }
    if (stats && stats.hasErrors()) {
      console.log('stats', stats.toString({}));
      process.exitCode = 1;
    }
    if (!compiler || !stats) {
      return;
    }
  });
}

main();
