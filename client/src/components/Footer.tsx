import { SiLinkedin, SiInstagram } from "react-icons/si";

const socialLinks = [
  { icon: SiLinkedin, href: "https://www.linkedin.com/in/lolajjoo/", label: "LinkedIn" },
  { icon: SiInstagram, href: "https://www.instagram.com/lola_minjoo/", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-amber-950 py-8 md:py-10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-amber-200/60 text-center md:text-left">
            <p>대표: 김민주  |  사업자등록번호: 302-10-65233</p>
            <p className="mt-1">E-mail : minjoo.kim.biz@gmail.com</p>
            <p className="mt-1">&copy; 2026 SeedGlow. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 text-amber-200/70 hover:text-white transition-colors"
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
