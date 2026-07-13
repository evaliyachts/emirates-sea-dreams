import { motion } from "framer-motion";
import { CalendarCheck, CircleDollarSign, ListChecks } from "lucide-react";
import { StaggerContainer, AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerItemVariants } from "@/lib/animation-variants";

const checkpoints = [
  {
    icon: ListChecks,
    title: "Facts to compare",
    copy: "Check capacity, length, year built, hourly price, minimum duration and bedrooms only where the record verifies them.",
  },
  {
    icon: CalendarCheck,
    title: "Details to prepare",
    copy: "Prepare a preferred date, start-time preference, requested duration, complete guest count and a yacht shortlist.",
  },
  {
    icon: CircleDollarSign,
    title: "Items to confirm",
    copy: "Confirm availability, operating details and every optional request or separate price before relying on the plan.",
  },
] as const;

const TestimonialsSection = () => (
  <section data-home-section="planning-checkpoints" className="section-padding">
    <div className="container mx-auto px-4">
      <AnimatedSection initiallyVisible className="mb-14 text-center">
        <span className="liquid-pill inline-block">Decision checkpoints</span>
        <h2 className="mt-4 mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
          What a Careful Yacht Request Should Separate
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Published facts, request details and later confirmations serve different purposes. Keeping them separate prevents assumptions.
        </p>
      </AnimatedSection>

      <StaggerContainer initiallyVisible className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {checkpoints.map(({ icon: Icon, title, copy }) => (
          <motion.article key={title} variants={staggerItemVariants} className="liquid-glass p-6">
            <div className="liquid-icon mb-4 h-12 w-12">
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p>
          </motion.article>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default TestimonialsSection;
