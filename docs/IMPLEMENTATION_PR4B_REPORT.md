# Implementation PR 4B Report

Date: 2026-07-14
Branch: `agent/english-pr4b-approved-yachts`
Scope: publish owner-approved English yacht records and detail pages only
PR: [#9](https://github.com/evaliyachts/emirates-sea-dreams/pull/9)
Implementation commit: `7bd1e65`

## Release inventory

| Measure | Result |
| --- | ---: |
| Owner-approved source records | 24 |
| Exact source-to-current-manifest matches | 21 |
| Published yacht routes | 19 |
| Blocked yacht manifest routes | 5 |
| Approved source records without a manifest owner | 3 |
| Existing base routes retained | 4 |
| Sitemap URLs | 23 |
| Retained verified production images | 126 |
| Rejected production candidate images | 0 |
| Published fallback-only yachts | 0 |
| Approved redirects | 0 |
| Approved commercial consolidations | 0 |

## Generated yacht routes

1. `/yachts/50-feet-royal-majesty-dubai-yacht-rental`
2. `/yachts/42-feet-azimut-yacht-rental-dubai`
3. `/yachts/majesty-44-feet-dubai-yacht-rental`
4. `/yachts/50-feet-azimut-yacht-rental-dubai`
5. `/yachts/oryx-50-feet-dubai-yacht-rental`
6. `/yachts/ferretti-50-feet-yacht-rental-dubai`
7. `/yachts/56-feet-majesty-dubai-yacht-rental`
8. `/yachts/55-feet-azimut-yacht-rental-dubai`
9. `/yachts/majesty-88ft-jacuzzi-dubai-yacht-rental`
10. `/yachts/benetti-110ft-jacuzzi-yacht-rental-dubai`
11. `/yachts/majesty-101ft-jacuzzi-dubai-yacht-rental`
12. `/yachts/heysea-90ft-jacuzzi-yacht-rental-dubai`
13. `/yachts/doretty-90ft-jacuzzi-dubai-yacht-rental`
14. `/yachts/ocean-dream-143-feet-yacht-rental-dubai`
15. `/yachts/mzaail-135ft-dubai-yacht-rental`
16. `/yachts/doretty-95-feet-jacuzzi-yacht-rental-dubai`
17. `/yachts/sunseeker-92-feet-dubai-yacht-rental`
18. `/yachts/sunseeker-90-feet-yacht-rental-dubai`
19. `/yachts/omega-100-feet-dubai-yacht-rental`

All published routes retain the manifest's historical non-trailing-slash form. Their initial HTML contains a unique title, description, canonical, H1, factual visible content, approved social image metadata, and JSON-LD limited to `Service`, a factual nested `Offer`, and `BreadcrumbList`.

## Blocked yacht routes

- `/yachts/evali-yacht-55ft-yacht-rental-dubai`: prohibited inherited branding and no approved route decision.
- `/yachts/sunseeker-82-feet-yacht-rental-dubai`: no exact owner-approved source mapping.
- `/yachts/azimut-80-feet-yacht-rental-dubai`: no exact owner-approved source mapping.
- `/yachts/dynasty-151-feet-dubai-yacht-rental`: unresolved historical-route 151 / source-length 150 conflict.
- `/yachts/luxury-120-feet-mega-yacht-rental-dubai`: no exact approved source facts/media mapping.

These paths generate no static page, receive no exact Netlify rewrite, remain absent from the sitemap and catalogue, and continue to the real 404 document. No redirect or new neutral slug was introduced.

Approved source IDs 12 (Azimut 64), 13 (Hatteras 64), and 24 (Sunseeker 108) have no current manifest owner. PR 4B does not create routes for them.

## Fact, media, and content boundaries

The strict public records contain only the owner-approved numeric ID, existing path owner, length, guest capacity, year built, AED hourly price, minimum duration, bedrooms when present, featured/priority flags, and typed media. A source availability boolean is retained only as internal provenance; every public page states that availability is on request and must be reconfirmed during booking.

No inherited marketing description, universal inclusion, add-on, bathroom, crew count, fuel policy, fixed route, instant-confirmation promise, all-inclusive claim, rating, review, Product schema, AggregateRating, legacy `schema_json_ld`, or stale inherited Offer is published.

The 126 production media URLs are deduplicated in source order and have exact approved rights records. All passed the production verifier. The historical branded 55-foot source remains rejected provenance. The neutral fallback passed decoding but is not used on a published record.

Historical yacht-storage object paths are resolved statically to the repository's established neutral DigitalOcean CDN form. No runtime Supabase fetch/client or new media origin is introduced, and provenance-only storage URLs are not compiled into production application data.

## Validation

The complete local gate ran under Node `v24.18.0` and npm `11.16.0` from a clean `npm ci` installation:

| Check | Result |
| --- | --- |
| `npm ci` | passed |
| `npm run lint` | passed with zero errors/warnings |
| `npm run typecheck` | passed |
| `npm test` | 44/44 passed |
| `npm run build` | passed; 23 indexable documents plus real `404.html` |
| `npm run seo:check` | passed; 52-owner manifest preserved, 23 published, 29 blocked |
| `npm run media:verify` | passed; 126/126 retained images plus neutral fallback decoded |
| `npm audit --omit=dev` | passed; zero production vulnerabilities |
| `git diff --check` | passed |
| Netlify production-context build | passed offline using `netlify.toml`; no production deployment performed |
| Production source maps | absent |

The media verifier uses bounded concurrency and retries only transient transport exceptions. An HTTP failure such as 403, wrong content type, host change, undecodable body, or dimension mismatch still fails immediately; no expected-unavailable exception exists for production media.

Remote branch validation at head `a9bc402`:

| Check | Result |
| --- | --- |
| GitHub Quality | [run 29286489438](https://github.com/evaliyachts/emirates-sea-dreams/actions/runs/29286489438), passed |
| Netlify Deploy Preview | [deploy `6a55588dce6a1d0008939eca`](https://deploy-preview-9--yachtrentaldxb.netlify.app), passed |
| Netlify redirect/header checks | passed |
| Published route crawl | 23/23 direct 200; zero `Location` headers |
| Published yacht details | 19/19 direct 200 |
| Blocked yacht owners | 5/5 real 404 |
| Unknown route | real 404 |
| Preview sitemap | exactly 23 production canonical URLs |
| Preview robots | 200; names the production sitemap |
| Browser hydration | representative catalogue/detail completed with zero console warnings or errors |
| Catalogue after hydration | 19 unique published yacht links; no visible Evali branding; zero fallback images |
| Representative detail after hydration | correct title/H1/canonical/robots; eight gallery images; approved absolute social image; `Service` + `BreadcrumbList` graph with factual `Offer` |

Netlify adds its normal preview-only response `X-Robots-Tag`; generated page metadata remains `index, follow`.

## Post-merge production smoke

- Squash merge SHA: `7817c882c002378caf6efb94fde37e0994bc0b96`
- Netlify production deploy ID: `6a5559d8727df40008f3775f`
- Production deploy published: `2026-07-13T21:34:33.888Z`
- Production JavaScript bundle: `index-Bzyqg2st.js`

| Production check | Result |
| --- | --- |
| Published canonical owners | 23/23 direct 200; no redirect or `Location` header |
| Published yacht details | 19/19 direct 200 |
| Blocked yacht owners | 5/5 real 404 |
| Unknown route | real 404 |
| Sitemap | 23 exact production canonical URLs; no invented `lastmod` |
| Robots | 200; references `https://yachtrentaldxb.com/sitemap.xml` |
| Production yacht media | 126/126 verified; neutral fallback decoded; zero published fallback-only yachts |
| Canonical/robots/H1/schema | correct in initial HTML across the published crawl |
| Visible inherited yacht branding | none on generated yacht details or hydrated catalogue/detail checks |
| Redirects | zero; the default Netlify hostname remains direct 200 in this phase |
| Language alternates | no live hreflang or x-default |
| HTML/404/robots/sitemap caching | revalidation; not immutable |
| Fingerprinted asset caching | long-lived immutable |
| Production source map | absent (`404`) |
| Browser hydration | representative production detail completed with zero console warnings/errors; eight-image gallery, approved social image, factual schema and no fallback |

Local `main` and `origin/main` matched the squash merge before this evidence-only follow-up. Search Console was not changed, analytics was not enabled, and PR 5 has not begun.

## PR 5 dependency

PR 5 has not begun. Commercial pages must independently use the route manifest, owner-approved facts, current business facts, doorway-page safeguards, and only published yacht selections. Remaining route conflicts above are not silently resolved by this release.
