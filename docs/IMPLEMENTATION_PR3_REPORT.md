# Implementation PR 3 Report

Date: 2026-07-13 (Asia/Dubai)

## Release identity

- Branch: `agent/english-pr3-static-rendering`
- Pull request: pending creation
- Final branch commit: pending
- Squash merge commit: pending
- Production deploy ID and bundle: pending post-merge smoke test
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

Local final results, GitHub Quality, Netlify Deploy Preview, deployed status matrix, browser hydration console check, and production smoke-test results will be recorded on the final PR head. Required deployed expectations are direct 200 without `Location` for the four published routes; real 404 for representative blocked/unknown routes; four sitemap URLs; production self-canonicals; and no hydration or browser console error.

## Dependency for PR 4

PR 4 remains responsible for strict verified yacht records, factual Offers, approved media, yacht-detail static publication, and corresponding sitemap growth. No PR 4 work began here.
