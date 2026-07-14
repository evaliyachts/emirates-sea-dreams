import type { YachtMediaRecord } from "@/data/yachts";

export const getInitialCarouselImage = (images: readonly YachtMediaRecord[]) => {
  if (!images.length) return undefined;
  return images[Math.floor(images.length / 2)];
};
