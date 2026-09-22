# Yacht Rental DXB: Content, SEO and Booking Audit

Audit date: 23 September 2026, Asia/Dubai. Domain: https://yachtrentaldxb.com.

## Release Record

- CURRENT PRODUCTION COMMIT: `82acfbaae29d3d1c1f8f1c5c378702bb6e9228b4`, branch `main`.
- Production deploy: `6a60af0feab5c90008b1ca57`, confirmed in the authenticated Netlify dashboard.
- NEW COMMIT: see the tested application commit and final PR head in [verification.json](verification.json).
- PR: https://github.com/evaliyachts/emirates-sea-dreams/pull/24
- DEPLOYMENT: https://deploy-preview-24--yachtrentaldxb.netlify.app/ (review only).
- FILES CHANGED: [files-changed.txt](files-changed.txt).
- Production was NOT deployed. No DNS, nameserver, registrar, Search Console, indexing, Ads or other-site changes were made.

## Scope and Baseline

This is a live-production and source audit, not a source-only SEO assessment. Before functional edits, all 38 sitemap pages were fetched and rendered in Chromium at 390 x 844. Initial HTML, response headers, titles, descriptions, H1s, canonicals, robots directives, JSON-LD, internal links, image attributes and content were recorded. Desktop homepage and representative mobile screenshots were inspected. An additional 37 status probes covered blocked routes, query variants, unknown URLs and host behavior; another 111 probes covered every inner route's slash, clean .html and generated-file variants.

Repository: `emirates-sea-dreams-clone`. React 18, React Router 6, TypeScript, Vite 5, Tailwind, Vitest. Build scripts prerender route-specific HTML into `dist/index.html` and `dist/_static/**/*.html`; Netlify uses exact route rewrites, not a wildcard SPA fallback. Definitions live in `seo/`, business facts in `src/config/site-facts.ts`, yacht facts in `src/data/yachts.ts`, approved services in `src/data/approved-services.ts`, media approvals in the associated registries and approval packs.

Baseline lint, configured typecheck, 108 tests, build and static SEO checks passed. A deeper check later exposed that the original root `tsc --noEmit` command did not check application files. The same errors were reproduced against the untouched baseline checkout. The review branch corrects the command and resolves the underlying nullability/configuration issues. No dependencies were upgraded.

Evidence: [before.json](before.json), [after.json](after.json), [browser-before.json](browser-before.json), [browser-after.json](browser-after.json), [production-aliases.json](production-aliases.json), [alias-browser.json](alias-browser.json), [performance.json](performance.json).

## A. Executive Summary

**No current site-wide crawl/indexing block was reproduced on the 38 canonical pages.** Each returned direct HTTPS 200, initial page-specific content, one title, one description, one H1, `index, follow`, and a self-referencing production canonical. robots.txt and sitemap.xml returned 200. There were no duplicate sitemap entries or titles/descriptions.

**The visibility-drop cause is not established.** The repository contains historical June/July Search Console findings, including severe under-indexing and previously broken inner routes. Those are not evidence that today's canonical routes are broken, nor proof that a recent algorithm update caused the reported decline. A current date/query/page/device/country comparison, Google-selected canonicals and crawl evidence are still needed. No ranking-recovery promise is made.

| Priority | Finding | Review action |
| --- | --- | --- |
| High | Customer copy repeatedly discusses verification, publishing rules and SEO synonyms instead of helping customers book. | Rewritten into yacht comparison, event planning and booking guidance. |
| High | Mobile homepage lacks immediate commercial actions; yacht pages require unnecessary detours to contact. | Above-fold WhatsApp/call/fleet links, persistent mobile contact bar and contextual enquiry messages. |
| High | Clicking a yacht retains catalogue scroll position; 404 recovery links keep the forced error view. | Route-change scroll reset and real document navigation from 404 pages. |
| Medium | Native initial HTML omits home/FAQ accordion answers. | Native details/summary disclosures include answers before JavaScript and remain usable without it. |
| Medium | All yacht descriptions use nearly identical thin boilerplate, despite useful underlying facts. | Individual facts, minimum base cost, rental-cost examples and capacity-related comparison links. |
| Medium | Generated .html aliases return 200 but hydrate to noindex error pages. | Exact alias cleanup recommended for approval; no redirects added here. |
| Medium | Business identity/location/policies and operator relationship are insufficiently documented. | Explicit owner evidence list; no invented details. |
| Medium | Shared supplier fleet/media across related domains; several service intents overlap. | Evidence and intent review below; no cross-domain canonicals or automatic consolidation. |
| Medium | Oversized responsive image delivery and substantial first-load JavaScript. | Smaller bundle and fewer service images; remaining performance work documented. |
| Medium | Unsupported dormant reviews and fixed-price package data can be accidentally reused. | Cleared those two data arrays; Offers remains unpublished as already required. |

