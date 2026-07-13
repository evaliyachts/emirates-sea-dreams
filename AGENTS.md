# English Yacht Rental DXB Repository Rules

## Project authority

- Repository: `evaliyachts/emirates-sea-dreams`.
- Production authority: `https://yachtrentaldxb.com/`.
- Default Netlify hostname: `https://yachtrentaldxb.netlify.app/`.
- Arabic counterpart: `https://yacht-dxb.com/`; it is a separate site and is not an automatic source of English facts, copy, routes, or policy.
- The service is private yacht rental and private yacht-event planning. Do not describe it as a public, ticketed, or shared cruise service.

## Evidence and ownership

- Repository values are evidence of current implementation, not business approval.
- Never invent or infer business identity, phone, WhatsApp, email, address, departure location, hours, response time, social profiles, prices, availability, inclusions, routes, amenities, ratings, reviews, legal promises, yacht facts, or service facts.
- Use the typed fact-approval contract. Only values with `status: "approved"` and a defined value may feed new visible content, metadata, schema, links, or operations.
- Aggregate Search Console data is not Query × Page evidence and cannot approve URL ownership, consolidation, or redirects.
- The intended inventory is 52 URLs, not the 55 URLs in the aggregate Search Console report. The arithmetic connecting report groups to the sitemap is an inference, not a confirmed submitted-URL mapping.
- Preserve current commercial URLs by default until Query × Page, indexation, and links evidence is reviewed.
- Approved redirects: 0. Approved commercial consolidations: 0.

## SEO boundaries

- Canonical ownership must be approved before static route restoration.
- Do not add live `hreflang` or `x-default` until reciprocal English/Arabic release approval.
- Do not emit `LocalBusiness` without an approved public physical address that is visibly published.
- Do not emit `Event` schema for private yacht services.
- Do not emit fabricated `Product`, `Review`, `AggregateRating`, rating, or review data.
- Do not add meta-keywords to future output.
- Do not add runtime Evali or Supabase dependencies, visible Evali branding, Evali URLs, or Evali-owned operational facts.
- Write original English copy. Do not translate Arabic body or legal copy automatically.

## Yacht and media rules

- Yacht and service facts require record-level evidence and approval; current source arrays are not verification.
- Do not copy, rehost, transform, or publish third-party media without a recorded rights scope for the English domain and intended surface.
- An Arabic-site media approval does not automatically authorize English detail pages, cards, home sections, event selections, or social previews.
- Failed or unauthorized media must be removed or replaced only by an approved neutral fallback.

## Sequential implementation workflow

Work through the approved nine-PR roadmap in order. Each PR must remain within its phase and be reviewed before the next begins:

1. Governance, verified facts, runtime, dependencies, CI, and test foundation.
2. Typed route manifest, URL ownership, sitemap migration map, and evidence-gated redirect plan.
3. Static rendering, canonical-owner HTTP behavior, and real unknown-route 404s.
4. Verified yacht contract, catalogue, and media rights.
5. Homepage and approved commercial decision pages.
6. Private event authority cluster.
7. Entity schema and reciprocal-language implementation report.
8. Conversion, accessibility, media, and performance.
9. Final production QA, cutover, and Search Console handoff.

After PR 1, every PR must pass:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run seo:check
```

Use Node `24.18.0` and npm `11.16.0`. Node 22 is permitted only as a documented fallback after a reproducible Node 24 dependency incompatibility; never default to Node 20.

## Search Console and deployment prohibitions

- Do not modify Search Console, submit sitemaps, request indexing, or perform URL removals without explicit authorization.
- Do not activate analytics, cross-site links, live language alternates, production redirects, or the default-Netlify-host redirect outside their approved phase.
- Do not deploy to production from an implementation PR unless the user explicitly authorizes production release.
- A Deploy Preview is evidence, not production approval.

## Production acceptance

- Approved canonical owners must eventually return route-specific initial HTML and direct `200` responses; unknown routes must remain real `404` responses.
- Redirects must be explicitly approved, one hop, and terminate at a canonical `200` page.
- Sitemap membership must match approved indexable route ownership.
- Production output must contain only approved facts and media, no preview authority, no accidental `noindex`, no prohibited schema, no live one-sided language alternates, and no production source maps.
