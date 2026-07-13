# English Service Media Approval Pack

Prepared: 2026-07-14  
Production authority: `https://yachtrentaldxb.com/`  
Status: **service-detail media rights pending**

## Current source observations

`src/data/services.ts` contains 18 cover observations and 84 gallery entries: 102 ordered observations representing 82 unique transformed URLs. Every transformed remote URL uses the inherited `evali.fra1.cdn.digitaloceanspaces.com` host or path. Those URLs are provenance only and are not eligible for production service pages under `AGENTS.md`.

PR 6A does not download, copy, rehost, transform, verify, or publish any historical service media. It creates no runtime dependency and does not add a service media registry.

## Existing neutral local images

Thirteen exact image snapshots already exist under neutral local homepage paths. Their current rights scope is **homepage service-card imagery only**. Reuse as a matching service-detail cover requires a written surface expansion; the existing homepage approval is not enough.

| Service path | Remote observations (cover + gallery) | Existing neutral local candidate | Rights ID | Current scope | Proposed additional scope |
| --- | ---: | --- | --- | --- | --- |
| `/services/banana-boat-ride` | 5 (4 unique) | `/media/home/services/banana-boat.webp` | `english-home-service-banana-boat-001` | Homepage service card only | Matching service-detail primary image — pending |
| `/services/swimming` | 8 (8 unique) | `/media/home/services/swimming.webp` | `english-home-service-swimming-001` | Homepage service card only | Matching service-detail primary image — pending |
| `/services/barbecue-on-the-yacht` | 6 (5 unique) | `/media/home/services/barbecue.webp` | `english-home-service-barbecue-001` | Homepage service card only | Matching service-detail primary image — pending |
| `/services/fishing` | 5 (4 unique) | `/media/home/services/fishing.webp` | `english-home-service-fishing-001` | Homepage service card only | Matching service-detail primary image — pending |
| `/services/birthday-party` | 5 (4 unique) | `/media/home/services/birthday-party.webp` | `english-home-service-birthday-001` | Homepage service card only | Matching service-detail primary image — pending |
| `/services/graduation-parties` | 5 (4 unique) | `/media/home/services/graduation-party.webp` | `english-home-service-graduation-001` | Homepage service card only | Matching service-detail primary image — pending |
| `/services/wedding-anniversary-parties` | 6 (5 unique) | `/media/home/services/wedding-anniversary.webp` | `english-home-service-anniversary-001` | Homepage service card only | Matching service-detail primary image — pending |
| `/services/bachelor-parties` | 5 (4 unique) | None | — | None | Publish text-only or provide approved neutral media |
| `/services/marriage-proposal-party` | 5 (4 unique) | `/media/home/services/marriage-proposal.webp` | `english-home-service-proposal-001` | Homepage service card only | Matching service-detail primary image — pending |
| `/services/gender-reveal-party` | 5 (4 unique) | None | — | None | Publish text-only or provide approved neutral media |
| `/services/engagement-and-wedding-parties` | 5 (4 unique) | None assigned to this combined owner | — | None | Keep blocked or provide owner-specific approved media |
| `/services/food-menu` | 10 (10 unique) | `/media/home/services/food-menu.webp` | `english-home-service-food-001` | Homepage service card only | Matching service-detail primary image — pending |
| `/services/donut-ride` | 5 (4 unique) | `/media/home/services/donut-ride.webp` | `english-home-service-donut-ride-001` | Homepage service card only | Matching service-detail primary image — pending |
| `/services/jet-ski` | 7 (6 unique) | `/media/home/services/jet-ski.jpg` | `english-home-service-jet-ski-001` | Homepage service card only | Matching service-detail primary image — pending |
| `/services/afternoon-tea-trip` | 5 (4 unique) | None | — | None | Publish text-only or provide approved neutral media |
| `/services/morning-yacht-trips` | 5 (4 unique) | None | — | None | Publish text-only or provide approved neutral media |
| `/services/engagement-parties` | 5 (4 unique) | `/media/home/services/engagement-party.webp` | `english-home-service-engagement-001` | Homepage service card only | Matching service-detail primary image — pending |
| `/services/wedding-parties` | 5 (4 unique) | `/media/home/services/wedding-party.webp` | `english-home-service-wedding-001` | Homepage service card only | Matching service-detail primary image — pending |

The thirteen local candidates already have recorded dimensions and SHA-256 values in `ENGLISH_MEDIA_RIGHTS.md` and typed rights records in `src/data/media-rights.ts`. PR 6A does not change those records.

## Yacht images on event pages

The current yacht-media approval allows catalogue cards, yacht detail galleries, related yacht cards, homepage yacht cards, commercial-page selections, and yacht-detail social previews. It does **not** approve yacht images on event/service pages.

PR 6 requires one of these explicit decisions:

1. approve each selected yacht's verified primary image for event-page yacht-selection cards; or
2. show factual yacht text links without an image; or
3. provide separately authorized event-page media.

No event page may silently expand the existing yacht-media surface rights.

## Approval choices

The owner may approve any combination of:

- expand the thirteen listed local rights IDs to the matching service-detail primary-image surface only;
- permit those images in Open Graph/Twitter metadata for the matching service page, or keep social media absent;
- approve verified yacht primary images for event-page selection cards;
- require text-only service pages where no local candidate exists;
- provide new neutral media with owner, license, domain, surface, derivative, rehosting, and social-preview evidence.

Historical remote service URLs remain rejected production paths even if their subject matter is approved. No production path may expose inherited branding, and no remote URL may enter production without a new exact rights record plus `media:verify` success.

## Suggested owner media response

> I approve the thirteen neutral local homepage service images listed in ENGLISH_SERVICE_MEDIA_APPROVAL_PACK.md for reuse as the primary image on their matching yachtrentaldxb.com service-detail pages. [I do / do not] approve those images for matching service-page social previews. I [do / do not] approve verified yacht primary images on event-page yacht-selection cards. Services without a listed neutral image must remain text-only unless I provide separate media approval. Historical Evali-branded remote paths remain prohibited.
