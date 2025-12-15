import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MetricsBar from "@/components/MetricsBar";
import PartnersSection from "@/components/PartnersSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
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
        <PartnersSection />
        <ServicesSection />
        <AboutSection />
        <SuccessStories />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
