# English SEO Audit

Audit date: 2026-07-13
Scope: documentation only; no production changes

## Executive summary

`yachtrentaldxb.com` has a useful starting inventory—52 intended URLs, 24 yacht records, 18 service/event records and seven hub-only occasions—but only the homepage is directly accessible. The sitemap currently sends crawlers to 51 real 404s. The root fallback is heavily keyword-targeted, while route-specific content and metadata depend on client navigation.

The highest-risk technical issue is direct-route failure. The highest-risk content issue is that business, yacht, event, pricing, inclusion, review and legal claims are published without a verified central contract. The immediate opportunity is not to add more URLs; it is to establish ownership, restore crawlable canonical owners, validate facts and build genuinely distinct commercial/event experiences.

## Priority register

| Work | Impact | Effort | Risk | Dependency | Order |
| --- | --- | --- | --- | --- | ---: |
| Search Console Page Indexing summary | Critical | Small | Low | Received: report dated 2026-06-30 | Evidence input received |
| Query × Page evidence | Critical | Small | Low | Still missing | 1 |
| Four Search Console Live URL Tests | Critical | Small | Low | Still missing | 1 |
| Business/legal/media approvals | Critical | Medium | Low | Owner input | 1 |
| Typed route ownership manifest | Critical | Medium | Medium | GSC evidence | 2 |
| Static route output and real 404 | Critical | Large | Medium | Manifest | 3 |
| Strict yacht/media validation | High | Large | Medium | Fact/rights approvals | 4 |
| Original commercial page set | High | Large | High | Ownership + static output | 5 |
| Distinct event authority cluster | High | Large | Medium | Service facts | 6 |
| Accurate entity/schema layer | High | Medium | Medium | Visible approved facts | 7 |
| Accessibility/performance/conversion | Medium | Medium | Low | Stable pages/media | 8 |
| Production crawl and GSC handoff | Critical | Medium | Medium | All prior work | 9 |

## Post-audit Search Console baseline

The original audit correctly recorded that no Search Console exports were available at audit time. A Page Indexing summary dated 2026-06-30 was supplied afterward and is now recorded in `ENGLISH_SEARCH_CONSOLE_BASELINE.md`.

- Google reported 55 known URLs: 1 indexed and 54 not indexed, an indexation rate of 1.8%.
- The non-indexed breakdown was 45 discovered but not indexed, 6 not found (404), 2 crawled but not indexed and 1 page with redirect.
- Most known URLs therefore had been discovered but had not yet progressed to crawling/indexation at the report date.
- The live sitemap has 52 URLs. The numerical match `1 indexed + 45 discovered + 6 not found = 52` is a high-confidence inference about possible sitemap membership, not a confirmed mapping, because the report filter was All known pages.
- The current direct-route failure remains the strongest observed technical explanation for severe indexation failure. It directly accords with the existence of a Google 404 group, but it does not prove Google crawled the 45 discovered URLs or classified them based on the current response.
- Content-quality conclusions cannot yet be applied to the 45 discovered URLs because the summary indicates they had not been crawled. Their source content still requires factual review before publication.
- The two crawled-not-indexed URLs require individual inspection once their example URLs are supplied.
- Property-level impressions are not Query × Page evidence and do not approve ownership, consolidation or redirects.

## Launch and indexation blockers

1. 51 of 52 sitemap URLs return a real `404` on direct request.
2. Inner-route initial HTML contains no route title, description, canonical, H1, content or schema.
3. Client navigation can leave the root canonical/schema in the document and append route metadata, creating duplicate ownership signals.
4. The sitemap is generated from data arrays rather than a canonical route manifest and assigns build-date `lastmod` to every URL.
5. The external `403` report is unresolved; Page Indexing summary evidence is available, but Live URL Tests are still missing.
6. A sampled primary yacht image returned `403`, so critical media are not reliably crawlable.

## Technical findings

