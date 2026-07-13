import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { publishableYachts, yachtPath } from "@/data/yachts";
import { formatAed } from "@/lib/published-fleet";

const GallerySection = () => {
  const heights = ["h-48", "h-64", "h-56", "h-72", "h-52", "h-60", "h-44", "h-68"];
  const yachtCards = publishableYachts.slice(0, heights.length);

  return (
    <section data-home-section="fleet-gallery" className="section-padding liquid-divider">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-14 text-center">
          <span className="liquid-pill inline-block">Fleet gallery</span>
          <h2 className="mt-4 mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
            Explore Published Yacht Records Visually
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Each image belongs to a verified, publishable record. Open the yacht page for its factual capacity, price and minimum duration.
          </p>
        </AnimatedSection>

        <div className="columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4">
          {yachtCards.map((yacht, index) => {
            const image = yacht.media[0];
            return (
              <motion.div
                key={yacht.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`${heights[index]} liquid-glass group break-inside-avoid overflow-hidden rounded-3xl p-0`}
              >
                <Link
                  to={yachtPath(yacht.slug)}
                  className="relative block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                >
                  <img
                    src={image.path}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                  <div className="absolute right-0 bottom-0 left-0 p-4">
                    <h3 className="font-display font-semibold text-foreground">{yacht.name}</h3>
                    <p className="mt-1 text-xs text-foreground/75">{formatAed(yacht.pricePerHour)}/hour · {yacht.minimumDuration}-hour minimum</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
