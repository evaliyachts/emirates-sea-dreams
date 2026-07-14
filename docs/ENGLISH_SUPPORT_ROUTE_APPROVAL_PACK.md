# English Support Route Approval Pack

Prepared: 2026-07-14

Status: **all six owner decisions are `pending`**

This pack records the current source and production state. It does not publish a route, remove a link, change the sitemap, approve content, or choose an indexability outcome.

## Shared current state

- `/about`, `/faq`, `/contact` and `/offers` are in `NAV_LINKS`, which renders in the desktop/mobile header and the footer Quick Links list.
- `/terms` and `/privacy` are linked in the footer legal row.
- The blocked `/offers` component also links to `/contact`, but that component is not in production static output.
- React Router contains all six historical components, while Netlify intentionally has no 200 rewrite for them.
- Each exact production URL returned HTTP 404 on 2026-07-14.
- None is in the current 33-URL sitemap.
- The manifest preserves each as a provisional historical owner pending verification.

## `/about`

- Current HTTP status: 404.
- Current link locations: header navigation and footer Quick Links through `NAV_LINKS`.
- Intended purpose: explain the service provider using owner-approved facts.
- Facts visible in source: `Dubai Yacht`; “premier” luxury company; passion/founding story; “our fleet”; Dubai Marina base; global guests; professional/expert crew; licensing, insurance, maintenance and safety claims.
- Unsupported claims found: company superlatives, trusted status, fleet ownership, licensing, insurance, crew expertise/tenure, universal maintenance/safety standards, fixed base and worldwide service.
- Required approved content: exact description; years/founding date if used; owner/intermediary role; permitted trust/licensing/insurance claims with evidence; departure process; service area; staff/crew claims; approved entity/contact details.
- Proposed indexability: indexable only after business approval and evidence-safe rewrite.
- Proposed sitemap membership: include only after it becomes a direct canonical 200.
- Proposed structured-data ownership: `Organization` and `BreadcrumbList`; do not expand Organization with pending facts.
- Owner decision: pending (`publish indexable`, `publish noindex`, `remain blocked`, `remove links temporarily`, or `revise`).

## `/faq`

- Current HTTP status: 404.
- Current link locations: header navigation and footer Quick Links through `NAV_LINKS`.
- Intended purpose: answer verified planning and policy questions without creating binding promises.
- Facts visible in source: booking by WhatsApp/phone/form; instant availability; 48-hour lead-time advice; 50% deposit; fixed price bands; captain/crew/fuel/basic amenities included; food/drinks, catering, music/DJ, children/life jackets; free weather rescheduling/refund; 48-hour cancellation window/charge; adult-ID requirement.
- Unsupported claims found: every listed operational, inclusion, price, payment, cancellation, refund, weather, safety and response assertion remains unapproved.
- Required approved content: owner-approved answers to every question in the FAQ decision list below.
- Proposed indexability: indexable only after all published answers are approved; no `FAQPage` is proposed solely for rich-result eligibility.
- Proposed sitemap membership: include only after it becomes a direct canonical 200.
- Proposed structured-data ownership: `BreadcrumbList` only.
- Owner decision: pending (`publish indexable`, `publish noindex`, `remain blocked`, `remove links temporarily`, or `revise`).

Required FAQ answer decisions, all pending:

- booking process; availability; payment process; deposit; cancellation; refund; rescheduling;
- weather and operational changes; route handling; departure location; inclusions; optional extras;
- children; identification; late arrival; yacht capacity; response time.

## `/contact`

- Current HTTP status: 404.
- Current link locations: header navigation and footer Quick Links through `NAV_LINKS`; also linked from the blocked Offers component.
- Intended purpose: provide approved contact methods and an accurate request workflow.
- Facts visible in source: current phone and derived WhatsApp; “instant booking,” “instant availability,” and “instant response”; a form collecting name, phone, email, date, guests, yacht and message; browser-console logging; a success toast claiming submission and a one-hour response; Dubai Marina Dock; daily 6:00 AM–11:00 PM and 24/7 support.
- Unsupported claims found: contact values, destination/processing behavior, successful transmission, response time, marina wording and operating hours.
- Required approved content: exact phone, WhatsApp and email; approved fields; processing destination; transmission behavior; response wording; success/failure behavior; popup fallback; privacy notice.
- Proposed indexability: indexable only after contact facts, behavior and privacy disclosure are approved and implemented accurately.
- Proposed sitemap membership: include only after it becomes a direct canonical 200.
- Proposed structured-data ownership: `BreadcrumbList`; `ContactPoint` remains a central entity decision and may not be emitted from pending values.
- Owner decision: pending (`publish indexable`, `publish noindex`, `remain blocked`, `remove links temporarily`, or `revise`).

