import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import Index from "@/pages/Index";

afterEach(() => {
  cleanup();
  document.head.innerHTML = "";
});

describe("homepage baseline", () => {
  it("renders the current visible H1 and content", () => {
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
        name: /Yacht Rental Dubai — Luxury Yacht Charter Dubai/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Premium Yacht Charters")).toBeInTheDocument();
  });

  it("preserves the current homepage metadata helper output", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Index />
        </MemoryRouter>
      </HelmetProvider>,
    );

    await waitFor(() => {
      expect(document.title).toBe("Yacht Rental Dubai | Luxury Yacht Charter Dubai — Dubai Yacht");
    });

    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toContain(
      "Yacht rental Dubai with Dubai Yacht",
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://yachtrentaldxb.com/",
    );
  });
});
