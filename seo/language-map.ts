import type {
  EnglishArabicRouteMapping,
  LanguageEquivalenceStatus,
  LiveLanguagePageEvidence,
} from "./contracts";
import { ENGLISH_PRODUCTION_ORIGIN, canonicalUrlForPath } from "./authorities";
import { publishedStaticRoutes } from "./publication";

export const ARABIC_PRODUCTION_ORIGIN = "https://yacht-dxb.com";
export const LANGUAGE_MAP_VERIFIED_AT = "2026-07-14" as const;

interface MappingInput {
  routeId: string;
  arabicPath: string;
  status?: Exclude<LanguageEquivalenceStatus, "no-equivalent" | "arabic-page-absent" | "english-page-not-ready">;
  samePrimaryIntent?: boolean;
  blockers?: string[];
}

const liveEvidence = (declaredCanonical: string, site: "English" | "Arabic"): LiveLanguagePageEvidence => ({
  httpStatus: 200,
  indexable: true,
  declaredCanonical,
  verifiedAt: LANGUAGE_MAP_VERIFIED_AT,
  evidenceReference: `${site} live HTTP, robots and canonical verification on ${LANGUAGE_MAP_VERIFIED_AT}.`,
});

const buildMapping = ({
  routeId,
  arabicPath,
  status = "true-equivalent",
  samePrimaryIntent = true,
  blockers = ["Coordinated reciprocal English and Arabic release approval remains pending."],
}: MappingInput): EnglishArabicRouteMapping => {
  const route = publishedStaticRoutes.find((candidate) => candidate.id === routeId);
  if (!route) throw new Error(`Language mapping references an unpublished English owner: ${routeId}`);
  const englishCanonical = canonicalUrlForPath(route.path);
  const arabicCanonical = new URL(arabicPath, `${ARABIC_PRODUCTION_ORIGIN}/`).href;
  const trueEquivalent = status === "true-equivalent";
  return {
    routeId,
    englishCanonical,
    arabicCanonical,
    equivalenceStatus: status,
    samePrimaryIntent,
    englishEvidence: liveEvidence(englishCanonical, "English"),
    arabicEvidence: liveEvidence(arabicCanonical, "Arabic"),
    reciprocalEnglishTagRequired: trueEquivalent,
    reciprocalArabicTagRequired: trueEquivalent,
    xDefaultAppropriate: false,
    blockers,
  };
};

