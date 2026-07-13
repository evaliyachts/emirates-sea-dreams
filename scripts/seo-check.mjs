import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const productionUrl = "https://yachtrentaldxb.com/";
const previewHost = "yachtrentaldxb.netlify.app";
const html = await readFile(resolve("dist/index.html"), "utf8");
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";

const failures = [];
const requireMatch = (pattern, message) => {
  if (!pattern.test(html)) failures.push(message);
};

requireMatch(/<title>[^<]+<\/title>/i, "Homepage title is missing.");
requireMatch(/<meta\s+name=["']description["']\s+content=["'][^"']+["']/i, "Homepage description is missing.");
requireMatch(
  new RegExp(`<link\\s+rel=["']canonical["']\\s+href=["']${productionUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i"),
  "Homepage canonical is not the exact production URL.",
);

const robots = head.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i)?.[1] ?? "";
if (/noindex/i.test(robots)) failures.push("Homepage robots directive contains noindex.");

const h1Count = (body.match(/<h1\b/gi) ?? []).length;
if (h1Count !== 1) failures.push(`Homepage initial HTML must contain one H1; found ${h1Count}.`);

const visibleText = body
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--([\s\S]*?)-->/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();
if (visibleText.length < 100) failures.push("Homepage initial HTML lacks substantial visible content.");

const jsonLdBlocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
if (jsonLdBlocks.length === 0) failures.push("Homepage initial HTML has no JSON-LD.");
jsonLdBlocks.forEach((block, index) => {
  try {
    JSON.parse(block[1]);
  } catch {
    failures.push(`Homepage JSON-LD block ${index + 1} is invalid JSON.`);
  }
});

if (previewHost && head.includes(previewHost)) failures.push("Preview hostname appears in production metadata.");
if (/hreflang\s*=|x-default/i.test(html)) failures.push("Live hreflang or x-default output is present.");

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Homepage SEO baseline passed (${jsonLdBlocks.length} valid JSON-LD blocks).`);
console.log("Inner-route HTTP repair remains deferred to Implementation PR 3; 51 sitemap inner routes are not asserted as 200 here.");
