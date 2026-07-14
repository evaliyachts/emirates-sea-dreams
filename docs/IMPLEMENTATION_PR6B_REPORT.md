# English Implementation PR 6B Report

Prepared: 2026-07-14

Branch: `agent/english-pr6b-approved-service-pages`

Base merge: `17a7683b2d29d169c85af4b7a3d2b424afe41e8a`

Pull request: [#15](https://github.com/evaliyachts/emirates-sea-dreams/pull/15)

Initial implementation commit: `319ac4aa1e624ff382951f6006b4824eb99bb864`

Final correction head and immutable remote results: recorded in this report after the final Deploy Preview completes

## Scope

PR 6B publishes only the ten service owners authorized in `ENGLISH_SERVICE_APPROVAL.md`. It creates no route, redirect, consolidation, occasion detail, commercial candidate, legal page, analytics integration, language alternate, Search Console action or production-host redirect.

The intended manifest stays at 52 records: 10 static/hub/support, 24 yacht and 18 service/event. Publication increases from 23 to 33 owners by adding ten approved service details. Nineteen manifest owners remain blocked.

| Inventory | Before | After |
| --- | ---: | ---: |
| Route manifest records | 52 | 52 |
| Published hub/yacht owners | 23 | 23 |
| Published service owners | 0 | 10 |
| Blocked service owners | 18 | 8 |
| Sitemap URLs | 23 | 33 |
| Approved redirects | 0 | 0 |
| Approved commercial consolidations | 0 | 0 |

## Strict service contract

`src/data/approved-services.ts` defines a strict, unknown-field-rejecting record for each approved page. Every record owns:

- one exact existing manifest ID, slug and path;
- a unique title, description, H1, introduction, direct answer, section set and FAQ set;
- explicit who-it-is-for and suitable-group guidance;
- the exact availability statement `on request and subject to confirmation`;
- explicit optional-request boundaries, booking steps and price factors;
- exactly three unique currently published yacht IDs;
- exactly three related approved service IDs;
- at most one approved local primary image.

The runtime service detail no longer imports the inherited service source feed. That historical file remains repository evidence only and its transformed remote media, descriptions, schema, names and package claims do not feed publication.

## Published and blocked owners

Published service details: **10**.

- birthday party;
- marriage proposal;
- wedding anniversary;
- engagement;
- wedding celebration;
- graduation;
- respectful bachelor gathering;
- afternoon tea request;
- morning yacht experience;
- barbecue request.

Blocked service details: **8**.

- combined engagement and wedding;
- gender reveal;
- food menu;
- banana boat;
- donut ride;
- Jet Ski;
- swimming;
- fishing.

The blocked records generate no static file, Netlify rewrite, sitemap URL, canonical or internal detail link. The combined owner receives no redirect or consolidation.

## Content and yacht selection

Every page uses original English content and distinguishes verified vessel facts from details that require request-time confirmation. No page promises a fixed route, duration, departure, landmark, supplier, package, optional inclusion, instant confirmation, activity support, legal ceremony authority or financial/legal term.

Each page links exactly three of the 19 published yacht records. Cards display only verified length, guest capacity, AED hourly price and minimum duration. The selection text explicitly avoids inferring event equipment, layout, suppliers, inclusions or compatibility.

| Service owner | Three factual published-yacht selections |
| --- | --- |
| Birthday | Royal Majesty 50; Majesty 56; Majesty 88 |
| Marriage proposal | Azimut 42; Royal Majesty 50; Sunseeker 92 |
| Anniversary | Azimut 42; Azimut 55; Sunseeker 90 |
| Engagement | Royal Majesty 50; Majesty 56; Majesty 88 |
| Wedding celebration | Majesty 56; Majesty 88; Ocean Dream 143 |
| Graduation | Royal Majesty 50; Majesty 56; Doretty 90 |
| Bachelor gathering | Majesty 56; Sunseeker 90; Doretty 95 |
| Afternoon tea request | Azimut 42; Majesty 44; Azimut 55 |
| Morning experience | Royal Majesty 50; Azimut 55; Sunseeker 92 |
| Barbecue request | Majesty 44; Majesty 56; Doretty 90 |

Birthday and engagement intentionally share a small/medium/larger factual comparison set because both approved celebration owners serve variable private group sizes. This does not establish event equipment or compatibility.

Every page includes a booking CTA to the published homepage request-preparation anchor. It does not use the blocked contact owner or introduce a contact fact; visible copy states that preparing a request does not reserve a yacht or confirm availability. Optional details are relied on only when recorded in the final written offer or WhatsApp confirmation for that request.

The services hub links all ten approved owners. The occasions hub links existing approved birthday, proposal, engagement, wedding and anniversary owners without creating an occasion slug. Fishing remains hub-only with its detail owner blocked.

Related-service links use exactly three approved owners per detail rather than an all-to-all block. Related-yacht links use exactly the three contract selections. Other detail links terminate at `/services`, `/yachts`, `/occasions`, the homepage booking-guide anchor or the local yacht-comparison anchor. No new content link targets a blocked owner.

## Optional-extra wording policy

Every page states that availability is `on request and subject to confirmation`. Decoration, cake, catering, barbecue, afternoon tea, breakfast, music, photography, flowers, balloons, dining, styling and entertainment appear only as optional requests subject to availability, supplier/business confirmation and separate pricing. No page uses package-inclusion, all-inclusive, guaranteed, free, pre-confirmed route/duration or instant-confirmation positioning.

## Media

Seven pages use the exact local homepage snapshot approved for that matching service-detail surface. Bachelor parties, afternoon tea and morning trips remain text-only. No historical remote service image, inherited branded media, event-page yacht image or service social-preview image is emitted.

`media:verify` checks the seven local files, decoded dimensions, exact rights ID and service-path surface. The existing 126 yacht images and 15 homepage images remain unchanged.

## Metadata and schema

The manifest records unique approved metadata for all ten pages. Canonicals and Open Graph URLs use exact non-trailing English paths on `https://yachtrentaldxb.com`. Service pages emit no Open Graph or Twitter image and no live `hreflang` or `x-default`.

Each service page emits one JSON-LD graph with exactly `Service` and `BreadcrumbList`. It emits no `Event`, `FAQPage`, `Product`, `Offer`, `Review`, `AggregateRating`, rating or `LocalBusiness` node.

## Output and validation

The required local gate is:

- Node `v24.18.0` and npm `11.16.0`;
- `npm ci`;
- `npm run lint`;
- `npm run typecheck`;
- `npm test`;
- `npm run build`;
- `npm run seo:check`;
- `npm run media:verify`;
- `npm audit --omit=dev`;
- `git diff --check`;
- Netlify production-context build and Deploy Preview.

The final branch gate, GitHub Quality run, Netlify deploy ID, bundle filename, deployed route crawl, metadata/schema validation, browser hydration result and source-map probe are recorded after the correction head completes remote validation.

## Status-code matrix

| Route class | Count | Required result |
| --- | ---: | --- |
| Published manifest owners | 33 | Direct 200, no `Location` |
| Approved service owners | 10 | Direct 200 with route-specific initial HTML |
| Blocked service owners | 8 | Real 404 |
| Blocked yacht owners | 5 | Real 404 |
| Blocked `/offers`, `/contact`, `/terms`, `/privacy` | 4 | Real 404 |
| Commercial candidates | 6 | Real 404 |
| Random unknown path | 1 sampled | Real 404 |
| `sitemap.xml` and `robots.txt` | 2 | Direct 200 |

No route in this matrix is redirected.

## Production smoke test

Production deployment remains unchanged until PR #15 is ready, reviewed by its required checks and squash-merged. After the merged main build is published, this report will receive a documentation-only `[skip netlify]` evidence update recording the squash merge SHA, production deploy ID and timestamp, deployed bundle, full status matrix, sitemap/robots result, metadata/schema scan, hydration result, caching and source-map result.

## Remaining blockers before PR 7

- Query × Page, Links and Page Indexing issue examples remain missing.
- Four Search Console Live URL Test records remain missing.
- Five yacht owners and eight service owners remain blocked.
- Support/legal owners and all six commercial candidates remain blocked.
- Business/entity facts needed for PR 7 schema ownership remain separately gated.
- Analytics, live reciprocal language alternates, Search Console actions and the default-Netlify-host redirect remain disabled.

PR 7 has not begun. Production deployment remains unchanged until the final branch, GitHub and Netlify gates pass and PR #15 is squash-merged under the approved workflow.
