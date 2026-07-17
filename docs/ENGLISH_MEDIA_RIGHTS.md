# English Media Rights and Source Audit

Status: **limited yacht and homepage rights scopes approved on 2026-07-14; production eligibility remains conditional on `media:verify`**.

## Current source inventory

| Surface | Origin/path pattern | Approximate records | Rights evidence | Technical finding |
| --- | --- | ---: | --- | --- |
| Yacht galleries | `https://yacht.fra1.cdn.digitaloceanspaces.com/...` | 165 image URLs across 24 yachts | None | Sample Evali-path 55-foot image returned 403 |
| Service galleries | Source Supabase `.../public/evali/...`, transformed at runtime to `https://evali.fra1.cdn.digitaloceanspaces.com/...` | 18 covers + 84 gallery entries | None | Production URLs visibly expose Evali origin/path |
| Homepage hero/service images | Historical DigitalOcean Spaces sources | 2 hero covers + 13 service-card images | Owner-approved for the English homepage on 2026-07-14 | Exact bytes imported under neutral local paths; no branded runtime origin |
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

## PR 4B expanded owner approval and verification — 2026-07-14

The owner approved the current repository `image_url` and gallery observations for these `yachtrentaldxb.com` surfaces: catalogue cards, yacht detail galleries, related-yacht cards, future homepage yacht cards, future commercial-page selections, and yacht-detail social previews. Every production URL remains conditional on `media:verify`; Evali-branded paths, failed URLs, rehosting, derivatives, inherited schema, stale Offers, and unapproved facts remain excluded.

PR 4B retains 126 unique neutral-path URLs across 19 publishable yachts. Each URL returned HTTP success with a supported image content type, decoded dimensions, the same approved final host, and dimensions matching its strict media record. The neutral fallback also decoded successfully but is used by zero published yachts. No retained production URL failed; rejected source observations remain provenance only. The historical 55-foot branded primary URL remains recorded as a prior HTTP 403 and the whole route/gallery remains blocked.

Each retained remote URL has an exact rights record generated in `src/data/media-rights.ts`, scoped to the approved English domain and surfaces. The first approved gallery item supplies the catalogue card and yacht-detail social image; social URLs remain absolute HTTPS URLs with verified alt text and dimensions. Netlify Image CDN transformation and Arabic-site reuse remain unapproved.

## Homepage media restoration approval — 2026-07-14

The owner explicitly approved restoring the same prior media treatment on the English homepage: the separate desktop and mobile hero covers plus the thirteen service-card images in their established order. This approval is limited to the homepage hero and homepage service-card visual sequence on `yachtrentaldxb.com`.

The approved source files were downloaded successfully, checked as decodable images, and committed as exact static snapshots under neutral local paths. This avoids a runtime dependency on a third-party branded host. The images are decorative support for the already approved, evidence-safe homepage copy; this approval does not reinstate historical service-detail routes, service inclusions, packages, availability, routes, operational promises, old metadata or old schema.

The mobile homepage performance Draft later prepared a same-path 768×1376 AVIF rendition from the exact approved mobile source snapshot. The production candidate retains the same visual subject, source provenance and approved homepage-only surface. The original 1536×2752 snapshot checksum remains `3a1c62a8f21c968a16116198066bcb758016b3c051bfc7d21ef76105d3f0d875`; the optimized production-candidate checksum is recorded below for exact-head owner review.

The documentation-only provenance mapping is:

| Neutral production path | Historical source URL |
| --- | --- |
| `/media/home/hero/yacht-cover-desktop.avif` | `https://dubai-yacht.fra1.cdn.digitaloceanspaces.com/dubai_yacht_luxury_dt.avif` |
| `/media/home/hero/yacht-cover-mobile.avif` | `https://dubai-yacht.fra1.cdn.digitaloceanspaces.com/dubai_yacht_luxury_mob.avif` |
| `/media/home/services/birthday-party.webp` | `https://evali.fra1.cdn.digitaloceanspaces.com/birthday-party/IMG-20250404-WA0001-1.webp` |
| `/media/home/services/wedding-anniversary.webp` | `https://evali.fra1.cdn.digitaloceanspaces.com/wedding-anniversary-celebration/IMG-20250404-WA0002.webp` |
| `/media/home/services/engagement-party.webp` | `https://evali.fra1.cdn.digitaloceanspaces.com/engagement-party/IMG-20250405-WA0033.webp` |
| `/media/home/services/marriage-proposal.webp` | `https://evali.fra1.cdn.digitaloceanspaces.com/marriage-proposal-part/IMG-20250405-WA0004-1.webp` |
| `/media/home/services/graduation-party.webp` | `https://evali.fra1.cdn.digitaloceanspaces.com/graduation-party/IMG-20250405-WA0020-1-1.webp` |
| `/media/home/services/wedding-party.webp` | `https://evali.fra1.cdn.digitaloceanspaces.com/wedding-celebration-on%20yacht-in-dubai/IMG-20250405-WA0036.webp` |
| `/media/home/services/jet-ski.jpg` | `https://evali.fra1.cdn.digitaloceanspaces.com/jet-ski-rental/IMG_7681-1.jpg` |
| `/media/home/services/donut-ride.webp` | `https://evali.fra1.cdn.digitaloceanspaces.com/donut-ride-adventure/photo_2025-04-05_12-30-39-1.webp` |
| `/media/home/services/banana-boat.webp` | `https://evali.fra1.cdn.digitaloceanspaces.com/banana-boat-ride/photo_2025-04-05_12-29-24-1.webp` |
| `/media/home/services/barbecue.webp` | `https://evali.fra1.cdn.digitaloceanspaces.com/bbq-experience/IMG_8252-1.webp` |
| `/media/home/services/swimming.webp` | `https://evali.fra1.cdn.digitaloceanspaces.com/swimming-experience-yacht-trip/IMG_7518-1.webp` |
| `/media/home/services/food-menu.webp` | `https://evali.fra1.cdn.digitaloceanspaces.com/food-menu/photo_2025-04-02_19-40-12.webp` |
| `/media/home/services/fishing.webp` | `https://evali.fra1.cdn.digitaloceanspaces.com/fishing-trips/IMG_8214-1.webp` |

