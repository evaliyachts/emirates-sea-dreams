import BookingActions from "@/components/shared/BookingActions";
const CTAStrip = () => (
  <section data-home-section="final-actions" className="section-padding border-t border-border">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-display font-bold md:text-5xl">Ready to Find Your Yacht?</h2>
      <p className="my-5 max-w-xl leading-7 text-muted-foreground">Send your date, guest count and preferred budget. Our team will help you compare options and check availability.</p>
      <BookingActions />
    </div>
  </section>
);
export default CTAStrip;
