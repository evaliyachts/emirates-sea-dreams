import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppProviders } from "../src/app/AppProviders";
import { createAppQueryClient } from "../src/app/query-client";
import { AppRoutes } from "../src/app/AppRoutes";
import { renderStaticRoute } from "../src/entry-server";
import { publishedStaticRoutes } from "../seo";

const renderRoute = (path: string) => render(<AppProviders queryClient={createAppQueryClient()}><MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter></AppProviders>);

describe("PR 8B support, legal and contact publication", () => {
  afterEach(() => vi.restoreAllMocks());

  it("publishes the five approved routes and keeps Offers blocked", () => {
    expect(publishedStaticRoutes).toHaveLength(38);
    expect(publishedStaticRoutes.map((route) => route.path)).toEqual(expect.arrayContaining(["/about", "/faq", "/contact", "/terms", "/privacy"]));
    expect(publishedStaticRoutes.some((route) => route.path === "/offers")).toBe(false);
    const homepage = renderStaticRoute("/").html;
    expect(homepage).not.toContain('href="/offers"');
  });

  it("removes inherited legal and FAQ promises and emits BreadcrumbList only on legal pages", () => {
    for (const path of ["/faq", "/terms", "/privacy"] as const) {
      const rendered = renderStaticRoute(path);
      expect(rendered.html).not.toMatch(/50%|48 hours|full refund|free rescheduling|maritime insurance|instant (?:booking|availability|response)/i);
      expect(rendered.head).toContain('"@type":"BreadcrumbList"');
      expect(rendered.head).not.toMatch(/FAQPage|LocalBusiness|Product|Event|Review|AggregateRating/);
    }
    const terms = renderStaticRoute("/terms").html;
    const privacy = renderStaticRoute("/privacy").html;
    const legalText = `${terms}\n${privacy}`.replaceAll("<!-- -->", "");
    expect(terms).toContain("Mohammed Abdullah, Operation Manager");
    expect(terms).toContain("Dubai Yacht is the public brand");
    expect(terms).toContain("responsible contracting party");
    expect(terms).toContain("It does not exclude mandatory consumer rights or excuse inaccurate or misleading website information.");
    expect(terms).toContain("Any material third-party terms that apply to an optional item should be disclosed or made available before that item is confirmed.");
    expect(terms).toContain("Nothing in these terms excludes or limits any right or liability that cannot lawfully be excluded or limited.");
    expect(terms).toContain("does not process payments");
    expect(privacy).toContain("Mohammed Abdullah, Operation Manager");
    expect(privacy).not.toContain("approved business recipient");
    for (const category of ["WhatsApp or telephone identifier", "Requested date and start time", "Requested duration", "Guest count", "Yacht interest", "Occasion or optional-service requests", "Notes and communication history", "IP address", "Browser and device information", "Requested resource or page", "Timestamp and security-log information"]) {
      expect(privacy).toContain(category);
    }
    expect(privacy).toContain("Information is processed only where permitted by applicable law");
    for (const right of ["Access to and a copy", "Correction of inaccurate", "Deletion of information", "Restriction or cessation", "Transfer or portability", "Withdrawal of consent", "competent UAE authority"]) {
      expect(privacy).toContain(right);
    }
    expect(privacy).toContain("Identity or request details may need to be confirmed");
    expect(privacy).toContain("Information should be deleted or anonymised when it is no longer required for those purposes.");
    for (const provider of ["WhatsApp/Meta", "telephone-network provider", "Netlify", "approved production image hosts", "yacht providers", "approved optional-service providers"]) {
      expect(privacy).toContain(provider);
    }
    expect(privacy).toContain("Cross-border processing remains subject to applicable legal requirements and relevant provider arrangements.");
    expect(privacy).toContain("Analytics and advertising tracking are disabled in this release");
    expect(privacy).toContain("does not set other browser cookies or local storage in this release");
    expect(privacy).toContain("Reasonable technical and organisational measures are used to protect information");
    expect(legalText.match(/Effective date: 14 July 2026/g)).toHaveLength(2);
    expect(legalText).not.toContain("Pending production publication");
  });

  it("prepares WhatsApp successfully without asking for identity fields", async () => {
    const popup = { opener: window, location: { href: "" } };
    vi.spyOn(window, "open").mockReturnValue(popup as unknown as Window);
    renderRoute("/contact");
    expect(screen.queryByLabelText(/name|email|phone/i)).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Preferred date"), { target: { value: "2026-08-10" } });
    fireEvent.change(screen.getByLabelText("Preferred start time"), { target: { value: "16:00" } });
    fireEvent.change(screen.getByLabelText(/Requested duration/), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Guest count"), { target: { value: "8" } });
    fireEvent.click(screen.getByRole("button", { name: "Prepare in WhatsApp" }));
    expect(window.open).toHaveBeenCalledWith("", "dubai_yacht_whatsapp");
    expect(popup.opener).toBeNull();
    expect(popup.location.href).toContain("https://wa.me/971504641020?text=");
    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent("It is not sent until you press Send in WhatsApp");
    await waitFor(() => expect(status).toHaveFocus());
  });

  it("shows a truthful accessible fallback when WhatsApp is blocked", async () => {
    vi.spyOn(window, "open").mockReturnValue(null);
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    renderRoute("/contact");
    fireEvent.change(screen.getByLabelText("Preferred date"), { target: { value: "2026-08-10" } });
    fireEvent.change(screen.getByLabelText("Preferred start time"), { target: { value: "16:00" } });
    fireEvent.change(screen.getByLabelText(/Requested duration/), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText("Guest count"), { target: { value: "4" } });
    fireEvent.click(screen.getByRole("button", { name: "Prepare in WhatsApp" }));
    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent("Nothing has been sent");
    expect(status).not.toHaveTextContent("has been prepared in WhatsApp");
    const fallback = screen.getByRole("link", { name: "Open prepared WhatsApp message" });
    expect(fallback).toHaveAttribute("href", expect.stringContaining("https://wa.me/971504641020?text="));
    expect(screen.getByRole("button", { name: "Copy message" })).toBeInTheDocument();
    await waitFor(() => expect(status).toHaveFocus());
  });

  it("traps the mobile menu in a dialog and restores trigger focus on Escape", async () => {
    renderRoute("/");
    const trigger = screen.getByRole("button", { name: "Open navigation menu" });
    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Navigation menu" });
    expect(dialog).toBeInTheDocument();
    expect(document.body.style.pointerEvents).toBe("none");
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Navigation menu" })).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });
});
