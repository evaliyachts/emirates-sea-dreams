import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, Ruler, Users } from "lucide-react";
import type { YachtRecord } from "@/data/yachts";
import { yachtPath } from "@/data/yachts";
import { NEUTRAL_YACHT_FALLBACK } from "@/data/media-rights";

interface YachtCardProps {
  yacht: YachtRecord;
  index?: number;
}

const YachtCard = ({ yacht, index = 0 }: YachtCardProps) => {
  const primaryImage = yacht.media.find((media) => media.featured) ?? yacht.media[0];

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.04 } },
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="liquid-glass overflow-hidden group"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={primaryImage.path}
          alt={primaryImage.alt}
          width={primaryImage.width}
          height={primaryImage.height}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(event) => {
            const image = event.currentTarget;
            if (image.src.endsWith(NEUTRAL_YACHT_FALLBACK)) return;
            image.src = NEUTRAL_YACHT_FALLBACK;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-display font-semibold text-foreground mb-3">{yacht.name}</h2>
        <dl className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-5">
          <div className="flex items-center gap-2"><Ruler className="w-4 h-4" /><dt className="sr-only">Length</dt><dd>{yacht.lengthFt} ft</dd></div>
          <div className="flex items-center gap-2"><Users className="w-4 h-4" /><dt className="sr-only">Guest capacity</dt><dd>{yacht.guestCapacity} guests</dd></div>
          <div className="flex items-center gap-2"><CalendarDays className="w-4 h-4" /><dt className="sr-only">Year built</dt><dd>{yacht.yearBuilt}</dd></div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><dt className="sr-only">Minimum duration</dt><dd>{yacht.minimumDuration} hours</dd></div>
        </dl>
        <div className="flex items-center justify-between gap-4">
          <p className="text-primary font-display text-lg font-semibold">
            AED {yacht.pricePerHour.toLocaleString()}<span className="text-xs text-muted-foreground font-body">/hour</span>
          </p>
          <Link to={yachtPath(yacht.slug)} className="text-sm font-medium px-4 py-2 liquid-btn-gold text-primary">
            View verified facts
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default YachtCard;
