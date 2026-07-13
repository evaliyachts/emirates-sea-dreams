# English SEO Implementation Roadmap

Status: proposal only. No implementation is authorized by this document.

## Governing principles

- Production authority: `https://yachtrentaldxb.com/`.
- Preserve English URL history; do not copy the Arabic URL/count/content policy.
- Canonical ownership precedes static restoration.
- Preservation is the default until query-by-page Search Console evidence supports consolidation.
- Render only routes classified as canonical keep/enrich owners; do not blindly turn all 51 sitemap 404s into indexable pages.
- Use original English content for private yacht rental and events, not translated Arabic body copy.
- Publish only approved business, legal, yacht, service and media facts.
- Publish no live hreflang until reciprocal English/Arabic deployment is ready.
- No LocalBusiness without a verified, visible public physical address.
- No Event schema for private services; no fake Product ratings/reviews.
- Normal crawlability, useful facts, internal links, authorized media, page experience and accurate schema are the AI-search strategy. No special AI schema, hidden AI content, AI text file or `llms.txt` ranking requirement.

## Runtime recommendation and shared quality gate

Prefer Node 24 LTS. Compatibility-test the English dependency tree first, then pin the selected Node 24 version consistently in `.nvmrc`, `package.json`, GitHub Actions and Netlify; pin npm with `packageManager` and Netlify metadata. The provisional benchmark is Node `24.18.0` and npm `11.16.0`, subject to a clean compatibility run. Node 22 is permitted only as a documented fallback after a reproducible Node 24 dependency incompatibility. Do not select Node 20.

