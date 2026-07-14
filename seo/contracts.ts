export type RouteDecision =
  | "keep"
  | "enrich"
  | "preserve-pending-evidence"
  | "redirect-candidate"
  | "noindex-candidate"
  | "remove-candidate";

export type DecisionStatus = "approved" | "provisional" | "blocked";

export type EvidenceConfidence = "confirmed" | "historical" | "inferred" | "pending";

export type PageType =
  | "home"
  | "yacht-index"
  | "yacht"
  | "service-index"
  | "service"
  | "occasion-index"
  | "support"
  | "legal"
  | "commercial-candidate";

export type SchemaOwner =
  | "WebSite"
  | "Organization"
  | "ContactPoint"
  | "Service"
  | "Offer"
  | "BreadcrumbList";

export type LanguageEquivalenceStatus =
  | "true-equivalent"
  | "related-not-equivalent"
  | "no-equivalent"
  | "arabic-page-absent"
  | "english-page-not-ready";

export type EvidenceSource =
  | "sitemap"
  | "router"
  | "repository-data"
  | "search-console-summary"
  | "search-console-query-page"
  | "search-console-links"
  | "live-crawl"
  | "business-approval";

export type Pr3RenderingEligibility = "eligible" | "blocked-pending-verification";

export type IsoDate = `${number}-${number}-${number}`;

export interface RouteEvidence {
  source: EvidenceSource;
  confidence: EvidenceConfidence;
  reference: string;
}

export interface MetadataOwnership {
  status: "approved" | "pending";
  title?: string;
  description?: string;
  h1?: string;
  note: string;
}

export interface EnglishRouteRecord {
  id: string;
  path: string;
  pageType: Exclude<PageType, "commercial-candidate">;
  sitemapListed: boolean;
  currentHttpStatus: 200 | 301 | 404;
  decision: RouteDecision;
  decisionStatus: DecisionStatus;
  approvedCanonicalOwner: boolean;
  targetIndexable: boolean;
  pr3RenderingEligibility: Pr3RenderingEligibility;
  primaryIntent: string;
  secondaryIntents: string[];
  metadataOwnership: MetadataOwnership;
  schemaOwnership: SchemaOwner[];
  evidence: RouteEvidence[];
  verificationRequired: string[];
  missingEvidence: string[];
  possibleFutureConsolidation: boolean;
  lastSignificantUpdate?: IsoDate;
  proposedRedirectTo?: string;
  notes?: string[];
}

export interface CommercialCandidateRecord {
  id: string;
  path: string;
  pageType: "commercial-candidate";
  sourceHistory: string[];
  intendedSearchIntent: string;
  foundInRouter: boolean;
  foundInSource: boolean;
  foundInHistory: boolean;
  searchConsoleEvidence: "missing" | "aggregate-only" | "url-level-reviewed";
  decisionStatus: DecisionStatus;
  canonical: false;
  sitemapListed: false;
  indexable: false;
  routed: false;
  creationApproved: false;
  redirectOwnershipApproved: false;
}

export interface RedirectCandidate {
  from: string;
  proposedTo?: string;
  status: "candidate" | "approved" | "rejected";
  evidenceRequired: string[];
  risk: "low" | "medium" | "high";
}

export type OccasionDecision =
  | "represented-by-existing-service-route"
  | "represented-by-occasions-hub"
  | "future-page-candidate-pending-evidence"
  | "duplicate-of-existing-event-intent"
  | "unsupported-pending-business-capability";

export interface OccasionDisposition {
  id: string;
  sourceSlug: string;
  currentLabel: string;
  intendedUserNeed: string;
  owningExistingPath: string;
  decision: OccasionDecision;
  evidenceStatus: EvidenceConfidence;
  pageCreationApproved: false;
  notes: string[];
}

export interface LiveLanguagePageEvidence {
  httpStatus: 200;
  indexable: true;
  declaredCanonical: string;
  verifiedAt: IsoDate;
  evidenceReference: string;
}

export interface EnglishArabicRouteMapping {
  routeId: string;
  englishCanonical: string;
  arabicCanonical?: string;
  equivalenceStatus: LanguageEquivalenceStatus;
  samePrimaryIntent: boolean;
  englishEvidence: LiveLanguagePageEvidence;
  arabicEvidence?: LiveLanguagePageEvidence;
  reciprocalEnglishTagRequired: boolean;
  reciprocalArabicTagRequired: boolean;
  xDefaultAppropriate: false;
  blockers: string[];
}
