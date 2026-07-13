# SEO Data Needed

## Implementation PR 2 evidence status

Route ownership now consumes only the aggregate 2026-06-30 Page Indexing summary. The manifest deliberately assigns no Search Console issue status to an individual URL. The following remain blockers for redirect/consolidation decisions and for routes marked pending verification:

- Query × Page export;
- Links report;
- Page Indexing issue example URLs for all six 404s, two crawled-not-indexed entries, and the one redirect entry;
- four Live URL Tests;
- business, legal, yacht, service, price, and media approvals listed below.

No additional route was created from the 55 known-URL total.

## Evidence ledger

The original 2026-07-13 audit found no Search Console exports in `seo-input/`, `docs/seo-input/` or the workspace. A summary was supplied afterward and is recorded in `ENGLISH_SEARCH_CONSOLE_BASELINE.md`.

### Received

- Page Indexing summary dated 2026-06-30.
- Filter: All known pages.
- Aggregate counts for indexed, discovered-not-indexed, 404, crawled-not-indexed and redirect statuses.
- Ten-day property-level impressions overlay for 2026-06-21 through 2026-06-30.

### Still required

Use the `yachtrentaldxb.com` property and export the longest available period where applicable:

1. Performance → Queries.
2. Performance → Pages.
3. Query × Page data, including clicks, impressions, CTR and position.
4. Countries.
5. Devices.
6. Dates.
7. Page Indexing issue-detail example URLs for all four non-indexed statuses: discovered, 404, crawled-not-indexed and redirect.
8. Page Indexing filtered to All submitted pages.
9. Page Indexing filtered to Unsubmitted pages only.
10. Sitemap status/details.
11. Links report: top linked pages, internal links and linking sites.
12. Core Web Vitals.
13. Four URL Inspection Live Tests specified in `ENGLISH_GOOGLE_ACCESS_EVIDENCE.md`.

Do not infer query/page clicks, CTR, ownership, backlinks or redirect value from the received aggregate summary.

Store exports under `docs/seo-input/` with export date and property name. Redact user data and credentials.

## Business and operational inputs

- Approved brand, phone, WhatsApp, departure process, hours, address (if public), social profiles and analytics state.
- Approved Terms and Privacy copy.
- Verified per-yacht facts, minimum duration, price effective dates and availability policy.
- Verified per-service facts and optional versus included items.
- Media authorization evidence and approved cross-domain reuse scope.
- Netlify site/deploy identity and WAF/CDN configuration evidence.

## External evidence

- Current backlink export from Search Console or a supplied tool.
- Any historic redirects/domain migrations.
- Prior URL list beyond the current sitemap.
- Current ranking export if available; do not scrape Google results.

## Publication gates after PR 3

The homepage and three hub routes can be statically published without resolving later record-level claims. Restoring the other 48 manifest records still requires the phase-specific evidence already listed above. In particular, yacht facts/media rights, service capabilities, legal approval, business facts, and Query × Page/links evidence remain unresolved; aggregate Search Console counts do not approve a route or redirect.
