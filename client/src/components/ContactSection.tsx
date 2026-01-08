import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";
import { SiLinkedin, SiInstagram } from "react-icons/si";

const socialLinks = [
  {
    icon: SiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lolajjoo/",
  },
  {
    icon: SiInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/seedglow_/",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-card">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
          CONTACT
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          로컬 스타트업의 다음 단계를 함께 설계합니다
        </h2>
        <p className="text-muted-foreground mb-8">
          BM 고도화, 로컬 브랜딩, IR 전략, 투자 연계에 대해 문의해주세요.
        </p>

        <div className="flex flex-col items-center gap-6">
          <a 
            href="mailto:minjoo.kim.biz@gmail.com"
            className="flex items-center gap-3 text-xl font-medium text-foreground hover:text-primary transition-colors"
            data-testid="link-email"
          >
            <div className="p-3 rounded-md bg-primary/10">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            minjoo.kim.biz@gmail.com
          </a>

          <div className="flex items-center gap-4 mt-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-5 h-5" />
                <span className="text-sm">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
