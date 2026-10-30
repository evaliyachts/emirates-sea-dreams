import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { publishedStaticRoutes } from "../seo/index";
import { generateSitemapXml } from "./generate-sitemap";
import { validateProductionData } from "./validate-production-data";
import { getGeneratedStylesheetPath, inlineHomepageStylesheet } from "../src/lib/static-performance";

import { routeModulePreloads, type AssetManifest } from "../src/lib/route-preloads";

interface RenderResult { html: string; head: string }
interface ServerModule { renderStaticRoute(url: string, forceNotFound?: boolean): RenderResult }

const root = resolve(".");
const dist = resolve(root, "dist");
const serverOutput = resolve(root, ".static-ssr/entry-server.js");
const template = await readFile(resolve(dist, "index.html"), "utf8");
const generatedStylesheetPath = getGeneratedStylesheetPath(template);
const homepageStylesheet = await readFile(resolve(dist, generatedStylesheetPath.slice(1)), "utf8");
const homepageTemplate = inlineHomepageStylesheet(template, homepageStylesheet);
const assetManifest = JSON.parse(await readFile(resolve(dist, ".vite/manifest.json"), "utf8")) as AssetManifest;
validateProductionData();
const { renderStaticRoute } = (await import(pathToFileURL(serverOutput).href)) as ServerModule;

export const assembleStaticDocument = (
  source: string,
  rendered: RenderResult,
  staticStatus?: "404",
  modulePreloads = "",
) => {
  const rootAttribute = staticStatus ? ` id="root" data-static-status="${staticStatus}"` : ' id="root"';
  return source
    .replace("<!--app-head-->", `${rendered.head}\n${modulePreloads}`)
    .replace('<div id="root">', `<div${rootAttribute}>`)
    .replace("<!--app-html-->", rendered.html);
};

for (const route of publishedStaticRoutes) {
  const output = route.path === "/" ? resolve(dist, "index.html") : resolve(dist, `_static${route.path}.html`);
  await mkdir(resolve(output, ".."), { recursive: true });
  await writeFile(
    output,
    assembleStaticDocument(route.path === "/" ? homepageTemplate : template, renderStaticRoute(route.path), undefined, routeModulePreloads(assetManifest, route.path)),
  );
}

await writeFile(
  resolve(dist, "404.html"),
  assembleStaticDocument(template, renderStaticRoute("/__static-not-found__", true), "404", routeModulePreloads(assetManifest, "/__static-not-found__", true)),
);
await writeFile(resolve(dist, "sitemap.xml"), generateSitemapXml());
await cp(resolve(root, "public/robots.txt"), resolve(dist, "robots.txt"));
await rm(resolve(dist, ".vite/manifest.json"));
await rm(resolve(root, ".static-ssr"), { recursive: true, force: true });

console.log(`Static output written (${publishedStaticRoutes.length} indexable routes plus 404.html)`);
