import { englishRouteManifest } from "./routes";

export const plannedNavigationTargets = englishRouteManifest.map((route) => ({
  id: route.id,
  path: route.path,
  activation: "deferred-to-pr3" as const,
}));

export const routeQaExpectations = englishRouteManifest.map((route) => ({
  id: route.id,
  path: route.path,
  currentHttpStatus: route.currentHttpStatus,
  targetIndexable: route.targetIndexable,
  pr3RenderingEligibility: route.pr3RenderingEligibility,
  requiresRouteSpecificInitialHtml: route.pr3RenderingEligibility === "eligible",
  publicOutputActivation: "deferred-to-pr3" as const,
}));
