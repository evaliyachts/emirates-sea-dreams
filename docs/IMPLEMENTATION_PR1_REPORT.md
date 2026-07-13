# English Implementation PR 1 Report

Status: implementation complete locally; GitHub and Netlify results are recorded below after publication.

## Scope

- Branch: `agent/english-pr1-foundation`
- Pull request: pending publication
- Phase: PR 1 — governance, verified facts, exact runtime, dependencies, CI, and test foundation only
- Next dependency: PR 2 may begin only after this PR is reviewed and merged; no PR 2 route ownership or migration work is included here.

## Runtime compatibility

- Node `v24.18.0`: compatible; exact local assertion passed.
- npm `11.16.0`: compatible; exact local assertion passed.
- `.nvmrc`, `package.json`, GitHub Actions, and Netlify use the same exact Node/npm policy.
- Node 22 remains an exception-only fallback after a reproducible Node 24 incompatibility. No fallback was needed or activated.

## Dependency and lockfile repair

- Baseline `npm ci` failure reproduced: `package-lock.json` lacked dependency records required by `package.json`, including `@testing-library/dom` and its dependency tree.
- `package-lock.json` was regenerated with Node `24.18.0` and npm `11.16.0`.
- Local `tsx` was added and both `bunx tsx` lifecycle commands were replaced with `tsx`.
- `npm install`, clean `npm ci`, the production Vite build, and an offline Netlify production-context build all passed using `package-lock.json`.
- Only after those checks passed, `bun.lockb` was removed. No Bun command remains in production scripts.
- Non-breaking `npm audit fix` updates were applied. `npm audit --omit=dev` reports zero production vulnerabilities.
- The full development audit retains one moderate `esbuild` advisory and one high Vite development-server advisory. npm offers only a forced Vite 8 major upgrade; this PR does not use `npm audit fix --force`. Neither package is in the production dependency audit.

## Governance and facts

- Root `AGENTS.md` records project/domain authority, evidence rules, URL-preservation gates, schema and media restrictions, the nine-PR sequence, quality commands, and Search Console/deployment prohibitions.
- `src/config/site-facts.ts` introduces typed approval states and helpers.
- Production and default Netlify URLs are approved technical authorities.
- Brand, contact, operational, address, social, and analytics values remain pending. Existing source values are not treated as approval and are not wired into new visible output.
- `docs/ENGLISH_BUSINESS_FACTS.md` records implementation status only; no business fact was promoted.

## Lint and tests

- Baseline reproduced: 3 lint errors and 8 warnings.
- Result: zero lint errors and zero lint warnings.
- Fixes are limited to empty-interface type aliases, ESM Tailwind plugin loading, moving an animation variant to a helper module, and narrow documented React Refresh exceptions for component-library modules that intentionally export helpers.
- Placeholder test removed.
- Added 13 baseline tests covering:
  - homepage rendering, current H1, visible content, and metadata helper behavior;
  - existing route-helper behavior;
  - approved versus pending fact handling;
  - production/preview technical constants;
  - exact package, CI, and Netlify runtime configuration;
  - the unchanged 52-URL sitemap inventory, 24 yachts, 18 services, and current client routes;
  - no analytics activation;
  - no live `hreflang` or `x-default`.

## Minimal SEO check

`npm run seo:check` validates only the existing generated homepage baseline:

- non-empty title and description;
- exact production canonical;
- robots does not contain `noindex`;
- exactly one initial H1;
- substantial visible initial content;
- at least one JSON-LD block and successful parsing of every emitted block;
- no default Netlify hostname in production metadata;
- no live `hreflang` or `x-default`.

The checker explicitly reports that inner-route HTTP repair is deferred to Implementation PR 3. It does not claim the 51 current sitemap inner routes return `200`.

## Build and Netlify

- Vite production build: passed.
- Baseline output: `dist/index.html` 18.34 kB; CSS 75.06 kB (12.58 kB gzip); JavaScript 629.90 kB (191.39 kB gzip).
- Netlify production-context build: passed with `netlify build --offline --context production`, using tracked `netlify.toml`, Node `24.18.0`, npm `11.16.0`, `npm run build`, and `dist`.
- Deploy Preview: pending Git-connected draft PR build.
- GitHub Quality: pending draft PR publication.
- Existing Vite warnings remain documented: the CSS font `@import` order and a JavaScript chunk above 500 kB. Fixing visual CSS or performance architecture is outside this foundation PR.

## SEO output and route preservation

- No application route, sitemap URL, robots rule, canonical, metadata, H1, page body, yacht/service record, schema ownership, legal copy, redirect, analytics integration, cross-site link, or language alternate was changed.
- The tracked sitemap remains the audited 52-URL file with its existing values.
- Approved redirects remain 0; approved commercial consolidations remain 0.
- The current live architecture remains one directly accessible homepage plus 51 direct inner-route 404s. Repair remains intentionally deferred until PR 2 ownership review and PR 3 static rendering.

## Validation record

| Check | Result |
| --- | --- |
| Exact Node/npm assertions | Passed |
| `npm ci` | Passed |
| `npm run lint` | Passed; zero warnings |
| `npm run typecheck` | Passed |
| `npm test` | Passed; 5 files, 13 tests |
| `npm run build` | Passed |
| `npm run seo:check` | Passed; 3 JSON-LD blocks parsed |
| `npm audit --omit=dev` | Passed; 0 vulnerabilities |
| Netlify production-context build | Passed offline |
| `git diff --check` | Passed |
| GitHub Quality | Pending publication |
| Netlify Deploy Preview | Pending publication |
