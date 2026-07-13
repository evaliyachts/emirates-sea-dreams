import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { StaggerContainer, AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerItemVariants } from "@/lib/animation-variants";
import { formatAed, publishedFleetSummary } from "@/lib/published-fleet";

const estimateSteps = [
  {
    title: "Choose an hourly rate",
    value: `${formatAed(publishedFleetSummary.pricePerHour.minimum)}–${formatAed(publishedFleetSummary.pricePerHour.maximum)}`,
    note: "per hour across the published fleet",
    points: ["Compare the selected yacht's own rate", "Use only the price on its factual detail page", "Do not infer a discount or package price"],
  },
  {
    title: "Apply its minimum duration",
    value: `${publishedFleetSummary.minimumDuration.minimum}–${publishedFleetSummary.minimumDuration.maximum} hours`,
    note: "current range of published minimums",
    points: ["Check the individual yacht minimum", "Multiply by the requested qualifying hours", "Treat the result as a base amount"],
  },
  {
    title: "List optional requests",
    value: "Confirm separately",
    note: "no universal inclusion is assumed",
    points: ["Name every optional service or setup", "Ask whether it is available for the date", "Request its separate confirmed price"],
  },
] as const;

const PackagesSection = () => (
  <section data-home-section="price-planning" className="section-padding liquid-divider">
    <div className="container mx-auto px-4">
      <AnimatedSection initiallyVisible className="mb-14 text-center">
        <span className="liquid-pill inline-block">Price planning</span>
        <h2 className="mt-4 mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
          Build a Factual Yacht Rental Estimate
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          The site publishes yacht-specific hourly rates and minimum durations, not fixed all-purpose packages.
        </p>
      </AnimatedSection>

      <StaggerContainer initiallyVisible className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {estimateSteps.map((step, index) => (
          <motion.article
            key={step.title}
            variants={staggerItemVariants}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className={`${index === 1 ? "liquid-glass-gold" : "liquid-glass"} relative overflow-hidden p-6`}
          >
            <span className="liquid-pill absolute top-4 right-4">Step {index + 1}</span>
            <h3 className="mb-1 pr-16 text-2xl font-display font-bold text-foreground">{step.title}</h3>
            <p className="mb-1 mt-5 text-xl font-display font-semibold text-primary">{step.value}</p>
            <p className="mb-5 text-xs text-muted-foreground">{step.note}</p>
            <ul className="space-y-2">
              {step.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </StaggerContainer>

      <AnimatedSection initiallyVisible className="text-center">
        <Link to="/yachts" className="font-semibold text-primary hover:underline">
          Compare the verified hourly rates in the yacht catalogue
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

export default PackagesSection;
