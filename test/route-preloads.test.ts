import { describe, expect, it } from "vitest";
import { routeModulePreloads, type AssetManifest } from "../src/lib/route-preloads";

describe("route-only preload graph", () => {
  const manifest: AssetManifest = {
    "src/main.tsx": { file: "assets/entry.js", isEntry: true },
    "src/pages/Contact.tsx": { file: "assets/contact.js", imports: ["shared", "src/main.tsx"] },
    "src/pages/Privacy.tsx": { file: "assets/privacy.js", imports: ["shared"] },
    shared: { file: "assets/shared.js", imports: ["shared"] },
  };
  it("preloads only the selected page and its dependencies, once even with a cycle", () => {
    const links = routeModulePreloads(manifest, "/contact");
    expect(links.match(/assets\/shared.js/g)).toHaveLength(1);
    expect(links).toContain("/assets/contact.js");
    expect(links).not.toMatch(/privacy.js|entry.js/);
  });
  it("fails the build for missing or unsafe chunks instead of emitting broken preload URLs", () => {
    expect(() => routeModulePreloads(manifest, "/faq")).toThrow(/Missing built route/);
    expect(() => routeModulePreloads({ "src/pages/Contact.tsx": { file: "../bad.js" } }, "/contact")).toThrow(/Unsafe route/);
  });
});
