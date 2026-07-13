# Implementation PR 4 Report

## Release identity

- Branch: `agent/english-pr4-verified-yachts`
- Pull request: [#6](https://github.com/evaliyachts/emirates-sea-dreams/pull/6)
- Initial implementation commit: `1ed4088`
- Final PR branch commit: `baeea65ef5485b26d256a3503a03c86a9464c0d9`
- Squash merge commit: `07c8a813cc7700e8a943c064f64f0ac37ea3f170`
- Phase: verified yacht contract, catalogue, media rights, and evidence-gated detail publication only
- Production authority: `https://yachtrentaldxb.com/`

## Yacht publication result

| Measure | Result |
| --- | ---: |
| Source records represented internally | 24 |
| Strict publishable records | 0 |
| Blocked records | 24 |
| Generated yacht detail pages | 0 |
| Sitemap URLs before PR 4 | 4 |
| Sitemap URLs after PR 4 | 4 |
| Approved redirects | 0 |
| Approved commercial consolidations | 0 |

The repository contained observations, not record-level business approval. Every source record is missing a verified build year, verified minimum duration, explicit English-domain media authorization, and approval of its public identity/specifications. Publishing any detail page would therefore violate `AGENTS.md` and the PR 4 publication gates. The result is a completed evidence-gated system with all 24 dispositions explicit and no placeholder 200 pages.

## Strict contract

`src/data/yachts.ts` now defines strict Zod contracts for publishable yacht records, typed image records, and blocked migration records. Publishable records require stable IDs, source numeric IDs, clean slugs, names, positive length/capacity/price/duration, a plausible build year, typed availability, approved media dimensions and rights IDs, an explicit publishable status, and no blockers. Unknown top-level or media fields are rejected. IDs, source IDs, slugs, and gallery paths must be unique.

The former permissive model and inherited values were removed from production yacht data: yacht type labels, bathrooms, crew counts, universal inclusions/add-ons, tags, formulaic descriptions, remote gallery transforms, embedded marketing claims, and unapproved booking/contact actions. Product, AggregateRating, Review, rating values and review counts are not emitted.

## Catalogue and route behavior

`/yachts` consumes only `publishableYachts`. It currently displays a factual verification-in-progress state and no yacht-detail link. Homepage featured-yacht and gallery surfaces also consume only publishable records and remain absent while the list is empty. The HTML sitemap exposes no blocked yacht link.

| Route class | Count | Target behavior |
| --- | ---: | --- |
| Existing published owners (`/`, `/yachts`, `/services`, `/occasions`) | 4 | Direct 200 |
| Publishable yacht details | 0 | No generated route |
| Blocked yacht details | 24 | Real 404, absent from sitemap, unlinked |
| Other blocked manifest records | 24 | Real 404 |
| Unknown paths | n/a | Real 404 |

The full ownership manifest remains 52 records. The sitemap is still generated from `publishedStaticRoutes`, contains exactly four URLs, and has no invented `lastmod` values. No redirect, SPA fallback, trailing-slash migration, hreflang, x-default, Search Console action, or PR 5 work was added.

## Media rights and verification

No existing remote yacht image has recorded authorization for English-domain detail pages, cards, homepage use, social previews, transformations, or rehosting. All 165 historical remote observations remain audit provenance only; none is carried into the strict production yacht records.

PR 4 adds an original neutral local SVG and rights record `english-neutral-yacht-fallback-001`, approved for `yachtrentaldxb.com` fallback use. It is decoded by `npm run media:verify`, but it is not used to manufacture a yacht detail page. Production yacht media result: **0 URLs across 0 publishable yachts**. The verifier rejects non-HTTPS remote URLs, 403/non-success responses, hostname changes, unsupported content types, empty bodies, undecodable formats, mismatched dimensions, duplicate paths, and missing/exact-mismatch rights records. Normal builds remain network-independent.

## Special-case decisions

- Historical 55-foot branded path: internally retained as the exact manifest/evidence path only. Its internal label is neutral. No page, sitemap entry, new slug, or redirect is approved.
- Dynasty: the route says 151 feet while the source observation says 150 feet. The conflict is a blocker and neither value is silently normalized into a public page.
- Heysea, Doretty, and Mzaail: spelling remains a source observation pending identity evidence.
- Generic 120-foot record: no manufacturer/model is invented; the generic identity remains blocked.

## Structured data decision

The unpublished detail template is limited to a visible-fact-aligned `Service`, nested `Offer`, and `BreadcrumbList`. The Offer uses the visible AED hourly price and exact self-canonical. No image is emitted in schema. Since no yacht qualifies, no yacht JSON-LD is generated in this release.

`/contact` is still an unpublished 404 and the repository has no approved English phone or WhatsApp fact. The detail template therefore documents the deferred booking-channel state instead of linking to `/contact` or emitting an unapproved phone/WhatsApp action.

## Validation

Local final results and immutable GitHub/Netlify references are recorded in the pull-request description. The required checks cover strict parsing, all 24 dispositions, identity conflicts, rights records, 403 handling, fallback decoding, catalogue-link boundaries, generated route/sitemap equality, allowed schema, real blocked-route behavior, redirect absence, source-map absence, and language-alternate absence.

## Remaining gates and PR 5 dependency

Before any yacht can become publishable, supply record-level approval for its public name, length, capacity, build year, hourly price/effective date, minimum duration, optional bedroom count, availability state, and English-domain media rights. The historical 55-foot owner also needs explicit URL/identity authority and Query × Page/link evidence before any replacement or redirect.

PR 5 must begin from this evidence-gated publication state. It must not interpret the empty publishable list as permission to restore the removed marketing fields or unapproved remote galleries.

## Post-merge production smoke test

Production deployment and smoke testing completed successfully on 2026-07-13:

- Netlify production deploy ID: `6a554ad511e63a00080bd5ca`
- Netlify build ID: `6a554ad511e63a00080bd5c8`
- Production context: `production`, branch `main`
- Deploy created: `2026-07-13T20:30:13.805Z`
- Deploy published: `2026-07-13T20:30:32.099Z`
- Production JavaScript bundle: `index-CG4QRr_4.js`
- GitHub main Quality run: [29282633503](https://github.com/evaliyachts/emirates-sea-dreams/actions/runs/29282633503), passed including `media:verify`

| Production check | Result |
| --- | --- |
| Published canonical routes | 4/4 direct 200, no `Location` header |
| Blocked yacht routes | 24/24 direct 404, no `Location` header |
| Additional blocked support/service/commercial/unknown probes | 9/9 direct 404 |
| Sitemap | 4 exact generated canonical URLs; no `lastmod` |
| Robots | 200; references `https://yachtrentaldxb.com/sitemap.xml` |
| Neutral fallback | 200 `image/svg+xml`; decoded 1600×900 locally |
| Production yacht media | 0 URLs across 0 publishable yachts |
| Redirects observed | 0 |
| Default Netlify host | `/` and `/yachts` remain direct 200; no default-host redirect activated |
| Yacht index metadata | Correct title, description, exact canonical, robots and H1 in initial HTML |
| Yacht detail links | 0, matching the publishable set |
| Visible inherited yacht branding | None on `/yachts` |
| Yacht Product/rating schema | None |
| Live hreflang/x-default | None |
| Fingerprinted asset caching | Long-lived immutable |
| HTML/404/robots/sitemap caching | Revalidation; not immutable |
| Production source maps | Absent; no asset source-map references |
| Browser hydration | Complete with expected visible catalogue state |
| Browser warning/error logs | 0 on `/yachts`; 0 on representative blocked yacht 404 |

The final production state remains 52 manifest records, four sitemap URLs, zero publishable yacht details, 24 blocked yacht records, zero approved redirects, and zero approved commercial consolidations. Search Console was not changed. PR 5 has not begun.
