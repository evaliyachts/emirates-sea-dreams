# English Implementation PR 9 Report

Prepared: 2026-07-14

Branch: `agent/english-pr9-final-qa`

Pull request: [#19](https://github.com/evaliyachts/emirates-sea-dreams/pull/19)

Final implementation commit before the release-report commit: `4a8cb780cd462cd1008fc912a51c00032ab72ecb`

Status: **Deploy Preview validated; production evidence pending merge**

## Release boundary

- Manifest: 52 records.
- Published/indexable static routes: 38.
- Sitemap URLs: 38.
- Published yacht details: 19; blocked yacht routes: 5.
- Published service details: 10; blocked service routes: 8.
- `/offers`: blocked real 404.
- Historical commercial candidates: 6, all inactive and real 404.
- Route redirects and commercial consolidations: 0.
- Analytics: disabled.
- Live `hreflang` and `x-default`: absent.
- Search Console actions by Codex: 0.

The approved 12-section homepage sequence, 19 yacht facts/offers, 10 service pages, legal wording, responsible identity and contact facts remain unchanged.

## Implementation

- Removed the server-rendered hidden/translated state from the shared page main so route-specific content paints before hydration.
- Removed unused global Query/tooltip/toast providers from the runtime tree and moved strict yacht/service data parsing into build-time validation, reducing production JavaScript without weakening unknown-field checks.
- Preserved `StaggerImageCarousel`, its staggered layout and fullscreen dialog. Only the active card plus two neighbours on each side render; only the initial centre image is eager/high priority and preloaded.
- Kept the homepage hero eager but not high-priority or preloaded after all measured mobile traces identified text—not the decorative cover—as LCP.
- Made Google font CSS non-render-blocking and selected `font-display: optional` to avoid a late font-swap layout shift under constrained conditions; the no-JavaScript stylesheet fallback remains.
- Made service-detail category media below the hero lazy and unprioritized.
- Removed the CSS `@import` discovery warning and retained explicit media dimensions.
- Added a complete published/blocked/internal-link crawler and build-time production-data validation.
- Added one exact-host Netlify 301 rule from `yachtrentaldxb.netlify.app` to `yachtrentaldxb.com`; it is ordered before the static 200 rules and does not match deploy previews or branch deploys.

## Redirect decision

The exact default production hostname was directly verified as `https://yachtrentaldxb.netlify.app/` and returned 200 before this change. PR 9 adds exactly one host-specific permanent redirect, preserving `:splat` and Netlify-supported query strings. The canonical host has no matching rule, Deploy Preview #19 remains directly accessible, and `/offers` remains a real 404 on the canonical host. Production one-hop/path/query checks remain gated on the merged deploy.

## Route, sitemap, schema and media validation

The preview crawler passed all 38 canonical routes and 23 real-404 probes: five blocked yachts, eight blocked services, `/offers`, six commercial candidates and three malformed/unknown examples. It also validates unique metadata/H1, self-canonicals, indexable robots, route-specific initial text, JSON-LD parsing, internal links, production authority, the sitemap and robots file.

Schema remains limited to visible, supported `WebSite`, `Organization`, `Service`, `Offer` and `BreadcrumbList` data. `ContactPoint` remains unavailable until a schema-specific approval; prohibited schema types remain absent. Yacht Offer prices match visible AED prices; service pages emit no exact price. The approved identity `Mohammed Abdullah, Operation Manager` and approved phone remain consistent on support/legal surfaces.

`media:verify` passes all 126 production yacht URLs, 15 approved local homepage images, seven matching local service images and the neutral fallback. The three approved text-only service pages remain text-only.

## Performance evidence

Method: Lighthouse 12.8.2 simulated mobile, three valid sequential traces per route on the immutable production-context Deploy Preview, with the median-by-LCP trace retained. Lighthouse is lab evidence; TBT is not INP and no field Core Web Vitals claim is made. Preview feedback tooling adds approximately 1.32 MB of media and its own script to many traces; the application-only transfer column excludes `app.netlify.com` media and `/.netlify/scripts/cdp` while retaining the actual page, fonts and approved media.

Page class | PR 8B LCP | PR 9 score | PR 9 LCP | CLS | TBT | App transfer
--- | ---: | ---: | ---: | ---: | ---: | ---:
Homepage | 8.51 s | 69 | 5.24 s | 0 | 55 ms | 854 kB
Yacht catalogue | 7.80 s | 64 | 7.26 s | 0 | 16 ms | 532 kB
Royal Majesty detail | 10.73 s | 62 | 9.10 s | 0 | 14 ms | 1,173 kB
Services hub | 7.41 s | 68 | 5.19 s | 0 | 0 ms | 355 kB
Birthday service | 7.85 s | 70 | 5.01 s | 0 | 0 ms | 454 kB
Occasions hub | 6.45 s | 66 | 6.74 s | 0 | 0 ms | 357 kB
About | not recorded | 64 | 7.03 s | 0 | 0 ms | 354 kB
Contact | not recorded | 65 | 6.66 s | 0 | 0 ms | 354 kB
Terms | not recorded | 64 | 6.98 s | 0 | 0 ms | 355 kB
Privacy | not recorded | 64 | 7.25 s | 0 | 0 ms | 355 kB

The homepage improves 38%, services 30%, birthday service 36%, yacht detail 15% and catalogue 7% against the comparable PR 8B medians. Occasions is 0.29 seconds slower (4.5%), within the observed lab variability but recorded as a regression rather than hidden. Support/legal routes had no three-run PR 8B median, so no false comparison is made.

### LCP and waterfall record

All median mobile LCP elements except the yacht detail are visible initial-HTML text. Those text rows have no image URL, image dimensions/format, lazy/eager state, fetch priority or image preload. Their LCP is dominated by simulated TTFB and render delay, not a hidden client shell.

Page | Actual LCP element | Legacy TTFB / render delay | Insight TTFB / render delay | Main-thread work before LCP | CSS/font blocking | Long tasks
--- | --- | --- | --- | ---: | --- | ---
Homepage | Hero introduction paragraph | 833 / 4,410 ms | 365 / 585 ms | 118 ms | app CSS 270 ms / font 0 | 1; max 105 ms
Yacht catalogue | Catalogue introduction paragraph | 662 / 6,596 ms | 379 / 1,149 ms | 98 ms | app CSS 273 ms / font 0 | 3; max 70 ms
Royal Majesty detail | Centre gallery image 5 | 786 / 7,332 ms | 392 / 2,028 ms | 138 ms | app CSS 275 ms / font 0 | 4; max 93 ms
Services hub | Direct-answer paragraph | 969 / 4,221 ms | 896 / 636 ms | 87 ms | app CSS 278 ms / font 0 | 2; max 57 ms
Birthday service | Introduction paragraph | 842 / 4,166 ms | 783 / 718 ms | 161 ms | app CSS 274 ms / font 0 | 5; max 105 ms
Occasions | Introduction paragraph | 738 / 6,004 ms | 430 / 1,152 ms | 96 ms | app CSS 281 ms / font 0 | 4; max 72 ms
About | Introductory identity paragraph | 793 / 6,237 ms | 424 / 1,113 ms | 67 ms | app CSS 277 ms / font 0 | 0
Contact | H1 | 797 / 5,859 ms | 403 / 1,116 ms | 106 ms | app CSS 538 ms / font 0 | 4; max 74 ms
Terms | Opening identity paragraph | 786 / 6,196 ms | 381 / 1,117 ms | 86 ms | app CSS 273 ms / font 0 | 3; max 79 ms
Privacy | Opening identity paragraph | 605 / 6,645 ms | 420 / 2,151 ms | 91 ms | app CSS 568 ms / font 0 | 2; max 64 ms

Lighthouse exposes both its legacy element phases and newer insight phases; both are retained because they use different trace models and should not be blended. Audited JavaScript scripting totals range from 135–379 ms on the retained traces, while main-thread task time completed before LCP is reported in the table.

The yacht LCP is `50_feet_royal_majesty5.webp`: HTTPS WebP, intrinsic 2496×1664, rendered 296×191 in the simulated viewport, 290,781 transferred bytes. It starts at about 407 ms, finishes at about 489 ms (84 ms insight load duration), returns 200 over h2, is parser-discoverable in initial HTML, preloaded, `loading="eager"`, `fetchpriority="high"`, and has explicit dimensions. The 14 ms insight load delay confirms discovery is no longer the principal gap; the oversized remote source and post-load render delay remain limitations. The other four rendered carousel cards remain lazy and no off-centre slide is preloaded.

Production bundle comparison:

Metric | PR 8B production | PR 9 local production build | Change
--- | ---: | ---: | ---:
JavaScript raw | 765,558 bytes | 593,274 bytes | −172,284 bytes (−22.5%)
JavaScript gzip | 216.51 kB | 168.72 kB | −47.79 kB (−22.1%)
CSS raw | 76,684 bytes | 76,500 bytes | −184 bytes
CSS gzip | 12.90 kB | 12.81 kB | −0.09 kB

Production source maps remain absent. The application still has one JavaScript chunk above 500 kB; a route-level split was not forced because preserving static initial HTML and exact hydration parity took priority. All simulated LCP medians remain above the 2.5-second reference, so PR 9 closes known discovery/render-shell defects but does not claim Core Web Vitals success.

## Accessibility and browser validation

- 101 tests pass, including axe-core 4.10.3 scans with zero critical or serious findings across homepage, contact, services hub, birthday service, yacht catalogue, Royal Majesty detail and the real 404 document.
- Browser checks at 320×800, 390×844 and 1440×900 show no horizontal overflow and visible route-specific content at first paint.
- Ten representative page classes show correct title, H1, canonical, JSON-LD, visible main content and zero console/hydration warnings.
- Mobile menu locks background scroll, isolates covered content, traps focus, closes on Escape and restores focus to its trigger.
- The preserved carousel announces position, changes on previous/next, opens its fullscreen dialog, remains keyboard-operable and respects reduced-motion safeguards.
- Existing labels, validation/fallback messaging, skip link, focus styles and target-size tests remain green.

## English–Arabic mapping result

All 38 published English routes are reviewed: 31 true equivalents and seven related non-equivalents. The five PR 8B support/legal mappings were revalidated as About/FAQ/Contact true equivalents and Terms/Privacy related non-equivalents. No alternate tag is live; reciprocal implementation still requires a coordinated release and conflict resolution.

## Quality and deployment result

Check | Result
--- | ---
Node/npm pins | `v24.18.0` / `11.16.0`
`npm ci` | Pass
`npm run lint` | Pass, zero warnings
`npm run typecheck` | Pass
`npm test` | Pass, 101/101
`npm run build` | Pass
`npm run seo:check` | Pass
`npm run media:verify` | Pass
`npm audit --omit=dev` | Pass, zero production vulnerabilities
`git diff --check` | Pass
Netlify production-context build | Pass offline with the tracked configuration
Deploy Preview | [#19](https://deploy-preview-19--yachtrentaldxb.netlify.app), pass
GitHub Quality | Pass on current pushed implementation head

The Netlify CLI production-context build required `--offline` because no local Netlify access token is available; this is not a deploy bypass, and the linked GitHub Deploy Preview independently passed Netlify’s build/configuration checks.

## Search Console and production handoff

The exact owner workflow and evidence ledger are in `ENGLISH_SEARCH_CONSOLE_LAUNCH.md`. Authenticated Live URL Tests, sitemap submission, representative indexing requests and exports remain manual owner actions. Codex has not performed or claimed any Search Console action.

Production deploy ID, deployed assets, final canonical/default-host smoke test and final project handoff status remain pending squash merge and Netlify production deployment.
