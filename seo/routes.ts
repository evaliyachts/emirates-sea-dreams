import type { EnglishRouteRecord, MetadataOwnership, PageType, RouteEvidence, SchemaOwner } from "./contracts";
import { approvedServiceIds, getApprovedServiceById } from "../src/data/approved-services";

const sitemapEvidence: RouteEvidence = {
  source: "sitemap",
  confidence: "confirmed",
  reference: "public/sitemap.xml inventory audited on 2026-07-13",
};

const live404Evidence: RouteEvidence = {
  source: "live-crawl",
  confidence: "confirmed",
  reference: "docs/ENGLISH_LIVE_CRAWL_AND_INDEXABILITY.md (2026-07-13 crawl)",
};

const repositoryEvidence: RouteEvidence = {
  source: "repository-data",
  confidence: "confirmed",
  reference: "Current React Router and repository data inventory",
};

const aggregateSearchConsoleEvidence: RouteEvidence = {
  source: "search-console-summary",
  confidence: "historical",
  reference: "docs/ENGLISH_SEARCH_CONSOLE_BASELINE.md (All known pages, 2026-06-30)",
};

const serviceOwnerApprovalEvidence: RouteEvidence = {
  source: "business-approval",
  confidence: "confirmed",
  reference: "docs/ENGLISH_SERVICE_APPROVAL.md (owner decision, 2026-07-14)",
};

const missingOwnershipEvidence = [
  "Search Console Query × Page export",
  "Search Console Links report",
  "Search Console issue-detail example URLs",
];

interface PreservedRouteInput {
  id: string;
  path: string;
  pageType: Exclude<PageType, "home" | "commercial-candidate">;
  primaryIntent: string;
  secondaryIntents?: string[];
  schemaOwnership: SchemaOwner[];
  verificationRequired: string[];
  renderingEligible?: boolean;
  metadataOwnership?: MetadataOwnership;
  notes?: string[];
}

const preservedRoute = ({
  renderingEligible = false,
  metadataOwnership = {
    status: "pending",
    note: "Future title, description, and H1 copy is not approved in PR 2.",
  },
  secondaryIntents = [],
  notes = [],
  ...input
}: PreservedRouteInput): EnglishRouteRecord => ({
  ...input,
  secondaryIntents,
  notes,
  metadataOwnership,
  sitemapListed: true,
  currentHttpStatus: 404,
  decision: "preserve-pending-evidence",
  decisionStatus: "provisional",
  approvedCanonicalOwner: true,
  targetIndexable: true,
  pr3RenderingEligibility: renderingEligible ? "eligible" : "blocked-pending-verification",
  evidence: [sitemapEvidence, repositoryEvidence, live404Evidence, aggregateSearchConsoleEvidence],
  missingEvidence: [...missingOwnershipEvidence],
  possibleFutureConsolidation: false,
});

const homeRoute: EnglishRouteRecord = {
  id: "home",
  path: "/",
  pageType: "home",
  sitemapListed: true,
  currentHttpStatus: 200,
  decision: "enrich",
  decisionStatus: "approved",
  approvedCanonicalOwner: true,
  targetIndexable: true,
  pr3RenderingEligibility: "eligible",
  primaryIntent: "broad private yacht rental in Dubai",
  secondaryIntents: ["private yacht hire terminology", "fleet and booking journey overview"],
  metadataOwnership: {
    status: "approved",
    title: "Private Yacht Rental Dubai | Compare Verified Yachts",
    description: "Compare 19 verified private yachts in Dubai by hourly price, guest capacity and minimum duration, then prepare a factual rental request.",
    h1: "Private Yacht Rental in Dubai, Compared with Verified Facts",
    note: "PR 5 assigns broad private-rental ownership to the homepage without activating a synonym candidate route.",
  },
  schemaOwnership: ["WebSite", "Organization", "ContactPoint"],
  evidence: [sitemapEvidence, repositoryEvidence, aggregateSearchConsoleEvidence],
  verificationRequired: ["Business facts before content enrichment"],
  missingEvidence: ["Search Console Query × Page export", "Search Console Links report"],
  possibleFutureConsolidation: false,
  notes: ["Only current sitemap route returning 200 in the 2026-07-13 live crawl."],
};

