# Implementation PR 2 Report

Status: implementation complete; external review evidence is recorded in the pull request

## Scope

- Branch: `agent/english-pr2-route-manifest`
- Pull request: recorded in the pull request description after publication
- Final branch commit: use the immutable pull request head shown by GitHub; embedding a commit's own SHA in that commit would be self-referential
- Phase: typed route ownership, evidence contracts, migration planning, and validation only
- Public output: unchanged
- Implementation PR 3: not started

## Inventory and ownership result

| Inventory | Count |
| --- | ---: |
| Canonical route records | 52 |
| Static, hub, support, and legal routes | 10 |
| Yacht routes | 24 |
| Service/event routes | 18 |
| Commercial candidate URLs outside the manifest | 6 |
| Occasion dispositions without new routes | 7 |
| Redirect candidates | 2 |
| Approved redirects | 0 |
| Approved commercial consolidations | 0 |

All 52 current sitemap paths are recorded exactly once and preserve their existing English path form. The homepage is the only decision with approved status because it is the only current live `200` canonical owner. The other 51 decisions remain provisional while their current paths are preserved. The route field `approvedCanonicalOwner` means the existing path remains the owner to preserve; it does not approve unverified copy, facts, media, or immediate publication.

Decision totals:

- `enrich`: 1 homepage owner;
- `preserve-pending-evidence`: 49 current paths;
- `redirect-candidate`: 2 current paths;
- approved decision statuses: 1;
- provisional decision statuses: 51.

PR 3 rendering eligibility is intentionally narrower than route preservation:

- eligible for static architecture work: `/`, `/yachts`, `/services`, and `/occasions`;
- blocked pending factual, legal, yacht, or service verification: 48 routes;
- no blocked route is silently approved for indexable publication.

## Two evidence-gated current paths

1. `/services/engagement-and-wedding-parties` remains preserved. It overlaps the dedicated engagement and wedding routes, but no destination or redirect is approved. Query × Page, links, and intent evidence are required.
2. `/yachts/evali-yacht-55ft-yacht-rental-dubai` is retained only as an exact historical path/evidence record. No inherited brand is introduced into future intent or metadata. A neutral owner and redirect remain unapproved pending history, Query × Page, links, yacht identity, and factual approval. Visible cleanup belongs to PR 4.

## Commercial candidates

The six historical candidates remain outside the canonical manifest, router, sitemap, indexable inventory, and redirect output:

- `/dubai-yacht-booking`
- `/luxury-yacht-rental-dubai`
- `/yacht-charter-dubai`
- `/yacht-for-rent-dubai`
- `/yacht-hire-dubai`
- `/yacht-rental-in-dubai`

Creation approval and redirect ownership are false for every candidate.

## Occasion dispositions

| Source occasion | Existing owner | Decision | New page approved |
| --- | --- | --- | --- |
| Birthday Party | `/services/birthday-party` | Represented by existing service route | No |
| Proposal | `/services/marriage-proposal-party` | Represented by existing service route | No |
| Corporate Event | `/occasions` | Unsupported pending business capability | No |
| Fishing Trip | `/services/fishing` | Duplicate of existing event intent | No |
| Sunset Cruise | `/occasions` | Future page candidate pending evidence | No |
| New Year's Eve | `/occasions` | Unsupported pending business capability | No |
| Photoshoot | `/occasions` | Represented by the hub | No |

No `/occasions/:slug` route was created.

## Search Console evidence

Consumed aggregate baseline, dated 2026-06-30 with the `All known pages` filter:

- known URLs: 55;
- indexed: 1;
- discovered, currently not indexed: 45;
- not found: 6;
- crawled, currently not indexed: 2;
- page with redirect: 1.

The arithmetic `1 + 45 + 6 = 52` remains an inference only. The typed contract has no per-route issue examples, so the six 404s, two crawled-not-indexed URLs, and redirect URL cannot be guessed or assigned.

Still missing:

- Query × Page export;
- Links report;
- six Not found example URLs;
- two Crawled – currently not indexed example URLs;
- one Page with redirect example URL and chain;
- four Search Console Live Tests.

## Sitemap migration result

The proposed migration map is derived from the 52-record manifest and does not overwrite `public/sitemap.xml`:

- current membership records: 52;
- conditional inclusion after canonical `200`: 4;
- blocked pending verification: 48;
- excluded current owners: 0;
- verified `lastSignificantUpdate` values: 0;
- unverified future `<lastmod>` values omitted: 52.

Future sitemap membership is conditional on an approved canonical owner returning `200`. Build or deployment time is never used as a significant update date.

## Validation and phase boundaries

The validation layer checks route/group counts, exact sitemap equality, unique IDs/paths, explicit decisions, unique approved intent and metadata ownership, allowed schema ownership, optional evidenced dates, authority restrictions, candidate isolation, occasion isolation, zero approved redirects/consolidations, no chains/wildcards, and aggregate-only Search Console handling.

The runtime application does not import the root `seo/` ownership modules. Keeping them outside `src/` also prevents Tailwind's application-source scan from changing the production CSS bundle. The manifest does not power React Router, rendering, metadata, canonicals, JSON-LD, navigation, sitemap generation, robots, or Netlify redirects in this phase. The homepage fallback and all current 51 inner-route direct `404` responses remain unchanged.

## Quality results

Final local, GitHub Quality, Netlify production-context build, and Deploy Preview results are recorded truthfully in the pull request description after each check completes. The required output comparison covers sitemap, robots, route declarations, homepage metadata, JavaScript bundle identity, redirect output, indexable paths, and language alternates.

## Dependency for Implementation PR 3

PR 3 may integrate only routes whose ownership and verification gates permit static output. It must provide route-specific initial HTML and real unknown-route `404` behavior without silently publishing the 48 blocked routes. No PR 3 work is included here.
