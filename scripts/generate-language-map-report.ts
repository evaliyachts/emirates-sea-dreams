import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { generateEnglishArabicMappingReport, validateEnglishArabicRouteMappings } from "../seo/language-map";

const failures = validateEnglishArabicRouteMappings();
if (failures.length) throw new Error(failures.join("\n"));

await writeFile(
  resolve("docs/ENGLISH_ARABIC_HREFLANG_MAP.md"),
  generateEnglishArabicMappingReport(),
  "utf8",
);

console.log("Generated docs/ENGLISH_ARABIC_HREFLANG_MAP.md for all 38 published English routes; no live alternate tags were added.");
