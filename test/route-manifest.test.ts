import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  ENGLISH_PREVIEW_ORIGIN,
  ENGLISH_PRODUCTION_ORIGIN,
  approvedCommercialConsolidations,
  approvedRedirects,
  canonicalUrlForPath,
  commercialCandidateRegistry,
  englishRouteManifest,
  occasionDispositions,
  publishedStaticRoutes,
  redirectCandidates,
  routeGroups,
  searchConsoleAggregateBaseline,
  sitemapMigrationMap,
  validateEnglishSeoOwnership,
} from "../seo";

const read = (path: string) => readFileSync(resolve(path), "utf8");

const sourceFiles = (directory: string): string[] =>
  readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return entry === "test" ? [] : sourceFiles(path);
    return /\.(ts|tsx)$/.test(entry) ? [path] : [];
  });

describe("English PR 2 route ownership manifest", () => {
  it("covers the intended 52-route inventory in the audited groups", () => {
    expect(englishRouteManifest).toHaveLength(52);
    expect(routeGroups.static).toHaveLength(10);
    expect(routeGroups.yachts).toHaveLength(24);
    expect(routeGroups.services).toHaveLength(18);
    expect(searchConsoleAggregateBaseline.knownUrls).toBe(55);
    expect(englishRouteManifest).not.toHaveLength(searchConsoleAggregateBaseline.knownUrls);
  });

  it("publishes only evidence-cleared owners without changing English path form", () => {
    const sitemap = read("public/sitemap.xml");
    const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
      const url = new URL(match[1]);
      expect(url.origin).toBe(ENGLISH_PRODUCTION_ORIGIN);
      return url.pathname;
    });
    const manifestPaths = englishRouteManifest.map((route) => route.path);
    const publishedPaths = publishedStaticRoutes.map((route) => route.path);

    expect(sitemapPaths).toHaveLength(4);
    expect(new Set(sitemapPaths).size).toBe(4);
    expect([...publishedPaths].sort()).toEqual([...sitemapPaths].sort());
    expect(manifestPaths).toHaveLength(52);
    expect(manifestPaths.filter((path) => path !== "/").every((path) => !path.endsWith("/"))).toBe(true);
  });

  it("assigns unique IDs, exact paths, decisions, and primary intents", () => {
    expect(new Set(englishRouteManifest.map((route) => route.id)).size).toBe(52);
    expect(new Set(englishRouteManifest.map((route) => route.path)).size).toBe(52);
    expect(englishRouteManifest.every((route) => route.decision.length > 0)).toBe(true);
    expect(englishRouteManifest.every((route) => route.decisionStatus.length > 0)).toBe(true);
    expect(englishRouteManifest.every((route) => route.primaryIntent.trim().length > 0)).toBe(true);
    expect(new Set(englishRouteManifest.map((route) => route.primaryIntent.toLowerCase())).size).toBe(52);
    expect(validateEnglishSeoOwnership()).toEqual([]);
  });

  it("keeps future metadata pending and validates approved ownership uniqueness", () => {
    expect(englishRouteManifest.every((route) => route.metadataOwnership.status === "pending")).toBe(true);
    const validationSource = read("seo/validation.ts");
    expect(validationSource).toContain('(["title", "description", "h1"] as const)');
    expect(validationSource).toContain("Duplicate approved primary intent");
    expect(validationSource).toContain("Duplicate route path");
  });

  it("keeps six historic commercial candidates outside the canonical manifest", () => {
    expect(commercialCandidateRegistry).toHaveLength(6);
    const manifestPaths = new Set(englishRouteManifest.map((route) => route.path));
    commercialCandidateRegistry.forEach((candidate) => {
      expect(manifestPaths.has(candidate.path)).toBe(false);
      expect(candidate).toMatchObject({
        canonical: false,
        sitemapListed: false,
        indexable: false,
        routed: false,
        creationApproved: false,
        redirectOwnershipApproved: false,
      });
    });
  });

  it("classifies all seven occasion records without creating detail routes", () => {
    expect(occasionDispositions).toHaveLength(7);
    expect(new Set(occasionDispositions.map((occasion) => occasion.sourceSlug)).size).toBe(7);
    expect(occasionDispositions.every((occasion) => occasion.pageCreationApproved === false)).toBe(true);
    const paths = new Set(englishRouteManifest.map((route) => route.path));
    occasionDispositions.forEach((occasion) => {
      expect(paths.has(occasion.owningExistingPath)).toBe(true);
      expect(paths.has(`/occasions/${occasion.sourceSlug}`)).toBe(false);
    });
  });

  it("keeps redirects and commercial consolidation evidence-gated", () => {
    expect(approvedRedirects).toHaveLength(0);
    expect(approvedCommercialConsolidations).toHaveLength(0);
    expect(redirectCandidates).toHaveLength(2);
    expect(redirectCandidates.every((redirect) => redirect.status === "candidate")).toBe(true);
    expect(redirectCandidates.every((redirect) => !redirect.from.includes("*"))).toBe(true);
    expect(redirectCandidates.every((redirect) => redirect.proposedTo === undefined)).toBe(true);
    const netlify = read("netlify.toml");
    expect([...netlify.matchAll(/status = 200/g)]).toHaveLength(3);
    expect(netlify).not.toMatch(/status = 30[12]/);
    expect(netlify).not.toMatch(/from = "\/\*"/);
  });

  it("keeps inherited branding out of proposed ownership copy and limits planned schema", () => {
    const historicalYacht = englishRouteManifest.find((route) => route.id === "yacht-55ft-historical-brand-path");
    const allowedSchema = new Set(["WebSite", "Organization", "ContactPoint", "Service", "BreadcrumbList"]);

    expect(historicalYacht?.path).toBe("/yachts/evali-yacht-55ft-yacht-rental-dubai");
    expect(historicalYacht?.primaryIntent).not.toMatch(/evali/i);
    expect(JSON.stringify(historicalYacht?.metadataOwnership)).not.toMatch(/evali/i);
    englishRouteManifest.forEach((route) => {
      expect(route.schemaOwnership.every((schema) => allowedSchema.has(schema))).toBe(true);
      expect(route.schemaOwnership).not.toContain("Event");
      expect(route.schemaOwnership).not.toContain("LocalBusiness");
      expect(route.schemaOwnership).not.toContain("Product");
    });
  });

  it("records aggregate Search Console evidence without guessed URL assignments", () => {
    expect(searchConsoleAggregateBaseline).toMatchObject({
      reportDate: "2026-06-30",
      reportFilter: "All known pages",
      knownUrls: 55,
      indexed: 1,
      discoveredCurrentlyNotIndexed: 45,
      notFound: 6,
      crawledCurrentlyNotIndexed: 2,
      pageWithRedirect: 1,
      submittedSitemapMappingConfirmed: false,
      urlLevelIssueExamples: [],
    });
    expect(searchConsoleAggregateBaseline.inferredSitemapArithmetic).toEqual({
      expression: "1 + 45 + 6 = 52",
      result: 52,
      confidence: "inferred",
      assignsIndividualRoutes: false,
    });
  });

  it("omits unverified lastmod values in the provisional migration map", () => {
    expect(sitemapMigrationMap).toHaveLength(52);
    expect(englishRouteManifest.every((route) => route.lastSignificantUpdate === undefined)).toBe(true);
    expect(sitemapMigrationMap.every((entry) => entry.lastmodStatus === "omitted-unverified")).toBe(true);
    expect(sitemapMigrationMap.every((entry) => entry.lastSignificantUpdate === undefined)).toBe(true);
  });

  it("derives canonicals from exact paths and rejects other authorities", () => {
    expect(ENGLISH_PRODUCTION_ORIGIN).toBe("https://yachtrentaldxb.com");
    expect(ENGLISH_PREVIEW_ORIGIN).toBe("https://yachtrentaldxb.netlify.app");
    englishRouteManifest.forEach((route) => {
      const canonical = canonicalUrlForPath(route.path);
      expect(new URL(canonical).origin).toBe(ENGLISH_PRODUCTION_ORIGIN);
      expect(canonical).not.toContain("https://yacht-dxb.com");
      expect(canonical).not.toContain("netlify.app");
    });
  });

  it("preserves route declarations while integrating publication only into build output", () => {
    const appSource = read("src/app/AppRoutes.tsx");
    const routePaths = [...appSource.matchAll(/<Route path="([^"]+)"/g)].map((match) => match[1]);

    expect(routePaths.slice(-13)).toEqual([
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
    expect(read("scripts/build-static.ts")).toContain("publishedStaticRoutes");
  });

  it("keeps live hreflang and x-default absent", () => {
    const productionSource = sourceFiles(resolve("src"))
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");
    expect(`${read("index.html")}\n${productionSource}`).not.toMatch(/hreflang\s*=|x-default/i);
  });
});
