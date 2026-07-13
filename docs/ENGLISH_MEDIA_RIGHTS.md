# English Media Rights and Source Audit

Status: **no production reuse approval register exists in the English repository**.

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
