import { z } from "zod";

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
];
