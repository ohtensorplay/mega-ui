import { readdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { fileURLToPath, URL } from "node:url";
import type { Plugin } from "vite";

interface AiIconAsset {
  family: string;
  file: string;
  priority: number;
}

export const aiIconDirectory = fileURLToPath(new URL("../node_modules/@lobehub/icons-static-svg/icons", import.meta.url));
export const aiIconManifest = loadAiIconManifest();

function loadAiIconManifest(): Record<string, Omit<AiIconAsset, "priority">> {
  const assets = new Map<string, AiIconAsset>();
  for (const file of readdirSync(aiIconDirectory).filter((candidate) => candidate.endsWith(".svg"))) {
    const basename = file.replace(/\.svg$/i, "");
    const family = basename.replace(/-(?:color-text|text|color|combine|avatar)$/i, "");
    const key = normalizeAiIconName(family);
    const asset = { family, file, priority: aiIconVariantPriority(basename) };
    const current = assets.get(key);
    if (key && (!current || asset.priority > current.priority)) assets.set(key, asset);
  }
  if (assets.size < 300) throw new Error(`AI icon manifest is incomplete: found ${assets.size} families.`);
  return Object.fromEntries([...assets].map(([key, { family, file }]) => [key, { family, file }]));
}

function aiIconVariantPriority(file: string): number {
  if (file.endsWith("-color")) return 5;
  if (!/-(?:color-text|text|combine|avatar)$/.test(file)) return 4;
  if (file.endsWith("-avatar")) return 3;
  if (file.endsWith("-combine")) return 2;
  if (file.endsWith("-color-text")) return 1;
  return 0;
}

function normalizeAiIconName(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
}

export function aiIconAssetsPlugin(): Plugin {
  const allowedFiles = new Set(Object.values(aiIconManifest).map(({ file }) => file));
  return {
    name: "mega-ai-icon-assets",
    configureServer(server) {
      server.middlewares.use("/ai-icons", (request, response, next) => {
        void (async () => {
          const file = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname).replace(/^\//, "");
          if (!allowedFiles.has(file)) {
            next();
            return;
          }
          response.statusCode = 200;
          response.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
          response.setHeader("Cache-Control", "public, max-age=3600");
          response.end(await readFile(`${aiIconDirectory}/${file}`));
        })().catch(next);
      });
    },
    async generateBundle() {
      for (const file of allowedFiles) {
        this.emitFile({ type: "asset", fileName: `ai-icons/${file}`, source: await readFile(`${aiIconDirectory}/${file}`) });
      }
    },
  };
}
