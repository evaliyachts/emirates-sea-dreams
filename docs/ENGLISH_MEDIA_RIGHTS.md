# English Media Rights and Source Audit

Status: **limited catalogue/detail rights scope approved on 2026-07-14; production URL eligibility remains conditional on `media:verify`**.

## Current source inventory

| Surface | Origin/path pattern | Approximate records | Rights evidence | Technical finding |
| --- | --- | ---: | --- | --- |
| Yacht galleries | `https://yacht.fra1.cdn.digitaloceanspaces.com/...` | 165 image URLs across 24 yachts | None | Sample Evali-path 55-foot image returned 403 |
| Service galleries | Source Supabase `.../public/evali/...`, transformed at runtime to `https://evali.fra1.cdn.digitaloceanspaces.com/...` | 18 covers + 84 gallery entries | None | Production URLs visibly expose Evali origin/path |
| Homepage service images | `https://evali.fra1.cdn.digitaloceanspaces.com/...` | 13 listed cards | None | Visible Evali origin |
| Local brand assets | `/dubai-yachts-logo.png`, `/favicon.png`, placeholders | 3+ | None recorded | Ownership still needs documentation |

The source contains Supabase base strings for URL rewriting, but no database/API fetch was found for yacht/service records. This is not a live data dependency; it is still a production provenance/branding and maintainability risk because Evali/Supabase strings are compiled into source logic and service media resolve to Evali-branded CDN URLs.

## Required scan patterns

Every implementation build and production output must scan for:

- `schema_json_ld`
- `Product`
- `AggregateRating`
- `ratingValue`
- `reviewCount`
- `Evali`, `evali`, `evaliyacht.com`, Evali CDN/path names
- stale `Offer` prices and URLs
- `supabase.co` and Supabase runtime clients/fetches
- unauthorized remote media origins
- source maps containing prohibited source strings

Current target scan: no target `schema_json_ld`, Product or AggregateRating patterns were found; multiple Evali and Supabase strings were found; Offer markup exists on yacht pages; fixed offer/package prices exist in content.

## Arabic gallery reuse decision

The completed Arabic site’s gallery approval does **not automatically authorize reuse on `yachtrentaldxb.com`**. Obtain a written scope decision per rights record:

| Proposed surface | Reuse status |
| --- | --- |
| English yacht detail galleries | Pending explicit cross-domain authorization |
| Yacht cards/catalogue | Pending explicit surface authorization |
| Homepage featured yachts | Pending explicit surface authorization |
| Event/keyword selections | Pending explicit surface authorization |
| Open Graph/Twitter images | Pending explicit social-preview authorization |
| Download/rehosting/derivatives | Pending explicit license terms |

## Required rights record

For every retained asset record: rights ID, English surface(s), local/remote path, original source, owner, license/authorization evidence, allowed domains, derivative/rehosting permission, social-preview permission, approval date, expiry/review date and approver.

Do not copy or rehost third-party images without explicit authorization. Rename approved imported assets so production paths do not expose Evali branding. Where authorization is absent, use an approved neutral fallback and emit no social image metadata for that page.

## Media acceptance checks

- Every retained production URL returns a supported image successfully.
- Primary image is authorized, crawlable and has explicit dimensions/Arabic or English alt as appropriate.
- Galleries remove exact duplicates while preserving approved order.
- Cards use one primary image, not the full gallery.
- Social image URLs are absolute HTTPS production URLs with alt and verified dimensions.
- Failed remote sources do not retry indefinitely or blank the UI.
- Only fingerprinted assets receive immutable caching; HTML, robots and sitemap do not.

## PR 4 production decision — 2026-07-13

No authorization in the English repository approves the 165 historical remote yacht observations for `yachtrentaldxb.com`. Therefore:

- remote yacht URLs remain audit provenance only and are absent from strict production yacht records;
- Arabic-project approval is still not treated as cross-domain permission;
- remote yacht detail, card, homepage, Open Graph/Twitter, derivative, rehosting, and Netlify Image CDN use remain unapproved;
- the sampled 403 source is not retained in a production gallery;
- production yacht media count is **0** because publishable yacht count is **0**.

PR 4 creates one original local fallback asset, `/media/yacht-neutral-fallback.svg`, with rights ID `english-neutral-yacht-fallback-001`. It is approved only as a neutral fallback on `yachtrentaldxb.com`, contains no third-party photography or inherited branding, and is verified as a decodable 1600×900 SVG. It is not used to create a placeholder detail page and is not emitted as yacht social metadata.

| rightsRecordId | Source host | Approved surfaces | English domain | Arabic reuse | Social preview | Netlify Image CDN | Unresolved |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `english-neutral-yacht-fallback-001` | Local repository asset | Neutral fallback after an approved real image is unavailable | `yachtrentaldxb.com` | Not applicable / not reused | No | No | None |

`npm run media:verify` validates every media record used by a publishable yacht plus the neutral fallback. A future remote record must use HTTPS, exactly match an approved English rights record, retain its approved host after redirects, return a supported image successfully with a non-empty body, decode dimensions, and match its declared width and height.

## PR 4A limited owner approval — 2026-07-14

The owner approved the existing yacht image URLs recorded in the English repository for use on `yachtrentaldxb.com` **catalogue cards and yacht detail pages only**, conditional on every retained production URL passing `npm run media:verify`.

This supersedes the earlier “no English-domain surface authorization” finding only for those two surfaces. It does not authorize Evali branding or branded paths, blocked URLs, homepage/related/commercial/event use, Open Graph/Twitter images, Netlify Image CDN transformation, copying, rehosting, derivatives, yacht facts, descriptions, inherited schema, ratings, universal inclusions, or stale Offers. The historical 55-foot branded gallery is not directly eligible because its paths expose prohibited branding and the sampled primary returned 403.

No historical URL enters production in PR 4A. See `YACHT_FACT_APPROVAL_PACK.md`, `ENGLISH_YACHT_MEDIA_APPROVAL_PACK.md`, and `YACHT_APPROVAL_DECISIONS_NEEDED.md`.
