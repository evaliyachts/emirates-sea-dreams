import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppProviders } from "../src/app/AppProviders";
import { AppRoutes } from "../src/app/AppRoutes";
import { LazyAppRoutes } from "../src/app/LazyAppRoutes";
import { getDubaiDate, validateYachtEnquiry } from "../src/lib/contact-validation";
import type { YachtEnquiryFields } from "../src/lib/contact-request";

const now = new Date("2026-10-29T21:00:00Z");
const request: YachtEnquiryFields = { date: "2026-10-31", time: "16:00", duration: "4", guests: "8", yacht: "", occasion: "", note: "" };
afterEach(() => vi.restoreAllMocks());

describe("enquiry validation without submitting information", () => {
  it("uses the Dubai date when UTC is still the previous day", () => {
    expect(getDubaiDate(now)).toBe("2026-10-30");
    expect(validateYachtEnquiry({ ...request, date: "2026-10-29" }, now)).toMatch(/future date/);
    expect(validateYachtEnquiry({ ...request, date: "2026-10-30" }, now)).toBeUndefined();
  });
  it("rejects an impossible date and invalid numeric values", () => {
    expect(validateYachtEnquiry({ ...request, date: "2027-02-31" }, now)).toMatch(/valid date/);
    expect(validateYachtEnquiry({ ...request, guests: "1.5" }, now)).toMatch(/whole number/);
    expect(validateYachtEnquiry({ ...request, duration: "Infinity" }, now)).toMatch(/minimum/);
  });
  it("honours the selected yacht's own minimum and capacity", () => {
    expect(validateYachtEnquiry({ ...request, yacht: "Benetti 110", duration: "2" }, now)).toMatch(/4 hours/);
    expect(validateYachtEnquiry({ ...request, yacht: "Royal Majesty 50", duration: "2", guests: "13" }, now)).toMatch(/12 guests/);
    expect(validateYachtEnquiry({ ...request, yacht: "Royal Majesty 50", duration: "2", guests: "12" }, now)).toBeUndefined();
  });
  it("does not open WhatsApp for a past-date form even if native validation is bypassed", async () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    const { container } = render(<AppProviders><MemoryRouter initialEntries={["/contact"]}><AppRoutes /></MemoryRouter></AppProviders>);
    fireEvent.change(screen.getByLabelText("Preferred date"), { target: { value: "2000-01-01" } });
    fireEvent.submit(container.querySelector("form")!);
    expect(open).not.toHaveBeenCalled();
    expect(await screen.findByRole("status")).toHaveTextContent(/future date/);
  });
});

describe("production lazy route tree", () => {
  it("loads the existing service route without changing its heading", async () => {
    render(<AppProviders><MemoryRouter initialEntries={["/services"]}><LazyAppRoutes /></MemoryRouter></AppProviders>);
    expect(await screen.findByRole("heading", { level: 1, name: "Plan Your Time on the Water" })).toBeInTheDocument();
  });
});
