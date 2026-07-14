import { approvedCommercialConsolidations, commercialCandidateRegistry } from "./candidates";
import type { EnglishRouteRecord, RedirectCandidate } from "./contracts";
import { ENGLISH_PREVIEW_ORIGIN, ENGLISH_PRODUCTION_ORIGIN, canonicalUrlForPath } from "./authorities";
import { occasionDispositions } from "./occasions";
import { approvedRedirects, redirectCandidates } from "./redirects";
import { englishRouteManifest, routeGroups } from "./routes";
import { searchConsoleAggregateBaseline } from "./search-console";
import { sitemapMigrationMap } from "./sitemap-migration";

const allowedSchemaOwners = new Set(["WebSite", "Organization", "ContactPoint", "Service", "Offer", "BreadcrumbList"]);

const duplicateValues = (values: string[]): string[] => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  values.forEach((value) => {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  });
  return [...duplicates];
};

const validateIsoDate = (date: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().startsWith(date);
};

const validateRedirectCandidate = (
  redirect: RedirectCandidate,
  routes: readonly EnglishRouteRecord[],
  failures: string[],
): void => {
  if (redirect.from.includes("*")) failures.push(`Wildcard redirect candidate is forbidden: ${redirect.from}`);
  if (redirect.proposedTo === "/") failures.push(`Homepage fallback redirect candidate is forbidden: ${redirect.from}`);
  if (redirect.status === "approved") {
    if (!redirect.proposedTo) failures.push(`Approved redirect has no destination: ${redirect.from}`);
    const destination = routes.find((route) => route.path === redirect.proposedTo);
    if (!destination?.approvedCanonicalOwner) {
      failures.push(`Approved redirect destination is not an approved canonical owner: ${redirect.from}`);
    }
  }
};

