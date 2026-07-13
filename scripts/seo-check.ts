import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import {
  ENGLISH_PRODUCTION_ORIGIN,
  approvedCommercialConsolidations,
  approvedRedirects,
  blockedStaticRoutes,
  blockedYachts,
  canonicalUrlForPath,
  commercialCandidateRegistry,
  englishRouteManifest,
  occasionDispositions,
  publishedStaticRoutes,
  routeGroups,
  searchConsoleAggregateBaseline,
  validateEnglishSeoOwnership,
  yachtCatalogueRegistry,
} from "../seo/index";
import { mediaRightsRegistry } from "../src/data/media-rights";
import { publishableYachts } from "../src/data/yachts";

const failures = validateEnglishSeoOwnership();
const read = (path: string) => readFile(resolve(path), "utf8");
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const routeFile = (path: string) => path === "/" ? "dist/index.html" : `dist/_static${path}.html`;
const matchAttr = (html: string, tag: string, attribute: string, value: string, target: string) =>
  html.match(new RegExp(`<${tag}[^>]*${attribute}=["']${escape(value)}["'][^>]*${target}=["']([^"']*)["'][^>]*>`, "i"))?.[1];

const titles = new Set<string>();
const descriptions = new Set<string>();
const canonicals = new Set<string>();
const h1s = new Set<string>();
const publishedYachtRoutes = publishedStaticRoutes.filter((route) => route.pageType === "yacht");
const publishedYachtsById = new Map(publishableYachts.map((yacht) => [yacht.id, yacht]));

if (yachtCatalogueRegistry.length !== 24) failures.push(`Yacht inventory must contain 24 dispositions; found ${yachtCatalogueRegistry.length}.`);
if (publishableYachts.length + blockedYachts.length !== 24) failures.push("Publishable and blocked yacht counts must total 24.");
if (publishedYachtRoutes.length !== publishableYachts.length) failures.push("Generated yacht route count must equal publishable yacht count.");
if (publishedYachtRoutes.some((route) => !publishedYachtsById.has(route.id))) failures.push("A yacht route was published without a strict publishable record.");

for (const yacht of publishableYachts) {
  const paths = yacht.media.map((media) => media.path);
  if (new Set(paths).size !== paths.length) failures.push(`${yacht.id}: duplicate media paths.`);
  for (const media of yacht.media) {
    const rights = mediaRightsRegistry.find((record) => record.id === media.rightsRecordId);
    if (!rights || rights.productionPath !== media.path || !rights.approvedHosts.includes("yachtrentaldxb.com")) {
      failures.push(`${yacht.id}: media lacks an exact approved English-domain rights record.`);
    }
    if (/^https:\/\//.test(media.path) && new URL(media.path).hostname !== new URL(rights?.productionPath ?? media.path).hostname) {
      failures.push(`${yacht.id}: remote media final authority is not allowlisted.`);
    }
  }
}

