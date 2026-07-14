import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { buildBreadcrumbSchema } from "@/lib/entity-schema";
import { PHONE_NUMBER } from "@/lib/constants";

const sections = [
  ["1. Scope of these terms", "These terms govern use of the Dubai Yacht website and the preparation of private-yacht enquiries. Website content is informational. Viewing a page, preparing an enquiry, sending a WhatsApp message or making a phone call does not itself form or confirm a booking."],
  ["2. Enquiries and written confirmation", "A booking becomes confirmed only through an explicit written confirmation that identifies the selected yacht, date, start time, duration, guest count, price and any approved optional items. A request is subject to availability until that confirmation is issued."],
  ["3. Published information and prices", "Published yacht facts, hourly prices and minimum durations support planning. Availability and the final written confirmation control the booking. If a website detail differs from the final written confirmation, the final written confirmation controls the specific booking."],
  ["4. Payments, changes and cancellation terms", "The website does not process payments. Any payment method, deposit, balance, cancellation, refund or rescheduling rules will be supplied in the specific written offer or confirmation. This website does not set one universal policy for those matters."],
  ["5. Capacity and guest information", "The published maximum capacity for the selected yacht must not be exceeded. The requester should provide an accurate guest count and any information needed for the yacht-specific written confirmation."],
  ["6. Departure, weather and operations", "Departure location and route vary by yacht and confirmed booking. Weather, safety or operational conditions may require a change, delay or cancellation. Any applicable outcome will be addressed under the specific written offer or confirmation; this website does not promise a particular outcome."],
  ["7. Safety and conduct", "Guests must follow the confirmed yacht’s safety and conduct instructions and the directions of the responsible operator or crew. Yacht-specific requirements concerning identification, children, arrival time and prohibited conduct should be confirmed before the booking."],
  ["8. Optional items and third-party providers", "Catering, decorations, entertainment, photography, activities and other optional items are subject to availability, supplier confirmation, separate pricing and the final written confirmation. Third-party suppliers may apply their own terms."],
  ["9. Website availability and liability", "The website may be updated or become temporarily unavailable. Nothing on the website is a guarantee of availability or an invented insurance or liability commitment. Rights and responsibilities for a confirmed service remain subject to the specific written confirmation and mandatory applicable law."],
  ["10. Governing law and disputes", "These website and request terms are governed by the laws of the United Arab Emirates as applicable in Dubai. Subject to any mandatory applicable law, disputes are submitted to the courts of Dubai."],
  ["11. Contact", `Questions about these terms may be raised through WhatsApp or by calling ${PHONE_NUMBER}. This contact channel does not by itself confirm a booking or accept a requested change.`],
] as const;

const Terms = () => (
  <Layout>
    <SEOHead title="Website and Yacht Request Terms | Dubai Yacht" description="Read the website and yacht-request terms covering enquiries, written confirmation, prices, payments, changes, capacity and supplier requests." path="/terms" jsonLd={buildBreadcrumbSchema("/terms", [{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }])} />
    <div className="pt-28 pb-20" data-support-content="terms">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Website and Yacht Request Terms</h1>
          <p className="text-sm text-muted-foreground mb-10">Effective date: 14 July 2026</p>
          <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
            {sections.map(([heading, body]) => <section key={heading}><h2 className="text-xl font-display font-semibold text-foreground mb-3">{heading}</h2><p>{body}</p></section>)}
          </div>
        </AnimatedSection>
      </div>
    </div>
  </Layout>
);

export default Terms;
