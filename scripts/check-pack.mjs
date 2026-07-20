import { execFileSync } from "node:child_process";

const output = execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], { encoding: "utf8" });
const [result] = JSON.parse(output);
const files = new Set(result.files.map(({ path }) => path));
const required = ["dist/index.js", "dist/mega-ui.css", "dist/types/index.d.ts", "package.json", "README.md", "SNAPSHOT.json"];
const forbiddenPrefixes = ["src/", "scripts/", ".github/", "node_modules/"];
const failures = [
  ...required.filter((path) => !files.has(path)).map((path) => `missing ${path}`),
  ...[...files].filter((path) => forbiddenPrefixes.some((prefix) => path.startsWith(prefix))).map((path) => `unexpected source file ${path}`),
];

if (failures.length > 0) {
  console.error(`npm package check failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}

console.log(`npm package verified: ${result.filename}, ${result.entryCount} files, ${result.size} bytes.`);
