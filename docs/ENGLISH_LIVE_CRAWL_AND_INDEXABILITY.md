# English Live Crawl and Indexability Audit

Audit date: 2026-07-13 (Asia/Dubai)
Production: `https://yachtrentaldxb.com/`
Default Netlify host: `https://yachtrentaldxb.netlify.app/`
Repository: `evaliyachts/emirates-sea-dreams` (`main`)

## Executive finding

The site is a client-rendered Vite/React SPA with a hand-written homepage SEO fallback in `index.html`. The homepage returns `200`, but every other URL advertised in the live sitemap returns a real Netlify `404` when requested directly. Client navigation can display those routes only after the homepage JavaScript has loaded. This is the launch-critical indexation blocker.

The 52 sitemap URLs produced this result:

| Result | Count |
| --- | ---: |
| HTTP 200 | 1 |
| HTTP 301 | 0 |
| HTTP 404 | 51 |
| Soft 404 | 0 |

No recommendation in this report converts all 51 failures into indexable pages automatically. PR 2 must first classify canonical ownership; PR 3 should render only approved keep/enrich owners.

## Historical Search Console status

The following is a Google Search Console Page Indexing summary dated 2026-06-30. It is historical report evidence and is separate from the live crawl performed on 2026-07-13.

| Search Console status | Count |
| --- | ---: |
| Known URLs | 55 |
| Indexed | 1 |
| Not indexed | 54 |
| Discovered – currently not indexed | 45 |
| Not found (404) | 6 |
| Crawled – currently not indexed | 2 |
| Page with redirect | 1 |

Indexation rate: 1.8%. The report filter was **All known pages**.

### Comparison with the live crawl

| Evidence | Date | Scope | Result | What it proves |
| --- | --- | --- | --- | --- |
| Search Console Page Indexing | 2026-06-30 | 55 all-known URLs | 1 indexed, 54 not indexed | Historical Google classification; individual URLs not supplied |
| Live sitemap crawl | 2026-07-13 | 52 current sitemap URLs | 1×200, 51×404 | Current direct HTTP behavior of the submitted inventory |

The count `1 indexed + 45 discovered + 6 not found = 52` exactly matches the current sitemap count. This is a high-confidence inference that those three groups may correspond to the sitemap inventory, not a confirmed submitted-page mapping. The filter was not All submitted pages, and issue-detail URLs are absent.

The other three known URLs—two crawled but not indexed and one page with redirect—remain unidentified. Their presence does not increase the intended route inventory beyond 52 and does not justify creating three routes. Classification lag and the different observation dates also mean the six historical Google 404s must not be equated with the 51 URLs returning 404 during the later live crawl.

## Deployment architecture

- Framework: Vite 5.4.19, React 18.3.1, React Router 6.30.1.
- Rendering: client-rendered SPA; no SSR, prerender route generator, or static route output.
- Metadata: `react-helmet-async` after hydration; only the root fallback is present in initial HTML.
- Hosting: Netlify, inferred from live response headers and the working default hostname. No tracked `netlify.toml` exists.
- Build: `vite build`; `prebuild` currently invokes unavailable `bunx tsx` in this audit environment.
- Package state: both `package-lock.json` and `bun.lockb`; no pinned Node/npm/Bun version.
- Clean-install state: `npm ci` fails because `package.json` and `package-lock.json` are out of sync (missing/invalid dependency records). This must be repaired and reviewed in PR 1, not in this audit.
- Current local runtime during audit: Node `v20.20.0`, npm `10.8.2`; this is observed state, not the recommendation.
- Lint baseline: fails with 3 errors and 8 warnings.
- TypeScript baseline: `npx tsc --noEmit` passes, but there is no package script for it.
- Tests: one placeholder Vitest test passes; no real baseline coverage or SEO validation script.
- Configured build: `npm run build` fails because `bunx` is unavailable. Direct `npx vite build` succeeds with the CSS-order and large-bundle warnings recorded below.

## Host and protocol matrix

| Request | Observed result | Assessment |
| --- | --- | --- |
| `https://yachtrentaldxb.com/` | `200` | Canonical production root |
| `http://yachtrentaldxb.com/` | `301` to HTTPS apex | Correct one-hop upgrade |
| `https://www.yachtrentaldxb.com/` | `301` to HTTPS apex | Correct canonical-host redirect |
| `http://www.yachtrentaldxb.com/` | `301` to HTTPS www, then apex | Two-hop chain; consolidate later |
| `https://yachtrentaldxb.netlify.app/` | `200` | Duplicate host is accessible; redirect decision belongs to final cutover |
| Unknown production path | Real Netlify `404` | Correct status, generic unbranded document |

