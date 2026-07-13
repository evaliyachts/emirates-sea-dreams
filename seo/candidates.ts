import type { CommercialCandidateRecord } from "./contracts";

const candidate = (
  id: string,
  path: string,
  intendedSearchIntent: string,
  sourceHistory: string[],
): CommercialCandidateRecord => ({
  id,
  path,
  pageType: "commercial-candidate",
  sourceHistory,
  intendedSearchIntent,
  foundInRouter: false,
  foundInSource: false,
  foundInHistory: true,
  searchConsoleEvidence: "aggregate-only",
  decisionStatus: "blocked",
  canonical: false,
  sitemapListed: false,
  indexable: false,
  routed: false,
  creationApproved: false,
  redirectOwnershipApproved: false,
});

export const commercialCandidateRegistry: readonly CommercialCandidateRecord[] = [
  candidate(
    "candidate-booking",
    "/dubai-yacht-booking",
    "informational yacht booking process",
    ["Historical keyword/page ownership documentation; not present in the current router or sitemap"],
  ),
  candidate(
    "candidate-luxury-rental",
    "/luxury-yacht-rental-dubai",
    "verified luxury fleet comparison",
    ["Historical keyword/page ownership documentation; not present in the current router or sitemap"],
  ),
  candidate(
    "candidate-charter",
    "/yacht-charter-dubai",
    "private charter planning",
    ["Historical keyword/page ownership documentation; not present in the current router or sitemap"],
  ),
  candidate(
    "candidate-for-rent",
    "/yacht-for-rent-dubai",
    "yachts-for-rent comparison",
    ["Historical keyword/page ownership documentation; not present in the current router or sitemap"],
  ),
  candidate(
    "candidate-hire",
    "/yacht-hire-dubai",
    "private yacht hire terminology and selection",
    ["Historical keyword/page ownership documentation; not present in the current router or sitemap"],
  ),
  candidate(
    "candidate-rental-in-dubai",
    "/yacht-rental-in-dubai",
    "yacht rental location phrasing",
    ["Historical keyword/page ownership documentation; not present in the current router or sitemap"],
  ),
];

export const approvedCommercialConsolidations: readonly never[] = [];