| Rights ID | Neutral production path | Dimensions | SHA-256 |
| --- | --- | ---: | --- |
| `english-home-hero-desktop-001` | `/media/home/hero/yacht-cover-desktop.avif` | 2752×1536 | `9095255cc998d6eaf68fdd5725185edcd4a9debbefe2c7af9371c7264cc9292b` |
| `english-home-hero-mobile-001` | `/media/home/hero/yacht-cover-mobile.avif` | 768×1376 | `18da0d9a4102830e365c8799f90bfcdbe91f4907eface5cb518ac3f04121abca` |
| `english-home-service-birthday-001` | `/media/home/services/birthday-party.webp` | 767×730 | `fe6bd6a1c2f3d19c18126568c918abd3d0716b59b3044d6b860e9527764657ed` |
| `english-home-service-anniversary-001` | `/media/home/services/wedding-anniversary.webp` | 767×728 | `2526d6b111c109d19b300e3f6b28a6459034f4802bb464e6a77b36031d08ac28` |
| `english-home-service-engagement-001` | `/media/home/services/engagement-party.webp` | 767×729 | `419ac07e6a72b6b77ff368697b46d334609455e0b015d87bdd56496c0f2606ea` |
| `english-home-service-proposal-001` | `/media/home/services/marriage-proposal.webp` | 767×730 | `8adab1568fb1c0ab6877a9ff84ee84d53c6caca06f5ad10a7be41da34f50584c` |
| `english-home-service-graduation-001` | `/media/home/services/graduation-party.webp` | 767×729 | `333f9572e2a1d8a16fd336a980e479f6764cf7bdd3ddf65629e39b20d703626a` |
| `english-home-service-wedding-001` | `/media/home/services/wedding-party.webp` | 767×730 | `6e5e69cde41c31cead2fa60fae5599e407c0f62cf8fa496db091bc9c7f914857` |
| `english-home-service-jet-ski-001` | `/media/home/services/jet-ski.jpg` | 750×690 | `0caceb257e6580b7463e11f0c40d4c1c3b7917005d9460ab17e0f6abfe929e7b` |
| `english-home-service-donut-ride-001` | `/media/home/services/donut-ride.webp` | 720×461 | `5c0149304e860af745089086e3fcc3ed69176139eb92174c98593299135ac32a` |
| `english-home-service-banana-boat-001` | `/media/home/services/banana-boat.webp` | 767×729 | `554a754a348c5dc26d1ded5ae728f099a2f5500b3e230809b54460464835b141` |
| `english-home-service-barbecue-001` | `/media/home/services/barbecue.webp` | 461×472 | `c9ad0aa7f564aee8ec69475d94223545d1c56894bd70230d2e73a600ea082098` |
| `english-home-service-swimming-001` | `/media/home/services/swimming.webp` | 425×668 | `47f65baa95b38a20783ecc9214a88358b5f82232f90e92e7518dcf4df2c455bc` |
| `english-home-service-food-001` | `/media/home/services/food-menu.webp` | 358×506 | `b8f975157f4c2c3d5b2246f2b8d85e255d8869c0401f5c501182c5fbcbac958b` |
| `english-home-service-fishing-001` | `/media/home/services/fishing.webp` | 648×1152 | `1c3b9848ecb1b7eec39a668c978a3c238c6b2172d476aacb3324a8e1159d97dc` |

The exact historical source URLs remain documentation-only provenance. No source URL or inherited brand name is emitted by the production homepage. Social-preview use, other page surfaces, transformation and cross-domain reuse remain unapproved for these homepage snapshots.

## PR 6A service-detail media gate — 2026-07-14

The service source contains 102 ordered media observations (18 covers and 84 gallery entries), representing 82 unique transformed URLs. All transformed remote paths expose inherited branding and remain provenance only; none is approved or proposed for production service pages.

The owner expanded seven matching neutral local service-card rights records to the corresponding service-detail primary-image surface on 2026-07-14. Bachelor parties, afternoon tea, and morning yacht trips remain text-only. The eight blocked service owners receive no expanded media surface. Historical remote service media, event-page yacht images, and service social previews remain unapproved. See `ENGLISH_SERVICE_APPROVAL.md` and `ENGLISH_SERVICE_MEDIA_APPROVAL_PACK.md`.

PR 6B records those seven surface expansions in `src/data/media-rights.ts` and verifies the exact local file, declared dimensions, rights ID and matching service path through `media:verify`. No file is copied, transformed or rehosted, and no service page emits an Open Graph or Twitter image.
