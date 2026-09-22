import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HOME_HERO_DESKTOP, HOME_HERO_MOBILE } from "@/data/home-media";
import { formatAed, publishedFleetSummary } from "@/lib/published-fleet";
import BookingActions from "@/components/shared/BookingActions";

const HeroSection = () => (
  <section data-home-section="hero" className="relative flex min-h-[660px] items-center overflow-hidden pt-24 pb-14 md:min-h-[720px]">
    <picture aria-hidden="true" className="absolute inset-0 block h-full w-full">
      <source media="(max-width: 639px)" srcSet={HOME_HERO_MOBILE.path} width={HOME_HERO_MOBILE.width} height={HOME_HERO_MOBILE.height} />
      <img src={HOME_HERO_DESKTOP.path} alt={HOME_HERO_DESKTOP.alt} width={HOME_HERO_DESKTOP.width} height={HOME_HERO_DESKTOP.height} className="h-full w-full object-cover" loading="eager" {...{ fetchpriority: "high" }} decoding="async" />
    </picture>
    <div className="absolute inset-0 bg-black/55" />
    <div className="relative z-10 container mx-auto px-4">
      <p className="mb-3 text-lg text-white">Dubai Yacht</p>
      <h1 className="max-w-3xl text-4xl font-display font-bold leading-tight text-white md:text-6xl">Private Yacht Rental in Dubai</h1>
      <p data-page-introduction className="mt-5 max-w-xl text-base leading-7 text-white md:text-lg">
        Find a yacht for your group, compare hourly prices, and send us your preferred date. Our team will confirm available options and final booking details.
      </p>
      <p data-direct-answer className="mt-4 max-w-xl text-base leading-7 text-white">
        Compare {publishedFleetSummary.yachtCount} yachts from {formatAed(publishedFleetSummary.pricePerHour.minimum)} per hour, with capacities up to {publishedFleetSummary.guestCapacity.maximum} guests.
      </p>
      <div className="mt-6"><BookingActions /></div>
      <Link to="/yachts" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-white underline underline-offset-4">View yachts and prices <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
    </div>
  </section>
);
export default HeroSection;
