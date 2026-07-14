import axe from "axe-core";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { renderStaticRoute } from "../src/entry-server";

const pageClasses = [
  ["homepage", "/", false],
  ["contact", "/contact", false],
  ["services index", "/services", false],
  ["event detail", "/services/birthday-party", false],
  ["yacht catalogue", "/yachts", false],
  ["yacht detail", "/yachts/50-feet-royal-majesty-dubai-yacht-rental", false],
  ["404", "/accessibility-test-not-found", true],
] as const;

describe("rendered accessibility baseline", () => {
  it.each(pageClasses)("has no automatically detectable critical or serious violations on %s", async (_label, path, notFound) => {
    const rendered = renderStaticRoute(path, notFound);
    const dom = new JSDOM(`<!doctype html><html lang="en"><head><title>Test</title>${rendered.head}</head><body>${rendered.html}</body></html>`, { runScripts: "outside-only" });
    dom.window.eval(axe.source);
    const windowAxe = (dom.window as unknown as { axe: typeof axe }).axe;
    const result = await windowAxe.run(dom.window.document.documentElement, {
      rules: {
        "color-contrast": { enabled: false },
        region: { enabled: false },
      },
    });
    expect(result.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
  });
});