After PR 1, every PR should pass:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run seo:check
```

Add media and deployed-crawl checks when their foundations exist. Keep the Bun lockfile until npm install, clean `npm ci`, production build and Netlify production-context build pass using `package-lock.json`.

## PR 1 — Governance, business facts, exact runtime and test foundation

**Priority:** critical impact / medium effort / low implementation risk
**Objective:** establish enforceable authority before changing URLs or output.

- Scope: add `AGENTS.md`; central approved constants contract; business/legal/media approval statuses; exact Node 24/npm pins after compatibility testing; CI/Netlify runtime assertions; real lint/typecheck/test/build/SEO baseline.
- Pages affected: none intentionally; tests may render homepage, catalogue, contact and representative detail views without changing copy.
- Likely files: `AGENTS.md`, `.nvmrc`, `package.json`, lockfiles, CI workflow, `netlify.toml`, test setup, `scripts/seo-check.*`, central constants/types, governance docs.
- Dependencies: owner approval for brand/contact/operational facts; Node 24 dependency test; Netlify site identity.
- Risks: the current `npm ci` already fails from lockfile drift; `bunx` scripts fail where Bun is unavailable; existing lint errors; accidentally treating source constants as approved facts.
- Migration/redirect concerns: none; do not add redirects or alter sitemap.
- Tests: exact runtime assertions; constants validation; baseline rendering; non-interactive tests; current route helpers; no unapproved analytics/schema.
- Live validation: Netlify deploy preview builds with pinned runtime and npm lockfile; no production deploy.
- Acceptance: all six shared commands pass; versions match; facts have explicit approval status; placeholder test removed.
- Rollback: revert governance/runtime commit and lockfile as one unit; production behavior should be unchanged.
- Must not change: routes, canonicals, content, sitemap membership, live hreflang, production host behavior.
- Search Console afterward: none.

## PR 2 — Typed route manifest, URL ownership and evidence-gated migration map

**Priority:** critical impact / large effort / high decision risk
**Objective:** make one manifest the source of canonical ownership before restoring route output.

- Scope: inventory current/historic URLs; ingest GSC query-by-page, indexation and link evidence; type indexability, intent, title/description/H1 ownership, exact English canonical form, optional truthful update date, schema ownership, navigation targets and legacy redirects; define sitemap migration without publishing it yet.
- Pages affected: all 52 current sitemap candidates plus any evidenced historic commercial URLs; seven occasion records are classified but not automatically routed.
- Likely files: `src/seo/routes.*`, `src/seo/redirects.*`, validation scripts/tests, manifest-owned metadata inputs, migration evidence docs. Production sitemap remains unchanged until an approved coordinated release.
- Dependencies: PR 1; GSC exports; business/legal facts; current backlink/history evidence.
- Risks: traffic loss from premature consolidation; synonym doorway pages; assuming all sitemap URLs deserve indexation.
- Migration concerns: preserve current commercial paths by default; identify one primary intent per owner; mark unresolved routes explicitly.
- Redirect concerns: record direct one-hop candidates only; do not activate. The combined engagement/wedding service and Evali-branded yacht route need evidence.
- Tests: reject duplicate intent/title/description/H1/introduction/FAQ/section headings; malformed canonicals; duplicate routes; unsafe redirect chains; untruthful lastmod; sitemap expectation mismatch; unknown yacht fields.
- Live validation: none requiring URL changes; compare manifest proposal against GSC exports and current live responses.
- Acceptance: every current URL has an evidence-backed disposition; no unresolved route is silently redirected; current sitemap migration map is explicit; preservation gate is enforced.
- Rollback: remove manifest integration while retaining audit evidence; no live routing should have changed.
- Must not change: HTTP behavior, content, sitemap, canonical output, live hreflang.
- Search Console afterward: no action; review evidence only.

## PR 3 — Static rendering, canonical owners and real HTTP behavior

**Priority:** critical impact / large effort / medium risk
**Objective:** make approved canonical keep/enrich owners return route-specific initial HTML.

- Scope: shared client/static render tree; output `dist/index.html` and one document per approved owner; branded `404.html`; route-specific title, description, canonical, robots, H1, visible text and owned JSON-LD; Netlify Pretty URLs/redirects/headers; no SPA catch-all.
- Pages affected: only routes classified keep/enrich in PR 2. Unresolved or redirect candidates do not become indexable 200s automatically.
- Likely files: client/static entries, render/build scripts, shared route tree, HTML shell, `netlify.toml`, 404 page, manifest generator, crawl tests.
- Dependencies: PR 2 ownership approval; Netlify preview.
- Risks: hydration mismatch; accidentally serving 200 for unknown paths; metadata duplication; English slash normalization.
- Migration concerns: exact canonical path form comes from manifest; sitemap update may occur only for routes that now satisfy acceptance criteria.
- Redirect concerns: activate only redirects approved from evidence and only when destination is 200; keep specific rules before broad rules.
- Tests: every canonical owner 200; each approved redirect one 301; unknown route real 404; initial HTML SEO fields/JSON-LD; no duplicate root metadata; direct refresh; encoded paths; no preview host; no accidental noindex; 404 excluded/no homepage canonical.
- Live validation: crawl Deploy Preview; test direct refresh, JS-disabled HTML and Netlify status behavior; run four Search Console Live Tests on production only after release approval.
- Acceptance: approved owners are crawlable without client navigation; unknown paths remain real 404; sitemap membership equals approved indexable manifest membership.
- Rollback: redeploy previous production artifact; remove newly activated redirects if destinations fail.
- Must not change: page body strategy beyond minimum route ownership, yacht facts, event claims, legal promises, live hreflang.
- Search Console afterward: Live Test evidence gate; no bulk indexing yet.

## PR 4 — Verified yacht contract, catalogue and media rights

**Priority:** high impact / large effort / medium risk
**Objective:** replace the permissive 24-record source with a strict, evidence-backed catalogue.

- Scope: stable IDs; verified explicit fields; remove unsupported bathrooms/crew/types/inclusions/add-ons; correct only evidenced names/specs; media rights register; authorized galleries/fallbacks; factual Service/Offer/Breadcrumb ownership.
- Pages affected: `/yachts` and each yacht owner approved in PR 2 (current maximum 24).
- Likely files: yacht data/types/validation, catalogue/cards/details, media docs, schemas, media verifier, tests.
- Dependencies: per-record facts, price dates, media authorization, PR 3.
- Risks: record identity conflicts, price staleness, rights violations, losing historic Evali-path signals.
- Migration concerns: retain inbound history via an evidence-approved redirect if the Evali-branded route is replaced; do not expose Evali in new content/assets.
- Redirect concerns: direct old yacht path to the one factual replacement only after GSC/link review.
- Tests: strict unknown-field rejection; unique IDs/slugs; media rights; every production image succeeds; no Product/ratings/reviews/Evali/Supabase runtime calls; Offer matches visible price; cards use primary image only.
- Live validation: crawl every yacht; image and social-preview checks; compare sitemap and internal links.
- Acceptance: all published yacht facts and images have evidence; no unauthorized or blocked media; no stale schema URL/price.
- Rollback: restore prior catalogue artifact; retain redirect only if the old destination remains valid, otherwise roll it back too.
- Must not change: unrelated commercial/event/legal content; no live hreflang.
- Search Console afterward: inspect changed yacht URLs; submit sitemap only in final handoff.

## PR 5 — Homepage and primary commercial decision pages

**Priority:** high impact / large effort / high cannibalization risk
**Objective:** assign rental, for-rent, hire, charter, booking, luxury, prices and location intent to the smallest set of genuinely distinct owners.

- Scope: enrich root and approved commercial owners from PR 2; original English copy; private-yacht positioning; price/capacity/minimum-duration decisions; booking steps; verified optional-versus-included language; doorway safeguards.
- Pages affected: homepage plus only evidence-approved owners, potentially catalogue, offers/prices, booking/contact, charter, luxury and Dubai Marina pages. Candidate slugs are not automatically created.
- Likely files: manifest content records, page templates/content, internal-link configuration, schema inputs, tests.
- Dependencies: PR 2 ownership, PR 3 output, PR 4 verified yachts, approved location/operations.
- Risks: cannibalization, doorway content, invented package/route claims, ranking loss from consolidation.
- Migration/redirect concerns: consolidate only after query-by-page review; preserve internal links/signals and use direct redirects.
- Tests: unique intent/title/description/H1/introduction/FAQ/headings; substantial-content thresholds; canonical links only; verified facts; no keyword stuffing/meta keywords.
- Live validation: compare rendered pages and intent; inspect GSC after a controlled production release; no automated rank scraping.
- Acceptance: each page answers a different task and links to verified yachts/events/booking; no synonym-only pages.
- Rollback: restore previous content/manifest owner; remove a new page and redirect only as a coordinated reversal.
- Must not change: event detail taxonomy, yacht records, legal copy without approval, live hreflang.
- Search Console afterward: monitor query/page cannibalization after release; no request indexing until final QA unless explicitly approved.

## PR 6 — Private event topical-authority cluster

**Priority:** high impact / large effort / medium risk
**Objective:** make private celebrations the site’s strongest differentiator.

- Scope: event hub, 18 service/event owners, `/occasions` role and all seven occasion decisions; unique planning content; suitable verified yacht selections; optional add-on language; Service/Breadcrumb schema.
- Pages affected: `/services`, `/occasions`, approved detail routes; no automatic seven new occasion pages.
- Likely files: service/occasion typed data, event templates/content, selections, manifests, tests, redirect records if approved.
- Dependencies: verified service facts, PR 4 fleet, PR 5 link architecture, GSC evidence for overlaps.
- Risks: duplicate event pages, unsafe activity claims, invented inclusions/routes/durations.
- Migration/redirect concerns: combined engagement/wedding page remains until evidence supports a direct consolidation.
- Tests: all approved event routes; unique metadata/H1/intros/FAQs/headings; optional wording; valid yacht selections; no Event schema; no unapproved all-inclusive/fixed claims.
- Live validation: crawl event cluster; check booking flows, images, related links and direct HTML.
- Acceptance: every surviving event has distinct intent and factual decision support; hub-only occasions follow recorded dispositions.
- Rollback: revert content/data and any newly approved redirect as one unit.
- Must not change: unrelated commercial owners, yacht facts, live hreflang.
- Search Console afterward: monitor event query/page ownership.

## PR 7 — Entity schema and reciprocal language implementation report

**Priority:** high impact / medium effort / medium risk
**Objective:** make entity signals accurate and prepare, but do not yet publish, bilingual alternates.

- Scope: one WebSite entity; approved Organization and ContactPoint; page Service/Breadcrumb nodes; remove incomplete LocalBusiness; validate visible/schema parity; refresh exact English–Arabic map and reciprocal release report.
- Pages affected: all approved canonical owners.
- Likely files: schema builders, manifest schema ownership, entity constants, mapping report, tests.
- Dependencies: approved brand/contact/address status; stable routes/content; live Arabic canonicals.
- Risks: hidden/unverified facts, duplicate entities, one-sided hreflang.
- Migration/redirect concerns: none beyond stable exact canonicals.
- Tests: allowed schema types; schema URLs/canonicals; no Product/Review/AggregateRating/Event/unapproved LocalBusiness; no stale Offer; no live hreflang/x-default.
- Live validation: Rich Results/schema parsing as syntax support only; manually compare every node with visible content and exact live canonical.
- Acceptance: accurate entity graph; mapping report records exact canonical pairs and blockers; live alternates remain absent.
- Rollback: remove schema changes without altering page routes/content.
- Must not change: canonical ownership, redirects, analytics state.
- Search Console afterward: none until reciprocal release is separately approved.

## PR 8 — Conversion, accessibility, media and performance

**Priority:** medium/high impact / medium effort / low risk
**Objective:** improve usable booking flow and page experience without collecting unnecessary data.

- Scope: approved analytics only; truthful WhatsApp fallback; keyboard/focus/mobile behavior; axe scans; reduced motion; responsive authorized media; caching; bundle reduction; source-map prohibition.
- Pages affected: global layout, homepage, contact/booking, hubs, representative event/yacht pages and 404.
- Likely files: conversion utilities, contact form, menu/carousel components, CSS/media helpers, Netlify headers, tests, performance/accessibility report.
- Dependencies: analytics/consent approval; stable media and route output.
- Risks: PII leakage, blocked popups, regressions in carousel/menu, speculative preconnects.
- Migration/redirect concerns: none.
- Tests: analytics disabled/enabled allowlist; no PII/query strings; successful/blocked WhatsApp; focus management; axe on representative routes; reduced motion; overflow; image loading; cache rules; no maps.
- Live validation: mobile/desktop keyboard and screen-reader smoke tests; bundle comparison; Core Web Vitals field monitoring after release.
- Acceptance: no critical axe violations; conversion status truthful; only approved events; authorized media performs without layout shift.
- Rollback: disable analytics/config and revert UI enhancements independently; keep accessibility fixes where safe.
- Must not change: facts, canonicals, yacht/event ownership, live hreflang.
- Search Console afterward: review Core Web Vitals after sufficient data.

## PR 9 — Final production QA, cutover and Search Console handoff

**Priority:** critical impact / medium effort / medium release risk
**Objective:** prove the production release and document controlled search-engine actions.

- Scope: full production crawl; status/redirect/canonical/sitemap/media/cache/security validation; DNS/HTTPS/default-host checks; legal approval; analytics state; final evidence report; optional exact-default-host redirect after custom-domain health is confirmed.
- Pages affected: entire approved manifest and every registered legacy route.
- Likely files: final QA docs, deployment configuration only for approved cutover, crawl fixtures/tests.
- Dependencies: PRs 1–8; Search Console Live Tests; approved legal copy; Netlify/DNS access.
- Risks: redirect loop, sitemap publishing broken/unapproved URLs, premature indexing, default-host duplicate.
- Migration concerns: record deploy ID/SHA/time/bundle; compare old/new URL inventory; preserve rollback artifact.
- Redirect concerns: exact default Netlify hostname only, one 301, path/query preserved, no deploy-preview/branch-host capture; separate review if desired.
- Tests: all canonical owners 200; redirects one hop to 200; unknown 404; exact sitemap equality; robots; no preview/Evali; no accidental noindex; media; cache/maps; legal/analytics/hreflang state.
- Live validation: production crawl and four Search Console Live Tests; smoke representative user flows.
- Acceptance: all release gates pass and evidence is committed; no unresolved critical issue.
- Rollback: redeploy recorded prior artifact; revert cutover redirect; restore prior sitemap only with matching live routes.
- Must not change: no analytics or hreflang activation unless separately approved; no unsolicited Search Console actions.
- Search Console afterward: after owner approval, submit the production sitemap and request indexing only for a small set of priority canonical owners; monitor Page Indexing, queries and CWV.

## Release-stage grouping

| Stage | Tasks |
| --- | --- |
| Launch blockers | Google access evidence, facts/legal/media approval, manifest ownership, static HTTP behavior |
| Indexation blockers | Direct 404s, initial HTML, sitemap truth, canonical duplication, blocked media |
| Ranking improvements | Distinct commercial ownership, verified fleet, private-event authority, internal links |
| Conversion improvements | Booking clarity, WhatsApp fallback, approved measurement, accessibility |
| Later enhancements | Reciprocal hreflang release, contextual partnerships, field-CWV iteration |