- Canonical form is non-trailing-slash for English inner routes; preserve this until the manifest and live canonical history are reviewed.
- HTTP apex upgrades in one hop; HTTP www currently takes two redirects.
- Default Netlify hostname serves a duplicate homepage and has no documented exact-host redirect.
- Unknown routes correctly return a real 404, but the document is generic Netlify output.
- No tracked Netlify configuration defines redirects, headers, caching or production runtime.
- `npm ci` fails against the committed lockfile because it is out of sync with `package.json`; reproducible builds are not established.
- Current lint fails with 3 errors and 8 warnings; the configured build fails where `bunx` is unavailable. Direct Vite compilation succeeds, so these are foundation/tooling failures rather than evidence that the route architecture is production-ready.
- No accidental `noindex` was found on the root; route-level robots cannot be audited live because inner routes 404.
- Meta keywords are emitted on most React pages and should be removed from future output.
- Fingerprinted assets are revalidated rather than immutable-cached.
- Production source-map policy is not explicit.
- The local build produced approximately 631.32 kB JavaScript (192.03 kB gzip) and warned that a CSS `@import` occurs after Tailwind directives. This is a measured baseline, not a complete Core Web Vitals result.
- The desktop rendered homepage had 121 internal links and 30 images; footer/site-map density and repeated exact-match anchors warrant reduction.

## Content findings

- The root fallback targets rental, rentals, rent, hire, charter, booking, trips, luxury and private terms simultaneously. It is the only current live owner and is overburdened.
- Many paragraphs repeat commercial synonyms instead of resolving a distinct decision task.
- Current fixed packages promise inclusions, routes, durations, discounts and “all-inclusive” service without approval.
- FAQs and legal pages include fixed deposit, refund, cancellation and insurance promises.
- Testimonials and an average rating are visible without supplied verification.
- Contact/footer copy publishes unapproved hours, departure location, licensing and support claims.
- Useful future content should state only verified capacity, hourly price, minimum duration and optional-versus-confirmed items, then explain the booking decision clearly.

## Yacht findings

- 24 records exist and all 24 paths are in the sitemap, but all return 404 directly.
- The contract has no stable `id`, year, minimum duration, availability or media-rights identifier.
- Bathrooms, crew, type, inclusions and add-ons are present but not supported by audit evidence.
- The same nine inclusions and four priced add-ons are applied to every yacht.
- One public name, slug and media folder expose Evali branding.
- No `Product` or `AggregateRating` is emitted by the target yacht page code today, but inherited-source patterns and stale data remain a repository risk and require build scans.
- Yacht pages emit a `Service` node with an `Offer`; prices and URLs must be compared to visible approved facts.

See `ENGLISH_YACHT_DATA_AUDIT.md` and `ENGLISH_MEDIA_RIGHTS.md`.

## Event findings

- 18 service/event detail records exist; all direct URLs return 404.
- Seven additional occasion records appear only on `/occasions` and have no detail route.
- The source promises decorations, cake, catering, music, activities, routes, durations and equipment without per-service evidence.
- `engagement-and-wedding-parties` overlaps the dedicated engagement and wedding records.
- Birthday, proposal and fishing occasion records overlap detail services.
- Corporate, sunset, New Year and photoshoot are hub-only data; new pages must not be created automatically.
- Strongest differentiated opportunity: a private celebrations hub with factual occasion planning, suitable verified yachts, price factors, booking steps and optional add-ons.

See `ENGLISH_EVENT_AUTHORITY_PLAN.md`.

## Entity and structured-data findings

Current initial HTML emits:

- `WebSite`
- `Organization`
- `LocalBusiness`

React yacht pages can emit `Service` and `Offer`. No current target-source match was found for `schema_json_ld`, `Product`, `AggregateRating`, `ratingValue` or `reviewCount`; those strings must remain prohibited in production yacht data. The root `LocalBusiness` lacks a verified visible physical address and should not be used unless such an address is approved and displayed. Organization, ContactPoint, Service and BreadcrumbList are safer future types when they match visible facts.

Brand consistency is not yet approved. Source uses `Dubai Yacht`; raw domain is not a recognized alternate brand by default. `og:site_name`, logo alt, footer, WebSite and Organization must use the eventual approved name consistently.

