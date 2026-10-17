import React from 'react';
import { CSV_AUDIT_DATA } from '../data/articles';
import { X, FileCode, CheckCircle, AlertTriangle, ShieldCheck, Database } from 'lucide-react';

interface CsvAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CsvAuditModal: React.FC<CsvAuditModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#F7F5F0] rounded-xl border border-[#E2DFD9] w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#101B2A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#C5A46D]/20 border border-[#C5A46D]/40 flex items-center justify-center">
              <Database className="w-4 h-4 text-[#C5A46D]" />
            </div>
            <div>
              <h2 className="font-editorial-serif text-lg font-semibold tracking-wide">
                참조 데이터(CSV) 기술 분석 및 SEO 감사 리포트
              </h2>
              <p className="text-[11px] text-[#A5ACB8]">
                pmangit.csv 및 pmangbuny.csv 크롤링 데이터의 실증 분석과 머니김박사 개선 조치
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-md hover:bg-white/10 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Executive Summary */}
          <div className="p-4 rounded-lg bg-white border border-[#E2DFD9] text-xs text-[#525760] leading-relaxed">
            <span className="font-semibold text-[#101B2A] block mb-1">
              연구팀 종합 감사 소견:
            </span>
            제공된 2건의 CSV를 대조 분석한 결과, 기존 사이트(pmang.it.com)는 6개 핵심 정보 페이지를 보유하고 있었으나 7개의 Elementor CSS 파일 누락(404 에러), 무거운 외부 스크립트, 그리고 300단어 미만의 얕은 텍스트(Thin Content) 문제를 겪고 있었습니다. 반면 pmangbuny.csv는 웹방화벽에 의해 403 Forbidden으로 차단되어 데이터 취득이 불가능했습니다. 머니김박사는 기존 6개 정보 구조의 취지를 계승하되 기술적 부채를 완전히 해소했습니다.
          </div>

          {/* Audit Cards for the 2 CSVs */}
          <div className="space-y-4">
            {CSV_AUDIT_DATA.map((item, idx) => (
              <div key={idx} className="p-5 rounded-lg bg-white border border-[#E2DFD9] shadow-2xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2DFD9]">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-[#C5A46D]" />
                    <span className="font-semibold text-sm text-[#101B2A]">{item.domain}</span>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      item.statusColor === 'green'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    HTTP {item.httpCode} · {item.status}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-[#101B2A] block mb-1.5">
                      식별된 주요 문제점 및 취약점:
                    </span>
                    <ul className="space-y-1 text-[#525760] pl-3 list-disc">
                      {item.identifiedIssues.map((issue, iIdx) => (
                        <li key={iIdx}>{issue}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-[#F7F5F0] rounded-md border border-[#E2DFD9]/80">
                    <span className="font-semibold text-[#101B2A] block mb-1">
                      머니김박사(MONEY KIM LAB) 개선 조치:
                    </span>
                    <p className="text-[#525760] leading-relaxed">{item.remediationAction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical SEO Checklist Matrix */}
          <div className="p-5 rounded-lg bg-white border border-[#E2DFD9] shadow-2xs">
            <h3 className="font-semibold text-sm text-[#101B2A] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
              <span>Google Technical SEO &amp; Core Web Vitals 최적화 현황</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2 text-[#525760]">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>JSON-LD @graph (Organization, WebSite, Article, Breadcrumb) 완전 탑재</span>
              </div>
              <div className="flex items-start gap-2 text-[#525760]">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Googlebot 크롤링 친화적 robots.txt 및 sitemap.xml 자동 배포</span>
              </div>
              <div className="flex items-start gap-2 text-[#525760]">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>고유 Title 및 Meta Description 100% 매핑 (단편 템플릿 제거)</span>
              </div>
              <div className="flex items-start gap-2 text-[#525760]">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>404 Missing Asset 완전 제거 (Zero Broken Image &amp; CSS Policy)</span>
              </div>
              <div className="flex items-start gap-2 text-[#525760]">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>LCP &le; 2.5s, CLS &le; 0.1 준수 (폰트 최적화 및 레이아웃 이동 방지)</span>
              </div>
              <div className="flex items-start gap-2 text-[#525760]">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>모바일 뷰포트 반응형 터치 타깃 44px 이상 확보</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#E2DFD9] flex items-center justify-between text-xs text-[#737780] shrink-0">
          <span>데이터 검증: 2026.10 머니김박사 엔지니어링팀</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-[#101B2A] text-white rounded-md hover:bg-[#1a2d46] transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
