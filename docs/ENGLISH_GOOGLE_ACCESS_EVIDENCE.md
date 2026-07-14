# English Google Access Evidence

Status: **open release gate**
Audit date: 2026-07-13 (Asia/Dubai)

## Why this gate exists

An external crawler previously received HTTP `403` from the English homepage. This audit later reproduced `200` with ordinary, Googlebot-like and Inspection Tool-like user-agent strings. Changing a User-Agent is not proof of Google access, and the conflicting observations must not be dismissed.

The sampled primary yacht image returned `403` from the image CDN even while HTML, CSS and JavaScript returned `200`. Google may therefore render a degraded page or fail image discovery despite reaching the document.

## Required Search Console Live Tests

Run URL Inspection → **Test Live URL** while authenticated to the `yachtrentaldxb.com` property. PR 8A expands the release sample to six currently published representatives. Export screenshots or the reported fields for each route:

| Page class | Candidate URL | Google accessibility | Rendered screenshot/resources | Google-selected canonical | User canonical | Indexability | Evidence ID |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Homepage | `https://yachtrentaldxb.com/` | Pending | Pending | Pending | Pending | Pending | Pending |
| Yacht catalogue | `https://yachtrentaldxb.com/yachts` | Pending | Pending | Pending | Pending | Pending | Pending |
| Yacht detail | `https://yachtrentaldxb.com/yachts/50-feet-royal-majesty-dubai-yacht-rental` | Pending | Pending | Pending | Pending | Pending | Pending |
| Services hub | `https://yachtrentaldxb.com/services` | Pending | Pending | Pending | Pending | Pending | Pending |
| Service detail | `https://yachtrentaldxb.com/services/birthday-party` | Pending | Pending | Pending | Pending | Pending | Pending |
| Occasions hub | `https://yachtrentaldxb.com/occasions` | Pending | Pending | Pending | Pending | Pending | Pending |

Do not substitute source-code inspection, `curl -A Googlebot`, Rich Results Test, Lighthouse or a third-party crawler for these six Live Tests.

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

This gate passes only when all six Live Tests report accessible, renderable and indexable pages; the intended canonical matches the user-declared canonical; critical resources load; and any WAF/CDN rule is documented. A failed or inconclusive test blocks Search Console submission and broad sitemap publication.

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

## PR 7 representative Live Test candidates — 2026-07-14

PR 7 verifies ordinary live HTTP, self-canonical and indexability evidence for all 33 published English pages, but that evidence does not replace Search Console. The four owner-authorized Live URL Tests remain pending with these now-published candidates:

- homepage: `https://yachtrentaldxb.com/`;
- commercial: `https://yachtrentaldxb.com/yachts`;
- yacht detail: `https://yachtrentaldxb.com/yachts/50-feet-royal-majesty-dubai-yacht-rental`;
- event detail: `https://yachtrentaldxb.com/services/birthday-party`.

Record Google-reported accessibility, rendered resources, user canonical, Google-selected canonical and indexability. No Search Console action was taken in PR 7.

## PR 8A owner evidence ledger — 2026-07-14

No authenticated Search Console export, screenshot or Live URL Test was supplied during PR 8A. The owner still needs to provide:

- the six Live URL Test records in the required table above;
- Performance Queries export;
- Performance Pages export;
- Query × Page export;
- Links report;
- Page Indexing issue-detail examples;
- Core Web Vitals report;
- sitemap report.

For every artifact record the property, report/filter, date range, export date, evidence filename and any redaction. A pending field must not be marked received from an ordinary crawl or source-code check.

## PR 9 Search Console launch gate — 2026-07-14

Ordinary PR 9 preview and production crawls verify public HTTP access, renderable static HTML, canonical metadata and required assets, but they still do not substitute for authenticated Google evidence. The final owner runbook expands the live sample to nine URLs:

- homepage;
- yacht catalogue and Royal Majesty yacht detail;
- services hub and birthday service detail;
- occasions hub;
- contact;
- Terms;
- Privacy.

For every URL, retain Google accessibility, indexing permission, user-declared and Google-selected canonical, rendered screenshot, blocked-resource list, crawl result and evidence date. Only after those representative tests pass should the owner submit the production sitemap and request indexing for the small six-URL representative set in `ENGLISH_SEARCH_CONSOLE_LAUNCH.md`.

The Netlify exact-host redirect is not evidence that Google selected the canonical. WAF/CDN/hosting and blocked-resource review remains required if any Live Test fails. Codex performed no URL Inspection, sitemap submission, indexing request or Validate Fix action.
