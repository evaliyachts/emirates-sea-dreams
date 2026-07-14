import { BRAND_NAME, DOMAIN } from "@/lib/constants";

export const WEBSITE_ENTITY_ID = `${DOMAIN}/#website`;
export const ORGANIZATION_ENTITY_ID = `${DOMAIN}/#organization`;
export const RESERVED_CONTACT_POINT_ENTITY_ID = `${DOMAIN}/#contact-point`;

export type JsonLdNode = Record<string, unknown>;

export interface BreadcrumbItemInput {
  name: string;
  path: string;
}

export const organizationReference = { "@id": ORGANIZATION_ENTITY_ID } as const;

export const schemaGraph = (nodes: readonly JsonLdNode[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

export const buildHomepageEntitySchema = () => schemaGraph([
  {
    "@type": "WebSite",
    "@id": WEBSITE_ENTITY_ID,
    name: BRAND_NAME,
    url: `${DOMAIN}/`,
    publisher: organizationReference,
  },
  {
    "@type": "Organization",
    "@id": ORGANIZATION_ENTITY_ID,
    name: BRAND_NAME,
    url: `${DOMAIN}/`,
  },
]);

export const buildBreadcrumbNode = (pagePath: string, items: readonly BreadcrumbItemInput[]) => ({
  "@type": "BreadcrumbList",
  "@id": `${DOMAIN}${pagePath}#breadcrumb`,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${DOMAIN}${item.path}`,
  })),
});

export const buildBreadcrumbSchema = (pagePath: string, items: readonly BreadcrumbItemInput[]) =>
  schemaGraph([buildBreadcrumbNode(pagePath, items)]);
