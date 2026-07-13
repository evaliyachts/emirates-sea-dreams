import { describe, expect, it } from "vitest";
import { getServiceBySlug, services } from "@/data/services";

describe("existing route helpers", () => {
  it("resolves an existing service without changing its route identity", () => {
    const service = services[0];

    expect(getServiceBySlug(service.slug)).toBe(service);
    expect(`/services/${service.slug}`).toBe(`/services/${services[0].slug}`);
  });

  it("returns undefined for an unknown service slug", () => {
    expect(getServiceBySlug("not-a-current-service")).toBeUndefined();
  });
});
