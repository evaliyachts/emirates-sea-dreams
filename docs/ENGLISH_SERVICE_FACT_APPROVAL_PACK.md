# English Service Fact Approval Pack

Prepared: 2026-07-14

Production authority: `https://yachtrentaldxb.com/`

Status: **owner decisions pending; no service detail is approved for publication**

## Purpose and boundary

This documentation-only PR prepares the fact decisions required before English Implementation PR 6 can publish any of the 18 historical service/event owners. Repository source is evidence of inherited implementation, not proof that a capability, supplier, inclusion, price, route, duration, safety measure, or operating process is currently offered.

PR 6A does not change React routes, static output, metadata, sitemap membership, redirects, schema, visible content, yacht records, media registries, or production behavior. The current 18 service detail paths remain blocked and the public sitemap remains at 23 URLs.

## Proposed strict publication contract

Each future service record must explicitly store and validate only approved values:

- stable source ID and exact historical manifest path;
- approved public display name;
- one approved category: `celebration`, `private-experience`, `hospitality`, or `water-activity`;
- whether the business currently accepts requests for the service;
- whether delivery is direct, third-party, or unresolved;
- availability wording, defaulting to **on request** unless a narrower approved rule exists;
- price or price factors only when approved;
- optional extras, each marked subject to confirmation and separate pricing unless evidence says otherwise;
- service-specific restrictions, safety qualifications, permits, suppliers, and operating conditions when applicable;
- exactly three approved yacht selections, or an explicit decision to omit yacht selections;
- approved media rights IDs, if media is used;
- publication status and unresolved blockers.

Unknown fields must be rejected. The inherited `description`, source category, gallery, routes, landmarks, inclusions, packages, provider claims, and safety claims are not approved by this pack.

## Eighteen historical service owners

| Source ID | Exact current path | Source title | Proposed category | Approval required before publication | Inherited claims that remain rejected |
| ---: | --- | --- | --- | --- | --- |
| 5 | `/services/banana-boat-ride` | Banana Boat Ride | Water activity | Confirm the activity is requestable; operator relationship; rider qualification; safety process; equipment; weather/sea limits; price basis; three yacht selections | Safe ride, life jackets, crew guidance, adjustable speed, fixed landmark area, universal group suitability |
| 6 | `/services/swimming` | Swimming | Private experience / water activity | Confirm whether swimming may be requested; who decides if/where it is permitted; supervision/equipment; guest restrictions; three yacht selections | Guaranteed swimming stop, clear-water or landmark route, crew support, life jackets, complete privacy, universal suitability |
| 7 | `/services/barbecue-on-the-yacht` | Barbecue on the Yacht | Hospitality | Confirm whether BBQ is requestable; onboard cooking versus prepared delivery; menu process; dietary handling; separate price; three yacht selections | Published menu, freshly grilled items, fixed route, “most requested” status, universal availability |
| 8 | `/services/fishing` | Fishing | Private experience / water activity | Confirm business capability; operator/crew role; permits; equipment and bait; participant restrictions; duration/price factors; three yacht selections | Experienced fishing crew, selected spots, equipment, bait, sightseeing combination, beginner suitability |
| 9 | `/services/birthday-party` | Birthday Party | Celebration | Confirm birthday requests; permissible optional setup; supplier responsibilities; conduct limits; price factors; three yacht selections | Package, decorations, cake, music, food, drinks, professional crew service, fixed landmarks, guaranteed party format |
| 11 | `/services/graduation-parties` | Graduation Parties | Celebration | Confirm graduation requests; optional setup process; supplier responsibilities; price factors; three yacht selections | Themed decoration, cake, music, photography, food, custom route, universal school/university suitability |
| 12 | `/services/wedding-anniversary-parties` | Wedding Anniversary Parties | Celebration | Confirm anniversary requests; optional dining/styling/photo process; supplier roles; price factors; three yacht selections | Flowers, candles, music, dinner, cake, sunset/evening cruise, fixed landmarks, privacy and package promises |
| 13 | `/services/bachelor-parties` | Bachelor Parties | Celebration | Confirm intended audience and naming; capability; conduct restrictions; optional setup; supplier roles; price factors; three yacht selections | Bride/bachelorette conflation, music, decoration, food, drinks, fixed routes, daytime/evening formats, premium promise |
| 14 | `/services/marriage-proposal-party` | Marriage Proposal Party | Celebration / private experience | Confirm proposal requests; privacy limitations; optional styling/photo/dining; supplier roles; timing factors; three yacht selections | Package, flowers, candles, balloons, “Marry Me” setup, cake, music, dinner, photography, sunset/evening route, complete privacy |
| 15 | `/services/gender-reveal-party` | Gender Reveal Party | Celebration | Confirm whether requests are accepted; explicitly approved reveal methods; environmental and safety restrictions; optional setup; three yacht selections | Package, balloons, cake, reveal setup, music, photography, food, drinks, family-friendly routes, landmark backdrop |
| 16 | `/services/engagement-and-wedding-parties` | Engagement and Wedding Parties | Celebration | Preserve the path pending Query × Page and links evidence; confirm capability; do not consolidate or redirect; define a distinct role if publication is approved | Combined package, flowers, cake, DJ/live music, catering, photography, full coordination, privacy, skyline promise |
| 17 | `/services/food-menu` | Food Menu | Hospitality | Decide indexable detail versus supporting/non-indexable utility; approve menu/ordering process, dietary handling, supplier, lead time, pricing; three yacht selections if indexable | Fixed menu categories, universal availability, pre-departure arrangement, premium dining setup, event-wide availability |
| 18 | `/services/donut-ride` | Donut Ride | Water activity | Confirm the activity is requestable; operator relationship; rider qualification; safety/equipment; sea limits; price basis; three yacht selections | Safe ride, life jackets, crew support, speed options, beginner/thrill-seeker suitability, universal party add-on |
| 19 | `/services/jet-ski` | Jet Ski | Water activity | Confirm supplier/operator model; eligibility/licensing; equipment; safety process; operating area; availability and price; three yacht selections | Modern equipment, safety guidance, flexible booking, fixed landmarks, high-speed experience availability |
| 20 | `/services/afternoon-tea-trip` | Afternoon Tea Trip | Hospitality / private experience | Confirm the service exists; menu/supplier; timing; dietary handling; separate price; three yacht selections | Premium teas, light bites, desserts, calm music, fixed routes, audience suitability, luxury atmosphere |
| 22 | `/services/morning-yacht-trips` | Morning Yacht Trips | Private experience | Confirm that morning requests are accepted; timing window; operating constraints; optional food/swimming process; three yacht selections | Cooler weather, calm water, breakfast, fresh drinks, swimming stops, sightseeing route, “best way” claim |
| 23 | `/services/engagement-parties` | Engagement Parties | Celebration | Confirm engagement requests; optional setup/supplier roles; conduct limits; price factors; three yacht selections | Flowers, balloons, ring setup, music, cake, catering, photography, custom route, luxury/privacy promises |
| 24 | `/services/wedding-parties` | Wedding Parties | Celebration | Confirm wedding requests and permissible formats; supplier roles; legal/ceremony limitations; optional setup; price factors; three yacht selections | Wedding ceremony support, decoration, cake, dining, music, photography, full coordination, venue-equivalence claims |

