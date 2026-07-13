import type { YachtRecord } from "@/data/yachts";
import { yachtPath } from "@/data/yachts";
import { DOMAIN } from "@/lib/constants";

export const buildYachtSeo = (yacht: YachtRecord) => {
  const path = yachtPath(yacht.slug);
  const canonical = `${DOMAIN}${path}`;
  const title = `${yacht.name} | Verified Price and Capacity — Dubai Yacht`;
  const description = `${yacht.name}: ${yacht.lengthFt} ft, capacity for ${yacht.guestCapacity}, built in ${yacht.yearBuilt}, from AED ${yacht.pricePerHour.toLocaleString()} per hour with a ${yacht.minimumDuration}-hour minimum.`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: yacht.name,
        serviceType: "Private yacht rental in Dubai",
        url: canonical,
        offers: {
          "@type": "Offer",
          price: yacht.pricePerHour,
          priceCurrency: "AED",
          url: canonical,
          description: `Minimum booking duration: ${yacht.minimumDuration} hours.`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "Yachts", item: `${DOMAIN}/yachts` },
          { "@type": "ListItem", position: 3, name: yacht.name, item: canonical },
        ],
      },
    ],
  };

  return { path, canonical, title, description, jsonLd };
};