export const englishArabicRouteMappings: readonly EnglishArabicRouteMapping[] = [
  buildMapping({ routeId: "home", arabicPath: "/" }),
  buildMapping({ routeId: "yacht-index", arabicPath: "/yachts/" }),
  buildMapping({ routeId: "service-index", arabicPath: "/الخدمات/" }),
  buildMapping({
    routeId: "occasion-index",
    arabicPath: "/تأجير-يخت-للمناسبات-في-دبي/",
    status: "related-not-equivalent",
    samePrimaryIntent: false,
    blockers: ["The English hub is a seven-theme chooser while the Arabic owner is a focused yacht-for-occasions commercial page."],
  }),
  buildMapping({ routeId: "yacht-royal-majesty-50", arabicPath: "/yachts/رحلة-يخت-50-قدم-رويال-ماجستي/" }),
  buildMapping({
    routeId: "yacht-azimut-42",
    arabicPath: "/yachts/يخت-42-قدم-ازيموت-للايجار/",
    status: "related-not-equivalent",
    blockers: ["Verified hourly price conflicts: English AED 500; Arabic AED 400."],
  }),
  buildMapping({
    routeId: "yacht-majesty-44",
    arabicPath: "/yachts/يخت-ماجستي-44-قدم-للايجار/",
    status: "related-not-equivalent",
    blockers: ["Verified hourly price conflicts: English AED 500; Arabic AED 450."],
  }),
  buildMapping({ routeId: "yacht-azimut-50", arabicPath: "/yachts/يخت-أزيموت-50-قدم-للإيجار/" }),
  buildMapping({
    routeId: "yacht-oryx-50",
    arabicPath: "/yachts/يخت-أوريكس-50-قدم-للإيجار/",
    status: "related-not-equivalent",
    blockers: ["Verified hourly price conflicts: English AED 550; Arabic AED 500."],
  }),
  buildMapping({ routeId: "yacht-ferretti-50", arabicPath: "/yachts/يخت-فيريتي-50-قدم-للإيجار/" }),
  buildMapping({ routeId: "yacht-majesty-56", arabicPath: "/yachts/رحلة-يخت-56-قدم-ماجستي/" }),
  buildMapping({ routeId: "yacht-azimut-55", arabicPath: "/yachts/رحلة-يخت-55-قدم-ازيموت/" }),
  buildMapping({ routeId: "yacht-majesty-88", arabicPath: "/yachts/ايجار-يخت-ماجستي-88-قدم-جاكوزي/" }),
  buildMapping({ routeId: "yacht-benetti-110", arabicPath: "/yachts/يخت-بينيتي-110-قدم-مع-جاكوزي/" }),
  buildMapping({ routeId: "yacht-majesty-101", arabicPath: "/yachts/يخت-ماجستي-101-قدم-جاكوزي-للإيجار/" }),
  buildMapping({
    routeId: "yacht-heysea-90",
    arabicPath: "/yachts/ايجار-يخت-هايغان-90-قدم-جاكوزي/",
    status: "related-not-equivalent",
    blockers: ["Public identity is unresolved: English uses Heysea while the Arabic owner uses هايغان."],
  }),
  buildMapping({ routeId: "yacht-doretty-90", arabicPath: "/yachts/يخت-دوريتتي-90-قدم-جاكوزي/" }),
  buildMapping({ routeId: "yacht-ocean-dream-143", arabicPath: "/yachts/اوشن-دريم-يخت-143-قدم-للايجار/" }),
  buildMapping({ routeId: "yacht-mzaail-135", arabicPath: "/yachts/ايجار-يخت-مزايل-135-قدم-دبي/" }),
  buildMapping({ routeId: "yacht-doretty-95", arabicPath: "/yachts/يخت-95-قدم-دوريتتي-مع-جاكوزي/" }),
  buildMapping({ routeId: "yacht-sunseeker-92", arabicPath: "/yachts/يخت-سنسيكر-92-قدم-للايجار/" }),
  buildMapping({ routeId: "yacht-sunseeker-90", arabicPath: "/yachts/تأجير-يخت-سنسيكر-90-قدم/" }),
  buildMapping({ routeId: "yacht-omega-100", arabicPath: "/yachts/يخت-اوميغا-100-قدم-للايجار/" }),
  buildMapping({ routeId: "service-barbecue", arabicPath: "/حفلة-شواء-على-يخت-في-دبي/" }),
  buildMapping({ routeId: "service-birthday", arabicPath: "/عيد-ميلاد-على-يخت-في-دبي/" }),
  buildMapping({ routeId: "service-graduation", arabicPath: "/حفلة-تخرج-على-يخت-في-دبي/" }),
  buildMapping({ routeId: "service-anniversary", arabicPath: "/ذكرى-زواج-على-يخت-في-دبي/" }),
  buildMapping({ routeId: "service-bachelor", arabicPath: "/حفلة-وداع-عزوبية-على-يخت-في-دبي/" }),
  buildMapping({ routeId: "service-proposal", arabicPath: "/طلب-زواج-على-يخت-في-دبي/" }),
  buildMapping({ routeId: "service-afternoon-tea", arabicPath: "/افترنون-تي-على-يخت-في-دبي/" }),
  buildMapping({ routeId: "service-morning-trip", arabicPath: "/رحلة-يخت-صباحية-في-دبي/" }),
  buildMapping({ routeId: "service-engagement", arabicPath: "/يخت-لحفلة-خطوبة-في-دبي/" }),
  buildMapping({ routeId: "service-wedding", arabicPath: "/حفلة-زفاف-على-يخت-في-دبي/" }),
  buildMapping({ routeId: "about", arabicPath: "/about/" }),
  buildMapping({ routeId: "faq", arabicPath: "/الأسئلة-الشائعة/" }),
  buildMapping({ routeId: "contact", arabicPath: "/contact/" }),
  buildMapping({
    routeId: "terms",
    arabicPath: "/terms/",
    status: "related-not-equivalent",
    samePrimaryIntent: true,
    blockers: ["The English and Arabic legal texts have separate approved wording, responsible-party disclosures and effective dates; legal equivalence requires coordinated owner/legal review."],
  }),
  buildMapping({
    routeId: "privacy",
    arabicPath: "/privacy/",
    status: "related-not-equivalent",
    samePrimaryIntent: true,
    blockers: ["The English notice identifies an approved controller and provider/data categories that are not equivalent to the older Arabic notice; coordinated legal revision is required."],
  }),
];

