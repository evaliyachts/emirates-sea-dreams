# English Yacht Media Approval Pack

Status: **superseded by expanded owner approval and PR 4B production verification**
Approval date: 2026-07-14
Allowed domain: `yachtrentaldxb.com`

## Approval scope

> **PR 4B update:** The owner expanded the allowed surfaces on 2026-07-14 to catalogue cards, yacht detail galleries, related cards, future homepage cards, future commercial selections, and yacht-detail social previews. This expansion does not authorize Evali branding, blocked paths, rehosting, transformations, or any prohibited inherited field. PR 4B retains 126 neutral-path production URLs across 19 publishable yachts; every retained URL passed `media:verify`. The record sections below remain the PR 4A source/provenance snapshot and their former “pending” cells are superseded only where the strict PR 4B registry records an approved production URL.

The owner approves the existing yacht image URLs recorded in the English repository for two surfaces only: catalogue cards and yacht detail pages.

Approval is conditional per retained URL: `media:verify` must succeed before that URL enters production. No failure exemption is authorized. This does **not** approve Evali branding or branded paths, blocked URLs, homepage/related/commercial/event use, social previews, Netlify Image CDN transformation, copying, rehosting, derivatives, yacht facts, descriptions, inherited schema, ratings, universal inclusions, or stale Offers.

URL existence and technical success do not prove identity by themselves. The current production set is the strict registry in `src/data/approved-yacht-media.ts`; see `ENGLISH_YACHT_MEDIA_VERIFICATION.md` and `IMPLEMENTATION_PR4B_REPORT.md`.

## 1. yacht-55ft-historical-brand-path

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/evali-yacht-55ft-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai0.webp` |
| Gallery URL count | 10 |
| Current HTTP/image verification | Known primary failure: HTTP 403. No URL in this row is eligible until branding and technical failures are resolved. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Not approved for direct use: URL paths expose prohibited branding and the sampled primary is blocked.** |
| Yacht detail gallery | **Not approved for direct use: URL paths expose prohibited branding and the sampled primary is blocked.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rejected for direct production retention; limited approval does not override prohibited branding or a blocked URL. |
| Identity/conflict note | Historical route and every gallery URL expose prohibited inherited branding; sampled primary URL returned 403. No neutral owner, rehost permission, or redirect is approved. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai0.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai1.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai2.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai3.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai4.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai5.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai6.webp`
8. `https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai7.webp`
9. `https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai8.webp`
10. `https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai9.webp`

## 2. yacht-royal-majesty-50

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/50-feet-royal-majesty-dubai-yacht-rental` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty1.webp` |
| Gallery URL count | 9 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Public/model name and every specification remain source observations pending business approval. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty7.webp`
8. `https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty8.webp`
9. `https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty9.webp`

## 3. yacht-azimut-42

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/42-feet-azimut-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_42_feet_yacht_rental_dubai/azimut_42_feet_yacht_rental_dubai1.webp` |
| Gallery URL count | 5 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Manufacturer/model identity and every specification remain source observations pending business approval. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_42_feet_yacht_rental_dubai/azimut_42_feet_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_42_feet_yacht_rental_dubai/azimut_42_feet_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_42_feet_yacht_rental_dubai/azimut_42_feet_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_42_feet_yacht_rental_dubai/azimut_42_feet_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_42_feet_yacht_rental_dubai/azimut_42_feet_yacht_rental_dubai5.webp`

## 4. yacht-majesty-44

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/majesty-44-feet-dubai-yacht-rental` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/majesty_44_feet_yacht_rental_dubai/majesty_44_feet_yacht_rental_dubai1.webp` |
| Gallery URL count | 5 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Legacy description repeats the unverified bedroom count. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/majesty_44_feet_yacht_rental_dubai/majesty_44_feet_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/majesty_44_feet_yacht_rental_dubai/majesty_44_feet_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/majesty_44_feet_yacht_rental_dubai/majesty_44_feet_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/majesty_44_feet_yacht_rental_dubai/majesty_44_feet_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/majesty_44_feet_yacht_rental_dubai/majesty_44_feet_yacht_rental_dubai5.webp`

