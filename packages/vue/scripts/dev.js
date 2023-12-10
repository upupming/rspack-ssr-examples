// @ts-check

import { rspack } from '@rspack/core';
import { RspackDevServer } from '@rspack/dev-server';
import path from 'path';
import config from '../rspack.config';
import { normalizeAssets, requireFromString, hash } from './util';

async function main() {
  const compiler = rspack([
    {
      ...config,
      name: 'Client',
      entry: {
        client: './src/entry-client.ts',
      },
      mode: 'development',
      devtool: 'cheap-module-source-map',
      builtins: { noEmitAssets: false },
      stats: { preset: 'errors-warnings', timings: true, colors: true },
      target: 'web',
    },
    {
      ...config,
      name: 'Server',
      entry: {
        server: './src/entry-server.ts',
      },
      mode: 'development',
      devtool: 'cheap-module-source-map',
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
  const devServer = new RspackDevServer(
    {
      ...(config.devServer ?? {}),
      devMiddleware: { serverSideRender: true },
      hot: true,
      client: { overlay: { errors: true, warnings: false } },
      // Allow CodeSandbox to access dev server
      allowedHosts: 'all',
      setupMiddlewares(middlewares, devServer) {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        middlewares.push(async (req, res) => {
          const { devMiddleware } = res.locals.webpack;
          const outputFileSystem = devMiddleware.outputFileSystem;
          const jsonWebpackStats = devMiddleware.stats.toJson();
          const jsonWebpackStatsClient = jsonWebpackStats.children[0];
          const jsonWebpackStatsServer = jsonWebpackStats.children[1];
          const { assetsByChunkName, outputPath } = jsonWebpackStatsClient;

          if (req.originalUrl === '/') {
            let render = () => '';

            const serverChunkPath = path.join(
              jsonWebpackStatsServer.outputPath,
              jsonWebpackStatsServer.assetsByChunkName.server[
                jsonWebpackStatsServer.assetsByChunkName.server.length - 1
              ],
            );
            const serverChunkString = outputFileSystem
              .readFileSync(serverChunkPath)
              .toString();
            if (!serverChunkString) {
              throw new Error('Server entry compilation result is null!');
            }
            try {
              // TODO: get chunk hash from rspack directly
              render =
                requireFromString(
                  serverChunkString,
                  `${serverChunkPath}?hash=${hash(serverChunkString)}`,
                ).render || render;
            } catch (e) {
              throw new Error(
                'Load server entry compilation result failed',
                // @ts-ignore
                e?.message,
              );
            }

            // Then use `assetsByChunkName` for server-side rendering
            // For example, if you have only one main chunk:
            res.send(
              `
<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${normalizeAssets(jsonWebpackStatsServer.assetsByChunkName.server)
      .filter((path) => path.endsWith('.css'))
      .map((path) => `<link rel="stylesheet" href="${path}">`)
      .join('\n')}
    ${normalizeAssets(assetsByChunkName.client)
      .filter((path) => path.endsWith('.css'))
      .map((path) => `<link rel="stylesheet" href="${path}">`)
      .join('\n')}
    ${normalizeAssets(assetsByChunkName.client)
      .filter((path) => path.endsWith('.js'))
      .map((path) => `<script src="${path}" defer></script>`)
      .join('\n')}
  </head>
  <body>
    <div id="root">${await render()}</div>
  </body>
</html>
      `.trim(),
            );
          }
        });

        return middlewares;
      },
      // Make sure server entry modification will trigger re-render normally
      watchFiles: ['./src'],
    },
    compiler,
  );

  await devServer.start();
}

main();
