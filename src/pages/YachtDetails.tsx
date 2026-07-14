import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BedDouble, CalendarDays, Clock, Ruler, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { StaggerImageCarousel } from "@/components/ui/stagger-image-carousel";
import { NEUTRAL_YACHT_FALLBACK } from "@/data/media-rights";
import { getPublishableYachtBySlug, publishableYachts, yachtPath } from "@/data/yachts";
import { buildYachtSeo } from "@/lib/yacht-seo";

const YachtDetails = () => {
  const { slug } = useParams();
  const yacht = getPublishableYachtBySlug(slug);

  if (!yacht) {
    return (
      <Layout>
        <main className="pt-28 pb-20 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">Yacht record not published</h1>
          <p className="text-muted-foreground mb-6">This yacht does not currently meet the website's publication evidence requirements.</p>
          <Link to="/yachts" className="text-primary hover:underline">Back to the verified catalogue</Link>
        </main>
      </Layout>
    );
  }

  const { path, title, description, socialImage, jsonLd } = buildYachtSeo(yacht);
  const relatedYachts = publishableYachts.filter((candidate) => candidate.id !== yacht.id).slice(0, 3);
  const details = [
    { icon: Ruler, label: "Length", value: `${yacht.lengthFt} ft` },
    { icon: Users, label: "Guest capacity", value: `${yacht.guestCapacity}` },
    { icon: CalendarDays, label: "Year built", value: `${yacht.yearBuilt}` },
    { icon: Clock, label: "Minimum duration", value: `${yacht.minimumDuration} hours` },
    ...(yacht.numberOfBedrooms === undefined ? [] : [{ icon: BedDouble, label: "Bedrooms", value: `${yacht.numberOfBedrooms}` }]),
  ];
  return (
    <Layout>
      <SEOHead title={title} description={description} path={path} jsonLd={jsonLd} socialImage={socialImage} />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/yachts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to verified catalogue
          </Link>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-2">{yacht.name}</h1>
          <p className="text-primary font-display text-xl mb-8">AED {yacht.pricePerHour.toLocaleString()} per hour</p>

          <StaggerImageCarousel images={yacht.media} altPrefix={yacht.name} fallbackSrc={NEUTRAL_YACHT_FALLBACK} />

          <AnimatedSection className="max-w-4xl mx-auto mt-12 space-y-10">
            <section aria-labelledby="verified-facts-heading">
              <h2 id="verified-facts-heading" className="text-2xl font-display font-bold text-foreground mb-5">Verified facts</h2>
              <dl className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {details.map((detail) => (
                  <div key={detail.label} className="glass-card p-4 text-center">
                    <detail.icon className="w-5 h-5 text-primary mx-auto mb-2" aria-hidden="true" />
                    <dt className="text-xs text-muted-foreground">{detail.label}</dt>
                    <dd className="text-sm font-semibold text-foreground">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section aria-labelledby="booking-facts-heading" className="glass-card p-6">
              <h2 id="booking-facts-heading" className="text-2xl font-display font-bold text-foreground mb-3">Booking facts</h2>
              <p className="text-muted-foreground leading-relaxed">
                The verified hourly price is AED {yacht.pricePerHour.toLocaleString()}, with a minimum booking duration of {yacht.minimumDuration} hours.
                Availability is on request and must be confirmed again during booking.
              </p>
            </section>
            <section aria-labelledby="capacity-guidance-heading">
              <h2 id="capacity-guidance-heading" className="text-2xl font-display font-bold text-foreground mb-3">Capacity guidance</h2>
              <p className="text-muted-foreground leading-relaxed">
                The verified guest capacity is {yacht.guestCapacity}. A booking request should use the actual group size and must not exceed that published limit.
              </p>
            </section>
            <section aria-labelledby="price-explanation-heading">
              <h2 id="price-explanation-heading" className="text-2xl font-display font-bold text-foreground mb-3">How the published price works</h2>
              <p className="text-muted-foreground leading-relaxed">
                The base calculation is AED {yacht.pricePerHour.toLocaleString()} multiplied by the confirmed booking hours, subject to the {yacht.minimumDuration}-hour minimum. No inclusions, add-ons, fuel policy, route or instant-confirmation promise is published on this record.
              </p>
            </section>
            <section aria-labelledby="booking-steps-heading">
              <h2 id="booking-steps-heading" className="text-2xl font-display font-bold text-foreground mb-3">Booking steps</h2>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                <li>Review the verified specifications and hourly price.</li>
                <li>Choose a requested duration of at least {yacht.minimumDuration} hours and a group size no greater than {yacht.guestCapacity}.</li>
                <li><Link to="/contact" className="text-primary hover:underline">Prepare an enquiry</Link> for WhatsApp or use the approved phone channel. An enquiry is not a confirmed booking.</li>
              </ol>
            </section>
            {relatedYachts.length > 0 && (
              <section aria-labelledby="related-yachts-heading">
                <h2 id="related-yachts-heading" className="text-2xl font-display font-bold text-foreground mb-3">Other verified yachts</h2>
                <ul className="space-y-2">
                  {relatedYachts.map((related) => (
                    <li key={related.id}><Link className="text-primary hover:underline" to={yachtPath(related.slug)}>{related.name}</Link></li>
                  ))}
                </ul>
              </section>
            )}
          </AnimatedSection>
        </div>
      </main>
    </Layout>
  );
};

export default YachtDetails;
