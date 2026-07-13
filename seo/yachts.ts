import { z } from "zod";
import { publishableYachts, type YachtRecord } from "../src/data/yachts";

export const blockedYachtRecordSchema = z.object({
  id: z.string().min(1),
  sourceNumericId: z.number().int().positive(),
  historicalSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  sourceLabel: z.string().min(1),
  publicationStatus: z.literal("blocked"),
  blockers: z.array(z.string().min(1)).min(1),
  notes: z.array(z.string().min(1)).optional(),
}).strict();

export type BlockedYachtRecord = z.infer<typeof blockedYachtRecordSchema>;
export type YachtCatalogueRecord = YachtRecord | BlockedYachtRecord;

const commonBlockers = [
  "Business approval of the record-level public name and specifications is missing.",
  "A verified year built is missing.",
  "A verified minimum booking duration is missing.",
  "English-domain media reuse authorization is missing.",
] as const;

const blocked = (record: Omit<BlockedYachtRecord, "publicationStatus" | "blockers"> & { blockers?: readonly string[] }) =>
  blockedYachtRecordSchema.parse({
    ...record,
    publicationStatus: "blocked",
    blockers: [...commonBlockers, ...(record.blockers ?? [])],
  });

export const blockedYachts: readonly BlockedYachtRecord[] = [
  blocked({
    id: "yacht-55ft-historical-brand-path", sourceNumericId: 1,
    historicalSlug: "evali-yacht-55ft-yacht-rental-dubai", sourceLabel: "Historical 55-foot yacht record",
    blockers: [
      "The inherited path contains prohibited third-party branding.",
      "No owner-approved neutral public name, replacement owner, or redirect is available.",
      "Query-by-page and inbound-link evidence for the historical path is missing.",
    ],
  }),
  blocked({ id: "yacht-royal-majesty-50", sourceNumericId: 2, historicalSlug: "50-feet-royal-majesty-dubai-yacht-rental", sourceLabel: "50 Feet Royal Majesty" }),
  blocked({ id: "yacht-azimut-42", sourceNumericId: 3, historicalSlug: "42-feet-azimut-yacht-rental-dubai", sourceLabel: "42 Feet Azimut" }),
  blocked({ id: "yacht-majesty-44", sourceNumericId: 4, historicalSlug: "majesty-44-feet-dubai-yacht-rental", sourceLabel: "Majesty 44 Feet" }),
  blocked({ id: "yacht-azimut-50", sourceNumericId: 5, historicalSlug: "50-feet-azimut-yacht-rental-dubai", sourceLabel: "50 Feet Azimut" }),
  blocked({ id: "yacht-oryx-50", sourceNumericId: 6, historicalSlug: "oryx-50-feet-dubai-yacht-rental", sourceLabel: "Oryx 50 Feet" }),
  blocked({ id: "yacht-ferretti-50", sourceNumericId: 7, historicalSlug: "ferretti-50-feet-yacht-rental-dubai", sourceLabel: "Ferretti 50 Feet" }),
  blocked({ id: "yacht-majesty-56", sourceNumericId: 8, historicalSlug: "56-feet-majesty-dubai-yacht-rental", sourceLabel: "56 Feet Majesty" }),
  blocked({ id: "yacht-azimut-55", sourceNumericId: 9, historicalSlug: "55-feet-azimut-yacht-rental-dubai", sourceLabel: "55 Feet Azimut" }),
  blocked({ id: "yacht-majesty-88", sourceNumericId: 10, historicalSlug: "majesty-88ft-jacuzzi-dubai-yacht-rental", sourceLabel: "Majesty 88 Feet" }),
  blocked({ id: "yacht-sunseeker-82", sourceNumericId: 11, historicalSlug: "sunseeker-82-feet-yacht-rental-dubai", sourceLabel: "Sunseeker 82 Feet" }),
  blocked({ id: "yacht-azimut-80", sourceNumericId: 12, historicalSlug: "azimut-80-feet-yacht-rental-dubai", sourceLabel: "Azimut 80 Feet" }),
  blocked({ id: "yacht-benetti-110", sourceNumericId: 13, historicalSlug: "benetti-110ft-jacuzzi-yacht-rental-dubai", sourceLabel: "Benetti 110 Feet" }),
  blocked({ id: "yacht-majesty-101", sourceNumericId: 14, historicalSlug: "majesty-101ft-jacuzzi-dubai-yacht-rental", sourceLabel: "Majesty 101 Feet" }),
  blocked({ id: "yacht-heysea-90", sourceNumericId: 15, historicalSlug: "heysea-90ft-jacuzzi-yacht-rental-dubai", sourceLabel: "Heysea 90 Feet", notes: ["Manufacturer/model spelling remains a source observation pending identity evidence."] }),
  blocked({ id: "yacht-doretty-90", sourceNumericId: 16, historicalSlug: "doretty-90ft-jacuzzi-dubai-yacht-rental", sourceLabel: "Doretty 90 Feet", notes: ["Manufacturer/model spelling remains a source observation pending identity evidence."] }),
  blocked({ id: "yacht-ocean-dream-143", sourceNumericId: 17, historicalSlug: "ocean-dream-143-feet-yacht-rental-dubai", sourceLabel: "Ocean Dream 143 Feet" }),
  blocked({ id: "yacht-mzaail-135", sourceNumericId: 18, historicalSlug: "mzaail-135ft-dubai-yacht-rental", sourceLabel: "Mzaail 135 Feet", notes: ["Manufacturer/model spelling remains a source observation pending identity evidence."] }),
  blocked({ id: "yacht-doretty-95", sourceNumericId: 19, historicalSlug: "doretty-95-feet-jacuzzi-yacht-rental-dubai", sourceLabel: "Doretty 95 Feet", notes: ["Manufacturer/model spelling remains a source observation pending identity evidence."] }),
  blocked({ id: "yacht-sunseeker-92", sourceNumericId: 20, historicalSlug: "sunseeker-92-feet-dubai-yacht-rental", sourceLabel: "Sunseeker 92 Feet" }),
  blocked({ id: "yacht-sunseeker-90", sourceNumericId: 21, historicalSlug: "sunseeker-90-feet-yacht-rental-dubai", sourceLabel: "Sunseeker 90 Feet" }),
  blocked({ id: "yacht-dynasty-151", sourceNumericId: 22, historicalSlug: "dynasty-151-feet-dubai-yacht-rental", sourceLabel: "Dynasty large-yacht record", blockers: ["The historical route says 151 feet while the source data says 150 feet."] }),
  blocked({ id: "yacht-mega-120", sourceNumericId: 23, historicalSlug: "luxury-120-feet-mega-yacht-rental-dubai", sourceLabel: "Generic 120-foot mega-yacht record", blockers: ["No verified manufacturer or model is available; none may be inferred."] }),
  blocked({ id: "yacht-omega-100", sourceNumericId: 24, historicalSlug: "omega-100-feet-dubai-yacht-rental", sourceLabel: "Omega 100 Feet" }),
] as const;

export const yachtCatalogueRegistry: readonly YachtCatalogueRecord[] = [...publishableYachts, ...blockedYachts];

export const assertYachtRegistryIntegrity = () => {
  if (yachtCatalogueRegistry.length !== 24) throw new Error(`Expected 24 yacht dispositions; found ${yachtCatalogueRegistry.length}.`);
  const ids = yachtCatalogueRegistry.map((record) => record.id);
  const sourceIds = yachtCatalogueRegistry.map((record) => record.sourceNumericId);
  const slugs = yachtCatalogueRegistry.map((record) => record.publicationStatus === "publishable" ? record.slug : record.historicalSlug);
  if (new Set(ids).size !== ids.length) throw new Error("Duplicate yacht IDs are prohibited.");
  if (new Set(sourceIds).size !== sourceIds.length) throw new Error("Duplicate yacht source numeric IDs are prohibited.");
  if (new Set(slugs).size !== slugs.length) throw new Error("Duplicate yacht slugs are prohibited.");
};

assertYachtRegistryIntegrity();
