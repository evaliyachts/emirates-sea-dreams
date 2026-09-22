import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import FAQDisclosure from "@/components/shared/FAQDisclosure";
import { buildBreadcrumbSchema } from "@/lib/entity-schema";

const faqGroups = [
  {
    category: "Enquiries and confirmation",
    items: [
      { q: "Does sending an enquiry confirm a booking?", a: "No. A website-prepared message, WhatsApp message or phone call is an enquiry only. The selected yacht, date, time, duration, guest count, price and optional requests must be explicitly confirmed in writing." },
      { q: "How is availability checked?", a: "Send the yacht name, date, preferred start time, duration and guest count. The team will check its schedule and let you know the available options." },
      { q: "How can I contact the team?", a: "Send your enquiry on WhatsApp or call the team. For a time-sensitive trip, include your preferred date and start time so the team can check your request." },
    ],
  },
  {
    category: "Prices and request details",
    items: [
      { q: "What do the published yacht prices mean?", a: "Multiply the yacht's hourly rate by your requested duration, allowing for its minimum rental time. Ask for a complete quote for your date and any extras before booking." },
      { q: "Are optional services included in the hourly price?", a: "Ask for separate prices for decorations, catering, music or photography. The team will check the arrangements for your chosen yacht and include agreed items in your quote." },
      { q: "What payment, deposit, cancellation or refund rule applies?", a: "Ask for the deposit, balance due date, and cancellation or rescheduling terms with your quote. Review those terms for your specific booking before paying." },
    ],
  },
  {
    category: "Yacht and trip planning",
    items: [
      { q: "Where does the yacht depart from?", a: "Ask for the exact boarding location for your selected yacht, along with the meeting time and arrival instructions. Share these details with everyone in your group." },
      { q: "Can I request a route?", a: "Tell the team what you would like to see and how long you want to rent. They will explain route options and operating conditions for your yacht and date." },
      { q: "How many guests can join?", a: "Each yacht page shows a published maximum guest capacity. The confirmed guest count must not exceed that capacity." },
      { q: "What about children, identification, late arrival, weather, safety or conduct?", a: "Share children's ages and any access needs before booking. Ask about identification, arrival time, weather changes and safety rules for your selected yacht." },
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
          <p className="text-muted-foreground">Practical answers about choosing a yacht, planning your trip and reviewing your booking details.</p>
        </AnimatedSection>
        {faqGroups.map((group) => (
          <AnimatedSection key={group.category} className="mb-8">
            <h2 className="text-xl font-display font-bold text-foreground mb-4">{group.category}</h2>
            <div className="space-y-3">
              {group.items.map((faq) => <FAQDisclosure key={faq.q} question={faq.q} answer={faq.a} />)}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </Layout>
);

export default FAQ;
