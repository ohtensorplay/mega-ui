import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourceRoot = resolve(process.env.MEGA_HUB_WEB_SOURCE?.trim() || resolve(repositoryRoot, "../mega-hub/web"));
const copiedPaths = [
  "src/design-system.css",
  "src/settings-system.css",
  "src/shared/ui",
  "src/shared/content/markdown-renderer.ts",
  "src/shared/content/markdown-math.ts",
  "src/shared/lib/ai-application-logo.ts",
  "src/katex-auto-render.d.ts",
  "scripts/ai-icon-library.ts"
];

for (const copiedPath of copiedPaths) {
  const source = resolve(sourceRoot, copiedPath);
  const target = resolve(repositoryRoot, copiedPath);
  await stat(source);
  await rm(target, { recursive: true, force: true });
  await mkdir(dirname(target), { recursive: true });
  await cp(source, target, { recursive: true, preserveTimestamps: true });
}

const componentDirectory = resolve(repositoryRoot, "src/shared/ui");
const components = (await readdir(componentDirectory))
  .filter((name) => name.endsWith(".vue"))
  .sort((left, right) => left.localeCompare(right));
const entry = [
  'import "./design-system.css";',
  'import "./settings-system.css";',
  "",
  ...components.map((name) => `export { default as ${name.slice(0, -4)} } from "./shared/ui/${name}";`),
  'export * from "./shared/ui/notice";',
  'export type { MarkdownHeading, MarkdownRenderOptions } from "./shared/content/markdown-renderer";',
  'export { aiApplicationIconNames, matchAiApplicationIcon, resolveAiApplicationLogo } from "./shared/lib/ai-application-logo";',
  "",
].join("\n");
await writeFile(resolve(repositoryRoot, "src/index.ts"), entry);

const files = await collectSnapshotFiles();
const sourceCommit = execFileSync("git", ["-C", sourceRoot, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const manifest = {
  schemaVersion: 1,
  source: "mega-hub/web",
  sourceCommit,
  files: Object.fromEntries(await Promise.all(files.map(async (path) => [
    relative(repositoryRoot, path),
    sha256(await readFile(path)),
  ]))),
};
await writeFile(resolve(repositoryRoot, "SNAPSHOT.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Copied ${files.length} verified source files from ${sourceRoot}.`);

async function collectSnapshotFiles() {
  const output = [];
  for (const copiedPath of copiedPaths) await walk(resolve(repositoryRoot, copiedPath), output);
  return output.sort((left, right) => left.localeCompare(right));
}

async function walk(path, output) {
  const metadata = await stat(path);
  if (metadata.isFile()) {
    output.push(path);
    return;
  }
  for (const entry of await readdir(path)) await walk(resolve(path, entry), output);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
