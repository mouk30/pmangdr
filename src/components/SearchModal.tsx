import React, { useState, useEffect, useRef } from 'react';
import { ARTICLES, TERMINOLOGY_ITEMS } from '../data/articles';
import { Search, X, ArrowRight, BookOpen, FileText, ChevronRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onOpenDecoder: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenDecoder
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const articleResults = Object.values(ARTICLES).filter((art) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.metaDescription.toLowerCase().includes(q) ||
      art.directAnswer.toLowerCase().includes(q) ||
      art.sections.some((s) => s.heading.toLowerCase().includes(q) || s.paragraphs.some(p => p.toLowerCase().includes(q)))
    );
  });

  const termResults = TERMINOLOGY_ITEMS.filter((t) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
  });

  const handleSelectArticle = (slug: string) => {
    onNavigate(`/${slug}/`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#F7F5F0] rounded-xl border border-[#E2DFD9] w-full max-w-xl flex flex-col shadow-2xl overflow-hidden max-h-[80vh]">
        {/* Search Bar Input */}
        <div className="p-4 bg-white border-b border-[#E2DFD9] flex items-center gap-3 shrink-0">
          <Search className="w-4 h-4 text-[#C5A46D] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="가이드 주제, 용어, 주의사항 검색..."
            className="flex-1 text-sm bg-transparent border-none focus:outline-none text-[#101B2A] placeholder:text-[#737780]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#737780] hover:text-[#101B2A] px-1"
            >
              지우기
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#737780] hover:text-[#101B2A] rounded-md hover:bg-black/5"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-5 overflow-y-auto space-y-5">
          {!query.trim() ? (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#737780]">
                추천 검색 주제
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  '1조 가격 구조',
                  '딜러비 15% 수수료',
                  '5단계 판단 기준',
                  'FDS 이상거래 탐지',
                  '계정 정지 실제 사례',
                  '피망 칩과 머니 차이'
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3 py-1.5 text-xs bg-white border border-[#E2DFD9] rounded-md text-[#525760] hover:border-[#101B2A] hover:text-[#101B2A] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : articleResults.length === 0 && termResults.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#737780]">
              "{query}"에 대한 검색 결과가 없습니다. 다른 검색어를 입력해보세요.
            </div>
          ) : (
            <>
              {/* Article Matches */}
              {articleResults.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#737780] mb-2.5">
                    리서치 가이드 ({articleResults.length})
                  </div>
                  <div className="space-y-2">
                    {articleResults.map((art) => (
                      <button
                        key={art.slug}
                        onClick={() => handleSelectArticle(art.slug)}
                        className="w-full text-left p-3.5 rounded-lg bg-white border border-[#E2DFD9] hover:border-[#101B2A]/40 transition-all group flex items-center justify-between"
                      >
                        <div>
                          <div className="text-[11px] font-semibold text-[#C5A46D] mb-0.5">
                            {art.category}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-[#101B2A] group-hover:text-[#C5A46D] transition-colors line-clamp-1">
                            {art.title}
                          </div>
                          <div className="text-[11px] text-[#737780] line-clamp-1 mt-0.5">
                            {art.metaDescription}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#737780] group-hover:text-[#101B2A] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Terminology Matches */}
              {termResults.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#737780] mb-2.5">
                    용어 사전 ({termResults.length})
                  </div>
                  <div className="space-y-2">
                    {termResults.map((term, tIdx) => (
                      <div
                        key={tIdx}
                        className="p-3.5 rounded-lg bg-white border border-[#E2DFD9]"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-[#101B2A] mb-1">
                          <span>{term.term}</span>
                          <button
                            onClick={() => {
                              onClose();
                              onOpenDecoder();
                            }}
                            className="text-[11px] text-[#C5A46D] hover:underline"
                          >
                            사전 상세 →
                          </button>
                        </div>
                        <p className="text-[11px] text-[#525760] leading-relaxed">
                          {term.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[#F7F5F0] border-t border-[#E2DFD9] flex items-center justify-between text-[11px] text-[#737780] shrink-0">
          <span>ESC 키로 닫기</span>
          <button
            onClick={onClose}
            className="text-[#101B2A] hover:underline font-medium"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
