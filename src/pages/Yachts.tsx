import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { CommercialHero, FaqSection, Section } from "@/components/commercial/DecisionSections";
import SEOHead from "@/components/shared/SEOHead";
import YachtCard from "@/components/shared/YachtCard";
import BookingActions from "@/components/shared/BookingActions";
import { publishableYachts } from "@/data/yachts";
import { formatAed, publishedFleetSummary } from "@/lib/published-fleet";
import { buildBreadcrumbSchema } from "@/lib/entity-schema";

const catalogueFaqs = [
  { question: "How do I choose the right capacity?", answer: "Count everyone in your group, including children, and choose a yacht whose maximum capacity covers that number. Discuss seating, dining and access needs with the team too." },
  { question: "How do I estimate the rental cost?", answer: "Multiply the hourly rate by the number of hours you want, allowing for the yacht's minimum duration. Ask for a full quote for your date and any extras." },
  { question: "What if I need a particular facility?", answer: "Check the yacht photos and specifications, then ask the team about the facility you need. Bedroom counts are shown where available; the team can help with layout and equipment questions." },
  { question: "Can I check availability before choosing?", answer: "Yes. Send your preferred date, start time, duration, guest count and budget. The team can help you compare options for your request." },
];
const Yachts = () => {
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [sort, setSort] = useState("featured");
  const yachts = publishableYachts.filter((y) => (!guests || y.guestCapacity >= Number(guests)) && (!budget || y.pricePerHour <= Number(budget)));
  if (sort === "price") yachts.sort((a,b) => a.pricePerHour - b.pricePerHour);
  if (sort === "capacity") yachts.sort((a,b) => a.guestCapacity - b.guestCapacity);
  return (
    <Layout>
      <SEOHead title="Yachts for Rent in Dubai | Prices & Capacity | Dubai Yacht" description="Compare private yachts in Dubai by guest capacity, hourly price and rental duration. Browse photos and ask Dubai Yacht about your preferred date." path="/yachts" jsonLd={buildBreadcrumbSchema("/yachts", [{ name: "Home", path: "/" }, { name: "Yachts", path: "/yachts" }])} />
      <div data-commercial-content>
        <CommercialHero eyebrow="Find your yacht" title="Compare Yachts and Prices"
          introduction="Choose a yacht that fits your group and budget. Compare guest capacity, hourly rates and minimum rental time, then open the photos and details before checking availability with our team."
          directAnswer={`Browse ${publishedFleetSummary.yachtCount} yachts from ${publishedFleetSummary.lengthFt.minimum} to ${publishedFleetSummary.lengthFt.maximum} feet, with hourly rates from ${formatAed(publishedFleetSummary.pricePerHour.minimum)} to ${formatAed(publishedFleetSummary.pricePerHour.maximum)}. Minimum rental times range from ${publishedFleetSummary.minimumDuration.minimum} to ${publishedFleetSummary.minimumDuration.maximum} hours.`}>
          <a href="#published-yachts" className="liquid-btn-primary mt-5 inline-flex min-h-12 items-center px-6 py-3">Browse Yachts</a>
        </CommercialHero>
        <section id="published-yachts" className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display mb-5">Find a yacht for your group</h2>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <label className="text-sm">Guests<input type="number" min="1" value={guests} onChange={(e)=>setGuests(e.target.value)} placeholder="Any group size" className="mt-2 w-full rounded-lg border border-border bg-background p-3" /></label>
              <label className="text-sm">Maximum AED per hour<input type="number" min="0" value={budget} onChange={(e)=>setBudget(e.target.value)} placeholder="Any budget" className="mt-2 w-full rounded-lg border border-border bg-background p-3" /></label>
              <label className="text-sm">Sort by<select value={sort} onChange={(e)=>setSort(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background p-3"><option value="featured">Default order</option><option value="price">Hourly price</option><option value="capacity">Guest capacity</option></select></label>
            </div>
            <p aria-live="polite" className="mb-5 text-muted-foreground">{yachts.length} yachts match your selection</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{yachts.map((yacht,index)=><YachtCard key={yacht.id} yacht={yacht} index={index} />)}</div>
            {yachts.length === 0 && <div className="py-8"><p className="mb-4">Try a different budget or contact us to discuss your group.</p><button type="button" onClick={()=>{setGuests("");setBudget("");}} className="liquid-btn px-5 py-3">Clear filters</button></div>}
          </div>
        </section>
        <Section title="Understand the hourly price"><p className="max-w-3xl leading-7 text-muted-foreground">Each card shows the hourly yacht rate and minimum duration. Use those figures for an initial budget, then ask for a quote for your date covering inclusions, optional arrangements and any taxes or fees. Availability is checked when you enquire.</p></Section>
        <Section title="Need help choosing?"><p className="mb-5 max-w-xl leading-7 text-muted-foreground">Send your date, guest count and budget. Mention any dining, celebration or access requirements so the team can help you compare suitable options.</p><BookingActions /><Link to="/contact" className="mt-4 inline-flex min-h-11 items-center text-primary underline">Request yacht options</Link></Section>
        <FaqSection title="Yacht comparison questions" faqs={catalogueFaqs} />
      </div>
    </Layout>
  );
};
export default Yachts;
