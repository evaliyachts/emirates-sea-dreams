import { z } from "zod";
import { approvedYachtMedia } from "./approved-yacht-media";
import { HOMEPAGE_MEDIA } from "./home-media";

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
  netlifyImageCdnTransformationApproved: z.boolean(),
  unresolvedIssues: z.array(z.string()),
  approvalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.literal("approved"),
}).strict();

export type MediaRightsRecord = z.infer<typeof mediaRightsRecordSchema>;

export const NEUTRAL_YACHT_FALLBACK = "/media/yacht-neutral-fallback.svg";
export const NEUTRAL_YACHT_FALLBACK_RIGHTS_ID = "english-neutral-yacht-fallback-001";

const approvedRemoteMediaRights: MediaRightsRecord[] = approvedYachtMedia.map((media) =>
  mediaRightsRecordSchema.parse({
    id: media.rightsRecordId,
    productionPath: media.path,
    originalSource: "Owner-approved English repository image_url/gallery entry; historical source storage paths are represented by the established neutral CDN object URL.",
    owner: "Business owner approval for yachtrentaldxb.com",
    evidence: "Owner yacht fact and media approval recorded on 2026-07-14; URL retained only after media:verify passed.",
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
    netlifyImageCdnTransformationApproved: false,
    unresolvedIssues: [],
    approvalDate: "2026-07-14",
    status: "approved",
  }),
);

const approvedHomepageMediaRights: MediaRightsRecord[] = HOMEPAGE_MEDIA.map((media) =>
  mediaRightsRecordSchema.parse({
    id: media.rightsRecordId,
    productionPath: media.path,
    originalSource: "Exact prior homepage asset imported as a neutral local static snapshot.",
    owner: "Business owner approval for yachtrentaldxb.com",
    evidence: "Owner approved reuse of the prior desktop/mobile hero covers and service-card imagery on 2026-07-14.",
    approvedHosts: ["yachtrentaldxb.com"],
    approvedSurfaces: [media.surface === "service-card" ? "Homepage service-card imagery" : "Homepage hero cover"],
    arabicProjectReuseApproved: false,
    socialPreviewApproved: false,
    netlifyImageCdnTransformationApproved: false,
    unresolvedIssues: [],
    approvalDate: "2026-07-14",
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
  ...approvedHomepageMediaRights,
  ...approvedRemoteMediaRights,
];
