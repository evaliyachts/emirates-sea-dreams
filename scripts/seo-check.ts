import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import {
  ENGLISH_PRODUCTION_ORIGIN,
  approvedCommercialConsolidations,
  approvedRedirects,
  blockedStaticRoutes,
  blockedYachts,
  canonicalUrlForPath,
  commercialCandidateRegistry,
  englishRouteManifest,
  englishArabicRouteMappings,
  generateEnglishArabicMappingReport,
  languageMappingSummary,
  languageMappingPendingRouteIds,
  occasionDispositions,
  publishedStaticRoutes,
  routeGroups,
  searchConsoleAggregateBaseline,
  validateEnglishSeoOwnership,
  validateEnglishArabicRouteMappings,
  yachtCatalogueRegistry,
} from "../seo/index";
import { mediaRightsRegistry } from "../src/data/media-rights";
import { approvedServices } from "../src/data/approved-services";
import { publishableYachts } from "../src/data/yachts";
import { siteFacts } from "../src/config/site-facts";
import { BRAND_NAME } from "../src/lib/constants";
import {
  ORGANIZATION_ENTITY_ID,
  RESERVED_CONTACT_POINT_ENTITY_ID,
  WEBSITE_ENTITY_ID,
} from "../src/lib/entity-schema";

const failures = [...validateEnglishSeoOwnership(), ...validateEnglishArabicRouteMappings()];
const read = (path: string) => readFile(resolve(path), "utf8");
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const routeFile = (path: string) => path === "/" ? "dist/index.html" : `dist/_static${path}.html`;
const matchAttr = (html: string, tag: string, attribute: string, value: string, target: string) =>
  html.match(new RegExp(`<${tag}[^>]*${attribute}=["']${escape(value)}["'][^>]*${target}=["']([^"']*)["'][^>]*>`, "i"))?.[1];

const titles = new Set<string>();
const descriptions = new Set<string>();
const canonicals = new Set<string>();
const h1s = new Set<string>();
const publishedYachtRoutes = publishedStaticRoutes.filter((route) => route.pageType === "yacht");
const publishedServiceRoutes = publishedStaticRoutes.filter((route) => route.pageType === "service");
const publishedYachtsById = new Map(publishableYachts.map((yacht) => [yacht.id, yacht]));
const publishedServicesById = new Map(approvedServices.map((service) => [service.id, service]));
const commercialPaths = new Set(["/", "/yachts", "/services", "/occasions"]);
const supportPaths = new Set(["/about", "/faq", "/contact", "/terms", "/privacy"]);
const publishedPaths = new Set(publishedStaticRoutes.map((route) => route.path));

if (yachtCatalogueRegistry.length !== 24) failures.push(`Yacht inventory must contain 24 dispositions; found ${yachtCatalogueRegistry.length}.`);
if (publishableYachts.length + blockedYachts.length !== 24) failures.push("Publishable and blocked yacht counts must total 24.");
if (publishedYachtRoutes.length !== publishableYachts.length) failures.push("Generated yacht route count must equal publishable yacht count.");
if (publishedYachtRoutes.some((route) => !publishedYachtsById.has(route.id))) failures.push("A yacht route was published without a strict publishable record.");
if (publishedServiceRoutes.length !== approvedServices.length) failures.push("Generated service route count must equal the owner-approved service count.");
if (publishedServiceRoutes.some((route) => !publishedServicesById.has(route.id))) failures.push("A service route was published without a strict owner-approved record.");

for (const yacht of publishableYachts) {
  const paths = yacht.media.map((media) => media.path);
  if (new Set(paths).size !== paths.length) failures.push(`${yacht.id}: duplicate media paths.`);
  for (const media of yacht.media) {
    const rights = mediaRightsRegistry.find((record) => record.id === media.rightsRecordId);
    if (!rights || rights.productionPath !== media.path || !rights.approvedHosts.includes("yachtrentaldxb.com")) {
      failures.push(`${yacht.id}: media lacks an exact approved English-domain rights record.`);
    }
    if (/^https:\/\//.test(media.path) && new URL(media.path).hostname !== new URL(rights?.productionPath ?? media.path).hostname) {
      failures.push(`${yacht.id}: remote media final authority is not allowlisted.`);
    }
  }
}

