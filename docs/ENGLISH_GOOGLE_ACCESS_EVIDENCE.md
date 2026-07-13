# English Google Access Evidence

Status: **open release gate**
Audit date: 2026-07-13 (Asia/Dubai)

## Why this gate exists

An external crawler previously received HTTP `403` from the English homepage. This audit later reproduced `200` with ordinary, Googlebot-like and Inspection Tool-like user-agent strings. Changing a User-Agent is not proof of Google access, and the conflicting observations must not be dismissed.

The sampled primary yacht image returned `403` from the image CDN even while HTML, CSS and JavaScript returned `200`. Google may therefore render a degraded page or fail image discovery despite reaching the document.

## Required Search Console Live Tests

Run URL Inspection → **Test Live URL** while authenticated to the `yachtrentaldxb.com` property. Export screenshots or the reported fields for each route after PR 3 has made the intended owner a direct `200`:

| Page class | Candidate URL | Google accessibility | Rendered screenshot/resources | Google-selected canonical | User canonical | Indexability | Evidence ID |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Homepage | `https://yachtrentaldxb.com/` | Pending | Pending | Pending | Pending | Pending | Pending |
| Commercial | Exact manifest owner selected in PR 2 | Pending | Pending | Pending | Pending | Pending | Pending |
| Yacht | One verified yacht canonical selected in PR 2 | Pending | Pending | Pending | Pending | Pending | Pending |
| Event | One verified event canonical selected in PR 2 | Pending | Pending | Pending | Pending | Pending | Pending |

Do not substitute source-code inspection, `curl -A Googlebot`, Rich Results Test, Lighthouse or a third-party crawler for these four Live Tests.

## Infrastructure investigation checklist

Record evidence from Netlify and any upstream DNS/CDN/WAF provider:

- Netlify production deploy ID and deploy log for the tested revision.
- DNS records, proxy state and certificate status for apex and www.
- Netlify Firewall Traffic Rules, rate limits, password protection and bot controls.
- Any Cloudflare, registrar proxy, edge function, redirect or geo rule in front of Netlify.
- Response code and body for HTML, JS, CSS, fonts and above-the-fold images.
- Whether Google-rendered HTML contains the route H1, visible text, canonical and JSON-LD.
- Blocked resource list from the Live Test screenshot/details.
- Whether default Netlify host behavior differs from production.
- Whether the source `403` varies by region, IP reputation, rate, protocol or resource host.

## Observed HTTP evidence

| Resource | Plain/browser-like | Googlebot-like | Finding |
| --- | ---: | ---: | --- |
| Production homepage | 200 | 200 | Accessible during this audit; earlier 403 unresolved |
| `robots.txt` | 200 | 200 | Accessible |
| `sitemap.xml` | 200 | 200 | Accessible, but advertises 51 broken routes |
| Production JS bundle | 200 | 200 | Accessible |
| Production CSS bundle | 200 | 200 | Accessible |
| Sample 55-foot yacht image | 403 | 403 | Blocked by media origin |
| Direct inner route | 404 | 404 | Hosting/static-output failure, not a bot-only block |

## Pass criteria

This gate passes only when all four Live Tests report accessible, renderable and indexable pages; the intended canonical matches the user-declared canonical; critical resources load; and any WAF/CDN rule is documented. A failed or inconclusive test blocks Search Console submission and broad sitemap publication.

## PR 3 Live Test readiness

PR 3 makes four static routes suitable for future Live URL Tests without performing or fabricating those tests:

- homepage: `https://yachtrentaldxb.com/`;
- commercial/catalogue representative: `https://yachtrentaldxb.com/yachts`;
- event-hub representative: `https://yachtrentaldxb.com/services`;
- occasion-hub representative: `https://yachtrentaldxb.com/occasions`.

Detailed yacht and event pages remain unpublished and cannot replace the later required representative detail-page Live Tests. Do not click Validate Fix or submit the temporary sitemap from Codex. Search Console evidence remains pending user-authorized collection.

## PR 4 yacht Live Test status

No yacht detail route passed the record-level fact and English media-rights publication gates in PR 4. The required representative yacht Live URL Test therefore remains blocked; `/yachts` is a catalogue/hub test candidate, not a substitute for a published yacht detail page.

No Search Console Live Test, sitemap submission, Validate Fix action, or result was performed or fabricated by Codex. The four-test evidence gate remains open.
