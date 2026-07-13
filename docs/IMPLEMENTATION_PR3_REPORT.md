# Implementation PR 3 Report

Date: 2026-07-13 (Asia/Dubai)

## Release identity

- Branch: `agent/english-pr3-static-rendering`
- Pull request: [#4](https://github.com/evaliyachts/emirates-sea-dreams/pull/4)
- Validated implementation commit: `739595b177e2b9b8948f031c10c8c3301d402720`
- Final branch commit: `98e5e0f94d1b8b4ddb038b3ffd126b53177bb12c`
- Squash merge commit: `e837a9181875665025cebe8ee731100ed2983042`
- Production deploy ID: `6a553fa179001200085c44c8`
- Production publish time: `2026-07-13T19:42:44.787Z`
- Production bundle: `/assets/index-B3VIeNjk.js`
- Scope: static rendering, canonical-owner HTTP behavior, sitemap truth, and real 404 handling only

## Rendering architecture

The browser and static builds now share `AppProviders` and `AppRoutes`. The browser uses `BrowserRouter` and one stable browser `QueryClient`; the static entry uses `StaticRouter`, a fresh `QueryClient`, and an isolated Helmet context for every rendered route. Vite produces the client bundle and a temporary SSR bundle, the static build assembles route-specific HTML, then removes the SSR bundle. There is no runtime server.

`index.html` is now a minimal template with `app-head` and `app-html` markers. The previous handwritten homepage fallback, root-only LocalBusiness data, duplicated root metadata, keyword list, and claims that diverged from the React homepage are not copied into generated output. The generated homepage initial HTML is the current visible React homepage; no content-enrichment phase was started.

The client hydrates only when `#root` has element children. Empty and comment-only development roots use `createRoot`. Generated 404 output carries a static-status marker so blocked direct requests hydrate the branded 404 rather than a client-only route.

## Publication set and file mapping

The 52-record manifest remains authoritative: 10 static/hub/support, 24 yacht, and 18 service/event records. Publication eligibility dynamically yields four routes; 48 remain `blocked-pending-verification`.

| Public path | Build file | Netlify behavior |
| --- | --- | --- |
| `/` | `dist/index.html` | direct static 200 |
| `/yachts` | `dist/_static/yachts.html` | exact internal 200 rewrite |
| `/services` | `dist/_static/services.html` | exact internal 200 rewrite |
| `/occasions` | `dist/_static/occasions.html` | exact internal 200 rewrite |
| unresolved path | `dist/404.html` | Netlify real 404 |

English inner-route canonicals retain their historical non-trailing-slash form. No 301/302 redirect, wildcard rewrite, commercial route, consolidation, hreflang, or x-default was added. Approved redirect count and approved commercial consolidation count remain zero.

## Metadata, schema, sitemap, and caching

Each published document has route-specific current React title, description, self-canonical, robots `index, follow`, Open Graph and Twitter metadata, one H1, and visible initial content. `meta keywords` output was removed. Every emitted JSON-LD block is parsed and prohibited schema types are rejected; schema is not invented for transitional routes. The old handwritten `LocalBusiness` node is gone.

The generated and committed sitemap contains exactly the four eligible static canonical URLs and no `lastmod`. It is derived from manifest publication eligibility, not a permanent four-route constant. `robots.txt` allows crawling and points only to `https://yachtrentaldxb.com/sitemap.xml`.

HTML, `404.html`, `robots.txt`, and `sitemap.xml` use revalidation and never immutable caching. Only fingerprinted `/assets/*` files receive one-year immutable caching. Production source maps are disabled and scanned from output.

## Known transitional state

Existing visible navigation and content can link to routes among the 48 blocked records. Those links were not newly introduced or rewritten merely to conceal the migration state. Direct requests remain authoritative and return real 404 until the relevant factual, legal, yacht, service, media, and content approvals are complete.

Representative blocked paths include `/offers`, `/about`, `/contact`, `/terms`, `/privacy`, all 24 yacht details, all 18 service details, all six commercial candidates, and arbitrary unknown paths. No placeholder, thin page, noindex 200 shell, or redirect was generated for them.

## Validation

Validated locally on Node `v24.18.0` and npm `11.16.0`: `npm ci`, lint with zero warnings, typecheck, 35 tests, build, `seo:check`, production dependency audit with zero vulnerabilities, `git diff --check`, and Netlify production-context offline build. GitHub Quality passed on the validated implementation commit.

Netlify Deploy Preview `6a553e65b6b618000857070b` at `https://deploy-preview-4--yachtrentaldxb.netlify.app` passed its deploy, header, and redirect-rule checks. Preview HTTP validation without redirect following produced:

| Path class | Result |
| --- | --- |
| `/`, `/yachts`, `/services`, `/occasions` | direct 200; no `Location`; exact production self-canonical; initial H1/content present |
| `/sitemap.xml`, `/robots.txt` | direct 200 |
| `/offers`, `/contact`, `/terms`, `/privacy` | real 404; branded `noindex, follow`; no canonical |
| representative yacht detail and service detail | real 404 |
| `/yacht-hire-dubai` commercial candidate | real 404 |
| random unknown route | real 404 |

The preview sitemap contains exactly four production canonical URLs. Netlify adds its normal preview-only `X-Robots-Tag: noindex`; generated HTML remains `index, follow`. Browser validation of all four published pages and one blocked route found no hydration warning or console error. Route-specific titles, canonicals, H1s, and robots state remained correct after hydration.

## Post-merge production smoke test

Netlify published merge `e837a9181875665025cebe8ee731100ed2983042` in production deploy `6a553fa179001200085c44c8`. GitHub Quality passed on the merge commit.

| Production request | Status | Redirect/canonical result |
| --- | ---: | --- |
| `/` | 200 | no `Location`; canonical `https://yachtrentaldxb.com/` |
| `/yachts` | 200 | no `Location`; exact no-slash self-canonical |
| `/services` | 200 | no `Location`; exact no-slash self-canonical |
| `/occasions` | 200 | no `Location`; exact no-slash self-canonical |
| `/sitemap.xml`, `/robots.txt` | 200 | sitemap has four URLs; robots names the production sitemap |
| `/offers`, `/about`, `/contact`, `/terms`, `/privacy` | 404 | no `Location`; branded canonical-free `noindex, follow` document |
| representative yacht detail and service detail | 404 | no redirect or placeholder page |
| commercial candidate and random unknown path | 404 | no redirect or SPA fallback |

Published HTML and system files return revalidation caching; fingerprinted JS/CSS return long-lived immutable caching. Requests for JS and CSS source maps return 404. Production pages contain no preview authority, Arabic authority, live hreflang, x-default, or meta keywords. Browser checks of the homepage and a blocked route found no hydration warning or console error; robots, H1, title, and canonical state remained correct after hydration.

## Dependency for PR 4

PR 4 remains responsible for strict verified yacht records, factual Offers, approved media, yacht-detail static publication, and corresponding sitemap growth. No PR 4 work began here.
