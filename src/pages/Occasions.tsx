import { Link } from "react-router-dom";
import { Briefcase, Cake, Camera, Fish, Heart, PartyPopper, Sunset } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { CommercialHero, FaqSection, Section, YachtFactLinks } from "@/components/commercial/DecisionSections";
import SEOHead from "@/components/shared/SEOHead";
import { publishedYachtsById } from "@/lib/published-fleet";
import { buildBreadcrumbSchema } from "@/lib/entity-schema";

const comparisonYachts = publishedYachtsById("yacht-royal-majesty-50", "yacht-sunseeker-90", "yacht-ocean-dream-143");

const occasionThemes = [
  { title: "Birthday", icon: Cake, need: "Decide the complete guest count, preferred timing and any optional setup request. Cake, decoration, music and photography are not assumed.", path: "/services/birthday-party" },
  { title: "Marriage proposal", icon: Heart, need: "Describe the preferred group size and optional setup. Privacy details, decorations, route and suppliers require confirmation.", path: "/services/marriage-proposal-party" },
  { title: "Corporate gathering", icon: Briefcase, need: "Treat this as a request theme pending capability confirmation. Prepare the group size, purpose and any layout or hospitality questions." },
  { title: "Fishing request", icon: Fish, need: "Fishing remains a hub-only idea because activity capability, equipment, safety and operating facts are not approved. No fishing detail page is published." },
  { title: "Sunset timing", icon: Sunset, need: "Request a preferred time rather than relying on a fixed sunset route or duration. Timing and operating details must be confirmed." },
  { title: "New Year's Eve", icon: PartyPopper, need: "Seasonal availability, duration, route, viewing and hospitality remain unverified. Treat this only as a planning request." },
  { title: "Photoshoot", icon: Camera, need: "Prepare the group size and shoot requirements. Photography, drone use, supplier access and permissions are separate confirmation questions." },
] as const;

const occasionFaqs = [
  {
    question: "Does each occasion theme have its own published page?",
    answer: "No. The seven source occasion records remain represented by this hub or overlap historical service intents. No new occasion slug has been created in this phase.",
  },
  {
    question: "How do I choose a yacht for an occasion?",
    answer: "Begin with the full guest count, then compare the published capacity, minimum duration and hourly price. A factual match on those fields does not confirm optional setup or activity capability.",
  },
  {
    question: "Are decorations, food or photography part of an occasion price?",
    answer: "No default occasion price or inclusion is published. Each optional item is subject to confirmation and separate pricing unless an approved future record says otherwise.",
  },
  {
    question: "Can an occasion request be confirmed instantly?",
    answer: "No instant-confirmation promise is made. Yacht availability, timing and every optional request must be checked for the selected date.",
  },
] as const;

const Occasions = () => (
  <Layout>
    <SEOHead
      title="Private Yacht Occasions in Dubai | Planning Guide"
      description="Compare seven private-yacht occasion themes, the decisions to prepare and verified yacht facts without assuming packages, routes or inclusions."
      path="/occasions"
      jsonLd={buildBreadcrumbSchema("/occasions", [
        { name: "Home", path: "/" },
        { name: "Occasions", path: "/occasions" },
      ])}
    />
    <div data-commercial-content>

    <CommercialHero
      eyebrow="Occasion chooser"
      title="Choose a Private Yacht Occasion by the Decisions It Requires"
      introduction="This hub helps turn an occasion idea into a careful request. It keeps all seven source themes on one published page, avoids unsupported detail routes and separates verified yacht facts from optional event arrangements."
      directAnswer="Start with the occasion, complete guest count, preferred date and requested duration. Then shortlist a yacht by verified capacity and price. Treat decoration, hospitality, photography, music and activities as separate requests subject to confirmation and separate pricing."
    >
      <div className="mt-8 flex flex-wrap gap-4">
        <a href="#occasion-themes" className="liquid-btn-primary px-6 py-3">Compare occasion themes</a>
        <Link to="/yachts" className="liquid-btn px-6 py-3 text-foreground">Compare yacht facts</Link>
      </div>
    </CommercialHero>

    <section id="occasion-themes" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Seven request themes, no invented packages</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {occasionThemes.map(({ title, icon: Icon, need, path }) => (
            <article key={title} data-occasion-theme className="liquid-glass p-6">
              <div className="liquid-icon h-11 w-11"><Icon className="h-5 w-5 text-primary" aria-hidden="true" /></div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {path ? <Link to={path} className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{title}</Link> : title}
              </h3>
              <p className="mt-3 leading-7 text-muted-foreground">{need}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <Section title="Related celebration requests to describe clearly">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[
          ["Engagement", "Separate the engagement request from a proposal and describe the expected group and any optional setup.", "/services/engagement-parties"],
          ["Wedding", "Treat a wedding request as a private celebration; no legal ceremony authority, supplier or package is promised.", "/services/wedding-parties"],
          ["Anniversary", "State the preferred date, group size and optional hospitality or setup questions without assuming inclusions.", "/services/wedding-anniversary-parties"],
          ["Family celebration", "Count every adult and child within the selected yacht's published capacity and list any specific needs for confirmation.", ""],
          ["Corporate or private gathering", "Capability remains subject to confirmation. Prepare the purpose, group size, timing and practical requirements.", ""],
        ].map(([title, copy, path]) => (
          <article key={title} className="liquid-glass-gold p-6">
            <h3 className="text-xl font-semibold text-foreground">
              {path ? <Link to={path} className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{title}</Link> : title}
            </h3>
            <p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
          </article>
        ))}
      </div>
    </Section>

    <Section title="Build the request in the right order">
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[
          ["Name the occasion", "Describe the user need without assuming a package or supplier."],
          ["Count every guest", "Use the yacht's published maximum capacity as a comparison limit."],
          ["Set a time request", "Prepare a date and duration that meets the chosen yacht's minimum."],
          ["List optional items", "Separate each setup, hospitality, media or activity request for confirmation."],
        ].map(([title, copy]) => (
          <li key={title} className="liquid-glass p-6">
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
          </li>
        ))}
      </ol>
    </Section>

    <YachtFactLinks
      title="Three yacht records for capacity comparison"
      yachts={comparisonYachts}
      note="These examples span different published capacities and prices. They do not claim that a yacht is suitable or available for a particular occasion; confirm the complete request after shortlisting."
    />

    <Section title="Continue without entering an unpublished route">
      <div className="flex flex-wrap gap-4">
        <Link to="/yachts" className="liquid-btn-primary px-6 py-3">Compare all published yachts</Link>
        <Link to="/services" className="liquid-btn px-6 py-3 text-foreground">Review optional service categories</Link>
        <Link to="/#booking-request-guide" className="liquid-btn px-6 py-3 text-foreground">Prepare request details</Link>
      </div>
    </Section>

    <FaqSection title="Occasion-planning questions" faqs={occasionFaqs} />
    </div>
  </Layout>
);

export default Occasions;
