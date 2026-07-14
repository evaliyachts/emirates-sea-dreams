import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { renderStaticRoute } from "../src/entry-server";
import { getInitialCarouselImage } from "../src/lib/carousel-media";
import { getPublishableYachtBySlug } from "../src/data/yachts";

const read = (path: string) => readFileSync(resolve(path), "utf8");
const parse = (html: string) => new DOMParser().parseFromString(html, "text/html");

describe("PR 9 first-paint and media-loading boundaries", () => {
  it("keeps route-specific server content visible before hydration", () => {
    const html = renderStaticRoute("/about").html;
    const mainTag = html.match(/<main id="main-content"[^>]*>/)?.[0] ?? "";
    expect(mainTag).toContain('class="flex-1"');
    expect(mainTag).not.toMatch(/opacity:\s*0|translateY/);
    expect(html).toContain("About Dubai Yacht");
  });

  it("preloads exactly one viewport-appropriate homepage hero candidate", () => {
    const head = renderStaticRoute("/").head;
    expect(head).toContain('href="/media/home/hero/yacht-cover-mobile.avif"');
    expect(head).toContain('media="(max-width: 639px)"');
    expect(head).toContain('href="/media/home/hero/yacht-cover-desktop.avif"');
    expect(head).toContain('media="(min-width: 640px)"');
    expect([...head.matchAll(/rel="preload"/g)]).toHaveLength(2);
  });

  it("preloads and prioritizes only the initial yacht-detail center image", () => {
    const slug = "50-feet-royal-majesty-dubai-yacht-rental";
    const yacht = getPublishableYachtBySlug(slug)!;
    const expected = getInitialCarouselImage(yacht.media)!;
    const rendered = renderStaticRoute(`/yachts/${slug}`);
    const page = parse(rendered.html);
    const galleryImages = [...page.querySelectorAll<HTMLImageElement>('section[aria-label="Royal Majesty 50 image gallery"] button img')];
    const eager = galleryImages.filter((image) => image.getAttribute("loading") === "eager");

    expect(rendered.head).toContain(`rel="preload" as="image" href="${expected.path}"`);
    expect(rendered.head).toContain('referrerPolicy="no-referrer"');
    expect(galleryImages).toHaveLength(Math.min(5, yacht.media.length));
    expect(eager).toHaveLength(1);
    expect(eager[0].getAttribute("src")).toBe(expected.path);
    expect(eager[0].getAttribute("fetchpriority")).toBe("high");
    expect(galleryImages.filter((image) => image.getAttribute("loading") === "lazy")).toHaveLength(galleryImages.length - 1);
  });

  it("keeps a one-image carousel centered and usable", () => {
    const yacht = getPublishableYachtBySlug("benetti-110ft-jacuzzi-yacht-rental-dubai")!;
    expect(getInitialCarouselImage([yacht.media[0]])).toBe(yacht.media[0]);
  });

  it("keeps service-detail imagery below the commercial hero lazy and unprioritized", () => {
    const page = parse(renderStaticRoute("/services/birthday-party").html);
    const image = page.querySelector<HTMLImageElement>('section[aria-label="Private Birthday Yacht Celebration planning image"] img')!;
    expect(image.getAttribute("loading")).toBe("lazy");
    expect(image.hasAttribute("fetchpriority")).toBe(false);
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
  });

  it("discovers fonts in document head and omits unused global runtime providers", () => {
    const template = read("index.html");
    const providers = read("src/app/AppProviders.tsx");
    expect(template).toContain('rel="preconnect" href="https://fonts.googleapis.com"');
    expect(template).toContain('rel="preconnect" href="https://fonts.gstatic.com" crossorigin');
    expect(template).toContain('rel="stylesheet" href="https://fonts.googleapis.com/css2?');
    expect(read("src/index.css")).not.toMatch(/^@import/m);
    expect(providers).not.toMatch(/QueryClientProvider|TooltipProvider|Toaster|Sonner/);
  });
});
