# rspack-ssr-examples

<!-- https://codesandbox.io/docs/tutorial/convert-browser-sandbox-cloud#convert-into-a-devbox-via-url -->
<!-- 必须自己先 Import from GitHub，别人打开才是 devbox，否则别人打开是 sandbox -->
[![Edit](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/upupming/rspack-ssr-examples)

Rspack Server-Side Rendering minimal examples, fully-extensible.

## Examples

### vanilla

See deployed example: https://rspack-vanilla-example.vercel.app/

Basic example using only vanilla JavaScript.

Two entry files are constructed for running in the server ([entry-server.ts](./packages/vanilla/src/entry-server.ts)) and client ([entry-client.ts](./packages/vanilla/src/entry-client.ts)).

We rewrite three simple scripts [dev.js](./packages/vanilla/scripts/dev.js), [build.js](./packages/vanilla/scripts/build.js) and [preview.js](./packages/vanilla/scripts/preview.js) to replace Rspack CLI's built-in command.

By running `pnpm dev`, `pnpm build` and `pnpm preview` in the directory, you can see the result of SSR, all rspack features are work normally.

### vue

See deployed example: https://rspack-vue-example.vercel.app/

Basic Vue SSR example, add Vue support to vanilla example.

### react

See deployed example: https://rspack-react-example.vercel.app/

Basic React SSR example, add React support to vanilla example.

## License

MIT
