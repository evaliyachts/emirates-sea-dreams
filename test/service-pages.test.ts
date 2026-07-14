import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { renderStaticRoute } from "../src/entry-server";
import {
  approvedServiceRecordSchema,
  approvedServices,
} from "../src/data/approved-services";
import { mediaRightsRegistry } from "../src/data/media-rights";
import { publishableYachts } from "../src/data/yachts";
import { verifyProductionServiceMedia } from "../scripts/media-verify";
import {
  approvedCommercialConsolidations,
  approvedRedirects,
  blockedStaticRoutes,
  canonicalUrlForPath,
  englishRouteManifest,
  publishedStaticRoutes,
  routeGroups,
} from "../seo/index";

const read = (path: string) => readFileSync(resolve(path), "utf8");
const approvedPaths = [
  "/services/birthday-party",
  "/services/marriage-proposal-party",
  "/services/wedding-anniversary-parties",
  "/services/engagement-parties",
  "/services/wedding-parties",
  "/services/graduation-parties",
  "/services/bachelor-parties",
  "/services/afternoon-tea-trip",
  "/services/morning-yacht-trips",
  "/services/barbecue-on-the-yacht",
] as const;
const blockedPaths = [
  "/services/engagement-and-wedding-parties",
  "/services/gender-reveal-party",
  "/services/food-menu",
  "/services/banana-boat-ride",
  "/services/donut-ride",
  "/services/jet-ski",
  "/services/swimming",
  "/services/fishing",
] as const;

const render = (path: string) => {
  const result = renderStaticRoute(path);
  const document = new JSDOM(`<html><head>${result.head}</head><body>${result.html}</body></html>`).window.document;
  return { ...result, document };
};
const text = (element: Element | null) => (element?.textContent ?? "").replace(/\s+/g, " ").trim();

