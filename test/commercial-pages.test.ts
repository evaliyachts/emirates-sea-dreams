import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { renderStaticRoute } from "../src/entry-server";
import { publishableYachts } from "../src/data/yachts";
import { approvedServices } from "../src/data/approved-services";
import { publishedFleetSummary } from "../src/lib/published-fleet";
import {
  HOMEPAGE_FEATURED_YACHT_LIMIT,
  selectHomepageFeaturedYachts,
} from "../src/lib/homepage-featured-yachts";
import {
  approvedCommercialConsolidations,
  approvedRedirects,
  commercialCandidateRegistry,
  englishRouteManifest,
  occasionDispositions,
  publishedStaticRoutes,
} from "../seo/index";

const commercialPaths = ["/", "/yachts", "/services", "/occasions"] as const;
const read = (path: string) => readFileSync(resolve(path), "utf8");
const render = (path: string) => {
  const result = renderStaticRoute(path);
  const document = new JSDOM(result.html).window.document;
  const content = document.querySelector<HTMLElement>("[data-commercial-content]");
  if (!content) throw new Error(`${path}: commercial content boundary is missing.`);
  return { ...result, document, content };
};
const plainText = (element: Element) => (element.textContent ?? "").replace(/\s+/g, " ").trim();
const metadata = (head: string) => ({
  title: head.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] ?? "",
  description: head.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1] ?? "",
});

