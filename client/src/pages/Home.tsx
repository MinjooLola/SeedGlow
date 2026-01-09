import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";
import SuccessStories from "@/components/SuccessStories";
import ImageSlider from "@/components/ImageSlider";
import ArchiveSection from "@/components/ArchiveSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <TargetAudienceSection />
        <ServicesSection />
        <AboutSection />
        <ImageSlider />
        <PartnersSection />
        <SuccessStories />
        <ArchiveSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
