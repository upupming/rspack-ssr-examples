import App from "./App.vue";
import { renderToString } from 'vue/server-renderer'
import { createSSRApp } from "vue";

export async function render() {
  const app = createSSRApp(App)
  const html = await renderToString(app)
  return html
}
