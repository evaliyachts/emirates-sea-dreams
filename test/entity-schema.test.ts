import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { publishedStaticRoutes } from "../seo";
import { siteFacts } from "../src/config/site-facts";
import { approvedServices } from "../src/data/approved-services";
import { publishableYachts } from "../src/data/yachts";
import { renderStaticRoute } from "../src/entry-server";
import {
  ORGANIZATION_ENTITY_ID,
  RESERVED_CONTACT_POINT_ENTITY_ID,
  WEBSITE_ENTITY_ID,
} from "../src/lib/entity-schema";

type JsonNode = Record<string, unknown>;

const renderSchema = (path: string) => {
  const rendered = renderStaticRoute(path);
  const document = new JSDOM(`<html><head>${rendered.head}</head><body>${rendered.html}</body></html>`).window.document;
  const scripts = [...document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')];
  const blocks = scripts.map((script) => JSON.parse(script.textContent ?? "") as JsonNode);
  const nodes = blocks.flatMap((block) => Array.isArray(block["@graph"]) ? block["@graph"] as JsonNode[] : [block]);
  return { rendered, document, scripts, blocks, nodes };
};

describe("English PR 7 entity schema ownership", () => {
  it("emits one stable WebSite and one minimal Organization on the homepage", () => {
    const page = renderSchema("/");
    expect(page.scripts).toHaveLength(1);
    expect(page.nodes.map((node) => node["@type"])).toEqual(["WebSite", "Organization"]);
    expect(page.nodes[0]).toEqual({
      "@type": "WebSite",
      "@id": WEBSITE_ENTITY_ID,
      name: "Dubai Yacht",
      url: "https://yachtrentaldxb.com/",
      publisher: { "@id": ORGANIZATION_ENTITY_ID },
    });
    expect(page.nodes[1]).toEqual({
      "@type": "Organization",
      "@id": ORGANIZATION_ENTITY_ID,
      name: "Dubai Yacht",
      url: "https://yachtrentaldxb.com/",
    });
    expect(page.document.title).toBe("Private Yacht Rental Dubai | Dubai Yacht");
    expect(page.document.querySelector('meta[property="og:site_name"]')?.getAttribute("content")).toBe("Dubai Yacht");
    expect(page.document.querySelector("h1")?.textContent).toContain("Dubai Yacht");
    expect(JSON.stringify(page.blocks)).not.toContain("alternateName");
  });

  it("emits BreadcrumbList only on each published hub", () => {
    for (const path of ["/yachts", "/services", "/occasions"]) {
      const page = renderSchema(path);
      expect(page.scripts).toHaveLength(1);
      expect(page.nodes.map((node) => node["@type"])).toEqual(["BreadcrumbList"]);
      expect(page.nodes[0]["@id"]).toBe(`https://yachtrentaldxb.com${path}#breadcrumb`);
    }
  });

  it("aligns yacht Service, Offer and breadcrumb facts with visible owners", () => {
    expect(publishableYachts).toHaveLength(19);
    for (const yacht of publishableYachts) {
      const path = `/yachts/${yacht.slug}`;
      const page = renderSchema(path);
      const service = page.nodes.find((node) => node["@type"] === "Service")!;
      const breadcrumb = page.nodes.find((node) => node["@type"] === "BreadcrumbList")!;
      expect(page.nodes).toHaveLength(2);
      expect(service).toMatchObject({
        "@id": `https://yachtrentaldxb.com${path}#service`,
        name: yacht.name,
        url: `https://yachtrentaldxb.com${path}`,
        provider: { "@id": ORGANIZATION_ENTITY_ID },
        offers: {
          "@type": "Offer",
          price: yacht.pricePerHour,
          priceCurrency: "AED",
          url: `https://yachtrentaldxb.com${path}`,
        },
      });
      expect(breadcrumb["@id"]).toBe(`https://yachtrentaldxb.com${path}#breadcrumb`);
      expect(JSON.stringify(page.blocks)).not.toMatch(/Product|AggregateRating|Review|ratingValue|reviewCount/);
    }
  });

  it("aligns all ten approved Service pages with the minimal provider entity", () => {
    expect(approvedServices).toHaveLength(10);
    for (const record of approvedServices) {
      const page = renderSchema(record.path);
      const service = page.nodes.find((node) => node["@type"] === "Service")!;
      expect(page.nodes.map((node) => node["@type"])).toEqual(["Service", "BreadcrumbList"]);
      expect(service).toMatchObject({
        "@id": `https://yachtrentaldxb.com${record.path}#service`,
        name: record.name,
        url: `https://yachtrentaldxb.com${record.path}`,
        provider: { "@id": ORGANIZATION_ENTITY_ID },
      });
      expect(service).not.toHaveProperty("offers");
      expect(page.document.querySelector("h1")?.textContent).toContain(record.metadata.h1);
    }
  });

  it("keeps breadcrumb items on exact published canonical owners", () => {
    const publishedPaths = new Set(publishedStaticRoutes.map((route) => route.path));
    for (const route of publishedStaticRoutes.filter((record) => record.path !== "/")) {
      const page = renderSchema(route.path);
      const breadcrumb = page.nodes.find((node) => node["@type"] === "BreadcrumbList")!;
      const items = breadcrumb.itemListElement as JsonNode[];
      expect(items.at(-1)?.item).toBe(`https://yachtrentaldxb.com${route.path}`);
      items.forEach((item, index) => {
        const url = new URL(item.item as string);
        expect(item.position).toBe(index + 1);
        expect(item.name).toEqual(expect.any(String));
        expect(publishedPaths.has(url.pathname)).toBe(true);
      });
    }
  });

  it("omits unapproved contact, location, rating and rich-result claims everywhere", () => {
    expect(siteFacts.brandName.status).toBe("pending");
    expect(siteFacts.phoneDisplay.status).toBe("pending");
    expect(siteFacts.publicAddress.status).toBe("pending");
    for (const route of publishedStaticRoutes) {
      const page = renderSchema(route.path);
      const value = JSON.stringify(page.blocks);
      expect(value).not.toContain(RESERVED_CONTACT_POINT_ENTITY_ID);
      expect(value).not.toMatch(/LocalBusiness|ContactPoint|Event|Product|Review|AggregateRating|FAQPage/);
      expect(value).not.toMatch(/"(?:address|geo|sameAs|openingHours|telephone|ratingValue|reviewCount)"\s*:/);
      expect(page.rendered.head).not.toMatch(/hreflang|x-default/i);
    }
  });
});
