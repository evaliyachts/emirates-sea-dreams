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
        name: /Private Yacht Rental in Dubai, Compared with Verified Facts/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/The current published catalogue contains 19 verified yacht records/i)).toBeInTheDocument();
    expect(screen.getByText(/not described as a public, ticketed or shared cruise service/i)).toBeInTheDocument();
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
      expect(document.title).toBe("Private Yacht Rental Dubai | Compare Verified Yachts");
    });

    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toContain(
      "Compare 19 verified private yachts in Dubai",
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://yachtrentaldxb.com/",
    );
  });
});
