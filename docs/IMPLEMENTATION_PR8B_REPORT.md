# English Implementation PR 8B Report

Prepared: 2026-07-14

Status: **Draft PR #18 checks and preview pass; legal-review gate active**

## Scope

- Publishes `/about`, `/faq`, `/contact`, `/terms` and `/privacy` from owner-approved facts and principles.
- Keeps `/offers` blocked with a real 404, no visible production link and no redirect.
- Moves generated publication and sitemap membership from 33 to 38 owners.
- Keeps 52 manifest records, 19 yacht pages, 10 service pages, zero redirects and zero consolidations.
- Keeps analytics, live language alternates and Search Console actions absent.

## Contact and accessibility

The contact form collects only approved planning fields and prepares the message locally. A named popup has its opener severed; a blocked popup receives a focusable live status, prepared link, copy action and approved phone link. Neither path claims that WhatsApp sent or confirmed a booking.

The existing Radix Dialog dependency owns mobile-menu focus and isolation. A skip link and visible focus styles were added. Motion respects reduced-motion preferences. `StaggerImageCarousel` remains the sole gallery and retains the staggered/fullscreen design while adding keyboard controls, a current-position announcement, dimensions, priority loading and failed-source removal.

## Release gate

Local gate: Node `v24.18.0`, npm `11.16.0`, clean `npm ci`, lint, typecheck, 95 tests, production build, `seo:check`, `media:verify`, production dependency audit, `git diff --check`, and offline Netlify production-context build all pass. Media verification covers 126 yacht images, 15 homepage images and 7 service-detail images; 3 approved service pages remain text-only. Production dependency audit reports zero vulnerabilities.

Measured application revision: `5fbd5695317b6fa5357b5a9dd722970526c5d9c9`. Draft PR: https://github.com/evaliyachts/emirates-sea-dreams/pull/18. Deploy Preview: https://deploy-preview-18--yachtrentaldxb.netlify.app (measured Netlify deploy `6a55a900e3eea90008219640`). GitHub Quality and Netlify checks pass.

Generated bundle: `index-CIiPgMvC.js` (760,897 raw bytes; 216.51 kB gzip) and `index-BjVEx15D.css` (76,652 raw bytes; 12.90 kB gzip). `axe-core` rendered checks report zero critical or serious violations across seven required page classes. Three-pass mobile Lighthouse medians and the remaining performance limitations are recorded in `docs/ENGLISH_PR8_BASELINE.md`. A direct preview crawl reports 38/38 sitemap owners at 200, `/offers` and an unknown route at real 404, no preview authority, no analytics and no live language alternates.

The PR remains Draft until the owner approves the exact visible Terms and Privacy wording. It must not be marked Ready or merged before that explicit approval.