## Sitemap inventory

`robots.txt` and `sitemap.xml` both return `200`. Robots allows crawling and references the production sitemap. The sitemap contains 52 unique, non-trailing-slash URLs: 10 static routes, 24 yacht routes and 18 service routes. Every `<lastmod>` is reset to the build date by the generator, so it is not evidence of a significant page update.

### Static routes

| URL path | Live | Initial canonical | Classification |
| --- | ---: | --- | --- |
| `/` | 200 | `https://yachtrentaldxb.com/` | Keep/enrich candidate; only verified live canonical owner |
| `/yachts` | 404 | None | Preserve pending ownership/GSC; catalogue candidate |
| `/offers` | 404 | None | Preserve pending business-fact and GSC review |
| `/services` | 404 | None | Preserve as event/service hub candidate |
| `/occasions` | 404 | None | Preserve as occasion hub candidate |
| `/about` | 404 | None | Preserve pending business approval |
| `/faq` | 404 | None | Preserve; claims require verification |
| `/contact` | 404 | None | Preserve; operational facts require approval |
| `/terms` | 404 | None | Preserve; legal copy not approved |
| `/privacy` | 404 | None | Preserve; privacy practice not approved |

### Yacht routes

All 24 paths below return a real `404`, expose no route canonical in initial HTML, and remain provisional preservation candidates until data and Search Console review:

| Path | Status |
| --- | ---: |
| `/yachts/evali-yacht-55ft-yacht-rental-dubai` | 404 |
| `/yachts/50-feet-royal-majesty-dubai-yacht-rental` | 404 |
| `/yachts/42-feet-azimut-yacht-rental-dubai` | 404 |
| `/yachts/majesty-44-feet-dubai-yacht-rental` | 404 |
| `/yachts/50-feet-azimut-yacht-rental-dubai` | 404 |
| `/yachts/oryx-50-feet-dubai-yacht-rental` | 404 |
| `/yachts/ferretti-50-feet-yacht-rental-dubai` | 404 |
| `/yachts/56-feet-majesty-dubai-yacht-rental` | 404 |
| `/yachts/55-feet-azimut-yacht-rental-dubai` | 404 |
| `/yachts/majesty-88ft-jacuzzi-dubai-yacht-rental` | 404 |
| `/yachts/sunseeker-82-feet-yacht-rental-dubai` | 404 |
| `/yachts/azimut-80-feet-yacht-rental-dubai` | 404 |
| `/yachts/benetti-110ft-jacuzzi-yacht-rental-dubai` | 404 |
| `/yachts/majesty-101ft-jacuzzi-dubai-yacht-rental` | 404 |
| `/yachts/heysea-90ft-jacuzzi-yacht-rental-dubai` | 404 |
| `/yachts/doretty-90ft-jacuzzi-dubai-yacht-rental` | 404 |
| `/yachts/ocean-dream-143-feet-yacht-rental-dubai` | 404 |
| `/yachts/mzaail-135ft-dubai-yacht-rental` | 404 |
| `/yachts/doretty-95-feet-jacuzzi-yacht-rental-dubai` | 404 |
| `/yachts/sunseeker-92-feet-dubai-yacht-rental` | 404 |
| `/yachts/sunseeker-90-feet-yacht-rental-dubai` | 404 |
| `/yachts/dynasty-151-feet-dubai-yacht-rental` | 404 |
| `/yachts/luxury-120-feet-mega-yacht-rental-dubai` | 404 |
| `/yachts/omega-100-feet-dubai-yacht-rental` | 404 |

### Service/event routes

All 18 paths below return a real `404`, expose no route canonical in initial HTML, and remain provisional preservation candidates:

| Path | Status |
| --- | ---: |
| `/services/banana-boat-ride` | 404 |
| `/services/swimming` | 404 |
| `/services/barbecue-on-the-yacht` | 404 |
| `/services/fishing` | 404 |
| `/services/birthday-party` | 404 |
| `/services/graduation-parties` | 404 |
| `/services/wedding-anniversary-parties` | 404 |
| `/services/bachelor-parties` | 404 |
| `/services/marriage-proposal-party` | 404 |
| `/services/gender-reveal-party` | 404 |
| `/services/engagement-and-wedding-parties` | 404 |
| `/services/food-menu` | 404 |
| `/services/donut-ride` | 404 |
| `/services/jet-ski` | 404 |
| `/services/afternoon-tea-trip` | 404 |
| `/services/morning-yacht-trips` | 404 |
| `/services/engagement-parties` | 404 |
| `/services/wedding-parties` | 404 |

