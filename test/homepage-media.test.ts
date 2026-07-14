import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { renderStaticRoute } from "../src/entry-server";
import {
  HOME_HERO_DESKTOP,
  HOME_HERO_MOBILE,
  HOMEPAGE_MEDIA,
  HOME_SERVICE_MEDIA,
} from "../src/data/home-media";
import { mediaRightsRegistry } from "../src/data/media-rights";
import { verifyProductionHomepageMedia } from "../scripts/media-verify";

const expectedHashes: Readonly<Record<string, string>> = {
  "/media/home/hero/yacht-cover-desktop.avif": "9095255cc998d6eaf68fdd5725185edcd4a9debbefe2c7af9371c7264cc9292b",
  "/media/home/hero/yacht-cover-mobile.avif": "3a1c62a8f21c968a16116198066bcb758016b3c051bfc7d21ef76105d3f0d875",
  "/media/home/services/birthday-party.webp": "fe6bd6a1c2f3d19c18126568c918abd3d0716b59b3044d6b860e9527764657ed",
  "/media/home/services/wedding-anniversary.webp": "2526d6b111c109d19b300e3f6b28a6459034f4802bb464e6a77b36031d08ac28",
  "/media/home/services/engagement-party.webp": "419ac07e6a72b6b77ff368697b46d334609455e0b015d87bdd56496c0f2606ea",
  "/media/home/services/marriage-proposal.webp": "8adab1568fb1c0ab6877a9ff84ee84d53c6caca06f5ad10a7be41da34f50584c",
  "/media/home/services/graduation-party.webp": "333f9572e2a1d8a16fd336a980e479f6764cf7bdd3ddf65629e39b20d703626a",
  "/media/home/services/wedding-party.webp": "6e5e69cde41c31cead2fa60fae5599e407c0f62cf8fa496db091bc9c7f914857",
  "/media/home/services/jet-ski.jpg": "0caceb257e6580b7463e11f0c40d4c1c3b7917005d9460ab17e0f6abfe929e7b",
  "/media/home/services/donut-ride.webp": "5c0149304e860af745089086e3fcc3ed69176139eb92174c98593299135ac32a",
  "/media/home/services/banana-boat.webp": "554a754a348c5dc26d1ded5ae728f099a2f5500b3e230809b54460464835b141",
  "/media/home/services/barbecue.webp": "c9ad0aa7f564aee8ec69475d94223545d1c56894bd70230d2e73a600ea082098",
  "/media/home/services/swimming.webp": "47f65baa95b38a20783ecc9214a88358b5f82232f90e92e7518dcf4df2c455bc",
  "/media/home/services/food-menu.webp": "b8f975157f4c2c3d5b2246f2b8d85e255d8869c0401f5c501182c5fbcbac958b",
  "/media/home/services/fishing.webp": "1c3b9848ecb1b7eec39a668c978a3c238c6b2172d476aacb3324a8e1159d97dc",
};

describe("approved homepage media restoration", () => {
  it("retains exact approved local snapshots with matching rights records", () => {
    expect(HOMEPAGE_MEDIA).toHaveLength(15);
    expect(HOME_SERVICE_MEDIA).toHaveLength(13);
    expect(new Set(HOMEPAGE_MEDIA.map((media) => media.path))).toHaveLength(15);
    expect(new Set(HOMEPAGE_MEDIA.map((media) => media.rightsRecordId))).toHaveLength(15);

    HOMEPAGE_MEDIA.forEach((media) => {
      expect(media.path).toMatch(/^\/media\/home\//);
      expect(media.path).not.toMatch(/https?:|evali|supabase/i);
      const rights = mediaRightsRegistry.find((record) => record.id === media.rightsRecordId);
      expect(rights).toMatchObject({
        productionPath: media.path,
        approvedHosts: ["yachtrentaldxb.com"],
        status: "approved",
      });
      const bytes = readFileSync(resolve("public", media.path.replace(/^\//, "")));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(expectedHashes[media.path]);
    });
  });

  it("uses responsive hero covers and all service images in route-specific initial HTML", () => {
    const rendered = renderStaticRoute("/");
    const document = new JSDOM(rendered.html).window.document;
    const hero = document.querySelector<HTMLElement>('[data-home-section="hero"]')!;
    const mobileSource = hero.querySelector<HTMLSourceElement>('picture source[media="(max-width: 639px)"]');
    const desktopImage = hero.querySelector<HTMLImageElement>("picture img");
    expect(mobileSource?.getAttribute("srcset")).toBe(HOME_HERO_MOBILE.path);
    expect(mobileSource?.getAttribute("width")).toBe(`${HOME_HERO_MOBILE.width}`);
    expect(mobileSource?.getAttribute("height")).toBe(`${HOME_HERO_MOBILE.height}`);
    expect(desktopImage?.getAttribute("src")).toBe(HOME_HERO_DESKTOP.path);
    expect(desktopImage?.getAttribute("loading")).toBe("eager");
    expect(desktopImage?.hasAttribute("fetchpriority")).toBe(false);

    const serviceSection = document.querySelector<HTMLElement>('[data-home-section="services"]')!;
    const serviceImages = [...serviceSection.querySelectorAll<HTMLImageElement>('img[src^="/media/home/services/"]')];
    expect(serviceImages).toHaveLength(13);
    expect(serviceImages.map((image) => image.getAttribute("src"))).toEqual(HOME_SERVICE_MEDIA.map((media) => media.path));
    serviceImages.forEach((image, index) => {
      expect(image.getAttribute("loading")).toBe("lazy");
      expect(image.getAttribute("width")).toBe(`${HOME_SERVICE_MEDIA[index].width}`);
      expect(image.getAttribute("height")).toBe(`${HOME_SERVICE_MEDIA[index].height}`);
    });
    expect(serviceSection.querySelectorAll('a[href="/services"]')).toHaveLength(13);
  });

  it("keeps approved homepage SEO ownership and avoids external media runtime URLs", () => {
    const rendered = renderStaticRoute("/");
    const document = new JSDOM(rendered.html).window.document;
    const restoredMediaSections = ["hero", "services"]
      .map((section) => document.querySelector(`[data-home-section="${section}"]`)!);
    const restoredMediaUrls = restoredMediaSections.flatMap((section) =>
      [...section.querySelectorAll<HTMLImageElement | HTMLSourceElement>("img, source")]
        .map((media) => media.getAttribute("src") ?? media.getAttribute("srcset") ?? ""),
    );
    expect(rendered.head).toMatch(/<title[^>]*>Private Yacht Rental Dubai \| Dubai Yacht<\/title>/);
    expect(rendered.head).toContain('rel="canonical" href="https://yachtrentaldxb.com/"');
    expect(rendered.head).not.toMatch(/hreflang|x-default|name="keywords"/i);
    expect(restoredMediaUrls.every((url) => url.startsWith("/media/home/"))).toBe(true);
    expect(restoredMediaSections.map((section) => section.textContent).join(" ")).not.toMatch(/evali|supabase/i);
    expect(rendered.html).toContain("Private Yacht Rental in Dubai, ");
  });

  it("decodes and verifies every local homepage image through media:verify", async () => {
    await expect(verifyProductionHomepageMedia()).resolves.toEqual({ imageCount: 15 });
  });
});
