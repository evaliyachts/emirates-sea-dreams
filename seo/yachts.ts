import { z } from "zod";
import { publishableYachts, type YachtRecord } from "../src/data/yachts";

export const blockedYachtRecordSchema = z.object({
  id: z.string().min(1),
  sourceNumericId: z.number().int().positive().optional(),
  historicalSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  sourceLabel: z.string().min(1),
  publicationStatus: z.literal("blocked"),
  blockers: z.array(z.string().min(1)).min(1),
  notes: z.array(z.string().min(1)).optional(),
}).strict();

export const unmatchedApprovedSourceRecordSchema = z.object({
  sourceNumericId: z.number().int().positive(),
  sourceSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  publicationStatus: z.literal("blocked-no-manifest-owner"),
  blocker: z.string().min(1),
}).strict();

export type BlockedYachtRecord = z.infer<typeof blockedYachtRecordSchema>;
export type YachtCatalogueRecord = YachtRecord | BlockedYachtRecord;

const blocked = (record: Omit<BlockedYachtRecord, "publicationStatus">) =>
  blockedYachtRecordSchema.parse({ ...record, publicationStatus: "blocked" });

export const blockedYachts: readonly BlockedYachtRecord[] = [
  blocked({
    id: "yacht-55ft-historical-brand-path",
    sourceNumericId: 2,
    historicalSlug: "evali-yacht-55ft-yacht-rental-dubai",
    sourceLabel: "Historical 55-foot yacht record",
    blockers: [
      "The inherited route contains prohibited Evali branding and is not approved for publication.",
      "No neutral route owner or redirect is approved.",
    ],
    notes: ["Owner-approved facts and media do not override the separate route-publication gate."],
  }),
  blocked({
    id: "yacht-sunseeker-82",
    historicalSlug: "sunseeker-82-feet-yacht-rental-dubai",
    sourceLabel: "Sunseeker 82 Feet historical manifest record",
    blockers: ["No owner-approved source record has this exact historical slug, so required facts cannot be mapped safely."],
  }),
  blocked({
    id: "yacht-azimut-80",
    historicalSlug: "azimut-80-feet-yacht-rental-dubai",
    sourceLabel: "Azimut 80 Feet historical manifest record",
    blockers: ["No owner-approved source record has this exact historical slug, so required facts cannot be mapped safely."],
  }),
  blocked({
    id: "yacht-dynasty-151",
    sourceNumericId: 23,
    historicalSlug: "dynasty-151-feet-dubai-yacht-rental",
    sourceLabel: "Dynasty large-yacht record",
    blockers: ["The historical route says 151 feet while the approved source length is 150 feet; visible length wording still requires review."],
  }),
  blocked({
    id: "yacht-mega-120",
    historicalSlug: "luxury-120-feet-mega-yacht-rental-dubai",
    sourceLabel: "Generic 120-foot mega-yacht historical manifest record",
    blockers: ["No owner-approved source record has this exact historical slug, year, minimum duration, or media mapping."],
    notes: ["A factual generic name remains permitted, but no manufacturer or model may be invented."],
  }),
] as const;

export const unmatchedApprovedSourceRecords = [
  unmatchedApprovedSourceRecordSchema.parse({
    sourceNumericId: 12,
    sourceSlug: "64-feet-italian-azimut-yacht-rental-dubai",
    publicationStatus: "blocked-no-manifest-owner",
    blocker: "No canonical owner for this path exists in the current route manifest.",
  }),
  unmatchedApprovedSourceRecordSchema.parse({
    sourceNumericId: 13,
    sourceSlug: "64-feet-hatteras-dubai-yacht-rental",
    publicationStatus: "blocked-no-manifest-owner",
    blocker: "No canonical owner for this path exists in the current route manifest.",
  }),
  unmatchedApprovedSourceRecordSchema.parse({
    sourceNumericId: 24,
    sourceSlug: "sunseeker-108ft-jacuzzi-yacht-rental-dubai",
    publicationStatus: "blocked-no-manifest-owner",
    blocker: "No canonical owner for this path exists in the current route manifest.",
  }),
] as const;

export const OWNER_APPROVED_SOURCE_RECORD_COUNT = 24;
export const EXACT_SOURCE_TO_MANIFEST_MATCH_COUNT = 21;
export const yachtCatalogueRegistry: readonly YachtCatalogueRecord[] = [...publishableYachts, ...blockedYachts];

export const assertYachtRegistryIntegrity = () => {
  if (yachtCatalogueRegistry.length !== 24) throw new Error(`Expected 24 yacht manifest dispositions; found ${yachtCatalogueRegistry.length}.`);
  const ids = yachtCatalogueRegistry.map((record) => record.id);
  const sourceIds = yachtCatalogueRegistry.flatMap((record) => record.sourceNumericId === undefined ? [] : [record.sourceNumericId]);
  const slugs = yachtCatalogueRegistry.map((record) => record.publicationStatus === "publishable" ? record.slug : record.historicalSlug);
  if (new Set(ids).size !== ids.length) throw new Error("Duplicate yacht IDs are prohibited.");
  if (new Set(sourceIds).size !== sourceIds.length) throw new Error("Duplicate mapped yacht source numeric IDs are prohibited.");
  if (new Set(slugs).size !== slugs.length) throw new Error("Duplicate yacht slugs are prohibited.");
  if (publishableYachts.length + blockedYachts.length !== 24) throw new Error("Published and blocked manifest dispositions must total 24.");
};

assertYachtRegistryIntegrity();
