# English Analytics Approval

Prepared: 2026-07-14

Status: **owner-approved disabled for PR 8B**

No GA4, GTM, `dataLayer`, `gtag`, Meta Pixel, advertising tags, consent mode, analytics cookies or conversion events are approved.

No runtime `dataLayer`, `gtag`, Google Analytics measurement ID or Google Tag Manager container is present. This document does not enable tracking.

## Decision register

Decision | Current state | Owner decision
--- | --- | ---
Analytics enabled | Disabled | pending
Approved measurement destination | None configured | pending
GA4 measurement ID | None configured | pending
Tag Manager container | None configured | pending
Consent requirement/mechanism | Not decided | pending
Approved contextual properties | Not decided | pending
Privacy-copy alignment | Legal approval not supplied | pending

If the destination, consent or privacy decision remains pending, PR 8B must keep analytics disabled and must not create `window.dataLayer`.

## Candidate conversion events

Only these event names may be considered after approval:

- `whatsapp_click`
- `phone_click`
- `booking_form_start`
- `booking_form_submit`

The event-name allowlist does not itself approve collection or a destination. `booking_form_submit` must represent a valid submission outcome defined by the approved contact workflow; opening WhatsApp is not a confirmed booking.

## Contextual properties requiring approval

Potential non-personal context is limited to values such as route path, interface placement and a non-personal form identifier. The exact allowlist is pending. Never include a query string or any value derived from form content.

## Prohibited analytics properties

- name;
- phone or WhatsApp number;
- email;
- requested date or time;
- guest count;
- yacht selection or interest;
- occasion selection;
- notes or free-text message;
- prepared WhatsApp message;
- full URL query;
- complete or serialized form state;
- any other submitted personal value or stable personal identifier.

## Approval record

- Analytics choice: pending
- Destination: pending
- Consent decision: pending
- Context-property allowlist: pending
- Approver: pending
- Approval date: pending
- Privacy-copy reference: pending
