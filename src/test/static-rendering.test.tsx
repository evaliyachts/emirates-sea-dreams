import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppProviders } from "@/app/AppProviders";
import { createAppQueryClient } from "@/app/query-client";
import { AppRoutes } from "@/app/AppRoutes";
import { shouldHydrateRoot } from "@/app/hydration";
import { renderStaticRoute } from "@/entry-server";

describe("shared client and static route tree", () => {
  it.each([
    ["/", "Yacht Rental Dubai"],
    ["/yachts", "Yachts for Rent in Dubai"],
    ["/services", "Yacht Services"],
    ["/occasions", "Yacht Experiences"],
  ])("renders %s with route-specific initial HTML", (path, heading) => {
    const result = renderStaticRoute(path);
    expect(result.html).toContain("<h1");
    expect(result.html).toContain(heading);
    expect(result.head).toContain(`https://yachtrentaldxb.com${path === "/" ? "/" : path}`);
    expect(result.head).not.toContain("keywords");
  });

  it("uses a fresh QueryClient and isolated Helmet context for each static render", () => {
    expect(createAppQueryClient()).not.toBe(createAppQueryClient());
    const yachts = renderStaticRoute("/yachts");
    const services = renderStaticRoute("/services");
    expect(yachts.head).toContain("Yachts for Rent in Dubai");
    expect(yachts.head).not.toContain("Yacht Services Dubai");
    expect(services.head).toContain("Yacht Services Dubai");
    expect(services.head).not.toContain("Yachts for Rent in Dubai");
  });

  it("keeps the shared route tree operational for client rendering", () => {
    render(
      <AppProviders queryClient={createAppQueryClient()}>
        <MemoryRouter initialEntries={["/services"]}>
          <AppRoutes />
        </MemoryRouter>
      </AppProviders>,
    );
    expect(screen.getByRole("heading", { level: 1, name: /Yacht Services/i })).toBeInTheDocument();
  });

  it("selects createRoot for empty and comment-only roots, and hydration for element markup", () => {
    const root = document.createElement("div");
    expect(shouldHydrateRoot(root)).toBe(false);
    root.append(document.createComment("app-html"));
    expect(shouldHydrateRoot(root)).toBe(false);
    root.innerHTML = "<main>prerendered</main>";
    expect(shouldHydrateRoot(root)).toBe(true);
  });

  it("renders a canonical-free noindex 404", () => {
    const result = renderStaticRoute("/__missing__", true);
    expect(result.html).toContain("Page not found");
    expect(result.head).toContain('name="robots" content="noindex, follow"');
    expect(result.head).not.toContain('rel="canonical"');
  });
});
