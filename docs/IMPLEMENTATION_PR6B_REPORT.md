# English Implementation PR 6B Report

Prepared: 2026-07-14

Branch: `agent/english-pr6b-approved-service-pages`

Base merge: `17a7683b2d29d169c85af4b7a3d2b424afe41e8a`

Pull request and final head: recorded after the draft pull request is published

## Scope

PR 6B publishes only the ten service owners authorized in `ENGLISH_SERVICE_APPROVAL.md`. It creates no route, redirect, consolidation, occasion detail, commercial candidate, legal page, analytics integration, language alternate, Search Console action or production-host redirect.

The intended manifest stays at 52 records: 10 static/hub/support, 24 yacht and 18 service/event. Publication increases from 23 to 33 owners by adding ten approved service details. Nineteen manifest owners remain blocked.

## Strict service contract

`src/data/approved-services.ts` defines a strict, unknown-field-rejecting record for each approved page. Every record owns:

- one exact existing manifest ID, slug and path;
- a unique title, description, H1, introduction, direct answer, section set and FAQ set;
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

The services hub links all ten approved owners. The occasions hub links existing approved birthday, proposal, engagement, wedding and anniversary owners without creating an occasion slug. Fishing remains hub-only with its detail owner blocked.

## Media

Seven pages use the exact local homepage snapshot approved for that matching service-detail surface. Bachelor parties, afternoon tea and morning trips remain text-only. No historical remote service image, inherited branded media, event-page yacht image or service social-preview image is emitted.

`media:verify` checks the seven local files, decoded dimensions, exact rights ID and service-path surface. The existing 126 yacht images and 15 homepage images remain unchanged.

## Metadata and schema

The manifest records unique approved metadata for all ten pages. Canonicals and Open Graph URLs use exact non-trailing English paths on `https://yachtrentaldxb.com`. Service pages emit no Open Graph or Twitter image and no live `hreflang` or `x-default`.

Each service page emits one JSON-LD graph with exactly `Service` and `BreadcrumbList`. It emits no `Event`, `FAQPage`, `Product`, `Offer`, `Review`, `AggregateRating`, rating or `LocalBusiness` node.

## Output and validation

Final local, GitHub Quality, Netlify Deploy Preview and deployed HTTP results are recorded in the pull-request description after the final head is pushed. The required local gate is:

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

PR 7 has not begun. Production deployment remains unchanged until this draft is reviewed and separately authorized for merge.
