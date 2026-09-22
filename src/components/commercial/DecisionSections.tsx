import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { YachtRecord } from "@/data/yachts";
import { yachtPath } from "@/data/yachts";

export interface DecisionFaq {
  question: string;
  answer: string;
}

export const CommercialHero = ({
  eyebrow,
  title,
  introduction,
  directAnswer,
  children,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  directAnswer: string;
  children?: ReactNode;
}) => (
  <section className="relative overflow-hidden pt-28 pb-10 md:pt-32 md:pb-14">
    <div className="container relative mx-auto px-4">
      <p className="mb-4 text-sm font-semibold text-primary">{eyebrow}</p>
      <h1 className="max-w-5xl text-4xl font-bold leading-tight text-foreground md:text-6xl">{title}</h1>
      <p data-page-introduction className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{introduction}</p>
      {children}
      <p data-direct-answer className="mt-6 max-w-3xl leading-7 text-muted-foreground">{directAnswer}</p>
    </div>
  </section>
);

export const Section = ({ id, title, children }: { id?: string; title: string; children: ReactNode }) => (
  <section id={id} className="py-12 md:py-16">
    <div className="container mx-auto px-4">
      <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
      {children}
    </div>
  </section>
);

export const FaqSection = ({ title, faqs }: { title: string; faqs: readonly DecisionFaq[] }) => (
  <Section title={title}>
    <div className="grid gap-4 md:grid-cols-2">
      {faqs.map((faq) => (
        <article key={faq.question} className="liquid-glass p-6">
          <h3 data-faq-question className="text-xl font-semibold text-foreground">{faq.question}</h3>
          <p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p>
        </article>
      ))}
    </div>
  </Section>
);
export const YachtFactLinks = ({
  title,
  yachts,
  note,
}: {
  title: string;
  yachts: readonly YachtRecord[];
  note: string;
}) => (
  <Section title={title}>
    <p className="mb-6 max-w-3xl leading-7 text-muted-foreground">{note}</p>
    <div className="grid gap-4 md:grid-cols-3">
      {yachts.map((yacht) => (
        <Link key={yacht.id} to={yachtPath(yacht.slug)} className="liquid-glass block p-6 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <h3 className="text-xl font-semibold text-foreground">{yacht.name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {yacht.lengthFt} ft · up to {yacht.guestCapacity} guests · AED {yacht.pricePerHour.toLocaleString("en-US")}/hour · {yacht.minimumDuration}-hour minimum
          </p>
        </Link>
      ))}
    </div>
  </Section>
);
