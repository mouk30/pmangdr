import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenAudit: () => void;
  onOpenDecoder: () => void;
  onOpenChecklist: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAudit,
  onOpenDecoder,
  onOpenChecklist
}) => {
  return (
    <footer className="bg-[#101B2A] text-[#F7F5F0] border-t border-[#273448] pt-16 pb-12 mt-20">
      <div className="editorial-container">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Editorial Mission (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Logo variant="dark" />
            <p className="text-[14px] leading-relaxed text-[#737780] mt-2 max-w-md">
              <strong className="text-white font-medium">피망머니상 | 머니김박사</strong>는 웹보드 게임 재화 시장의 정보 비대칭성을 해소하고, 왜곡된 시세 표현과 불법 사기 위험으로부터 이용자를 보호하기 위해 설립된 독립형 리서치 저널입니다.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C5A46D] mt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>독립 리서치 · 팩트 체크 · 법률 및 약관 준수 원칙</span>
            </div>
          </div>

          {/* Column 2: Core Topic Clusters (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D]">
              주제별 분석 가이드
            </span>
            <ul className="flex flex-col gap-2 text-[14px] text-[#A5ACB8]">
              <li>
                <button
                  onClick={() => onNavigate('/how-it-forms/')}
                  className="hover:text-white transition-colors text-left"
                >
                  01. 구조와 형성 배경
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/price-pattern/')}
                  className="hover:text-white transition-colors text-left"
                >
                  02. 가격 구조 및 시세 변동
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/decision-frame/')}
                  className="hover:text-white transition-colors text-left"
                >
                  03. 정보 판단 5단계 기준
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/real-situations/')}
                  className="hover:text-white transition-colors text-left"
                >
                  04. 빈번한 착오 및 실제 사례
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/before-you-check/')}
                  className="hover:text-white transition-colors text-left"
                >
                  05. 확인 전 사전 체크리스트
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Interactive Tools & Audits (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D]">
              리서치 툴 &amp; 기술 감사
            </span>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={onOpenDecoder}
                className="flex items-center justify-between p-3 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left group"
              >
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-[#C5A46D] transition-colors">
                    피망 재화 용어 해석기 (Decoder)
                  </div>
                  <div className="text-[11px] text-[#737780]">조/억 단위 환산, 딜러비, FDS 개념 풀이</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D]" />
              </button>

              <button
                onClick={onOpenChecklist}
                className="flex items-center justify-between p-3 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left group"
              >
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-[#C5A46D] transition-colors">
                    정보 신뢰도 자가진단 (Checklist)
                  </div>
                  <div className="text-[11px] text-[#737780]">5단계 안전 기준 즉시 진단</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D]" />
              </button>

              <button
                onClick={onOpenAudit}
                className="flex items-center justify-between p-3 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left group"
              >
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-[#C5A46D] transition-colors">
                    CSV 기술 SEO 분석 리포트
                  </div>
                  <div className="text-[11px] text-[#737780]">pmangit.csv vs pmangbuny.csv 감사 내역</div>
                </div>
                <FileText className="w-3.5 h-3.5 text-[#C5A46D]" />
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Compliance Notice (Mandatory per section 01) */}
        <div className="py-8 border-b border-white/10 text-xs text-[#737780] leading-relaxed">
          <div className="flex items-start gap-3">
            <span className="font-semibold text-[#A5ACB8] whitespace-nowrap">법적 고지 및 면책</span>
            <p>
              본 웹사이트의 브랜드명에 '머니상'이 포함되어 있으나, 머니김박사(MONEY KIM LAB)는 특정 거래의 안전성·합법성·수익성을 일체 보증하지 않습니다. 게임산업진흥에 관한 법률 제32조(불법게임물 등의 유통금지 등) 및 게임물관리위원회 규정, 피망(네오위즈) 서비스 이용약관에 의거하여 게임머니의 현금 환전, 알선, 베팅, 계정 매매를 직접 수행하거나 중개하지 않습니다. 본 사이트의 모든 리포트는 공공 정보, 확인 가능한 약관 및 이용자 권익 보호 목적의 연구 자료입니다.
            </p>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737780]">
          <div>
            &copy; {new Date().getFullYear()} MONEY KIM LAB. All rights reserved. Googlebot Technical SEO &amp; Schema.org Graph Verified.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/about/')} className="hover:text-white transition-colors">
              연구소 소개
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('/journal/')} className="hover:text-white transition-colors">
              저널 아카이브
            </button>
            <span aria-hidden="true">·</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Sitemap.xml
            </a>
            <span aria-hidden="true">·</span>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Robots.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