for (const route of publishedStaticRoutes) {
  const html = await read(routeFile(route.path));
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim() ?? "";
  const description = matchAttr(head, "meta", "name", "description", "content") ?? "";
  const robots = matchAttr(head, "meta", "name", "robots", "content") ?? "";
  const canonical = matchAttr(head, "link", "rel", "canonical", "href") ?? "";
  const ogUrl = matchAttr(head, "meta", "property", "og:url", "content") ?? "";
  const ogTitle = matchAttr(head, "meta", "property", "og:title", "content") ?? "";
  const ogDescription = matchAttr(head, "meta", "property", "og:description", "content") ?? "";
  const twitterTitle = matchAttr(head, "meta", "name", "twitter:title", "content") ?? "";
  const twitterDescription = matchAttr(head, "meta", "name", "twitter:description", "content") ?? "";
  const h1Matches = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1 = (h1Matches[0]?.[1] ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const expectedCanonical = canonicalUrlForPath(route.path);
  const visible = body.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&[a-z0-9#]+;/gi, " ").replace(/\s+/g, " ").trim();

  if (!/<html\s+lang="en"/i.test(html)) failures.push(`${route.path}: html lang must be en.`);
  if (!/<meta\s+charset="UTF-8"/i.test(head)) failures.push(`${route.path}: charset is missing.`);
  if (!/name="viewport"/i.test(head)) failures.push(`${route.path}: viewport is missing.`);
  if (!title || !description) failures.push(`${route.path}: title or description is missing.`);
  if ((head.match(/<title\b/gi) ?? []).length !== 1) failures.push(`${route.path}: exactly one title is required.`);
  if ((head.match(/<meta[^>]*name=["']description["']/gi) ?? []).length !== 1) failures.push(`${route.path}: exactly one description is required.`);
  if ((head.match(/<link[^>]*rel=["']canonical["']/gi) ?? []).length !== 1) failures.push(`${route.path}: exactly one canonical is required.`);
  if (robots.toLowerCase() !== "index, follow") failures.push(`${route.path}: robots must be index, follow.`);
  if (canonical !== expectedCanonical || ogUrl !== expectedCanonical) failures.push(`${route.path}: canonical/og:url mismatch.`);
  if (ogTitle !== title || twitterTitle !== title || ogDescription !== description || twitterDescription !== description) {
    failures.push(`${route.path}: social metadata does not match title/description.`);
  }
  if (h1Matches.length !== 1 || !h1) failures.push(`${route.path}: exactly one non-empty H1 is required.`);
  if (visible.length < 100) failures.push(`${route.path}: initial HTML lacks substantial visible text.`);
  if (/name=["']keywords["']/i.test(head)) failures.push(`${route.path}: meta keywords output is prohibited.`);
  if (/yachtrentaldxb\.netlify\.app|https:\/\/yacht-dxb\.com/i.test(head)) failures.push(`${route.path}: forbidden metadata authority.`);
  if (/hreflang\s*=|x-default/i.test(head)) failures.push(`${route.path}: live language alternates are prohibited.`);
  if (/<!--app-(?:head|html)-->/i.test(html)) failures.push(`${route.path}: static template markers remain.`);
  if ((route.path === "/yachts" || route.pageType === "yacht") && /evaliyachts?|evali yacht|evaliyacht\.com|evaliyachts\.com/i.test(`${head}\n${visible}`)) {
    failures.push(`${route.path}: inherited Evali branding or authority appears in generated yacht output.`);
  }

  const jsonLd = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  jsonLd.forEach((block, index) => {
    try {
      const parsed = JSON.parse(block[1]);
      const value = JSON.stringify(parsed);
      if (/LocalBusiness|Product|AggregateRating|Review|Event|FAQPage/.test(value)) {
        failures.push(`${route.path}: prohibited schema type in JSON-LD block ${index + 1}.`);
      }
    } catch {
      failures.push(`${route.path}: invalid JSON-LD block ${index + 1}.`);
    }
  });

  if (route.pageType === "yacht") {
    const yacht = publishedYachtsById.get(route.id);
    if (!yacht) {
      failures.push(`${route.path}: generated detail lacks a publishable record.`);
    } else {
      if (!visible.includes(yacht.name) || !visible.includes(`${yacht.pricePerHour.toLocaleString()}`)) {
        failures.push(`${route.path}: visible yacht facts do not match the strict record.`);
      }
      if (jsonLd.length !== 1) {
        failures.push(`${route.path}: exactly one JSON-LD block is required.`);
      } else {
        const value = JSON.parse(jsonLd[0][1]) as { "@graph"?: Array<Record<string, unknown>> };
        const graph = value["@graph"] ?? [];
        const service = graph.find((node) => node["@type"] === "Service");
        const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
        const offer = service?.offers as Record<string, unknown> | undefined;
        if (!service || !breadcrumb || graph.length !== 2) failures.push(`${route.path}: yacht schema must contain only Service and BreadcrumbList owners.`);
        if (offer?.["@type"] !== "Offer" || offer.price !== yacht.pricePerHour || offer.priceCurrency !== "AED" || offer.url !== expectedCanonical) {
          failures.push(`${route.path}: Offer does not match visible price and canonical ownership.`);
        }
      }
    }
  }

  if (titles.has(title)) failures.push(`${route.path}: duplicate title.`); else titles.add(title);
  if (descriptions.has(description)) failures.push(`${route.path}: duplicate description.`); else descriptions.add(description);
  if (canonicals.has(canonical)) failures.push(`${route.path}: duplicate canonical.`); else canonicals.add(canonical);
  if (h1s.has(h1)) failures.push(`${route.path}: duplicate H1.`); else h1s.add(h1);
}

const notFound = await read("dist/404.html");
if (!/name="robots" content="noindex, follow"/i.test(notFound)) failures.push("404 must be noindex, follow.");
if (/rel="canonical"/i.test(notFound)) failures.push("404 must not emit a canonical.");
if (!/data-static-status="404"/.test(notFound)) failures.push("404 hydration status marker is missing.");
if (/<!--app-(?:head|html)-->/i.test(notFound)) failures.push("404 contains an unresolved template marker.");

const publicSitemap = await read("public/sitemap.xml");
const builtSitemap = await read("dist/sitemap.xml");
if (publicSitemap !== builtSitemap) failures.push("Built and committed sitemaps differ.");
const sitemapUrls = [...publicSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedUrls = publishedStaticRoutes.map((route) => canonicalUrlForPath(route.path));
if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedUrls)) failures.push("Sitemap does not equal published manifest owners.");
if (/<lastmod>/.test(publicSitemap)) failures.push("Sitemap contains unverified lastmod values.");
if (sitemapUrls.length !== publishedStaticRoutes.length) failures.push(`Sitemap must equal generated indexable routes; found ${sitemapUrls.length}.`);
if (!blockedStaticRoutes.every((route) => !sitemapUrls.includes(canonicalUrlForPath(route.path)))) failures.push("Blocked route entered sitemap.");

const robots = await read("dist/robots.txt");
if (!robots.includes(`Sitemap: ${ENGLISH_PRODUCTION_ORIGIN}/sitemap.xml`)) failures.push("robots.txt has the wrong sitemap authority.");

const netlify = await read("netlify.toml");
const rewriteBlocks = [...netlify.matchAll(/\[\[redirects\]\]([\s\S]*?)(?=\n\[\[|$)/g)].map((match) => match[1]);
if (rewriteBlocks.length !== 3 + publishedYachtRoutes.length || rewriteBlocks.some((block) => !/status = 200/.test(block))) failures.push("Exact 200 rewrites must equal the three published hubs plus generated yacht details.");
if (/status = 30[12]/.test(netlify) || /from = "\/\*"/.test(netlify)) failures.push("Redirect or wildcard fallback found.");
if (approvedRedirects.length !== 0 || approvedCommercialConsolidations.length !== 0) failures.push("Evidence-gated approvals changed.");

const collectFiles = async (directory: string): Promise<string[]> => {
  const result: string[] = [];
  for (const entry of await readdir(directory)) {
    const path = join(directory, entry);
    if ((await stat(path)).isDirectory()) result.push(...await collectFiles(path));
    else result.push(path);
  }
  return result;
};
const distFiles = await collectFiles(resolve("dist"));
if (distFiles.some((file) => file.endsWith(".map"))) failures.push("Production source map found.");
const generatedHtml = distFiles.filter((file) => file.endsWith(".html"));
if (generatedHtml.length !== publishedStaticRoutes.length + 1) failures.push("Unexpected generated HTML page count.");
const generatedYachtFiles = generatedHtml.filter((file) => file.includes("/_static/yachts/") && file.endsWith(".html"));
if (generatedYachtFiles.length !== publishableYachts.length) failures.push("Generated yacht HTML count does not equal publishable yacht count.");
for (const route of blockedStaticRoutes) {
  if (generatedHtml.includes(resolve(routeFile(route.path)))) failures.push(`${route.path}: blocked route generated an HTML file.`);
}
for (const candidate of commercialCandidateRegistry) {
  if (generatedHtml.includes(resolve(routeFile(candidate.path)))) failures.push(`${candidate.path}: commercial candidate generated an HTML file.`);
}
if (!/for = "\/assets\/\*"[\s\S]*immutable/.test(netlify)) failures.push("Fingerprint asset immutable caching is missing.");
for (const protectedPath of ["/", "/404.html", "/robots.txt", "/sitemap.xml"]) {
  const block = netlify.match(new RegExp(`for = "${escape(protectedPath)}"([\\s\\S]*?)(?=\\n\\[\\[|$)`))?.[1] ?? "";
  if (/immutable/.test(block)) failures.push(`${protectedPath} must not be immutable-cached.`);
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Static SEO passed: ${publishedStaticRoutes.length} published routes, ${blockedStaticRoutes.length} blocked routes, one real 404 document.`);
console.log(`Manifest preserved: ${englishRouteManifest.length} routes (${routeGroups.static.length}/${routeGroups.yachts.length}/${routeGroups.services.length}).`);
console.log(`Yacht gates: ${yachtCatalogueRegistry.length} source records, ${publishableYachts.length} publishable, ${blockedYachts.length} blocked, ${publishedYachtRoutes.length} generated details.`);
console.log(`Evidence gates preserved: ${approvedRedirects.length} redirects, ${approvedCommercialConsolidations.length} consolidations, ${commercialCandidateRegistry.length} candidates, ${occasionDispositions.length} occasions.`);
console.log(`Search Console remains aggregate evidence (${searchConsoleAggregateBaseline.knownUrls} known URLs); no Search Console action was taken.`);