export const languageMappingSummary = {
  total: englishArabicRouteMappings.length,
  trueEquivalents: englishArabicRouteMappings.filter((record) => record.equivalenceStatus === "true-equivalent").length,
  relatedNotEquivalent: englishArabicRouteMappings.filter((record) => record.equivalenceStatus === "related-not-equivalent").length,
  unmapped: englishArabicRouteMappings.filter((record) => !record.arabicCanonical).length,
} as const;

export const languageMappingPendingRouteIds = [] as const;

export const validateEnglishArabicRouteMappings = (): string[] => {
  const failures: string[] = [];
  const publishedIds = new Set(publishedStaticRoutes.map((route) => route.id));
  const mappedIds = englishArabicRouteMappings.map((record) => record.routeId);
  const pendingIds = new Set<string>(languageMappingPendingRouteIds);
  if (englishArabicRouteMappings.length + pendingIds.size !== publishedStaticRoutes.length) failures.push("Verified and pending language records must cover every published English route.");
  if (new Set(mappedIds).size !== mappedIds.length) failures.push("Language report contains a duplicate route ID.");
  publishedIds.forEach((id) => { if (!mappedIds.includes(id) && !pendingIds.has(id)) failures.push(`Published route is absent from language evidence: ${id}`); });
  pendingIds.forEach((id) => { if (!publishedIds.has(id) || mappedIds.includes(id)) failures.push(`Pending language route is invalid or already verified: ${id}`); });
  englishArabicRouteMappings.forEach((record) => {
    if (!record.englishCanonical.startsWith(`${ENGLISH_PRODUCTION_ORIGIN}/`)) failures.push(`${record.routeId}: invalid English authority.`);
    if (record.englishCanonical !== record.englishEvidence.declaredCanonical) failures.push(`${record.routeId}: English canonical evidence mismatch.`);
    if (record.arabicCanonical && record.arabicCanonical !== record.arabicEvidence?.declaredCanonical) failures.push(`${record.routeId}: Arabic canonical evidence mismatch.`);
    if (record.arabicCanonical && (!record.arabicCanonical.startsWith(`${ARABIC_PRODUCTION_ORIGIN}/`) || !record.arabicCanonical.endsWith("/"))) failures.push(`${record.routeId}: invalid Arabic canonical form.`);
    if (record.xDefaultAppropriate) failures.push(`${record.routeId}: x-default is not approved.`);
    if (record.equivalenceStatus === "true-equivalent") {
      if (!record.samePrimaryIntent || !record.arabicEvidence || !record.reciprocalEnglishTagRequired || !record.reciprocalArabicTagRequired) failures.push(`${record.routeId}: true-equivalent evidence is incomplete.`);
      if (record.englishEvidence.httpStatus !== 200 || !record.englishEvidence.indexable || record.arabicEvidence?.httpStatus !== 200 || !record.arabicEvidence?.indexable) failures.push(`${record.routeId}: true-equivalent page is not verified live/indexable.`);
    } else if (record.reciprocalEnglishTagRequired || record.reciprocalArabicTagRequired) {
      failures.push(`${record.routeId}: non-equivalent record must not request reciprocal tags.`);
    }
  });
  return failures;
};

