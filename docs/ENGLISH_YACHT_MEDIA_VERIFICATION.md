# English Yacht Media Verification

Date: 2026-07-14
Production authority: `https://yachtrentaldxb.com/`
Verification command: `npm run media:verify`

## Production result

- Publishable yachts: **19**
- Retained production image URLs: **126**
- Unique retained URLs: **126**
- Successful supported-image responses: **126**
- Rejected production candidates: **0**
- Published yachts using the neutral fallback: **0**
- Neutral fallback verification: **passed (1600×900 SVG)**

The verifier requires HTTPS, HTTP success, a supported image content type, a non-empty decodable image, a same-host final URL, an exact English-domain rights record, and decoded dimensions equal to the strict media record. There is no expected-failure exemption for a production gallery record.

## Provenance exclusions

- The historical 55-foot route and branded gallery remain blocked. Its sampled primary source was previously recorded as HTTP 403; it is not in the production media registry.
- Exact duplicate source URLs were removed while preserving first-seen order.
- Three approved source records without existing manifest owners do not create galleries or pages.
- Media for five blocked manifest owners is absent from production.
- No source URL was rehosted, copied, transformed through Netlify Image CDN, or exposed through an Evali-branded production path.

The historical repository already mapped its yacht-storage object paths to `yacht.fra1.cdn.digitaloceanspaces.com`. PR 4B resolves those entries once into that established neutral CDN form as a static snapshot; it does not introduce a runtime Supabase request or a new media origin. Exact source observations remain in the PR 4A provenance pack, while the runtime registry contains only verified production URLs.

## Surface rules

Catalogue and related cards use one verified primary image. Published yacht details receive the complete approved gallery. Yacht-detail Open Graph and Twitter metadata use the same verified primary image as an absolute HTTPS URL with the current public yacht name, alt text, width, and height. A fallback-only record would emit no social image metadata.
