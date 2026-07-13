# Yacht Approval Decisions Needed

Prepared: 2026-07-14
Production authority: `https://yachtrentaldxb.com/`

## Decision status

The owner approved the 24 source records' specified factual fields and expanded the approved media surfaces on 2026-07-14. PR 4B publishes 19 exact source-to-manifest matches after all 126 retained media URLs pass `media:verify`. Availability is always presented publicly as **on request** and reconfirmed during booking.

Five of the 24 current manifest yacht owners remain blocked: the branded 55-foot historical route, the Dynasty 151/150 conflict, and three owners without an exact approved source mapping (Sunseeker 82, Azimut 80, and the generic 120-foot route). Three approved source records (Azimut 64, Hatteras 64, Sunseeker 108) have no current manifest owner, so no new route is created.

## Decisions still needed

- Decide the 55-foot historical route owner without exposing inherited branding.
- Resolve whether Dynasty's visible length is 150 or 151 feet.
- Supply an exact approved source mapping before Sunseeker 82, Azimut 80, or the generic 120-foot owner can publish.
- Approve a manifest owner before any unmatched Azimut 64, Hatteras 64, or Sunseeker 108 source record can publish.
- PR 5 must independently select factual commercial-page yacht references; this PR does not begin that work.

## Special owner decisions

- **Historical branded 55-foot route:** choose A) temporary historical URL with neutral visible identity and non-branded authorized media; B) future neutral owner with redirect considered only after Query × Page and link evidence; or C) remain blocked. PR 4B keeps it blocked.
- **Dynasty:** choose visible 150, visible 151, or pending. The historical route remains unchanged.
- **Heysea, Doretty, and Mzaail:** approved source spellings remain visible with uncertainty documented; Codex has not guessed replacements.
- **Generic 120-foot yacht:** approve a generic name without inventing a manufacturer/model, or keep blocked.
- **Benetti:** the exact approved source record maps to the existing manifest owner and its retained media passed verification.

## Media decisions recorded

| Surface | Decision |
| --- | --- |
| Catalogue card | Approved per retained URL only after `media:verify`; prohibited branded/blocked URLs excluded |
| Yacht detail gallery | Approved per retained URL only after `media:verify` and identity confirmation |
| Homepage featured yacht | Approved for a future relevant page phase only |
| Related-yacht card | Approved per retained URL after `media:verify` |
| Commercial-page selection | Approved for a future relevant page phase only |
| Event-page selection | Not approved |
| Open Graph/Twitter | Approved for yacht detail pages only, using the verified primary image |
| Netlify Image CDN | Not approved |
| Copying, rehosting, derivatives | Not approved |

## Suggested fact-approval sentence

> I approve the yacht facts and media rows marked approved in YACHT_FACT_APPROVAL_PACK.md and ENGLISH_YACHT_MEDIA_APPROVAL_PACK.md for use on yachtrentaldxb.com, limited to the approved surfaces and values.

Identify the approved row IDs and fields or mark those cells explicitly. Do not use blanket approval where a value remains uncertain.

## Current publication gate

- Source yachts: **24**
- Publishable yachts: **19**
- Blocked manifest yachts: **5**
- Generated yacht details: **19**
- Sitemap URLs: **23**
- Approved redirects: **0**
- Approved commercial consolidations: **0**
- Implementation PR 5 begun: **No**
