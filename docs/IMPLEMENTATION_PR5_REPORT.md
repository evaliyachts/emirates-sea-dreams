# Implementation PR 5 Report

Date: 2026-07-14  
Branch: `agent/english-pr5-commercial-decisions`  
Pull request: pending creation  
Final branch commit: pending final validation  
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

Final local, GitHub, Netlify Deploy Preview and deployed route results will be recorded here before merge. The required gate covers Node/npm pins, clean install, lint, typecheck, tests, static build, SEO validation, all 126 media URLs, production dependency audit, diff hygiene, production-context Netlify build, direct status checks, metadata/schema inspection, browser hydration and source-map absence.

## Deploy Preview status

Pending draft PR creation and Netlify deployment.

## Post-merge production smoke

Pending merge authorization through the approved automatic PR 5 workflow.

## Remaining gates before PR 6

- Query × Page, Links and Page Indexing issue-URL evidence remains missing.
- Six commercial candidate routes remain inactive.
- Five yacht owners remain blocked.
- All 18 service/event detail routes remain blocked pending PR 6 capability and fact work.
- Support/legal pages remain blocked.
- Business identity/contact approval, reciprocal-language work, analytics and Search Console actions remain outside this phase.

