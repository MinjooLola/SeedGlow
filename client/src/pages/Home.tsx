import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MetricsBar from "@/components/MetricsBar";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <MetricsBar />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}
