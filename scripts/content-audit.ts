import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { JSDOM, VirtualConsole } from "jsdom";
import { blockedStaticRoutes, commercialCandidateRegistry } from "../seo/index";

const base = process.argv[2] || "https://yachtrentaldxb.com";
const output = process.argv[3] || "docs/audits/2026-09-23/before";
const production = "https://yachtrentaldxb.com";
await mkdir(output, { recursive: true });
const request = async (url: string) => {
  const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(30000) });
  const body = await response.text();
  return { url, status: response.status, headers: Object.fromEntries(response.headers), body };
};
const sitemap = await request(`${base}/sitemap.xml`);
const xml = new JSDOM(sitemap.body, { contentType: "text/xml" });
const urls = [...xml.window.document.querySelectorAll("loc")].map((el) => el.textContent!);
const robots = await request(`${base}/robots.txt`);
const pages = [];
for (const canonicalUrl of urls) {
  const path = new URL(canonicalUrl).pathname;
  const response = await request(`${base}${path}`);
  const dom = new JSDOM(response.body, { url: `${production}${path}`, virtualConsole: new VirtualConsole() });
  const d = dom.window.document;
  const canonical = [...d.querySelectorAll('link[rel="canonical"]')].map((el) => el.getAttribute("href"));
  const directives = [...d.querySelectorAll('meta[name="robots"],meta[name="googlebot"]')].map((el) => el.getAttribute("content"));
  const schema = [...d.querySelectorAll('script[type="application/ld+json"]')].map((el) => { try { return JSON.parse(el.textContent!); } catch { return { invalid: el.textContent }; } });
  const links = [...d.querySelectorAll("a[href]")].map((el) => ({ href: (el as HTMLAnchorElement).href, text: el.textContent?.replace(/\s+/g, " ").trim() }));
  const images = [...d.querySelectorAll("img")].map((el) => ({ src: el.src, alt: el.alt, width: el.getAttribute("width"), height: el.getAttribute("height"), loading: el.loading || el.getAttribute("loading"), srcset: el.srcset, priority: el.getAttribute("fetchpriority") }));
  const main = d.querySelector("main")?.cloneNode(true) as HTMLElement | undefined;
  main?.querySelectorAll("script,style,svg").forEach((el) => el.remove());
  const text = main?.textContent?.replace(/\s+/g, " ").trim() || "";
  pages.push({ path, status: response.status, headers: response.headers, canonical, canonicalStatus: canonical.length > 1 ? "CONFLICT" : !canonical.length ? "MISSING" : canonical[0] === canonicalUrl ? "SELF-CANONICAL" : "CANONICALIZED ELSEWHERE", indexable: response.status === 200 && !/noindex/i.test([...directives, response.headers["x-robots-tag"]].join(" ")), title: d.title, description: d.querySelector('meta[name="description"]')?.getAttribute("content"), h1: [...d.querySelectorAll("h1")].map((el) => el.textContent), directives, schema, links, images, text, words: text.split(/\s+/).length, htmlSha256: createHash("sha256").update(response.body).digest("hex"), scripts: [...d.querySelectorAll("script[src]")].map((el) => el.getAttribute("src")) });
  await writeFile(`${output}/${path === "/" ? "home" : path.slice(1).replaceAll("/", "__")}.html`, response.body);
  dom.window.close();
}
const probes = [...new Set([
  ...blockedStaticRoutes.map((r) => r.path), ...commercialCandidateRegistry.map((r) => r.path),
  "/this-page-must-not-exist-928374", "/yacht/nonexistent-yacht-928374", "/services/nonexistent-service-928374",
  "/sitemap", "/index.html", "/services.html", "/_static/services.html", "/yachts/", "/services/",
  "/yachts?search=majesty", "/yachts?category=luxury&sort=price", "/yachts?filter=12", "/blog",
])];
const statusProbes = [];
for (const target of [...probes.map((p) => `${base}${p}`), ...(base === production ? ["http://yachtrentaldxb.com/", "http://www.yachtrentaldxb.com/", "https://www.yachtrentaldxb.com/", "https://yachtrentaldxb.netlify.app/yachts"] : [])]) {
  const response = await request(target);
  const d = new JSDOM(response.body, { virtualConsole: new VirtualConsole() }).window.document;
  statusProbes.push({ url: target, status: response.status, location: response.headers.location, canonical: d.querySelector('link[rel="canonical"]')?.getAttribute("href"), robots: d.querySelector('meta[name="robots"]')?.getAttribute("content") });
}
const duplicates = (field: "title" | "description") => [...new Set(pages.map((p) => p[field]))].filter((value) => pages.filter((p) => p[field] === value).length > 1);
const report = { capturedAt: new Date().toISOString(), base, sitemap: { status: sitemap.status, urls, count: urls.length, uniqueCount: new Set(urls).size }, robots: { status: robots.status, text: robots.body }, duplicateTitles: duplicates("title"), duplicateDescriptions: duplicates("description"), pages, statusProbes };
await writeFile(`${output}/audit.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ pages: pages.length, sitemap: report.sitemap.count, canonicalErrors: pages.filter((p) => p.canonicalStatus !== "SELF-CANONICAL").length, non200: pages.filter((p) => p.status !== 200).length, duplicateTitles: report.duplicateTitles, statusProbes }, null, 2));
