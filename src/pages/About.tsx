import { Link } from "react-router-dom";
import { Anchor, ClipboardCheck, Scale, Ship } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { buildBreadcrumbNode, organizationReference, schemaGraph } from "@/lib/entity-schema";

const facts = [
  { icon: Scale, title: "Compare verified facts", text: "Compare published length, guest capacity, year, hourly price and minimum duration without inferred specifications." },
  { icon: Ship, title: "Shortlist a private yacht", text: "Use the catalogue to identify yachts that fit the published capacity and planning budget for your request." },
  { icon: ClipboardCheck, title: "Prepare a request", text: "Share the intended date, time, duration, guest count and optional requests for availability confirmation." },
  { icon: Anchor, title: "Confirm operating details", text: "Departure location, route and optional services are confirmed for the selected yacht and booking." },
];

const About = () => (
  <Layout>
    <SEOHead
      title="About Dubai Yacht | Private Yacht Comparison Service"
      description="Learn how Dubai Yacht helps visitors compare verified yacht facts and prepare private yacht availability requests in Dubai."
      path="/about"
      jsonLd={schemaGraph([
        { ...organizationReference, "@type": "Organization", name: "Dubai Yacht", url: "https://yachtrentaldxb.com/" },
        buildBreadcrumbNode("/about", [{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
      ])}
    />
    <div className="pt-28 pb-20" data-support-content="about">
      <div className="container mx-auto px-4 max-w-5xl">
        <AnimatedSection className="text-center mb-14">
          <span className="liquid-pill inline-block mb-4">About</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-5">About Dubai Yacht</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Dubai Yacht is an online private-yacht comparison and request-planning service for Dubai. The website helps visitors compare published yacht facts, review requestable private services, and prepare an availability request.
          </p>
        </AnimatedSection>

        <AnimatedSection className="liquid-glass-gold p-7 md:p-10 mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">What the website provides</h2>
          <p className="text-muted-foreground leading-relaxed">
            The yacht catalogue publishes evidence-cleared hourly prices, minimum durations, capacities and vessel facts. Service pages explain requests that may be discussed for a private booking. Availability and every optional item remain subject to confirmation through WhatsApp or phone.
          </p>
        </AnimatedSection>

        <section aria-labelledby="planning-process" className="mb-12">
          <h2 id="planning-process" className="text-3xl font-display font-bold text-foreground mb-7 text-center">A factual planning process</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {facts.map(({ icon: Icon, title, text }, index) => (
              <AnimatedSection key={title} delay={index * 0.05} className="glass-card p-6">
                <Icon className="w-6 h-6 text-primary mb-3" aria-hidden="true" />
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <AnimatedSection className="glass-card p-7">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">What confirmation means</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            An enquiry does not reserve a yacht. The yacht, date, start time, duration, guest count, price, departure details and any optional requests must appear in the final written confirmation before they can be relied on.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/yachts" className="liquid-btn-gold px-5 py-3 text-primary">Compare yachts</Link>
            <Link to="/contact" className="liquid-btn px-5 py-3 text-foreground">Prepare an enquiry</Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </Layout>
);

export default About;
