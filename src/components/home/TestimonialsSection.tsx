import { motion } from "framer-motion";
import { CalendarCheck, CircleDollarSign, ListChecks } from "lucide-react";
import { StaggerContainer, AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerItemVariants } from "@/lib/animation-variants";

const checkpoints = [
  {
    icon: ListChecks,
    title: "Your yacht",
    copy: "Make sure the yacht, capacity and rental time in your quote match what you selected.",
  },
  {
    icon: CalendarCheck,
    title: "Your schedule",
    copy: "Check the date, start time and boarding location, and share the instructions with your group.",
  },
  {
    icon: CircleDollarSign,
    title: "Your total price",
    copy: "Review the full amount, agreed extras, payment schedule and cancellation terms before confirming.",
  },
] as const;

const TestimonialsSection = () => (
  <section data-home-section="planning-checkpoints" className="section-padding">
    <div className="container mx-auto px-4">
      <AnimatedSection initiallyVisible className="mb-14 text-center">
        <span className="liquid-pill inline-block">Before booking</span>
        <h2 className="mt-4 mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
          Check Your Quote Before You Book
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Keep your yacht choice, trip details and agreed price together in the written booking confirmation.
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
