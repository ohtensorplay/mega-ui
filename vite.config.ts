import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import { aiIconAssetsPlugin, aiIconManifest } from "./scripts/ai-icon-library";

const externalDependency = /^(?:vue|vue-router|pinia|marked|katex|@lucide\/vue|@fortawesome\/free-brands-svg-icons)(?:\/|$)/;

export default defineConfig({
  plugins: [vue(), aiIconAssetsPlugin()],
  define: { __AI_ICON_MANIFEST__: JSON.stringify(aiIconManifest) },
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: "index",
      cssFileName: "mega-ui",
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: (id) => externalDependency.test(id),
      output: {
        assetFileNames: (asset) => asset.name === "mega-ui.css" ? "mega-ui.css" : "assets/[name]-[hash][extname]",
      },
    },
  },
});
