import {
  ENGLISH_PRODUCTION_ORIGIN,
  blockedStaticRoutes,
  canonicalUrlForPath,
  commercialCandidateRegistry,
  publishedStaticRoutes,
} from "../seo/index";

const baseArgument = process.argv.find((argument) => argument.startsWith("--base="));
const base = new URL(baseArgument?.slice("--base=".length) || ENGLISH_PRODUCTION_ORIGIN);
const checkDefaultHost = process.argv.includes("--check-default-host");
const failures: string[] = [];

const fetchManual = (url: URL) => fetch(url, {
  redirect: "manual",
  headers: { "user-agent": "Dubai-Yacht-Release-QA/1.0" },
});

const attribute = (html: string, tag: string, key: string, value: string, target: string) =>
  html.match(new RegExp(`<${tag}[^>]*${key}=["']${value}["'][^>]*${target}=["']([^"']*)["'][^>]*>`, "i"))?.[1] ?? "";

const visibleText = (value: string) => value
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&[a-z0-9#]+;/gi, " ")
  .replace(/\s+/g, " ")
  .trim();

const publishedPaths = new Set(publishedStaticRoutes.map((route) => route.path));
const blockedPaths = new Set([
  ...blockedStaticRoutes.map((route) => route.path),
  ...commercialCandidateRegistry.map((candidate) => candidate.path),
]);
const titles = new Set<string>();
const descriptions = new Set<string>();
const h1s = new Set<string>();

const crawlPublished = async (path: string) => {
  const url = new URL(path, base);
  const response = await fetchManual(url);
  const html = await response.text();
  if (response.status !== 200) failures.push(`${path}: expected 200, received ${response.status}.`);
  if (response.headers.has("location")) failures.push(`${path}: published owner emitted a Location header.`);

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim() ?? "";
  const description = attribute(html, "meta", "name", "description", "content");
  const robots = attribute(html, "meta", "name", "robots", "content");
  const canonical = attribute(html, "link", "rel", "canonical", "href");
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1 = visibleText(h1Matches[0]?.[1] ?? "");
  const expectedCanonical = canonicalUrlForPath(path);

  if (!title || titles.has(title)) failures.push(`${path}: missing or duplicate title.`); else titles.add(title);
  if (!description || descriptions.has(description)) failures.push(`${path}: missing or duplicate description.`); else descriptions.add(description);
  if (h1Matches.length !== 1 || !h1 || h1s.has(h1)) failures.push(`${path}: missing, repeated or duplicate H1.`); else h1s.add(h1);
  if (canonical !== expectedCanonical) failures.push(`${path}: expected self-canonical ${expectedCanonical}; found ${canonical || "none"}.`);
  if (robots.toLowerCase() !== "index, follow") failures.push(`${path}: indexable robots state is invalid.`);
  if (/name=["']keywords["']|hreflang\s*=|x-default|yachtrentaldxb\.netlify\.app|https:\/\/yacht-dxb\.com/i.test(html)) {
    failures.push(`${path}: prohibited metadata or authority found.`);
  }
  if (visibleText(html).length < 100) failures.push(`${path}: route-specific initial text is missing.`);

  for (const block of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(block[1]); } catch { failures.push(`${path}: invalid JSON-LD.`); }
  }

  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    const href = match[1].replace(/&amp;/g, "&");
    if (href.startsWith("#") || /^(?:mailto|tel|javascript):/i.test(href)) continue;
    const target = new URL(href, new URL(path, ENGLISH_PRODUCTION_ORIGIN));
    if (target.origin !== ENGLISH_PRODUCTION_ORIGIN) continue;
    if (!publishedPaths.has(target.pathname)) failures.push(`${path}: internal link targets unpublished path ${target.pathname}.`);
    if (blockedPaths.has(target.pathname)) failures.push(`${path}: internal link targets blocked path ${target.pathname}.`);
  }
};

for (const route of publishedStaticRoutes) await crawlPublished(route.path);

const expectedBlocked = [
  ...blockedStaticRoutes.map((route) => route.path),
  ...commercialCandidateRegistry.map((candidate) => candidate.path),
  "/yachts/not-a-published-yacht",
  "/services/not-an-approved-service",
  "/pr9-unknown-route",
];
for (const path of expectedBlocked) {
  const response = await fetchManual(new URL(path, base));
  const html = await response.text();
  if (response.status !== 404) failures.push(`${path}: expected real 404, received ${response.status}.`);
  if (response.headers.has("location")) failures.push(`${path}: blocked path redirected instead of returning 404.`);
  if (/rel=["']canonical["']/i.test(html)) failures.push(`${path}: 404 emitted a canonical.`);
}

const sitemapResponse = await fetchManual(new URL("/sitemap.xml", base));
const sitemap = await sitemapResponse.text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedSitemapUrls = publishedStaticRoutes.map((route) => canonicalUrlForPath(route.path));
if (sitemapResponse.status !== 200 || JSON.stringify(sitemapUrls) !== JSON.stringify(expectedSitemapUrls)) {
  failures.push(`sitemap.xml does not exactly equal the ${expectedSitemapUrls.length} published owners.`);
}
if (/<(?:changefreq|priority)>|yachtrentaldxb\.netlify\.app/.test(sitemap)) failures.push("sitemap.xml contains fabricated fields or preview authority.");

const robotsResponse = await fetchManual(new URL("/robots.txt", base));
const robots = await robotsResponse.text();
if (robotsResponse.status !== 200 || !robots.includes(`Sitemap: ${ENGLISH_PRODUCTION_ORIGIN}/sitemap.xml`) || /netlify\.app/.test(robots)) {
  failures.push("robots.txt does not reference only the canonical sitemap.");
}

if (checkDefaultHost) {
  const redirectCases = [
    ["/", `${ENGLISH_PRODUCTION_ORIGIN}/`],
    ["/yachts", `${ENGLISH_PRODUCTION_ORIGIN}/yachts`],
    ["/contact?source=pr9-cutover", `${ENGLISH_PRODUCTION_ORIGIN}/contact?source=pr9-cutover`],
  ] as const;
  for (const [path, expectedLocation] of redirectCases) {
    const response = await fetchManual(new URL(path, "https://yachtrentaldxb.netlify.app"));
    if (response.status !== 301 || response.headers.get("location") !== expectedLocation) {
      failures.push(`Default-host ${path}: expected one 301 to ${expectedLocation}.`);
    }
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`QA crawl passed: ${publishedStaticRoutes.length} canonical 200 routes, ${expectedBlocked.length} real 404 checks, ${sitemapUrls.length} sitemap URLs${checkDefaultHost ? ", and exact-host cutover" : ""}.`);
