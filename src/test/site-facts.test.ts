import { describe, expect, it } from "vitest";
import {
  getApprovedValue,
  isApprovedValue,
  PREVIEW_URL,
  PRODUCTION_URL,
  siteFacts,
  type ApprovedValue,
} from "@/config/site-facts";

describe("site fact approvals", () => {
  it("exposes only the approved technical authorities", () => {
    expect(getApprovedValue(siteFacts.productionUrl)).toBe(PRODUCTION_URL);
    expect(getApprovedValue(siteFacts.previewUrl)).toBe(PREVIEW_URL);
    expect(PRODUCTION_URL).toBe("https://yachtrentaldxb.com/");
    expect(PREVIEW_URL).toBe("https://yachtrentaldxb.netlify.app/");
  });

  it("does not treat source values with pending status as approved", () => {
    expect(siteFacts.brandName.value).toBe("Dubai Yacht");
    expect(siteFacts.brandName.status).toBe("pending");
    expect(isApprovedValue(siteFacts.brandName)).toBe(false);
    expect(getApprovedValue(siteFacts.brandName)).toBeUndefined();
    expect(getApprovedValue(siteFacts.phoneDisplay)).toBeUndefined();
    expect(getApprovedValue(siteFacts.analyticsEnabled)).toBeUndefined();
  });

  it("requires both approved status and a defined value", () => {
    const incomplete: ApprovedValue<string> = { status: "approved" };
    const rejected: ApprovedValue<string> = { value: "not-authorized", status: "rejected" };

    expect(isApprovedValue(incomplete)).toBe(false);
    expect(isApprovedValue(rejected)).toBe(false);
    expect(getApprovedValue(incomplete)).toBeUndefined();
    expect(getApprovedValue(rejected)).toBeUndefined();
  });
});
