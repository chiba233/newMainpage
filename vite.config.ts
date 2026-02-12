import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import { fileURLToPath, URL } from "node:url";

setInterval(() => {
  const used = process.memoryUsage();
  console.log(`内存占用: RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB, HeapUsed: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`);
}, 5000);

export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      // 这种写法在 TS 5 + Vite 7 中最稳定
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        implementation: "sass-embedded",
        silenceDeprecations: ["legacy-js-api"],
      } as any,
    },
  },
});
