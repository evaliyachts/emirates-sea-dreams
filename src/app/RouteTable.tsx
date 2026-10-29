import { Suspense, type ComponentType } from "react";
import { Route, Routes } from "react-router-dom";

export type RoutePageName = "Index" | "Yachts" | "YachtDetails" | "Services" | "ServiceDetails" | "Occasions" | "About" | "FAQ" | "Contact" | "Terms" | "Privacy" | "NotFound";
export type RoutePages = Record<RoutePageName, ComponentType>;

export const RouteTable = ({ pages, forceNotFound = false }: { pages: RoutePages; forceNotFound?: boolean }) => {
  const { Index, Yachts, YachtDetails, Services, ServiceDetails, Occasions, About, FAQ, Contact, Terms, Privacy, NotFound } = pages;
  return (
    <Suspense fallback={<main id="main-content" className="min-h-screen pt-28 px-4"><p role="status">Loading page…</p></main>}>
      <Routes>
        {forceNotFound ? <Route path="*" element={<NotFound />} /> : <>
          <Route path="/" element={<Index />} />
          <Route path="/yachts" element={<Yachts />} />
          <Route path="/yachts/:slug" element={<YachtDetails />} />
          <Route path="/offers" element={<NotFound />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />
          <Route path="/occasions" element={<Occasions />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </>}
      </Routes>
    </Suspense>
  );
};