## Internal-link findings

- Root fallback links to all sitemap groups, but most destinations are direct 404s.
- The footer and sitemap section create high-volume template links and repeated exact-match anchors.
- Event pages do not have an evidence-based event-to-yacht selection model.
- Yacht pages lack verified related-yacht and yacht-to-event relationships.
- Recommended model: homepage → primary commercial owners → catalogue/prices/booking; commercial pages → three relevant verified yachts and event hub; event hub → distinct event pages; event pages ↔ suitable yachts; all major flows → FAQ/contact.
- Link only to canonical `200` owners, use descriptive contextual anchors, and avoid repetitive exact-match footer networks.

## Cross-site findings

No current links from the target source to the other four yacht domains were found. Other repositories contain their own branding and some cross-domain Evali links, but this audit found no justification for a five-site reciprocal footer network. Use only a reciprocal language switcher for true equivalents and occasional branded editorial links with visitor benefit.

See `CROSS_SITE_LINKING_PLAN.md`.

## Performance and accessibility findings

- Large JS baseline and client-only routing delay meaningful route content.
- Above-the-fold media are remote; at least one key image is blocked.
- Images need explicit dimensions, responsive sources, meaningful alt text and rights records.
- Animated UI and carousel code require reduced-motion, keyboard and focus verification.
- Direct 404 output is not branded or useful.
- A rendered axe scan, keyboard-only audit, mobile RTL/overflow check (English remains LTR), and production Core Web Vitals evidence are absent.
- Conversion tracking is absent; future analytics must be explicitly approved and exclude personal form values.

## Limited competitor gap review

This was a manual sample of current public pages, not rank scraping. Examples reviewed include [Dubai Yacht Party](https://www.dubaiyacht-party.com/), [Marinova](https://marinova.ae/), [Book That Boat](https://bookthatboat.com/), [Imperium DXB](https://imperiumdxb.com/), [Gold Yachts](https://goldyachts.ae/), [Dubai Yachts birthday packages](https://www.dubaiyachts.com/en/yacht-packages/yacht-birthday-party), [Travaya yacht proposals](https://travaya.com/services/yacht-proposal-dubai) and [Yacht Events Dubai weddings](https://yachteventsdubai.com/yacht-event-packages/wedding-events/).

Useful patterns—not wording or unverifiable claims—to learn from:

- fleet cards expose size, capacity, price and minimum duration early;
- private versus shared service is explicit;
- event pages answer who it suits, group size, choices, price factors and next steps;
- optional decoration, catering, photography and entertainment are separated;
- booking UX asks for date, guests, duration and yacht preference without claiming confirmation;
- event pages link to suitable fleet options and related occasions;
- clear logistics and FAQ reduce WhatsApp uncertainty.

The target can differentiate through verified private-event decision support, not louder “best,” rating, instant-confirmation or all-inclusive claims.

## AI-search readiness

Future pages should be normally crawlable and provide concise factual answers, comparisons, booking steps, internal links, authorized media, good page experience and schema that exactly matches visible content. Do not add special “AI schema,” hidden AI text, keyword blocks, machine-generated doorway pages, an AI-only text file, or `llms.txt` as a Google ranking requirement.

## Off-site authority recommendations

After the site is factually sound, pursue real relationships with Dubai event planners, wedding/proposal planners, hotels and concierge partners, corporate event planners, marine resources, photographers and caterers involved in actual events. Favor branded/contextual editorial references. Do not use paid dofollow placements, mass directories, PBNs, automated links, sitewide exchanges or exact-match guest-post campaigns.

## Evidence and uncertainty

The audit uses repository source, live HTTP/browser behavior, the user-supplied historical ranking snapshot, the subsequently supplied 2026-06-30 Search Console Page Indexing summary and a limited current competitor sample. It still has no Query × Page export, Page Indexing issue URLs, Live URL Tests, analytics, backlink, Netlify admin, WAF admin, legal approval or media-rights evidence. Ranking-dependent route changes are therefore provisional.
