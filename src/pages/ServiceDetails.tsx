import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ClipboardCheck, Coins } from "lucide-react";
import Layout from "@/components/layout/Layout";
import {
  CommercialHero,
  FaqSection,
  Section,
  YachtFactLinks,
} from "@/components/commercial/DecisionSections";
import SEOHead from "@/components/shared/SEOHead";
import { getApprovedServiceById, getApprovedServiceBySlug } from "@/data/approved-services";
import { publishedYachtsById } from "@/lib/published-fleet";
import { canonicalUrlForPath } from "../../seo/authorities";
import NotFound from "./NotFound";

const categoryLabel = {
  celebration: "Private celebration",
  "private-experience": "Private experience",
  hospitality: "Private hospitality request",
} as const;

const ServiceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getApprovedServiceBySlug(slug);
  if (!service) return <NotFound />;

  const yachts = publishedYachtsById(...service.yachtIds);
  const related = service.relatedServiceIds.map((id) => {
    const record = getApprovedServiceById(id);
    if (!record) throw new Error(`${service.path}: missing related approved service ${id}`);
    return record;
  });
  const canonical = canonicalUrlForPath(service.path);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        serviceType: "Private yacht service request in Dubai",
        description: service.metadata.description,
        url: canonical,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://yachtrentaldxb.com/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://yachtrentaldxb.com/services" },
          { "@type": "ListItem", position: 3, name: service.name, item: canonical },
        ],
      },
    ],
  };

  return (
    <Layout>
      <SEOHead
        title={service.metadata.title}
        description={service.metadata.description}
        path={service.path}
        jsonLd={jsonLd}
      />
      <div data-service-content data-service-id={service.id}>
        <CommercialHero
          eyebrow={categoryLabel[service.category]}
          title={service.metadata.h1}
          introduction={service.introduction}
          directAnswer={service.directAnswer}
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#yacht-comparison" className="liquid-btn-primary px-6 py-3">Compare three yacht records</a>
            <Link to="/services" className="liquid-btn px-6 py-3 text-foreground">All approved services</Link>
          </div>
        </CommercialHero>

        {service.media && (
          <section aria-label={`${service.name} planning image`} className="pb-8">
            <div className="container mx-auto px-4">
              <figure className="liquid-glass mx-auto max-w-5xl overflow-hidden">
                <img
                  src={service.media.path}
                  alt={service.media.alt}
                  width={service.media.width}
                  height={service.media.height}
                  loading="eager"
                  decoding="async"
                  {...{ fetchpriority: "high" }}
                  className="max-h-[620px] w-full object-cover"
                />
                <figcaption className="px-5 py-4 text-sm leading-6 text-muted-foreground">
                  Neutral category image. It does not establish an optional item, supplier, route or vessel feature.
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        <Section title="Availability and optional-request boundary">
          <div className="liquid-glass-gold max-w-4xl p-7">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-foreground">Availability: {service.availability}.</p>
                <p className="mt-3 leading-7 text-muted-foreground">{service.optionalRequestBoundary}</p>
              </div>
            </div>
          </div>
        </Section>

        {service.sections.map((section) => (
          <Section key={section.heading} title={section.heading}>
            <div className="liquid-glass max-w-4xl space-y-4 p-7">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-muted-foreground">{paragraph}</p>
              ))}
            </div>
          </Section>
        ))}

        <Section title={`How to prepare this ${service.name.toLowerCase()} request`}>
          <ol className="grid gap-5 md:grid-cols-2">
            {service.bookingSteps.map((step, index) => (
              <li key={step} className="liquid-glass p-6">
                <div className="flex items-start gap-4">
                  <span className="liquid-icon flex h-10 w-10 shrink-0 items-center justify-center font-semibold text-primary">{index + 1}</span>
                  <p className="leading-7 text-muted-foreground">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="What can affect the final request price">
          <div className="grid gap-5 md:grid-cols-2">
            {service.priceFactors.map((factor) => (
              <article key={factor} className="liquid-glass p-6">
                <Coins className="h-6 w-6 text-primary" aria-hidden="true" />
                <p className="mt-4 leading-7 text-muted-foreground">{factor}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-4xl leading-7 text-muted-foreground">
            This page publishes no fixed service package or optional-extra price. The verified yacht rates below are vessel facts; any accepted supplier or setup request requires separate written pricing.
          </p>
        </Section>

        <div id="yacht-comparison">
          <YachtFactLinks title="Three published yachts for a factual comparison" yachts={yachts} note={service.yachtSelectionNote} />
        </div>

        <Section title="Related approved private-yacht requests">
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="liquid-glass block p-6 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ClipboardCheck className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold text-foreground">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">On request and subject to confirmation.</p>
              </Link>
            ))}
          </div>
        </Section>

        <FaqSection title={`${service.name} planning questions`} faqs={service.faqs} />

        <Section title="Continue with published planning pages">
          <div className="flex flex-wrap gap-4">
            <Link to="/services" className="liquid-btn-primary px-6 py-3"><ArrowLeft className="mr-2 inline h-4 w-4" />Approved services</Link>
            <Link to="/yachts" className="liquid-btn px-6 py-3 text-foreground">Compare all published yachts</Link>
            <Link to="/occasions" className="liquid-btn px-6 py-3 text-foreground">Browse occasion themes</Link>
          </div>
        </Section>
      </div>
    </Layout>
  );
};

export default ServiceDetails;
