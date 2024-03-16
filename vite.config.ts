import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import Icons from "unplugin-icons/vite";
// import { nodePolyfills } from "vite-plugin-node-polyfills";

import vueJsx from "@vitejs/plugin-vue-jsx";

import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  define: {
    __API_URL__: 1,
    "process.env.A": 1,
  },
  plugins: [
    vue(),
    vueJsx(),
    wasm(),
    Icons(),
    // {
    //   ...nodePolyfills({
    //     globals: {
    //       process: true,
    //     },
    //   }),
    //   enforce: "pre",
    // },
  ],
  server: {
    port: 8001,
    host: "localhost",
    https: false,
  },
});