Google's policies distinguish keyword stuffing and doorway abuse from legitimate navigation, product pages and accessible expandable content. Similar templates or a shared booking destination are not, by themselves, proof of abuse. This audit finds risk factors, not a proven Google penalty. [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)

## B. URL Audit

The complete required table, including all 38 canonical URLs, purpose, HTTP status, indexability, canonical classification, before/after titles and H1s, content quality, duplicate risk and action is in [URL-AUDIT.md](URL-AUDIT.md).

[CONTENT-INTENTS.md](CONTENT-INTENTS.md) answers the eight content-quality questions for every published page. HTTP/canonical recommendations for aliases and unpublished paths are included in the URL appendix. Technical indexability is not the same as Google's actual indexed status.

## C. Keyword Stuffing and Over-Correction

No live all-caps keyword chain, exact-match strong-tag stuffing, hidden keyword block or city-link farm was found in the inspected canonical output. The larger current problem is over-correction:

| Location | Before | Review change |
| --- | --- | --- |
| Homepage hero and fleet | Verification-led title and repeated references to published records. | Clear private-yacht offer, actual price/capacity and direct actions. |
| Homepage rental guide | Explains rental/hire/charter synonyms and internal publication rules. | Three booking steps: choose, check availability, review quote. |
| Service pages | Repeated request boundaries dominate each introduction and CTA. | Distinct practical planning questions for each occasion, with proportionate pricing/availability caveats. |
| Yacht pages | Generic verification text repeated for every vessel. | Yacht-specific length, year, capacity, bedrooms, hourly rate and minimum base cost. |
| Footer/directory | Internal publishing vocabulary. | Customer-oriented labels; useful existing links retained. |

Across the captured main-content text, occurrences of “verified” fall from 210 to 0; “published” from 190 to 11; “confirmation” from 206 to 81; “synonym” from 1 to 0. These are descriptive counts, not SEO density targets. Legal and necessary booking caveats remain. Legitimate yacht-rental language is retained.

The dormant `src/data/services.ts` feed still contains inherited promotional paragraphs and location strings. It is not imported by the route tree; approved service records are the runtime source. Do not reactivate it without reviewing business claims and media rights.

## D. Questionable Claims

“VERIFIED” below means supported by the approved project records, not a new independent inspection or a promise of current availability.

