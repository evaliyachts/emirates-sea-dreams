import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ENGLISH_PRODUCTION_ORIGIN,
  approvedCommercialConsolidations,
  approvedRedirects,
  commercialCandidateRegistry,
  englishRouteManifest,
  occasionDispositions,
  routeGroups,
  searchConsoleAggregateBaseline,
  validateEnglishSeoOwnership,
} from "../seo/index";

const repositoryRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const read = (path: string) => readFile(resolve(repositoryRoot, path), "utf8");
const productionUrl = `${ENGLISH_PRODUCTION_ORIGIN}/`;
const previewHost = "yachtrentaldxb.netlify.app";
const html = await read("dist/index.html");
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
const failures = validateEnglishSeoOwnership();

const requireMatch = (pattern: RegExp, message: string) => {
  if (!pattern.test(html)) failures.push(message);
};

requireMatch(/<title>[^<]+<\/title>/i, "Homepage title is missing.");
requireMatch(/<meta\s+name=["']description["']\s+content=["'][^"']+["']/i, "Homepage description is missing.");
requireMatch(
  new RegExp(`<link\\s+rel=["']canonical["']\\s+href=["']${productionUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i"),
  "Homepage canonical is not the exact production URL.",
);

const robots = head.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i)?.[1] ?? "";
if (/noindex/i.test(robots)) failures.push("Homepage robots directive contains noindex.");

const h1Count = (body.match(/<h1\b/gi) ?? []).length;
if (h1Count !== 1) failures.push(`Homepage initial HTML must contain one H1; found ${h1Count}.`);

const visibleText = body
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--([\s\S]*?)-->/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();
if (visibleText.length < 100) failures.push("Homepage initial HTML lacks substantial visible content.");

const jsonLdBlocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
if (jsonLdBlocks.length === 0) failures.push("Homepage initial HTML has no JSON-LD.");
jsonLdBlocks.forEach((block, index) => {
  try {
    JSON.parse(block[1]);
  } catch {
    failures.push(`Homepage JSON-LD block ${index + 1} is invalid JSON.`);
  }
});

if (head.includes(previewHost)) failures.push("Preview hostname appears in production metadata.");
if (/hreflang\s*=|x-default/i.test(html)) failures.push("Live hreflang or x-default output is present.");

const sitemap = await read("public/sitemap.xml");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapPaths = sitemapUrls.map((url) => {
  const parsed = new URL(url);
  if (parsed.origin !== ENGLISH_PRODUCTION_ORIGIN) failures.push(`Sitemap uses a forbidden authority: ${url}`);
  return parsed.pathname;
});
const manifestPaths = englishRouteManifest.map((route) => route.path);
if (new Set(sitemapUrls).size !== sitemapUrls.length) failures.push("Sitemap contains duplicate canonical URLs.");
if (JSON.stringify([...sitemapPaths].sort()) !== JSON.stringify([...manifestPaths].sort())) {
  failures.push("Current sitemap URL set does not exactly match the 52-record ownership manifest.");
}

const sourceFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory);
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry);
    const details = await stat(path);
    if (details.isDirectory()) {
      if (entry !== "test") files.push(...(await sourceFiles(path)));
    } else if (/\.(ts|tsx)$/.test(entry)) {
      files.push(path);
    }
  }
  return files;
};

const runtimeSources = await sourceFiles(resolve(repositoryRoot, "src"));
const runtimeSource = (await Promise.all(runtimeSources.map((file) => readFile(file, "utf8")))).join("\n");
if (/from\s+["'][^"']*(?:\/seo|@\/seo)/.test(runtimeSource)) {
  failures.push("The PR 2 ownership manifest is imported by production runtime code.");
}

const netlifyConfig = await read("netlify.toml");
if (/\[\[redirects\]\]/.test(netlifyConfig)) failures.push("PR 2 must not emit a Netlify redirect.");

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Homepage SEO baseline passed (${jsonLdBlocks.length} valid JSON-LD blocks).`);
console.log(
  `Route ownership passed: ${englishRouteManifest.length} routes (${routeGroups.static.length} static/hub/support, ${routeGroups.yachts.length} yachts, ${routeGroups.services.length} services).`,
);
console.log(
  `Evidence gates passed: ${commercialCandidateRegistry.length} commercial candidates, ${occasionDispositions.length} occasion decisions, ${approvedRedirects.length} approved redirects, ${approvedCommercialConsolidations.length} approved consolidations.`,
);
console.log(
  `Search Console remains aggregate evidence: ${searchConsoleAggregateBaseline.knownUrls} known URLs did not create additional routes.`,
);
console.log("Inner-route HTTP repair remains deferred to Implementation PR 3; 51 sitemap inner routes are not asserted as 200 here.");