## 5. yacht-azimut-50

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/50-feet-azimut-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Identity, specifications, price, and booking facts remain source observations pending business approval. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai7.webp`

## 6. yacht-oryx-50

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/oryx-50-feet-dubai-yacht-rental` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai1.webp` |
| Gallery URL count | 6 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Identity, specifications, price, and booking facts remain source observations pending business approval. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai6.webp`

## 7. yacht-ferretti-50

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/ferretti-50-feet-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Identity, specifications, price, and booking facts remain source observations pending business approval. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai7.webp`

## 8. yacht-majesty-56

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/56-feet-majesty-dubai-yacht-rental` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/56_feet_majesty_yacht_trip/56_feet_majesty_yacht_trip1.webp` |
| Gallery URL count | 5 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Identity, specifications, price, and booking facts remain source observations pending business approval. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/56_feet_majesty_yacht_trip/56_feet_majesty_yacht_trip1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/56_feet_majesty_yacht_trip/56_feet_majesty_yacht_trip2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/56_feet_majesty_yacht_trip/56_feet_majesty_yacht_trip3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/56_feet_majesty_yacht_trip/56_feet_majesty_yacht_trip4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/56_feet_majesty_yacht_trip/56_feet_majesty_yacht_trip5.webp`

## 9. yacht-azimut-55

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/55-feet-azimut-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | The year 2020 appears only in an unverified legacy description. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai7.webp`

## 10. yacht-majesty-88

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/majesty-88ft-jacuzzi-dubai-yacht-rental` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Jacuzzi, capacity, event suitability, specifications, and price are unverified; Jacuzzi is omitted from the proposal. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter7.webp`

## 11. yacht-sunseeker-82

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/sunseeker-82-feet-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai1.webp` |
| Gallery URL count | 6 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Gallery folder says 92 feet while the record says 82 feet; media identity must be resolved. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai6.webp`

## 12. yacht-azimut-80

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/azimut-80-feet-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Gallery folder says Azimut 55 while the record says Azimut 80; media identity must be resolved. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai7.webp`

## 13. yacht-benetti-110

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/benetti-110ft-jacuzzi-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/110_feet_benetti_yacht_with_jacuzzi_charter/110_feet_benetti_yacht_with_jacuzzi_charter1.webp` |
| Gallery URL count | 8 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Every fact, public identity, media mapping, and technical media result requires explicit approval; Jacuzzi is omitted. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/110_feet_benetti_yacht_with_jacuzzi_charter/110_feet_benetti_yacht_with_jacuzzi_charter1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/110_feet_benetti_yacht_with_jacuzzi_charter/110_feet_benetti_yacht_with_jacuzzi_charter2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/110_feet_benetti_yacht_with_jacuzzi_charter/110_feet_benetti_yacht_with_jacuzzi_charter3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/110_feet_benetti_yacht_with_jacuzzi_charter/110_feet_benetti_yacht_with_jacuzzi_charter4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/110_feet_benetti_yacht_with_jacuzzi_charter/110_feet_benetti_yacht_with_jacuzzi_charter5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/110_feet_benetti_yacht_with_jacuzzi_charter/110_feet_benetti_yacht_with_jacuzzi_charter6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/110_feet_benetti_yacht_with_jacuzzi_charter/110_feet_benetti_yacht_with_jacuzzi_charter7.webp`
8. `https://yacht.fra1.cdn.digitaloceanspaces.com/110_feet_benetti_yacht_with_jacuzzi_charter/110_feet_benetti_yacht_with_jacuzzi_charter8.webp`

## 14. yacht-majesty-101

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/majesty-101ft-jacuzzi-dubai-yacht-rental` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Gallery folder says Majesty 88 while the record says Majesty 101; media identity must be resolved; Jacuzzi is omitted. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter7.webp`

