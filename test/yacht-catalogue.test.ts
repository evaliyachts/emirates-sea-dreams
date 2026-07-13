import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { blockedYachts, englishRouteManifest, publishedStaticRoutes, yachtCatalogueRegistry } from "../seo";
import {
  publishableYachts,
  yachtRecordSchema,
} from "../src/data/yachts";
import {
  NEUTRAL_YACHT_FALLBACK,
  NEUTRAL_YACHT_FALLBACK_RIGHTS_ID,
  mediaRightsRegistry,
} from "../src/data/media-rights";
import { buildYachtSeo } from "../src/lib/yacht-seo";
import { renderStaticRoute } from "../src/entry-server";
import { verifyLocalImage, verifyRemoteImage } from "../scripts/media-verify";

const read = (path: string) => readFileSync(resolve(path), "utf8");

const validYacht = {
  id: "verified-test-yacht",
  sourceNumericId: 99,
  slug: "verified-test-yacht",
  name: "Verified Test Yacht",
  lengthFt: 50,
  guestCapacity: 12,
  yearBuilt: 2024,
  pricePerHour: 800,
  minimumDuration: 2,
  availability: "on-request" as const,
  media: [{
    type: "image" as const,
    path: NEUTRAL_YACHT_FALLBACK,
    alt: "Verified Test Yacht",
    width: 1600,
    height: 900,
    rightsRecordId: NEUTRAL_YACHT_FALLBACK_RIGHTS_ID,
    rightsStatus: "approved" as const,
  }],
  publicationStatus: "publishable" as const,
  blockers: [],
};

