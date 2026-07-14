import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { HOME_SERVICE_MEDIA, type ServicePlanningCategoryId } from "@/data/home-media";
import { cn } from "@/lib/utils";

const PLANNING_CATEGORIES: Record<ServicePlanningCategoryId, { title: string; copy: string }> = {
  celebration: {
    title: "Celebration planning",
    copy: "Describe the gathering, guest count and optional setup. Decoration, cake, photography and music require separate confirmation and pricing.",
  },
  romance: {
    title: "Romance requests",
    copy: "Prepare the preferred date, group size and any setup request without assuming a route, supplier, decoration or privacy feature.",
  },
  hospitality: {
    title: "Hospitality requests",
    copy: "Food, barbecue and similar ideas are optional. Ask what can be confirmed for the selected yacht, date and group before relying on them.",
  },
  "water-activity": {
    title: "Water activity requests",
    copy: "Swimming, fishing, Jet Ski and other activities need specific capability, supplier, safety and operating confirmation.",
  },
  "private-experience": {
    title: "Private experience planning",
    copy: "Treat timing, duration and other experience ideas as request preferences. Availability and operating details remain subject to confirmation.",
  },
};

const SERVICES = HOME_SERVICE_MEDIA.map((image) => ({
  ...PLANNING_CATEGORIES[image.planningCategoryId],
  image,
}));

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const lockRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const isInView = () => {
      const element = sectionRef.current;
      if (!element) return false;
      const bounds = element.getBoundingClientRect();
      return bounds.top <= 1 && bounds.bottom >= window.innerHeight - 1;
    };

    const step = (direction: 1 | -1) => {
      setActive((current) => Math.min(SERVICES.length - 1, Math.max(0, current + direction)));
    };

    const onWheel = (event: WheelEvent) => {
      if (!isInView()) return;
      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1;
      const atBoundary = (active === 0 && direction === -1) || (active === SERVICES.length - 1 && direction === 1);
      if (atBoundary) return;
      event.preventDefault();
      if (lockRef.current) return;
      lockRef.current = true;
      step(direction);
      window.setTimeout(() => { lockRef.current = false; }, 600);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!isInView() || touchStartY.current == null) return;
      const delta = touchStartY.current - (event.touches[0]?.clientY ?? 0);
      if (Math.abs(delta) < 40) return;
      const direction: 1 | -1 = delta > 0 ? 1 : -1;
      const atBoundary = (active === 0 && direction === -1) || (active === SERVICES.length - 1 && direction === 1);
      if (atBoundary) return;
      event.preventDefault();
      if (lockRef.current) return;
      lockRef.current = true;
      step(direction);
      touchStartY.current = null;
      window.setTimeout(() => { lockRef.current = false; }, 600);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  return (
    <section
      ref={sectionRef}
      data-home-section="services"
      className="liquid-divider relative"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col">
        <div className="container mx-auto px-4 pt-16">
          <AnimatedSection initiallyVisible className="mb-8 text-center">
            <span className="liquid-pill inline-block">Optional requests</span>
            <h2 className="mt-4 mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
              Plan Services Without Assuming Inclusions
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Use these categories to prepare questions. Each optional item remains subject to confirmation and separate pricing.
            </p>
          </AnimatedSection>
        </div>

        <div className="flex flex-1 items-center justify-center [perspective:1200px]">
          <div className="relative h-[55vh] max-h-[480px] w-[88vw] max-w-md">
            {SERVICES.map((service, index) => {
              const offset = index - active;
              const isActive = offset === 0;
              const isPast = offset < 0;
              const translateY = isPast ? -120 : offset * 12;
              const translateZ = isPast ? 0 : -offset * 30;
              const rotate = isPast ? -8 : 0;
              const scale = isPast ? 0.9 : 1 - Math.min(offset, 3) * 0.04;
              const opacity = isPast || offset > 4 ? 0 : 1;

              return (
                <article
                  key={service.image.id}
                  className={cn(
                    "absolute inset-0 overflow-hidden rounded-3xl border border-border/40 transition-all duration-500 ease-out will-change-transform",
                    "shadow-[0_20px_60px_-20px_hsl(var(--background)/0.8)]",
                  )}
                  style={{
                    transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotate(${rotate}deg) scale(${scale})`,
                    opacity,
                    zIndex: SERVICES.length - Math.abs(offset),
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <Link
                    to="/services"
                    tabIndex={isActive ? 0 : -1}
                    className="group relative block h-full w-full"
                  >
                    <img
                      src={service.image.path}
                      alt={service.image.alt}
                      aria-hidden="true"
                      width={service.image.width}
                      height={service.image.height}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/45 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Planning category</p>
                      <h3 className="text-2xl font-display font-bold text-foreground">{service.title}</h3>
                      <p className="mt-3 leading-7 text-muted-foreground">{service.copy}</p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto flex max-w-xl flex-wrap justify-center pb-8">
          {SERVICES.map((service, index) => (
            <button
              key={service.image.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show planning image ${index + 1} of ${SERVICES.length}: ${service.title}`}
              aria-current={index === active ? "true" : undefined}
              className="group flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 rounded-full transition-all group-hover:bg-primary/70",
                  index === active ? "w-6 bg-primary" : "w-1.5 bg-foreground/30",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
