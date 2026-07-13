import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const SEOContentSection = () => (
  <section data-home-section="rental-guide" className="section-padding liquid-divider">
    <div className="container mx-auto max-w-5xl px-4">
      <AnimatedSection initiallyVisible className="mb-10 text-center">
        <span className="liquid-pill inline-block">Private yacht guide</span>
        <h2 className="mt-4 mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
          Rental, Hire and Charter: One Private-Yacht Decision
        </h2>
        <p className="mx-auto max-w-3xl leading-relaxed text-muted-foreground">
          Visitors may use different words for the same broad task. The useful next step is to compare the published vessels and prepare one private request—not to rely on repetitive synonym pages or unsupported service promises.
        </p>
      </AnimatedSection>

      <AnimatedSection initiallyVisible className="space-y-10">
        <article className="liquid-glass p-6 md:p-8">
          <h3 className="mb-3 text-2xl font-display font-bold text-foreground">
            Compare verified vessel facts first
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Whether the search says yacht rental, yacht hire or yacht charter in Dubai, begin with the same factual fields: maximum guest capacity, length, year built, hourly price, minimum duration and bedrooms where recorded. The <Link to="/yachts" className="font-semibold text-primary hover:underline">published yacht catalogue</Link> lets you compare those fields without inventing a class, amenity or inclusion.
          </p>
        </article>

        <article className="liquid-glass p-6 md:p-8">
          <h3 className="mb-3 text-2xl font-display font-bold text-foreground">
            Treat “luxury” as a question to verify
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            A luxury search does not authorize the site to infer equipment, service levels or vessel categories. Use the verified detail page to shortlist by facts, then ask for confirmation of any feature, operating detail or optional arrangement important to your group.
          </p>
        </article>

        <article id="booking-request-guide" className="liquid-glass p-6 md:p-8">
          <h3 className="mb-4 text-2xl font-display font-bold text-foreground">
            Prepare a yacht booking request
          </h3>
          <ol className="grid gap-5 md:grid-cols-3">
            <li>
              <strong className="block text-foreground">1. Shortlist a yacht</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare verified capacity, price and minimum duration in the catalogue.</span>
            </li>
            <li>
              <strong className="block text-foreground">2. Prepare your details</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Note the date, start-time preference, duration, guest count and any optional request.</span>
            </li>
            <li>
              <strong className="block text-foreground">3. Request confirmation</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">The booking channel and availability must be confirmed; this website does not promise instant confirmation.</span>
            </li>
          </ol>
        </article>

        <div className="liquid-glass-gold p-6 text-center md:p-8">
          <h3 className="mb-4 text-2xl font-display font-bold text-foreground">Continue through published owners</h3>
          <p className="mx-auto mb-5 max-w-2xl leading-relaxed text-muted-foreground">
            Compare yacht records, review optional service categories or organize an occasion theme before requesting confirmation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/yachts" className="liquid-pill transition-transform hover:scale-105">Compare yachts</Link>
            <Link to="/services" className="liquid-pill transition-transform hover:scale-105">Plan optional services</Link>
            <Link to="/occasions" className="liquid-pill transition-transform hover:scale-105">Choose an occasion</Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default SEOContentSection;
