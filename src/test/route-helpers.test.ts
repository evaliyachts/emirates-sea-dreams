import { describe, expect, it } from "vitest";
import { approvedServices, getApprovedServiceBySlug } from "@/data/approved-services";

describe("existing route helpers", () => {
  it("resolves an existing service without changing its route identity", () => {
    const service = approvedServices[0];

    expect(getApprovedServiceBySlug(service.slug)).toBe(service);
    expect(`/services/${service.slug}`).toBe(service.path);
  });

  it("returns undefined for an unknown service slug", () => {
    expect(getApprovedServiceBySlug("not-an-approved-service")).toBeUndefined();
  });
});