describe("English PR 4 strict yacht catalogue", () => {
  it("represents exactly 24 source records with explicit blocked/publishable dispositions", () => {
    expect(yachtCatalogueRegistry).toHaveLength(24);
    expect(blockedYachts).toHaveLength(24);
    expect(publishableYachts).toHaveLength(0);
    expect(new Set(yachtCatalogueRegistry.map((record) => record.id)).size).toBe(24);
    expect(new Set(yachtCatalogueRegistry.map((record) => record.sourceNumericId)).size).toBe(24);
    expect(yachtCatalogueRegistry.map((record) => record.sourceNumericId).sort((a, b) => a - b)).toEqual(
      Array.from({ length: 24 }, (_, index) => index + 1),
    );
    expect(blockedYachts.every((record) => record.blockers.length > 0)).toBe(true);
  });

  it("accepts only the strict publishable contract and rejects unknown or inherited fields", () => {
    expect(yachtRecordSchema.safeParse(validYacht).success).toBe(true);
    for (const inheritedField of [
      "schema_json_ld", "mini_description", "short_description", "long_description",
      "ar_long_description", "bathrooms", "crew", "inclusions", "add_ons", "ratingValue", "reviewCount",
    ]) {
      expect(yachtRecordSchema.safeParse({ ...validYacht, [inheritedField]: "prohibited" }).success).toBe(false);
    }
    expect(yachtRecordSchema.safeParse({ ...validYacht, availability: "guaranteed" }).success).toBe(false);
    expect(yachtRecordSchema.safeParse({ ...validYacht, yearBuilt: 3025 }).success).toBe(false);
    expect(yachtRecordSchema.safeParse({ ...validYacht, pricePerHour: 0 }).success).toBe(false);
    expect(yachtRecordSchema.safeParse({
      ...validYacht,
      media: [...validYacht.media, validYacht.media[0]],
    }).success).toBe(false);
    expect(yachtRecordSchema.safeParse({
      ...validYacht,
      media: [{ ...validYacht.media[0], path: "hhttps://images.example/yacht.webp" }],
    }).success).toBe(false);
    expect(yachtRecordSchema.safeParse({
      ...validYacht,
      name: "Evali Yachts 50",
    }).success).toBe(false);
  });

  it("maps all 24 internal dispositions to the existing yacht manifest paths", () => {
    const manifestYachts = englishRouteManifest.filter((route) => route.pageType === "yacht");
    expect(manifestYachts).toHaveLength(24);
    expect(new Set(manifestYachts.map((route) => route.id))).toEqual(new Set(yachtCatalogueRegistry.map((record) => record.id)));
    for (const record of blockedYachts) {
      const route = manifestYachts.find((candidate) => candidate.id === record.id);
      expect(route?.path).toBe(`/yachts/${record.historicalSlug}`);
    }
  });

  it("documents every identity special case without publishing or redirecting it", () => {
    const historical55 = blockedYachts.find((record) => record.sourceNumericId === 1);
    const dynasty = blockedYachts.find((record) => record.id === "yacht-dynasty-151");
    const generic120 = blockedYachts.find((record) => record.id === "yacht-mega-120");
    const uncertainSpellings = blockedYachts.filter((record) => [15, 16, 18, 19].includes(record.sourceNumericId));

    expect(historical55?.sourceLabel).toBe("Historical 55-foot yacht record");
    expect(historical55?.blockers.join(" ")).toMatch(/prohibited third-party branding/i);
    expect(dynasty?.blockers.join(" ")).toMatch(/151 feet.*150 feet/i);
    expect(generic120?.blockers.join(" ")).toMatch(/manufacturer or model/i);
    expect(generic120?.sourceLabel).toBe("Generic 120-foot mega-yacht record");
    expect(uncertainSpellings.every((record) => record.notes?.join(" ").includes("spelling"))).toBe(true);
    expect(read("netlify.toml")).not.toMatch(/status = 30[12]/);
  });

  it("keeps blocked yachts out of generated ownership, catalogue links and sitemap", () => {
    const publishedYachtRoutes = publishedStaticRoutes.filter((route) => route.pageType === "yacht");
    const catalogue = renderStaticRoute("/yachts");
    const sitemap = read("public/sitemap.xml");

    expect(publishedYachtRoutes).toHaveLength(publishableYachts.length);
    expect(catalogue.html).toContain("No individual yacht record currently has all required publication evidence");
    expect(catalogue.html).not.toMatch(/href="\/yachts\//);
    blockedYachts.forEach((record) => expect(sitemap).not.toContain(`/yachts/${record.historicalSlug}`));
    expect([...sitemap.matchAll(/<loc>/g)]).toHaveLength(publishedStaticRoutes.length);
    expect(sitemap).not.toContain("<lastmod>");
  });

  it("builds visible-fact-aligned Service, Offer and BreadcrumbList ownership", () => {
    const yacht = yachtRecordSchema.parse(validYacht);
    const seo = buildYachtSeo(yacht);
    const graph = seo.jsonLd["@graph"];
    expect(seo.canonical).toBe("https://yachtrentaldxb.com/yachts/verified-test-yacht");
    expect(graph.map((node) => node["@type"])).toEqual(["Service", "BreadcrumbList"]);
    expect(graph[0]).toMatchObject({
      name: yacht.name,
      url: seo.canonical,
      offers: { "@type": "Offer", price: yacht.pricePerHour, priceCurrency: "AED", url: seo.canonical },
    });
    expect(JSON.stringify(seo.jsonLd)).not.toMatch(/Product|AggregateRating|Review|ratingValue|reviewCount/);
  });

  it("requires an English rights record, decodes the neutral fallback, and fails a 403", async () => {
    expect(mediaRightsRegistry).toContainEqual(expect.objectContaining({
      id: NEUTRAL_YACHT_FALLBACK_RIGHTS_ID,
      productionPath: NEUTRAL_YACHT_FALLBACK,
      approvedHosts: ["yachtrentaldxb.com"],
      status: "approved",
    }));
    await expect(verifyLocalImage(NEUTRAL_YACHT_FALLBACK)).resolves.toMatchObject({ width: 1600, height: 900 });
    const blockedFetch = vi.fn(async () => new Response("forbidden", { status: 403 })) as unknown as typeof fetch;
    await expect(verifyRemoteImage("https://images.example/yacht.webp", blockedFetch)).rejects.toThrow("HTTP 403");
  });

  it("keeps language alternates, redirects and stale inherited yacht data out of production code", () => {
    const production = [
      read("src/data/yachts.ts"),
      read("src/components/shared/YachtCard.tsx"),
      read("src/pages/Yachts.tsx"),
      read("src/pages/YachtDetails.tsx"),
    ].join("\n");
    expect(production).not.toMatch(/hreflang\s*=|x-default/i);
    expect(production).not.toMatch(/schema_json_ld|AggregateRating|ratingValue|reviewCount|price_per_hour_from_aed|\bbathrooms\b|\bcrew\b/i);
    expect(read("netlify.toml")).not.toMatch(/from = "\/\*"|status = 30[12]/);
  });
});
