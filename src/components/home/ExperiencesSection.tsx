import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, Cake, Camera, Fish, Heart, PartyPopper, Sunset } from "lucide-react";
import { StaggerContainer, AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerItemVariants } from "@/lib/animation-variants";

const themes = [
  { title: "Birthday", icon: Cake, copy: "Prepare the full guest count and list any optional setup separately." },
  { title: "Marriage proposal", icon: Heart, copy: "Describe the preferred group size, date and optional setup request." },
  { title: "Corporate gathering", icon: Briefcase, copy: "Prepare the purpose and practical needs for capability confirmation." },
  { title: "Fishing request", icon: Fish, copy: "Equipment, safety, supplier and operating details require confirmation." },
  { title: "Sunset timing", icon: Sunset, copy: "Request a preferred time without relying on a fixed route or duration." },
  { title: "New Year's Eve", icon: PartyPopper, copy: "Seasonal availability and every operating detail remain on request." },
  { title: "Photoshoot", icon: Camera, copy: "Photography, drone use, access and permissions are separate questions." },
] as const;

const ExperiencesSection = () => (
  <section data-home-section="occasion-themes" className="section-padding">
    <div className="container mx-auto px-4">
      <AnimatedSection initiallyVisible className="mb-14 text-center">
        <span className="liquid-pill inline-block">Occasion themes</span>
        <h2 className="mt-4 mb-4 text-3xl font-display font-bold text-foreground md:text-5xl">
          Turn an Occasion Idea into a Careful Request
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          These themes help organize a request. They do not promise a package, supplier, activity, route or inclusion.
        </p>
      </AnimatedSection>

      <StaggerContainer initiallyVisible className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {themes.map(({ title, icon: Icon, copy }) => (
          <motion.div key={title} variants={staggerItemVariants}>
            <Link
              to="/occasions"
              className="liquid-glass-gold group block p-5 text-center transition-all hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="liquid-icon mx-auto mb-3 h-12 w-12 rounded-xl transition-transform group-hover:scale-110">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-display font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{copy}</p>
            </Link>
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default ExperiencesSection;
