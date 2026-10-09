import React from "react";
import { resumeIdentity, resumeRoleDetails } from "../../../../../../client/src/data/resumeExperiences";
import { ArrowRight } from "lucide-react";

export function Editorial() {
  return (
    <div
      className="min-h-screen bg-[#FAFAF8] text-zinc-900 overflow-x-hidden selection:bg-amber-100 selection:text-amber-900"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        
        .accent-underline {
          position: relative;
          display: inline-block;
        }
        
        .accent-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0.15em;
          width: 100%;
          height: 1px;
          background-color: #D97706; /* amber-600 */
          z-index: -1;
        }
      `}</style>

      {/* Header */}
      <header className="px-6 py-8 flex justify-between items-center border-b border-zinc-200/50">
        <div className="text-sm font-semibold tracking-widest uppercase">SeedGlow</div>
        <div className="text-xs text-zinc-500 tracking-wider">SEOUL / LOCAL</div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-24 pb-20">
        <p className="text-xs font-medium text-amber-700 tracking-widest uppercase mb-6">
          Local Startup Partner
        </p>
        <h1 className="font-playfair text-4xl leading-[1.3] text-zinc-900 mb-8">
          지역의 고유한 가치를<br />
          <span className="italic text-zinc-500 font-light">탁월한 비즈니스로</span><br />
          <span className="accent-underline">번역합니다.</span>
        </h1>
        <p className="text-zinc-600 text-sm leading-relaxed max-w-xs font-light">
          시드글로우는 로컬 스타트업이 마주하는 본질적인 고민을 함께 해결하며, 지속 가능한 성장을 위한 명확한 방향을 제시합니다.
        </p>
      </section>

      {/* Metrics */}
      <section className="px-6 py-20 border-y border-zinc-200/50 bg-white">
        <h2 className="font-playfair text-xl italic text-zinc-400 mb-12">The Impact</h2>
        
        <div className="space-y-12">
          <div className="flex items-start gap-6">
            <div className="font-playfair text-4xl text-zinc-900 w-24">300<span className="text-2xl text-amber-600">+</span></div>
            <div>
              <div className="text-xs font-semibold tracking-wider text-zinc-900 mb-1">LOCAL STARTUPS</div>
              <div className="text-sm text-zinc-500 font-light">누적 컨설팅 및 멘토링 팀</div>
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="font-playfair text-4xl text-zinc-900 w-24">26</div>
            <div>
              <div className="text-xs font-semibold tracking-wider text-zinc-900 mb-1">INVESTMENTS</div>
              <div className="text-sm text-zinc-500 font-light">성공적인 투자 유치 팀</div>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="font-playfair text-4xl text-zinc-900 w-24">50<span className="text-lg text-zinc-400 ml-1">억+</span></div>
            <div>
              <div className="text-xs font-semibold tracking-wider text-zinc-900 mb-1">CAPITAL RAISED</div>
              <div className="text-sm text-zinc-500 font-light">누적 투자 유치 금액</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-24">
        <h2 className="font-playfair text-3xl mb-12">Expertise</h2>
        
        <div className="space-y-10">
          <div className="group border-b border-zinc-200/50 pb-8">
            <div className="text-xs text-amber-700 font-medium mb-3">01</div>
            <h3 className="text-lg font-semibold mb-3">Business Model</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              로컬 자원을 활용한 지속 가능하고 차별화된 비즈니스 모델(BM) 구축 및 고도화 전략.
            </p>
          </div>
          
          <div className="group border-b border-zinc-200/50 pb-8">
            <div className="text-xs text-amber-700 font-medium mb-3">02</div>
            <h3 className="text-lg font-semibold mb-3">Local Branding</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              지역의 정체성을 담아내면서도 시장에서 설득력 있는 브랜드 스토리텔링 및 시각화.
            </p>
          </div>
          
          <div className="group border-b border-zinc-200/50 pb-8">
            <div className="text-xs text-amber-700 font-medium mb-3">03</div>
            <h3 className="text-lg font-semibold mb-3">IR Strategy</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              투자자의 시각에서 비즈니스의 가치를 명확하게 전달하는 IR 덱 구성 및 피칭 전략.
            </p>
          </div>
          
          <div className="group">
            <div className="text-xs text-amber-700 font-medium mb-3">04</div>
            <h3 className="text-lg font-semibold mb-3">Investment Connection</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              로컬 씬에 이해도가 높은 적합한 투자자(AC, VC) 발굴 및 실질적인 네트워킹 연계.
            </p>
          </div>
        </div>
      </section>

      {/* About CEO */}
      <section className="px-6 py-20 bg-zinc-900 text-zinc-100">
        <div className="mb-10 text-zinc-500 text-xs tracking-widest uppercase">Director</div>
        
        <h2 className="font-playfair text-3xl mb-2">{resumeIdentity.name}</h2>
        <p className="text-sm text-zinc-400 mb-8 font-light">{resumeRoleDetails.seedGlow.title} / {resumeRoleDetails.seedGlow.period}</p>
        
        <div className="space-y-6 text-sm text-zinc-300 font-light leading-relaxed">
          <p>
            {resumeRoleDetails.seedGlow.responsibilities.join(" ")}
          </p>
          <p>
            {resumeRoleDetails.mysc.title} / {resumeRoleDetails.mysc.period}
          </p>
          <p>40여 회 이상의 심사 및 강연</p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 text-center bg-white">
        <h2 className="font-playfair text-3xl italic mb-6 text-zinc-900">Ready to scale?</h2>
        <p className="text-sm text-zinc-500 mb-10 font-light">
          시드글로우와 함께 지역의 한계를 넘어<br />새로운 가능성을 만들어가세요.
        </p>
        
        <button className="inline-flex items-center gap-3 border-b border-zinc-900 pb-2 text-sm font-medium hover:text-amber-700 hover:border-amber-700 transition-colors group">
          프로젝트 문의하기
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>
      
      {/* Footer */}
      <footer className="px-6 py-8 border-t border-zinc-200/50 bg-[#FAFAF8]">
        <div className="flex justify-between items-center text-xs text-zinc-400">
          <div>© {new Date().getFullYear()} SeedGlow.</div>
          <div className="tracking-widest">SEOUL, KR</div>
        </div>
      </footer>
    </div>
  );
}
