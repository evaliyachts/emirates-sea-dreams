import { ArrowRight, Compass, ListChecks } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";

const CTAStrip = () => (
  <section data-home-section="final-actions" className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
    <div className="container relative z-10 mx-auto px-4 text-center">
      <AnimatedSection>
        <h2 className="mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
          Ready to Build a Factual Yacht Shortlist?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
          Compare verified records first, then prepare the date, duration, guest count and optional requests that still need confirmation.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/yachts" className="liquid-btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base">
            <ListChecks className="h-5 w-5" aria-hidden="true" /> Compare yachts
          </Link>
          <Link to="/services" className="liquid-btn inline-flex items-center justify-center gap-2 px-8 py-4 text-foreground">
            <ArrowRight className="h-5 w-5" aria-hidden="true" /> Plan optional services
          </Link>
          <Link to="/occasions" className="liquid-btn-gold inline-flex items-center justify-center gap-2 px-8 py-4 text-primary">
            <Compass className="h-5 w-5" aria-hidden="true" /> Choose an occasion
          </Link>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default CTAStrip;
