# English Event Authority Plan

## Implementation PR 6A approval-pack status

PR 6A documents the exact capability, optional-extra, safety, yacht-selection, occasion, and media decisions required before an event owner can publish. The owner approved 10 exact service owners and kept 8 blocked on 2026-07-14. Seven matching local primary-image surfaces are approved and three approved pages remain text-only. The seven occasions remain without detail routes, and the combined engagement/wedding route remains preserved without redirect pending Query × Page and links evidence.

See `ENGLISH_SERVICE_APPROVAL.md`, `ENGLISH_SERVICE_FACT_APPROVAL_PACK.md`, `ENGLISH_SERVICE_MEDIA_APPROVAL_PACK.md`, and `SERVICE_APPROVAL_DECISIONS_NEEDED.md`. PR 6B may implement only the recorded approval.

## Implementation PR 2 status

All 18 current service/event paths are represented in the typed manifest. The 2026-07-14 owner decision approves ten exact current owners for evidence-bounded publication in PR 6B and keeps eight exact owners blocked. All seven source occasions retain typed dispositions without creating detail routes. The combined engagement/wedding route remains an evidence-gated redirect candidate with no approved destination or redirect. No `Event` schema is planned.

Current event authority consists of `/services`, `/occasions`, 18 service detail records and seven occasion records without detail routes. Every current live event/hub URL except the homepage returns `404` directly. All keep/merge/create decisions below are provisional until Search Console and factual approval are available.

## Proposed taxonomy and hub

- Canonical event/service hub candidate: `/services`.
- `/occasions` should be preserved while its role is tested: it may become an occasion chooser that links to canonical service pages rather than a second competing hub.
- Categories: celebration, romantic event, family event, wedding-related event, corporate/private gathering, private experience, hospitality and water activity.

## Eighteen detail records

| Current route | Category | Provisional ownership decision | Main evidence/risk | Unique content requirement |
| --- | --- | --- | --- | --- |
| `/services/banana-boat-ride` | Water activity | Blocked | Operating, equipment, safety and location facts are unapproved | No publication in PR 6B |
| `/services/swimming` | Water activity/private experience | Blocked | Stop, support and equipment facts are unapproved | No publication in PR 6B |
| `/services/barbecue-on-the-yacht` | Hospitality | Approved for PR 6B | Requestable hospitality only; no fixed menu, cooking, supplier, route, timing or inclusion | Confirmation process, price factors and factual yacht comparison |
| `/services/fishing` | Private experience | Blocked | Equipment, bait, locations and support facts are unapproved | No publication in PR 6B |
| `/services/birthday-party` | Celebration/family | Approved for PR 6B | Clear requestable celebration owner | Group/yacht chooser, optional cake/decor/music, price factors, booking checklist |
| `/services/graduation-parties` | Celebration | Approved for PR 6B | Requestable celebration; fixed arrangements remain unapproved | Audience, group size, optional setup, yacht selection, related celebrations |
| `/services/wedding-anniversary-parties` | Romantic/wedding-related | Approved for PR 6B | Distinct requestable anniversary intent | Couple/family formats, optional dining/decor/photo, time/price factors |
| `/services/bachelor-parties` | Celebration | Approved for PR 6B | Respectful private gathering; conduct, music and setup require confirmation | Intended audience, yacht rules, suitable yachts, optional requests |
| `/services/marriage-proposal-party` | Romantic event | Approved for PR 6B | Requestable proposal owner with no included setup | Privacy and timing factors; optional styling/photo/dining requests |
| `/services/gender-reveal-party` | Family event | Blocked | Setup, safety and environmental facts are unapproved | No publication in PR 6B |
| `/services/engagement-and-wedding-parties` | Wedding-related | Blocked consolidation candidate | Overlaps two dedicated routes; Query × Page and links evidence is missing | Preserve without publication or redirect in PR 6B |
| `/services/food-menu` | Hospitality | Blocked | No approved menu, ordering, dietary or supplier facts | No publication in PR 6B |
| `/services/donut-ride` | Water activity | Blocked | Operating, equipment and safety facts are unapproved | No publication in PR 6B |
| `/services/jet-ski` | Water activity | Blocked | Operator, eligibility, equipment, safety and price facts are unapproved | No publication in PR 6B |
| `/services/afternoon-tea-trip` | Hospitality/private experience | Approved for PR 6B | Requestable hospitality only; menu, supplier, lead time and price require confirmation | Audience, confirmation process, price factors and factual yacht comparison |
| `/services/morning-yacht-trips` | Private experience | Approved for PR 6B | Requestable private experience; no fixed route, duration, departure, food or activity claim | Decision factors and factual yacht comparison |
| `/services/engagement-parties` | Wedding-related | Approved for PR 6B | Distinct requestable engagement celebration owner | Family/group planning, optional styling/catering/photo, suitable yachts |
| `/services/wedding-parties` | Wedding-related | Approved for PR 6B | Private celebration only; no legal-ceremony authority | Guest/yacht constraints, planning sequence, optional suppliers, price factors |

## Seven occasion records without detail routes

Do not automatically create seven pages.

| Occasion record | Current detail route | Decision | Reason/blocker |
| --- | --- | --- | --- |
| Birthday | None | Merge/include in hub and link to `/services/birthday-party` | Existing canonical candidate already serves intent |
| Proposal | None | Merge/include in hub and link to `/services/marriage-proposal-party` | Existing canonical candidate already serves intent |
| Corporate | None | Unresolved; create only after demand and business capability evidence | Potential distinct intent, but current record contains invented yacht slugs/add-ons |
| Fishing | None | Retain in the hub without a detail link in PR 6B | The existing `/services/fishing` owner remains blocked; no new route is created |
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
- factual FAQs and only separately approved contact actions.

Do not emit `Event` schema for private yacht services. Use `Service` and `BreadcrumbList` only when visible facts support them; do not add `FAQPage` merely for a rich-result tactic.

## Internal-link model

`/services` → approved event detail → three factual published-yacht pages. The blocked `/contact` owner is not used. Yacht pages do not gain event links in PR 6B. `/occasions` may direct users to approved canonical owners without duplicating their text. Related-event links should cross categories when useful, not form an indiscriminate all-to-all block.

## Competitor-informed opportunity

Current event competitors commonly expose packages and dramatic claims. The safer differentiator is a reliable private-event decision journey: group fit, verified yacht choices, transparent price factors, optional-versus-confirmed services, and clear next steps. The strongest initial pages are birthday, proposal, wedding/engagement and anniversary; corporate is the strongest potential missing event after business capability and demand are proven.
