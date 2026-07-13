import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedYachts from "@/components/home/FeaturedYachts";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import PackagesSection from "@/components/home/PackagesSection";
import SEOContentSection from "@/components/home/SEOContentSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GallerySection from "@/components/home/GallerySection";
import RoutesSection from "@/components/home/RoutesSection";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTAStrip from "@/components/home/CTAStrip";
import SEOHead from "@/components/shared/SEOHead";

const Index = () => (
  <Layout>
    <SEOHead
      title="Private Yacht Rental Dubai | Compare Verified Yachts"
      description="Compare 19 verified private yachts in Dubai by hourly price, guest capacity and minimum duration, then prepare a factual rental request."
      path="/"
    />
    <div data-commercial-content>
      <HeroSection />
      <FeaturedYachts />
      <ServicesSection />
      <WhyChooseUs />
      <ExperiencesSection />
      <PackagesSection />
      <SEOContentSection />
      <TestimonialsSection />
      <GallerySection />
      <RoutesSection />
      <HomeFAQ />
      <CTAStrip />
    </div>
  </Layout>
);

export default Index;
