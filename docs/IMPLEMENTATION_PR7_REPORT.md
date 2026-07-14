# English Implementation PR 7 Report

Prepared: 2026-07-14

Branch: `agent/english-pr7-entity-schema-mapping`

Base merge: `6d95dcbc92180e5d6fb5a65c18e7276ed267519a`

Pull request: [#16](https://github.com/evaliyachts/emirates-sea-dreams/pull/16)

Initial implementation commit: `4d5f82063d5a520d1203ea1645c25b527396bdb7`

Deploy Preview: `https://deploy-preview-16--yachtrentaldxb.netlify.app`

Netlify Deploy Preview ID: `6a559554ebc2080008b8a24b`

Production evidence: recorded after merge and the Git-connected production deployment

## Scope and unchanged inventories

PR 7 centralizes entity IDs, schema ownership and the live English–Arabic evidence report. It does not publish another route, redirect, consolidation, language alternate, analytics integration, Search Console action, legal page, blocked yacht, blocked service or default-Netlify-host redirect.

| Inventory | Result |
| --- | ---: |
| Manifest records | 52 |
| Published/static routes | 33 |
| Sitemap URLs | 33 |
| Published hubs | 4 |
| Published yachts | 19 |
| Published services | 10 |
| Approved redirects | 0 |
| Approved commercial consolidations | 0 |

## Entity and site-name decision

The homepage now owns one JSON-LD graph containing:

- one `WebSite` with stable ID `https://yachtrentaldxb.com/#website`;
- one minimal `Organization` with stable ID `https://yachtrentaldxb.com/#organization`;
- a `publisher` reference from `WebSite` to the `Organization` ID.

Both nodes use the visible site name `Dubai Yacht` and exact production URL. The homepage title, H1, header/footer presentation and `og:site_name` use the same visible name. No alternate brand or raw-domain alternate name is emitted.

The Organization remains intentionally minimal. The repository still classifies the formal business-name approval, phone, WhatsApp, email, physical address, departure location, operating hours and social profiles as pending. Consequently no `ContactPoint`, `LocalBusiness`, `address`, `geo`, `sameAs`, opening-hours or telephone fact is emitted. `https://yachtrentaldxb.com/#contact-point` is reserved only as a future stable identifier and does not appear in production output.

## Page-level schema ownership

- `/yachts`, `/services` and `/occasions` emit `BreadcrumbList` only.
- Each of the 19 published yacht pages emits one `Service` and one `BreadcrumbList`. The visible factual hourly rate remains a nested `Offer`; it is not a `Product` and contains the same AED price and canonical URL shown on the page.
- Each of the 10 approved service pages emits one `Service` and one `BreadcrumbList` with no Offer.
- Every Service has a stable canonical-fragment ID and references the central Organization by ID.
- Every breadcrumb has a stable canonical-fragment ID, ordered visible names and exact published canonical targets.

Production validation rejects `LocalBusiness`, `Event`, `Product`, `Review`, `AggregateRating`, `FAQPage`, ratings, reviews, unapproved contact/location/entity facts and non-production schema authorities.

## English–Arabic evidence report

All 33 published English routes were matched to exact live Arabic canonical candidates on 2026-07-14. Both sides returned HTTP 200, declared `index, follow` and self-canonicalized to the exact URLs recorded in `ENGLISH_ARABIC_HREFLANG_MAP.md`.

| Mapping result | Count |
| --- | ---: |
| True equivalents | 28 |
| Related but not equivalent | 5 |
| Unmapped | 0 |

The five non-equivalent rows are the occasions hub, three yachts with cross-site hourly-price conflicts (Azimut 42, Majesty 44 and Oryx 50), and the unresolved Heysea/هايغان public identity. True-equivalent rows record that reciprocal tags would be required on both sites in one coordinated future release. No live `hreflang` or `x-default` is emitted in this PR.

## Search Console and release gates

The Search Console Query × Page and Links exports remain missing. Four Google Live URL Tests remain required for the homepage, one commercial page, one yacht page and one event page. PR 7 performs no Search Console submission, indexing request, validation action or sitemap action.

PR 8 remains responsible for conversion, accessibility, performance and any separately authorized production work. Language alternates require a distinct coordinated approval after the five mapping conflicts are resolved and reciprocal readiness is confirmed.

## Validation evidence

Local branch results on Node `v24.18.0` and npm `11.16.0`:

- clean `npm ci`: passed;
- lint: passed with zero errors or warnings;
- typecheck: passed;
- tests: 13 files and 78 tests passed;
- production build: passed, generating 33 routes plus `404.html` and no source maps;
- `seo:check`: passed with the 52/33 ownership boundary, entity graph and 33-route language report;
- `media:verify`: all 126 production yacht images, 15 local homepage images and seven service images passed;
- `npm audit --omit=dev`: zero production vulnerabilities;
- `git diff --check`: passed;
- offline Netlify production-context build: passed.

The existing Vite bundle-size, CSS import-order and server-render `useLayoutEffect` notices remain non-failing baseline output; this entity/mapping phase does not alter CSS, motion architecture or bundle composition.

Remote branch evidence:

- GitHub Quality: passed ([run 29299467095](https://github.com/evaliyachts/emirates-sea-dreams/actions/runs/29299467095));
- Netlify Deploy Preview: passed;
- Netlify header and redirect-rule checks: passed; pages-changed check correctly skipped;
- preview crawl: 33 published routes returned direct 200, all 19 blocked manifest owners and six commercial candidates returned direct 404, and a random unknown path returned a real 404;
- preview sitemap: exactly 33 production canonical URLs; robots referenced the production sitemap;
- every preview page emitted one parseable JSON-LD graph, exact production canonical, `index, follow`, and no live `hreflang` or `x-default`;
- browser hydration: homepage, Royal Majesty 50 and birthday-service pages retained their route title, H1, canonical and schema after client hydration with no console errors.

Pending remote evidence: post-merge production smoke test.

No current production behavior changes until this PR is merged and the Git-connected production deploy completes.
