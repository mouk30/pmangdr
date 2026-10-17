import React, { useState } from 'react';
import { Logo } from './Logo';
import { Search, Menu, X, ArrowUpRight, BookOpen, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenAudit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenAudit
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '구조 배경', path: '/how-it-forms/' },
    { label: '가격 분석', path: '/price-pattern/' },
    { label: '판단 기준', path: '/decision-frame/' },
    { label: '실제 사례', path: '/real-situations/' },
    { label: '확인 전 주의사항', path: '/before-you-check/' },
    { label: '소개', path: '/about/' }
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E2DFD9] transition-all">
      <div className="editorial-container flex items-center justify-between gap-8 h-20">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => handleLinkClick('/')}
          className="text-left focus-visible:outline-2 focus-visible:outline-[#C5A46D] rounded-sm transition-opacity hover:opacity-90 shrink-0"
          aria-label="머니김박사 홈으로 이동"
        >
          <Logo variant="light" />
        </button>

        {/* Zone 2: Primary navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#161A20] shrink-0" aria-label="메인 탐색 메뉴">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#101B2A] ${
                  isActive ? 'text-[#101B2A] font-semibold' : 'text-[#737780]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A46D]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action & utility search */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#737780] bg-white border border-[#E2DFD9] rounded-md hover:text-[#101B2A] hover:border-[#101B2A]/30 transition-all shadow-2xs whitespace-nowrap"
            aria-label="정보 및 용어 검색 열기"
          >
            <Search className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span className="hidden sm:inline">통합 리서치 검색</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#737780] bg-[#F7F5F0] rounded border border-[#E2DFD9]">⌘K</kbd>
          </button>

          <button
            onClick={() => handleLinkClick('/decision-frame/')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#101B2A] hover:bg-[#16273d] transition-colors rounded-md shadow-xs whitespace-nowrap shrink-0"
          >
            <span>5단계 검증</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A46D]" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#101B2A] hover:bg-black/5 rounded-md transition-colors"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2DFD9] bg-[#F7F5F0] px-6 py-6 shadow-lg animate-in fade-in duration-150">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-[#737780] uppercase tracking-wider mb-2">
              주요 정보 가이드 및 분석
            </span>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`flex items-center justify-between text-left py-2.5 px-3 rounded-md text-[15px] font-medium transition-colors ${
                  currentPath === link.path
                    ? 'bg-[#101B2A] text-white'
                    : 'text-[#161A20] hover:bg-black/5'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#C5A46D]">→</span>
              </button>
            ))}

            <div className="pt-4 mt-3 border-t border-[#E2DFD9] flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenAudit();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-left py-2 px-3 text-xs text-[#737780] hover:text-[#101B2A]"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>CSV 데이터 분석 및 SEO 기술 리포트</span>
              </button>
              <div className="p-3 bg-[#101B2A]/5 rounded-md flex items-start gap-2 text-[12px] text-[#737780]">
                <ShieldAlert className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <span>머니김박사는 일체의 게임머니 거래·환전 기능을 제공하지 않으며 법률 및 약관 준수 리서치 정보만을 제공합니다.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