const staticRoutes: EnglishRouteRecord[] = [
  homeRoute,
  preservedRoute({
    id: "yacht-index",
    path: "/yachts",
    pageType: "yacht-index",
    primaryIntent: "compare the current private yacht catalogue",
    secondaryIntents: ["yachts for rent comparison"],
    schemaOwnership: ["Organization", "ContactPoint", "BreadcrumbList"],
    verificationRequired: ["Verified fleet contract and authorized media"],
    renderingEligible: true,
    metadataOwnership: {
      status: "approved",
      title: "Yachts for Rent in Dubai | Compare 19 Verified Records",
      description: "Compare 19 published Dubai yacht records by capacity, hourly price, minimum duration, length and verified vessel facts.",
      h1: "Compare Yachts for Rent in Dubai by Verified Facts",
      note: "PR 5 assigns factual fleet-comparison and for-rent intent to the existing catalogue owner.",
    },
    notes: ["Catalogue path is preserved; verified record publication belongs to PR 4."],
  }),
  preservedRoute({
    id: "offers",
    path: "/offers",
    pageType: "support",
    primaryIntent: "understand yacht price and offer factors",
    secondaryIntents: ["hourly pricing guidance"],
    schemaOwnership: ["Service", "BreadcrumbList"],
    verificationRequired: ["Approved prices, durations, inclusions, and offer terms"],
    notes: ["Fixed package claims remain unapproved."],
  }),
  preservedRoute({
    id: "service-index",
    path: "/services",
    pageType: "service-index",
    primaryIntent: "choose a private yacht service or event type",
    schemaOwnership: ["Organization", "ContactPoint", "BreadcrumbList"],
    verificationRequired: ["Service capability and optional-extra verification"],
    renderingEligible: true,
    metadataOwnership: {
      status: "approved",
      title: "Private Yacht Service Planning in Dubai | Optional Requests",
      description: "Plan private yacht celebration, romance, hospitality, water-activity and experience requests without assuming inclusions or availability.",
      h1: "Plan Optional Services for a Private Yacht Request",
      note: "PR 5 approves hub-level planning copy only; detail service capability remains blocked for PR 6.",
    },
  }),
  preservedRoute({
    id: "occasion-index",
    path: "/occasions",
    pageType: "occasion-index",
    primaryIntent: "browse yacht occasions without creating duplicate detail pages",
    schemaOwnership: ["Organization", "ContactPoint", "BreadcrumbList"],
    verificationRequired: ["Occasion capability and hub-role approval"],
    renderingEligible: true,
    metadataOwnership: {
      status: "approved",
      title: "Private Yacht Occasions in Dubai | Planning Guide",
      description: "Compare seven private-yacht occasion themes, the decisions to prepare and verified yacht facts without assuming packages, routes or inclusions.",
      h1: "Choose a Private Yacht Occasion by the Decisions It Requires",
      note: "PR 5 approves hub-only chooser copy for all seven source themes without creating occasion detail routes.",
    },
    notes: ["Seven source occasions remain hub-only dispositions in this phase."],
  }),
  preservedRoute({
    id: "about",
    path: "/about",
    pageType: "support",
    primaryIntent: "understand the yacht service provider",
    schemaOwnership: ["Organization", "BreadcrumbList"],
    verificationRequired: ["Approved brand, entity, licensing, and operational facts"],
  }),
  preservedRoute({
    id: "faq",
    path: "/faq",
    pageType: "support",
    primaryIntent: "resolve common yacht rental planning questions",
    schemaOwnership: ["BreadcrumbList"],
    verificationRequired: ["Approved factual answers and removal of fixed promises"],
  }),
  preservedRoute({
    id: "contact",
    path: "/contact",
    pageType: "support",
    primaryIntent: "submit a private yacht rental enquiry",
    secondaryIntents: ["booking contact endpoint"],
    schemaOwnership: ["Organization", "ContactPoint", "BreadcrumbList"],
    verificationRequired: ["Approved phone, WhatsApp, location, hours, and response process"],
  }),
  preservedRoute({
    id: "terms",
    path: "/terms",
    pageType: "legal",
    primaryIntent: "review approved yacht service terms",
    schemaOwnership: ["BreadcrumbList"],
    verificationRequired: ["Business-approved Terms copy"],
    notes: ["Current legal promises are not approved for static publication."],
  }),
  preservedRoute({
    id: "privacy",
    path: "/privacy",
    pageType: "legal",
    primaryIntent: "review approved website privacy practices",
    schemaOwnership: ["BreadcrumbList"],
    verificationRequired: ["Business-approved Privacy copy and analytics state"],
    notes: ["Current privacy copy is not approved for static publication."],
  }),
];

