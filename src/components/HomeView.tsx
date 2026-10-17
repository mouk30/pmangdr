import React from 'react';
import { ARTICLES } from '../data/articles';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Compass,
  FileCheck2,
  ChevronRight,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (path: string) => void;
  onOpenDecoder: () => void;
  onOpenChecklist: () => void;
  onOpenAudit: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenDecoder,
  onOpenChecklist,
  onOpenAudit
}) => {
  return (
    <div className="flex flex-col">
      {/* =========================================================================
          HERO SECTION — THE PREMIUM INFORMATION JOURNAL
          ========================================================================= */}
      <section className="relative bg-[#101B2A] text-white overflow-hidden py-16 lg:py-24 border-b border-[#273448]">
        {/* Subtle architectural background texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A46D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="editorial-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
            {/* Left Column: Hero Editorial Typography (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Small English Kicker */}
                <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#C5A46D] font-semibold mb-6">
                  <span className="w-6 h-[1.5px] bg-[#C5A46D]" />
                  <span>MONEY KIM RESEARCH JOURNAL</span>
                </div>

                {/* Main Hero Headline */}
                <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#F7F5F0] leading-[1.18] mb-6">
                  피망머니상,
                  <br />
                  <span className="font-kr-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#E2DFD9]">
                    복잡한 정보일수록 명확하게
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-[#A5ACB8] leading-relaxed max-w-xl mb-8">
                  피망 게임머니 관련 용어와 가격 구조, 정보가 달라 보이는 이유와 객관적인 확인 기준까지.
                  <span className="text-white font-medium"> 머니김박사(MONEY KIM LAB)</span>가 데이터와 약관을 바탕으로 투명하게 정리합니다.
                </p>

                {/* Direct Answer & GEO Callout Box */}
                <div className="p-4 sm:p-5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs max-w-xl mb-8">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A46D] mb-2 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>RESEARCH SUMMARY · 핵심 요약</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F7F5F0]/90 leading-relaxed">
                    피망머니상은 공인된 금융 거래소가 아니며, 플랫폼(PC/모바일) 차이와 게임 내 시스템 딜러비(10~20%)로 인해 호가가 크게 벌어집니다. 맹목적인 가격 비교보다 출처와 약관 위험성을 먼저 검증하는 5단계 기준이 필수적입니다.
                  </p>
                </div>
              </div>

              {/* Action Buttons & Fast Verification Toolbar */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/how-it-forms/')}
                  className="px-6 py-3.5 text-sm font-semibold text-[#101B2A] bg-[#F7F5F0] hover:bg-white rounded-md transition-all shadow-sm flex items-center gap-2"
                >
                  <span>정보 가이드 살펴보기</span>
                  <ArrowRight className="w-4 h-4 text-[#101B2A]" />
                </button>

                <button
                  onClick={onOpenChecklist}
                  className="px-5 py-3.5 text-sm font-medium text-[#F7F5F0] bg-white/10 hover:bg-white/15 border border-white/20 rounded-md transition-all flex items-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4 text-[#C5A46D]" />
                  <span>5단계 안전 자가진단</span>
                </button>

                <button
                  onClick={onOpenDecoder}
                  className="px-4 py-3.5 text-xs text-[#A5ACB8] hover:text-white transition-colors"
                >
                  용어 사전 열기 →
                </button>
              </div>
            </div>

            {/* Right Column: Editorial Hero Visual & Metadata Strip (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="relative rounded-lg overflow-hidden border border-white/15 shadow-2xl bg-[#0A121D]">
                <img
                  src="/src/assets/images/hero_editorial_journal_1792239833694.jpg"
                  alt="머니김박사 에디토리얼 리서치 데스크"
                  className="w-full h-72 sm:h-84 object-cover brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101B2A] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90">
                  <div className="text-[11px] font-mono tracking-widest text-[#C5A46D] uppercase mb-0.5">
                    ISSUE NO. 2026-Q4
                  </div>
                  <div className="font-editorial-serif text-sm font-medium">
                    The Architecture of Virtual Game Currencies &amp; User Protection
                  </div>
                </div>
              </div>

              {/* Research Methodology Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10 text-center">
                <div className="p-3 rounded-sm bg-white/5">
                  <div className="text-xl sm:text-2xl font-editorial-serif font-bold text-[#C5A46D] tabular-nums">
                    5단계
                  </div>
                  <div className="text-[11px] text-[#A5ACB8] mt-1">정보 판단 프레임</div>
                </div>
                <div className="p-3 rounded-sm bg-white/5">
                  <div className="text-xl sm:text-2xl font-editorial-serif font-bold text-[#C5A46D] tabular-nums">
                    10~20%
                  </div>
                  <div className="text-[11px] text-[#A5ACB8] mt-1">게임 내 시스템 딜러비</div>
                </div>
                <div className="p-3 rounded-sm bg-white/5">
                  <div className="text-xl sm:text-2xl font-editorial-serif font-bold text-[#C5A46D] tabular-nums">
                    100%
                  </div>
                  <div className="text-[11px] text-[#A5ACB8] mt-1">약관 및 법령 준수</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 01 — INSIGHT: 피망머니상, 무엇부터 이해해야 할까?
          1 large featured card + 2 secondary cards (Asymmetric Layout)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F7F5F0]">
        <div className="editorial-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E2DFD9]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] mb-2 block">
                SECTION 01 — ESSENTIAL INSIGHTS
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#101B2A] font-semibold">
                피망머니상, 무엇부터 이해해야 할까?
              </h2>
            </div>
            <p className="text-sm text-[#737780] max-w-md mt-3 md:mt-0">
              수많은 블로그와 커뮤니티의 흩어진 조각들을 3가지 기본 관점으로 정리하여 혼란을 최소화합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Primary Large Featured Card (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-lg border border-[#E2DFD9] p-8 sm:p-10 flex flex-col justify-between shadow-2xs hover:border-[#101B2A]/30 transition-all">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#737780] mb-4">
                  <span>핵심 리서치</span>
                  <span aria-hidden="true">·</span>
                  <span>발행 2026.04.20</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#C5A46D]">6분 정독</span>
                </div>

                <h3 className="font-editorial-serif text-2xl sm:text-3xl font-semibold text-[#101B2A] mb-4 leading-tight">
                  피망 머니상 구조는 어떻게 만들어질까
                </h3>

                <p className="text-[15px] sm:text-base text-[#525760] leading-relaxed mb-6">
                  포털에서 검색되는 "피망머니상"은 단순한 거래 창구가 아닙니다. 웹보드게임 결제 한도 규제와 이용자의 추가 플레이 욕구, 그리고 제3자 마케팅이 결합하여 생긴 비공식 정보 네트워크입니다. 이 구조적 원인을 알지 못하면 비현실적인 광고에 노출되기 쉽습니다.
                </p>

                <div className="p-4 bg-[#F7F5F0] rounded-md border border-[#E2DFD9] text-xs text-[#525760] space-y-1.5">
                  <div className="font-semibold text-[#101B2A]">리서치 핵심 포인트:</div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>PC 웹과 모바일 앱의 머니/칩 체계는 완전히 별개로 운용됨</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>네오위즈는 이용약관을 통해 모든 비인가 거래에 영구 정지 적용</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[#E2DFD9] flex items-center justify-between">
                <span className="text-xs text-[#737780]">주제 01: 구조 형성 배경</span>
                <button
                  onClick={() => onNavigate('/how-it-forms/')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#101B2A] hover:text-[#C5A46D] transition-colors"
                >
                  <span>가이드 전문 읽기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2 Secondary Stacked Cards (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Secondary Card 1: Price Divergence */}
              <div className="bg-white rounded-lg border border-[#E2DFD9] p-6 sm:p-7 shadow-2xs hover:border-[#101B2A]/30 transition-all flex flex-col justify-between flex-1">
                <div>
                  <div className="text-xs font-medium text-[#737780] mb-2">
                    가격 구조 분석 · 7분 읽기
                  </div>
                  <h4 className="font-editorial-serif text-xl font-semibold text-[#101B2A] mb-2.5">
                    가격 정보가 달라 보이는 이유
                  </h4>
                  <p className="text-xs sm:text-sm text-[#525760] leading-relaxed">
                    실시간 공인 시세가 아닌 일방적 호가(Ask Price) 구조 때문입니다. 거래 단위와 게임 내 판돈 수수료(10~20%) 부담 주체에 따라 실제 체감 금액이 판이하게 달라집니다.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E2DFD9] flex justify-end">
                  <button
                    onClick={() => onNavigate('/price-pattern/')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#101B2A] hover:text-[#C5A46D]"
                  >
                    <span>원인 심층 분석</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Secondary Card 2: Decision Frame */}
              <div className="bg-white rounded-lg border border-[#E2DFD9] p-6 sm:p-7 shadow-2xs hover:border-[#101B2A]/30 transition-all flex flex-col justify-between flex-1">
                <div>
                  <div className="text-xs font-medium text-[#737780] mb-2">
                    정보 판단 프레임 · 8분 읽기
                  </div>
                  <h4 className="font-editorial-serif text-xl font-semibold text-[#101B2A] mb-2.5">
                    정보를 해석할 때 필요한 기준
                  </h4>
                  <p className="text-xs sm:text-sm text-[#525760] leading-relaxed">
                    조건의 유리함에 현혹되지 않고 [출처 검증 → 시점 확인 → 딜러비 공제 여부 → 약관 위험] 순서로 판단하는 5단계 논리적 필터링을 제안합니다.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E2DFD9] flex justify-end">
                  <button
                    onClick={() => onNavigate('/decision-frame/')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#101B2A] hover:text-[#C5A46D]"
                  >
                    <span>5단계 프레임 보기</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02 — PRICE STRUCTURE: 가격보다 먼저 알아야 할 구조
          Reinforcing /price-pattern/ with comparison & interactive elements
          ========================================================================= */}
      <section className="py-20 bg-white border-y border-[#E2DFD9]">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual on the Left (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-[#E2DFD9] shadow-md bg-[#F7F5F0]">
                <img
                  src="/src/assets/images/price_structure_analysis_1792239834234.jpg"
                  alt="가격 구조 분석 에디토리얼 이미지"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="p-4 bg-white border-t border-[#E2DFD9] text-xs text-[#737780]">
                  <strong className="text-[#101B2A]">Fig 2.2</strong> — 피망 게임 내 판돈 시스템(딜러비 10~20%)의 가상재화 소멸 메커니즘
                </div>
              </div>
            </div>

            {/* Editorial Content on the Right (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] mb-2 block">
                SECTION 02 — PRICING ARCHITECTURE
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#101B2A] font-semibold mb-6">
                가격보다 먼저 알아야 할 구조
              </h2>
              <p className="text-base text-[#525760] leading-relaxed mb-6">
                피망 머니상 관련 게시글에서 가장 흔히 볼 수 있는 "1조당 OO만"과 같은 표현은 공인된 거래소의 단일 체결가가 아닙니다. 조건, 수량 단위, 수수료, 출처에 따라 서로 다른 숫자가 제시되는 이유를 규명합니다.
              </p>

              {/* 3 Pillars of Price Divergence */}
              <div className="space-y-4 mb-8">
                <div className="flex gap-4 p-4 rounded-md bg-[#F7F5F0] border border-[#E2DFD9]">
                  <div className="w-8 h-8 rounded-full bg-[#101B2A] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#101B2A] mb-1">
                      게임 내 시스템 딜러 수수료 (10~20%)
                    </h4>
                    <p className="text-xs text-[#525760] leading-relaxed">
                      게임 내 테이블에서 고의 패작으로 머니를 넘기는 과정에서 게임 서버가 판당 10~20%를 자동 소멸시킵니다. 이 수수료의 부담자가 누구냐에 따라 실제 수령액이 크게 차이 납니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-md bg-[#F7F5F0] border border-[#E2DFD9]">
                  <div className="w-8 h-8 rounded-full bg-[#101B2A] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#101B2A] mb-1">
                      PC 플랫폼과 모바일 플랫폼의 유동성 격차
                    </h4>
                    <p className="text-xs text-[#525760] leading-relaxed">
                      PC 피망포커와 모바일 피망포커는 데이터베이스와 머니 체계가 독립되어 있습니다. 동일한 1조라도 공급량과 수요층이 다르므로 일대일 단순 비교가 불가능합니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-md bg-[#F7F5F0] border border-[#E2DFD9]">
                  <div className="w-8 h-8 rounded-full bg-[#101B2A] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#101B2A] mb-1">
                      크롤링된 과거 데이터의 시차 오류
                    </h4>
                    <p className="text-xs text-[#525760] leading-relaxed">
                      검색 상단에 노출되는 글 중 상당수는 수개월 전 작성된 후 방치된 글입니다. 과거의 시세는 현재 게임 내 이벤트나 결제 한도 갱신 시점과 무관합니다.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('/price-pattern/')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#101B2A] text-white text-xs font-semibold rounded-md hover:bg-[#1a2d46] transition-colors"
                >
                  <span>가격 분석 리포트 전체 보기</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03 — DECISION FRAMEWORK & INTERACTIVE CHECKLIST PREVIEW
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F7F5F0]">
        <div className="editorial-container">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] mb-2 block">
              SECTION 03 — THE 5-STAGE FRAMEWORK
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#101B2A] font-semibold mb-4">
              정보를 읽는 5단계 판단 기준
            </h2>
            <p className="text-sm sm:text-base text-[#525760] leading-relaxed">
              사기 피해와 계정 정지를 예방하기 위한 머니김박사의 체계적인 필터링 프레임워크입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {[
              { step: '01', title: '출처 독립성', desc: '외부 유인 메신저 강요 여부 및 정보의 중립성 확인' },
              { step: '02', title: '최신성 검증', desc: '최근 30일 이내 데이터 여부 및 과거 날짜 필터링' },
              { step: '03', title: '조건 투명성', desc: '10~20% 딜러비 및 최소 단위 명확 표기 여부' },
              { step: '04', title: '시스템 위험도', desc: '네오위즈 FDS(이상거래탐지) 적발 위험 인지' },
              { step: '05', title: '보안 절대수칙', desc: '비밀번호·인증번호 요구 시 즉시 차단 및 신고' }
            ].map((f) => (
              <div
                key={f.step}
                className="bg-white p-5 rounded-lg border border-[#E2DFD9] shadow-2xs hover:border-[#C5A46D] transition-colors"
              >
                <div className="text-2xl font-editorial-serif font-bold text-[#C5A46D] mb-2">
                  {f.step}
                </div>
                <div className="text-sm font-semibold text-[#101B2A] mb-1.5">{f.title}</div>
                <p className="text-xs text-[#737780] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#101B2A] rounded-lg text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-sm font-semibold text-[#F7F5F0]">
                마주한 정보의 안전성이 불안하신가요?
              </div>
              <div className="text-xs text-[#A5ACB8] mt-1">
                머니김박사의 5단계 대화형 자가진단 툴로 즉시 안전 점수를 평가해보세요.
              </div>
            </div>
            <button
              onClick={onOpenChecklist}
              className="px-5 py-2.5 text-xs font-semibold bg-[#C5A46D] text-[#101B2A] hover:bg-[#d6b77e] transition-colors rounded-md shrink-0 shadow-xs"
            >
              자가진단 시뮬레이터 시작
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04 & 05 — REAL CASES & BEFORE YOU CHECK
          Two-column Grid
          ========================================================================= */}
      <section className="py-20 bg-white border-b border-[#E2DFD9]">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Real Case Studies Column */}
            <div className="flex flex-col justify-between p-8 rounded-lg bg-[#F7F5F0] border border-[#E2DFD9]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] mb-2 block">
                  SECTION 04 — CASE STUDIES
                </span>
                <h3 className="font-editorial-serif text-2xl font-semibold text-[#101B2A] mb-4">
                  사례로 이해하는 피망머니상 오해와 분쟁
                </h3>
                <p className="text-sm text-[#525760] leading-relaxed mb-6">
                  가장 빈번하게 일어나는 3가지 피해와 분쟁 사례를 객관적으로 분석했습니다.
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-md border border-[#E2DFD9]">
                    <div className="text-xs font-semibold text-[#101B2A] mb-1">
                      사례 A. 명목 단위 오인으로 인한 손실
                    </div>
                    <div className="text-xs text-[#737780]">
                      PC와 모바일의 단위 표기를 혼동하여 약정 대비 10분의 1 재화만 이전된 사건
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-md border border-[#E2DFD9]">
                    <div className="text-xs font-semibold text-[#101B2A] mb-1">
                      사례 B. 딜러비(15%) 차감으로 인한 분쟁
                    </div>
                    <div className="text-xs text-[#737780]">
                      게임 내 이전 과정에서 시스템이 차감하는 수수료 부담 주체를 명시하지 않아 발생
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-md border border-[#E2DFD9]">
                    <div className="text-xs font-semibold text-[#101B2A] mb-1">
                      사례 C. 작업장 연루 계정의 영구 이용 정지
                    </div>
                    <div className="text-xs text-[#737780]">
                      거래 3일 후 게임사 이상거래 탐지 알고리즘에 의해 계정이 일괄 영구 제재된 사례
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E2DFD9]">
                <button
                  onClick={() => onNavigate('/real-situations/')}
                  className="text-xs font-semibold text-[#101B2A] hover:text-[#C5A46D] inline-flex items-center gap-1.5"
                >
                  <span>사례 심층 분석 보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Before You Check Column */}
            <div className="flex flex-col justify-between p-8 rounded-lg bg-[#F7F5F0] border border-[#E2DFD9]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] mb-2 block">
                  SECTION 05 — PREREQUISITES
                </span>
                <h3 className="font-editorial-serif text-2xl font-semibold text-[#101B2A] mb-4">
                  확인 전에 반드시 알아둘 사항
                </h3>
                <p className="text-sm text-[#525760] leading-relaxed mb-6">
                  정보를 검색하거나 접하기 전, 계정 안전과 개인정보를 지키는 3대 핵심 수칙입니다.
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-md border border-[#E2DFD9] flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-[#101B2A] mb-1">
                        어떠한 경우에도 비밀번호/인증번호를 주지 마세요
                      </div>
                      <div className="text-xs text-[#737780]">
                        "대리 이전"이나 "인증 필요"를 핑계로 요구하는 모든 행위는 100% 해킹 사기입니다.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-md border border-[#E2DFD9] flex items-start gap-3">
                    <Scale className="w-4 h-4 text-[#101B2A] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-[#101B2A] mb-1">
                        게임산업진흥법 제32조 위반 처벌 규정
                      </div>
                      <div className="text-xs text-[#737780]">
                        게임 결과물의 환전을 업으로 하는 행위는 5년 이하 징역 또는 5천만원 이하 벌금형 대상입니다.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-md border border-[#E2DFD9] flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-[#101B2A] mb-1">
                        사기 발생 시 즉각적인 경찰청 ECRM 신고
                      </div>
                      <div className="text-xs text-[#737780]">
                        입금 내역서 및 대화 캡처를 신속히 확보하여 경찰청 사이버범죄수사대에 신고해야 합니다.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E2DFD9]">
                <button
                  onClick={() => onNavigate('/before-you-check/')}
                  className="text-xs font-semibold text-[#101B2A] hover:text-[#C5A46D] inline-flex items-center gap-1.5"
                >
                  <span>체크리스트 상세 보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 06 & 07 — EDITORIAL JOURNAL & ABOUT
          ========================================================================= */}
      <section className="py-20 bg-[#F7F5F0]">
        <div className="editorial-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E2DFD9]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] mb-1 block">
                SECTION 06 — EDITORIAL JOURNAL
              </span>
              <h2 className="font-editorial-serif text-3xl text-[#101B2A] font-semibold">
                MONEY KIM JOURNAL
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/journal/')}
              className="text-xs font-semibold text-[#101B2A] hover:text-[#C5A46D] mt-2 md:mt-0 inline-flex items-center gap-1"
            >
              <span>전체 리포트 아카이브</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-[#E2DFD9] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-[#737780] mb-2">2026.10 VOL. 14</div>
                <h4 className="font-editorial-serif text-lg font-semibold text-[#101B2A] mb-2">
                  월초 결제한도 초기화와 사기 시도 패턴의 통계적 상관관계
                </h4>
                <p className="text-xs text-[#525760] leading-relaxed">
                  매월 1일 전후 48시간 동안 급증하는 비공식 바이럴 게시글의 특성과 이용자 주의 사항을 수치로 분석합니다.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#E2DFD9] text-xs text-[#C5A46D] font-medium">
                연구 리포트 열람 →
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E2DFD9] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-[#737780] mb-2">2026.08 SPECIAL REPORT</div>
                <h4 className="font-editorial-serif text-lg font-semibold text-[#101B2A] mb-2">
                  웹보드게임 FDS(이상거래탐지시스템)의 알고리즘 원리와 제재 기준
                </h4>
                <p className="text-xs text-[#525760] leading-relaxed">
                  머신러닝 기반 그래프 분석을 통해 비인가 방 이동 거래를 적발하는 게임 보안 기술 구조를 해설합니다.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#E2DFD9] text-xs text-[#C5A46D] font-medium">
                기술 해설서 열람 →
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E2DFD9] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-[#737780] mb-2">2026.06 POLICY ANALYSIS</div>
                <h4 className="font-editorial-serif text-lg font-semibold text-[#101B2A] mb-2">
                  게임산업진흥법 시행령 개정 추이와 이용자 권익 보호 방안
                </h4>
                <p className="text-xs text-[#525760] leading-relaxed">
                  사설 환전업자에 대한 최신 대법원 판례와 불법 재화 유통 차단을 위한 제도적 장치를 조명합니다.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#E2DFD9] text-xs text-[#C5A46D] font-medium">
                법률 분석 열람 →
              </div>
            </div>
          </div>

          {/* Section 07 — About Money Kim Lab */}
          <div className="mt-16 p-8 sm:p-10 rounded-xl bg-white border border-[#E2DFD9] shadow-2xs">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] mb-2 block">
                SECTION 07 — ABOUT MONEY KIM LAB
              </span>
              <h3 className="font-editorial-serif text-2xl sm:text-3xl font-semibold text-[#101B2A] mb-4">
                머니김박사의 취지와 콘텐츠 검수 원칙
              </h3>
              <p className="text-[15px] text-[#525760] leading-relaxed mb-6">
                머니김박사(MONEY KIM LAB)는 인터넷에 만연한 허위 시세 정보와 비인가 거래로 인한 이용자 피해를 방지하기 위해 출범한 순수 리서치 정보 플랫폼입니다.
                우리는 일체의 거래를 중개하거나 대행하지 않으며, 네오위즈 공식 약관 및 관계 법령에 근거한 검증된 지식만을 제공합니다.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#101B2A]">
                <button
                  onClick={() => onNavigate('/about/')}
                  className="px-4 py-2 bg-[#101B2A] text-white rounded-md hover:bg-[#1a2d46] transition-colors"
                >
                  연구소 소개 및 윤리강령 보기
                </button>
                <button
                  onClick={onOpenAudit}
                  className="px-4 py-2 bg-[#F7F5F0] border border-[#E2DFD9] rounded-md hover:border-[#101B2A]/40 transition-colors"
                >
                  CSV 기술 감사 데이터 열람
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