const statusLabel: Record<LanguageEquivalenceStatus, string> = {
  "true-equivalent": "True equivalent",
  "related-not-equivalent": "Related, not equivalent",
  "no-equivalent": "No equivalent",
  "arabic-page-absent": "Arabic page absent",
  "english-page-not-ready": "English page not ready",
};

const escapeTableCell = (value: string) => value.replace(/\|/g, "\\|").replace(/\n/g, " ");

export const generateEnglishArabicMappingReport = () => {
  const rows = englishArabicRouteMappings.map((record) => [
    `\`${record.englishCanonical}\``,
    record.arabicCanonical ? `\`${record.arabicCanonical}\`` : "—",
    statusLabel[record.equivalenceStatus],
    record.reciprocalEnglishTagRequired ? "Required in coordinated release" : "Not approved",
    record.reciprocalArabicTagRequired ? "Required in coordinated release" : "Not approved",
    "No",
    record.blockers.join(" "),
  ].map(escapeTableCell).join(" | "));

  return `# English–Arabic Canonical Mapping Evidence\n\n` +
    `Verified: ${LANGUAGE_MAP_VERIFIED_AT}\n\n` +
    `This report records the exact self-canonical URLs reviewed for all ${languageMappingSummary.total} published English routes on \`yachtrentaldxb.com\` and their Arabic candidates on \`yacht-dxb.com\`. The five PR 8B support/legal owners received a fresh production-side review in PR 9. This is evidence for a future coordinated implementation, not live alternate-link output.\n\n` +
    `## Release state\n\n` +
    `- Published English routes reviewed: ${languageMappingSummary.total}.\n` +
    `- True equivalents: ${languageMappingSummary.trueEquivalents}.\n` +
    `- Related but not equivalent: ${languageMappingSummary.relatedNotEquivalent}.\n` +
    `- Unmapped routes: ${languageMappingSummary.unmapped}.\n` +
    `- Routes pending production language review: ${languageMappingPendingRouteIds.length}.\n` +
    `- Live \`hreflang\`: absent.\n` +
    `- Live \`x-default\`: absent and not approved.\n` +
    `- Reciprocal tags: not published. A true-equivalent row requires both the English and Arabic tags to ship in one coordinated future release.\n\n` +
    `## Evidence method\n\n` +
    `On ${LANGUAGE_MAP_VERIFIED_AT}, both sides of every row were requested directly. The recorded pages returned HTTP 200, declared \`index, follow\`, and self-canonicalized to the exact URLs below. The Arabic FAQ candidate was followed to its single canonical owner before review. Arabic membership was also compared with the live Arabic sitemap. Equivalence was accepted only when page intent and visible factual identity aligned; a price, identity, taxonomy or legal-copy conflict keeps a row out of the true-equivalent set. Exact URL form is preserved: English inner canonicals have no trailing slash, while Arabic canonicals are encoded HTTPS URLs with a trailing slash.\n\n` +
    `This live review supersedes older candidate-only mapping status for the currently published English set, but it does not rewrite the historical audit or authorize a deployment. Search Console Live URL Tests and reciprocal implementation approval remain separate release gates.\n\n` +
    `## Mapping table\n\n` +
    `English canonical | Arabic canonical | Equivalence | English reciprocal tag | Arabic reciprocal tag | x-default | Blocker or release condition\n` +
    `--- | --- | --- | --- | --- | --- | ---\n` +
    `${rows.join("\n")}\n\n` +
    `## Non-equivalent findings\n\n` +
    `- \`/occasions\` is a seven-theme English chooser; the reviewed Arabic page is a focused yacht-for-occasions commercial owner.\n` +
    `- Azimut 42, Majesty 44 and Oryx 50 publish conflicting hourly prices across the two sites.\n` +
    `- The English Heysea 90 and Arabic هايغان 90 public identities require owner verification.\n` +
    `- The Terms and Privacy pages remain related but non-equivalent because the separately approved legal texts differ in responsible-party disclosure, effective date and material detail.\n` +
    `- No row in this section may emit reciprocal alternate tags until its conflict is resolved and the mapping is reverified.\n`;
};
