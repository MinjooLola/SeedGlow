import { Separator } from "@/components/ui/separator";
import { SiLinkedin, SiInstagram } from "react-icons/si";
import { Link } from "wouter";
import logoImage from "@assets/1_1765810147291.png";

const footerLinks = {
  services: [
    { label: "BM 고도화", href: "/services" },
    { label: "로컬 브랜딩", href: "/services" },
    { label: "IR 전략", href: "/services" },
    { label: "투자 연계", href: "/services" },
  ],
  company: [
    { label: "회사 소개", href: "/about" },
    { label: "컨설팅 후기", href: "/testimonials" },
  ],
  support: [
    { label: "문의하기", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: SiLinkedin, href: "https://www.linkedin.com/in/lolajjoo/", label: "LinkedIn" },
  { icon: SiInstagram, href: "https://www.instagram.com/seedglow_/", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-sidebar py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logoImage}
                alt="SeedGlow"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">SeedGlow</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              로컬 스타트업의 성장을 함께하는 파트너, SeedGlow입니다. 전국 300팀
              이상의 컨설팅 경험으로 여러분의 성공을 지원합니다.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-service-${index}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">회사</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-company-${index}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">지원</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-support-${index}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>서울특별시 도봉구 해등로 242-11</p>
            <p className="mt-1">minjoo.kim.biz@gmail.com</p>
            <p className="mt-1">
              &copy; {new Date().getFullYear()} SeedGlow. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
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
