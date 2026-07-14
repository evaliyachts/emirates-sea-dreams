import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buildBreadcrumbSchema } from "@/lib/entity-schema";

const faqGroups = [
  {
    category: "Enquiries and confirmation",
    items: [
      { q: "Does sending an enquiry confirm a booking?", a: "No. A website-prepared message, WhatsApp message or phone call is an enquiry only. The selected yacht, date, time, duration, guest count, price and optional requests must be explicitly confirmed in writing." },
      { q: "How is availability checked?", a: "Availability is on request and must be confirmed for the specific yacht, date, preferred start time, requested duration and guest count." },
      { q: "How quickly will I receive a reply?", a: "No response time is guaranteed. You may use the approved WhatsApp or phone contact channels to make an enquiry." },
    ],
  },
  {
    category: "Prices and request details",
    items: [
      { q: "What do the published yacht prices mean?", a: "Published hourly prices and minimum durations are planning facts for that yacht record. The final written confirmation controls the actual booking and any approved optional items." },
      { q: "Are optional services included in the hourly price?", a: "No default inclusion is promised. Decorations, catering, music, photography and other optional requests are subject to availability, supplier confirmation, separate pricing and the final written confirmation." },
      { q: "What payment, deposit, cancellation or refund rule applies?", a: "There is no universal website rule for those items. Any applicable payment, deposit, balance, cancellation, refund or rescheduling terms must be supplied in the specific written offer or confirmation." },
    ],
  },
  {
    category: "Yacht and trip planning",
    items: [
      { q: "Where does the yacht depart from?", a: "Departure location varies by yacht and confirmed booking. Dubai Marina may be used as a general departure reference, but it is not the company’s business address or a guaranteed departure point." },
      { q: "Is a route guaranteed?", a: "No. Departure and route details are confirmed for the specific request and remain subject to yacht-specific operational conditions." },
      { q: "How many guests can join?", a: "Each yacht page shows a published maximum guest capacity. The confirmed guest count must not exceed that capacity." },
      { q: "What about children, identification, late arrival, weather, safety or conduct?", a: "Those requirements and consequences vary by yacht and booking. Ask for them in the final yacht-specific confirmation before relying on an arrangement." },
    ],
  },
];

const FAQ = () => (
  <Layout>
    <SEOHead
      title="Dubai Yacht Rental FAQ | Planning and Confirmation"
      description="Answers about yacht availability, prices, capacity, departure details, optional requests and written booking confirmation in Dubai."
      path="/faq"
      jsonLd={buildBreadcrumbSchema("/faq", [{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])}
    />
    <div className="pt-28 pb-20" data-support-content="faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection initiallyVisible className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">Private Yacht Rental FAQ</h1>
          <p className="text-muted-foreground">Factual planning answers. Availability and booking details always require specific written confirmation.</p>
        </AnimatedSection>
        {faqGroups.map((group) => (
          <AnimatedSection key={group.category} className="mb-8">
            <h2 className="text-xl font-display font-bold text-foreground mb-4">{group.category}</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {group.items.map((faq, index) => (
                <AccordionItem key={faq.q} value={`${group.category}-${index}`} className="glass-card px-6 border-0">
                  <AccordionTrigger className="text-left text-foreground font-display font-semibold hover:no-underline py-5">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-5 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </Layout>
);

export default FAQ;
