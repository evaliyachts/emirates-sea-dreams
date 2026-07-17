# Mobile homepage performance

Date: 17 July 2026

Production baseline: `https://yachtrentaldxb.com/`

Candidate branch: `agent/mobile-homepage-performance`

## Scope

This focused candidate improves the mobile first paint of the existing homepage. It does not change route ownership, indexability, visible copy, metadata, schema, sitemap membership, yacht facts, service facts, contact facts, analytics, redirects, `hreflang` or `x-default`.

## Evidence and diagnosis

The owner-supplied mobile PageSpeed result reported:

- one render-blocking generated stylesheet request, with an estimated 250 ms saving;
- image-delivery opportunities estimated at 204 KiB;
- 31 ms of forced reflow;
- an LCP breakdown with 80 ms TTFB and 2,490 ms element-render delay;
- the homepage introduction paragraph as the LCP element.

A reproducible Lighthouse 12.8.2 production baseline from the same development machine recorded the following lab result. Lab runs vary with network and host state, so these values are evidence for this release rather than a guaranteed field outcome.

| Metric | Production baseline |
| --- | ---: |
| Performance score | 73 |
| First Contentful Paint | 3,883 ms |
| Largest Contentful Paint | 4,832 ms |
| Speed Index | 3,884 ms |
| Total Blocking Time | 30 ms |
| Cumulative Layout Shift | 0 |

The source review found three relevant critical-path behaviors:

1. The generated application stylesheet was a blocking request on the homepage.
2. Hero and header first-paint markup was owned by Framer Motion, and the server-rendered header started translated outside the viewport.
3. The services input handler performed synchronous geometry reads and re-registered global handlers after each active-card change.

## Candidate changes

- The homepage alone receives the exact generated stylesheet inline. Inner routes keep the fingerprinted external asset, so this change does not duplicate route ownership or alter inner-route caching.
- Header and hero first-paint markup is plain static HTML. Decorative parallax and entry animations no longer delay or alter the initial content.
- Offscreen homepage sections use `content-visibility: auto` with an intrinsic-size fallback in supporting browsers.
- The service interaction uses `IntersectionObserver` state instead of `getBoundingClientRect()` in wheel and touch handlers, and registers those handlers once.
- The approved mobile hero source is emitted as a same-path 768×1376 AVIF performance rendition. The original source checksum remains recorded in `ENGLISH_MEDIA_RIGHTS.md`.
- The existing logo visual is emitted at its rendered aspect ratio as a smaller PNG candidate.
- Lazy yacht-card images use asynchronous decoding. No remote yacht media URL is transformed or replaced.

## Asset and bundle comparison

| Resource | Before | Candidate | Saving |
| --- | ---: | ---: | ---: |
| Mobile hero AVIF | 73,778 bytes | 34,495 bytes | 39,283 bytes (53.2%) |
| Header/footer logo PNG | 38,297 bytes | 7,254 bytes | 31,043 bytes (81.1%) |
| Combined local critical images | 112,075 bytes | 41,749 bytes | 70,326 bytes (62.7%) |
| Generated CSS | 76.50 kB | 76.69 kB | +0.19 kB |
| Generated JavaScript | 593.24 kB | 592.79 kB | -0.45 kB |

The CSS file size is essentially unchanged because the optimization removes its homepage network round trip rather than removing established design rules. The candidate homepage HTML is larger because it contains the generated CSS; transfer compression and elimination of the extra blocking request are the intended tradeoff.

## Candidate lab and browser result

Lighthouse 12.8.2 against the production build served locally with the standard mobile profile recorded:

| Metric | Local candidate |
| --- | ---: |
| Performance score | 98 |
| First Contentful Paint | 1,668 ms |
| Largest Contentful Paint | 2,142 ms |
| Speed Index | 1,668 ms |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0 |
| Render-blocking resource saving | 0 ms |
| Image-delivery saving | 0 bytes |

The local candidate and remote production baseline are not a controlled same-origin comparison.

At 390×844 in the controlled browser, the candidate retained the approved title, canonical and H1; the hero and 12 homepage sections were present; the generated CSS was inline; the application stylesheet link was absent; horizontal overflow was absent; and no console error or warning was recorded.

## Deploy Preview evidence

Validated preview: `https://deploy-preview-21--yachtrentaldxb.netlify.app/`

Immutable Netlify deploy: `6a5a09538af9d70008d8380a`

Three Lighthouse 12.8.2 mobile runs varied substantially with the throttled connection (scores 77, 63 and 98). The median result was:

| Metric | Deploy Preview median |
| --- | ---: |
| Performance score | 77 |
| First Contentful Paint | 3,603 ms |
| Largest Contentful Paint | 3,603 ms |
| Total Blocking Time | 15 ms |
| Cumulative Layout Shift | 0 |
| Time to First Byte | 471 ms |
| LCP element-render delay | 431 ms |
| Render-blocking resource saving | 0 ms |
| Forced-reflow items | 0 |

A same-window production run scored 75 with 3,846 ms FCP, 4,452 ms LCP, 49 ms TBT and 656 ms LCP element-render delay. These lab scores are network-sensitive and are not guaranteed field outcomes.

The preview still reports 313,695 bytes of possible image savings, almost entirely from four inherited remote yacht-card sources whose transformation rights are not approved. This release does not bypass that evidence gate.

The preview crawl passed 38 canonical `200` routes, 23 real-404 probes and exact equality with the 38-URL sitemap. At 390×844, title, description, H1 and canonical remained unchanged; the page had no horizontal overflow, live language alternates, console errors or hydration warnings.

## Safeguards and limitations

- The hero image remains `loading="eager"` with asynchronous decoding. It is not promoted to high fetch priority because the measured LCP element is text.
- Remote yacht galleries are still governed by their approved source URLs. This release does not create new renditions or use the Netlify Image CDN for those records.
- The unchanged Framer Motion use in below-fold components still contributes to the JavaScript bundle. A future code-splitting or animation-system change would require a separate visual and accessibility review.
- Field Core Web Vitals will not change immediately and must be reviewed after sufficient real-user data accumulates.

## Required release validation

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm run seo:check`
- `npm run media:verify`
- `npm audit --omit=dev`
- `git diff --check`
- Deploy Preview mobile Lighthouse and browser review

Production remains unchanged until the exact candidate head receives owner approval and is merged through the repository's controlled release workflow.
