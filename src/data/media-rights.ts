import { z } from "zod";
import { approvedYachtMedia } from "./approved-yacht-media";
import { HOMEPAGE_MEDIA } from "./home-media";
import { NEUTRAL_YACHT_FALLBACK, NEUTRAL_YACHT_FALLBACK_RIGHTS_ID } from "./media-constants";

export { NEUTRAL_YACHT_FALLBACK, NEUTRAL_YACHT_FALLBACK_RIGHTS_ID } from "./media-constants";

export const mediaRightsRecordSchema = z.object({
  id: z.string().min(1),
  productionPath: z.string().min(1),
  originalSource: z.string().min(1),
  owner: z.string().min(1),
  evidence: z.string().min(1),
  approvedHosts: z.array(z.literal("yachtrentaldxb.com")).min(1),
  approvedSurfaces: z.array(z.string().min(1)).min(1),
  arabicProjectReuseApproved: z.boolean(),
  socialPreviewApproved: z.boolean(),
  localResponsiveDerivativesApproved: z.boolean().default(false),
  netlifyImageCdnTransformationApproved: z.boolean(),
  unresolvedIssues: z.array(z.string()),
  approvalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.literal("approved"),
}).strict();

export type MediaRightsRecord = z.infer<typeof mediaRightsRecordSchema>;

const approvedRemoteMediaRights: MediaRightsRecord[] = approvedYachtMedia.map((media) =>
  mediaRightsRecordSchema.parse({
    id: media.rightsRecordId,
    productionPath: media.path,
    originalSource: "Owner-approved English repository image_url/gallery entry; historical source storage paths are represented by the established neutral CDN object URL.",
    owner: "Business owner approval for yachtrentaldxb.com",
    evidence: "Owner yacht fact and display approval dated 2026-07-14; technical responsive derivatives authorized on 2026-10-30 in docs/REPAIR_MEDIA_APPROVAL_2026-10-30.md; shared originals unchanged.",
    approvedHosts: ["yachtrentaldxb.com"],
    approvedSurfaces: [
      "Yacht catalogue cards",
      "Yacht detail galleries",
      "Related yacht cards",
      "Homepage yacht cards in the relevant future page phase",
      "Commercial-page yacht selections in the relevant future page phase",
      "Yacht-detail Open Graph and Twitter social previews",
    ],
    arabicProjectReuseApproved: false,
    socialPreviewApproved: true,
    localResponsiveDerivativesApproved: true,
    netlifyImageCdnTransformationApproved: false,
    unresolvedIssues: [],
    approvalDate: "2026-07-14",
    status: "approved",
  }),
);

const approvedServiceDetailSurfaceByRightsId: Readonly<Record<string, string>> = {
  "english-home-service-birthday-002": "/services/birthday-party",
  "english-home-service-proposal-002": "/services/marriage-proposal-party",
  "english-home-service-anniversary-002": "/services/wedding-anniversary-parties",
  "english-home-service-engagement-002": "/services/engagement-parties",
  "english-home-service-wedding-002": "/services/wedding-parties",
  "english-home-service-graduation-002": "/services/graduation-parties",
  "english-home-service-barbecue-002": "/services/barbecue-on-the-yacht",
};

const approvedHomepageMediaRights: MediaRightsRecord[] = HOMEPAGE_MEDIA.map((media) =>
  mediaRightsRecordSchema.parse({
    id: media.rightsRecordId,
    productionPath: media.path,
    originalSource: approvedServiceDetailSurfaceByRightsId[media.rightsRecordId]
      ? "Owner-supplied photograph from the private 55-foot yacht photo set."
      : media.id === "home-hero-mobile"
      ? "Performance-optimized local rendition of the exact approved prior homepage snapshot; the source provenance and visual subject are unchanged."
      : "Exact prior homepage asset imported as a neutral local static snapshot.",
    owner: "Business owner approval for yachtrentaldxb.com",
    evidence: approvedServiceDetailSurfaceByRightsId[media.rightsRecordId]
      ? "On 2026-11-06 the owner requested use of the supplied photos on this English site. These photos illustrate yacht spaces on the homepage and matching service pages."
      : media.id === "home-hero-mobile"
        ? "Owner approved reuse of the prior mobile hero cover on 2026-07-14; a same-path, smaller local rendition was prepared for owner review in the mobile performance PR without changing the source image or approved surface."
        : "Owner approved reuse of the prior desktop/mobile hero covers and service-card imagery on 2026-07-14.",
    approvedHosts: ["yachtrentaldxb.com"],
    approvedSurfaces: [
      media.surface === "service-card" ? "Homepage service-card imagery" : "Homepage hero cover",
      ...(approvedServiceDetailSurfaceByRightsId[media.rightsRecordId]
        ? [`Service detail primary image: ${approvedServiceDetailSurfaceByRightsId[media.rightsRecordId]}`]
        : []),
    ],
    arabicProjectReuseApproved: false,
    socialPreviewApproved: false,
    netlifyImageCdnTransformationApproved: false,
    unresolvedIssues: [],
    approvalDate: approvedServiceDetailSurfaceByRightsId[media.rightsRecordId] ? "2026-11-06" : "2026-07-14",
    status: "approved",
  }),
);

export const mediaRightsRegistry: readonly MediaRightsRecord[] = [
  mediaRightsRecordSchema.parse({
    id: NEUTRAL_YACHT_FALLBACK_RIGHTS_ID,
    productionPath: NEUTRAL_YACHT_FALLBACK,
    originalSource: "Original project-created vector artwork in Implementation PR 4.",
    owner: "emirates-sea-dreams project",
    evidence: "Repository-authored neutral fallback; contains no third-party yacht photography or branding.",
    approvedHosts: ["yachtrentaldxb.com"],
    approvedSurfaces: ["Fallback shown only when an otherwise publishable yacht has no usable authorized image."],
    arabicProjectReuseApproved: false,
    socialPreviewApproved: false,
    netlifyImageCdnTransformationApproved: false,
    unresolvedIssues: [],
    approvalDate: "2026-07-13",
    status: "approved",
  }),
  mediaRightsRecordSchema.parse({
    id: "english-brand-social-001",
    productionPath: "/brand-social.png",
    originalSource: "Existing owner-approved /dubai-yachts-logo.png on a neutral 1200x630 canvas.",
    owner: "Business owner approval for yachtrentaldxb.com",
    evidence: "Owner repair authorization recorded in docs/REPAIR_MEDIA_APPROVAL_2026-10-30.md.",
    approvedHosts: ["yachtrentaldxb.com"],
    approvedSurfaces: ["General-page Open Graph and Twitter social previews"],
    arabicProjectReuseApproved: false,
    socialPreviewApproved: true,
    localResponsiveDerivativesApproved: true,
    netlifyImageCdnTransformationApproved: false,
    unresolvedIssues: [],
    approvalDate: "2026-10-30",
    status: "approved",
  }),
  ...approvedHomepageMediaRights,
  ...approvedRemoteMediaRights,
];
