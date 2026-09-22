import { AnimatedSection, ParallaxSection } from "@/components/shared/AnimatedSection";
import { CalendarDays, Clock3, ListPlus, ShipWheel, Timer, Users } from "lucide-react";

const requestDetails = [
  { icon: CalendarDays, name: "Preferred date", note: "Choose your preferred date" },
  { icon: Clock3, name: "Start-time preference", note: "Tell us when you would like to start" },
  { icon: Timer, name: "Requested duration", note: "Meet the selected yacht's stated minimum" },
  { icon: Users, name: "Complete guest count", note: "Include everyone who will board" },
  { icon: ShipWheel, name: "Yacht shortlist", note: "Name a yacht or ask for options" },
  { icon: ListPlus, name: "Optional requests", note: "Share food, celebration or access needs" },
] as const;

const RoutesSection = () => (
  <section data-home-section="request-details" className="section-padding">
    <div className="container mx-auto px-4">
      <AnimatedSection initiallyVisible className="mb-14 text-center">
        <span className="liquid-pill inline-block">Request details</span>
        <h2 className="mt-4 mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
          What to Send with Your Enquiry
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          These details help the team check availability and prepare options for your group.
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
