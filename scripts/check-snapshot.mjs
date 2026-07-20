import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const manifest = JSON.parse(await readFile(resolve(repositoryRoot, "SNAPSHOT.json"), "utf8"));
const expected = new Map(Object.entries(manifest.files));
const failures = [];

for (const [relativePath, digest] of expected) {
  const localPath = resolve(repositoryRoot, relativePath);
  try {
    const actual = sha256(await readFile(localPath));
    if (actual !== digest) failures.push(`${relativePath}: local content differs from the imported snapshot`);
  } catch (error) {
    failures.push(`${relativePath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

for (const directory of ["src/shared/ui"]) {
  for (const path of await walk(resolve(repositoryRoot, directory))) {
    const relativePath = relative(repositoryRoot, path);
    if (!expected.has(relativePath)) failures.push(`${relativePath}: file is not declared in SNAPSHOT.json`);
  }
}

const upstreamFlag = process.argv.indexOf("--upstream");
if (upstreamFlag >= 0) {
  const upstreamRoot = resolve(repositoryRoot, process.argv[upstreamFlag + 1] || "../mega-hub/web");
  for (const relativePath of expected.keys()) {
    const upstreamPath = relativePath.startsWith("scripts/")
      ? resolve(upstreamRoot, relativePath)
      : resolve(upstreamRoot, relativePath);
    try {
      if (sha256(await readFile(upstreamPath)) !== expected.get(relativePath)) {
        failures.push(`${relativePath}: upstream Hub content differs from the imported snapshot`);
      }
    } catch (error) {
      failures.push(`${relativePath}: cannot read upstream source (${error instanceof Error ? error.message : String(error)})`);
    }
  }
}

if (failures.length > 0) {
  console.error(`MEGA UI snapshot check failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}
console.log(`MEGA UI snapshot verified (${expected.size} files, Hub commit ${manifest.sourceCommit}).`);

async function walk(path) {
  const output = [];
  for (const entry of await readdir(path)) {
    const child = resolve(path, entry);
    if ((await stat(child)).isDirectory()) output.push(...await walk(child));
    else output.push(child);
  }
  return output;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
