import type { YachtRecord } from "@/data/yachts";
import { yachtPath } from "@/data/yachts";
import { DOMAIN } from "@/lib/constants";
import { NEUTRAL_YACHT_FALLBACK } from "@/data/media-rights";
import { buildBreadcrumbNode, organizationReference, schemaGraph } from "@/lib/entity-schema";

export const buildYachtSeo = (yacht: YachtRecord) => {
  const path = yachtPath(yacht.slug);
  const canonical = `${DOMAIN}${path}`;
  const title = `${yacht.name} | Verified Price and Capacity — Dubai Yacht`;
  const description = `${yacht.name}: ${yacht.lengthFt} ft, capacity for ${yacht.guestCapacity}, built in ${yacht.yearBuilt}, from AED ${yacht.pricePerHour.toLocaleString()} per hour with a ${yacht.minimumDuration}-hour minimum.`;
  const primaryImage = yacht.media.find((media) => media.featured) ?? yacht.media[0];
  const socialImage = primaryImage.path === NEUTRAL_YACHT_FALLBACK
    ? undefined
    : {
        url: primaryImage.path.startsWith("/") ? `${DOMAIN}${primaryImage.path}` : primaryImage.path,
        alt: primaryImage.alt,
        width: primaryImage.width,
        height: primaryImage.height,
      };
  const jsonLd = schemaGraph([
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: yacht.name,
      serviceType: "Private yacht rental in Dubai",
      url: canonical,
      provider: organizationReference,
      offers: {
        "@type": "Offer",
        price: yacht.pricePerHour,
        priceCurrency: "AED",
        url: canonical,
        description: `Minimum booking duration: ${yacht.minimumDuration} hours.`,
      },
    },
    buildBreadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Yachts", path: "/yachts" },
      { name: yacht.name, path },
    ]),
  ]);

  return { path, canonical, title, description, socialImage, jsonLd };
};
