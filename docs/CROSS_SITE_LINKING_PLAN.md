# Cross-Site Linking Plan

## Scope

Reviewed source repositories/domains:

- `yachtrentaldxb.com` (target English site)
- `yacht-dxb.com` (Arabic benchmark/equivalent)
- `evaliyacht.com`
- `evaliyachts.com`
- `theyachtrentaldubai.com`

## Current target-site finding

No cross-domain links from the `yachtrentaldxb.com` source to the other four domains were found. Its links are internal, WhatsApp, phone and remote media. Therefore there is no current reciprocal link network to preserve or remove in this repository.

Other repositories contain Evali cross-domain navigation and inherited URLs/schema. Those are not authority for this target and should not be copied.

## Risk classification

| Pattern | Risk | Decision |
| --- | --- | --- |
| Reciprocal sitewide footer links among all five domains | High | Do not create |
| Exact-match “yacht rental Dubai” links between sibling sites | High | Do not create |
| Template partner page duplicated across domains | High | Do not create |
| Branded editorial link with genuine visitor benefit | Low | Consider case by case |
| Reciprocal English/Arabic language switcher for a true equivalent | Low | Recommended only after coordinated hreflang readiness |
| Commercial placement/partner attribution | Medium | Qualify `sponsored` or `nofollow` where appropriate |

## Language-switcher plan

1. Show a switcher only when the current page has a verified true equivalent.
2. Use the exact self-canonical URL stored in each site’s manifest.
3. Start with the homepage only if both teams approve a coordinated release.
4. Add future pairs only after both pages return 200, match intent and publish reciprocal `en-AE`/`ar-AE` tags.
5. Do not send users to the other language homepage when no page equivalent exists.
6. No `x-default` until a genuine default experience is approved.

## Contextual opportunities

- A yacht detail may link to the same verified yacht in Arabic when the visitor changes language.
- An English event guide may link to its true Arabic version through the switcher, not keyword-rich promotional copy.
- A genuinely useful bilingual planning article may cite the other language with a branded anchor.
- Do not link merely because the domains share ownership.

## Anchor policy

Prefer brand names, page names and natural task-based anchors. Avoid repeated exact-match commercial anchors, hidden links, footer-wide keyword lists and cross-domain links embedded solely to influence rankings.

## Retain/remove actions

- Target current links to retain: none cross-domain.
- Target current links to remove: none cross-domain.
- Proposed new links now: none.
- Future approved link: homepage language switcher between `https://yachtrentaldxb.com/` and `https://yacht-dxb.com/`, only in the reciprocal implementation release.
