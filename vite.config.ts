import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import { fileURLToPath, URL } from "node:url";

// 内存监控
// if (process.env.NODE_ENV === "development") {
//   setInterval(() => {
//     const used = process.memoryUsage();
//     console.log(
//       `🧠 Memory | RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB | Heap: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`
//     );
//   }, 10000);
// }

export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  build: {
    target: "esnext",
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // 建议增加分包策略，配合 chunkSizeWarningLimit
        manualChunks: (id: string | string[]) => {
          if (id.includes("node_modules")) {
            // 核心框架
            if (id.includes("vue") || id.includes("vue-router") || id.includes("pinia")) {
              return "vue-core";
            }
            // UI 库
            if (id.includes("naive-ui")) {
              return "naive-ui";
            }
            // 图表
            if (id.includes("echarts")) {
              return "echarts";
            }
            // 其余第三方库
            return "vendor";
          }
        },
      },
    },
  },

  server: {
    hmr: { overlay: true },
    watch: {
      ignored: ["**/node_modules/**", "**/dist/**"],
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        implementation: (await import("sass-embedded")).default,
        silenceDeprecations: ["legacy-js-api"],
      } as any,
    },
  },
})
