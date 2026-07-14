export type ApprovalStatus = "approved" | "pending" | "rejected" | "not-applicable";

export interface ApprovedValue<T> {
  value?: T;
  status: ApprovalStatus;
  evidence?: string;
  approvedAt?: string;
}

export interface SiteFacts {
  productionUrl: ApprovedValue<string>;
  previewUrl: ApprovedValue<string>;
  brandName: ApprovedValue<string>;
  alternateBrandName: ApprovedValue<string>;
  legalEntityName: ApprovedValue<string>;
  responsiblePerson: ApprovedValue<string>;
  legalPublicationDate: ApprovedValue<string>;
  phoneDisplay: ApprovedValue<string>;
  phoneE164: ApprovedValue<string>;
  whatsappUrl: ApprovedValue<string>;
  contactEmail: ApprovedValue<string>;
  departureLocation: ApprovedValue<string>;
  operatingHours: ApprovedValue<string>;
  bookingResponseHours: ApprovedValue<string>;
  publicAddress: ApprovedValue<string>;
  socialProfiles: ApprovedValue<readonly string[]>;
  analyticsEnabled: ApprovedValue<boolean>;
  logoPath: ApprovedValue<string>;
  faviconPath: ApprovedValue<string>;
}

export const PRODUCTION_URL = "https://yachtrentaldxb.com/";
export const PREVIEW_URL = "https://yachtrentaldxb.netlify.app/";

export const isApprovedValue = <T>(entry: ApprovedValue<T>): entry is ApprovedValue<T> & { value: T } =>
  entry.status === "approved" && entry.value !== undefined;

export const getApprovedValue = <T>(entry: ApprovedValue<T>): T | undefined =>
  isApprovedValue(entry) ? entry.value : undefined;

export const siteFacts: SiteFacts = {
  productionUrl: {
    value: PRODUCTION_URL,
    status: "approved",
    evidence: "Approved technical authority in the English SEO implementation brief.",
  },
  previewUrl: {
    value: PREVIEW_URL,
    status: "approved",
    evidence: "Approved technical preview hostname in the English SEO implementation brief.",
  },
  brandName: {
    value: "Dubai Yacht",
    status: "approved",
    evidence: "Owner approval for English PR 8B dated 2026-07-14.",
    approvedAt: "2026-07-14",
  },
  alternateBrandName: { status: "not-applicable", evidence: "Owner directed the alternate public brand to be omitted." },
  legalEntityName: { status: "not-applicable", evidence: "Owner directed the legal entity name to be omitted pending separate approval." },
  responsiblePerson: {
    value: "Mohammed Abdullah, Operation Manager",
    status: "approved",
    evidence: "Owner supplied the exact responsible person for the PR 8B legal correction.",
    approvedAt: "2026-07-14",
  },
  legalPublicationDate: {
    value: "14 July 2026",
    status: "approved",
    evidence: "Owner authorized merge and production publication on 2026-07-14 after reviewing the complete rendered legal wording.",
    approvedAt: "2026-07-14",
  },
  phoneDisplay: {
    value: "+971 50 464 1020",
    status: "approved",
    evidence: "Owner approval for English PR 8B dated 2026-07-14.",
    approvedAt: "2026-07-14",
  },
  phoneE164: {
    value: "+971504641020",
    status: "approved",
    evidence: "Owner approval for English PR 8B dated 2026-07-14.",
    approvedAt: "2026-07-14",
  },
  whatsappUrl: {
    value: "https://wa.me/971504641020",
    status: "approved",
    evidence: "Owner approval for English PR 8B dated 2026-07-14.",
    approvedAt: "2026-07-14",
  },
  contactEmail: { status: "not-applicable", evidence: "Owner directed public email to be omitted pending approval." },
  departureLocation: {
    value: "Departure location varies by yacht and confirmed booking. Dubai Marina may be used as a general departure reference, but it is not presented as the company’s business address or as a guaranteed departure point.",
    status: "approved",
    evidence: "Exact owner-approved wording for English PR 8B dated 2026-07-14.",
    approvedAt: "2026-07-14",
  },
  operatingHours: { status: "not-applicable", evidence: "Owner directed operating hours to be omitted." },
  bookingResponseHours: { status: "not-applicable", evidence: "Owner prohibited a guaranteed response time." },
  publicAddress: { status: "not-applicable", evidence: "Owner directed public physical address to be omitted." },
  socialProfiles: { status: "not-applicable", evidence: "Owner directed social profiles to be omitted pending approval." },
  analyticsEnabled: {
    value: false,
    status: "approved",
    evidence: "Owner approved analytics-disabled state for English PR 8B dated 2026-07-14.",
    approvedAt: "2026-07-14",
  },
  logoPath: { value: "/dubai-yachts-logo.png", status: "approved", evidence: "Owner approval dated 2026-07-14.", approvedAt: "2026-07-14" },
  faviconPath: { value: "/favicon.png", status: "approved", evidence: "Owner approval dated 2026-07-14.", approvedAt: "2026-07-14" },
};
