import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { formatAed, publishedFleetSummary } from "@/lib/published-fleet";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduceMotion ? 1 : 0]);

  return (
    <section
      ref={ref}
      data-home-section="hero"
      className="relative flex min-h-[760px] items-center justify-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,hsl(var(--gold)/0.24),transparent_34%),radial-gradient(circle_at_78%_22%,hsl(var(--primary)/0.16),transparent_30%),linear-gradient(145deg,hsl(var(--background)),hsl(var(--navy)/0.92)_55%,hsl(var(--background)))]" />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, -18, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 top-28 h-80 w-80 rounded-full border border-primary/15 bg-primary/5 blur-sm"
      />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, 20, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 bottom-16 h-96 w-96 rounded-full border border-foreground/10 bg-foreground/[0.025]"
      />
      <div className="absolute inset-0 hero-gradient opacity-70" />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto max-w-5xl px-4 pb-20 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.1 }}
          className="liquid-pill mb-5 inline-block"
        >
          Private yacht decision guide
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.25 }}
          className="mb-5 text-4xl font-display font-bold leading-tight text-foreground sm:text-5xl md:text-7xl"
        >
          Private Yacht Rental in Dubai, <span className="text-gradient-gold">Compared with Verified Facts</span>
        </motion.h1>

        <motion.p
          data-page-introduction
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.4 }}
          className="mx-auto mb-7 max-w-3xl text-base font-light leading-7 text-muted-foreground sm:text-lg md:text-xl"
        >
          Choose a private yacht by the decisions that affect your request: group size, hourly price, minimum duration and verified vessel facts. The fleet is not described as a public, ticketed or shared cruise service. Rental, hire and charter are treated here as ways people describe the same private-yacht decision—not as reasons to create repetitive pages.
        </motion.p>

        <motion.div
          data-direct-answer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.55 }}
          className="liquid-glass-gold mx-auto mb-8 max-w-4xl p-5 text-left sm:p-6"
        >
          <h2 className="text-xl font-semibold text-foreground">Direct answer</h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            The current published catalogue contains {publishedFleetSummary.yachtCount} verified yacht records from {publishedFleetSummary.lengthFt.minimum} to {publishedFleetSummary.lengthFt.maximum} feet, for stated capacities from {publishedFleetSummary.guestCapacity.minimum} to {publishedFleetSummary.guestCapacity.maximum} guests. Hourly prices run from {formatAed(publishedFleetSummary.pricePerHour.minimum)} to {formatAed(publishedFleetSummary.pricePerHour.maximum)}, and every yacht remains subject to availability confirmation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.7 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/yachts" className="liquid-btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base">
            Compare verified yachts <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link to="/occasions" className="liquid-btn inline-flex items-center justify-center gap-2 px-8 py-4 text-base text-foreground">
            <Compass className="h-5 w-5" aria-hidden="true" /> Plan an occasion
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-muted-foreground/40 pt-2">
          <div className="h-2 w-1 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
