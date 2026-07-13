import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { englishRouteManifest, publishedStaticRoutes } from "../../seo/index";

const read = (path: string) => readFileSync(resolve(path), "utf8");

describe("PR 3 SEO and HTTP boundaries", () => {
  it("publishes only the four evidence-cleared manifest owners", () => {
    expect(englishRouteManifest).toHaveLength(52);
    expect(publishedStaticRoutes.map((route) => route.path)).toEqual(["/", "/yachts", "/services", "/occasions"]);
    const locations = [...read("public/sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(locations).toEqual([
      "https://yachtrentaldxb.com/",
      "https://yachtrentaldxb.com/yachts",
      "https://yachtrentaldxb.com/services",
      "https://yachtrentaldxb.com/occasions",
    ]);
    expect(read("public/sitemap.xml")).not.toContain("<lastmod>");
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
    expect([...config.matchAll(/status = 200/g)]).toHaveLength(3);
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
