import { approvedMediaForYacht } from "./approved-yacht-media";
import type { YachtMediaRecord, YachtRecord } from "./yacht-schema";

export type { YachtMediaRecord, YachtRecord } from "./yacht-schema";

interface ApprovedYachtInput {
  id: string;
  sourceNumericId: number;
  slug: string;
  name: string;
  lengthFt: number;
  guestCapacity: number;
  yearBuilt: number;
  pricePerHour: number;
  minimumDuration: number;
  numberOfBedrooms?: number;
  sourceAvailability: boolean;
  featured?: boolean;
  priority?: number;
}

const approvedYachtInputs: readonly ApprovedYachtInput[] = [
  { id: "yacht-royal-majesty-50", sourceNumericId: 3, slug: "50-feet-royal-majesty-dubai-yacht-rental", name: "Royal Majesty 50", lengthFt: 50, guestCapacity: 12, yearBuilt: 2018, pricePerHour: 600, minimumDuration: 2, numberOfBedrooms: 2, sourceAvailability: true, featured: true, priority: 1 },
  { id: "yacht-azimut-42", sourceNumericId: 4, slug: "42-feet-azimut-yacht-rental-dubai", name: "Azimut 42", lengthFt: 42, guestCapacity: 12, yearBuilt: 2016, pricePerHour: 500, minimumDuration: 2, numberOfBedrooms: 2, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-majesty-44", sourceNumericId: 5, slug: "majesty-44-feet-dubai-yacht-rental", name: "Majesty 44", lengthFt: 44, guestCapacity: 12, yearBuilt: 2015, pricePerHour: 500, minimumDuration: 2, numberOfBedrooms: 3, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-azimut-50", sourceNumericId: 6, slug: "50-feet-azimut-yacht-rental-dubai", name: "Azimut 50", lengthFt: 50, guestCapacity: 15, yearBuilt: 2015, pricePerHour: 650, minimumDuration: 2, numberOfBedrooms: 1, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-oryx-50", sourceNumericId: 7, slug: "oryx-50-feet-dubai-yacht-rental", name: "Oryx 50", lengthFt: 50, guestCapacity: 15, yearBuilt: 2018, pricePerHour: 550, minimumDuration: 2, numberOfBedrooms: 1, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-ferretti-50", sourceNumericId: 8, slug: "ferretti-50-feet-yacht-rental-dubai", name: "Ferretti 50", lengthFt: 50, guestCapacity: 12, yearBuilt: 2018, pricePerHour: 1000, minimumDuration: 2, numberOfBedrooms: 3, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-majesty-56", sourceNumericId: 9, slug: "56-feet-majesty-dubai-yacht-rental", name: "Majesty 56", lengthFt: 56, guestCapacity: 22, yearBuilt: 2016, pricePerHour: 750, minimumDuration: 2, numberOfBedrooms: 3, sourceAvailability: true, featured: true, priority: 2 },
  { id: "yacht-azimut-55", sourceNumericId: 10, slug: "55-feet-azimut-yacht-rental-dubai", name: "Azimut 55", lengthFt: 55, guestCapacity: 18, yearBuilt: 2020, pricePerHour: 750, minimumDuration: 2, numberOfBedrooms: 3, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-majesty-88", sourceNumericId: 11, slug: "majesty-88ft-jacuzzi-dubai-yacht-rental", name: "Majesty 88", lengthFt: 88, guestCapacity: 50, yearBuilt: 2013, pricePerHour: 1800, minimumDuration: 3, numberOfBedrooms: 4, sourceAvailability: true, featured: true, priority: 4 },
  { id: "yacht-benetti-110", sourceNumericId: 14, slug: "benetti-110ft-jacuzzi-yacht-rental-dubai", name: "Benetti 110", lengthFt: 110, guestCapacity: 50, yearBuilt: 2021, pricePerHour: 4500, minimumDuration: 4, numberOfBedrooms: 4, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-majesty-101", sourceNumericId: 15, slug: "majesty-101ft-jacuzzi-dubai-yacht-rental", name: "Majesty 101", lengthFt: 101, guestCapacity: 50, yearBuilt: 2015, pricePerHour: 3000, minimumDuration: 3, numberOfBedrooms: 4, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-heysea-90", sourceNumericId: 16, slug: "heysea-90ft-jacuzzi-yacht-rental-dubai", name: "Heysea 90", lengthFt: 90, guestCapacity: 20, yearBuilt: 2016, pricePerHour: 5000, minimumDuration: 3, numberOfBedrooms: 4, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-doretty-90", sourceNumericId: 17, slug: "doretty-90ft-jacuzzi-dubai-yacht-rental", name: "Doretty 90", lengthFt: 90, guestCapacity: 45, yearBuilt: 2018, pricePerHour: 1200, minimumDuration: 2, numberOfBedrooms: 3, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-ocean-dream-143", sourceNumericId: 18, slug: "ocean-dream-143-feet-yacht-rental-dubai", name: "Ocean Dream 143", lengthFt: 143, guestCapacity: 130, yearBuilt: 2015, pricePerHour: 5000, minimumDuration: 4, numberOfBedrooms: 4, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-mzaail-135", sourceNumericId: 19, slug: "mzaail-135ft-dubai-yacht-rental", name: "Mzaail 135", lengthFt: 135, guestCapacity: 110, yearBuilt: 2017, pricePerHour: 4000, minimumDuration: 4, numberOfBedrooms: 4, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-doretty-95", sourceNumericId: 20, slug: "doretty-95-feet-jacuzzi-yacht-rental-dubai", name: "Doretty 95", lengthFt: 95, guestCapacity: 55, yearBuilt: 2017, pricePerHour: 2000, minimumDuration: 4, numberOfBedrooms: 3, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-sunseeker-92", sourceNumericId: 21, slug: "sunseeker-92-feet-dubai-yacht-rental", name: "Sunseeker 92", lengthFt: 92, guestCapacity: 20, yearBuilt: 2008, pricePerHour: 4500, minimumDuration: 4, numberOfBedrooms: 3, sourceAvailability: true, featured: false, priority: 6 },
  { id: "yacht-sunseeker-90", sourceNumericId: 22, slug: "sunseeker-90-feet-yacht-rental-dubai", name: "Sunseeker 90", lengthFt: 90, guestCapacity: 30, yearBuilt: 2012, pricePerHour: 2200, minimumDuration: 2, numberOfBedrooms: 2, sourceAvailability: true, featured: true, priority: 3 },
  { id: "yacht-omega-100", sourceNumericId: 25, slug: "omega-100-feet-dubai-yacht-rental", name: "Omega 100", lengthFt: 100, guestCapacity: 50, yearBuilt: 2013, pricePerHour: 2500, minimumDuration: 4, numberOfBedrooms: 3, sourceAvailability: true, featured: false, priority: 6 },
] as const;

export const approvedSourceAvailability = new Map(
  approvedYachtInputs.map((yacht) => [yacht.id, yacht.sourceAvailability]),
);

export const publishableYachts: readonly YachtRecord[] = approvedYachtInputs.map((input): YachtRecord => {
  const media = approvedMediaForYacht(input.id).map((item, index) => ({
    type: "image" as const,
    path: item.path,
    alt: `${input.name} — image ${index + 1}`,
    width: item.width,
    height: item.height,
    rightsRecordId: item.rightsRecordId,
    rightsStatus: "approved" as const,
    featured: item.featured || undefined,
    priority: item.priority,
  }));

  return {
    id: input.id,
    sourceNumericId: input.sourceNumericId,
    slug: input.slug,
    name: input.name,
    lengthFt: input.lengthFt,
    guestCapacity: input.guestCapacity,
    yearBuilt: input.yearBuilt,
    pricePerHour: input.pricePerHour,
    minimumDuration: input.minimumDuration,
    numberOfBedrooms: input.numberOfBedrooms,
    availability: "on-request",
    featured: input.featured,
    priority: input.priority,
    media,
    publicationStatus: "publishable",
    blockers: [],
  };
});

export const TOTAL_YACHT_SOURCE_RECORDS = 24;

export const yachtPath = (slug: string) => `/yachts/${slug}`;

export const getPublishableYachtBySlug = (slug: string | undefined) =>
  publishableYachts.find((yacht) => yacht.slug === slug);
