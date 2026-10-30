# Preview repair validation — 30 October 2026

Baseline: main 7366f4f38707f50e0425a8fbfa993d3c13ebdb47. Scope: yachtrentaldxb.com only. No production release, DNS edit, Search Console submission or Arabic-site change was made.

## Changes

- Split client page code by route while retaining eager server rendering and route-specific module preloads. The initial HTML still contains complete page content.
- Fix the static-builder Windows file URL import. Normalize path/line-ending comparisons in validation so the same SEO gates run on Windows and Linux; do not relax the gates.
- Validate enquiry dates using Dubai's calendar date; reject impossible/past dates, invalid guest counts, and requests below the selected yacht's published minimum duration or above its capacity. No messages were sent.
- Add the missing accessible fullscreen-gallery description.
- Add 177 verified, uncropped responsive WebP renditions for 93 source photos that benefit from resizing. Keep original photo URLs and fullscreen originals. Align responsive image preloads with the displayed gallery source sets, and retry originals before the neutral fallback on errors.
- Use the existing approved logo on a neutral 1200x630 sharing canvas for general pages; keep yacht-specific sharing images unchanged. Rights scope is recorded in REPAIR_MEDIA_APPROVAL_2026-10-30.md.
- Correct the privacy disclosure for the providers already used (Vercel, legacy/preview Netlify, image hosting and Google Fonts). Update only the privacy page's significant-update date.
- Patch Zod to 4.6.7, Vitest to 4.1.12 and vulnerable postcss-selector-parser 6.x instances to 6.1.5 through a narrow override. No broad forced dependency upgrade.
- Record that the existing View All Yachts inventory of 19 is authoritative. The five historical yacht routes remain unpublished 404s.

## Checks performed

- Exact runtime Node 24.18.0 / npm 11.16.0; clean npm ci passed.
- ESLint and TypeScript checks passed.
- 131 tests in 24 files passed. Windows execution used a workspace TEMP/TMP directory and --maxWorkers=1 --no-cache because the default sandbox temporary-cache path failed before test execution.
- Production build passed: 38 route-specific documents plus one 404 document.
- Static SEO gates passed: 38 published routes, 14 blocked manifest routes, no added redirects/consolidations or language alternates.
- Built-app HTTP crawl passed: 38 canonical 200 routes, 23 real 404 checks, 38 sitemap URLs. This local server implements the repository's exact static rewrite table; hosting must still be verified on a remote preview.
- Compared all 38 built pages with the saved pre-repair live audit: titles, descriptions, canonicals, robots, H1s, image URLs/alt/dimensions, links and JSON-LD unchanged. Main text unchanged except the intended privacy disclosure.
- Browser reviewed all 38 built routes after JavaScript: titles, descriptions and canonical URLs matched the baseline; yacht-specific sharing images stayed unchanged and the other 19 pages used the approved brand image; one H1 per page; no loading fallback remained; no captured warning/error logs. View All Yachts opened the 19 current yachts. Gallery opened/closed with an accessible description. Benetti 110 form limits showed 4 hours / 50 guests and the date minimum was 2026-10-30 during the review.
- Media verification passed: all 126 current yacht images, 15 approved homepage images, seven approved service images and the neutral fallback; all 177 local variants passed source-rights, dimensions, uncropped-proportion and SHA-256 integrity checks. The brand social image passed its rights/dimensions checks.
- Full npm audit: zero known vulnerabilities at the time of this run. This is not a guarantee of absence of unknown security defects.
- Home initial JS asset graph: 571,853 -> 513,799 bytes, a 10.2% reduction after including the responsive-photo selector. Estimated gzip: 169,404 -> 153,334 bytes (9.5%). These are transferred-code estimates, not measured LCP/Core Web Vitals results.

## Still pending

- The repair files are being saved on agent/dxb-complete-repairs-2026-10-30 through the existing signed-in GitHub browser session, without new credentials or access grants. This document records pre-PR local acceptance; remote preview and CI results will be recorded in the PR and the user-facing release report. Do not merge until those checks have completed.
- The owner follow-up authorization resolved the responsive-photo and existing-logo sharing decision. Shared originals, yacht identities, commercial facts and prices remain unchanged.
- www DNS correction remains pending release approval; do not change the apex/nameservers or shared resources. The current Vercel project recommendation must be rechecked before any DNS write.
- Two obsolete Search Console sitemap submissions and URL indexing requests await the production handoff; do not submit preview/404 URLs and do not duplicate accepted requests.
- Responsive visual QA on a true mobile viewport and remote-host hydration/HTTP checks remain open. The available IAB viewport override did not change the actual viewport in the earlier audit; do not represent that as a passed mobile test.
