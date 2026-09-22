import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BedDouble, CalendarDays, Clock, Ruler, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import BookingActions from "@/components/shared/BookingActions";
import { StaggerImageCarousel } from "@/components/ui/stagger-image-carousel";
import { getInitialCarouselImage } from "@/lib/carousel-media";
import { NEUTRAL_YACHT_FALLBACK } from "@/data/media-constants";
import { getPublishableYachtBySlug, publishableYachts, yachtPath } from "@/data/yachts";
import { buildYachtSeo } from "@/lib/yacht-seo";
import { formatAed } from "@/lib/published-fleet";
import NotFound from "./NotFound";

const YachtDetails = () => {
  const { slug } = useParams();
  const yacht = getPublishableYachtBySlug(slug);
  if (!yacht) return <NotFound />;
  const { path, title, description, socialImage, jsonLd } = buildYachtSeo(yacht);
  const initialCarouselImage = getInitialCarouselImage(yacht.media);
  const relatedYachts = publishableYachts.filter((candidate) => candidate.id !== yacht.id)
    .sort((a, b) => Math.abs(a.guestCapacity - yacht.guestCapacity) - Math.abs(b.guestCapacity - yacht.guestCapacity)
      || Math.abs(a.pricePerHour - yacht.pricePerHour) - Math.abs(b.pricePerHour - yacht.pricePerHour)).slice(0, 3);
  const details = [
    { icon: Ruler, label: "Length", value: `${yacht.lengthFt} ft` },
    { icon: Users, label: "Guest capacity", value: `Up to ${yacht.guestCapacity}` },
    { icon: CalendarDays, label: "Year built", value: `${yacht.yearBuilt}` },
    { icon: Clock, label: "Minimum duration", value: `${yacht.minimumDuration} hours` },
    ...(yacht.numberOfBedrooms === undefined ? [] : [{ icon: BedDouble, label: "Bedrooms", value: `${yacht.numberOfBedrooms}` }]),
  ];
  return (
    <Layout>
      <SEOHead title={title} description={description} path={path} jsonLd={jsonLd} socialImage={socialImage}
        preloadImages={initialCarouselImage ? [{ url: initialCarouselImage.path, referrerPolicy: "no-referrer" }] : []} />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/yachts" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="w-4 h-4" /> Back to yachts</Link>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-2">{yacht.name}</h1>
          <p className="text-primary font-display text-xl">{formatAed(yacht.pricePerHour)} per hour</p>
          <p className="mt-2 mb-5 text-muted-foreground">{yacht.lengthFt} ft · Up to {yacht.guestCapacity} guests · {yacht.minimumDuration}-hour minimum</p>
          <BookingActions />
          <p className="mt-3 mb-8 text-sm text-muted-foreground">Send your preferred date and guest count to check availability.</p>
          <StaggerImageCarousel images={yacht.media} altPrefix={yacht.name} fallbackSrc={NEUTRAL_YACHT_FALLBACK} />
          <div className="max-w-5xl mx-auto mt-10 space-y-10">
            <section aria-labelledby="yacht-details-heading">
              <h2 id="yacht-details-heading" className="text-2xl font-display font-bold mb-5">About {yacht.name}</h2>
              <p className="mb-5 leading-7 text-muted-foreground">
                {yacht.name} is a {yacht.lengthFt}-foot yacht built in {yacht.yearBuilt}, with space for up to {yacht.guestCapacity} guests{yacht.numberOfBedrooms === undefined ? "." : ` and ${yacht.numberOfBedrooms} bedrooms.`}
                {" "}The minimum rental is {yacht.minimumDuration} hours, giving a base yacht cost of {formatAed(yacht.pricePerHour * yacht.minimumDuration)} at the listed hourly rate.
              </p>
              <dl className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {details.map((detail) => <div key={detail.label} className="glass-card p-4 text-center"><detail.icon className="w-5 h-5 text-primary mx-auto mb-2" aria-hidden="true" /><dt className="text-xs text-muted-foreground">{detail.label}</dt><dd className="text-sm font-semibold">{detail.value}</dd></div>)}
              </dl>
            </section>
            <section aria-labelledby="rental-cost-heading">
              <h2 id="rental-cost-heading" className="text-2xl font-display font-bold mb-4">Plan your rental budget</h2>
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Base yacht rental costs at the listed hourly rate</caption>
                <thead><tr className="border-b border-border"><th className="py-3">Duration</th><th className="py-3">Base yacht cost</th></tr></thead>
                <tbody>{[yacht.minimumDuration, yacht.minimumDuration + 1, yacht.minimumDuration + 2].map((hours) => <tr key={hours} className="border-b border-border/50"><th scope="row" className="py-3 font-normal">{hours} hours{hours === yacht.minimumDuration ? " (minimum)" : ""}</th><td className="py-3">{formatAed(hours * yacht.pricePerHour)}</td></tr>)}</tbody>
              </table>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">These estimates multiply the hourly rate by your rental time. Ask for a full quote covering your date, any extras, taxes or fees, and payment terms before booking.</p>
            </section>
            <section aria-labelledby="trip-details-heading">
              <h2 id="trip-details-heading" className="text-2xl font-display font-bold mb-4">Plan your trip</h2>
              <p className="text-muted-foreground leading-7">Choose at least {yacht.minimumDuration} hours and include everyone in your group when checking the {yacht.guestCapacity}-guest limit. Tell us about any access needs, preferred route, food or celebration arrangements so the team can check them for {yacht.name}.</p>
              <p className="mt-3 text-muted-foreground leading-7">We will confirm the departure point, available facilities, inclusions and final price with your booking details.</p>
              <div className="mt-5"><BookingActions /></div>
              <Link to="/contact" className="mt-4 inline-flex min-h-11 items-center text-primary underline underline-offset-4">Send a detailed enquiry</Link>
            </section>
            <section aria-labelledby="related-yachts-heading">
              <h2 id="related-yachts-heading" className="text-2xl font-display font-bold mb-4">Compare yachts with similar guest capacities</h2>
              <div className="grid gap-4 md:grid-cols-3">{relatedYachts.map((related) => <Link key={related.id} className="glass-card p-5 hover:border-primary" to={yachtPath(related.slug)}><h3 className="text-xl">{related.name}</h3><p className="mt-2 text-sm text-muted-foreground">Up to {related.guestCapacity} guests · {formatAed(related.pricePerHour)}/hour · {related.minimumDuration}-hour minimum</p></Link>)}</div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default YachtDetails;
