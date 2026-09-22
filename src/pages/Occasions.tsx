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
  { title: "Corporate gathering", icon: Briefcase, need: "Describe the purpose of the gathering, group size, timing and any seating or hospitality needs." },
  { title: "Fishing request", icon: Fish, need: "Tell the team your group size and experience, then ask whether a fishing arrangement, equipment and suitable operating location can be provided." },
  { title: "Sunset timing", icon: Sunset, need: "Request a preferred time rather than relying on a fixed sunset route or duration. Timing and operating details must be confirmed." },
  { title: "New Year's Eve", icon: PartyPopper, need: "Share your guest count and preferred budget early. Ask about available yachts, timing and any viewing or hospitality arrangements for that date." },
  { title: "Photoshoot", icon: Camera, need: "Prepare the group size and shoot requirements. Photography, drone use, supplier access and permissions are separate confirmation questions." },
] as const;

const occasionFaqs = [
  {
    question: "How do I turn an occasion idea into a plan?",
    answer: "Start with what you want to celebrate, your guest count and date. Open the relevant service guide for planning questions, then send the team your priorities.",
  },
  {
    question: "How do I choose a yacht for an occasion?",
    answer: "Begin with the full guest count, then compare the published capacity, minimum duration and hourly price. Discuss the layout and any optional arrangements for your selected yacht.",
  },
  {
    question: "Are decorations, food or photography part of an occasion price?",
    answer: "Ask for separate prices for any decorations, food or photography. Review the agreed arrangements alongside the yacht rental quote.",
  },
  {
    question: "What happens after I send my plans?",
    answer: "The team will check yacht availability and your requested arrangements, then provide the details and quote for you to review before booking.",
  },
] as const;

const Occasions = () => (
  <Layout>
    <SEOHead
      title="Private Yacht Occasions in Dubai | Planning Guide"
      description="Choose an occasion for your private yacht trip. Plan your guest list, timing and priorities, then explore service guides and yacht options."
      path="/occasions"
      jsonLd={buildBreadcrumbSchema("/occasions", [
        { name: "Home", path: "/" },
        { name: "Occasions", path: "/occasions" },
      ])}
    />
    <div data-commercial-content>

    <CommercialHero
      eyebrow="Occasion chooser"
      title="Choose Your Yacht Occasion"
      introduction="Not sure where to begin? Use your occasion to decide who is coming, how you want to spend the time and which arrangements matter most. Then explore the relevant guide or discuss your idea with the team."
      directAnswer="Start with your date and guest list, then compare yachts by capacity and budget. Food, decorations and activities can be discussed separately for your selected yacht."
    >
      <div className="mt-8 flex flex-wrap gap-4">
        <a href="#occasion-themes" className="liquid-btn-primary px-6 py-3">Compare occasion themes</a>
        <Link to="/yachts" className="liquid-btn px-6 py-3 text-foreground">Compare yachts</Link>
      </div>
    </CommercialHero>

    <section id="occasion-themes" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Find a starting point</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {occasionThemes.map((theme) => {
            const { title, icon: Icon, need } = theme;
            const path = "path" in theme ? theme.path : undefined;
            return (
            <article key={title} data-occasion-theme className="liquid-glass p-6">
              <div className="liquid-icon h-11 w-11"><Icon className="h-5 w-5 text-primary" aria-hidden="true" /></div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {path ? <Link to={path} className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{title}</Link> : title}
              </h3>
              <p className="mt-3 leading-7 text-muted-foreground">{need}</p>
            </article>
          ); })}
        </div>
      </div>
    </section>

    <Section title="More celebrations to explore">
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

    <Section title="Put your plan together">
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[
          ["Name the occasion", "Tell us what you want to celebrate and what matters most."],
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
      title="Compare sizes for your group"
      yachts={comparisonYachts}
      note="Compare a smaller group option, a mid-size capacity and a larger gathering option. Discuss your event layout and arrangements with the team."
    />

    <Section title="Take the next step">
      <div className="flex flex-wrap gap-4">
        <Link to="/yachts" className="liquid-btn-primary px-6 py-3">View all yachts</Link>
        <Link to="/services" className="liquid-btn px-6 py-3 text-foreground">Explore services</Link>
        <Link to="/contact" className="liquid-btn px-6 py-3 text-foreground">Request yacht options</Link>
      </div>
    </Section>

    <FaqSection title="Occasion-planning questions" faqs={occasionFaqs} />
    </div>
  </Layout>
);

export default Occasions;
