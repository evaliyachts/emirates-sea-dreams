import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { formatAed, publishedFleetSummary } from "@/lib/published-fleet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this a private yacht rental or a shared cruise?",
    answer: "The published fleet is presented for private yacht requests. It is not described as a public, ticketed or shared cruise service.",
  },
  {
    question: "How is the starting rental cost calculated?",
    answer: `Each yacht has a verified hourly rate and minimum duration. The current catalogue ranges from ${formatAed(publishedFleetSummary.pricePerHour.minimum)} to ${formatAed(publishedFleetSummary.pricePerHour.maximum)} per hour, with minimum durations from ${publishedFleetSummary.minimumDuration.minimum} to ${publishedFleetSummary.minimumDuration.maximum} hours. Any additional request must be confirmed separately.`,
  },
  {
    question: "What information should I prepare before making a request?",
    answer: "Prepare your preferred date, requested duration, guest count, yacht shortlist and any optional occasion or service requests. Availability and additional details still need confirmation.",
  },
  {
    question: "Does the catalogue guarantee that a yacht is available?",
    answer: "No. Every published yacht is shown as available on request. Current availability must be confirmed again for the requested date and time.",
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
          Factual answers about private positioning, published rates, request preparation and availability confirmation.
        </p>
      </AnimatedSection>

      <AnimatedSection initiallyVisible>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`} className="liquid-glass border-0 px-6">
              <AccordionTrigger className="py-5 text-left text-base font-display font-semibold text-foreground hover:no-underline">
                <span data-faq-question>{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedSection>
    </div>
  </section>
);

export default HomeFAQ;
