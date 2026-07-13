import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  blockedYachts,
  englishRouteManifest,
  EXACT_SOURCE_TO_MANIFEST_MATCH_COUNT,
  OWNER_APPROVED_SOURCE_RECORD_COUNT,
  publishedStaticRoutes,
  unmatchedApprovedSourceRecords,
  yachtCatalogueRegistry,
} from "../seo";
import {
  approvedSourceAvailability,
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
    expect(OWNER_APPROVED_SOURCE_RECORD_COUNT).toBe(24);
    expect(EXACT_SOURCE_TO_MANIFEST_MATCH_COUNT).toBe(21);
    expect(publishableYachts).toHaveLength(19);
    expect(blockedYachts).toHaveLength(5);
    expect(unmatchedApprovedSourceRecords).toHaveLength(3);
    expect(new Set(yachtCatalogueRegistry.map((record) => record.id)).size).toBe(24);
    const mappedSourceIds = yachtCatalogueRegistry.flatMap((record) => record.sourceNumericId === undefined ? [] : [record.sourceNumericId]);
    expect(new Set(mappedSourceIds).size).toBe(mappedSourceIds.length);
    expect(blockedYachts.every((record) => record.blockers.length > 0)).toBe(true);
    expect(publishableYachts.every((record) => record.availability === "on-request")).toBe(true);
    expect(approvedSourceAvailability.size).toBe(19);
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
    for (const record of yachtCatalogueRegistry) {
      const route = manifestYachts.find((candidate) => candidate.id === record.id);
      const slug = record.publicationStatus === "publishable" ? record.slug : record.historicalSlug;
      expect(route?.path).toBe(`/yachts/${slug}`);
    }
  });

  it("documents every identity special case without publishing or redirecting it", () => {
    const historical55 = blockedYachts.find((record) => record.sourceNumericId === 2);
    const dynasty = blockedYachts.find((record) => record.id === "yacht-dynasty-151");
    const generic120 = blockedYachts.find((record) => record.id === "yacht-mega-120");
    const uncertainSpellings = publishableYachts.filter((record) => [16, 17, 19].includes(record.sourceNumericId));

    expect(historical55?.sourceLabel).toBe("Historical 55-foot yacht record");
    expect(historical55?.blockers.join(" ")).toMatch(/prohibited Evali branding/i);
    expect(dynasty?.blockers.join(" ")).toMatch(/151 feet.*150 feet/i);
    expect(generic120?.notes?.join(" ")).toMatch(/manufacturer or model/i);
    expect(generic120?.sourceLabel).toBe("Generic 120-foot mega-yacht historical manifest record");
    expect(uncertainSpellings.map((record) => record.name)).toEqual(["Heysea 90", "Doretty 90", "Mzaail 135"]);
    expect(read("netlify.toml")).not.toMatch(/status = 30[12]/);
  });

  it("keeps blocked yachts out of generated ownership, catalogue links and sitemap", () => {
    const publishedYachtRoutes = publishedStaticRoutes.filter((route) => route.pageType === "yacht");
    const catalogue = renderStaticRoute("/yachts");
    const sitemap = read("public/sitemap.xml");

    expect(publishedYachtRoutes).toHaveLength(publishableYachts.length);
    expect(catalogue.html).toContain("Verified Yacht Catalogue");
    publishableYachts.forEach((record) => expect(catalogue.html).toContain(`href="/yachts/${record.slug}"`));
    blockedYachts.forEach((record) => expect(sitemap).not.toContain(`/yachts/${record.historicalSlug}`));
    publishableYachts.forEach((record) => expect(sitemap).toContain(`/yachts/${record.slug}`));
    expect([...sitemap.matchAll(/<loc>/g)]).toHaveLength(publishedStaticRoutes.length);
    expect(publishedStaticRoutes).toHaveLength(4 + publishableYachts.length);
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
    expect(seo.socialImage).toBeUndefined();
  });

  it("uses every approved production gallery and absolute primary social media", () => {
    const media = publishableYachts.flatMap((yacht) => yacht.media);
    expect(media).toHaveLength(126);
    expect(new Set(media.map((record) => record.path)).size).toBe(126);
    for (const yacht of publishableYachts) {
      const seo = buildYachtSeo(yacht);
      const primary = yacht.media.find((record) => record.featured) ?? yacht.media[0];
      expect(seo.socialImage).toEqual({
        url: primary.path,
        alt: primary.alt,
        width: primary.width,
        height: primary.height,
      });
      expect(seo.socialImage?.url).toMatch(/^https:\/\//);
      expect(seo.socialImage?.alt).not.toMatch(/evali/i);
    }
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
    expect(blockedFetch).toHaveBeenCalledTimes(1);
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
