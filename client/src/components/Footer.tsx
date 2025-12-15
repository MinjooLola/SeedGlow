import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SiLinkedin, SiFacebook, SiInstagram } from "react-icons/si";
import logoImage from "@assets/1_1765810147291.png";

const footerLinks = {
  services: [
    { label: "비즈니스 컨설팅", href: "#services" },
    { label: "투자 유치 지원", href: "#services" },
    { label: "팀 빌딩", href: "#services" },
    { label: "마케팅 전략", href: "#services" },
  ],
  company: [
    { label: "회사 소개", href: "#about" },
    { label: "성공 사례", href: "#success" },
    { label: "블로그", href: "#" },
    { label: "채용", href: "#" },
  ],
  support: [
    { label: "문의하기", href: "#contact" },
    { label: "FAQ", href: "#" },
    { label: "개인정보처리방침", href: "#" },
    { label: "이용약관", href: "#" },
  ],
};

const socialLinks = [
  { icon: SiLinkedin, href: "#", label: "LinkedIn" },
  { icon: SiFacebook, href: "#", label: "Facebook" },
  { icon: SiInstagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // todo: remove mock functionality - implement real newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-sidebar py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-2">
            <img
              src={logoImage}
              alt="SeedGlow"
              className="h-8 w-auto mb-4"
            />
            <p className="text-muted-foreground mb-6 max-w-sm">
              스타트업의 성장을 함께하는 파트너, SeedGlow입니다. 전국 300팀
              이상의 컨설팅 경험으로 여러분의 성공을 지원합니다.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-wrap gap-2">
              <Input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-[200px]"
                data-testid="input-newsletter"
              />
              <Button type="submit" data-testid="button-subscribe">
                구독하기
              </Button>
            </form>
          </div>

          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-service-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">회사</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-company-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">지원</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-support-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>서울특별시 강남구 테헤란로 123, 8층</p>
            <p className="mt-1">
              &copy; {new Date().getFullYear()} SeedGlow. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
