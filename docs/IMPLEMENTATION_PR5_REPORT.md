# Implementation PR 5 Report

Date: 2026-07-14  
Branch: `agent/english-pr5-commercial-decisions`  
Pull request: [#10](https://github.com/evaliyachts/emirates-sea-dreams/pull/10)

Validated implementation commit: `487719528b07c8ec3292967d22c5a0341da9067f`
Scope: homepage and primary commercial decision pages only

## Ownership decision

PR 5 strengthens the four already published owners and creates no commercial candidate route:

| Path | Distinct task | Publication result |
| --- | --- | --- |
| `/` | Broad private yacht rental decisions and request preparation | Enriched existing 200 owner |
| `/yachts` | Compare published yachts for rent by verified facts | Enriched existing 200 owner |
| `/services` | Identify optional private-yacht service request categories | Enriched existing 200 hub |
| `/occasions` | Choose an occasion theme without creating detail routes | Enriched existing 200 hub |

All six historical candidates remain non-canonical, unrouted, non-indexable, absent from the sitemap and unapproved for creation. Query × Page and Links evidence is still missing. Rental, hire, charter, booking and luxury wording is therefore handled as secondary decision language on the homepage or catalogue rather than as synonym pages.

## Published inventory

| Measure | Before | After |
| --- | ---: | ---: |
| Route manifest records | 52 | 52 |
| Base commercial/hub pages | 4 | 4 |
| Published yacht detail pages | 19 | 19 |
| Blocked yacht owners | 5 | 5 |
| Sitemap URLs | 23 | 23 |
| Approved redirects | 0 | 0 |
| Approved commercial consolidations | 0 | 0 |

The sitemap count remains generated from the publication set. No `lastmod` is invented. Historical English inner paths remain non-trailing-slash.

## Content and fact boundaries

The four pages now have distinct titles, descriptions, H1s, introductions, direct answers, section sets and FAQ sets. Fleet ranges are derived from the 19 strict publishable records: 42–143 feet, 12–130 stated guests, AED 500–5,000 per hour and 2–4-hour minimum durations. Availability is always described as on request.

The homepage explicitly distinguishes private rental from a public, shared or ticketed cruise and explains a factual three-step request-preparation flow. `/yachts` compares only verified fields and links to all 19 published detail pages. `/services` presents five planning categories without linking the 18 blocked service routes. `/occasions` presents all seven source themes plus engagement, wedding, anniversary and family-request distinctions without creating an occasion slug.

No yacht fact, gallery, Offer, route, legal page or service-detail record changed. No type label, inclusion, route, supplier, package, availability or activity capability was inferred.

## Internal links and shared-shell cleanup

All links added inside the four changed content boundaries terminate at a published owner or at a fragment on a published owner. The visible published-page directory now lists only the four base owners and 19 published yacht details; blocked service, offer, support and legal links were removed from that directory.

The shared footer's unverified licensing, premium-positioning, service-area, departure-location and operating-hours statements were replaced by factual request-preparation guidance. Existing header/footer navigation to later-phase `/offers`, `/about`, `/faq`, `/contact`, `/terms` and `/privacy` remains a documented transitional exception allowed by the PR 5 brief. Existing global phone and WhatsApp controls were not expanded or reused in the new content; their facts remain pending business approval.

## Removed or softened claims

The published homepage no longer renders the old destination guide, route guide, fixed package cards, generic “why choose” claims, testimonials, ratings, repetitive service gallery or keyword-stuffed SEO sections. The changed output makes no claim of licensed crew, fixed pickup, service area, operating hours, included fuel/crew/drinks, guaranteed route, guaranteed availability, instant confirmation, all-inclusive package, discount, rating, review, insurance or response time.

## Structured-data decision

PR 5 does not complete the entity graph. The four hubs emit no new JSON-LD. Existing yacht details retain only their factual `Service`, nested `Offer` and `BreadcrumbList`. No `LocalBusiness`, `Product`, `Event`, `Review`, `AggregateRating` or `FAQPage` is introduced. Live `hreflang` and `x-default` remain absent.

## Doorway safeguards

- No candidate page was created from a synonym alone.
- The homepage owns broad private-rental intent.
- `/yachts` owns verified fleet and for-rent comparison intent.
- `/services` owns optional-service planning at hub level only.
- `/occasions` owns occasion choice at hub level only.
- Tests reject duplicate approved metadata/H1 ownership, non-distinct introductions/FAQ/heading sets, candidate publication, and changed-section links to unpublished routes.

## Validation

The clean gate ran under Node `v24.18.0` and npm `11.16.0`:

| Check | Result |
| --- | --- |
| `npm ci` | Passed |
| `npm run lint` | Passed; zero lint errors or warnings |
| `npm run typecheck` | Passed |
| `npm test` | 52/52 passed |
| `npm run build` | Passed; 23 indexable documents plus real `404.html` |
| `npm run seo:check` | Passed; 52 manifest records, 23 published, 29 blocked |
| `npm run media:verify` | Passed; 126/126 production yacht images and neutral fallback |
| `npm audit --omit=dev` | Passed; zero production vulnerabilities |
| `git diff --check` | Passed |
| Netlify production-context offline build | Passed |
| GitHub Quality | [Run 29288633708](https://github.com/evaliyachts/emirates-sea-dreams/actions/runs/29288633708), passed |

The build continues to report the pre-existing CSS `@import` ordering notice, stale Browserslist database notice, bundle-size advisory, and unused SSR `toast` import. None was introduced or expanded in this phase; all required commands completed successfully.

## Deploy Preview status

Netlify deploy `6a5560e35e1be30008e6ea57` was created at `2026-07-13T22:04:19.692Z` for validated commit `4877195`. The preview URL is `https://deploy-preview-10--yachtrentaldxb.netlify.app`; its deployed asset is `index-DDQTET-U.js`.

| Preview check | Result |
| --- | --- |
| Four commercial/hub routes | 4/4 direct 200, no `Location`, exact production canonical |
| Published yacht details | 19/19 direct 200 |
| Blocked yacht owners | 5/5 real 404 |
| Representative service, offer, contact, legal, candidate and unknown probes | 7/7 real 404 |
| Sitemap | 23 exact production canonical URLs; no `lastmod` |
| Metadata/schema | Unique commercial metadata/H1; no prohibited authority, language alternate, analytics or schema |
| Browser hydration | Four changed pages and one yacht detail retained correct title, H1 and canonical after load |
| Browser console | Zero warnings or errors across those five routes |
| Images after hydration | Homepage 3 primary images, catalogue 19 primary images, representative detail 8 gallery images |
| Caching/source maps | Fingerprinted asset immutable; HTML/system files revalidate; bundle source map 404 |

Netlify Header rules and Redirect rules checks passed. “Pages changed” was skipped by Netlify as a neutral informational check, not a failure.

## Post-merge production smoke

Pending merge authorization through the approved automatic PR 5 workflow.

## Remaining gates before PR 6

- Query × Page, Links and Page Indexing issue-URL evidence remains missing.
- Six commercial candidate routes remain inactive.
- Five yacht owners remain blocked.
- All 18 service/event detail routes remain blocked pending PR 6 capability and fact work.
- Support/legal pages remain blocked.
- Business identity/contact approval, reciprocal-language work, analytics and Search Console actions remain outside this phase.