describe("English PR 6B approved service owners", () => {
  it("publishes exactly ten approved owners and keeps the other eight blocked", () => {
    expect(routeGroups.services).toHaveLength(18);
    expect(approvedServices).toHaveLength(10);
    expect(approvedServices.map((service) => service.path)).toEqual(approvedPaths);
    expect(routeGroups.services.filter((route) => route.decisionStatus === "approved").map((route) => route.path).sort())
      .toEqual([...approvedPaths].sort());
    expect(routeGroups.services.filter((route) => route.decisionStatus === "blocked").map((route) => route.path).sort())
      .toEqual([...blockedPaths].sort());
    expect(publishedStaticRoutes.filter((route) => route.pageType === "service").map((route) => route.path).sort())
      .toEqual([...approvedPaths].sort());
    expect(blockedStaticRoutes.filter((route) => route.pageType === "service").map((route) => route.path).sort())
      .toEqual([...blockedPaths].sort());
    expect(publishedStaticRoutes).toHaveLength(38);

    const sitemap = read("public/sitemap.xml");
    expect([...sitemap.matchAll(/<loc>/g)]).toHaveLength(38);
    approvedPaths.forEach((path) => expect(sitemap).toContain(canonicalUrlForPath(path)));
    blockedPaths.forEach((path) => expect(sitemap).not.toContain(canonicalUrlForPath(path)));
  });

  it("uses a strict service contract that rejects unknown top-level and media fields", () => {
    expect(approvedServiceRecordSchema.safeParse({ ...approvedServices[0], inventedFact: true }).success).toBe(false);
    const withMedia = approvedServices.find((service) => service.media)!;
    expect(approvedServiceRecordSchema.safeParse({
      ...withMedia,
      media: { ...withMedia.media, inheritedCaption: "not approved" },
    }).success).toBe(false);
    expect(new Set(approvedServices.map((service) => service.id))).toHaveLength(10);
    expect(new Set(approvedServices.map((service) => service.slug))).toHaveLength(10);
    expect(new Set(approvedServices.map((service) => service.path))).toHaveLength(10);
  });

  it("gives every page unique metadata, H1, introduction, direct answer, audience, sections and FAQs", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const h1s = new Set<string>();
    const introductions = new Set<string>();
    const directAnswers = new Set<string>();
    const audiences = new Set<string>();
    const suitableGroupSets = new Set<string>();
    const headingSets = new Set<string>();
    const faqSets = new Set<string>();

    approvedServices.forEach((service) => {
      const page = render(service.path);
      const content = page.document.querySelector(`[data-service-id="${service.id}"]`)!;
      const route = englishRouteManifest.find((record) => record.path === service.path)!;
      const title = page.document.title;
      const description = page.document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
      const h1 = text(content.querySelector("h1"));
      const introduction = text(content.querySelector("[data-page-introduction]"));
      const directAnswer = text(content.querySelector("[data-direct-answer]"));
      const audience = service.whoItIsFor;
      const headings = [...content.querySelectorAll("h2")].map(text);
      const faqs = [...content.querySelectorAll("[data-faq-question]")].map(text);

      expect(route.metadataOwnership).toMatchObject({ status: "approved", title, description, h1 });
      expect(content.querySelectorAll("h1")).toHaveLength(1);
      expect(introduction.split(/\s+/).length).toBeGreaterThan(35);
      expect(directAnswer.split(/\s+/).length).toBeGreaterThan(30);
      expect(text(content)).toContain(audience);
      service.suitableGroupTypes.forEach((group) => expect(text(content)).toContain(group));
      expect(headings).toContain("Who this request is for");
      expect(text(content)).toContain("Suitable group or occasion types");
      expect(headings.length).toBeGreaterThanOrEqual(9);
      expect(faqs).toHaveLength(4);
      expect(text(content).split(/\s+/).length).toBeGreaterThan(500);

      titles.add(title);
      descriptions.add(description);
      h1s.add(h1);
      introductions.add(introduction);
      directAnswers.add(directAnswer);
      audiences.add(audience);
      suitableGroupSets.add(JSON.stringify(service.suitableGroupTypes));
      headingSets.add(JSON.stringify(headings));
      faqSets.add(JSON.stringify(faqs));
    });

    [titles, descriptions, h1s, introductions, directAnswers, audiences, suitableGroupSets, headingSets, faqSets]
      .forEach((values) => expect(values).toHaveLength(10));
  });

  it("selects exactly three unique published yachts per service using verified fields only", () => {
    const publishableById = new Map(publishableYachts.map((yacht) => [yacht.id, yacht]));
    approvedServices.forEach((service) => {
      expect(service.yachtIds).toHaveLength(3);
      expect(new Set(service.yachtIds)).toHaveLength(3);
      service.yachtIds.forEach((id) => expect(publishableById.has(id)).toBe(true));

      const content = render(service.path).document.querySelector(`[data-service-id="${service.id}"]`)!;
      const links = [...content.querySelectorAll<HTMLAnchorElement>('a[href^="/yachts/"]')]
        .map((link) => link.getAttribute("href"));
      expect(links).toEqual(service.yachtIds.map((id) => `/yachts/${publishableById.get(id)!.slug}`));
      expect(text(content)).toContain(service.yachtSelectionNote);
      expect(text(content)).not.toMatch(/event equipment included|built-in party equipment|guaranteed compatibility/i);
    });
  });

  it("keeps optional extras, hospitality and respectful-event limits visible", () => {
    approvedServices.forEach((service) => {
      const content = text(render(service.path).document.querySelector(`[data-service-id="${service.id}"]`));
      expect(content.toLowerCase()).toContain("on request and subject to confirmation");
      expect(content.toLowerCase()).toContain("optional request");
      expect(content.toLowerCase()).toContain("separate pricing");
      expect(content).not.toMatch(/\bincluded\b|\ball-inclusive\b|\bguaranteed\b|\bfree\b|fixed route|fixed duration|instant confirmation|open bar|fireworks|licensed crew|maritime insurance/i);
    });

    const bachelor = text(render("/services/bachelor-parties").document.querySelector("[data-service-content]"));
    expect(bachelor).toMatch(/respectful private group experience/i);
    expect(bachelor).toMatch(/conduct.*yacht rules/i);
    expect(bachelor).not.toMatch(/wild party/i);

    const wedding = text(render("/services/wedding-parties").document.querySelector("[data-service-content]"));
    expect(wedding).toMatch(/does not establish legal ceremony authority/i);

    const proposal = text(render("/services/marriage-proposal-party").document.querySelector("[data-service-content]"));
    expect(proposal).toMatch(/letters, candles, flowers, decoration, dinner and photography remain optional/i);

    ["/services/afternoon-tea-trip", "/services/morning-yacht-trips", "/services/barbecue-on-the-yacht"].forEach((path) => {
      const content = text(render(path).document.querySelector("[data-service-content]"));
      expect(content).toMatch(/menu.*supplier.*lead time.*separate price/i);
      expect(content).not.toMatch(/standard menu|breakfast is included|tea is included|BBQ is included/i);
    });
  });

  it("provides a safe booking CTA and links only to published owners or approved anchors", () => {
    const publishedPaths = new Set(publishedStaticRoutes.map((route) => route.path));
    approvedServices.forEach((service) => {
      const content = render(service.path).document.querySelector(`[data-service-id="${service.id}"]`)!;
      const cta = content.querySelector<HTMLAnchorElement>("[data-service-booking-cta]");
      const disclaimer = text(content.querySelector("[data-service-confirmation-disclaimer]"));

      expect(cta?.getAttribute("href")).toBe("/#booking-request-guide");
      expect(text(cta)).toBe("Prepare a booking request");
      expect(disclaimer).toContain("does not reserve a yacht or confirm availability");
      expect(disclaimer).toContain("final written offer or WhatsApp confirmation");
      expect(disclaimer).not.toMatch(/instant confirmation|guaranteed/i);

      [...content.querySelectorAll<HTMLAnchorElement>("a[href]")].forEach((link) => {
        const href = link.getAttribute("href")!;
        expect(href === "/#booking-request-guide" || href.startsWith("#") || publishedPaths.has(href)).toBe(true);
      });
    });
  });

  it("emits only Service and BreadcrumbList schema with exact canonical ownership", () => {
    approvedServices.forEach((service) => {
      const page = render(service.path);
      const canonical = page.document.querySelector('link[rel="canonical"]')?.getAttribute("href");
      const robots = page.document.querySelector('meta[name="robots"]')?.getAttribute("content");
      const scripts = [...page.document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')];
      expect(canonical).toBe(canonicalUrlForPath(service.path));
      expect(robots).toBe("index, follow");
      expect(scripts).toHaveLength(1);
      const graph = JSON.parse(scripts[0].textContent ?? "")["@graph"] as Array<Record<string, unknown>>;
      expect(graph.map((node) => node["@type"])).toEqual(["Service", "BreadcrumbList"]);
      expect(graph[0]).toMatchObject({ name: service.name, url: canonicalUrlForPath(service.path) });
      expect(JSON.stringify(graph)).not.toMatch(/Event|FAQPage|Product|Review|AggregateRating|LocalBusiness|Offer|rating/i);
      expect(page.head).not.toMatch(/og:image|twitter:image|hreflang|x-default|name="keywords"/i);
    });
  });

  it("uses seven exact local primary images and preserves three text-only pages", async () => {
    const withMedia = approvedServices.filter((service) => service.media);
    const textOnly = approvedServices.filter((service) => !service.media);
    expect(withMedia).toHaveLength(7);
    expect(textOnly.map((service) => service.path).sort()).toEqual([
      "/services/afternoon-tea-trip",
      "/services/bachelor-parties",
      "/services/morning-yacht-trips",
    ].sort());

    withMedia.forEach((service) => {
      expect(service.media!.path).toMatch(/^\/media\/home\/services\//);
      const rights = mediaRightsRegistry.find((record) => record.id === service.media!.rightsRecordId)!;
      expect(rights.productionPath).toBe(service.media!.path);
      expect(rights.approvedSurfaces).toContain(`Service detail primary image: ${service.path}`);
      expect(rights.socialPreviewApproved).toBe(false);
      const image = render(service.path).document.querySelector<HTMLImageElement>(`[data-service-content] img[src="${service.media!.path}"]`)!;
      expect(image.getAttribute("loading")).toBe("eager");
      expect(image.getAttribute("fetchpriority")).toBe("high");
      expect(image.getAttribute("width")).toBe(`${service.media!.width}`);
      expect(image.getAttribute("height")).toBe(`${service.media!.height}`);
      expect(image.getAttribute("alt")).toBe(service.media!.alt);
    });
    textOnly.forEach((service) => {
      const content = render(service.path).document.querySelector(`[data-service-id="${service.id}"]`)!;
      expect(content.querySelector('img[src^="/media/home/services/"]')).toBeNull();
    });
    await expect(verifyProductionServiceMedia()).resolves.toEqual({ serviceCount: 10, imageCount: 7, textOnlyCount: 3 });
  });

  it("keeps blocked routes, candidates and redirects out of production output", () => {
    const netlify = read("netlify.toml");
    const sitemap = read("public/sitemap.xml");
    blockedPaths.forEach((path) => {
      expect(netlify).not.toContain(`from = "${path}"`);
      expect(sitemap).not.toContain(canonicalUrlForPath(path));
      const result = renderStaticRoute(path);
      expect(result.html).toContain("Page not found");
      expect(result.head).toContain('name="robots" content="noindex, follow"');
      expect(result.head).not.toContain('rel="canonical"');
    });
    expect(approvedRedirects).toHaveLength(0);
    expect(approvedCommercialConsolidations).toHaveLength(0);
    expect(netlify).not.toMatch(/status = 30[12]|from = "\/\*"/);
  });

  it("removes the inherited service feed from runtime use without changing later-phase owners", () => {
    const servicePage = read("src/pages/ServiceDetails.tsx");
    const routeHelper = read("src/test/route-helpers.test.ts");
    expect(`${servicePage}\n${routeHelper}`).not.toMatch(/@\/data\/services/);
    expect(servicePage).toMatch(/@\/data\/approved-services/);
    expect(JSON.stringify(approvedServices)).not.toMatch(/evaliyachts?|evali yacht|supabase\.co|schema_json_ld|ratingValue|reviewCount/i);
    expect(englishRouteManifest).toHaveLength(52);
    expect(approvedRedirects).toHaveLength(0);
    expect(approvedCommercialConsolidations).toHaveLength(0);
  });
});
