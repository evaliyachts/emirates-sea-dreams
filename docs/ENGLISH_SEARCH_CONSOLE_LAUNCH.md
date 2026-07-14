# English Search Console Launch Handoff

Prepared: 2026-07-14

Property: `https://yachtrentaldxb.com/`

Status: **owner action required after the PR 9 production smoke test**. Codex has not submitted a sitemap, requested indexing, run an authenticated URL Inspection test, or clicked Validate Fix.

## 1. Run authenticated Live URL Tests first

In Google Search Console, open **URL Inspection**, enter each URL below, and select **Test Live URL**:

1. `https://yachtrentaldxb.com/`
2. `https://yachtrentaldxb.com/yachts`
3. `https://yachtrentaldxb.com/yachts/50-feet-royal-majesty-dubai-yacht-rental`
4. `https://yachtrentaldxb.com/services`
5. `https://yachtrentaldxb.com/services/birthday-party`
6. `https://yachtrentaldxb.com/occasions`
7. `https://yachtrentaldxb.com/contact`
8. `https://yachtrentaldxb.com/terms`
9. `https://yachtrentaldxb.com/privacy`

Record one evidence row for each URL:

URL | Evidence date | Google accessibility | Indexing allowed | User-declared canonical | Google-selected canonical | Rendered screenshot | Blocked resources | Crawl result | Evidence file
--- | --- | --- | --- | --- | --- | --- | --- | --- | ---
Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending

The live test passes only when Google reports that the URL is accessible and indexable, the user canonical is the exact production URL, the rendered page contains the route-specific content, and no required HTML, CSS, JavaScript or image resource is blocked. Record Google’s selected canonical as evidence; do not assume it matches.

## 2. Submit the sitemap

Only after the representative Live Tests pass:

1. Select the Search Console property for `yachtrentaldxb.com` and record whether it is a Domain or URL-prefix property.
2. Open **Sitemaps**.
3. Submit exactly `https://yachtrentaldxb.com/sitemap.xml`.
4. Record the submission date, status, last-read date, discovered-page count and any error.

The production sitemap is expected to contain 38 direct, indexable canonical URLs. Do not submit a Netlify-host or preview sitemap.

## 3. Request a small representative set for indexing

After the Live Tests pass, request indexing only for:

- `https://yachtrentaldxb.com/`
- `https://yachtrentaldxb.com/yachts`
- `https://yachtrentaldxb.com/yachts/50-feet-royal-majesty-dubai-yacht-rental`
- `https://yachtrentaldxb.com/services`
- `https://yachtrentaldxb.com/services/birthday-party`
- `https://yachtrentaldxb.com/contact`

Do not request all 38 URLs individually. Discovery should proceed through the submitted sitemap and internal links.

## 4. Export and archive evidence

Export and retain:

- Performance Queries;
- Performance Pages;
- Query × Page data that preserves the query-to-page relationship;
- Links report, including top linked pages, internal links and linking sites;
- Page Indexing report and example URLs for every issue group;
- Core Web Vitals report for mobile and desktop;
- submitted-sitemap status and discovered-page count.

For every export, record the property type, report date range, filters, export timestamp, evidence filename and any redactions. Also record sitemap submission date/status and the exact URLs for which indexing was requested.

Do not click **Validate Fix** for an old issue until its example URLs and current classifications have been reviewed. Do not approve a redirect, consolidation or new commercial owner from property-wide impressions; query-by-page, links and URL-specific evidence remain required.

## Evidence ledger

Artifact | Property/filter | Date range | Export timestamp | Filename | Redactions | Result/action
--- | --- | --- | --- | --- | --- | ---
Nine Live URL Tests | Pending | Point-in-time | Pending | Pending | Pending | Pending
Sitemap submission | Pending | Point-in-time | Pending | Pending | Pending | Pending
Six indexing requests | Pending | Point-in-time | Pending | Pending | Pending | Pending
Performance Queries | Pending | Pending | Pending | Pending | Pending | Pending
Performance Pages | Pending | Pending | Pending | Pending | Pending | Pending
Query × Page | Pending | Pending | Pending | Pending | Pending | Pending
Links | Pending | Point-in-time | Pending | Pending | Pending | Pending
Page Indexing and examples | Pending | Point-in-time | Pending | Pending | Pending | Pending
Core Web Vitals | Pending | Point-in-time | Pending | Pending | Pending | Pending

