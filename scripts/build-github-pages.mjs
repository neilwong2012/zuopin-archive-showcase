import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const outputRoot = resolve(projectRoot, ".github-pages");
const clientRoot = resolve(projectRoot, "dist/client");
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/").at(-1) || "zuopin-archive-showcase";
const basePath = `/${repositoryName}`;
const pagesOrigin = `https://neilwong2012.github.io${basePath}`;
const sitesOrigin = "https://zuopin-archive-neil.neil-wong2012.chatgpt.site";

if (!outputRoot.endsWith("/.github-pages")) {
  throw new Error(`Unexpected Pages output directory: ${outputRoot}`);
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(clientRoot, outputRoot, { recursive: true });

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("github-pages-build", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://neilwong2012.github.io/", { headers: { accept: "text/html" } }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Static render failed with HTTP ${response.status}`);
}

await writeFile(join(outputRoot, "index.html"), await response.text());

const textExtensions = new Set([".html", ".js", ".css", ".json", ".xml", ".txt", ""]);
const assetRoots = ["/assets/", "/source-assets/", "/works/", "/og.png"];

function rewriteAbsoluteRoot(text, assetRoot) {
  const escapedRoot = assetRoot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const absoluteRootPattern = new RegExp(`(^|[^.A-Za-z0-9_-])${escapedRoot}`, "g");
  return text.replace(
    absoluteRootPattern,
    (_, prefix) => `${prefix}${basePath}${assetRoot}`,
  );
}

async function rewriteTree(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteTree(absolute);
      continue;
    }
    if (!textExtensions.has(extname(entry.name))) continue;

    let text = await readFile(absolute, "utf8");
    text = text.replaceAll(sitesOrigin, pagesOrigin);
    for (const assetRoot of assetRoots) {
      text = rewriteAbsoluteRoot(text, assetRoot);
    }
    for (const relativePrefix of [`./${repositoryName}/`, `../${repositoryName}/`]) {
      if (text.includes(relativePrefix)) {
        throw new Error(`Repository base path was inserted into a relative URL: ${absolute}`);
      }
    }
    await writeFile(absolute, text);
  }
}

await rewriteTree(outputRoot);

const indexPath = join(outputRoot, "index.html");
const indexHtml = await readFile(indexPath, "utf8");
for (const assetRoot of assetRoots) {
  if (indexHtml.includes(`"${assetRoot}`) || indexHtml.includes(`'${assetRoot}`)) {
    throw new Error(`Unprefixed asset path remains in index.html: ${assetRoot}`);
  }
}

await writeFile(join(outputRoot, ".nojekyll"), "");
await writeFile(join(outputRoot, "404.html"), indexHtml);
await writeFile(
  join(outputRoot, "pages-build.json"),
  JSON.stringify(
    {
      repository: `neilwong2012/${repositoryName}`,
      basePath,
      sourceCommit: process.env.GITHUB_SHA || null,
      generatedAt: new Date().toISOString(),
      works: 26,
      routes: 100,
    },
    null,
    2,
  ),
);

console.log(`GitHub Pages artifact created at ${outputRoot}`);
console.log(`Base path: ${basePath}`);
