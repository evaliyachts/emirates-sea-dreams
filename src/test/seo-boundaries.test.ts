import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { services } from "@/data/services";
import { yachts } from "@/data/yachts";

const read = (path: string) => readFileSync(resolve(path), "utf8");

const sourceFiles = (directory: string): string[] =>
  readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return entry === "test" ? [] : sourceFiles(path);
    return /\.(ts|tsx)$/.test(entry) ? [path] : [];
  });

describe("PR 1 SEO and route boundaries", () => {
  it("preserves the audited 52-URL inventory without creating route owners", () => {
    const sitemap = read("public/sitemap.xml");
    const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    expect(locations).toHaveLength(52);
    expect(new Set(locations).size).toBe(52);
    expect(yachts).toHaveLength(24);
    expect(services).toHaveLength(18);
  });

  it("preserves the current client route declarations", () => {
    const appSource = read("src/App.tsx");
    const routePaths = [...appSource.matchAll(/<Route path="([^"]+)"/g)].map((match) => match[1]);

    expect(routePaths).toEqual([
      "/",
      "/yachts",
      "/yachts/:slug",
      "/offers",
      "/services",
      "/services/:slug",
      "/occasions",
      "/about",
      "/faq",
      "/contact",
      "/terms",
      "/privacy",
      "*",
    ]);
  });

  it("keeps homepage fallback metadata and visible content unchanged", () => {
    const html = read("index.html");

    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain('<link rel="canonical" href="https://yachtrentaldxb.com/" />');
    expect(html).toContain("Yacht Rental Dubai — Luxury Yacht Charter Dubai by Dubai Yacht");
  });

  it("does not activate analytics or live language alternates", () => {
    const productionSource = sourceFiles(resolve("src"))
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");
    const initialHtml = read("index.html");

    expect(productionSource).not.toMatch(/\bdataLayer\b|\bgtag\s*\(|googletagmanager/i);
    expect(`${initialHtml}\n${productionSource}`).not.toMatch(/hreflang\s*=|x-default/i);
  });
});