## Global publication decisions required

Owner approval must explicitly answer these questions:

1. Which of the 18 services are currently requestable through `yachtrentaldxb.com`?
2. For each requestable service, is fulfillment direct, third-party, or intentionally undisclosed?
3. Should every public availability statement say “on request and subject to confirmation”?
4. Are all decorations, cake, catering, photography, music, BBQ, Jet Ski, banana boat, donut ride, swimming, fishing, tea, and other additions optional and separately priced unless the booking confirmation states otherwise?
5. Which water-activity safety, eligibility, supplier, permit, weather, and operating facts are approved for visible publication?
6. Which three current publishable yacht IDs are approved for each service, or may PR 6 omit a selection where suitability is unverified?
7. Is `/services/food-menu` an indexable standalone owner, a supporting non-indexable utility, or still blocked?
8. Is the combined engagement/wedding path kept blocked pending Search Console evidence, or approved for a genuinely distinct role without redirecting it?
9. Which contact channel and business identity may the service pages use? Current business identity, phone, WhatsApp, and operational facts remain pending in `ENGLISH_BUSINESS_FACTS.md`.

## Seven occasion dispositions

No occasion detail route is proposed in PR 6A.

| Occasion | Existing owner/hub | Current disposition | Owner decision needed |
| --- | --- | --- | --- |
| Birthday | `/services/birthday-party` | Represented by existing service owner | Confirm the birthday service capability; no `/occasions/birthday` route |
| Proposal | `/services/marriage-proposal-party` | Represented by existing service owner | Confirm proposal capability; no duplicate route |
| Corporate | `/occasions` | Unsupported pending capability | Confirm whether corporate requests are offered; page creation remains false |
| Fishing | `/services/fishing` | Duplicate of existing event intent | Confirm fishing capability; keep one owner |
| Sunset cruise | `/occasions` | Future page candidate pending evidence | Keep hub-only unless capability and demand evidence approve a page |
| New Year’s Eve | `/occasions` | Unsupported pending capability | Keep non-indexable/hub-only; do not restore all-inclusive, open-bar, fireworks, route, or duration claims |
| Photoshoot | `/occasions` | Represented by hub pending capability | Confirm supplier, drone, permit, privacy, and media rules before any page creation |

## Facts this approval pack cannot establish

- current Search Console query/page performance or link value;
- service availability on a specific date;
- safe operating conditions or regulatory compliance;
- prices, packages, deposits, refunds, cancellation, insurance, or payment methods;
- a public address, departure location, hours, social profiles, or response time;
- media ownership or reuse rights;
- yacht compatibility beyond separately approved yacht selections.

## Suggested owner response format

> For yachtrentaldxb.com, I approve service source IDs [list] as requestable services. Availability is on request and must be reconfirmed. I approve only the following service facts and optional items: [list per service]. Optional items are subject to confirmation and separate pricing unless explicitly stated otherwise. I approve these three publishable yacht IDs for each service: [mapping]. All other inherited claims remain rejected.

Water activities, food/hospitality, the combined engagement/wedding owner, business contact facts, and media scope should be approved explicitly rather than inferred from a blanket statement.
