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
  "/media/home/hero/yacht-cover-mobile.avif": "18da0d9a4102830e365c8799f90bfcdbe91f4907eface5cb518ac3f04121abca",
  "/media/home/services/04ed317f13d8d1d3-private-yacht-55ft-02-salon.webp": "04ed317f13d8d1d31976ecfb2fbc38e3acaf9950b45b72b255b4095e63d57e31",
  "/media/home/services/2bc37a1679d813c5-private-yacht-55ft-08-aft-seating.webp": "2bc37a1679d813c53664e9d2637cf9d39555ade05a78609c9323c1dad40273f7",
  "/media/home/services/fef28f32686ec686-private-yacht-55ft-06-bow-seating.webp": "fef28f32686ec6861b6836a5cfdaf6d659c97dd9438398769b682d62033c09a2",
  "/media/home/services/bb6fa6c92c1726f4-private-yacht-55ft-07-bow-marina.webp": "bb6fa6c92c1726f437e87e0bb7f147f1c917cdd468b93452134df82de6653f51",
  "/media/home/services/63d7fb8c286f0452-private-yacht-55ft-05-flybridge-skyline.webp": "63d7fb8c286f0452f0d70b05019a1a6fc6842d51fc1c97903e924b22500af238",
  "/media/home/services/f82dfa26e591ffae-private-yacht-55ft-04-flybridge.webp": "f82dfa26e591ffae01c3e1b4a69ad336a7064551c4ad10b2090c447ebd81fb3b",
  "/media/home/services/jet-ski.jpg": "0caceb257e6580b7463e11f0c40d4c1c3b7917005d9460ab17e0f6abfe929e7b",
  "/media/home/services/donut-ride.webp": "5c0149304e860af745089086e3fcc3ed69176139eb92174c98593299135ac32a",
  "/media/home/services/banana-boat.webp": "554a754a348c5dc26d1ded5ae728f099a2f5500b3e230809b54460464835b141",
  "/media/home/services/c471f05e21df327c-private-yacht-55ft-03-salon-media.webp": "c471f05e21df327c488f2f8dfbb67ae33c2142044e4c068d51fbc0359bb1c86b",
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

  it("uses responsive hero covers and approved service imagery with all service links in initial HTML", () => {
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
    expect(desktopImage?.getAttribute("fetchpriority")).toBe("high");

    const serviceSection = document.querySelector<HTMLElement>('[data-home-section="services"]')!;
    const serviceImages = [...serviceSection.querySelectorAll<HTMLImageElement>('img[src^="/media/home/services/"]')];
    expect(serviceImages).toHaveLength(1);
    expect(serviceImages[0].getAttribute("src")).toBe(HOME_SERVICE_MEDIA[0].path);
    serviceImages.forEach((image, index) => {
      expect(image.getAttribute("loading")).toBe("lazy");
      expect(image.getAttribute("width")).toBe(`${HOME_SERVICE_MEDIA[index].width}`);
      expect(image.getAttribute("height")).toBe(`${HOME_SERVICE_MEDIA[index].height}`);
    });
    expect(new Set([...serviceSection.querySelectorAll<HTMLAnchorElement>('a[href^="/services/"]')].map((link) => link.getAttribute("href")))).toHaveLength(10);
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
    expect(rendered.html).toContain("Private Yacht Rental in Dubai");
  });

  it("decodes and verifies every local homepage image through media:verify", async () => {
    await expect(verifyProductionHomepageMedia()).resolves.toEqual({ imageCount: 15 });
  });
});
