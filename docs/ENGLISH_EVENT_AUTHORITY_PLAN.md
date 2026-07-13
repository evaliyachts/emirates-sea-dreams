# English Event Authority Plan

## Implementation PR 2 status

All 18 current service/event paths are represented in the typed manifest and remain provisional current owners. All seven source occasions now have typed dispositions without creating detail routes. The combined engagement/wedding route remains an evidence-gated redirect candidate with no approved destination or redirect. Service publication remains blocked pending capability and factual verification; no `Event` schema is planned.

Current event authority consists of `/services`, `/occasions`, 18 service detail records and seven occasion records without detail routes. Every current live event/hub URL except the homepage returns `404` directly. All keep/merge/create decisions below are provisional until Search Console and factual approval are available.

## Proposed taxonomy and hub

- Canonical event/service hub candidate: `/services`.
- `/occasions` should be preserved while its role is tested: it may become an occasion chooser that links to canonical service pages rather than a second competing hub.
- Categories: celebration, romantic event, family event, wedding-related event, corporate/private gathering, private experience, hospitality and water activity.

## Eighteen detail records

| Current route | Category | Provisional ownership decision | Main evidence/risk | Unique content requirement |
| --- | --- | --- | --- | --- |
| `/services/banana-boat-ride` | Water activity | Keep/enrich pending evidence | Claims safety/equipment/locations without approval | Participation qualification, separate pricing, safety confirmation, suitable yacht trip context |
| `/services/swimming` | Water activity/private experience | Keep/enrich pending evidence | Promises stops, support and equipment | When swimming may be requested, conditions, guest suitability, no guaranteed stop |
| `/services/barbecue-on-the-yacht` | Hospitality | Keep/enrich pending evidence | Implies menu/route and “most requested” | Menu confirmation process, dietary questions, separate price, yacht suitability |
| `/services/fishing` | Private experience | Keep/enrich pending evidence | Equipment, bait, spots and crew expertise unverified | Experience type, equipment confirmation, duration/price factors, suitable yachts |
| `/services/birthday-party` | Celebration/family | Keep/enrich | Clear high-intent event owner | Group/yacht chooser, optional cake/decor/music, price factors, booking checklist |
| `/services/graduation-parties` | Celebration | Keep/enrich pending demand | Fixed route/custom arrangements unverified | Audience, group size, optional setup, yacht selection, related celebrations |
| `/services/wedding-anniversary-parties` | Romantic/wedding-related | Keep/enrich | Distinct anniversary intent | Couple/family formats, optional dining/decor/photo, time/price factors |
| `/services/bachelor-parties` | Celebration | Keep/enrich pending demand | Copy conflates bachelor/bachelorette and promises party setup | Intended audience, conduct/confirmation, suitable yachts, optional extras |
| `/services/marriage-proposal-party` | Romantic event | Keep/enrich | Strong differentiated intent | Privacy, timing factors, optional styling/photo/dining, contingency questions |
| `/services/gender-reveal-party` | Family event | Keep/enrich pending approval | Setup/safety/environmental facts unverified | Approved reveal methods only, guest/yacht fit, optional decor/photo, restrictions |
| `/services/engagement-and-wedding-parties` | Wedding-related | Consolidation candidate; unresolved | Overlaps two dedicated routes | Preserve until GSC; if consolidated, direct one-hop redirect based on dominant historical intent |
| `/services/food-menu` | Hospitality | Keep as supporting service or non-indexable utility pending evidence | Generic menu claims; may not merit standalone search page | Approved menu/ordering/dietary process and separate pricing |
| `/services/donut-ride` | Water activity | Keep/enrich pending evidence | Equipment/safety claims unverified | Participation, separate operator/price confirmation, conditions, suitable trips |
| `/services/jet-ski` | Water activity | Keep/enrich pending evidence | “Modern equipment,” locations and flexibility unverified | Operator/eligibility/price/availability confirmation, no implied inclusion |
| `/services/afternoon-tea-trip` | Hospitality/private experience | Keep/enrich pending evidence | Tea/menu/routes unverified | Audience, approved menu choices, timing and separate pricing |
| `/services/morning-yacht-trips` | Private experience | Keep/enrich pending evidence | Weather/calm-water/routes/food/swim claims | Why morning, decision factors, verified yacht choices, flexible route language |
| `/services/engagement-parties` | Wedding-related | Keep/enrich | Distinct engagement celebration owner | Family/group planning, optional styling/catering/photo, suitable yachts |
| `/services/wedding-parties` | Wedding-related | Keep/enrich | Distinct wedding celebration owner | Guest/yacht constraints, planning sequence, optional suppliers, price factors |

## Seven occasion records without detail routes

Do not automatically create seven pages.

| Occasion record | Current detail route | Decision | Reason/blocker |
| --- | --- | --- | --- |
| Birthday | None | Merge/include in hub and link to `/services/birthday-party` | Existing canonical candidate already serves intent |
| Proposal | None | Merge/include in hub and link to `/services/marriage-proposal-party` | Existing canonical candidate already serves intent |
| Corporate | None | Unresolved; create only after demand and business capability evidence | Potential distinct intent, but current record contains invented yacht slugs/add-ons |
| Fishing | None | Merge/include in hub and link to `/services/fishing` | Existing canonical candidate already serves intent |
| Sunset cruise | None | Include in hub; page creation unresolved | Could overlap offers/private trips; fixed routes and inclusions unverified |
| New Year’s Eve | None | Retain as non-indexable data or remove until seasonal facts approved | “All-inclusive,” open bar, fireworks position and duration are unverified |
| Photoshoot | None | Include in hub; page creation unresolved | Could support events but suppliers, drone use and yacht slugs are unverified |

## Required page content contract

Each surviving detail page needs a unique title, description, H1, introduction, direct answer, section-heading set and FAQ set. It should explain:

- who the service is for;
- verified group/yacht constraints;
- recommended duration only when verified, otherwise duration factors;
- verified price or price factors;
- request and confirmation steps;
- which extras are optional, separately priced and subject to confirmation;
- exactly suitable verified yachts selected by factual capacity/use case;
- related but non-duplicative events;
- factual FAQs and WhatsApp/phone actions.

Do not emit `Event` schema for private yacht services. Use `Service` and `BreadcrumbList` only when visible facts support them; do not add `FAQPage` merely for a rich-result tactic.

## Internal-link model

`/` → `/services` → event detail → three suitable verified yacht pages → `/contact`. Yacht pages may link back to a small number of genuinely suitable events. `/occasions` should direct users to canonical owners, not duplicate their text. Related-event links should cross categories when useful, not form an indiscriminate all-to-all block.

## Competitor-informed opportunity

Current event competitors commonly expose packages and dramatic claims. The safer differentiator is a reliable private-event decision journey: group fit, verified yacht choices, transparent price factors, optional-versus-confirmed services, and clear next steps. The strongest initial pages are birthday, proposal, wedding/engagement and anniversary; corporate is the strongest potential missing event after business capability and demand are proven.
