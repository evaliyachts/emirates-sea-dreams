# Yacht Approval Decisions Needed

Prepared: 2026-07-14
Production authority: `https://yachtrentaldxb.com/`

## Decision status

The media-rights question is partially answered: existing English-repository yacht image URLs are approved for catalogue cards and yacht detail pages only, conditional on `media:verify`. Blocked URLs and prohibited branding are excluded. No yacht fact, name, route, Offer, description, schema, or other surface is approved.

All 24 yacht fact records remain blocked.

## Decisions still needed for every yacht

- Approve, reject, or revise the proposed public name.
- Approve the historical path, or keep a neutral-path proposal pending evidence.
- Approve length, capacity, year built, hourly AED price, and price effective date.
- Approve minimum duration; it is absent from every source record.
- Approve bedrooms as an optional field or keep it absent.
- Approve a truthful availability state, including whether `on-request` is permitted.
- Confirm that mapped images depict the yacht; technical success alone is insufficient.
- Decide whether PR 5 may calculate a price range or select publishable yachts.
- Decide whether commercial pages may reference blocked yachts. Default: **No**.

## Special owner decisions

- **Historical branded 55-foot route:** choose A) temporary historical URL with neutral visible identity and non-branded authorized media; B) future neutral owner with redirect considered only after Query × Page and link evidence; or C) remain blocked. PR 4A chooses none.
- **Dynasty:** choose visible 150, visible 151, or pending. The historical route remains unchanged.
- **Heysea, Doretty, and Mzaail:** approve or revise spellings; Codex will not guess.
- **Generic 120-foot yacht:** approve a generic name without inventing a manufacturer/model, or keep blocked.
- **Benetti:** approve every fact, public identity, media mapping, and technical result. Limited surface rights alone are insufficient.

## Media decisions recorded

| Surface | Decision |
| --- | --- |
| Catalogue card | Approved per retained URL only after `media:verify`; prohibited branded/blocked URLs excluded |
| Yacht detail gallery | Approved per retained URL only after `media:verify` and identity confirmation |
| Homepage featured yacht | Not approved |
| Related-yacht card | Not approved |
| Commercial-page selection | Not approved |
| Event-page selection | Not approved |
| Open Graph/Twitter | Not approved |
| Netlify Image CDN | Not approved |
| Copying, rehosting, derivatives | Not approved |

## Suggested fact-approval sentence

> I approve the yacht facts and media rows marked approved in YACHT_FACT_APPROVAL_PACK.md and ENGLISH_YACHT_MEDIA_APPROVAL_PACK.md for use on yachtrentaldxb.com, limited to the approved surfaces and values.

Identify the approved row IDs and fields or mark those cells explicitly. Do not use blanket approval where a value remains uncertain.

## Current publication gate

- Source yachts: **24**
- Publishable yachts: **0**
- Blocked yachts: **24**
- Generated yacht details: **0**
- Sitemap URLs: **4**
- Approved redirects: **0**
- Approved commercial consolidations: **0**
- Implementation PR 5 begun: **No**
