import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  englishArabicRouteMappings,
  generateEnglishArabicMappingReport,
  languageMappingSummary,
  languageMappingPendingRouteIds,
  publishedStaticRoutes,
  validateEnglishArabicRouteMappings,
} from "../seo";

describe("English PR 7 bilingual evidence report", () => {
  it("preserves 33 live-reviewed mappings and records five new production-review-pending owners", () => {
    expect(englishArabicRouteMappings).toHaveLength(33);
    expect(new Set(englishArabicRouteMappings.map((record) => record.routeId))).toEqual(
      new Set(publishedStaticRoutes.filter((route) => !languageMappingPendingRouteIds.includes(route.id as typeof languageMappingPendingRouteIds[number])).map((route) => route.id)),
    );
    expect(languageMappingSummary).toEqual({ total: 33, trueEquivalents: 28, relatedNotEquivalent: 5, unmapped: 0 });
    expect(languageMappingPendingRouteIds).toEqual(["about", "faq", "contact", "terms", "privacy"]);
    expect(englishArabicRouteMappings.length + languageMappingPendingRouteIds.length).toBe(publishedStaticRoutes.length);
    expect(validateEnglishArabicRouteMappings()).toEqual([]);
  });

  it("preserves exact English and Arabic canonical URL forms", () => {
    englishArabicRouteMappings.forEach((record) => {
      const english = new URL(record.englishCanonical);
      const arabic = new URL(record.arabicCanonical!);
      expect(english.origin).toBe("https://yachtrentaldxb.com");
      expect(english.pathname === "/" || !english.pathname.endsWith("/")).toBe(true);
      expect(arabic.origin).toBe("https://yacht-dxb.com");
      expect(arabic.pathname.endsWith("/")).toBe(true);
      expect(record.englishEvidence).toMatchObject({ httpStatus: 200, indexable: true, declaredCanonical: record.englishCanonical });
      expect(record.arabicEvidence).toMatchObject({ httpStatus: 200, indexable: true, declaredCanonical: record.arabicCanonical });
      expect(record.xDefaultAppropriate).toBe(false);
    });
  });

  it("requires reciprocal future tags only for true equivalents", () => {
    const trueEquivalent = englishArabicRouteMappings.filter((record) => record.equivalenceStatus === "true-equivalent");
    const related = englishArabicRouteMappings.filter((record) => record.equivalenceStatus === "related-not-equivalent");
    expect(trueEquivalent).toHaveLength(28);
    expect(trueEquivalent.every((record) => record.samePrimaryIntent && record.reciprocalEnglishTagRequired && record.reciprocalArabicTagRequired)).toBe(true);
    expect(related).toHaveLength(5);
    expect(related.every((record) => !record.reciprocalEnglishTagRequired && !record.reciprocalArabicTagRequired && record.blockers.length > 0)).toBe(true);
    expect(related.map((record) => record.routeId).sort()).toEqual([
      "occasion-index",
      "yacht-azimut-42",
      "yacht-heysea-90",
      "yacht-majesty-44",
      "yacht-oryx-50",
    ]);
  });

  it("keeps the generated evidence report current without publishing live alternates", () => {
    const report = readFileSync(resolve("docs/ENGLISH_ARABIC_HREFLANG_MAP.md"), "utf8");
    expect(report).toBe(generateEnglishArabicMappingReport());
    englishArabicRouteMappings.forEach((record) => {
      expect(report).toContain(record.englishCanonical);
      expect(report).toContain(record.arabicCanonical);
    });
    expect(report).toContain("Live `hreflang`: absent");
    expect(report).toContain("Live `x-default`: absent and not approved");
  });
});
