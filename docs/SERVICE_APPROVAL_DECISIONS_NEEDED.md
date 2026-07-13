# Service Approval Decisions Needed

Prepared: 2026-07-14

Production authority: `https://yachtrentaldxb.com/`

## Current gate

- Historical service/event manifest owners: **18**
- Approved service capabilities: **0**
- Published service/event details: **0**
- Approved service-detail media rights: **0**
- Occasion records without detail routes: **7**
- Approved new occasion routes: **0**
- Approved redirects: **0**
- Approved commercial consolidations: **0**
- Published sitemap URLs: **23**

PR 6 implementation must remain blocked until the decisions below are recorded. Aggregate Search Console data does not approve a route, redirect, or consolidation.

## Required owner decisions

1. Approve or reject current request capability for each of the 18 service source IDs.
2. Approve the public name and category for every service that may publish.
3. Confirm whether availability is always presented as on request and reconfirmed during booking.
4. Approve exact optional extras and confirm whether separate pricing is the safe default.
5. Supply water-activity provider, qualification, safety, permit, weather, equipment, and operating facts—or keep those pages blocked.
6. Supply hospitality/menu/dietary/supplier facts—or keep those claims absent.
7. Approve exactly three current publishable yacht IDs per service, or authorize text-only factual links without suitability claims.
8. Decide whether `/services/food-menu` is an indexable owner, a supporting non-indexable utility, or blocked.
9. Keep `/services/engagement-and-wedding-parties` preserved without redirect until Query × Page and links evidence is reviewed; approve a distinct role only if one exists.
10. Confirm the seven occasion dispositions without creating new routes automatically.
11. Approve business display name, phone, WhatsApp/default message, and any visible contact action separately in `ENGLISH_BUSINESS_FACTS.md`.
12. Approve the media choices in `ENGLISH_SERVICE_MEDIA_APPROVAL_PACK.md`.

## Decisions that remain prohibited without evidence

- all-inclusive packages;
- guaranteed availability or instant confirmation;
- fixed routes, landmarks, departure points, or mandatory durations;
- included fuel, drinks, food, decoration, cake, music, DJ, photography, BBQ, swimming, fishing, Jet Ski, banana boat, donut ride, or other activity;
- ratings, reviews, testimonials, awards, or “most requested” claims;
- licenses, insurance, regulatory compliance, life jackets, professional/experienced crew, equipment, permits, or safety guarantees;
- deposits, payment methods, cancellations, refunds, rescheduling, or liability promises;
- `Event`, `Product`, `Review`, `AggregateRating`, unapproved `LocalBusiness`, or rich-result-driven `FAQPage` schema;
- live hreflang, x-default, analytics, Search Console submission, or redirect activation.

## Evidence still required outside owner approval

- Query × Page Search Console export;
- Links report and Page Indexing issue example URLs;
- four Search Console Live URL Tests;
- combined engagement/wedding overlap evidence;
- exact service media rights for any new asset;
- successful `media:verify` for every retained production media item;
- legal/business approval for operational promises.

## Next implementation step after approval

PR 6B may create a strict service contract and publish only approved owners. It must generate route-specific initial HTML, unique metadata and content, Service/BreadcrumbList schema only, truthful optional wording, canonical internal links, and approved yacht selections. Unapproved owners remain blocked and absent from the sitemap. No redirect is created from aggregate evidence.
