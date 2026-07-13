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
    status: "pending",
    evidence: "Current source usage only; business approval is still required.",
  },
  alternateBrandName: { status: "pending", evidence: "No alternate English brand is approved." },
  phoneDisplay: {
    value: "+97150 464 1020",
    status: "pending",
    evidence: "Current source usage only; business approval is still required.",
  },
  phoneE164: {
    value: "+971504641020",
    status: "pending",
    evidence: "Derived from current source; derivation is not business approval.",
  },
  whatsappUrl: {
    value: "https://wa.me/971504641020",
    status: "pending",
    evidence: "Derived from current source; business approval is still required.",
  },
  contactEmail: { status: "pending", evidence: "No approved contact email is recorded." },
  departureLocation: { status: "pending", evidence: "Current marina claims are unverified." },
  operatingHours: { status: "pending", evidence: "Current hours claims are unverified." },
  bookingResponseHours: { status: "pending", evidence: "No response-time promise is approved." },
  publicAddress: { status: "pending", evidence: "No visible public physical address is approved." },
  socialProfiles: { status: "pending", evidence: "No official English social profiles are approved." },
  analyticsEnabled: {
    status: "pending",
    evidence: "No approved analytics provider, consent policy, or measurement ID is recorded.",
  },
};
