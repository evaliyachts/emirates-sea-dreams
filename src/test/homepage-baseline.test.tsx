import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import Index from "@/pages/Index";

afterEach(() => {
  cleanup();
  document.head.innerHTML = "";
});

describe("homepage commercial owner", () => {
  it("renders the PR 5 H1 and factual direct answer", () => {
    render(
      <HelmetProvider>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Index />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Private Yacht Rental in Dubai/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Compare 19 yachts from AED 500 per hour/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View yachts and prices/i })).toHaveAttribute("href", "/yachts");
  });

  it("emits the approved homepage metadata helper output", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Index />
        </MemoryRouter>
      </HelmetProvider>,
    );

    await waitFor(() => {
      expect(document.title).toBe("Private Yacht Rental Dubai | Dubai Yacht");
    });

    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toContain(
      "Compare private yachts in Dubai by hourly price",
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://yachtrentaldxb.com/",
    );
  });
});
