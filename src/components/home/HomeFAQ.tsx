import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { formatAed, publishedFleetSummary } from "@/lib/published-fleet";
import FAQDisclosure from "@/components/shared/FAQDisclosure";

const faqs = [
  {
    question: "Is this a private yacht rental or a shared cruise?",
    answer: "You are enquiring about a private yacht for your group, rather than individual tickets on a shared cruise.",
  },
  {
    question: "How is the starting rental cost calculated?",
    answer: `Multiply the hourly rate by your rental time, allowing for the yacht's minimum duration. Rates range from ${formatAed(publishedFleetSummary.pricePerHour.minimum)} to ${formatAed(publishedFleetSummary.pricePerHour.maximum)} per hour, with minimum durations from ${publishedFleetSummary.minimumDuration.minimum} to ${publishedFleetSummary.minimumDuration.maximum} hours. Ask for a complete quote for your date and any extras.`,
  },
  {
    question: "What information should I prepare before making a request?",
    answer: "Send your date, preferred start time, duration and guest count. Add a yacht name if you have one in mind, or ask the team for options within your budget.",
  },
  {
    question: "How do I check availability for my date?",
    answer: "Choose a yacht and contact us with your preferred date and time. The team will check its schedule and confirm the available options before you book.",
  },
] as const;

const HomeFAQ = () => (
  <section data-home-section="faq" className="section-padding liquid-divider">
    <div className="container mx-auto max-w-3xl px-4">
      <AnimatedSection initiallyVisible className="mb-14 text-center">
        <span className="liquid-pill inline-block">FAQ</span>
        <h2 className="mt-4 mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
          Private Yacht Rental Questions
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Answers to help you choose a yacht and plan your enquiry.
        </p>
      </AnimatedSection>

      <AnimatedSection initiallyVisible>
        <div className="space-y-3">
          {faqs.map((faq) => <FAQDisclosure key={faq.question} question={faq.question} answer={faq.answer} />)}
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HomeFAQ;