export const validateEnglishSeoOwnership = (): string[] => {
  const failures: string[] = [];
  const routePaths = englishRouteManifest.map((route) => route.path);
  const routeIds = englishRouteManifest.map((route) => route.id);
  const approvedPrimaryIntents = englishRouteManifest
    .filter((route) => route.decisionStatus === "approved")
    .map((route) => route.primaryIntent.trim().toLowerCase());
  const approvedMetadata = englishRouteManifest.filter((route) => route.metadataOwnership.status === "approved");

  if (ENGLISH_PRODUCTION_ORIGIN !== "https://yachtrentaldxb.com") {
    failures.push(`Invalid production authority: ${ENGLISH_PRODUCTION_ORIGIN}`);
  }
  if (ENGLISH_PREVIEW_ORIGIN !== "https://yachtrentaldxb.netlify.app") {
    failures.push(`Invalid preview authority: ${ENGLISH_PREVIEW_ORIGIN}`);
  }
  if (englishRouteManifest.length !== 52) failures.push(`Canonical route inventory must remain 52; found ${englishRouteManifest.length}.`);
  if (routeGroups.static.length !== 10) failures.push(`Static/hub/support route count must be 10; found ${routeGroups.static.length}.`);
  if (routeGroups.yachts.length !== 24) failures.push(`Yacht route count must be 24; found ${routeGroups.yachts.length}.`);
  if (routeGroups.services.length !== 18) failures.push(`Service route count must be 18; found ${routeGroups.services.length}.`);

  duplicateValues(routeIds).forEach((id) => failures.push(`Duplicate route ID: ${id}`));
  duplicateValues(routePaths).forEach((path) => failures.push(`Duplicate route path: ${path}`));
  duplicateValues(approvedPrimaryIntents).forEach((intent) => failures.push(`Duplicate approved primary intent: ${intent}`));
  (["title", "description", "h1"] as const).forEach((field) => {
    const values = approvedMetadata
      .map((route) => route.metadataOwnership[field]?.trim().toLowerCase())
      .filter((value): value is string => Boolean(value));
    duplicateValues(values).forEach((value) => failures.push(`Duplicate approved ${field}: ${value}`));
  });

  englishRouteManifest.forEach((route) => {
    if (!route.path.startsWith("/") || (route.path !== "/" && route.path.endsWith("/"))) {
      failures.push(`English route path must preserve the current non-trailing-slash form: ${route.path}`);
    }
    if (!route.primaryIntent.trim()) failures.push(`Route has no primary intent: ${route.id}`);
    if (route.metadataOwnership.status === "approved") {
      if (!route.metadataOwnership.title?.trim()) failures.push(`Approved title ownership is empty: ${route.id}`);
      if (!route.metadataOwnership.description?.trim()) failures.push(`Approved description ownership is empty: ${route.id}`);
      if (!route.metadataOwnership.h1?.trim()) failures.push(`Approved H1 ownership is empty: ${route.id}`);
    }
    if (!route.decision) failures.push(`Route has no decision: ${route.id}`);
    if (!route.decisionStatus) failures.push(`Route has no decision status: ${route.id}`);
    if (route.sitemapListed !== true) failures.push(`Current manifest route is not marked sitemap-listed: ${route.path}`);
    if (route.proposedRedirectTo && route.decision !== "redirect-candidate") {
      failures.push(`Route has a redirect target without a redirect-candidate decision: ${route.path}`);
    }
    route.schemaOwnership.forEach((schema) => {
      if (!allowedSchemaOwners.has(schema)) failures.push(`Forbidden schema ownership ${schema} on ${route.path}`);
    });
    if (route.lastSignificantUpdate) {
      if (!validateIsoDate(route.lastSignificantUpdate)) failures.push(`Invalid lastSignificantUpdate on ${route.path}`);
      if (!route.evidence.some((item) => item.source === "business-approval")) {
        failures.push(`lastSignificantUpdate lacks business-approval evidence on ${route.path}`);
      }
    }
    const canonical = canonicalUrlForPath(route.path);
    if (!canonical.startsWith(`${ENGLISH_PRODUCTION_ORIGIN}/`)) failures.push(`Invalid canonical authority for ${route.path}`);
    if (canonical.includes("yacht-dxb.com") || canonical.includes("netlify.app")) {
      failures.push(`Forbidden canonical authority for ${route.path}: ${canonical}`);
    }
  });

  const canonicalPaths = new Set(routePaths);
  commercialCandidateRegistry.forEach((candidate) => {
    if (canonicalPaths.has(candidate.path)) failures.push(`Commercial candidate leaked into the canonical manifest: ${candidate.path}`);
    if (
      candidate.canonical ||
      candidate.sitemapListed ||
      candidate.indexable ||
      candidate.routed ||
      candidate.creationApproved ||
      candidate.redirectOwnershipApproved
    ) {
      failures.push(`Commercial candidate is prematurely active: ${candidate.path}`);
    }
  });

  if (commercialCandidateRegistry.length !== 6) failures.push(`Commercial candidate registry must contain 6 records.`);
  if (occasionDispositions.length !== 7) failures.push(`Occasion disposition registry must contain 7 records.`);
  occasionDispositions.forEach((occasion) => {
    if (occasion.pageCreationApproved) failures.push(`Occasion route creation is unexpectedly approved: ${occasion.sourceSlug}`);
    if (!canonicalPaths.has(occasion.owningExistingPath)) failures.push(`Occasion owner is not a current manifest path: ${occasion.owningExistingPath}`);
    if (canonicalPaths.has(`/occasions/${occasion.sourceSlug}`)) failures.push(`Occasion detail route was created: ${occasion.sourceSlug}`);
  });

  if (approvedRedirects.length !== 0) failures.push(`Approved redirects must remain 0.`);
  if (approvedCommercialConsolidations.length !== 0) failures.push(`Approved commercial consolidations must remain 0.`);
  redirectCandidates.forEach((redirect) => validateRedirectCandidate(redirect, englishRouteManifest, failures));
  redirectCandidates.forEach((redirect) => {
    if (redirect.proposedTo && redirectCandidates.some((candidate) => candidate.from === redirect.proposedTo)) {
      failures.push(`Redirect candidate chain detected from ${redirect.from}.`);
    }
  });

  if (searchConsoleAggregateBaseline.knownUrls !== 55) failures.push(`Search Console known URL baseline must remain 55.`);
  if (searchConsoleAggregateBaseline.inferredSitemapArithmetic.result !== 52) failures.push(`Search Console inference must resolve to 52.`);
  if (searchConsoleAggregateBaseline.inferredSitemapArithmetic.confidence !== "inferred") failures.push(`Search Console arithmetic must remain labelled inferred.`);
  if (searchConsoleAggregateBaseline.submittedSitemapMappingConfirmed) failures.push(`Aggregate Search Console evidence cannot confirm route mapping.`);
  if (searchConsoleAggregateBaseline.urlLevelIssueExamples.length !== 0) failures.push(`Guessed per-URL Search Console statuses are forbidden.`);

  if (sitemapMigrationMap.length !== englishRouteManifest.length) failures.push(`Sitemap migration map must cover every manifest route.`);
  sitemapMigrationMap.forEach((entry) => {
    if (!canonicalPaths.has(entry.path)) failures.push(`Sitemap migration entry is not a canonical route: ${entry.path}`);
    if (!entry.lastSignificantUpdate && entry.lastmodStatus !== "omitted-unverified") {
      failures.push(`Unverified lastmod is not omitted for ${entry.path}`);
    }
  });

  return failures;
};

export const assertEnglishSeoOwnership = (): void => {
  const failures = validateEnglishSeoOwnership();
  if (failures.length > 0) throw new Error(failures.join("\n"));
};
