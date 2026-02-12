import { defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import { fileURLToPath, URL } from "node:url";
import type { Compiler } from "sass";


export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const isProd = mode === "production";
  const isDev = mode === "development";

  const sassModule = isDev
    ? (await import("sass") as unknown as { default: Compiler })
    : (await import("sass-embedded") as unknown as { default: Compiler });

  const sassImpl = sassModule.default;

  return {
    plugins: [
      vue(),
      svgLoader({ svgo: isProd }),
    ],
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
          manualChunks: (id: string) => {
            if (id.includes("node_modules")) {
              if (id.includes("vue") || id.includes("vue-router") || id.includes("pinia")) {
                return "vue-core";
              }
              if (id.includes("naive-ui")) {
                return "naive-ui";
              }
              if (id.includes("echarts")) {
                return "echarts";
              }
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
          implementation: sassImpl,
          silenceDeprecations: ["legacy-js-api"],
        } as any,
      },
    },
  };
});