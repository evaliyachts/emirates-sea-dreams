export interface SearchConsoleAggregateBaseline {
  reportDate: "2026-06-30";
  reportFilter: "All known pages";
  knownUrls: 55;
  indexed: 1;
  discoveredCurrentlyNotIndexed: 45;
  notFound: 6;
  crawledCurrentlyNotIndexed: 2;
  pageWithRedirect: 1;
  submittedSitemapMappingConfirmed: false;
  inferredSitemapArithmetic: {
    expression: "1 + 45 + 6 = 52";
    result: 52;
    confidence: "inferred";
    assignsIndividualRoutes: false;
  };
  urlLevelIssueExamples: readonly [];
}

export const searchConsoleAggregateBaseline: SearchConsoleAggregateBaseline = {
  reportDate: "2026-06-30",
  reportFilter: "All known pages",
  knownUrls: 55,
  indexed: 1,
  discoveredCurrentlyNotIndexed: 45,
  notFound: 6,
  crawledCurrentlyNotIndexed: 2,
  pageWithRedirect: 1,
  submittedSitemapMappingConfirmed: false,
  inferredSitemapArithmetic: {
    expression: "1 + 45 + 6 = 52",
    result: 52,
    confidence: "inferred",
    assignsIndividualRoutes: false,
  },
  urlLevelIssueExamples: [],
};
