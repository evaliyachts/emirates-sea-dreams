# English URL Ownership and Redirect Plan

## Implementation PR 2 status

The typed ownership implementation is now recorded in the non-runtime root `seo/` modules. It preserves exactly 52 current sitemap paths, keeps the six historical commercial candidates outside the manifest, and records two redirect candidates with no destination selected. Approved redirects and approved commercial consolidations remain **zero**. No public sitemap, redirect, canonical, route, or HTTP behavior changed. Query × Page, Links, and Page Indexing issue examples remain required before any candidate advances.

This is an evidence-gated migration map, not a redirect implementation. Canonical route ownership must be completed before static restoration. No current commercial URL may be redirected, merged or removed until query-by-page Search Console data is reviewed, unless it is proven to have no indexation, traffic, links or historical value.

## Global rules

1. Preserve the English site’s exact historic path form until evidence supports change; do not normalize it to match Arabic trailing slashes.
2. PR 2 assigns one canonical owner per intent and records legacy routes. PR 3 renders only keep/enrich owners.
3. A redirect must be direct `301`, one hop, and point to a `200` canonical destination.
4. Do not redirect unknown paths to the homepage.
5. Preserve query strings where safe and avoid wildcard rules that capture preview hosts.
6. Do not publish a redirect until destination content, internal links, sitemap and canonical are ready in the same release.

## Search Console disposition gate

The 2026-06-30 Page Indexing summary does not approve any route disposition change. It supplies aggregate status counts, not URL-level query, page, link or redirect evidence.

Still required before dispositions can be reviewed:

- the six example URLs reported as Not found (404);
- the two URLs reported as Crawled – currently not indexed;
- the one URL reported as Page with redirect, including its chain and destination;
- Query × Page performance evidence;
- Links report evidence.

Approved redirects remain **zero**. The 10,553 property-level impressions are not page evidence and cannot approve a redirect or consolidation.

## Static and hub URLs

| Current URL | Response | Proposed owner/action | Destination | Evidence | Risk |
| --- | ---: | --- | --- | --- | --- |
| `/` | 200 | Keep/enrich | — | Only live canonical owner | Medium: overloaded intent |
| `/yachts` | 404 | Preserve; catalogue/for-rent candidate | — | Sitemap/source; GSC missing | High if removed |
| `/offers` | 404 | Preserve pending verified pricing role | — | Sitemap/source; fixed claims unapproved | High |
| `/services` | 404 | Preserve as event/service hub candidate | — | 18 child records | High |
| `/occasions` | 404 | Preserve pending hub-role decision | — | Seven records, no detail routes | Medium |
| `/about` | 404 | Preserve/support owner | — | Source | Low |
| `/faq` | 404 | Preserve/support owner; rewrite only after facts | — | Source | Medium |
| `/contact` | 404 | Preserve booking/contact endpoint | — | Historic booking intent | High |
| `/terms` | 404 | Preserve legal URL pending approved copy | — | Footer/source | High/legal |
| `/privacy` | 404 | Preserve legal URL pending approved copy | — | Footer/source | High/legal |

## Yacht URLs

Unless noted, all return `404`; the proposed action is **preserve as a provisional yacht canonical owner**, verify the record, and render only if it passes the strict data/media contract.