const yachtInputs: Array<Pick<PreservedRouteInput, "id" | "path" | "primaryIntent"> & { notes?: string[] }> = [
  {
    id: "yacht-55ft-historical-brand-path",
    path: "/yachts/evali-yacht-55ft-yacht-rental-dubai",
    primaryIntent: "evaluate the historical 55-foot private yacht option",
    notes: [
      "The exact inherited path is retained only for history and evidence review.",
      "A future neutral owner is a candidate; visible naming cleanup belongs to PR 4.",
    ],
  },
  { id: "yacht-royal-majesty-50", path: "/yachts/50-feet-royal-majesty-dubai-yacht-rental", primaryIntent: "evaluate the 50-foot Royal Majesty record" },
  { id: "yacht-azimut-42", path: "/yachts/42-feet-azimut-yacht-rental-dubai", primaryIntent: "evaluate the 42-foot Azimut record" },
  { id: "yacht-majesty-44", path: "/yachts/majesty-44-feet-dubai-yacht-rental", primaryIntent: "evaluate the 44-foot Majesty record" },
  { id: "yacht-azimut-50", path: "/yachts/50-feet-azimut-yacht-rental-dubai", primaryIntent: "evaluate the 50-foot Azimut record" },
  { id: "yacht-oryx-50", path: "/yachts/oryx-50-feet-dubai-yacht-rental", primaryIntent: "evaluate the 50-foot Oryx record" },
  { id: "yacht-ferretti-50", path: "/yachts/ferretti-50-feet-yacht-rental-dubai", primaryIntent: "evaluate the 50-foot Ferretti record" },
  { id: "yacht-majesty-56", path: "/yachts/56-feet-majesty-dubai-yacht-rental", primaryIntent: "evaluate the 56-foot Majesty record" },
  { id: "yacht-azimut-55", path: "/yachts/55-feet-azimut-yacht-rental-dubai", primaryIntent: "evaluate the 55-foot Azimut record" },
  { id: "yacht-majesty-88", path: "/yachts/majesty-88ft-jacuzzi-dubai-yacht-rental", primaryIntent: "evaluate the 88-foot Majesty record" },
  { id: "yacht-sunseeker-82", path: "/yachts/sunseeker-82-feet-yacht-rental-dubai", primaryIntent: "evaluate the 82-foot Sunseeker record" },
  { id: "yacht-azimut-80", path: "/yachts/azimut-80-feet-yacht-rental-dubai", primaryIntent: "evaluate the 80-foot Azimut record" },
  { id: "yacht-benetti-110", path: "/yachts/benetti-110ft-jacuzzi-yacht-rental-dubai", primaryIntent: "evaluate the 110-foot Benetti record" },
  { id: "yacht-majesty-101", path: "/yachts/majesty-101ft-jacuzzi-dubai-yacht-rental", primaryIntent: "evaluate the 101-foot Majesty record" },
  { id: "yacht-heysea-90", path: "/yachts/heysea-90ft-jacuzzi-yacht-rental-dubai", primaryIntent: "evaluate the 90-foot Heysea record" },
  { id: "yacht-doretty-90", path: "/yachts/doretty-90ft-jacuzzi-dubai-yacht-rental", primaryIntent: "evaluate the 90-foot Doretty record" },
  { id: "yacht-ocean-dream-143", path: "/yachts/ocean-dream-143-feet-yacht-rental-dubai", primaryIntent: "evaluate the 143-foot Ocean Dream record" },
  { id: "yacht-mzaail-135", path: "/yachts/mzaail-135ft-dubai-yacht-rental", primaryIntent: "evaluate the 135-foot Mzaail record" },
  { id: "yacht-doretty-95", path: "/yachts/doretty-95-feet-jacuzzi-yacht-rental-dubai", primaryIntent: "evaluate the 95-foot Doretty record" },
  { id: "yacht-sunseeker-92", path: "/yachts/sunseeker-92-feet-dubai-yacht-rental", primaryIntent: "evaluate the 92-foot Sunseeker record" },
  { id: "yacht-sunseeker-90", path: "/yachts/sunseeker-90-feet-yacht-rental-dubai", primaryIntent: "evaluate the 90-foot Sunseeker record" },
  { id: "yacht-dynasty-151", path: "/yachts/dynasty-151-feet-dubai-yacht-rental", primaryIntent: "evaluate the Dynasty large-yacht record" },
  { id: "yacht-mega-120", path: "/yachts/luxury-120-feet-mega-yacht-rental-dubai", primaryIntent: "evaluate the 120-foot mega-yacht record" },
  { id: "yacht-omega-100", path: "/yachts/omega-100-feet-dubai-yacht-rental", primaryIntent: "evaluate the 100-foot Omega record" },
];

const yachtRoutes = yachtInputs.map((input): EnglishRouteRecord => {
  const route = preservedRoute({
    ...input,
    pageType: "yacht",
    schemaOwnership: ["Service", "BreadcrumbList"],
    verificationRequired: ["Strict yacht facts contract", "Media-rights approval", "Visible Offer verification"],
  });

  if (input.id === "yacht-55ft-historical-brand-path") {
    return {
      ...route,
      decision: "redirect-candidate",
      possibleFutureConsolidation: true,
      missingEvidence: [...route.missingEvidence, "Historical path and inbound-link evidence", "Approved neutral replacement owner"],
    };
  }

  return route;
});

