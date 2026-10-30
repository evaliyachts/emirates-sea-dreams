import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");
const manifest = JSON.parse(read("package.json"));
const lock = JSON.parse(read("package-lock.json"));

describe("dependency security boundaries", () => {
  it("pins the patched router without retaining the obsolete server subpath", () => {
    expect(manifest.dependencies["react-router-dom"]).toBe("7.18.4");
    expect(lock.packages["node_modules/react-router"].version).toBe("7.18.4");
    expect(read("src/entry-server.tsx")).toContain('import { StaticRouter } from "react-router-dom"');
    expect(read("src/entry-server.tsx")).not.toContain("react-router-dom/server");
  });

  it("classifies the Tailwind configuration plugin as build-only", () => {
    expect(manifest.dependencies["tailwindcss-animate"]).toBeUndefined();
    expect(manifest.devDependencies["tailwindcss-animate"]).toBe("1.0.7");
    expect(lock.packages["node_modules/tailwindcss-animate"].dev).toBe(true);
    expect(lock.packages["node_modules/tailwindcss"].dev).toBe(true);
    expect(read("tailwind.config.ts")).toContain("tailwindcss-animate");
  });

  it("removes the vulnerable test-worker dependency and pins patched tooling", () => {
    expect(manifest.devDependencies.vitest).toBe("4.1.12");
    expect(manifest.devDependencies.vite).toBe("7.3.7");
    expect(Object.keys(lock.packages).some((path) => path.endsWith("/tinypool"))).toBe(false);
    expect(manifest.dependencies.zod).toBe("4.6.7");
    expect(manifest.overrides).toEqual({ "postcss-selector-parser@<6.1.5": "6.1.5" });
    const parsers = Object.entries(lock.packages).filter(([path]) => path.endsWith("/postcss-selector-parser"));
    expect(parsers.length).toBeGreaterThan(0);
    for (const [, item] of parsers) {
      const version = (item as { version: string }).version.split(".").map(Number);
      expect(version[0] === 6 ? version[1] > 1 || (version[1] === 1 && version[2] >= 5) : version[0] > 7 || (version[0] === 7 && (version[1] > 1 || (version[1] === 1 && version[2] >= 6)))).toBe(true);
    }
  });

  it("preserves the earlier browser target and production audit gate", () => {
    expect(read("vite.config.ts")).toContain('["es2020", "edge88", "firefox78", "chrome87", "safari14"]');
    expect(read("vite.config.ts")).toContain("sourcemap: false");
    expect(read(".github/workflows/quality.yml")).toContain("npm audit --omit=dev");
  });
});
