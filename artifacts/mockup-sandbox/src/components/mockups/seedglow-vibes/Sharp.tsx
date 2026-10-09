import React from "react";
import { resumeIdentity, resumeRoleDetails } from "../../../../../../client/src/data/resumeExperiences";
import { ArrowRight, ChevronRight, BarChart, TrendingUp, Users, Target, Building2, MapPin } from "lucide-react";

export function Sharp() {
  return (
    <div 
      style={{ fontFamily: "'Space Grotesk', 'Montserrat', 'Noto Sans KR', sans-serif" }} 
      className="min-h-screen bg-[#050506] text-white selection:bg-[#d4af37] selection:text-black overflow-x-hidden w-full max-w-[450px] mx-auto relative border-x border-[#1a1a1c] flex flex-col"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700;900&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        
        .font-mono-accent {
          font-family: 'Space Mono', monospace;
        }
        
        .gold-accent {
          color: #d4af37;
        }
        
        .bg-gold {
          background-color: #d4af37;
        }
        
        .sharp-border {
          border: 1px solid #1a1a1c;
        }
      `}</style>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-[#1a1a1c] sticky top-0 bg-[#050506]/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gold rounded-none"></div>
          <span className="font-bold tracking-widest text-sm uppercase">SeedGlow</span>
        </div>
        <button className="text-xs uppercase tracking-widest font-mono-accent text-[#888] hover:text-white transition-colors">
          Menu
        </button>
      </nav>

      {/* Hero Section */}
      <header className="px-6 pt-20 pb-16 relative">
        <div className="absolute top-0 left-6 w-[1px] h-20 bg-gradient-to-b from-transparent to-gold opacity-50"></div>
        <p className="font-mono-accent text-xs uppercase tracking-[0.2em] gold-accent mb-6">
          Local Startup Growth Partner
        </p>
        <h1 className="text-4xl font-bold leading-[1.2] tracking-tight mb-6">
          <span className="block opacity-50">비수도권</span>
          <span className="block">스타트업의</span>
          <span className="block gold-accent">생존과 스케일업.</span>
        </h1>
        <p className="text-[#888] text-sm leading-relaxed mb-10 max-w-[280px]">
          지역의 한계를 넘어, 압도적인 비즈니스 모델과 투자 유치 전략으로 성공적인 성장을 이끕니다.
        </p>
        <button className="group flex items-center justify-between w-full bg-white text-black px-6 py-4 font-semibold text-sm hover:bg-gray-200 transition-colors">
          <span className="tracking-wide uppercase">Start Consultation</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </header>

      {/* Stats Section */}
      <section className="border-y border-[#1a1a1c] grid grid-cols-2">
        <div className="p-6 border-r border-[#1a1a1c] flex flex-col justify-between h-[140px]">
          <span className="text-[#666] text-xs font-mono-accent tracking-wider">CONSULTING</span>
          <div className="mt-4">
            <span className="block text-3xl font-bold font-mono-accent mb-1">300<span className="gold-accent">+</span></span>
            <span className="text-xs text-[#888] font-medium tracking-wide">누적 컨설팅 팀</span>
          </div>
        </div>
        <div className="p-6 flex flex-col justify-between h-[140px]">
          <span className="text-[#666] text-xs font-mono-accent tracking-wider">INVESTMENT</span>
          <div className="mt-4">
            <span className="block text-3xl font-bold font-mono-accent mb-1">26<span className="gold-accent"></span></span>
            <span className="text-xs text-[#888] font-medium tracking-wide">투자 유치 성공</span>
          </div>
        </div>
        <div className="p-6 border-t border-r border-[#1a1a1c] flex flex-col justify-between h-[140px]">
          <span className="text-[#666] text-xs font-mono-accent tracking-wider">FUNDING</span>
          <div className="mt-4">
            <span className="block text-3xl font-bold font-mono-accent mb-1">50<span className="text-xl">억</span><span className="gold-accent">+</span></span>
            <span className="text-xs text-[#888] font-medium tracking-wide">누적 조달 금액</span>
          </div>
        </div>
        <div className="p-6 border-t border-[#1a1a1c] flex flex-col justify-between h-[140px]">
          <span className="text-[#666] text-xs font-mono-accent tracking-wider">LECTURES</span>
          <div className="mt-4">
            <span className="block text-3xl font-bold font-mono-accent mb-1">40<span className="gold-accent">+</span></span>
            <span className="text-xs text-[#888] font-medium tracking-wide">심사 및 강연</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-20 relative">
        <div className="absolute left-0 top-20 w-1 h-12 bg-gold"></div>
        <h2 className="text-2xl font-bold mb-10 tracking-tight">Core Competencies.</h2>
        
        <div className="space-y-4">
          {[
            {
              id: "01",
              title: "Business Model",
              kor: "비즈니스 모델 고도화",
              desc: "시장의 문제를 정확히 타겟팅하고 수익 창출이 가능한 구조로 BM을 재설계합니다.",
              icon: <Target className="w-5 h-5 text-[#888]" />
            },
            {
              id: "02",
              title: "IR Strategy",
              kor: "투자 유치 (IR) 전략",
              desc: "투자자의 관점에서 설득력 있는 스토리텔링과 재무 계획을 수립합니다.",
              icon: <TrendingUp className="w-5 h-5 text-[#888]" />
            },
            {
              id: "03",
              title: "Local Branding",
              kor: "로컬 브랜드 전략",
              desc: "지역의 특수성을 강점으로 승화시키는 차별화된 브랜딩을 구축합니다.",
              icon: <MapPin className="w-5 h-5 text-[#888]" />
            },
            {
              id: "04",
              title: "Network",
              kor: "투자자 네트워킹",
              desc: "검증된 AC/VC 네트워크를 통해 실제 투자 유치 기회를 연결합니다.",
              icon: <Users className="w-5 h-5 text-[#888]" />
            }
          ].map((service) => (
            <div key={service.id} className="group p-6 sharp-border bg-[#08080a] hover:border-[#333] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 font-mono-accent text-6xl font-bold transition-opacity group-hover:opacity-10">
                {service.id}
              </div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="font-mono-accent text-xs gold-accent tracking-widest">{service.id}</span>
                {service.icon}
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-1">{service.title}</h3>
                <p className="text-sm text-white/90 mb-3">{service.kor}</p>
                <p className="text-xs text-[#666] leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CEO Section */}
      <section className="border-t border-[#1a1a1c] flex flex-col">
        <div className="p-6 pb-0">
          <p className="font-mono-accent text-xs uppercase tracking-widest text-[#666] mb-4">Leadership</p>
          <h2 className="text-2xl font-bold tracking-tight mb-8">{resumeIdentity.name}</h2>
        </div>
        
        <div className="aspect-[4/3] bg-[#111] relative border-y border-[#1a1a1c] mb-8 overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-700"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050506] to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 flex gap-2">
            <span className="px-2 py-1 bg-[#1a1a1c] text-white text-[10px] font-mono-accent tracking-widest">CEO</span>
            <span className="px-2 py-1 bg-[#1a1a1c] text-white text-[10px] font-mono-accent tracking-widest">FOUNDER</span>
          </div>
        </div>
        
        <div className="px-6 pb-20">
          <p className="text-sm text-[#888] leading-loose mb-6">
            {resumeRoleDetails.seedGlow.responsibilities.join(" ")}
          </p>
          <div className="space-y-3 font-mono-accent text-xs text-[#666]">
            <div className="flex items-start gap-4">
              <span className="gold-accent w-2 opacity-50">▶</span>
              <p>{resumeRoleDetails.seedGlow.title} / {resumeRoleDetails.seedGlow.period}</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="gold-accent w-2 opacity-50">▶</span>
              <p>{resumeRoleDetails.mysc.title} / {resumeRoleDetails.mysc.period}</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="gold-accent w-2 opacity-50">▶</span>
              <p>{resumeRoleDetails.mysc.responsibilities[1]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white text-black p-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 border-[1px] border-black/10 rounded-full"></div>
        <div className="absolute -right-20 -top-20 w-60 h-60 border-[1px] border-black/10 rounded-full"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tighter mb-4 leading-tight">
            압도적인<br/>성장을 원하십니까?
          </h2>
          <p className="text-sm text-black/70 mb-8 max-w-[250px]">
            지금 바로 시드글로우와 함께 비즈니스의 다음 단계를 설계하십시오.
          </p>
          
          <form className="space-y-4 mb-8" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="기업명" 
              className="w-full bg-transparent border-b border-black/20 pb-3 pt-2 text-sm placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
            />
            <input 
              type="email" 
              placeholder="담당자 이메일" 
              className="w-full bg-transparent border-b border-black/20 pb-3 pt-2 text-sm placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
            />
            <button className="w-full bg-black text-white py-4 mt-6 flex items-center justify-center gap-2 hover:bg-[#222] transition-colors text-sm font-bold tracking-widest uppercase">
              Request Info <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-[#1a1a1c] flex flex-col items-center justify-center text-center">
        <div className="w-4 h-4 bg-gold mb-6"></div>
        <div className="font-mono-accent text-[10px] text-[#444] space-y-2 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} SeedGlow. All rights reserved.</p>
          <p>Local Startup Growth Partner</p>
        </div>
      </footer>
    </div>
  );
}
