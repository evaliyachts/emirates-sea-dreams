import { readFileSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getGeneratedStylesheetPath, inlineHomepageStylesheet } from "@/lib/static-performance";

describe("mobile homepage performance safeguards", () => {
  it("keeps above-the-fold content independent from hydration animation", () => {
    const hero = readFileSync("src/components/home/HeroSection.tsx", "utf8");
    const header = readFileSync("src/components/layout/Header.tsx", "utf8");
    expect(hero).not.toMatch(/framer-motion|useScroll|useTransform|motion\./u);
    expect(header).not.toMatch(/framer-motion|motion\.header|translateY\(-100px\)/u);
    expect(hero).toContain('loading="eager"');
    expect(hero).toContain('decoding="async"');
  });

  it("removes synchronous geometry reads from the services input path", () => {
    const services = readFileSync("src/components/home/ServicesSection.tsx", "utf8");
    expect(services).toContain("IntersectionObserver");
    expect(services).toContain("intersectionRatio");
    expect(services).not.toMatch(/getBoundingClientRect|offsetWidth|offsetHeight|clientWidth|clientHeight/u);
  });

  it("keeps optimized same-path local assets within their mobile budgets", () => {
    expect(statSync("public/media/home/hero/yacht-cover-mobile.avif").size).toBeLessThan(40 * 1024);
    expect(statSync("public/dubai-yachts-logo.png").size).toBeLessThan(10 * 1024);
  });

  it("inlines the generated stylesheet on the homepage without changing its rules", () => {
    const document = '<html><head><link rel="stylesheet" crossorigin href="/assets/index-test.css"></head><body></body></html>';
    const stylesheet = ".hero{display:block}";
    expect(getGeneratedStylesheetPath(document)).toBe("/assets/index-test.css");
    const inlined = inlineHomepageStylesheet(document, stylesheet);
    expect(inlined).toContain(`<style data-homepage-inline-css>${stylesheet}</style>`);
    expect(inlined).not.toContain('rel="stylesheet"');
  });

  it("rejects missing stylesheet links and unsafe inline style contents", () => {
    expect(() => getGeneratedStylesheetPath("<html></html>")).toThrow(/stylesheet link was not found/u);
    expect(() => inlineHomepageStylesheet(
      '<link rel="stylesheet" crossorigin href="/assets/index-test.css">',
      "</style><script>alert(1)</script>",
    )).toThrow(/unsafe closing style tag/u);
  });
});
