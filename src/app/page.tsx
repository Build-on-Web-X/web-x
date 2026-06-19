import { AboutSection } from "@/components/sections/about-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FeaturedWorksSection } from "@/components/sections/featured-works-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ImageCarouselSection } from "@/components/sections/image-carousel-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TechnologiesSection } from "@/components/sections/technologies-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TechnologiesSection />
      <AboutSection />
      <ImageCarouselSection />
      <ServicesSection />
      <FeaturedWorksSection />
      <ProcessSection />
      <TestimonialsSection />
      <CtaSection />
      <FooterSection />
    </>
  );
}
