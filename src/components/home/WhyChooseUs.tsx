import { motion } from "framer-motion";
import { Anchor, Calendar, CircleDollarSign, CircleHelp, Ruler, Users } from "lucide-react";
import { StaggerContainer, AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerItemVariants } from "@/lib/animation-variants";
import { formatAed, publishedFleetSummary } from "@/lib/published-fleet";

const highlights = [
  {
    icon: Anchor,
    title: "19 yachts to compare",
    desc: `Browse ${publishedFleetSummary.yachtCount} yachts with photos, prices and specifications in one place.`,
  },
  {
    icon: Users,
    title: "Capacity first",
    desc: `Choose from guest capacities of ${publishedFleetSummary.guestCapacity.minimum} to ${publishedFleetSummary.guestCapacity.maximum}. Include everyone in your group when comparing.`,
  },
  {
    icon: Ruler,
    title: "Size and space",
    desc: `Compare yachts from ${publishedFleetSummary.lengthFt.minimum} to ${publishedFleetSummary.lengthFt.maximum} feet, then explore their photos and specifications.`,
  },
  {
    icon: CircleDollarSign,
    title: "Clear hourly prices",
    desc: `Hourly rates range from ${formatAed(publishedFleetSummary.pricePerHour.minimum)} to ${formatAed(publishedFleetSummary.pricePerHour.maximum)}. Each yacht page helps you estimate the base rental cost.`,
  },
  {
    icon: Calendar,
    title: "Minimum duration shown",
    desc: `Minimum rental times range from ${publishedFleetSummary.minimumDuration.minimum} to ${publishedFleetSummary.minimumDuration.maximum} hours. Choose a duration that fits your plans.`,
  },
  {
    icon: CircleHelp,
    title: "Talk through your plans",
    desc: "Send your date, group size and preferences by WhatsApp or call to discuss your options.",
  },
] as const;

const WhyChooseUs = () => (
  <section data-home-section="decision-facts" className="section-padding liquid-divider">
    <div className="container mx-auto px-4">
      <AnimatedSection initiallyVisible className="mb-14 text-center">
        <span className="liquid-pill inline-block">Choose your yacht</span>
        <h2 className="mt-4 mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
          A Clearer Way to Compare
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Start with your group size and budget, then compare the details that matter to your trip.
        </p>
      </AnimatedSection>

      <StaggerContainer initiallyVisible className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item) => (
          <motion.article
            key={item.title}
            variants={staggerItemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="liquid-glass-gold p-6 text-center"
          >
            <div className="liquid-icon mx-auto mb-4 h-14 w-14">
              <item.icon className="h-7 w-7 text-primary" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-lg font-display font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </motion.article>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default WhyChooseUs;