| Claim | Location | Status | Action |
| --- | --- | --- | --- |
| 19 listed yachts; 42-143 feet; 12-130 guests; AED 500-5,000/hour; 2-4 hour minimum | Home, fleet, yacht pages | VERIFIED | Derive from the 19 publishable records; do not imply 19 company-owned yachts. |
| Each yacht's dimensions, capacity, year, bedrooms and rate | Yacht pages and Offer schema | VERIFIED | Preserve approved data exactly. Owner should maintain current rates and specifications. |
| Minimum base price and duration examples | Yacht pages | VERIFIED | Arithmetic from rate and duration, labelled estimates rather than final inclusive prices. |
| Live availability or a confirmed booking | Contact/actions | CONDITIONAL | Customer supplies date/time/group; team confirms options and written booking details. |
| Decorations, cake, food, photography and other extras | Services | CONDITIONAL | Optional arrangements with separate prices and supplier/date checks; not automatic inclusions. |
| 4/5-star named testimonials | Dormant testimonials.ts | REMOVED | No consent/source/transaction evidence. Empty array; no replacement testimonials invented. |
| AED 999 / 2,499 / 5,999 package prices; “Most Popular”, “Best Value” | Dormant offers.ts | REMOVED | No approved package contract. Empty array; no published URL removed. |
| Drinks, catering, crew, private chef, water toys, jet ski, photography and VIP decorations bundled in those packages | Dormant offers.ts | REMOVED | Removed unsupported package entries, not legitimate approved yacht facts. |
| Safe water activities, fishing equipment, crew support, fixed landmarks/routes, breakfast and favourable morning conditions | Dormant services.ts | OWNER CONFIRMATION REQUIRED | Not rendered. Keep excluded; obtain operational facts before reuse. |
| Jacuzzi implied by preserved historical yacht slugs | Several yacht URLs | OWNER CONFIRMATION REQUIRED | Do not infer a facility from a slug; preserve URLs pending evidence, ask owner for actual feature records. |
| Dubai Yacht public brand, +971504641020, approved social URLs and named responsible person | Header/footer, contact, About, legal | VERIFIED | Backed by site-facts and approval records; phone destination unchanged. |
| Legal company name, licence, insurance, office address, hours, fleet ownership | Missing/unapproved business records | OWNER CONFIRMATION REQUIRED | Do not fabricate or add to schema. |
| “#1”, best/lowest price, guaranteed booking, guaranteed availability, 100%, awards, thousands of customers, 50% discounts, 24/7 concierge, Michelin, butler | Canonical rendered pages | OWNER CONFIRMATION REQUIRED | Not found as affirmative live promises. No such claims added; evidence required before future use. |

Negative legal wording such as “no guaranteed remedy” and CSS percentages are not affirmative marketing claims. No legitimate promotional phrase was removed simply for sounding commercial.

## E. Duplication and Doorway Risk

