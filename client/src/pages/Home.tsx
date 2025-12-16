import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MetricsBar from "@/components/MetricsBar";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";
import SuccessStories from "@/components/SuccessStories";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <MetricsBar />
        <ServicesSection />
        <AboutSection />
        <PartnersSection />
        <SuccessStories />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
