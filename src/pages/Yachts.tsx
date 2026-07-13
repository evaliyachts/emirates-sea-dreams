import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import YachtCard from "@/components/shared/YachtCard";
import { AnimatedSection, StaggerContainer } from "@/components/shared/AnimatedSection";
import { publishableYachts, TOTAL_YACHT_SOURCE_RECORDS } from "@/data/yachts";

const Yachts = () => (
  <Layout>
    <SEOHead
      title="Verified Yacht Catalogue in Dubai | Dubai Yacht"
      description="Browse yacht records that have passed the English site's factual, offer and media-rights publication checks."
      path="/yachts"
    />

    <main className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Verified Yacht Catalogue
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            This catalogue links only to yacht records whose public name, specifications, booking terms and image rights have been verified for this website. Records that have not passed every check are not presented as bookable yachts.
          </p>
        </AnimatedSection>

        {publishableYachts.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishableYachts.map((yacht, index) => (
              <YachtCard key={yacht.id} yacht={yacht} index={index} />
            ))}
          </StaggerContainer>
        ) : (
          <AnimatedSection className="glass-card max-w-3xl mx-auto p-8 text-center">
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">Verification in progress</h2>
            <p className="text-muted-foreground leading-relaxed">
              No individual yacht record currently has all required publication evidence. The internal migration inventory contains {TOTAL_YACHT_SOURCE_RECORDS} records, and each remains unavailable here until its facts and media rights are approved.
            </p>
          </AnimatedSection>
        )}
      </div>
    </main>
  </Layout>
);

export default Yachts;