## Initial HTML versus rendered HTML

| Element | Root initial HTML | Inner-route direct request | Client navigation after root |
| --- | --- | --- | --- |
| Status | 200 | 404 | Browser remains on SPA and renders view |
| Route title/description | Root only | None | Inserted by Helmet |
| Route canonical | Root only | None | Added alongside retained root canonical; duplicate observed on `/yachts` |
| Route H1/body | Root fallback | Netlify 404 | Rendered by React |
| Route JSON-LD | Root WebSite/Organization/LocalBusiness | None | Root nodes persist; route ownership is inconsistent |
| Works without JS/direct refresh | Root fallback only | No | No |

The architecture is therefore **mixed only at the homepage fallback, otherwise client-rendered SPA**. A framework migration is not required by this audit; shared React static rendering is sufficient if implemented correctly.

## CDN, bot and resource evidence

- Normal browser, plain curl, Googlebot-like and `Google-InspectionTool` user agents all received `200` for the root on 2026-07-13.
- This does not prove Google can access or render the site. The earlier external `403` remains unresolved until Search Console Live Tests are recorded.
- Root JS and CSS returned `200` to the Googlebot-like request.
- The sampled primary 55-foot yacht image returned `403 application/xml` from DigitalOcean Spaces/Cloudflare. This is a real blocked-resource issue, not a user-agent-only issue.
- HTML, JS and CSS currently use `public,max-age=0,must-revalidate`; even fingerprinted assets do not receive long-lived immutable caching.
- Production source-map absence was not proven from Netlify deploy metadata; future QA must assert no `.map` output.

See `ENGLISH_GOOGLE_ACCESS_EVIDENCE.md` for the Search Console gate.

## Required acceptance evidence before URL changes

1. Obtain query-by-page, page-indexing, sitemap and links exports from Search Console.
2. Record Live Test results for four representative routes.
3. Establish a typed manifest and classify each route as keep/enrich, redirect, noindex or unresolved.
4. Preserve current commercial URLs by default until no indexation, traffic, links or historical value is proven.
5. In the static-rendering PR, require approved canonical routes to return `200` with route-specific initial HTML and unknown routes to return a real `404`.

## PR 3 publication update — 2026-07-13

Implementation PR 3 replaces the mixed handwritten fallback/client-only architecture with shared React static rendering for the four evidence-cleared owners: `/`, `/yachts`, `/services`, and `/occasions`. The temporary sitemap is reduced from 52 advertised URLs to those four generated canonical pages. The other 48 manifest records remain represented but unpublished and must return real 404 responses on direct requests.

The historical observations above remain the pre-PR-3 baseline. Deploy Preview and post-merge production status matrices are recorded in `IMPLEMENTATION_PR3_REPORT.md`; no later route is considered restored until its phase-specific verification gate passes.

## PR 4 yacht publication update — 2026-07-13

PR 4 preserves the four-route static publication set because none of the 24 yacht records passed every factual and media-rights gate. `/yachts` remains a direct static 200 and now links to no blocked detail route. All 24 historical yacht paths remain direct-request 404s, absent from static output and sitemap. The sitemap remains four URLs, and unknown paths retain the real Netlify 404 architecture.

No redirect, wildcard rewrite, noindex shell, default-host redirect, or English trailing-slash migration was introduced. Deployment and post-merge production evidence belongs in `IMPLEMENTATION_PR4_REPORT.md`.

## PR 4B yacht publication update — 2026-07-14

PR 4B clears 19 existing yacht owners for exact static output after owner fact approval and successful verification of all 126 retained media URLs. The generated sitemap expands dynamically from four to 23 URLs. Five yacht manifest owners remain real direct-request 404s; service, commercial, support, and legal owners remain unpublished. No redirect, wildcard, trailing-slash migration, hreflang, analytics, or Search Console action is introduced. Immutable deployment and production smoke evidence belongs in `IMPLEMENTATION_PR4B_REPORT.md`.

## PR 5 commercial-content update — 2026-07-14

PR 5 enriches `/`, `/yachts`, `/services` and `/occasions` without changing their direct-200 ownership or adding a route. The sitemap remains 23 exact production URLs: four hubs and 19 yacht details. The six commercial candidates remain direct 404s; all 18 service details, five blocked yacht owners, and support/legal routes remain unpublished. Changed commercial sections link only to published owners. The global header/footer link set still exposes later-phase navigation as a documented transitional exception, but the published-page directory now lists only live owners. Deploy Preview and post-merge production evidence belongs in `IMPLEMENTATION_PR5_REPORT.md`.
