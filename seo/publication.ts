import { englishRouteManifest } from "./routes";

export const publishedStaticRoutes = englishRouteManifest.filter(
  (route) =>
    route.pr3RenderingEligibility === "eligible" &&
    route.approvedCanonicalOwner &&
    route.targetIndexable,
);

export const blockedStaticRoutes = englishRouteManifest.filter(
  (route) => !publishedStaticRoutes.includes(route),
);
