const rspack = require('@rspack/core');
/** @type {import('@rspack/cli').Configuration} */
const config = {
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              externalHelpers: true,
              preserveAllComments: false,
              transform: {
                react: {
                  runtime: 'automatic',
                  throwIfNamespace: true,
                  useBuiltins: false,
                },
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.(png|svg|jpg)$/,
        // TODO: asset/resource will render different URL in server and client (with host), need fix
        // type: 'asset/resource',
        type: 'asset/inline',
      },
    ],
  },
};
module.exports = config;
