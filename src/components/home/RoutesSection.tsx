import { AnimatedSection, ParallaxSection } from "@/components/shared/AnimatedSection";
import { CalendarDays, Clock3, ListPlus, ShipWheel, Timer, Users } from "lucide-react";

const requestDetails = [
  { icon: CalendarDays, name: "Preferred date", note: "Prepare a date for availability checking" },
  { icon: Clock3, name: "Start-time preference", note: "Treat timing as a request until confirmed" },
  { icon: Timer, name: "Requested duration", note: "Meet the selected yacht's stated minimum" },
  { icon: Users, name: "Complete guest count", note: "Keep the group within published capacity" },
  { icon: ShipWheel, name: "Yacht shortlist", note: "Compare facts before requesting confirmation" },
  { icon: ListPlus, name: "Optional requests", note: "List each item for separate confirmation" },
] as const;

const RoutesSection = () => (
  <section data-home-section="request-details" className="section-padding">
    <div className="container mx-auto px-4">
      <AnimatedSection initiallyVisible className="mb-14 text-center">
        <span className="liquid-pill inline-block">Request details</span>
        <h2 className="mt-4 mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
          Prepare the Details Before Asking for Confirmation
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          No fixed sightseeing route or departure point is promised here. Operating and route details belong to the confirmation process.
        </p>
      </AnimatedSection>

      <ParallaxSection speed={0.15}>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
          {requestDetails.map(({ icon: Icon, name, note }) => (
            <article key={name} className="liquid-glass flex items-start gap-3 p-4">
              <div className="liquid-icon h-8 w-8 shrink-0 rounded-lg">
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{name}</h3>
                <p className="text-xs leading-5 text-muted-foreground">{note}</p>
              </div>
            </article>
          ))}
        </div>
      </ParallaxSection>
    </div>
  </section>
);

export default RoutesSection;
