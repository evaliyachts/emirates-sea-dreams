# Yacht Rental DXB — Vercel migration preparation

State: Draft; production release and DNS cutover not approved.

## Authority and scope

- Repository: `evaliyachts/emirates-sea-dreams`.
- Refreshed base main: `20d21ae8b2ce4c94eaa0d9fb45d6e10d7af7feae`.
- Branch: `agent/dxb-vercel-migration`.
- Current live Netlify deploy: `6ad1c6424c7c8076ad112432`, from the stabilized main.
- Vercel team: `evali1`; project: `emirates-sea-dreams`.
- Vercel project ID: `prj_fV926FA9seZ7Sbz8HKO2ehF2BhRn`.

Hosting configuration and validation only. No component, business fact, media,
title, description, H1, canonical, schema, link, sitemap ownership, analytics,
dependency or lockfile change is included. No HREF, redirect or consolidation
project is started. No other PR or application repository is modified by this
refresh.

## Refresh provenance

Merged stabilized main into the existing migration branch without rewriting its
history. The previously accepted dependency changes come exclusively from PR
#27, merged as `20d21ae8b2ce4c94eaa0d9fb45d6e10d7af7feae`; this migration
introduces no additional package, lockfile or application-source change relative
to that main. The existing routing adapter is preserved byte-for-byte.

The previous migration head `c9447027cf145b1c0084dce0f311f6793f08e0b6` and
its Preview predate stabilization and are superseded for exact-head approval.
The new head and its immutable Preview evidence are recorded in PR #26.
The existing Vercel production target is
`dpl_7Ka2XBakBpyaXwcR5RjGuqL7Zi1b`; it remains unchanged during Preview work.
That production build lacks this branch's routing adapter, so its `/yachts`
404 must not be mistaken for a defect in the newly tested Preview or permission
to switch nameservers before the migration release.

## Routing adapter

The existing build writes the homepage and route-specific `_static/*.html`
documents. Vercel uses the static/Other preset, unchanged `npm run build`, `dist`
output, and npm 11.16.0. No framework SPA fallback is enabled.

Exact internal rewrites mirror the current registered owners. Both slash and
non-slash forms are mapped directly because Netlify currently serves both as
200 with the same non-slash self-canonical. There is no wildcard rewrite and no
new route redirect. Tests derive the expected rewrite set from the typed
published-owner registry, not a permanently hard-coded future route count.

The existing Netlify config, default-host 301 and DNS zone remain intact for
rollback. The same existing www → non-www 301 must be prepared at Vercel's
project-domain level, not implemented as a new content redirect.

## Current baseline

- 38 generated indexable owners; 38 sitemap entries and 38 distinct URLs.
- All 38 production sitemap URLs return direct 200 and match the local build's
  title, description, H1, canonical, schema and initial body hashes.
- Sitemap SHA-256:
  `87049e1baf14cea8741c0bf98c79601050d586b4665132cf0a10bb4c1590b3a6`.
- Typed manifest: 52 records, including 14 blocked owners. These remain blocked.
- Unknown root/yacht/service probes return real 404; malformed encoding returns
  400; server bundle and map probe return 404 on current production.
- No active Netlify Image CDN, Functions, forms or environment-variable
  dependency was identified in the application source.
- Retained Netlify authority constants are historical governance/test values,
  not an instruction to alter production canonicals.

## DNS baseline and preparation

Netlify's authoritative zone has exactly three records: apex and www platform
hosting records plus one apex Google site-verification TXT. All have TTL 3600.
No MX or other custom record is present. No public DS record was observed.

Prepare the exact TXT value on Vercel and preserve Vercel-managed routing/CAA
records. Do not invent email settings. Current delegation remains
`dns1.p05.nsone.net` through `dns4.p05.nsone.net`; the proposed Vercel
nameservers must be verified from this domain's own configuration.

No nameserver, registrar, public DNS or live hosting change is authorized in
this Draft. DNS preparation is not proof of custom-domain TLS readiness.

## Validation and security boundary

Run Node 24.18.0 / npm 11.16.0 and the repository's complete install, lint,
typecheck, test, build and SEO gates. Exact-head results, Preview source/deploy,
HTTP parity, browser screenshots, sampled media and final checks belong in the
PR report. Evidence output remains outside Git. Use the existing authenticated
Preview session or narrowly scoped linked development token; never disable
deployment protection or include credentials in results.

The original pre-stabilization audit reported **12 production findings (8 high,
4 moderate)** and **28 full-tree findings (8 moderate, 18 high, 2 critical)**.
This historical assessment is superseded by the separately approved PR #27:
the stabilized main has **zero production vulnerabilities**, while **9
development-only findings (5 high, 4 moderate)** remain deferred. The complete
tree is not vulnerability-free. This refresh inherits that approved lockfile
unchanged; no override, audit suppression or additional dependency migration is
included. Rerun both the functional gates and production audit for the new head.

## Release gates

1. Validate the exact-head Git-generated Preview and keep the PR Draft.
2. Confirm the separately approved stabilization remains intact and the fresh
   production audit passes; no additional dependency remediation is authorized.
3. Obtain exact-head owner approval before Ready/merge.
4. Deploy and validate merged main on Vercel only after release approval.
5. Obtain separate cutover approval; verify custom-domain TLS, apex/www routing,
   verification TXT, all route forms, sitemap, media and browser journeys.
6. Record KEEP or rollback; retain Netlify and its DNS zone during propagation.

No Search Console action, Guides/Blog work, authority asset, cross-site editorial
link, dataset or calculator is included.
