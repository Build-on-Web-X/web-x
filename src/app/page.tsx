import { AboutSection } from "@/components/sections/about-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturedWorksSection } from "@/components/sections/featured-works-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ImageCarouselSection } from "@/components/sections/image-carousel-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TechnologiesSection } from "@/components/sections/technologies-section";
import { getFeaturedWorks, getServiceImages } from "@/lib/supabase-data";

export default async function Home() {
  const [featuredWorks, serviceImages] = await Promise.all([
    getFeaturedWorks(),
    getServiceImages(),
  ]);

  return (
    <>
      <HeroSection />
      <TechnologiesSection />
      <AboutSection />
      <ImageCarouselSection />
      <ServicesSection services={serviceImages} />
      <FeaturedWorksSection featuredWorks={featuredWorks} />
      <ProcessSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </>
  );
}
