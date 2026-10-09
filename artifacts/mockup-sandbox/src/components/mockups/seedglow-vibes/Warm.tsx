import React from "react";
import { resumeIdentity, resumeRoleDetails } from "../../../../../../client/src/data/resumeExperiences";
import { Coffee, Sun, Sprout, ArrowRight, BookOpen, Handshake, TrendingUp, Presentation, MessageCircle } from "lucide-react";

export function Warm() {
  return (
    <div
      className="min-h-[100dvh] w-full max-w-[450px] mx-auto overflow-x-hidden"
      style={{
        fontFamily: "'Noto Sans KR', sans-serif",
        backgroundColor: "var(--bg-cream)",
        color: "var(--text-dark)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
        
        :root {
          --bg-cream: #FDFBF7;
          --bg-sand: #F4EFEB;
          --bg-terracotta-light: #FCECE8;
          --accent-terracotta: #D36C56;
          --accent-amber: #E29547;
          --text-dark: #3E3734;
          --text-muted: #7E736E;
          --border-soft: rgba(211, 108, 86, 0.15);
        }

        .warm-gradient-text {
          background: linear-gradient(135deg, var(--accent-terracotta), var(--accent-amber));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .warm-hero-bg {
          background: linear-gradient(180deg, var(--bg-terracotta-light) 0%, var(--bg-cream) 100%);
        }

        .soft-card {
          background: white;
          border-radius: 24px;
          border: 1px solid var(--border-soft);
          box-shadow: 0 8px 30px rgba(126, 115, 110, 0.05);
        }

        .btn-primary {
          background: var(--accent-terracotta);
          color: white;
          border-radius: 9999px;
          padding: 1rem 2rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(211, 108, 86, 0.2);
        }
        
        .btn-primary:active {
          transform: translateY(2px);
          box-shadow: 0 2px 5px rgba(211, 108, 86, 0.2);
        }
      `}</style>

      {/* Hero Section */}
      <section className="warm-hero-bg px-6 pt-16 pb-12 rounded-b-[40px] relative">
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-[#D36C56]" />
          <span className="font-bold tracking-tight text-[#D36C56]">SEEDGLOW</span>
        </div>
        
        <div className="mt-16 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 text-sm font-medium text-[#D36C56] border border-[#D36C56]/20">
            <Sun className="w-4 h-4" />
            <span>로컬 스타트업의 따뜻한 성장 파트너</span>
          </div>
          
          <h1 className="text-3xl font-bold leading-tight tracking-tight">
            당신의 빛나는 아이디어,<br />
            <span className="warm-gradient-text">세상과 만날 수 있도록</span>
          </h1>
          
          <p className="text-[#7E736E] leading-relaxed text-[15px]">
            수도권이 아니어도 괜찮습니다. 우리 지역만의 특별한 가치를 찾아 투자자들의 마음을 움직이는 비즈니스로 키워냅니다.
          </p>
          
          <button className="btn-primary w-full mt-4">
            무료 커피챗 신청하기
            <Coffee className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="px-6 py-12">
        <div className="grid grid-cols-2 gap-4">
          <div className="soft-card p-5 text-center">
            <div className="text-3xl font-bold text-[#D36C56] mb-1">300+</div>
            <div className="text-sm font-medium text-[#7E736E]">컨설팅 진행 팀</div>
          </div>
          <div className="soft-card p-5 text-center">
            <div className="text-3xl font-bold text-[#D36C56] mb-1">26팀</div>
            <div className="text-sm font-medium text-[#7E736E]">투자 유치 성공</div>
          </div>
          <div className="soft-card p-5 text-center">
            <div className="text-3xl font-bold text-[#D36C56] mb-1">50억+</div>
            <div className="text-sm font-medium text-[#7E736E]">누적 투자 금액</div>
          </div>
          <div className="soft-card p-5 text-center">
            <div className="text-3xl font-bold text-[#D36C56] mb-1">40+</div>
            <div className="text-sm font-medium text-[#7E736E]">강연 및 심사</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-12 bg-[#F4EFEB] rounded-[40px] mx-2">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-3">어떤 고민이 있으신가요?</h2>
          <p className="text-[#7E736E] text-sm">시드글로우가 여러분의 페이스메이커가 되어드립니다.</p>
        </div>
        
        <div className="space-y-4">
          {[
            {
              icon: <Presentation className="w-6 h-6 text-[#E29547]" />,
              title: "BM 고도화",
              desc: "막연한 아이디어를 돈이 되는 탄탄한 비즈니스 모델로 다듬습니다."
            },
            {
              icon: <Handshake className="w-6 h-6 text-[#E29547]" />,
              title: "로컬 브랜딩",
              desc: "우리 지역의 자원과 특색을 살린 매력적인 스토리를 발굴합니다."
            },
            {
              icon: <TrendingUp className="w-6 h-6 text-[#E29547]" />,
              title: "IR 전략 수립",
              desc: "투자자의 시선에서 우리 팀의 강점을 가장 잘 보여주는 피칭을 준비합니다."
            },
            {
              icon: <BookOpen className="w-6 h-6 text-[#E29547]" />,
              title: "투자자 연결",
              desc: "로컬 스타트업에 관심 있는 핏이 맞는 투자자와의 만남을 주선합니다."
            }
          ].map((service, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 flex gap-4 items-start shadow-sm border border-transparent hover:border-[#D36C56]/20 transition-colors">
              <div className="bg-[#FCECE8] p-3 rounded-xl shrink-0">
                {service.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{service.title}</h3>
                <p className="text-[#7E736E] text-sm leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About CEO Section */}
      <section className="px-6 py-16">
        <div className="soft-card p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-[#FCECE8] -z-10"></div>
          
          <div className="w-24 h-24 mx-auto bg-white rounded-full p-1 shadow-md mb-4 mt-4">
            <div className="w-full h-full bg-[#E29547]/20 rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-3xl">👩🏻‍💼</span>
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-1">{resumeIdentity.name}</h2>
          <p className="text-[#D36C56] text-sm font-medium mb-6">{resumeRoleDetails.seedGlow.title} / {resumeRoleDetails.seedGlow.period}</p>
          
          <p className="text-[#7E736E] text-[15px] leading-relaxed mb-6 text-left">
            {resumeRoleDetails.seedGlow.responsibilities.join(" ")}
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-[#F4EFEB] rounded-full text-xs text-[#7E736E]">{resumeRoleDetails.mysc.title}</span>
            <span className="px-3 py-1 bg-[#F4EFEB] rounded-full text-xs text-[#7E736E]">{resumeRoleDetails.mysc.period}</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">함께 성장할 준비가 되셨나요?</h2>
        <p className="text-[#7E736E] mb-8 text-sm">
          편하게 차 한 잔 하며 이야기 나눠요.<br />
          여러분의 이야기를 기다립니다.
        </p>
        
        <button className="btn-primary w-full py-4 text-lg">
          <MessageCircle className="w-5 h-5 mr-2" />
          상담 문의하기
        </button>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#F4EFEB] px-6 py-10 text-center rounded-t-[40px]">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Sprout className="w-5 h-5 text-[#D36C56]/60" />
          <span className="font-bold text-[#D36C56]/60 tracking-tight">SEEDGLOW</span>
        </div>
        <p className="text-xs text-[#7E736E]/60 mb-2">
          시드글로우 | 대표: 김민주
        </p>
        <p className="text-xs text-[#7E736E]/60">
          © {new Date().getFullYear()} SeedGlow. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