const serviceInputs: Array<Pick<PreservedRouteInput, "id" | "path" | "primaryIntent"> & { notes?: string[] }> = [
  { id: "service-banana-boat", path: "/services/banana-boat-ride", primaryIntent: "request a banana boat activity with a private yacht trip" },
  { id: "service-swimming", path: "/services/swimming", primaryIntent: "understand swimming-request conditions on a private yacht trip" },
  { id: "service-barbecue", path: "/services/barbecue-on-the-yacht", primaryIntent: "plan optional barbecue hospitality on a private yacht" },
  { id: "service-fishing", path: "/services/fishing", primaryIntent: "plan a private fishing yacht experience" },
  { id: "service-birthday", path: "/services/birthday-party", primaryIntent: "plan a private birthday yacht celebration" },
  { id: "service-graduation", path: "/services/graduation-parties", primaryIntent: "plan a private graduation yacht celebration" },
  { id: "service-anniversary", path: "/services/wedding-anniversary-parties", primaryIntent: "plan a private wedding-anniversary yacht celebration" },
  { id: "service-bachelor", path: "/services/bachelor-parties", primaryIntent: "plan a private bachelor yacht celebration" },
  { id: "service-proposal", path: "/services/marriage-proposal-party", primaryIntent: "plan a private marriage-proposal yacht experience" },
  { id: "service-gender-reveal", path: "/services/gender-reveal-party", primaryIntent: "assess an approved private gender-reveal yacht format" },
  {
    id: "service-engagement-wedding-combined",
    path: "/services/engagement-and-wedding-parties",
    primaryIntent: "review the historical combined engagement and wedding service intent",
    notes: ["Overlaps the dedicated engagement and wedding paths; no consolidation or redirect is approved."],
  },
  { id: "service-food-menu", path: "/services/food-menu", primaryIntent: "understand confirmed optional yacht food-menu choices" },
  { id: "service-donut-ride", path: "/services/donut-ride", primaryIntent: "request a donut ride activity with a private yacht trip" },
  { id: "service-jet-ski", path: "/services/jet-ski", primaryIntent: "request a separately confirmed Jet Ski activity" },
  { id: "service-afternoon-tea", path: "/services/afternoon-tea-trip", primaryIntent: "plan optional afternoon-tea hospitality on a private yacht" },
  { id: "service-morning-trip", path: "/services/morning-yacht-trips", primaryIntent: "plan a private morning yacht experience" },
  { id: "service-engagement", path: "/services/engagement-parties", primaryIntent: "plan a private engagement yacht celebration" },
  { id: "service-wedding", path: "/services/wedding-parties", primaryIntent: "plan a private wedding yacht celebration" },
];

const serviceRoutes = serviceInputs.map((input): EnglishRouteRecord => {
  const route = preservedRoute({
    ...input,
    pageType: "service",
    schemaOwnership: ["Service", "BreadcrumbList"],
    verificationRequired: ["Business capability", "Optional-versus-included terms", "Service-specific facts"],
  });

  if (approvedServiceIds.has(input.id)) {
    const service = getApprovedServiceById(input.id);
    if (!service || service.path !== input.path) {
      throw new Error(`Approved service contract does not match manifest ownership: ${input.id}`);
    }
    return {
      ...route,
      decision: "enrich",
      decisionStatus: "approved",
      pr3RenderingEligibility: "eligible",
      metadataOwnership: {
        status: "approved",
        title: service.metadata.title,
        description: service.metadata.description,
        h1: service.metadata.h1,
        note: "PR 6B publishes only the owner-approved service record and preserves all request-time confirmation limits.",
      },
      evidence: [...route.evidence, serviceOwnerApprovalEvidence],
      verificationRequired: [],
      notes: [...route.notes, "Owner-approved for evidence-bounded static publication in PR 6B."],
    };
  }

  if (input.id === "service-engagement-wedding-combined") {
    return {
      ...route,
      decision: "redirect-candidate",
      decisionStatus: "blocked",
      possibleFutureConsolidation: true,
      missingEvidence: [...route.missingEvidence, "Intent-overlap review for combined and dedicated service routes"],
    };
  }

  return {
    ...route,
    decisionStatus: "blocked",
    notes: [...route.notes, "Owner explicitly kept this service owner blocked for PR 6B."],
  };
});

export const englishRouteManifest: readonly EnglishRouteRecord[] = [
  ...staticRoutes,
  ...yachtRoutes,
  ...serviceRoutes,
];

export const routeGroups = {
  static: englishRouteManifest.filter((route) => !route.path.startsWith("/yachts/") && !route.path.startsWith("/services/")),
  yachts: englishRouteManifest.filter((route) => route.path.startsWith("/yachts/")),
  services: englishRouteManifest.filter((route) => route.path.startsWith("/services/")),
} as const;
