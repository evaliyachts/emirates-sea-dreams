import { motion } from "framer-motion";
import { Anchor, Calendar, CircleDollarSign, CircleHelp, Ruler, Users } from "lucide-react";
import { StaggerContainer, AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerItemVariants } from "@/lib/animation-variants";
import { formatAed, publishedFleetSummary } from "@/lib/published-fleet";

const highlights = [
  {
    icon: Anchor,
    title: "Verified catalogue",
    desc: `Compare ${publishedFleetSummary.yachtCount} publishable yacht records rather than an unverified package list.`,
  },
  {
    icon: Users,
    title: "Capacity first",
    desc: `Published capacities currently range from ${publishedFleetSummary.guestCapacity.minimum} to ${publishedFleetSummary.guestCapacity.maximum} guests. Match the complete group to a stated limit.`,
  },
  {
    icon: Ruler,
    title: "Factual dimensions",
    desc: `The current published fleet ranges from ${publishedFleetSummary.lengthFt.minimum} to ${publishedFleetSummary.lengthFt.maximum} feet, with individual facts on every yacht page.`,
  },
  {
    icon: CircleDollarSign,
    title: "Published hourly rates",
    desc: `Base hourly prices range from ${formatAed(publishedFleetSummary.pricePerHour.minimum)} to ${formatAed(publishedFleetSummary.pricePerHour.maximum)} before any separately confirmed request.`,
  },
  {
    icon: Calendar,
    title: "Minimum duration shown",
    desc: `Each record states its own minimum, currently between ${publishedFleetSummary.minimumDuration.minimum} and ${publishedFleetSummary.minimumDuration.maximum} hours.`,
  },
  {
    icon: CircleHelp,
    title: "Confirmation boundaries",
    desc: "Availability, operating details and optional services must be confirmed for the selected yacht, date and request.",
  },
] as const;

const WhyChooseUs = () => (
  <section data-home-section="decision-facts" className="section-padding liquid-divider">
    <div className="container mx-auto px-4">
      <AnimatedSection className="mb-14 text-center">
        <span className="liquid-pill inline-block">Why compare here</span>
        <h2 className="mt-4 mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
          Choose with Published Facts, Not Package Assumptions
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          The useful comparison is the yacht record itself: capacity, length, year built, hourly price, minimum duration and bedrooms where recorded.
        </p>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
