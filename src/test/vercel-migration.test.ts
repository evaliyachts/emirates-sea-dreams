import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { publishedStaticRoutes } from "../../seo/index";

const config = JSON.parse(readFileSync("vercel.json", "utf8"));

describe("Vercel hosting-only migration", () => {
  it("uses the unchanged static build with no framework SPA fallback", () => {
    expect(config.framework).toBeNull();
    expect(config.outputDirectory).toBe("dist");
    expect(config.buildCommand).toBe("npm run build");
    expect(config.installCommand).toBe("npx --yes npm@11.16.0 ci");
    expect(config.cleanUrls).toBe(false);
    expect(config.trailingSlash).toBeUndefined();
    expect(config.redirects).toBeUndefined();
    expect(config.routes).toBeUndefined();
    expect(config.functions).toBeUndefined();
  });

  it("maps only registered owners, preserving direct slash and non-slash requests", () => {
    const expected = publishedStaticRoutes.filter(route => route.path !== "/").flatMap(route => [
      { source: route.path, destination: `/_static${route.path}.html` },
      { source: route.path + "/", destination: `/_static${route.path}.html` },
    ]);
    expect([...config.rewrites].sort((a, b) => a.source.localeCompare(b.source))).toEqual(
      expected.sort((a, b) => a.source.localeCompare(b.source)),
    );
    expect(new Set(config.rewrites.map(rule => rule.source)).size).toBe(expected.length);
    expect(config.rewrites.every(rule => !/[*():]/.test(rule.source))).toBe(true);
  });

  it("retains the rollback host and excludes local credentials", () => {
    expect(readFileSync("netlify.toml", "utf8")).toContain('publish = "dist"');
    const ignore = readFileSync(".gitignore", "utf8");
    expect(ignore).toMatch(/^\.vercel$/m);
    expect(ignore).toMatch(/^\.env\*$/m);
  });
});
