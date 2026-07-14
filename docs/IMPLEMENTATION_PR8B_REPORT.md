# English Implementation PR 8B Report

Prepared: 2026-07-14

Status: **local implementation gates passed; Draft legal-review gate active**

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

Generated bundle: `index-eZy9g0WJ.js` (760,784 raw bytes; 216.50 kB gzip) and `index-B23_gLnJ.css` (76,640 raw bytes; 12.90 kB gzip). `axe-core` rendered checks report zero critical or serious violations across seven required page classes. Final commit, Deploy Preview URL and manual preview evidence remain to be recorded. The PR remains Draft until the owner approves the exact visible Terms and Privacy wording.
