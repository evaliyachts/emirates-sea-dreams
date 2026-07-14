import { z } from "zod";

export const yachtMediaRecordSchema = z.object({
  type: z.literal("image"),
  path: z.string().min(1).refine((path) => {
    if (path.startsWith("/")) return !path.startsWith("//");
    try { return new URL(path).protocol === "https:"; } catch { return false; }
  }, "Media paths must be root-relative local paths or valid HTTPS URLs."),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  rightsRecordId: z.string().min(1),
  rightsStatus: z.literal("approved"),
  featured: z.boolean().optional(),
  priority: z.number().int().optional(),
}).strict();

export const yachtRecordSchema = z.object({
  id: z.string().min(1),
  sourceNumericId: z.number().int().positive(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  lengthFt: z.number().positive(),
  guestCapacity: z.number().int().positive(),
  yearBuilt: z.number().int().min(1900).max(2027),
  pricePerHour: z.number().positive(),
  minimumDuration: z.number().positive(),
  numberOfBedrooms: z.number().int().nonnegative().optional(),
  availability: z.literal("on-request"),
  featured: z.boolean().optional(),
  priority: z.number().int().optional(),
  media: z.array(yachtMediaRecordSchema).min(1),
  publicationStatus: z.literal("publishable"),
  blockers: z.array(z.string()).max(0),
}).strict().superRefine((record, context) => {
  const paths = record.media.map((media) => media.path);
  if (new Set(paths).size !== paths.length) context.addIssue({ code: z.ZodIssueCode.custom, path: ["media"], message: "Duplicate media paths are prohibited." });
  const serialized = JSON.stringify(record);
  if (/hhttps:\/\//i.test(serialized)) context.addIssue({ code: z.ZodIssueCode.custom, message: "Malformed hhttps media URLs are prohibited." });
  if (/evaliyachts?|evali yacht|supabase\.co/i.test(serialized)) context.addIssue({ code: z.ZodIssueCode.custom, message: "Inherited Evali or Supabase references are prohibited in publishable records." });
});

export type YachtMediaRecord = z.infer<typeof yachtMediaRecordSchema>;
export type YachtRecord = z.infer<typeof yachtRecordSchema>;
