import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { approvedServices } from "@/data/approved-services";

const illustratedServices = approvedServices.filter((service) => service.media);
const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const service = illustratedServices[active];
  const media = service.media!;
  return (
    <section data-home-section="services" className="section-padding liquid-divider">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-display font-bold md:text-5xl">Make It Your Occasion</h2>
        <p className="mx-auto mt-4 mb-8 max-w-xl text-center leading-7 text-muted-foreground">Explore private celebrations and trip ideas, then ask about the arrangements for your yacht and date.</p>
        <div className="mx-auto max-w-3xl">
          <article className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Link to={service.path} className="block h-full">
              <img key={media.path} src={media.path} alt={media.alt} width={media.width} height={media.height} className="h-full w-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-x-0 bottom-0 bg-black/80 p-5 text-white">
                <h3 className="text-2xl font-display">{service.name}</h3>
                <span className="mt-2 inline-block text-sm underline">Explore this occasion</span>
              </div>
            </Link>
          </article>
          <div className="mt-4 flex items-center justify-between">
            <button type="button" aria-label="Previous service" title="Previous service" onClick={() => setActive((active - 1 + illustratedServices.length) % illustratedServices.length)} className="liquid-btn flex h-12 w-12 items-center justify-center"><ChevronLeft aria-hidden="true" /></button>
            <p className="text-sm text-muted-foreground" aria-live="polite">{active + 1} / {illustratedServices.length}</p>
            <button type="button" aria-label="Next service" title="Next service" onClick={() => setActive((active + 1) % illustratedServices.length)} className="liquid-btn flex h-12 w-12 items-center justify-center"><ChevronRight aria-hidden="true" /></button>
          </div>
          <nav aria-label="Celebration services" className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
            {approvedServices.map((item) => <Link key={item.id} to={item.path} className="inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">{item.name}</Link>)}
          </nav>
        </div>
      </div>
    </section>
  );
};
export default ServicesSection;
