import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalUrlForPath, publishedStaticRoutes } from "../seo/index";

export const generateSitemapXml = () => {
  const urls = publishedStaticRoutes.map(
    (route) => `  <url>\n    <loc>${canonicalUrlForPath(route.path)}</loc>\n  </url>`,
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
};

export const writePublicSitemap = () => {
  writeFileSync(resolve("public/sitemap.xml"), generateSitemapXml());
  console.log(`sitemap.xml written (${publishedStaticRoutes.length} published routes)`);
};

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  writePublicSitemap();
}
