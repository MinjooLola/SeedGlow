import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/로고_1767060435670.png";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "서비스", href: "#services" },
  { label: "회사소개", href: "#about" },
  { label: "컨설팅 후기", href: "#success" },
  { label: "문의하기", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between gap-4 h-16 md:h-20">
          <button
            onClick={scrollToTop}
            className="flex items-center"
            data-testid="link-logo"
          >
            <img
              src={logoImage}
              alt="SeedGlow"
              className="h-8 md:h-10 w-auto"
            />
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors hover-elevate active-elevate-2 px-3 py-2 rounded-md ${
                  isScrolled
                    ? "text-foreground"
                    : "text-white/90 hover:text-white"
                }`}
                data-testid={`link-nav-${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("#contact")}
              data-testid="button-cta-header"
            >
              상담 신청하기
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${isScrolled ? "" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border pb-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium text-foreground px-3 py-2 hover-elevate rounded-md text-left"
                  data-testid={`link-nav-mobile-${item.label}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-3 pt-2">
                <Button
                  className="w-full"
                  onClick={() => scrollToSection("#contact")}
                  data-testid="button-cta-mobile"
                >
                  상담 신청하기
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
