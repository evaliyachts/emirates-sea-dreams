# English Search Console Baseline

Evidence received after the original audit. This document records a historical Google Search Console summary; it does not authorize implementation or Search Console actions.

## Report scope

| Field | Value |
| --- | --- |
| Property | `yachtrentaldxb.com` project property; property type was not supplied |
| Report | Page Indexing |
| Report date | 2026-06-30 |
| Filter | All known pages |
| Known URLs | 55 |
| Indexed | 1 |
| Not indexed | 54 |
| Indexation rate | 1.8% (`1 / 55`) |

## Page Indexing breakdown

| Status | URL count | Share of known URLs | Identification status |
| --- | ---: | ---: | --- |
| Indexed | 1 | 1.8% | Individual URL not supplied |
| Discovered – currently not indexed | 45 | 81.8% | Example URLs not supplied |
| Not found (404) | 6 | 10.9% | Example URLs not supplied |
| Crawled – currently not indexed | 2 | 3.6% | Individual URLs not supplied |
| Page with redirect | 1 | 1.8% | Individual URL not supplied |
| **Total** | **55** | **100%** | — |

## Ten-day impressions overlay

Period: 2026-06-21 through 2026-06-30.

| Measure | Value |
| --- | ---: |
| Total impressions | 10,553 |
| Average daily impressions | 1,055.3 |
| Median daily impressions | 825.5 |
| Minimum | 582 on 2026-06-24 |
| Maximum | 2,350 on 2026-06-29 |
| First day | 779 |
| Final day | 1,012 |

These are property-level historical impressions. They do not identify a query, page, country or device and cannot approve keyword ownership, consolidation or redirects.

## Relationship to the 52-URL sitemap

The live sitemap contains 52 URLs. The Page Indexing arithmetic is:

```text
1 indexed
+ 45 discovered – currently not indexed
+ 6 not found (404)
= 52
```

It is a **high-confidence inference** that these three report groups may correspond to the 52-URL sitemap inventory. It is not a confirmed submitted-page mapping because the export filter is **All known pages**, not **All submitted pages**, and the issue-detail URLs were not supplied.

The remaining three known URLs—two crawled but not indexed and one page with redirect—remain unidentified. Do not increase the intended route inventory from 52 to 55 and do not create three routes to match the Search Console total.

## Confirmed facts versus inference

### Confirmed from the supplied summary

- Google knew about 55 URLs at the report date.
- One URL was indexed and 54 were not indexed.
- The four non-indexed issue groups contained 45, 6, 2 and 1 URLs respectively.
- Most known URLs were in “Discovered – currently not indexed.”
- The ten-day property-level chart recorded 10,553 impressions.
- The current live sitemap independently contains 52 URLs.

### High-confidence inference

- The numerical match between `1 + 45 + 6` and the 52 sitemap URLs suggests those groups may describe the sitemap inventory.
- The direct-route failure remains the strongest observed technical explanation for severe indexation failure, especially the recorded 404 group. It does not prove Google fetched all 45 discovered URLs or assigned their status because of the current hosting behavior.

### Unknown

- Which URL is indexed.
- Which six URLs are reported as 404.
- Which two URLs were crawled but not indexed.
- Which URL redirects and its source/destination chain.
- Whether the 52 matched URLs are submitted sitemap URLs.
- Which pages and queries generated the impressions.
- Google-reported rendering, canonical selection and live accessibility.

## Roadmap implications

- Route repair is time-sensitive because 45 known URLs were discovered but had not progressed to crawling/indexation by the report date.
- The report strengthens the need for PR 2 ownership classification followed by PR 3 static route repair.
- PR 2 may consume this baseline as historical indexation evidence.
- PR 2 may not approve commercial consolidation or redirects without Query × Page and links evidence.
- PR 3 must render only approved keep/enrich canonical owners as static `200` pages; it must not blindly create 55 routes or convert every known URL.
- The two crawled-not-indexed URLs need individual content, canonical, rendering and quality inspection once identified.

## Evidence still required

- Page Indexing issue-detail example URL exports for all four non-indexed statuses.
- Page Indexing export filtered to All submitted pages.
- Page Indexing export filtered to Unsubmitted pages only.
- Queries, Pages and Query × Page performance exports over the longest available period.
- Country, device and date exports.
- Sitemap status/details, Links report and Core Web Vitals.
- Four Search Console Live URL Tests: homepage, commercial, yacht and event.
