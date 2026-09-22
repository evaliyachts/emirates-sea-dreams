import { fireEvent, render, screen } from "@testing-library/react";
import { JSDOM } from "jsdom";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppProviders } from "../src/app/AppProviders";
import { AppRoutes } from "../src/app/AppRoutes";
import { renderStaticRoute } from "../src/entry-server";
import { publishableYachts } from "../src/data/yachts";
import { approvedServices } from "../src/data/approved-services";
import { testimonials } from "../src/data/testimonials";
import { offers } from "../src/data/offers";

const renderRoute = (path: string) => render(<AppProviders><MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter></AppProviders>);
const parse = (path: string) => new JSDOM(renderStaticRoute(path).html).window.document;

describe("customer-first booking journey", () => {
  it("includes FAQ answers in initial HTML with native disclosure controls", () => {
    const home = parse("/");
    const faq = parse("/faq");
    expect(home.querySelectorAll("details")).toHaveLength(4);
    expect(faq.querySelectorAll("details")).toHaveLength(10);
    for (const document of [home, faq]) {
      document.querySelectorAll("details").forEach((details) => {
        expect(details.querySelector("summary")?.textContent).toBeTruthy();
        expect(details.querySelector("p")?.textContent).toBeTruthy();
      });
    }
  });
  it("filters the complete catalogue by capacity and hourly budget and resets empty results", () => {
    renderRoute("/yachts");
    expect(screen.getByText("19 yachts match your selection")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Guests"), { target: { value: "20" } });
    fireEvent.change(screen.getByLabelText("Maximum AED per hour"), { target: { value: "1000" } });
    const expected = publishableYachts.filter((yacht) => yacht.guestCapacity >= 20 && yacht.pricePerHour <= 1000);
    expect(screen.getByText(`${expected.length} yachts match your selection`)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Guests"), { target: { value: "999" } });
    expect(screen.getByText("0 yachts match your selection")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByText("19 yachts match your selection")).toBeInTheDocument();
  });

  it("includes the selected yacht or occasion in editable WhatsApp messages", () => {
    const cases = [
      ...publishableYachts.map((yacht) => ({ path: `/yachts/${yacht.slug}`, context: yacht.name })),
      ...approvedServices.map((service) => ({ path: service.path, context: service.name })),
    ];
    for (const { path, context } of cases) {
      const document = parse(path);
      const link = document.querySelector<HTMLAnchorElement>('main a[href^="https://wa.me/"]')!;
      const target = new URL(link.href);
      expect(target.pathname).toBe("/971504641020");
      expect(target.searchParams.get("text")).toContain(context);
      expect(target.searchParams.get("text")).toMatch(/Date:\nTime:\nGuests:/);
      expect(document.querySelector('aside[aria-label="Contact Dubai Yacht"] a[href="tel:+971504641020"]')).not.toBeNull();
    }
  });

  it("renders one main landmark and data-derived rental costs for every yacht", () => {
    for (const yacht of publishableYachts) {
      const document = parse(`/yachts/${yacht.slug}`);
      expect(document.querySelectorAll("main")).toHaveLength(1);
      const rows = [...document.querySelectorAll("tbody tr")];
      expect(rows).toHaveLength(3);
      rows.forEach((row, index) => {
        expect(row.textContent).toContain((yacht.pricePerHour * (yacht.minimumDuration + index)).toLocaleString("en-AE"));
      });
      expect(document.querySelectorAll('section[aria-labelledby="related-yachts-heading"] a')).toHaveLength(3);
      expect(document.querySelector('section[aria-labelledby="related-yachts-heading"]')?.innerHTML).not.toContain(`href="/yachts/${yacht.slug}"`);
    }
  });

  it("keeps unsubstantiated legacy testimonials and fixed-price packages unpublished", () => {
    expect(testimonials).toEqual([]);
    expect(offers).toEqual([]);
    expect(parse("/offers").querySelector("h1")?.textContent).toBe("Page not found");
  });
});
