import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { JSDOM } from "jsdom";
import YachtCard from "../src/components/shared/YachtCard";
import { publishableYachts } from "../src/data/yachts";
import { responsiveYachtMedia } from "../src/data/responsive-media";
import { responsiveImageAttributes } from "../src/lib/responsive-image";
import { NEUTRAL_YACHT_FALLBACK } from "../src/data/media-constants";
import { getInitialCarouselImage } from "../src/lib/carousel-media";
import { renderStaticRoute } from "../src/entry-server";
import { verifyResponsiveMedia } from "../scripts/media-verify";

describe("approved responsive photos", () => {
  it("verifies every local rendition's source rights, checksum and uncropped dimensions", async () => {
    const result = await verifyResponsiveMedia();
    expect(result.sourceCount).toBeGreaterThan(0);
    expect(result.variantCount).toBeGreaterThan(result.sourceCount);
    expect(responsiveImageAttributes("https://unapproved.example/photo.jpg", 1000, "300px")).toEqual({});
  });
  it("retries the original photo before using the neutral fallback", () => {
    const yacht = publishableYachts.find((y) => responsiveYachtMedia[(y.media.find((m) => m.featured) ?? y.media[0]).path])!;
    const primary = yacht.media.find((m) => m.featured) ?? yacht.media[0];
    render(<MemoryRouter><YachtCard yacht={yacht} /></MemoryRouter>);
    const image = screen.getByRole("img", { name: primary.alt });
    expect(image.getAttribute("srcset")).toContain("/media/responsive/");
    fireEvent.error(image);
    expect(image.hasAttribute("srcset")).toBe(false);
    expect(image.getAttribute("src")).toBe(primary.path);
    fireEvent.error(image);
    expect(image.getAttribute("src")).toBe(NEUTRAL_YACHT_FALLBACK);
  });
  it("aligns the preloaded hero source set with the visible gallery image", () => {
    const yacht = publishableYachts.find((y) => responsiveYachtMedia[getInitialCarouselImage(y.media)!.path])!;
    const initial = getInitialCarouselImage(yacht.media)!;
    const page = renderStaticRoute(`/yachts/${yacht.slug}`);
    const head = new JSDOM(page.head).window.document;
    const body = new JSDOM(page.html).window.document;
    const preload = head.querySelector(`link[rel="preload"][href="${initial.path}"]`)!;
    const image = [...body.querySelectorAll("img")].find((element) => element.getAttribute("src") === initial.path)!;
    expect(preload.getAttribute("imagesrcset")).toBe(image.getAttribute("srcset"));
    expect(preload.getAttribute("imagesizes")).toBe(image.getAttribute("sizes"));
    expect(preload.getAttribute("imagesrcset")).toContain("/media/responsive/");
    expect(preload.getAttribute("referrerpolicy")).toBe(image.getAttribute("referrerpolicy"));
  });
});
