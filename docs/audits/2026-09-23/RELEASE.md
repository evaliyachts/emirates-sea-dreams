# Production Release Verification

Release date: 23 September 2026 (Asia/Dubai).

## Exact Release

| Item | Recorded value |
| --- | --- |
| Approved release PR | https://github.com/evaliyachts/emirates-sea-dreams/pull/24 |
| Exact tested PR head | `7e5af5dc69920a558bc222cd448e2f3f63e898ac` |
| Final PR-head CI | Quality run `35796357641` / run 76: success |
| Immutable tested preview | https://6ab30b91d20aa600088e7fee--yachtrentaldxb.netlify.app/ |
| Production merge commit | `e57f5d517e8da12cce4e040bd0f77a22b6fb4f1a` |
| Tested head and production tree | `95117307d406d4c8077f5bfbda315ec3f7f125da` (identical) |
| Production deploy | `6ab30e7c71289d0008b69eae`, published; Netlify build completed in 17 seconds |
| Live site | https://yachtrentaldxb.com/ |
| Immutable production artifact | https://6ab30e7c71289d0008b69eae--yachtrentaldxb.netlify.app/ |

The merge used GitHub's expected-head guard. No code changed between final preview review and merge. This document and its evidence are a subsequent documentation-only update, not an untested addition to the deployed application.

## Rollback

- Previous production commit: `82acfbaae29d3d1c1f8f1c5c378702bb6e9228b4`.
- Preserved local and remote branch: `rollback/pre-seo-cleanup-2026-09-23`.
- Previous Netlify deployment: `6a60af0feab5c90008b1ca57`.
- For a release regression, restore that known-good deployment in Netlify, verify the affected routes, and coordinate a reviewed Git revert so the next main deployment does not republish the regression. No rollback was needed or performed.

## Pre-Release Review

Fresh lint, application typecheck, 114 tests in 19 files, production build and SEO checks passed at the exact PR head. Final GitHub CI used the pinned Node 24.18/npm 11.16 environment; the additional local run used Node 24.21.0. Existing server-render test warnings are not browser hydration failures; the production browser crawl found no errors.

The immutable preview's mobile homepage, Royal Majesty 50 detail and birthday guide were visually reviewed at 390 x 844. Automated booking checks also covered 320, 390, 768 and 1440px widths. Price/capacity information and WhatsApp/call actions are visible, filtering and sorting work, yacht navigation starts at the heading, and the form prepares an editable enquiry without pretending it was sent.

Commercial-copy review confirmed customer-facing guidance: compare a yacht, choose date/duration/guest count, discuss optional arrangements, then review the quote. Hourly estimates are labelled base costs, extras are not presented as included, and availability is not invented. Approved yacht facts, slugs, contact destinations and media remain unchanged. Event differentiation and owner-supplied operational facts remain follow-up content work.

## Production Acceptance

| Gate | Result |
| --- | --- |
| Legitimate routes | 38 of 38 direct HTTP 200; none lost |
| Sitemap | HTTP 200, exactly 38 unique approved URLs; same membership as baseline |
| robots.txt | HTTP 200 and unchanged |
| Canonicals | All 38 self-referencing HTTPS production canonicals in initial and hydrated HTML |
| Accidental noindex | None on the 38 canonical pages, including HTTP headers and rendered robots meta |
| Unknown routes | All three requested nonexistent examples return genuine HTTP 404 |
| Rendered output | 38 pages checked; no browser errors, broken rendered images, nested main elements or horizontal overflow |
| Contact destinations | 168 WhatsApp and 168 telephone links checked across the crawl; approved number unchanged |
| Booking journey | Four-width interaction suite passed, including filters, sorting, scroll reset, prepared message/fallback, FAQ/menu and 404 recovery |
| Real enquiries / calls | None sent or placed during testing |

The 404 pages intentionally retain noindex. Netlify previews intentionally retain their HTTP noindex protection; it is absent on production canonical pages.

Evidence: [production-gate.json](production-gate.json), [production-after.json](production-after.json), [production-browser.json](production-browser.json), [production-interactions.json](production-interactions.json), [release-preview-interactions.json](release-preview-interactions.json).

Production mobile capture at 390 x 844:

![Production homepage with pricing, fleet and contact actions](production-home-mobile.png)

## Search Console

The owner supplied the authorized domain-property tab. Its Heysea URL Inspection report showed a historical 20 June 2026 Googlebot-smartphone 404 and an already-recorded indexing request. The current production route is 200. No duplicate Heysea request was made.

Google's live homepage test at 03:30 on 23 September reported successful fetch, crawl allowed, indexing allowed and the correct homepage canonical. After the production acceptance gates passed, Google displayed the explicit `Indexing requested` confirmation for each of these four URLs:

| URL | Submission result | Prior inspection result |
| --- | --- | --- |
| https://yachtrentaldxb.com/ | Indexing requested | Already indexed; fresh live test passed |
| https://yachtrentaldxb.com/yachts | Indexing requested | Already indexed |
| https://yachtrentaldxb.com/yachts/50-feet-royal-majesty-dubai-yacht-rental | Indexing requested | Historical 1 June 2026 crawl returned 404; current production is 200 |
| https://yachtrentaldxb.com/services/birthday-party | Indexing requested | Historical 8 May 2026 crawl returned 404; current production is 200 |

The sitemap `https://yachtrentaldxb.com/sitemap.xml` was submitted once on 23 September. Google displayed `Sitemap submitted successfully`; its table reports Success and 38 discovered pages. The last-read date remained 21 September, so this confirms submission, not a completed new crawl. Two inherited entries, `sitemap_index.xml` and `post-sitemap.xml`, have historical errors and were left untouched; review their legacy status separately rather than delete records during this release.

Exact submission timestamps and outcomes: [search-console-release.json](search-console-release.json). No duplicate requests were sent for the four selected pages, no Heysea resubmission was made, and no URL removals were requested.

Use URL Inspection for a few changed URLs and the sitemap for the broader inventory. Submission does not guarantee indexing, canonical selection, ranking recovery or timing. [Google recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

## Explicitly Deferred

- Technical .html aliases: no routing changes accompanied this release. A focused follow-up must test exact Netlify rewrites, redirect precedence, direct and internal rewrite requests, loop prevention, query preservation, one-hop canonical destinations, all 38 legitimate routes and genuine unknown-route 404s before production approval.
- Current Search Console query/page/date/device/country analysis is separate from release verification. The observed historical 404 is not a confirmed algorithmic penalty diagnosis.
- Field performance, owner identity/policies/facilities, service differentiation and dependency advisories remain as documented in the audit.
- No DNS, registrar, Ads, URL-removal, canonical-ownership, hreflang or unrelated-site changes were made.