## 15. yacht-heysea-90

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/heysea-90ft-jacuzzi-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Heysea spelling conflicts with other project history and requires owner approval; Jacuzzi is omitted. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter7.webp`

## 16. yacht-doretty-90

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/doretty-90ft-jacuzzi-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Doretty spelling requires owner approval; Jacuzzi is omitted. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter7.webp`

## 17. yacht-ocean-dream-143

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/ocean-dream-143-feet-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Gallery folder says Dynasty 151 while the record says Ocean Dream 143; media identity and capacity require strong evidence. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai7.webp`

## 18. yacht-mzaail-135

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/mzaail-135ft-dubai-yacht-rental` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Mzaail spelling and the large capacity claim require owner approval and evidence. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai7.webp`

## 19. yacht-doretty-95

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/doretty-95-feet-jacuzzi-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter1.webp` |
| Gallery URL count | 6 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Doretty spelling, specifications, and price require owner approval; Jacuzzi is omitted. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter6.webp`

## 20. yacht-sunseeker-92

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/sunseeker-92-feet-dubai-yacht-rental` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai1.webp` |
| Gallery URL count | 6 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Identity, specifications, price, and booking facts remain source observations pending business approval. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai6.webp`

## 21. yacht-sunseeker-90

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/sunseeker-90-feet-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai1.webp` |
| Gallery URL count | 8 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Identity, specifications, price, and booking facts remain source observations pending business approval. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai7.webp`
8. `https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai8.webp`

## 22. yacht-dynasty-151

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/dynasty-151-feet-dubai-yacht-rental` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Historical route/name says 151 feet while source data says 150 feet. Owner must select visible 150, visible 151, or pending; this PR does not change the route. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai7.webp`

## 23. yacht-mega-120

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/luxury-120-feet-mega-yacht-rental-dubai` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | No manufacturer/model is verified or proposed. Gallery folder says Mzaail 135, so media identity must be resolved. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai6.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai7.webp`

## 24. yacht-omega-100

| Media approval field | Decision / evidence |
| --- | --- |
| Historical yacht path | `/yachts/omega-100-feet-dubai-yacht-rental` |
| Source host | `yacht.fra1.cdn.digitaloceanspaces.com` |
| Primary image URL | `https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai1.webp` |
| Gallery URL count | 7 |
| Current HTTP/image verification | Not retained as production media. Every retained URL must return a supported decodable image and satisfy the production verifier before use. |
| Dimensions | Not recorded; production values must equal decoded, verified dimensions. |
| Catalogue card | **Approved only if the retained primary URL passes `media:verify`.** |
| Yacht detail gallery | **Approved only for URLs that pass `media:verify` and are confirmed to depict this yacht.** |
| Related-yacht card | **Not approved.** |
| Commercial-page selection | **Not approved.** |
| Event-page selection | **Not approved.** |
| Open Graph image | **Not approved.** |
| Twitter image | **Not approved.** |
| Netlify Image CDN | **Not approved.** |
| Rehosting, copying, or derivatives | **Not approved by this direction.** |
| Owner media decision | Rights scope approved for two surfaces; technical and record-mapping eligibility pending. |
| Identity/conflict note | Identity, specifications, price, and booking facts remain source observations pending business approval. |

Gallery provenance URLs, in source order:

1. `https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai1.webp`
2. `https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai2.webp`
3. `https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai3.webp`
4. `https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai4.webp`
5. `https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai5.webp`
6. `https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai7.webp`
7. `https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai8.webp`

## Approval totals

- Historical media rows: **24**
- Historical URLs represented: **165**
- Rows with conditional catalogue/detail rights scope: **23**
- URLs represented in those rows: **155**
- Direct-production rows rejected for prohibited branded paths/known failure: **1**
- Other approved surfaces or transformation/rehosting rights: **0**
- Production yacht media records added by PR 4A: **0**