| Cluster | Classification | Why / recommended action |
| --- | --- | --- |
| Homepage and /yachts | UNIQUE ENOUGH TO INDEX | Overview/brand versus complete, filterable yacht comparison. Keep distinct roles. |
| 19 yacht details | UNIQUE ENOUGH TO INDEX | Different named products, galleries and specifications. Shared structure is appropriate; improve owner-supplied facility/layout descriptions rather than merge different vessels. |
| /services and /occasions | NEEDS MORE DIFFERENTIATION | Both help choose an occasion and ultimately use the same catalogue/contact. Services now links the 10 detailed guides; Occasions is a broader trip-purpose chooser. Validate whether users actually need both before consolidation. |
| Birthday, proposal, anniversary, engagement, wedding, graduation, bachelor guides | NEEDS MORE DIFFERENTIATION | Formerly similar caveats, three yacht cards, same CTA and shared template. New planning tasks differ materially (surprise logistics, supplier access, guest lists, speeches, layout, timing). Real event examples and owner-specific constraints are still missing. Retain pending evidence, not small synonym substitutions. |
| Morning, afternoon tea and barbecue guides | NEEDS MORE DIFFERENTIATION | Timing/return constraints versus dietary/service/menu questions now differ, but actual hospitality capabilities and menus need owner evidence. No invented offerings. |
| Combined engagement-and-wedding historical path | TRUE CONSOLIDATION CANDIDATE | Broad combined intent overlaps two dedicated guides. It already returns 404. No redirect target selected without historical query/link evidence. |
| Generated /_static/*.html and /index.html aliases | TRUE CONSOLIDATION CANDIDATE | Same initial documents as clean URLs, followed by mismatched client error views. Technical aliases, not distinct customer pages. Recommend exact canonical redirects after hosting-loop tests and approval. |
| Rental/rent/hire/charter/booking/luxury keyword candidates | TRUE CONSOLIDATION CANDIDATE | Six historical proposals have no approved unique journey and currently return 404. Keep uncreated; map broad rental language to existing home/fleet/contact, not new keyword pages. |
| About, contact, FAQ, terms, privacy | UNIQUE ENOUGH TO INDEX | Separate company, enquiry, planning and policy functions. No merge recommended. |

Do not mechanically interpret shared WhatsApp destinations as doorway abuse. Conversely, new wording alone cannot prove that marginal event pages deserve separate indexing. Decisions should use actual customer demand, unique operational content and page-level search/conversion evidence. No live canonical page was deleted, merged, redirected or noindexed.

## F. Cross-Domain Overlap

**POTENTIAL CROSS-DOMAIN CONTENT OVERLAP**

- Public Arabic counterpart https://yacht-dxb.com uses the same +971504641020 contact destination and shares 12 exact yacht-image URLs with this site's recorded media. It serves Arabic users; translation and shared business identity are not automatically duplicate abuse.
- Public https://evaliyachts.com uses a different phone pair (+971504648881 / +971504648882), overlapping yacht names/rates and at least one exact Royal Majesty media URL. Its homepage shows Royal Majesty 50 at AED 600, Majesty 56 at AED 750, Majesty 88 at AED 1,800 and Sunseeker 90 at AED 2,200, matching the approved English data.
- Repository media approval records explicitly reference supplier/source media. Current English runtime branding is Dubai Yacht, not Evali. No shared analytics ID was found in the English runtime; analytics are disabled.
- Evidence supports shared inventory/media, not a claim of common legal ownership, copied complete pages or a spam network. Confirm the operator/broker relationship and each site's genuine audience/value. No other site was changed.

Public samples were intentionally limited to the two homepages. [Raw comparison](cross-domain.json). Related public sources: [Arabic homepage](https://yacht-dxb.com/), [Evali homepage](https://evaliyachts.com/).

## G. Technical SEO

| Check | Production baseline | Review result / decision |
| --- | --- | --- |
| Sitemap | 38 URLs, 38 unique, all direct 200 | Same inventory; no aliases, parameters, redirects, 404s or noindex pages in production sitemap. |
| robots.txt | 200, allows crawling, correct sitemap | Unchanged. |
| Canonicals | 38 SELF-CANONICAL; 0 missing/conflicting/invalid | Same clean HTTPS production ownership in preview. Every production target is 200. |
| Title/description/H1 | Unique title/description; one H1 per canonical page | Preserved; more natural purpose-specific wording. |
| Unknown paths | All three requested examples are genuine 404 | Unchanged HTTP behavior; recovery links fixed. |
| Blocked inventory | 14 historical manifest URLs and 6 candidates return 404 | Remain unpublished. No automatic redirection. |
| .html aliases | All 37 /_static route files return 200; /index.html also 200; clean route.html aliases return 404 | Raw aliases canonicalize to clean URL, but sampled aliases render “Page not found” after hydration: soft-404 risk outside the sitemap. Exact redirect plan requires review. |
| Trailing slash | All 37 inner slash variants return 200 | Canonical points to clean slashless path. No forced normalization added. |
| Parameters | Search/category/sort/filter examples return 200, canonical /yachts | Not in sitemap. New filters use client state, not combinatorial URLs. |
| HTTPS / hostname | http apex -> https apex; https www -> https apex | http www -> https www -> https apex is a two-hop chain. Recommend review; no DNS/host changes. |
| Default Netlify hostname | 301 to production path | Exact existing rule preserved; deploy previews not redirected. |
| 308 / 5xx | None in the recorded probes | No new status behavior introduced. |
| Preview robots | Netlify adds X-Robots-Tag: noindex | Expected nonproduction protection; page canonicals still point to production. Do not copy a preview noindex header into production. |
| HTML / hydration / assets | All 38 canonical pages have meaningful initial HTML and render | No canonical-page console/hydration errors or broken rendered images in before/after full browser crawls. |

Initial source and hydrated DOM were both inspected. The alias finding illustrates why one alone is insufficient. Google-selected canonical and real Googlebot accessibility cannot be established from these local browser/fetch tests.

## H. Content and Brand

- Homepage: concise offer and price/capacity context, six real featured yachts, approved service links, booking steps, budget guidance, actual galleries, FAQ and direct final contact actions. No glossary or padded keyword blocks.
- Yacht pages: all 19 retain exact slugs/facts/images. Useful budget examples, bedrooms, minimum duration and capacity-based comparisons provide a better decision path. Unique verified layout/facility descriptions and real operating context remain owner tasks.
- Services: all 10 retain their exact routes, approved media and selected yachts. Different event-planning tasks replace repetitive generic caution. Inclusions and availability are not invented.
- FAQ: answers are now in static HTML; questions address price, booking, guests, route preferences, timing and written terms. No unsupported FAQ rich-result promise or new schema.
- Footer: keeps real navigation, social/contact links, legal pages and named yacht/service directory. No exact-match keyword-variant link farm was found. A shorter collapsed directory can be usability-tested later.
- Brand: approved textual identity is **Dubai Yacht**, consistently used in Organization/WebSite, Open Graph, navbar alt text, footer and contact. Existing logo artwork visually reads “Dubai Yachts”; owner should confirm/reconcile that artwork. No invented generic-keyword brand.
- Blog: no blog routes found in the manifest/runtime; /blog returns 404. No SEO-only articles created.

Pages should earn their place by helping a customer decide, not by meeting word-count targets. Tests that enforced arbitrary 350/500-word minimums were replaced with checks for approved facts, unique intent/content, useful links and working actions. [Google people-first guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

## I. Conversion and Mobile

Hero: WhatsApp, call, fleet and price/capacity context are visible at 390 x 844. Sticky mobile contact controls remain reachable while browsing. Header/menu targets are at least 44px; booking actions at least 48px. Catalogue supports capacity, hourly-budget and sorting controls, plus an empty-state reset.

WhatsApp messages contain editable date, time and guest fields; detail pages also include the chosen yacht or occasion. Contact form prepares a message locally, opens WhatsApp for review and does not imply a sent message or completed booking. Blocked-popup fallback offers the prepared link, copying and a call option. Tests do not send messages, make calls or reserve inventory.

Yacht selection now resets the viewport to the page heading; in-page hash navigation is preserved. 404 recovery uses fresh document requests to avoid the forced-error state. The final interaction suite passed filters, sorting, contextual WhatsApp links, service controls, natural page scrolling, native FAQs, mobile menu, unsent form fallback and 404 recovery. Responsive controls were checked across six representative pages at 320, 390, 768 and 1440px widths.

Booking remains a request-and-confirm process, not online payment or live inventory. That limitation is made clear without turning the entire site into a disclaimer.

## J. Structured Data

- Homepage: one WebSite plus one minimal Organization.
- About: approved minimal Organization and BreadcrumbList.
- Other hubs/support/legal: BreadcrumbList.
- 19 yacht pages: Service, factual hourly Offer and BreadcrumbList. Offer description explicitly states hourly rate, minimum duration and on-request availability. No InStock/guaranteed inventory claim.
- 10 service pages: Service and BreadcrumbList, with no invented event package price.
- All recorded JSON-LD parses; names/URLs/rates match visible approved records. No AggregateRating, Review or Award in canonical runtime output.
- No unsupported schema needed removal from the live baseline. Dormant review/package data were cleared as a preventive measure.
- Warnings: generic Service/Offer markup does not promise a Google rich result. Do not add a legal address, opening hours, licence or business category without evidence. Existing en/ar mapping is not reciprocal hreflang approval; no alternates were added.

## K. Performance and Images

See [performance.json](performance.json) for exact run configuration, metrics and caveats. Baseline mobile Lighthouse scored 75 performance / 100 accessibility / 100 SEO, with FCP 3.6s, LCP 4.4s, CLS 0 and TBT 10ms. These are lab measurements, not field Core Web Vitals or real INP.

| Mobile lab run | Performance | FCP | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- |
| Production baseline | 75 | 3.6s | 4.4s | 0 | 10ms |
| Preview, including Netlify tooling | 74 | 1.7s | 5.6s | 0 | 210ms |
| Preview repeat, including Netlify tooling | 66 | 3.6s | 7.9s | 0 | 30ms |
| Preview app-only, injected Netlify cdp script blocked | 83 | 1.7s | 4.4s | 0 | 30ms |

These are not equivalent field measurements: do not claim a proven production speed improvement from the app-only score. LCP remains a concern.

The review JavaScript bundle decreases from 599.12 to 561.21 kB (gzip 172.53 to 163.91 kB). CSS decreases from 76.80 to 74.95 kB. The first responsive AVIF hero remains eager/high-priority, and the services carousel loads the selected approved image instead of retaining thirteen image cards and intercepting input. Existing below-fold lazy loading and stable media dimensions remain. No visual asset was replaced or transformed.

Remaining concerns:

- Third-party yacht images frequently deliver more pixels than card sizes need. Lighthouse estimates roughly 306 KiB of image savings in the baseline. Use approved responsive variants/CDN transforms after testing rights, source availability and fallback behavior.
- First-load JavaScript remains above Vite's 500 kB warning. Route-level splitting needs a design compatible with existing static rendering/hydration; do not replace prerendered content with empty lazy placeholders.
- External fonts use preconnect and optional display. Further font subsetting/self-hosting should retain licensed assets and visual readability.
- Generic yacht alt text identifies the vessel and image number but lacks useful view-specific descriptions. Owner-reviewed photo annotations are preferable to invented cabin/facility descriptions.
- Hero alt is intentionally empty for decorative imagery; yacht product images have names/alt text. This is not hidden SEO content.
- Hashed assets have immutable caching; HTML is revalidated. Unhashed local media and supplier cache lifetimes remain optimization opportunities.
- Preview injects Netlify's own `/.netlify/scripts/cdp` and related tooling, unlike production. Preview Lighthouse noindex/extra-script results are not a production SEO failure or proof of a production speed regression. Report unfiltered and app-only measurements separately.
- No field INP/CrUX dataset was available during this audit. TBT is not a substitute for INP. No claim that Core Web Vitals now pass.

Dependency audit: 13 existing advisories (5 high, 7 moderate, 1 low) across development tooling and two React Router packages. Current routes use controlled internal destinations, and the deployed product is static, but advisories deserve a separate tested dependency update. No blind major upgrade or production-runtime exploit claim is made. See [dependency-audit.json](dependency-audit.json).

## L. Owner Confirmation and Approval

1. Current legal operating entity, broker/operator role, relationship to suppliers and related domains, and the contracting party shown to customers.
2. Licence/insurance evidence, any public office address, correct email, operating hours, and whether those details may be published.
3. Current yacht rates/specifications, actual facilities/access limits, supplier rights and vessel-specific original descriptions. Confirm historically ambiguous names and jacuzzi slugs without changing URLs prematurely.
4. Complete quote inclusions, fuel/crew/taxes/fees, deposit/payment methods, cancellation/rescheduling/weather policy and boarding/ID rules.
5. Actual event/hospitality capabilities, menus, equipment, suppliers, setup time and constraints. Real event examples with permission; no stock testimonial substitution.
6. Consent and source evidence for any future customer reviews, ratings or award claims.
7. Brand artwork singular/plural decision and actual differentiation from Evali and the Arabic site. Reciprocal language mapping approval before hreflang.
8. Current Search Console read-only exports by date/query/page/device/country, indexing examples, Google-selected canonicals, relevant links and field CWV to investigate the reported decline. Do not infer causality from an update date.
9. Approval for technical .html alias normalization and any later hub/service consolidation. No deletion, live-route redirect, canonical transfer or noindex decision is included in this PR.
10. Approval to merge/deploy, then production re-crawl. On the actual release date, update only genuinely changed sitemap lastmod entries; existing legal publication dates are not silently rewritten.

## Verification and Release Gate

[verification.json](verification.json) records exact tests, code revisions, deployment, crawl results, responsive cases and limitations. The review branch is not permission to publish. After approval, repeat the production crawl and browser interaction tests, confirm all 38 legitimate routes remain 200, robots/canonicals/sitemap remain correct, unknown URLs remain 404, and approved media/contact actions work. Preserve before/after records.

The technical alias redirects, field performance verification, current Search Console causality analysis and missing business evidence remain explicit follow-up decisions. They do not justify fabricated content or automatic removal of customer pages.