describe("PR 5 commercial decision owners", () => {
  it("keeps the evidence-safe default: four existing owners and no candidate page", () => {
    expect(commercialCandidateRegistry).toHaveLength(6);
    expect(commercialCandidateRegistry.every((candidate) =>
      !candidate.creationApproved && !candidate.routed && !candidate.indexable && !candidate.sitemapListed
    )).toBe(true);
    expect(approvedRedirects).toHaveLength(0);
    expect(approvedCommercialConsolidations).toHaveLength(0);
    expect(publishedStaticRoutes).toHaveLength(38);

    const sitemap = read("public/sitemap.xml");
    expect([...sitemap.matchAll(/<loc>/g)]).toHaveLength(38);
    commercialCandidateRegistry.forEach((candidate) => expect(sitemap).not.toContain(candidate.path));
  });

  it("uses manifest-owned unique metadata, H1s, introductions, FAQs, headings and intents", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const h1s = new Set<string>();
    const introductions = new Set<string>();
    const faqSets = new Set<string>();
    const headingSets = new Set<string>();
    const intents = new Set<string>();

    commercialPaths.forEach((path) => {
      const page = render(path);
      const route = englishRouteManifest.find((record) => record.path === path);
      const pageMetadata = metadata(page.head);
      const h1 = plainText(page.content.querySelector("h1")!);
      const introduction = plainText(page.content.querySelector("[data-page-introduction]")!);
      const faqs = [...page.content.querySelectorAll("[data-faq-question]")].map(plainText);
      const headings = [...page.content.querySelectorAll("h2")].map(plainText);

      expect(route?.metadataOwnership).toMatchObject({
        status: "approved",
        title: pageMetadata.title,
        description: pageMetadata.description,
        h1,
      });
      expect(route?.primaryIntent).toBeTruthy();
      expect(page.content.querySelectorAll("h1")).toHaveLength(1);
      expect(introduction.split(/\s+/).length).toBeGreaterThan(25);
      expect(faqs.length).toBeGreaterThanOrEqual(4);
      expect(headings.length).toBeGreaterThanOrEqual(5);
      expect(plainText(page.content).split(/\s+/).length).toBeGreaterThan(350);

      titles.add(pageMetadata.title);
      descriptions.add(pageMetadata.description);
      h1s.add(h1);
      introductions.add(introduction);
      faqSets.add(JSON.stringify(faqs));
      headingSets.add(JSON.stringify(headings));
      intents.add(route!.primaryIntent);
    });

    [titles, descriptions, h1s, introductions, faqSets, headingSets, intents]
      .forEach((values) => expect(values).toHaveLength(4));
  });

  it("derives homepage and catalogue decision facts from all 19 published records", () => {
    expect(publishableYachts).toHaveLength(19);
    expect(publishedFleetSummary).toEqual({
      yachtCount: 19,
      lengthFt: { minimum: 42, maximum: 143 },
      guestCapacity: { minimum: 12, maximum: 130 },
      pricePerHour: { minimum: 500, maximum: 5000 },
      minimumDuration: { minimum: 2, maximum: 4 },
    });

    const homeText = plainText(render("/").content);
    expect(homeText).toContain("19 verified yacht records");
    expect(homeText).toContain("42 to 143 feet");
    expect(homeText).toContain("AED 500 to AED 5,000");

    const catalogue = render("/yachts").content;
    const yachtLinks = [...catalogue.querySelectorAll<HTMLAnchorElement>('a[href^="/yachts/"]')]
      .map((link) => link.getAttribute("href"));
    expect(new Set(yachtLinks)).toHaveLength(19);
    publishableYachts.forEach((yacht) => expect(yachtLinks).toContain(`/yachts/${yacht.slug}`));
  });

  it("keeps five planning categories, links ten approved services and creates no occasion routes", () => {
    const services = render("/services").content;
    const occasions = render("/occasions").content;
    expect(services.querySelectorAll("[data-service-category]")).toHaveLength(5);
    expect(occasions.querySelectorAll("[data-occasion-theme]")).toHaveLength(7);
    expect(occasionDispositions).toHaveLength(7);
    expect(occasionDispositions.every((occasion) => !occasion.pageCreationApproved)).toBe(true);
    expect([...services.querySelectorAll('[data-approved-service-link]')]).toHaveLength(10);
    expect(new Set([...services.querySelectorAll<HTMLAnchorElement>('[data-approved-service-link]')]
      .map((link) => link.getAttribute("href")))).toEqual(new Set(approvedServices.map((service) => service.path)));
    expect([...occasions.querySelectorAll('a[href^="/occasions/"]')]).toHaveLength(0);
  });

  it("links changed content only to published canonical owners or same-page fragments", () => {
    const publishedPaths = new Set(publishedStaticRoutes.map((route) => route.path));
    commercialPaths.forEach((path) => {
      const content = render(path).content;
      for (const anchor of content.querySelectorAll<HTMLAnchorElement>("a[href]")) {
        const href = anchor.getAttribute("href")!;
        if (href.startsWith("#")) continue;
        const target = new URL(href, "https://yachtrentaldxb.com");
        expect(target.origin).toBe("https://yachtrentaldxb.com");
        expect(publishedPaths.has(target.pathname)).toBe(true);
      }
      expect(content.innerHTML).not.toContain('href="/contact"');
      commercialCandidateRegistry.forEach((candidate) => expect(content.innerHTML).not.toContain(candidate.path));
    });
  });

  it("keeps the published-page directory factual while documenting global navigation as transitional", () => {
    const page = render("/");
    const directory = page.document.querySelector('[aria-label="Sitemap"]')!;
    const publishedPaths = new Set(publishedStaticRoutes.map((route) => route.path));
    const directoryLinks = [...directory.querySelectorAll<HTMLAnchorElement>("a[href]")];
    expect(directoryLinks).toHaveLength(9 + publishableYachts.length + approvedServices.length);
    directoryLinks.forEach((link) => expect(publishedPaths.has(link.getAttribute("href")!)).toBe(true));

    const footerText = plainText(page.document.querySelector("footer")!);
    expect(footerText).not.toMatch(/licensed crew|Dubai Marina|operating hours|24\/7|pickup/i);
    expect(footerText).toContain("Availability and optional services require confirmation");
  });

  it("publishes private positioning and confirmation boundaries without prohibited claims or schema", () => {
    const output = commercialPaths.map((path) => {
      const page = render(path);
      return `${page.head}\n${page.content.innerHTML}`;
    }).join("\n");

    expect(plainText(render("/").content)).toMatch(/not described as a public, ticketed or shared cruise/i);
    expect(output).not.toMatch(/licensed crew|five[- ]star|marina pickup|fuel is included|drinks are included|guaranteed availability|best price|customer testimonial|aggregate rating|maritime insurance/i);
    expect(output).not.toMatch(/schema\.org\/(?:Event|Product|LocalBusiness|Review|AggregateRating)|FAQPage/i);
    expect(output).not.toMatch(/hreflang|x-default|name="keywords"/i);
    expect(output).not.toMatch(/evaliyachts?|evaliyacht\.com|supabase\.co/i);
  });

  it("restores the full homepage visual sequence without changing PR 5 ownership", () => {
    const indexSource = read("src/pages/Index.tsx");
    expect(indexSource).toMatch(/components\/home\/HeroSection/);
    expect(indexSource).toMatch(/FeaturedYachts|ServicesSection|WhyChooseUs|ExperiencesSection/);
    expect(indexSource).toMatch(/PackagesSection|SEOContentSection|TestimonialsSection/);
    expect(indexSource).toMatch(/GallerySection|RoutesSection|HomeFAQ|CTAStrip/);
    expect(indexSource).toContain("data-commercial-content");

    const homepage = render("/");
    const sections = [...homepage.content.querySelectorAll<HTMLElement>("[data-home-section]")]
      .map((section) => section.dataset.homeSection);
    expect(sections).toEqual([
      "hero",
      "featured-yachts",
      "services",
      "decision-facts",
      "occasion-themes",
      "price-planning",
      "rental-guide",
      "planning-checkpoints",
      "fleet-gallery",
      "request-details",
      "faq",
      "final-actions",
    ]);
    expect(homepage.content.querySelectorAll('[data-home-section][style*="opacity:0"]')).toHaveLength(0);
  });

  it("restores six approved homepage yacht cards in source-priority order", () => {
    const featured = selectHomepageFeaturedYachts(publishableYachts);
    expect(featured).toHaveLength(HOMEPAGE_FEATURED_YACHT_LIMIT);
    expect(featured.map((yacht) => yacht.id)).toEqual([
      "yacht-royal-majesty-50",
      "yacht-majesty-56",
      "yacht-sunseeker-90",
      "yacht-majesty-88",
      "yacht-azimut-42",
      "yacht-majesty-44",
    ]);
    expect(featured.every((yacht) => yacht.publicationStatus === "publishable")).toBe(true);

    const homepage = render("/");
    const section = homepage.content.querySelector('[data-home-section="featured-yachts"]')!;
    expect(section.querySelectorAll("article")).toHaveLength(HOMEPAGE_FEATURED_YACHT_LIMIT);
    expect([...section.querySelectorAll<HTMLAnchorElement>('a[href^="/yachts/"]')]
      .map((link) => link.getAttribute("href")))
      .toEqual(featured.map((yacht) => `/yachts/${yacht.slug}`));
    expect(section.innerHTML).not.toMatch(/evaliyachts?|evali yacht|supabase\.co/i);
  });
});
