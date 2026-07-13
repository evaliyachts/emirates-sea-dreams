import type { RedirectCandidate } from "./contracts";

export const redirectCandidates: readonly RedirectCandidate[] = [
  {
    from: "/services/engagement-and-wedding-parties",
    status: "candidate",
    evidenceRequired: [
      "Search Console Query × Page evidence",
      "Search Console Links evidence",
      "Intent comparison with dedicated engagement and wedding routes",
      "A selected approved canonical destination returning 200",
    ],
    risk: "high",
  },
  {
    from: "/yachts/evali-yacht-55ft-yacht-rental-dubai",
    status: "candidate",
    evidenceRequired: [
      "Search Console Query × Page evidence",
      "Search Console Links evidence",
      "Historical inbound path evidence",
      "An approved neutral yacht owner returning 200",
    ],
    risk: "high",
  },
];

export const approvedRedirects: readonly RedirectCandidate[] = [];
