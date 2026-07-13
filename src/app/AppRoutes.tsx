import { Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Yachts from "@/pages/Yachts";
import YachtDetails from "@/pages/YachtDetails";
import Offers from "@/pages/Offers";
import Services from "@/pages/Services";
import ServiceDetails from "@/pages/ServiceDetails";
import Occasions from "@/pages/Occasions";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";

export const AppRoutes = ({ forceNotFound = false }: { forceNotFound?: boolean }) => {
  if (forceNotFound) {
    return <Routes><Route path="*" element={<NotFound />} /></Routes>;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/yachts" element={<Yachts />} />
      <Route path="/yachts/:slug" element={<YachtDetails />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetails />} />
      <Route path="/occasions" element={<Occasions />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
