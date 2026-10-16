# Yacht Rental DXB — Vercel migration preparation

State: Draft; production release and DNS cutover not approved.

## Authority and scope

- Repository: `evaliyachts/emirates-sea-dreams`.
- Base main: `e57f5d517e8da12cce4e040bd0f77a22b6fb4f1a`.
- Branch: `agent/dxb-vercel-migration`.
- Current live Netlify deploy: `6ab30e7c71289d0008b69eae`, from the same main.
- Vercel team: `evali1`; project: `emirates-sea-dreams`.
- Vercel project ID: `prj_fV926FA9seZ7Sbz8HKO2ehF2BhRn`.

Hosting configuration and validation only. No component, business fact, media,
title, description, H1, canonical, schema, link, sitemap ownership, analytics,
dependency or lockfile change is included. No HREF, redirect or consolidation
project is started. Existing Draft work and the previous historical-site
migration PR are unchanged.

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

Existing `npm audit --omit=dev` fails with **12 findings: 8 high and 4 moderate**.
The full dependency tree has **28 findings: 8 moderate, 18 high, 2 critical**.
These are inherited from unchanged main/lockfile, not introduced by migration.
Do not claim zero vulnerabilities or silently apply an audit override, forced
major upgrade or dependency migration. This is an unresolved production-release
gate even if the hosting Preview and functional tests pass.

## Release gates

1. Validate the exact-head Git-generated Preview and keep the PR Draft.
2. Resolve or separately obtain an explicit owner decision for the inherited
   security gate; no dependency remediation is authorized by this PR.
3. Obtain exact-head owner approval before Ready/merge.
4. Deploy and validate merged main on Vercel only after release approval.
5. Obtain separate cutover approval; verify custom-domain TLS, apex/www routing,
   verification TXT, all route forms, sitemap, media and browser journeys.
6. Record KEEP or rollback; retain Netlify and its DNS zone during propagation.

No Search Console action, Guides/Blog work, authority asset, cross-site editorial
link, dataset or calculator is included.
