import { englishRouteManifest } from "./routes";

export type ProposedSitemapMembership = "include-after-canonical-200" | "blocked-pending-verification" | "exclude";

export interface SitemapMigrationRecord {
  path: string;
  currentSitemapMembership: boolean;
  proposedFutureMembership: ProposedSitemapMembership;
  approvedCanonicalOwner: boolean;
  pr3RenderingEligible: boolean;
  unresolvedBlocker?: string;
  lastmodStatus: "verified" | "omitted-unverified";
  lastSignificantUpdate?: string;
}

export const sitemapMigrationMap: readonly SitemapMigrationRecord[] = englishRouteManifest.map((route) => ({
  path: route.path,
  currentSitemapMembership: route.sitemapListed,
  proposedFutureMembership:
    route.approvedCanonicalOwner && route.targetIndexable
      ? route.pr3RenderingEligibility === "eligible"
        ? "include-after-canonical-200"
        : "blocked-pending-verification"
      : "exclude",
  approvedCanonicalOwner: route.approvedCanonicalOwner,
  pr3RenderingEligible: route.pr3RenderingEligibility === "eligible",
  unresolvedBlocker:
    route.pr3RenderingEligibility === "blocked-pending-verification"
      ? route.verificationRequired.join("; ")
      : undefined,
  lastmodStatus: route.lastSignificantUpdate ? "verified" : "omitted-unverified",
  lastSignificantUpdate: route.lastSignificantUpdate,
}));
