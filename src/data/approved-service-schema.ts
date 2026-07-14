import { z } from "zod";

const exactThreeIds = z.tuple([z.string().min(1), z.string().min(1), z.string().min(1)]);

export const approvedServiceMediaSchema = z.object({
  path: z.string().regex(/^\/media\/home\/services\/[a-z0-9-]+\.(?:webp|jpg)$/),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  rightsRecordId: z.string().min(1),
}).strict();

export const approvedServiceRecordSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  path: z.string().regex(/^\/services\/[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  category: z.enum(["celebration", "private-experience", "hospitality"]),
  availability: z.literal("on request and subject to confirmation"),
  metadata: z.object({ title: z.string().min(1), description: z.string().min(1), h1: z.string().min(1) }).strict(),
  introduction: z.string().min(1),
  directAnswer: z.string().min(1),
  whoItIsFor: z.string().min(1),
  suitableGroupTypes: z.array(z.string().min(1)).min(2).max(4),
  optionalRequestBoundary: z.string().min(1),
  sections: z.array(z.object({ heading: z.string().min(1), paragraphs: z.array(z.string().min(1)).min(2) }).strict()).min(3),
  bookingSteps: z.array(z.string().min(1)).min(4),
  priceFactors: z.array(z.string().min(1)).min(4),
  faqs: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) }).strict()).min(4),
  yachtIds: exactThreeIds,
  yachtSelectionNote: z.string().min(1),
  relatedServiceIds: exactThreeIds,
  media: approvedServiceMediaSchema.optional(),
}).strict().superRefine((service, context) => {
  if (service.path !== `/services/${service.slug}`) context.addIssue({ code: z.ZodIssueCode.custom, path: ["path"], message: "Service path must be derived from the exact slug." });
  if (new Set(service.yachtIds).size !== 3) context.addIssue({ code: z.ZodIssueCode.custom, path: ["yachtIds"], message: "Service yacht selections must contain exactly three unique records." });
  if (new Set(service.relatedServiceIds).size !== 3 || service.relatedServiceIds.includes(service.id)) context.addIssue({ code: z.ZodIssueCode.custom, path: ["relatedServiceIds"], message: "Related services must contain three unique other approved owners." });
  if (/evaliyachts?|evali yacht|supabase\.co|schema_json_ld|AggregateRating|ratingValue|reviewCount/i.test(JSON.stringify(service))) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Inherited branding, runtime sources and fabricated schema fields are prohibited." });
  }
});

export type ApprovedServiceMedia = z.infer<typeof approvedServiceMediaSchema>;
export type ApprovedServiceRecord = z.infer<typeof approvedServiceRecordSchema>;
