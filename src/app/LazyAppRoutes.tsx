import { lazy } from "react";
import { RouteTable, type RoutePages } from "./RouteTable";

const pages: RoutePages = {
  Index: lazy(() => import("@/pages/Index")),
  Yachts: lazy(() => import("@/pages/Yachts")),
  YachtDetails: lazy(() => import("@/pages/YachtDetails")),
  Services: lazy(() => import("@/pages/Services")),
  ServiceDetails: lazy(() => import("@/pages/ServiceDetails")),
  Occasions: lazy(() => import("@/pages/Occasions")),
  About: lazy(() => import("@/pages/About")),
  FAQ: lazy(() => import("@/pages/FAQ")),
  Contact: lazy(() => import("@/pages/Contact")),
  Terms: lazy(() => import("@/pages/Terms")),
  Privacy: lazy(() => import("@/pages/Privacy")),
  NotFound: lazy(() => import("@/pages/NotFound")),
};

export const LazyAppRoutes = ({ forceNotFound = false }: { forceNotFound?: boolean }) => <RouteTable pages={pages} forceNotFound={forceNotFound} />;
