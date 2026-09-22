import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { CommercialHero, FaqSection, Section } from "@/components/commercial/DecisionSections";
import SEOHead from "@/components/shared/SEOHead";
import BookingActions from "@/components/shared/BookingActions";
import { approvedServices } from "@/data/approved-services";
import { buildBreadcrumbSchema } from "@/lib/entity-schema";

const Services = () => (
  <Layout>
    <SEOHead title="Private Yacht Celebrations & Services | Dubai Yacht" description="Explore birthday parties, proposals, wedding celebrations and private yacht trips. Compare planning options and request availability with Dubai Yacht." path="/services" jsonLd={buildBreadcrumbSchema("/services", [{name:"Home",path:"/"},{name:"Services",path:"/services"}])} />
    <div data-commercial-content>
      <CommercialHero eyebrow="Private yacht services" title="Plan Your Time on the Water"
        introduction="Find planning guidance for your celebration, trip or hospitality request. Each service below explains what to consider, which details to share and how to compare yacht options for your group."
        directAnswer="Choose an occasion below, then send your date, guest count and yacht shortlist. Decorations, food, photography and other extras are optional requests with separate pricing and availability checks.">
        <div className="mt-5"><BookingActions /></div>
      </CommercialHero>
      <Section title="Explore celebrations and trips">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{approvedServices.map((service)=><Link key={service.id} to={service.path} data-approved-service-link className="liquid-glass block p-6 hover:border-primary"><h3 className="text-xl font-semibold">{service.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{service.whoItIsFor}</p><span className="mt-4 inline-block text-primary underline">View planning details</span></Link>)}</div>
      </Section>
      <Section title="Choose the yacht first"><p className="max-w-3xl leading-7 text-muted-foreground">Your guest count, rental duration and budget help narrow the options. Review yacht photos and specifications, then ask about the layout, access or equipment your event needs.</p><Link to="/yachts" className="mt-4 inline-flex min-h-11 items-center text-primary underline">Compare yacht prices and capacities</Link></Section>
      <Section title="Tell us what matters to your group"><p className="max-w-3xl leading-7 text-muted-foreground">Share your preferred date, timing and complete guest count. Add any dietary requirements, access needs or supplier plans early so the team can check the details before sending a quote.</p></Section>
      <Section title="Review the full quote"><p className="max-w-3xl leading-7 text-muted-foreground">Check the yacht, rental time, departure details, agreed extras and total price. Review the payment, cancellation and change terms for your booking before confirming.</p><Link to="/contact" className="mt-4 inline-flex min-h-11 items-center text-primary underline">Request a Quote</Link></Section>
      <FaqSection title="Planning questions" faqs={[
        {question:"Are decorations or food part of the yacht rate?",answer:"Treat them as optional extras. Describe what you would like and ask for the available options and separate prices."},
        {question:"Can I use my own supplier?",answer:"Tell the team who you would like to use and what access or setup time they need. Permission depends on the yacht and arrangements."},
        {question:"Can I discuss a different occasion?",answer:"Yes. Share the purpose of your trip and your group details. The team will explain what can be arranged for the yacht and date."},
        {question:"Where can I see the yacht prices?",answer:"The yacht catalogue lists hourly rates, capacities and minimum rental durations. Individual pages show photos and specifications."},
      ]} />
    </div>
  </Layout>
);
export default Services;
