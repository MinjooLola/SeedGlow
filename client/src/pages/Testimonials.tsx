import Navigation from "@/components/Navigation";
import SuccessStories from "@/components/SuccessStories";
import Footer from "@/components/Footer";

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <SuccessStories />
      </main>
      <Footer />
    </div>
  );
}
