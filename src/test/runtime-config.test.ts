import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(path), "utf8");

describe("runtime configuration", () => {
  it("pins Node and npm consistently", () => {
    const packageJson = JSON.parse(read("package.json"));
    const workflow = read(".github/workflows/quality.yml");
    const netlify = read("netlify.toml");

    expect(read(".nvmrc")).toBe("24.18.0\n");
    expect(packageJson.engines.node).toBe(">=24.18.0 <25");
    expect(packageJson.packageManager).toBe("npm@11.16.0");
    expect(workflow).toContain("node-version: 24.18.0");
    expect(workflow).toContain('test "$(node --version)" = "v24.18.0"');
    expect(workflow).toContain('test "$(npm --version)" = "11.16.0"');
    expect(netlify).toContain('NODE_VERSION = "24.18.0"');
    expect(netlify).toContain('NPM_VERSION = "11.16.0"');
  });

  it("uses local npm tooling and defines every shared quality command", () => {
    const packageJson = JSON.parse(read("package.json"));

    expect(packageJson.scripts.predev).toBe("tsx scripts/generate-sitemap.ts");
    expect(packageJson.scripts.prebuild).toBe("tsx scripts/generate-sitemap.ts");
    expect(packageJson.scripts.typecheck).toBe("tsc --noEmit");
    expect(packageJson.scripts.test).toBe("vitest run");
    expect(packageJson.scripts["seo:check"]).toBe("node scripts/seo-check.mjs");
    expect(JSON.stringify(packageJson.scripts)).not.toMatch(/bunx|\bbun\b/);
  });
});
