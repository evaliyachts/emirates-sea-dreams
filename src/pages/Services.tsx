import { Link } from "react-router-dom";
import { CircleHelp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { CommercialHero, FaqSection, Section, YachtFactLinks } from "@/components/commercial/DecisionSections";
import SEOHead from "@/components/shared/SEOHead";
import { approvedServices } from "@/data/approved-services";
import { publishedYachtsById } from "@/lib/published-fleet";

const comparisonYachts = publishedYachtsById("yacht-azimut-42", "yacht-majesty-56", "yacht-majesty-88");

const serviceCategories = [
  {
    title: "Celebration planning",
    copy: "Start with the guest count, the kind of gathering and the space you need. Decoration, cake, photography, music, food and other additions are optional requests that require separate confirmation and pricing.",
  },
  {
    title: "Romance requests",
    copy: "For proposals, engagements or anniversaries, prepare the preferred date, group size and any setup request. No decoration, route, privacy feature or supplier service is assumed from the occasion label.",
  },
  {
    title: "Hospitality requests",
    copy: "Food, barbecue, afternoon tea and similar hospitality ideas are not default inclusions. Ask what is available for the chosen yacht, date and group, and request the separate price before relying on it.",
  },
  {
    title: "Water activity requests",
    copy: "Swimming, fishing, Jet Ski, banana-boat and donut-ride ideas require specific safety, supplier, location and operating confirmation. A category on this page is not a guarantee that an activity can be supplied.",
  },
  {
    title: "Private experience planning",
    copy: "Morning timing, private gatherings and other experience ideas should be treated as planning preferences. Duration, departure process, route and availability remain subject to confirmation.",
  },
] as const;

const serviceFaqs = [
  {
    question: "Are the service ideas included in the yacht's hourly price?",
    answer: "No inclusion is assumed. Optional decoration, catering, photography, music, barbecue, Jet Ski or another activity must be confirmed for the selected yacht and priced separately unless a future approved record states otherwise.",
  },
  {
    question: "Can I choose a fixed sightseeing route here?",
    answer: "No fixed route is published on this hub. Route and operating details depend on the confirmed request and must not be inferred from photographs or category names.",
  },
  {
    question: "Which individual service pages are currently published?",
    answer: "Ten owner-approved private celebration, experience and hospitality pages are linked from this hub. Eight historical service owners remain blocked because their capability or operating facts are not approved.",
  },
  {
    question: "Should I choose a yacht before discussing optional services?",
    answer: "A shortlist is useful because capacity, minimum duration and hourly price differ by yacht. Additional requests can then be checked against that specific vessel and date.",
  },
] as const;

const Services = () => (
  <Layout>
    <SEOHead
      title="Private Yacht Service Planning in Dubai | Optional Requests"
      description="Plan private yacht celebration, romance, hospitality, water-activity and experience requests without assuming inclusions or availability."
      path="/services"
    />
    <div data-commercial-content>

    <CommercialHero
      eyebrow="Service planning hub"
      title="Plan Optional Services for a Private Yacht Request"
      introduction="Use this hub to identify the kind of private experience you want and the facts that still need confirmation. It does not publish all-inclusive packages or turn unverified service detail routes into bookable pages."
      directAnswer="Choose a category, shortlist a published yacht, then describe each optional request separately. Decoration, cake, catering, photography, music, barbecue, Jet Ski and other activities are optional, subject to confirmation and separate pricing; they are not presented as standard inclusions."
    >
      <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/occasions" className="liquid-btn-primary px-6 py-3">Choose an occasion theme</Link>
        <Link to="/yachts" className="liquid-btn px-6 py-3 text-foreground">Compare published yachts</Link>
      </div>
    </CommercialHero>

    <Section title="Five planning categories">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {serviceCategories.map((category) => (
          <article key={category.title} data-service-category className="liquid-glass p-6">
            <CircleHelp className="h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">{category.title}</h3>
            <p className="mt-3 leading-7 text-muted-foreground">{category.copy}</p>
          </article>
        ))}
      </div>
    </Section>

    <Section title="Ten approved service requests">
      <p className="mb-6 max-w-4xl leading-7 text-muted-foreground">
        Each page below describes a requestable private-yacht service with its own planning questions and factual yacht comparisons. Availability remains on request and subject to confirmation, and no page assumes an optional item or supplier.
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {approvedServices.map((service) => (
          <Link
            key={service.id}
            to={service.path}
            data-approved-service-link
            className="liquid-glass block p-6 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{service.category.replace("-", " ")}</p>
            <h3 className="mt-3 text-xl font-semibold text-foreground">{service.name}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">On request and subject to confirmation.</p>
          </Link>
        ))}
      </div>
    </Section>

    <Section title="What to confirm before relying on an optional service">
      <div className="grid gap-5 md:grid-cols-2">
        <article className="liquid-glass-gold p-7">
          <h3 className="text-xl font-semibold text-foreground">Request details</h3>
          <ul className="mt-4 space-y-3 leading-7 text-muted-foreground">
            <li>Selected yacht and complete guest count</li>
            <li>Preferred date, timing and requested duration</li>
            <li>Each optional item, supplier or setup you want checked</li>
            <li>Any accessibility, dietary or safety question requiring confirmation</li>
          </ul>
        </article>
        <article className="liquid-glass p-7">
          <h3 className="text-xl font-semibold text-foreground">Confirmation boundaries</h3>
          <p className="mt-4 leading-7 text-muted-foreground">
            Do not assume a service is supplied because it appears in a planning category. Ask whether it is available for the chosen yacht and date, what it costs, who supplies it, and whether operational restrictions apply. Confirmation belongs to the booking process, not this informational page.
          </p>
        </article>
      </div>
    </Section>

    <YachtFactLinks
      title="Published yachts to begin a factual comparison"
      yachts={comparisonYachts}
      note="These records demonstrate different capacities and hourly prices. They are not service-package recommendations; use their verified facts to build a shortlist before requesting optional arrangements."
    />

    <Section title="Continue through published owners">
      <div className="flex flex-wrap gap-4">
        <Link to="/occasions" className="liquid-btn-primary px-6 py-3">Browse occasion themes</Link>
        <Link to="/yachts" className="liquid-btn px-6 py-3 text-foreground">Compare the full fleet</Link>
        <Link to="/#booking-request-guide" className="liquid-btn px-6 py-3 text-foreground">Prepare request details</Link>
      </div>
    </Section>

    <FaqSection title="Optional-service planning questions" faqs={serviceFaqs} />
    </div>
  </Layout>
);

export default Services;
