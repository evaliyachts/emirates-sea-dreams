import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedYachts from "@/components/home/FeaturedYachts";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import PackagesSection from "@/components/home/PackagesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GallerySection from "@/components/home/GallerySection";
import RoutesSection from "@/components/home/RoutesSection";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTAStrip from "@/components/home/CTAStrip";
import SEOContentSection from "@/components/home/SEOContentSection";
import SEOHead from "@/components/shared/SEOHead";

const Index = () => (
  <Layout>
    <SEOHead
      title="Yacht Rental Dubai | Luxury Yacht Charter Dubai — Dubai Yacht"
      description="Yacht rental Dubai with Dubai Yacht — luxury yacht charter Dubai, private yacht hire Dubai, Dubai yacht booking & trips. Book yacht in Dubai on WhatsApp."
      path="/"
    />
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
  </Layout>
);

export default Index;
