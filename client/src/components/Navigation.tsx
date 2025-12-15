import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/1_1765810147291.png";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "서비스", href: "/services" },
  { label: "회사소개", href: "/about" },
  { label: "컨설팅 후기", href: "/testimonials" },
  { label: "문의하기", href: "/contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between gap-4 h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center gap-2"
            data-testid="link-logo"
          >
            <img
              src={logoImage}
              alt="SeedGlow"
              className="h-10 md:h-14 w-auto"
            />
            <span className={`text-xl md:text-2xl font-bold ${
              isScrolled || !isHome ? "text-foreground" : "text-white"
            }`}>
              SeedGlow
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover-elevate active-elevate-2 px-3 py-2 rounded-md ${
                  isScrolled || !isHome
                    ? "text-foreground"
                    : "text-white/90 hover:text-white"
                } ${location === item.href ? "text-primary" : ""}`}
                data-testid={`link-nav-${item.label}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/contact">
              <Button data-testid="button-cta-header">
                상담 신청하기
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${isScrolled || !isHome ? "" : "text-white"}`}
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
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium text-foreground px-3 py-2 hover-elevate rounded-md ${
                    location === item.href ? "text-primary" : ""
                  }`}
                  data-testid={`link-nav-mobile-${item.label}`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 pt-2">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    className="w-full"
                    data-testid="button-cta-mobile"
                  >
                    상담 신청하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
