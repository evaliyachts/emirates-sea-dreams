import { RouteTable } from "./RouteTable";
import Index from "@/pages/Index";
import Yachts from "@/pages/Yachts";
import YachtDetails from "@/pages/YachtDetails";
import Services from "@/pages/Services";
import ServiceDetails from "@/pages/ServiceDetails";
import Occasions from "@/pages/Occasions";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";

// Static rendering and synchronous component tests use eager pages.
// Production browsers import LazyAppRoutes, so these imports do not enter the entry bundle.
export const AppRoutes = ({ forceNotFound = false }: { forceNotFound?: boolean }) => (
  <RouteTable forceNotFound={forceNotFound} pages={{ Index, Yachts, YachtDetails, Services, ServiceDetails, Occasions, About, FAQ, Contact, Terms, Privacy, NotFound }} />
);
