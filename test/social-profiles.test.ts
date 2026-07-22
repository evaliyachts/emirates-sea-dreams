import { describe, expect, it } from "vitest";
import { renderStaticRoute } from "../src/entry-server";
import { siteFacts } from "../src/config/site-facts";
import { SOCIAL_PROFILES } from "../src/lib/constants";

const expectedProfiles = [
  { platform: "Instagram", url: "https://www.instagram.com/dubai___yacht?igsh=aTFqbHNkYzhkZmo0&utm_source=qr" },
  { platform: "Facebook", url: "https://www.facebook.com/share/1Gd7YDGphg/?mibextid=wwXIfr" },
  { platform: "Threads", url: "https://www.threads.com/@dubai___yacht?igshid=NTc4MTIwNjQ2YQ==" },
  { platform: "X", url: "https://x.com/yacht_hire?s=11" },
  { platform: "TikTok", url: "https://www.tiktok.com/@dubaiyacht_rental?_r=1&_t=ZS-98EMXba1uDq" },
  { platform: "YouTube", url: "https://youtube.com/@luxury_yacht_rental_dubai?si=cTZtaKDe7TWrBnZP" },
] as const;

describe("owner-approved social profile links", () => {
  it("keeps the six exact owner-approved profile destinations in the central fact contract", () => {
    expect(siteFacts.socialProfiles.status).toBe("approved");
    expect(siteFacts.socialProfiles.approvedAt).toBe("2026-07-22");
    expect(SOCIAL_PROFILES).toEqual(expectedProfiles);
  });

  it("renders icon-only, accessible, crawlable footer anchors without altering entity schema", () => {
    const rendered = renderStaticRoute("/");
    const page = new DOMParser().parseFromString(rendered.html, "text/html");
    const nav = page.querySelector('nav[aria-label="Dubai Yacht social profiles"]');
    const links = [...(nav?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];

    expect(links).toHaveLength(expectedProfiles.length);
    links.forEach((link, index) => {
      const profile = expectedProfiles[index];
      expect(link.querySelector(`[data-social-icon="${profile.platform}"]`)).not.toBeNull();
      expect(link.querySelector(".sr-only")?.textContent).toBe(profile.platform);
      expect(link.getAttribute("href")).toBe(profile.url);
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      expect(link.getAttribute("aria-label")).toBe(`Visit Dubai Yacht on ${profile.platform}`);
    });
    expect(rendered.head).not.toContain('"sameAs"');
  });
});