Contact decisions, all pending:

- phone; WhatsApp; email; form fields; contact destination; response-time wording;
- whether form values are transmitted or only used to prepare WhatsApp;
- truthful success message; blocked-popup fallback; privacy notice.

## `/offers`

- Current HTTP status: 404.
- Current link locations: header navigation and footer Quick Links through `NAV_LINKS`.
- Intended purpose: unresolved; the owner must choose one of the five roles below.
- Facts visible in source: three fixed packages with durations, prices, badges, routes and inclusions; sunset/party/VIP claims; drinks, catering, decorations, DJ/sound, swimming, water toys/sports, Jet Ski, chef, photography, coordinator and all-inclusive bar; custom/corporate/wedding packages.
- Unsupported claims found: all package availability, prices, discounts/value badges, durations, routes, inclusions and supplier/activity promises.
- Required approved content: chosen page role, dated/effective prices if any, source evidence, availability limits, expiry/review policy and approved optional-versus-included wording.
- Proposed indexability: pending the owner’s page-role decision.
- Proposed sitemap membership: pending; never include while blocked or unless it becomes an approved indexable canonical 200.
- Proposed structured-data ownership: `Service` and `BreadcrumbList` only if supported by final visible content.
- Owner decision: pending (`publish indexable`, `publish noindex`, `remain blocked`, `remove links temporarily`, or `revise`).

Choose exactly one Offers direction, all currently pending:

1. factual yacht-pricing guide;
2. temporary-offer page using dated, verified offers;
3. non-indexable utility page;
4. remove its navigation links while it remains blocked;
5. retain it for a later phase.

Do not publish fake discounts, expired offers, “book two hours, get one free,” fixed packages, all-inclusive promises, stale prices, or unapproved Jet Ski/activity inclusions.

## `/terms`

- Current HTTP status: 404.
- Current link locations: footer legal row.
- Intended purpose: publish business-approved English terms governing website and service requests.
- Facts visible in source: 50% deposit; balance on charter day; bank transfer/card/cash; free cancellation before 48 hours; 50% charge inside 48 hours; adult ID; captain authority; free weather rescheduling/full refund; full maritime insurance; belongings/damage liability.
- Unsupported claims found: all listed booking, payment, cancellation, refund, rescheduling, insurance, safety, ID and liability terms.
- Required approved content: the complete Terms decision set in `ENGLISH_LEGAL_APPROVAL_PACK.md`, responsible entity/contact and effective date.
- Proposed indexability: indexable only after exact owner/legal approval.
- Proposed sitemap membership: include only after it becomes a direct canonical 200.
- Proposed structured-data ownership: `BreadcrumbList` only.
- Owner decision: pending (`publish indexable`, `publish noindex`, `remain blocked`, `remove links temporarily`, or `revise`).

## `/privacy`

- Current HTTP status: 404.
- Current link locations: footer legal row.
- Intended purpose: accurately disclose actual data collection, processing, recipients and user rights.
- Facts visible in source: collection of name/email/phone/preferences; use solely for bookings; no sale/sharing; unspecified security measures; privacy contact by WhatsApp/contact form.
- Unsupported claims found: purpose limitation, no-sharing promise, security assurance, contact identity and omission of actual hosting/media/technical-log/retention/right details.
- Required approved content: the complete Privacy decision set in `ENGLISH_LEGAL_APPROVAL_PACK.md`, responsible entity/contact and effective date.
- Proposed indexability: indexable only after exact owner/legal approval.
- Proposed sitemap membership: include only after it becomes a direct canonical 200.
- Proposed structured-data ownership: `BreadcrumbList` only.
- Owner decision: pending (`publish indexable`, `publish noindex`, `remain blocked`, `remove links temporarily`, or `revise`).

## Route sign-off

Route | Owner decision | Approved content reference | Approver | Approval date
--- | --- | --- | --- | ---
`/about` | pending | pending | pending | pending
`/faq` | pending | pending | pending | pending
`/contact` | pending | pending | pending | pending
`/offers` | pending | pending | pending | pending
`/terms` | pending | pending | pending | pending
`/privacy` | pending | pending | pending | pending
