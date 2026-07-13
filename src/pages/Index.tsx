import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { CommercialHero, FaqSection, Section } from "@/components/commercial/DecisionSections";
import SEOHead from "@/components/shared/SEOHead";
import YachtCard from "@/components/shared/YachtCard";
import { publishableYachts } from "@/data/yachts";
import { formatAed, publishedFleetSummary } from "@/lib/published-fleet";

const featuredYachts = publishableYachts.filter((yacht) => yacht.featured).slice(0, 3);

const homepageFaqs = [
  {
    question: "Is this a private yacht rental or a shared cruise?",
    answer: "The published fleet is presented for private yacht requests. It is not described as a public, ticketed or shared cruise service.",
  },
  {
    question: "How is the starting rental cost calculated?",
    answer: `Each yacht has a verified hourly rate and minimum duration. The current catalogue ranges from ${formatAed(publishedFleetSummary.pricePerHour.minimum)} to ${formatAed(publishedFleetSummary.pricePerHour.maximum)} per hour, with minimum durations from ${publishedFleetSummary.minimumDuration.minimum} to ${publishedFleetSummary.minimumDuration.maximum} hours. Any additional request must be confirmed separately.`,
  },
  {
    question: "What information should I prepare before making a request?",
    answer: "Prepare your preferred date, requested duration, guest count, yacht shortlist and any optional occasion or service requests. Availability and additional details still need confirmation.",
  },
  {
    question: "Does the catalogue guarantee that a yacht is available?",
    answer: "No. Every published yacht is shown as available on request. Current availability must be confirmed again for the requested date and time.",
  },
] as const;

const Index = () => (
  <Layout>
    <SEOHead
      title="Private Yacht Rental Dubai | Compare Verified Yachts"
      description="Compare 19 verified private yachts in Dubai by hourly price, guest capacity and minimum duration, then prepare a factual rental request."
      path="/"
    />
    <div data-commercial-content>

    <CommercialHero
      eyebrow="Private yacht decision guide"
      title="Private Yacht Rental in Dubai, Compared with Verified Facts"
      introduction="Choose a private yacht by the decisions that affect your request: group size, hourly price, minimum duration and verified vessel facts. Rental, hire and charter are treated here as ways people describe the same private-yacht decision—not as reasons to create repetitive pages."
      directAnswer={`The current published catalogue contains ${publishedFleetSummary.yachtCount} verified yacht records from ${publishedFleetSummary.lengthFt.minimum} to ${publishedFleetSummary.lengthFt.maximum} feet, for stated capacities from ${publishedFleetSummary.guestCapacity.minimum} to ${publishedFleetSummary.guestCapacity.maximum} guests. Hourly prices run from ${formatAed(publishedFleetSummary.pricePerHour.minimum)} to ${formatAed(publishedFleetSummary.pricePerHour.maximum)}, and every yacht remains subject to availability confirmation.`}
    >
      <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/yachts" className="liquid-btn-primary inline-flex items-center gap-2 px-6 py-3">
          Compare verified yachts <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/occasions" className="liquid-btn inline-flex items-center gap-2 px-6 py-3 text-foreground">
          Plan an occasion
        </Link>
      </div>
    </CommercialHero>

    <Section title="Choose by capacity, duration and price">
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Start with guest capacity", "Use the stated maximum capacity as a firm comparison point. Do not select a yacht that lists fewer places than your expected group."],
          ["Check the minimum duration", `Published minimums currently range from ${publishedFleetSummary.minimumDuration.minimum} to ${publishedFleetSummary.minimumDuration.maximum} hours. Your requested duration should meet the selected yacht's own minimum.`],
          ["Calculate the base hourly amount", "Multiply the yacht's verified hourly price by the requested hours, subject to its minimum duration. Optional requests are not assumed to be included in that calculation."],
        ].map(([title, copy]) => (
          <article key={title} className="liquid-glass p-6">
            <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">{title}</h3>
            <p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
          </article>
        ))}
      </div>
    </Section>

    <Section title="Three factual examples from the published fleet">
      <p className="mb-7 max-w-3xl leading-7 text-muted-foreground">
        These examples show different verified sizes and capacities. They are not package recommendations, and their availability must be confirmed for your date.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredYachts.map((yacht, index) => <YachtCard key={yacht.id} yacht={yacht} index={index} />)}
      </div>
      <Link to="/yachts" className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
        See all {publishedFleetSummary.yachtCount} published yacht records <ArrowRight className="h-4 w-4" />
      </Link>
    </Section>

    <Section title="Private rental, hire, charter and luxury searches">
      <div className="grid gap-5 md:grid-cols-2">
        <article className="liquid-glass p-6">
          <h3 className="text-xl font-semibold text-foreground">One private-yacht task, several common terms</h3>
          <p className="mt-3 leading-7 text-muted-foreground">
            Visitors may search for yacht rental, yacht hire or yacht charter in Dubai. On this site, the useful next step is the same: compare the published vessels and prepare a private request. Separate synonym-only pages are not published.
          </p>
        </article>
        <article className="liquid-glass p-6">
          <h3 className="text-xl font-semibold text-foreground">Treat “luxury” as a comparison question</h3>
          <p className="mt-3 leading-7 text-muted-foreground">
            The catalogue does not invent yacht classes or amenities. Compare the verified length, capacity, year built, bedrooms where recorded, hourly price and minimum duration on each detail page, then confirm any feature important to your request.
          </p>
        </article>
      </div>
    </Section>

    <Section id="booking-request-guide" title="Prepare a yacht booking request">
      <div className="liquid-glass-gold max-w-4xl p-7 md:p-9">
        <ol className="grid gap-5 md:grid-cols-3">
          <li><strong className="block text-foreground">1. Shortlist a yacht</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare verified capacity, price and minimum duration in the catalogue.</span></li>
          <li><strong className="block text-foreground">2. Prepare your details</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Note the date, start-time preference, duration, guest count and any optional request.</span></li>
          <li><strong className="block text-foreground">3. Request confirmation</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">The booking channel and availability must be confirmed; this website does not promise instant confirmation.</span></li>
        </ol>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link to="/yachts" className="liquid-btn-primary px-6 py-3">Build your shortlist</Link>
          <Link to="/services" className="liquid-btn px-6 py-3 text-foreground">Review optional service categories</Link>
        </div>
      </div>
    </Section>

    <FaqSection title="Private yacht rental questions" faqs={homepageFaqs} />
    </div>
  </Layout>
);

export default Index;
