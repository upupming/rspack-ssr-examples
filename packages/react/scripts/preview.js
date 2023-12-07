// @ts-check

import { rspack } from '@rspack/core';
import { RspackDevServer } from '@rspack/dev-server';
import path from 'path';

async function main() {
  const compiler = rspack({ entry: {} });
  const devServer = new RspackDevServer(
    {
      static: {
        directory: './dist',
        publicPath: '/',
      },
      devMiddleware: { serverSideRender: true },
      setupMiddlewares(middlewares, devServer) {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        middlewares.unshift(async (req, res, next) => {
          if (req.originalUrl === '/') {
            let render = () => '';

            // TODO: read from some meta file
            const serverChunkPath = path.join(process.cwd(), 'dist/server.js');
            try {
              render = require(serverChunkPath).render || render;
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
    <link rel="stylesheet" href="server.css">
    <link rel="stylesheet" href="client.css">
    <script src="client.js" defer></script>
  </head>
  <body>
    <div id="root">${await render()}</div>
  </body>
</html>
      `.trim(),
            );
          } else {
            next();
          }
        });

        return middlewares;
      },
    },
    compiler,
  );

  await devServer.start();
}

main();
