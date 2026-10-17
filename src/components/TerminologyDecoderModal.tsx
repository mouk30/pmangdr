import React, { useState } from 'react';
import { TERMINOLOGY_ITEMS } from '../data/articles';
import { X, BookOpen, AlertCircle, Info, Sparkles } from 'lucide-react';

interface TerminologyDecoderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminologyDecoderModal: React.FC<TerminologyDecoderModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: '전체 보기' },
    { id: 'unit', label: '화폐 및 단위' },
    { id: 'market', label: '시장 및 수수료' },
    { id: 'policy', label: '게임 정책 및 FDS' },
    { id: 'risk', label: '사기 및 리스크' }
  ];

  const filteredItems = TERMINOLOGY_ITEMS.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.practicalContext.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#F7F5F0] rounded-xl border border-[#E2DFD9] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#101B2A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#C5A46D]/20 border border-[#C5A46D]/40 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#C5A46D]" />
            </div>
            <div>
              <h2 className="font-editorial-serif text-lg font-semibold tracking-wide">
                피망 재화 및 머니상 용어 해석기
              </h2>
              <p className="text-[11px] text-[#A5ACB8]">
                혼동하기 쉬운 게임머니 단위와 시장 용어를 약관 기준으로 해설합니다
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

        {/* Search & Filter Toolbar */}
        <div className="p-4 bg-white border-b border-[#E2DFD9] flex flex-col sm:flex-row gap-3 shrink-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="용어 또는 키워드 검색 (예: 딜러비, 칩, FDS...)"
            className="flex-1 px-3.5 py-2 text-xs bg-[#F7F5F0] border border-[#E2DFD9] rounded-md focus:outline-none focus:border-[#101B2A]"
          />
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-[#101B2A] text-white'
                    : 'bg-[#F7F5F0] text-[#737780] hover:text-[#101B2A]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#737780]">
              일치하는 용어가 없습니다. 다른 검색어를 입력해주세요.
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-white border border-[#E2DFD9] shadow-2xs hover:border-[#101B2A]/30 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-[#101B2A]">{item.term}</span>
                    {item.english && (
                      <span className="text-[11px] font-mono text-[#737780]">({item.english})</span>
                    )}
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#101B2A]/5 text-[#737780]">
                    {item.category === 'unit' && '단위/재화'}
                    {item.category === 'market' && '시장 구조'}
                    {item.category === 'policy' && '운영 정책'}
                    {item.category === 'risk' && '위험 경고'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#292D32] leading-relaxed mb-3">
                  {item.definition}
                </p>

                <div className="p-3 bg-[#F7F5F0] rounded-md text-xs space-y-1.5 border border-[#E2DFD9]/60">
                  <div className="text-[#525760]">
                    <strong className="text-[#101B2A]">실제 시장 맥락:</strong> {item.practicalContext}
                  </div>
                  <div className="text-rose-900 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>주의사항:</strong> {item.cautionNotice}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#E2DFD9] flex items-center justify-between text-xs text-[#737780] shrink-0">
          <span>머니김박사 표준 리서치 사전 편찬 기준</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-[#101B2A] text-white rounded-md hover:bg-[#1a2d46] transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
