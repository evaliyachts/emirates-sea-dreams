import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { englishRouteManifest, publishedStaticRoutes } from "../../seo/index";
import { publishableYachts } from "../data/yachts";
import { approvedServices } from "../data/approved-services";

const read = (path: string) => readFileSync(resolve(path), "utf8");

describe("static SEO and HTTP boundaries", () => {
  it("publishes the nine base/support owners plus evidence-cleared yacht and service owners", () => {
    expect(englishRouteManifest).toHaveLength(52);
    const base = new Set(["/", "/yachts", "/services", "/occasions", "/about", "/faq", "/contact", "/terms", "/privacy"]);
    const yachts = new Set(publishableYachts.map((yacht) => `/yachts/${yacht.slug}`));
    const services = new Set(approvedServices.map((service) => service.path));
    const expectedPaths = englishRouteManifest
      .map((route) => route.path)
      .filter((path) => base.has(path) || yachts.has(path) || services.has(path));
    expect(publishedStaticRoutes.map((route) => route.path)).toEqual(expectedPaths);
    const locations = [...read("public/sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(locations).toEqual(expectedPaths.map((path) => `https://yachtrentaldxb.com${path === "/" ? "/" : path}`));
    expect([...read("public/sitemap.xml").matchAll(/<lastmod>2026-07-14<\/lastmod>/g)]).toHaveLength(5);
  });

  it("keeps the client route declarations unchanged in the shared route tree", () => {
    const source = read("src/app/AppRoutes.tsx");
    const paths = [...source.matchAll(/<Route path="([^"]+)"/g)].map((match) => match[1]);
    expect(paths.slice(-13)).toEqual([
      "/", "/yachts", "/yachts/:slug", "/offers", "/services", "/services/:slug",
      "/occasions", "/about", "/faq", "/contact", "/terms", "/privacy", "*",
    ]);
  });

  it("uses only exact 200 rewrites and no catch-all or redirect", () => {
    const config = read("netlify.toml");
    expect([...config.matchAll(/status = 200/g)]).toHaveLength(8 + publishableYachts.length + approvedServices.length);
    expect(config).not.toMatch(/status = 30[12]/);
    expect(config).not.toMatch(/from = "\/\*"/);
  });

  it("removes fallback SEO and meta-keywords output", () => {
    const template = read("index.html");
    expect(template).toContain("<!--app-head-->");
    expect(template).toContain("<!--app-html-->");
    expect(`${template}\n${read("src/components/shared/SEOHead.tsx")}`).not.toMatch(/name="keywords"/i);
    expect(template).not.toMatch(/LocalBusiness|application\/ld\+json/);
  });

  it("keeps analytics and language alternates absent", () => {
    const source = `${read("index.html")}\n${read("src/components/shared/SEOHead.tsx")}`;
    expect(source).not.toMatch(/\bdataLayer\b|\bgtag\s*\(|googletagmanager/i);
    expect(source).not.toMatch(/hreflang\s*=|x-default/i);
  });
});
