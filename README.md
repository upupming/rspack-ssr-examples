# rspack-ssr-examples

Rspack Server-Side Rendering minimal examples, fully-extensible.

## Examples

### vanilla

Basic example using only vanilla JavaScript.

Two entry files are constructed for running in the server ([entry-server.ts](./packages/vanilla/src/entry-server.ts)) and client ([entry-client.ts](./packages/vanilla/src/entry-client.ts)).

We rewrite three simple scripts [dev.js](./packages/vanilla/scripts/dev.js), [build.js](./packages/vanilla/scripts/build.js) and [preview.js](./packages/vanilla/scripts/preview.js) to replace Rspack CLI's built-in command.

By running `pnpm dev`, `pnpm build` and `pnpm preview` in the directory, you can see the result of SSR, all rspack features are work normally.

### vue

Basic Vue SSR example.

### react

Basic React SSR example.
