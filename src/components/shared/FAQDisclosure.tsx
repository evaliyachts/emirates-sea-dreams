import { ChevronDown } from "lucide-react";

const FAQDisclosure = ({ question, answer }: { question: string; answer: string }) => (
  <details className="group rounded-lg border border-border px-5">
    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
      <span data-faq-question>{question}</span>
      <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <p className="pb-5 text-sm leading-7 text-muted-foreground">{answer}</p>
  </details>
);

export default FAQDisclosure;