| Current path | Proposed action | Possible destination | Evidence/risk |
| --- | --- | --- | --- |
| `/yachts/evali-yacht-55ft-yacht-rental-dubai` | Rename/consolidation candidate; preserve until GSC/link evidence | Approved neutral 55-foot canonical, if created | Evali branding prohibited; redirect cannot be chosen without history |
| `/yachts/50-feet-royal-majesty-dubai-yacht-rental` | Preserve/verify | — | Record 2 |
| `/yachts/42-feet-azimut-yacht-rental-dubai` | Preserve/verify | — | Record 3 |
| `/yachts/majesty-44-feet-dubai-yacht-rental` | Preserve/verify | — | Record 4 |
| `/yachts/50-feet-azimut-yacht-rental-dubai` | Preserve/verify | — | Record 5 |
| `/yachts/oryx-50-feet-dubai-yacht-rental` | Preserve/verify | — | Record 6 |
| `/yachts/ferretti-50-feet-yacht-rental-dubai` | Preserve/verify | — | Record 7 |
| `/yachts/56-feet-majesty-dubai-yacht-rental` | Preserve/verify | — | Record 8 |
| `/yachts/55-feet-azimut-yacht-rental-dubai` | Preserve/verify | — | Record 9 |
| `/yachts/majesty-88ft-jacuzzi-dubai-yacht-rental` | Preserve/verify | — | Record 10 |
| `/yachts/sunseeker-82-feet-yacht-rental-dubai` | Preserve/verify | — | Record 11 |
| `/yachts/azimut-80-feet-yacht-rental-dubai` | Preserve/verify | — | Record 12 |
| `/yachts/benetti-110ft-jacuzzi-yacht-rental-dubai` | Preserve only if facts/media rights verified | — | Record 13; rights required |
| `/yachts/majesty-101ft-jacuzzi-dubai-yacht-rental` | Preserve/verify | — | Record 14 |
| `/yachts/heysea-90ft-jacuzzi-yacht-rental-dubai` | Preserve; manufacturer spelling requires evidence | — | Record 15 |
| `/yachts/doretty-90ft-jacuzzi-dubai-yacht-rental` | Preserve; model spelling requires evidence | — | Record 16 |
| `/yachts/ocean-dream-143-feet-yacht-rental-dubai` | Preserve/verify | — | Record 17 |
| `/yachts/mzaail-135ft-dubai-yacht-rental` | Preserve; model spelling requires evidence | — | Record 18 |
| `/yachts/doretty-95-feet-jacuzzi-yacht-rental-dubai` | Preserve; model spelling requires evidence | — | Record 19 |
| `/yachts/sunseeker-92-feet-dubai-yacht-rental` | Preserve/verify | — | Record 20 |
| `/yachts/sunseeker-90-feet-yacht-rental-dubai` | Preserve/verify | — | Record 21 |
| `/yachts/dynasty-151-feet-dubai-yacht-rental` | Preserve; 151 slug vs 150 data conflict | — | Record 22 |
| `/yachts/luxury-120-feet-mega-yacht-rental-dubai` | Preserve; generic public name requires approval | — | Record 23 |
| `/yachts/omega-100-feet-dubai-yacht-rental` | Preserve/verify | — | Record 24 |

## Service/event URLs

| Current path | Response | Proposed action | Destination | Evidence/risk |
| --- | ---: | --- | --- | --- |
| `/services/banana-boat-ride` | 404 | Preserve/verify | — | Distinct activity |
| `/services/swimming` | 404 | Preserve/verify | — | Distinct activity |
| `/services/barbecue-on-the-yacht` | 404 | Preserve/verify | — | Hospitality intent |
| `/services/fishing` | 404 | Preserve/verify | — | Distinct experience; occasion duplicate should link here |
| `/services/birthday-party` | 404 | Preserve/enrich | — | Strong event owner; occasion duplicate should link here |
| `/services/graduation-parties` | 404 | Preserve pending demand | — | Distinct occasion |
| `/services/wedding-anniversary-parties` | 404 | Preserve/enrich | — | Distinct romantic event |
| `/services/bachelor-parties` | 404 | Preserve pending demand | — | Distinct occasion |
| `/services/marriage-proposal-party` | 404 | Preserve/enrich | — | Strong event owner; occasion duplicate should link here |
| `/services/gender-reveal-party` | 404 | Preserve pending capability | — | Safety/operation facts needed |
| `/services/engagement-and-wedding-parties` | 404 | Likely consolidate, but unresolved | Engagement or wedding owner selected from GSC intent | Overlaps two dedicated paths; no redirect approved yet |
| `/services/food-menu` | 404 | Preserve or noindex utility; unresolved | Possibly hub/service section | Search demand and standalone value unknown |
| `/services/donut-ride` | 404 | Preserve/verify | — | Distinct activity |
| `/services/jet-ski` | 404 | Preserve/verify | — | Distinct activity |
| `/services/afternoon-tea-trip` | 404 | Preserve pending demand | — | Distinct hospitality concept |
| `/services/morning-yacht-trips` | 404 | Preserve pending demand | — | Time-based experience |
| `/services/engagement-parties` | 404 | Preserve/enrich | — | Specific owner |
| `/services/wedding-parties` | 404 | Preserve/enrich | — | Specific owner |

## Candidate commercial URLs not in the current sitemap

Examples such as `/dubai-yacht-booking`, `/luxury-yacht-rental-dubai`, `/yacht-charter-dubai`, `/yacht-for-rent-dubai`, `/yacht-hire-dubai` and `/yacht-rental-in-dubai` are **candidates, not current owners**. PR 2 must review historic URL and GSC evidence before selecting or creating any. Do not redirect one to another merely for a cleaner slug.

## Current consolidation count

- Approved redirects: **0**.
- Likely evidence-gated consolidation/rename candidates: **2**.
- Candidate 1: combined engagement/wedding service versus the two specific owners.
- Candidate 2: Evali-branded 55-foot yacht route versus a future approved neutral owner.
