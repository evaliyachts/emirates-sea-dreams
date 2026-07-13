import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { CommercialHero, FaqSection, Section } from "@/components/commercial/DecisionSections";
import SEOHead from "@/components/shared/SEOHead";
import YachtCard from "@/components/shared/YachtCard";
import { publishableYachts } from "@/data/yachts";
import { formatAed, publishedFleetSummary } from "@/lib/published-fleet";

const catalogueFaqs = [
  {
    question: "Which facts can I compare in this catalogue?",
    answer: "Every published record states its length, maximum guest capacity, year built, hourly price, minimum duration and bedroom count when that field was approved. The site does not add unsupported yacht-type labels.",
  },
  {
    question: "How should I use the guest-capacity number?",
    answer: "Treat it as the stated maximum for comparison. Select a yacht whose published capacity is at least your complete expected group size, then reconfirm the count during the request.",
  },
  {
    question: "Are bedroom counts available for every published yacht?",
    answer: "Bedroom information appears only when it is part of the approved record. An omitted bedroom count should not be interpreted as zero or as evidence of another layout.",
  },
  {
    question: "Why does every yacht say availability is on request?",
    answer: "The source availability value is not a date-specific booking confirmation. Availability must be checked again for the requested date, time and duration.",
  },
] as const;

const Yachts = () => (
  <Layout>
    <SEOHead
      title="Yachts for Rent in Dubai | Compare 19 Verified Records"
      description="Compare 19 published Dubai yacht records by capacity, hourly price, minimum duration, length and verified vessel facts."
      path="/yachts"
    />
    <div data-commercial-content>

    <CommercialHero
      eyebrow="Published yacht catalogue"
      title="Compare Yachts for Rent in Dubai by Verified Facts"
      introduction="Use this catalogue when your main task is comparing private yachts—not reading another general rental page. Every linked record has passed the English site's fact and media publication checks."
      directAnswer={`There are ${publishedFleetSummary.yachtCount} published yachts to compare. Stated capacities range from ${publishedFleetSummary.guestCapacity.minimum} to ${publishedFleetSummary.guestCapacity.maximum} guests, verified hourly prices range from ${formatAed(publishedFleetSummary.pricePerHour.minimum)} to ${formatAed(publishedFleetSummary.pricePerHour.maximum)}, and minimum durations range from ${publishedFleetSummary.minimumDuration.minimum} to ${publishedFleetSummary.minimumDuration.maximum} hours. Availability is on request for every record.`}
    >
      <div className="mt-8 flex flex-wrap gap-4">
        <a href="#published-yachts" className="liquid-btn-primary px-6 py-3">Browse the catalogue</a>
        <Link to="/#booking-request-guide" className="liquid-btn px-6 py-3 text-foreground">Prepare a request</Link>
      </div>
    </CommercialHero>

    <Section title="A practical comparison order">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[
          ["1. Group size", "Eliminate records whose stated guest capacity is below your expected group."],
          ["2. Minimum time", "Check the yacht-specific minimum before selecting your preferred duration."],
          ["3. Hourly price", "Calculate the base amount from the verified rate and requested hours."],
          ["4. Vessel facts", "Compare length, year built and bedrooms only where those facts are published."],
        ].map(([title, copy]) => (
          <article key={title} className="liquid-glass p-6">
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
          </article>
        ))}
      </div>
    </Section>

    <section id="published-yachts" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">All published yacht records</h2>
        <p className="mb-8 max-w-3xl leading-7 text-muted-foreground">
          Card prices are hourly AED amounts. The detail page shows the same approved facts and media. No package inclusion, fixed route or instant availability is implied.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publishableYachts.map((yacht, index) => <YachtCard key={yacht.id} yacht={yacht} index={index} />)}
        </div>
      </div>
    </section>

    <Section title="From comparison to a request">
      <div className="liquid-glass-gold max-w-4xl p-7">
        <p className="leading-7 text-muted-foreground">
          Record the yacht name, preferred date, requested hours and full guest count. Add any service or occasion request separately so it can be checked rather than assumed. The homepage request guide explains the information to prepare without sending you to an unpublished contact route.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/#booking-request-guide" className="liquid-btn-primary px-6 py-3">Open the request guide</Link>
          <Link to="/services" className="liquid-btn px-6 py-3 text-foreground">Review service categories</Link>
        </div>
      </div>
    </Section>

    <FaqSection title="Yacht comparison questions" faqs={catalogueFaqs} />
    </div>
  </Layout>
);

export default Yachts;
