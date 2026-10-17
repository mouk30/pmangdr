import React, { useState } from 'react';
import { Phone, PhoneCall, MessageCircle, X, Check, Copy, ExternalLink, ShieldCheck, Clock } from 'lucide-react';

interface FloatingContactButtonsProps {
  kakaoId?: string;
  phoneNumber?: string;
}

export const FloatingContactButtons: React.FC<FloatingContactButtonsProps> = ({
  kakaoId = 'MONEYKIM_LAB',
  phoneNumber = '010-2938-4821'
}) => {
  const [activeModal, setActiveModal] = useState<'kakao' | 'phone' | null>(null);
  const [copiedType, setCopiedType] = useState<'kakao' | 'phone' | null>(null);

  const handleCopy = (text: string, type: 'kakao' | 'phone') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  const handlePhoneClick = () => {
    // If on a mobile device, tel: protocol works directly
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = `tel:${phoneNumber.replace(/[^0-9]/g, '')}`;
    } else {
      setActiveModal('phone');
    }
  };

  return (
    <>
      {/* Floating Buttons in Bottom Right */}
      <aside
        aria-label="빠른 문의 플로팅 메뉴"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none"
      >
        {/* 1. 카카오톡 플로팅 버튼 */}
        <div className="group relative flex items-center">
          {/* Label Tooltip */}
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-[#101B2A] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 hidden sm:inline-block border border-white/10">
            카카오톡 1:1 상담
          </span>
          <button
            onClick={() => setActiveModal('kakao')}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE500] text-[#191919] shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl active:scale-95 focus-visible:outline-2 focus-visible:outline-[#C5A46D] border border-amber-300"
            aria-label="카카오톡 상담 문의 열기"
          >
            {/* Authentic KakaoTalk Speech Bubble SVG */}
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 3C6.477 3 2 6.477 2 10.765C2 13.447 3.738 15.801 6.402 17.113L5.348 21.054C5.234 21.48 5.717 21.821 6.079 21.564L10.742 18.258C11.155 18.307 11.573 18.332 12 18.332C17.523 18.332 22 14.855 22 10.765C22 6.477 17.523 3 12 3Z" />
            </svg>
          </button>
        </div>

        {/* 2. 전화기 플로팅 버튼 */}
        <div className="group relative flex items-center">
          {/* Label Tooltip */}
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-[#101B2A] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 hidden sm:inline-block border border-white/10">
            실시간 전화 상담 ({phoneNumber})
          </span>
          <button
            onClick={handlePhoneClick}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#101B2A] text-[#C5A46D] shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:bg-[#16273d] active:scale-95 focus-visible:outline-2 focus-visible:outline-[#C5A46D] border border-[#C5A46D]/60"
            aria-label="전화 상담 문의 열기"
          >
            <PhoneCall className="h-6 w-6 text-[#C5A46D]" />
          </button>
        </div>
      </aside>

      {/* =========================================================================
          KAKAO TALK CONSULTATION MODAL
          ========================================================================= */}
      {activeModal === 'kakao' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#F7F5F0] rounded-xl border border-[#E2DFD9] w-full max-w-md flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 bg-[#FEE500] text-[#191919] flex items-center justify-between shrink-0 border-b border-amber-300">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#191919] text-[#FEE500] flex items-center justify-center">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 3C6.477 3 2 6.477 2 10.765C2 13.447 3.738 15.801 6.402 17.113L5.348 21.054C5.234 21.48 5.717 21.821 6.079 21.564L10.742 18.258C11.155 18.307 11.573 18.332 12 18.332C17.523 18.332 22 14.855 22 10.765C22 6.477 17.523 3 12 3Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#191919]">
                    카카오톡 1:1 상담 안내
                  </h3>
                  <p className="text-[11px] text-[#333333]">
                    피망머니상 | 머니김박사 공식 상담 채널
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-[#191919]/70 hover:text-[#191919] rounded-md hover:bg-black/5"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 rounded-lg bg-white border border-[#E2DFD9] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#737780] font-medium">공식 카카오 채널 ID</span>
                  <span className="text-sm font-bold text-[#101B2A] font-mono">{kakaoId}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(kakaoId, 'kakao')}
                    className="flex-1 py-2 px-3 rounded-md bg-[#101B2A] text-white font-medium hover:bg-[#1a2d46] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    {copiedType === 'kakao' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>아이디 복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>카카오톡 ID 복사</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://pf.kakao.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-md bg-[#FEE500] text-[#191919] font-bold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-1.5 shadow-2xs border border-amber-300"
                  >
                    <span>카톡 바로연결</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Consultation Info */}
              <div className="p-3.5 bg-white/70 rounded-md border border-[#E2DFD9] space-y-2 text-[#525760]">
                <div className="flex items-center gap-2 font-medium text-[#101B2A]">
                  <Clock className="w-3.5 h-3.5 text-[#C5A46D]" />
                  <span>실시간 문의 응대: 365일 24시간 상시 지원</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    사칭 사기 방지를 위해 상단에 표기된 정식 ID(<strong>{kakaoId}</strong>) 외 다른 사설 채널의 송금 요구에 일체 응하지 마십시오.
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#737780] leading-relaxed text-center">
                * 카카오톡 검색창에서 ID 검색 시 돋보기 아이콘을 누르고 정확히 입력하세요.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-white border-t border-[#E2DFD9] flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-[#101B2A] text-white rounded-md hover:bg-[#1a2d46]"
              >
                확인 완료
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHONE CALL CONSULTATION MODAL
          ========================================================================= */}
      {activeModal === 'phone' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#F7F5F0] rounded-xl border border-[#E2DFD9] w-full max-w-md flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 bg-[#101B2A] text-white flex items-center justify-between shrink-0 border-b border-[#273448]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C5A46D]/20 text-[#C5A46D] border border-[#C5A46D]/40 flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F7F5F0]">
                    전화 상담 문의 안내
                  </h3>
                  <p className="text-[11px] text-[#A5ACB8]">
                    머니김박사 전문 정보 리서치 데스크
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-white/70 hover:text-white rounded-md hover:bg-white/10"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="p-5 rounded-lg bg-white border border-[#E2DFD9] shadow-2xs text-center space-y-3">
                <span className="text-xs text-[#737780] font-medium block">
                  실시간 직통 전화번호
                </span>
                <div className="text-2xl font-bold font-editorial-serif text-[#101B2A] tracking-wider tabular-nums">
                  {phoneNumber}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleCopy(phoneNumber, 'phone')}
                    className="flex-1 py-2 px-3 rounded-md bg-[#F7F5F0] border border-[#E2DFD9] text-[#101B2A] font-semibold hover:bg-white transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    {copiedType === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>번호 복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C5A46D]" />
                        <span>전화번호 복사</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`}
                    className="flex-1 py-2 px-3 rounded-md bg-[#101B2A] text-white font-semibold hover:bg-[#1a2d46] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>지금 통화 연결</span>
                  </a>
                </div>
              </div>

              {/* Consultation Details */}
              <div className="p-3.5 bg-white/70 rounded-md border border-[#E2DFD9] space-y-2 text-[#525760]">
                <div className="flex items-center gap-2 font-medium text-[#101B2A]">
                  <Clock className="w-3.5 h-3.5 text-[#C5A46D]" />
                  <span>상담 시간: 연중무휴 24시간 실시간 전화 연결</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    통화 중 어떠한 경우에도 피망 계정의 로그인 비밀번호나 본인확인 인증번호를 묻지 않습니다.
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-white border-t border-[#E2DFD9] flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-[#101B2A] text-white rounded-md hover:bg-[#1a2d46]"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