for (const route of publishedStaticRoutes) {
  const html = await read(routeFile(route.path));
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim() ?? "";
  const description = matchAttr(head, "meta", "name", "description", "content") ?? "";
  const robots = matchAttr(head, "meta", "name", "robots", "content") ?? "";
  const canonical = matchAttr(head, "link", "rel", "canonical", "href") ?? "";
  const ogUrl = matchAttr(head, "meta", "property", "og:url", "content") ?? "";
  const ogSiteName = matchAttr(head, "meta", "property", "og:site_name", "content") ?? "";
  const ogTitle = matchAttr(head, "meta", "property", "og:title", "content") ?? "";
  const ogDescription = matchAttr(head, "meta", "property", "og:description", "content") ?? "";
  const twitterTitle = matchAttr(head, "meta", "name", "twitter:title", "content") ?? "";
  const twitterDescription = matchAttr(head, "meta", "name", "twitter:description", "content") ?? "";
  const ogImage = matchAttr(head, "meta", "property", "og:image", "content") ?? "";
  const ogImageAlt = matchAttr(head, "meta", "property", "og:image:alt", "content") ?? "";
  const ogImageWidth = matchAttr(head, "meta", "property", "og:image:width", "content") ?? "";
  const ogImageHeight = matchAttr(head, "meta", "property", "og:image:height", "content") ?? "";
  const twitterImage = matchAttr(head, "meta", "name", "twitter:image", "content") ?? "";
  const twitterImageAlt = matchAttr(head, "meta", "name", "twitter:image:alt", "content") ?? "";
  const h1Matches = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1 = (h1Matches[0]?.[1] ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const expectedCanonical = canonicalUrlForPath(route.path);
  const visible = body.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&[a-z0-9#]+;/gi, " ").replace(/\s+/g, " ").trim();

  if (!/<html\s+lang="en"/i.test(html)) failures.push(`${route.path}: html lang must be en.`);
  if (!/<meta\s+charset="UTF-8"/i.test(head)) failures.push(`${route.path}: charset is missing.`);
  if (!/name="viewport"/i.test(head)) failures.push(`${route.path}: viewport is missing.`);
  if (!title || !description) failures.push(`${route.path}: title or description is missing.`);
  if ((head.match(/<title\b/gi) ?? []).length !== 1) failures.push(`${route.path}: exactly one title is required.`);
  if ((head.match(/<meta[^>]*name=["']description["']/gi) ?? []).length !== 1) failures.push(`${route.path}: exactly one description is required.`);
  if ((head.match(/<link[^>]*rel=["']canonical["']/gi) ?? []).length !== 1) failures.push(`${route.path}: exactly one canonical is required.`);
  if (robots.toLowerCase() !== "index, follow") failures.push(`${route.path}: robots must be index, follow.`);
  if (canonical !== expectedCanonical || ogUrl !== expectedCanonical) failures.push(`${route.path}: canonical/og:url mismatch.`);
  if (ogTitle !== title || twitterTitle !== title || ogDescription !== description || twitterDescription !== description) {
    failures.push(`${route.path}: social metadata does not match title/description.`);
  }
  if (ogSiteName !== BRAND_NAME) failures.push(`${route.path}: og:site_name must use the visible Dubai Yacht brand.`);
  if ((ogImage && !/^https:\/\//.test(ogImage)) || (twitterImage && !/^https:\/\//.test(twitterImage))) {
    failures.push(`${route.path}: social image URLs must be absolute HTTPS URLs.`);
  }
  if (h1Matches.length !== 1 || !h1) failures.push(`${route.path}: exactly one non-empty H1 is required.`);
  if (visible.length < 100) failures.push(`${route.path}: initial HTML lacks substantial visible text.`);
  if (/name=["']keywords["']/i.test(head)) failures.push(`${route.path}: meta keywords output is prohibited.`);
  if (/yachtrentaldxb\.netlify\.app|https:\/\/yacht-dxb\.com/i.test(head)) failures.push(`${route.path}: forbidden metadata authority.`);
  if (/hreflang\s*=|x-default/i.test(head)) failures.push(`${route.path}: live language alternates are prohibited.`);
  if (/<!--app-(?:head|html)-->/i.test(html)) failures.push(`${route.path}: static template markers remain.`);
  if ((route.path === "/yachts" || route.pageType === "yacht") && /evaliyachts?|evali yacht|evaliyacht\.com|evaliyachts\.com/i.test(`${head}\n${visible}`)) {
    failures.push(`${route.path}: inherited Evali branding or authority appears in generated yacht output.`);
  }

  if (commercialPaths.has(route.path)) {
    const ownership = route.metadataOwnership;
    if (
      ownership.status !== "approved" ||
      ownership.title !== title ||
      ownership.description !== description ||
      ownership.h1 !== h1
    ) {
      failures.push(`${route.path}: rendered metadata/H1 must match the approved PR 5 manifest ownership.`);
    }
    const commercialContent = body.match(/data-commercial-content="true">([\s\S]*?)<\/main>/i)?.[1] ?? "";
    if (!commercialContent) failures.push(`${route.path}: PR 5 content boundary is missing.`);
    for (const href of [...commercialContent.matchAll(/href="([^"]+)"/g)].map((match) => match[1])) {
      if (href.startsWith("#")) continue;
      const target = new URL(href, ENGLISH_PRODUCTION_ORIGIN);
      if (target.origin !== ENGLISH_PRODUCTION_ORIGIN || !publishedPaths.has(target.pathname)) {
        failures.push(`${route.path}: changed commercial content links to unpublished destination ${href}.`);
      }
    }
    if (/licensed crew|five[- ]star|marina pickup|fuel is included|drinks are included|guaranteed availability|best price|customer testimonial|maritime insurance/i.test(commercialContent)) {
      failures.push(`${route.path}: an unverified commercial claim survived in changed content.`);
    }
  }

  const jsonLd = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const schemaNodes: Array<Record<string, unknown>> = [];
  jsonLd.forEach((block, index) => {
    try {
      const parsed = JSON.parse(block[1]) as Record<string, unknown>;
      const value = JSON.stringify(parsed);
      if (/LocalBusiness|Product|AggregateRating|Review|Event|FAQPage/.test(value)) {
        failures.push(`${route.path}: prohibited schema type in JSON-LD block ${index + 1}.`);
      }
      if (/"(?:address|geo|sameAs|openingHours|telephone|contactType|ratingValue|reviewCount)"\s*:/.test(value)) {
        failures.push(`${route.path}: unapproved entity, contact, location or rating fact in JSON-LD block ${index + 1}.`);
      }
      const nodes = Array.isArray(parsed["@graph"])
        ? parsed["@graph"].filter((node): node is Record<string, unknown> => Boolean(node && typeof node === "object"))
        : [parsed];
      schemaNodes.push(...nodes);
      for (const node of nodes) {
        const id = node["@id"];
        if (typeof id === "string" && !id.startsWith(`${ENGLISH_PRODUCTION_ORIGIN}/`)) {
          failures.push(`${route.path}: schema @id uses an invalid authority.`);
        }
      }
    } catch {
      failures.push(`${route.path}: invalid JSON-LD block ${index + 1}.`);
    }
  });

  const breadcrumb = schemaNodes.find((node) => node["@type"] === "BreadcrumbList");
  if (route.path === "/") {
    const websiteNodes = schemaNodes.filter((node) => node["@type"] === "WebSite");
    const organizationNodes = schemaNodes.filter((node) => node["@type"] === "Organization");
    if (jsonLd.length !== 1 || schemaNodes.length !== 2 || websiteNodes.length !== 1 || organizationNodes.length !== 1) {
      failures.push("/: homepage schema must contain exactly one WebSite and one Organization in one graph.");
    }
    const website = websiteNodes[0];
    const organization = organizationNodes[0];
    if (website?.["@id"] !== WEBSITE_ENTITY_ID || website?.name !== BRAND_NAME || website?.url !== `${ENGLISH_PRODUCTION_ORIGIN}/`) {
      failures.push("/: WebSite identity does not match the stable English site owner.");
    }
    if (JSON.stringify(website?.publisher) !== JSON.stringify({ "@id": ORGANIZATION_ENTITY_ID })) {
      failures.push("/: WebSite publisher must reference the stable Organization owner.");
    }
    if (organization?.["@id"] !== ORGANIZATION_ENTITY_ID || organization?.name !== BRAND_NAME || organization?.url !== `${ENGLISH_PRODUCTION_ORIGIN}/`) {
      failures.push("/: Organization identity must remain minimal and match the visible brand.");
    }
    if ("alternateName" in (website ?? {}) || !title.includes(BRAND_NAME) || !h1.includes(BRAND_NAME)) {
      failures.push("/: site-name signals must use Dubai Yacht without an unapproved alternate name.");
    }
    if ((visible.match(/Dubai Yacht/g) ?? []).length < 2) failures.push("/: visible header/footer brand signals are inconsistent.");
  } else {
    if (!breadcrumb) failures.push(`${route.path}: published inner route requires BreadcrumbList ownership.`);
    if (breadcrumb?.["@id"] !== `${expectedCanonical}#breadcrumb`) failures.push(`${route.path}: BreadcrumbList has an unstable @id.`);
    const items = Array.isArray(breadcrumb?.itemListElement)
      ? breadcrumb.itemListElement.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"))
      : [];
    if (!items.length || items.at(-1)?.item !== expectedCanonical) failures.push(`${route.path}: breadcrumb current item must equal the canonical URL.`);
    items.forEach((item, index) => {
      const itemUrl = item.item;
      if (item.position !== index + 1 || typeof item.name !== "string" || !item.name || typeof itemUrl !== "string") {
        failures.push(`${route.path}: breadcrumb positions, names and URLs must be complete.`);
        return;
      }
      const target = new URL(itemUrl);
      if (target.origin !== ENGLISH_PRODUCTION_ORIGIN || !publishedPaths.has(target.pathname)) {
        failures.push(`${route.path}: breadcrumb points to an unpublished owner ${itemUrl}.`);
      }
    });
  }

  if (schemaNodes.some((node) => node["@type"] === "ContactPoint" || node["@id"] === RESERVED_CONTACT_POINT_ENTITY_ID)) {
    failures.push(`${route.path}: ContactPoint remains pending and must not be emitted.`);
  }

  if (route.pageType === "yacht") {
    const yacht = publishedYachtsById.get(route.id);
    if (!yacht) {
      failures.push(`${route.path}: generated detail lacks a publishable record.`);
    } else {
      if (!visible.includes(yacht.name) || !visible.includes(`${yacht.pricePerHour.toLocaleString()}`)) {
        failures.push(`${route.path}: visible yacht facts do not match the strict record.`);
      }
      const primaryImage = yacht.media.find((media) => media.featured) ?? yacht.media[0];
      if (
        ogImage !== primaryImage.path ||
        twitterImage !== primaryImage.path ||
        ogImageAlt !== primaryImage.alt ||
        twitterImageAlt !== primaryImage.alt ||
        ogImageWidth !== `${primaryImage.width}` ||
        ogImageHeight !== `${primaryImage.height}`
      ) {
        failures.push(`${route.path}: social metadata must use the approved primary yacht image, alt text and dimensions.`);
      }
      if (jsonLd.length !== 1) {
        failures.push(`${route.path}: exactly one JSON-LD block is required.`);
      } else {
        const value = JSON.parse(jsonLd[0][1]) as { "@graph"?: Array<Record<string, unknown>> };
        const graph = value["@graph"] ?? [];
        const service = graph.find((node) => node["@type"] === "Service");
        const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
        const offer = service?.offers as Record<string, unknown> | undefined;
        if (!service || !breadcrumb || graph.length !== 2) failures.push(`${route.path}: yacht schema must contain only Service and BreadcrumbList owners.`);
        if (service?.["@id"] !== `${expectedCanonical}#service` || JSON.stringify(service?.provider) !== JSON.stringify({ "@id": ORGANIZATION_ENTITY_ID })) {
          failures.push(`${route.path}: yacht Service must use stable ownership and provider references.`);
        }
        if (offer?.["@type"] !== "Offer" || offer.price !== yacht.pricePerHour || offer.priceCurrency !== "AED" || offer.url !== expectedCanonical) {
          failures.push(`${route.path}: Offer does not match visible price and canonical ownership.`);
        }
      }
    }
  }

  if (route.pageType === "service") {
    const service = publishedServicesById.get(route.id);
    if (!service) {
      failures.push(`${route.path}: generated service detail lacks an approved record.`);
    } else {
      const serviceContent = body.match(/data-service-content="true"[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
      const serviceVisible = serviceContent
        .replace(/<[^>]+>/g, " ")
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&quot;/g, "\"")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
      if (
        route.metadataOwnership.status !== "approved" ||
        route.metadataOwnership.title !== title ||
        route.metadataOwnership.description !== description ||
        route.metadataOwnership.h1 !== h1
      ) {
        failures.push(`${route.path}: rendered service metadata/H1 must match manifest ownership.`);
      }
      if (!body.includes(`data-service-id="${service.id}"`) || !visible.includes(service.name)) {
        failures.push(`${route.path}: strict service content boundary is missing.`);
      }
      if (/evaliyachts?|evali yacht|evaliyacht\.com|evaliyachts\.com|supabase\.co/i.test(`${head}\n${visible}`)) {
        failures.push(`${route.path}: inherited service branding or source authority appears in generated output.`);
      }
      if (!visible.toLowerCase().includes("on request and subject to confirmation")) {
        failures.push(`${route.path}: approved availability boundary is missing.`);
      }
      if (!serviceVisible.includes(service.whoItIsFor) || service.suitableGroupTypes.some((group) => !serviceVisible.includes(group))) {
        failures.push(`${route.path}: approved audience or suitable-group guidance is missing.`);
      }
      if (!/data-service-booking-cta="true"[^>]+href="\/#booking-request-guide"/.test(serviceContent)) {
        failures.push(`${route.path}: safe booking-request CTA is missing.`);
      }
      if (!/does not reserve a yacht or confirm availability/i.test(serviceVisible) || !/final written offer or WhatsApp confirmation/i.test(serviceVisible)) {
        failures.push(`${route.path}: booking confirmation boundary is missing.`);
      }
      const yachtLinks = [...serviceContent.matchAll(/href="(\/yachts\/[^"]+)"/g)].map((match) => match[1]);
      const expectedYachtLinks = service.yachtIds.map((id) => {
        const yacht = publishedYachtsById.get(id);
        return yacht ? `/yachts/${yacht.slug}` : "";
      });
      if (JSON.stringify(yachtLinks.filter((path, index, all) => all.indexOf(path) === index)) !== JSON.stringify(expectedYachtLinks)) {
        failures.push(`${route.path}: service must link exactly three selected publishable yachts in contract order.`);
      }
      if (ogImage || twitterImage) failures.push(`${route.path}: service social preview images are not approved.`);
      if (service.media) {
        const imagePattern = new RegExp(`<img[^>]*src=["']${escape(service.media.path)}["'][^>]*>`, "i");
        if (!imagePattern.test(body)) failures.push(`${route.path}: approved local primary image is missing.`);
      } else if (/\/media\/home\/services\//.test(body)) {
        failures.push(`${route.path}: text-only service unexpectedly emits a service image.`);
      }
      if (jsonLd.length !== 1) {
        failures.push(`${route.path}: exactly one JSON-LD block is required.`);
      } else {
        const value = JSON.parse(jsonLd[0][1]) as { "@graph"?: Array<Record<string, unknown>> };
        const graph = value["@graph"] ?? [];
        const serviceNode = graph.find((node) => node["@type"] === "Service");
        const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
        if (!serviceNode || !breadcrumb || graph.length !== 2) failures.push(`${route.path}: service schema must contain only Service and BreadcrumbList owners.`);
        if (serviceNode?.name !== service.name || serviceNode.url !== expectedCanonical) failures.push(`${route.path}: Service schema lacks visible-name/canonical parity.`);
        if (serviceNode?.["@id"] !== `${expectedCanonical}#service` || JSON.stringify(serviceNode?.provider) !== JSON.stringify({ "@id": ORGANIZATION_ENTITY_ID })) {
          failures.push(`${route.path}: Service must use stable ownership and provider references.`);
        }
      }
      if (/\bincluded\b|\ball-inclusive\b|\bguaranteed\b|\bfree\b|fixed route|fixed duration|instant confirmation|wild party|open bar|fireworks/i.test(serviceVisible)) {
        failures.push(`${route.path}: prohibited service promise or positioning appears in visible content.`);
      }
    }
  }

  if (supportPaths.has(route.path)) {
    const ownership = route.metadataOwnership;
    if (ownership.status !== "approved" || ownership.title !== title || ownership.description !== description || ownership.h1 !== h1) failures.push(`${route.path}: rendered support metadata/H1 must match manifest ownership.`);
    if (!body.includes(`data-support-content="${route.id}"`)) failures.push(`${route.path}: support content boundary is missing.`);
    if (jsonLd.length !== 1) failures.push(`${route.path}: exactly one JSON-LD graph is required.`);
    if (schemaNodes.some((node) => !["Organization", "BreadcrumbList"].includes(String(node["@type"])))) failures.push(`${route.path}: support/legal schema exceeds approved ownership.`);
  }

  if (titles.has(title)) failures.push(`${route.path}: duplicate title.`); else titles.add(title);
  if (descriptions.has(description)) failures.push(`${route.path}: duplicate description.`); else descriptions.add(description);
  if (canonicals.has(canonical)) failures.push(`${route.path}: duplicate canonical.`); else canonicals.add(canonical);
  if (h1s.has(h1)) failures.push(`${route.path}: duplicate H1.`); else h1s.add(h1);
}

const notFound = await read("dist/404.html");
if (!/name="robots" content="noindex, follow"/i.test(notFound)) failures.push("404 must be noindex, follow.");
if (/rel="canonical"/i.test(notFound)) failures.push("404 must not emit a canonical.");
if (!/data-static-status="404"/.test(notFound)) failures.push("404 hydration status marker is missing.");
if (/<!--app-(?:head|html)-->/i.test(notFound)) failures.push("404 contains an unresolved template marker.");

const publicSitemap = await read("public/sitemap.xml");
const builtSitemap = await read("dist/sitemap.xml");
if (publicSitemap !== builtSitemap) failures.push("Built and committed sitemaps differ.");
const sitemapUrls = [...publicSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedUrls = publishedStaticRoutes.map((route) => canonicalUrlForPath(route.path));
if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedUrls)) failures.push("Sitemap does not equal published manifest owners.");
const sitemapLastmods = [...publicSitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?\s*<\/url>/g)]
  .filter((match) => match[2])
  .map((match) => ({ url: match[1], date: match[2] }));
const expectedLastmods = publishedStaticRoutes
  .filter((route) => route.lastSignificantUpdate)
  .map((route) => ({ url: canonicalUrlForPath(route.path), date: route.lastSignificantUpdate }));
if (JSON.stringify(sitemapLastmods) !== JSON.stringify(expectedLastmods)) failures.push("Sitemap lastmod values must equal the verified manifest dates only.");
if (sitemapUrls.length !== publishedStaticRoutes.length) failures.push(`Sitemap must equal generated indexable routes; found ${sitemapUrls.length}.`);
if (publishedStaticRoutes.length !== 9 + publishableYachts.length + approvedServices.length) failures.push("Published output must contain nine base/support owners, publishable yachts and owner-approved services only.");
if (!blockedStaticRoutes.every((route) => !sitemapUrls.includes(canonicalUrlForPath(route.path)))) failures.push("Blocked route entered sitemap.");

const robots = await read("dist/robots.txt");
if (!robots.includes(`Sitemap: ${ENGLISH_PRODUCTION_ORIGIN}/sitemap.xml`)) failures.push("robots.txt has the wrong sitemap authority.");

const languageReport = await read("docs/ENGLISH_ARABIC_HREFLANG_MAP.md");
if (languageReport !== generateEnglishArabicMappingReport()) failures.push("Committed English–Arabic mapping report is stale.");
if (languageMappingSummary.total + languageMappingPendingRouteIds.length !== publishedStaticRoutes.length || languageMappingSummary.trueEquivalents !== 28 || languageMappingSummary.relatedNotEquivalent !== 5 || languageMappingSummary.unmapped !== 0) {
  failures.push("Language evidence must remain 33 verified mappings plus five PR 8B production-review-pending routes.");
}
if (englishArabicRouteMappings.some((record) => record.xDefaultAppropriate)) failures.push("x-default remains unapproved.");
if (siteFacts.phoneDisplay.status !== "approved" || siteFacts.phoneE164.status !== "approved" || siteFacts.whatsappUrl.status !== "approved" || siteFacts.responsiblePerson.status !== "approved" || siteFacts.responsiblePerson.value !== "Mohammed Abdullah, Operation Manager" || siteFacts.analyticsEnabled.value !== false) {
  failures.push("PR 8B approved contact and analytics-disabled facts are incomplete.");
}
if (siteFacts.publicAddress.status === "approved" || siteFacts.socialProfiles.status === "approved" || siteFacts.operatingHours.status === "approved") {
  failures.push("An omitted address, social profile or operating-hours fact was promoted.");
}

const netlify = await read("netlify.toml");
const rewriteBlocks = [...netlify.matchAll(/\[\[redirects\]\]([\s\S]*?)(?=\n\[\[|$)/g)].map((match) => match[1]);
if (rewriteBlocks.length !== 8 + publishedYachtRoutes.length + publishedServiceRoutes.length || rewriteBlocks.some((block) => !/status = 200/.test(block))) failures.push("Exact 200 rewrites must equal the eight inner base/support owners plus generated yacht and service details.");
if (/status = 30[12]/.test(netlify) || /from = "\/\*"/.test(netlify)) failures.push("Redirect or wildcard fallback found.");
if (approvedRedirects.length !== 0 || approvedCommercialConsolidations.length !== 0) failures.push("Evidence-gated approvals changed.");

const collectFiles = async (directory: string): Promise<string[]> => {
  const result: string[] = [];
  for (const entry of await readdir(directory)) {
    const path = join(directory, entry);
    if ((await stat(path)).isDirectory()) result.push(...await collectFiles(path));
    else result.push(path);
  }
  return result;
};
const distFiles = await collectFiles(resolve("dist"));
if (distFiles.some((file) => file.endsWith(".map"))) failures.push("Production source map found.");
const runtimeSourceFiles = (await collectFiles(resolve("src"))).filter((file) => /\.(?:ts|tsx)$/.test(file) && !file.includes("/test/"));
const runtimeSource = (await Promise.all(runtimeSourceFiles.map((file) => readFile(file, "utf8")))).join("\n");
const builtRuntime = (await Promise.all(distFiles.filter((file) => /\.(?:html|js)$/.test(file)).map((file) => readFile(file, "utf8")))).join("\n");
if (/approved business recipient/i.test(builtRuntime)) failures.push("Vague legal recipient wording remains in production output.");
if (/\bdataLayer\b|\bgtag\s*\(|googletagmanager|GTM-[A-Z0-9]+|\bfbq\s*\(|connect\.facebook\.net\/.*fbevents/i.test(`${runtimeSource}\n${builtRuntime}`)) {
  failures.push("Analytics or advertising runtime was introduced while PR 8B analytics is disabled.");
}
const generatedHtml = distFiles.filter((file) => file.endsWith(".html"));
if (generatedHtml.length !== publishedStaticRoutes.length + 1) failures.push("Unexpected generated HTML page count.");
const generatedYachtFiles = generatedHtml.filter((file) => file.includes("/_static/yachts/") && file.endsWith(".html"));
if (generatedYachtFiles.length !== publishableYachts.length) failures.push("Generated yacht HTML count does not equal publishable yacht count.");
const generatedServiceFiles = generatedHtml.filter((file) => file.includes("/_static/services/") && file.endsWith(".html"));
if (generatedServiceFiles.length !== approvedServices.length) failures.push("Generated service HTML count does not equal approved service count.");
for (const route of blockedStaticRoutes) {
  if (generatedHtml.includes(resolve(routeFile(route.path)))) failures.push(`${route.path}: blocked route generated an HTML file.`);
}
for (const candidate of commercialCandidateRegistry) {
  if (generatedHtml.includes(resolve(routeFile(candidate.path)))) failures.push(`${candidate.path}: commercial candidate generated an HTML file.`);
}
if (!/for = "\/assets\/\*"[\s\S]*immutable/.test(netlify)) failures.push("Fingerprint asset immutable caching is missing.");
for (const protectedPath of ["/", "/404.html", "/robots.txt", "/sitemap.xml"]) {
  const block = netlify.match(new RegExp(`for = "${escape(protectedPath)}"([\\s\\S]*?)(?=\\n\\[\\[|$)`))?.[1] ?? "";
  if (/immutable/.test(block)) failures.push(`${protectedPath} must not be immutable-cached.`);
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Static SEO passed: ${publishedStaticRoutes.length} published routes, ${blockedStaticRoutes.length} blocked routes, one real 404 document.`);
console.log(`Manifest preserved: ${englishRouteManifest.length} routes (${routeGroups.static.length}/${routeGroups.yachts.length}/${routeGroups.services.length}).`);
console.log(`Yacht gates: ${yachtCatalogueRegistry.length} source records, ${publishableYachts.length} publishable, ${blockedYachts.length} blocked, ${publishedYachtRoutes.length} generated details.`);
console.log(`Service gates: ${routeGroups.services.length} manifest owners, ${approvedServices.length} approved and generated, ${routeGroups.services.length - approvedServices.length} blocked.`);
console.log(`Evidence gates preserved: ${approvedRedirects.length} redirects, ${approvedCommercialConsolidations.length} consolidations, ${commercialCandidateRegistry.length} candidates, ${occasionDispositions.length} occasions.`);
console.log(`Search Console remains aggregate evidence (${searchConsoleAggregateBaseline.knownUrls} known URLs); no Search Console action was taken.`);
console.log(`Entity schema passed: one WebSite and minimal Organization; ContactPoint and LocalBusiness remain omitted.`);
console.log(`Language evidence passed: ${languageMappingSummary.total} verified mappings plus ${languageMappingPendingRouteIds.length} production-review-pending support/legal routes; no live alternate tags.`);
