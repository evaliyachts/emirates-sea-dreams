import { englishRouteManifest } from "./routes";
import { publishableYachts } from "../src/data/yachts";

const publishableYachtIds = new Set(publishableYachts.map((yacht) => yacht.id));

export const publishedStaticRoutes = englishRouteManifest.filter(
  (route) =>
    route.approvedCanonicalOwner &&
    route.targetIndexable &&
    (route.pr3RenderingEligibility === "eligible" ||
      (route.pageType === "yacht" && publishableYachtIds.has(route.id))),
);

export const blockedStaticRoutes = englishRouteManifest.filter(
  (route) => !publishedStaticRoutes.includes(route),
);
