import Navbar from "@/components/layout/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { FeatureHighlights } from "@/components/marketing/FeatureHighlights";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { VoiceInterviewSection } from "@/components/marketing/VoiceInterviewSection";
import { CvAnalysisSection } from "@/components/marketing/CvAnalysisSection";
import { RolesSection } from "@/components/marketing/RolesSection";
import { PricingSection } from "@/components/marketing/PricingSection";
import { TestimonialsCarousel } from "@/components/marketing/TestimonialsCarousel";
import { CtaSection } from "@/components/marketing/CtaSection";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen pattern">
      <Navbar />
      <Hero />
      <FeatureHighlights />
      <HowItWorks />
      <VoiceInterviewSection />
      <CvAnalysisSection />
      <RolesSection />
      <PricingSection />
      <TestimonialsCarousel />
      <CtaSection />
      <SiteFooter />
    </div>
  );
}
