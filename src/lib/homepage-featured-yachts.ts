import type { YachtRecord } from "@/data/yachts";

export const HOMEPAGE_FEATURED_YACHT_LIMIT = 6;

export const selectHomepageFeaturedYachts = (
  yachts: readonly YachtRecord[],
  limit = HOMEPAGE_FEATURED_YACHT_LIMIT,
) => yachts
  .map((yacht, sourceOrder) => ({ yacht, sourceOrder }))
  .sort((left, right) => {
    const featuredOrder = Number(Boolean(right.yacht.featured)) - Number(Boolean(left.yacht.featured));
    if (featuredOrder !== 0) return featuredOrder;

    const priorityOrder = (left.yacht.priority ?? Number.MAX_SAFE_INTEGER)
      - (right.yacht.priority ?? Number.MAX_SAFE_INTEGER);
    return priorityOrder || left.sourceOrder - right.sourceOrder;
  })
  .slice(0, limit)
  .map(({ yacht }) => yacht);
