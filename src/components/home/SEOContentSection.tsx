import { Link } from "react-router-dom";
import BookingActions from "@/components/shared/BookingActions";

const SEOContentSection = () => (
  <section data-home-section="rental-guide" id="booking-request-guide" className="section-padding liquid-divider">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-display font-bold mb-8 md:text-5xl">How to Book Your Yacht</h2>
      <ol className="grid gap-8 md:grid-cols-3">
        <li><h3 className="text-xl font-semibold">1. Choose your yacht</h3><p className="mt-3 leading-7 text-muted-foreground">Start with your guest count, then compare hourly prices and minimum rental times. Open the yacht photos and specifications to build your shortlist.</p><Link to="/yachts" className="mt-3 inline-flex min-h-11 items-center text-primary underline">Compare yachts</Link></li>
        <li><h3 className="text-xl font-semibold">2. Check availability</h3><p className="mt-3 leading-7 text-muted-foreground">Send your preferred date, start time, duration and guest count. Add any celebration, food or access requirements that matter to your group.</p><Link to="/contact" className="mt-3 inline-flex min-h-11 items-center text-primary underline">Request yacht options</Link></li>
        <li><h3 className="text-xl font-semibold">3. Review your quote</h3><p className="mt-3 leading-7 text-muted-foreground">Our team will confirm available options, the departure point and final price. Review the inclusions, payment and cancellation terms in your written offer before booking.</p><Link to="/terms" className="mt-3 inline-flex min-h-11 items-center text-primary underline">Read booking terms</Link></li>
      </ol>
      <div className="mt-8"><BookingActions /></div>
    </div>
  </section>
);
export default SEOContentSection;
