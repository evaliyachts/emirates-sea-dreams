// Read-only hosting parity audit. Evidence output must be outside the repository.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { publishedStaticRoutes, blockedStaticRoutes } from "../seo/index.ts";

const run = promisify(execFile);
const [base, output, transport = "fetch"] = process.argv.slice(2);
if (!base || !output || !["fetch", "vercel", "oidc"].includes(transport)) {
  throw new Error("Usage: node scripts/migration-audit.mjs BASE EXTERNAL_OUTPUT [fetch|vercel|oidc]");
}
const headers = {};
if (transport === "oidc") {
  if (!/^emirates-sea-dreams-[a-z0-9]+-evali1\.vercel\.app$/.test(new URL(base).hostname)) throw new Error("OIDC transport is restricted to this project's immutable deployment hosts");
  process.loadEnvFile(".env.local");
  if (!process.env.VERCEL_OIDC_TOKEN) throw new Error("Linked development OIDC token is unavailable");
  headers["x-vercel-trusted-oidc-idp-token"] = process.env.VERCEL_OIDC_TOKEN;
}
const destination = resolve(output);
const rel = relative(process.cwd(), destination);
if (!rel.startsWith("..")) throw new Error("Evidence must remain outside the application repository");
const sha = value => createHash("sha256").update(value).digest("hex");
const sitemap = await readFile("public/sitemap.xml", "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/gs)].map(match => match[1]);
const owners = publishedStaticRoutes.map(route => route.path);
const paths = [...new Set([...owners, ...owners.filter(path=>path!=="/").map(path=>path+"/"), ...sitemapUrls.map(url => new URL(url).pathname), ...blockedStaticRoutes.map(route=>route.path)])];
const extract = html => ({
  title: html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] ?? null,
  description: html.match(/<meta(?=[^>]*name="description")[^>]*content="([^"]*)"[^>]*>/)?.[1] ?? null,
  canonical: html.match(/<link(?=[^>]*rel="canonical")[^>]*href="([^"]*)"[^>]*>/)?.[1] ?? null,
  h1: [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map(m => m[1]),
  schema: [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m => m[1]),
  bodyHash: sha(html.match(/<body\b[^>]*>(.*?)<\/body>/s)?.[1] ?? ""),
});
async function request(path) {
  if (transport === "vercel") {
    const { stdout } = await run("vercel", ["curl", path, "--deployment", base, "--scope", "evali1", "--", "--http1.1", "--silent", "--show-error", "--max-time", "30", "--write-out", "\n__STATUS__%{http_code}"], { maxBuffer: 8 * 1024 * 1024 });
    const split = stdout.lastIndexOf("\n__STATUS__");
    return { status: Number(stdout.slice(split + 11)), html: stdout.slice(0, split) };
  }
  const response = await fetch(new URL(path, base), { headers, redirect: "manual", signal: AbortSignal.timeout(30000) });
  return { status: response.status, location: response.headers.get("location"), html: await response.text() };
}
const routes = [];
for (const path of paths) {
  const result = await request(path);
  const canonicalPath = path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  const expectedStatus = owners.includes(canonicalPath) ? 200 : 404;
  let expected;
  if (expectedStatus === 200) expected = extract(await readFile(`dist/${canonicalPath === "/" ? "index" : "_static" + canonicalPath}.html`, "utf8"));
  const actual = extract(result.html);
  routes.push({ path, status: result.status, expectedStatus, location: result.location ?? null, metadataAndContentMatch: expected ? JSON.stringify(expected) === JSON.stringify(actual) : null, ...actual });
}
const probes = [];
for (const path of ["/migration-unknown-20261016", "/yachts/migration-unknown-20261016", "/services/migration-unknown-20261016", "/%ZZ", "/server/entry-server.js", "/assets/index-BWtkNgkB.js.map"]) {
  const result = await request(path);
  probes.push({ path, status: result.status, pass: result.status === 404 || (path === "/%ZZ" && result.status === 400) || (path.endsWith(".js.map") && result.status === 403) });
}
const hostedSitemap = await request("/sitemap.xml");
const robots = await request("/robots.txt");
const report = {
  timestamp: new Date().toISOString(), base, transport,
  sitemapEntries: sitemapUrls.length, distinctSitemapUrls: new Set(sitemapUrls).size,
  sitemapSha256: sha(sitemap), hostedSitemapSha256: sha(hostedSitemap.html),
  sitemapUnchanged: hostedSitemap.status === 200 && sha(hostedSitemap.html) === sha(sitemap),
  generatedOwners: owners.length, routes, probes,
  robotsPass: robots.status === 200 && robots.html.includes("https://yachtrentaldxb.com/sitemap.xml"),
};
await mkdir(resolve(destination, ".."), { recursive: true });
await writeFile(destination, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ ...report, routes: undefined, probes, direct200: routes.filter(r=>r.status===200).length, inherited404: routes.filter(r=>r.status===404).length, parityFailures: routes.filter(r=>r.status!==r.expectedStatus || r.metadataAndContentMatch===false).map(r=>r.path) }, null, 2));
if (!report.sitemapUnchanged || !report.robotsPass || probes.some(p=>!p.pass) || routes.some(r=>r.status!==r.expectedStatus || r.metadataAndContentMatch===false)) process.exitCode = 1;
