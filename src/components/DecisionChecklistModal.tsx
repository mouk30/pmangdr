import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, ShieldAlert, RotateCcw } from 'lucide-react';

interface DecisionChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

interface CheckItem {
  id: string;
  stage: string;
  title: string;
  description: string;
  dangerFlag: boolean; // if checked implies safe or unsafe
  weight: number;
}

export const DecisionChecklistModal: React.FC<DecisionChecklistModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({
    step1: true,
    step2: true,
    step3: false,
    step4: false,
    step5: true // safe default
  });

  if (!isOpen) return null;

  const questions = [
    {
      id: 'step1',
      stage: '01. 출처의 독립성',
      question: '해당 글이 일방적인 카카오톡 오픈채팅/개인 텔레그램으로의 송금을 유도하지 않습니까?',
      safeIfTrue: true,
      hint: '개인 익명 메신저로만 연결되는 경우 90% 이상이 사기 또는 무단 유인글입니다.'
    },
    {
      id: 'step2',
      stage: '02. 데이터 최신성',
      question: '게시글의 작성 및 최종 수정일이 최근 30일 이내로 확인됩니까?',
      safeIfTrue: true,
      hint: '수개월 전 크롤링된 글은 현재 게임 내 시세 및 이벤트와 아무런 관련이 없습니다.'
    },
    {
      id: 'step3',
      stage: '03. 조건의 투명성',
      question: '게임 내 딜러비(10~20%)를 제외한 "최종 실수령액"이 정확한 아라비아 숫자로 명시되어 있습니까?',
      safeIfTrue: true,
      hint: '딜러비 부담 주체가 누락된 호가는 실제 전달 시 15% 이상의 분쟁이 발생합니다.'
    },
    {
      id: 'step4',
      stage: '04. 시스템 위험 고지',
      question: '네오위즈 FDS(이상거래탐지)에 의한 계정 정지 위험성을 정직하게 설명하고 있습니까?',
      safeIfTrue: true,
      hint: '"무사고 100% 안전 보장"을 주장하는 글은 기술적 사실을 은폐한 허위 광고입니다.'
    },
    {
      id: 'step5',
      stage: '05. 계정 보안 (절대 수칙)',
      question: '피망 계정의 로그인 비밀번호나 본인확인 OTP를 요구하지 않습니까?',
      safeIfTrue: true,
      hint: '비밀번호를 요구하는 곳은 100% 해킹 및 계정 자산 탈취 목적입니다.'
    }
  ];

  const handleToggle = (id: string) => {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAll = () => {
    setAnswers({
      step1: true,
      step2: true,
      step3: false,
      step4: false,
      step5: true
    });
  };

  const safeCount = questions.filter((q) => answers[q.id] === q.safeIfTrue).length;
  const score = Math.round((safeCount / questions.length) * 100);

  const getVerdict = () => {
    if (!answers.step5) {
      return {
        level: 'danger',
        label: '위험 수준: 극도로 위험 (사기 100%)',
        color: 'text-rose-600',
        bgColor: 'bg-rose-50 border-rose-300',
        message: '비밀번호나 인증번호를 요구하는 정보는 즉시 이탈해야 합니다. 계정이 즉시 탈취됩니다.'
      };
    }
    if (score >= 80) {
      return {
        level: 'good',
        label: '안전성 평가: 양호 (정보 기준 충족)',
        color: 'text-emerald-700',
        bgColor: 'bg-emerald-50 border-emerald-300',
        message: '출처와 조건이 비교적 투명합니다. 단, 피망 공식 약관상 비인가 거래 제재 위험은 여전히 존재합니다.'
      };
    }
    if (score >= 60) {
      return {
        level: 'warning',
        label: '안전성 평가: 주의 요망 (불투명한 조건)',
        color: 'text-amber-700',
        bgColor: 'bg-amber-50 border-amber-300',
        message: '수수료 공제율이나 최신성이 불분명합니다. 섣부른 신뢰를 삼가고 추가 팩트체크가 필요합니다.'
      };
    }
    return {
      level: 'danger',
      label: '안전성 평가: 위험 (전형적인 미끼 정보)',
      color: 'text-rose-700',
      bgColor: 'bg-rose-50 border-rose-300',
      message: '신뢰할 수 없는 정보입니다. 일방적 호가와 사기 위험에 노출될 수 있으므로 접촉을 중단하세요.'
    };
  };

  const verdict = getVerdict();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#F7F5F0] rounded-xl border border-[#E2DFD9] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#101B2A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#C5A46D]/20 border border-[#C5A46D]/40 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
            </div>
            <div>
              <h2 className="font-editorial-serif text-lg font-semibold tracking-wide">
                5단계 정보 신뢰도 자가진단 시뮬레이터
              </h2>
              <p className="text-[11px] text-[#A5ACB8]">
                접하신 피망머니상 정보의 신뢰도와 안전성을 5개 문항으로 즉시 평가합니다
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

        {/* Diagnostic Score Card */}
        <div className="p-5 bg-white border-b border-[#E2DFD9] shrink-0">
          <div className={`p-4 rounded-lg border ${verdict.bgColor} flex flex-col sm:flex-row items-center justify-between gap-4`}>
            <div>
              <div className={`text-xs font-bold uppercase tracking-wider ${verdict.color}`}>
                {verdict.label}
              </div>
              <p className="text-xs text-[#292D32] mt-1 leading-relaxed">
                {verdict.message}
              </p>
            </div>
            <div className="text-center sm:text-right shrink-0">
              <div className="text-2xl font-editorial-serif font-bold text-[#101B2A] tabular-nums">
                {score} / 100
              </div>
              <div className="text-[11px] text-[#737780]">종합 신뢰 지수</div>
            </div>
          </div>
        </div>

        {/* Questions Checklist */}
        <div className="p-6 overflow-y-auto space-y-4">
          {questions.map((q) => {
            const isSafe = answers[q.id] === q.safeIfTrue;
            return (
              <div
                key={q.id}
                onClick={() => handleToggle(q.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  isSafe
                    ? 'bg-white border-[#E2DFD9] hover:border-[#101B2A]/40'
                    : 'bg-rose-50/50 border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#C5A46D] block mb-1">
                      {q.stage}
                    </span>
                    <h3 className="text-xs sm:text-sm font-semibold text-[#101B2A] leading-snug">
                      {q.question}
                    </h3>
                    <p className="text-[11px] text-[#737780] mt-1 leading-relaxed">
                      {q.hint}
                    </p>
                  </div>

                  <div className="pt-1">
                    <input
                      type="checkbox"
                      checked={answers[q.id]}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-[#101B2A] focus:ring-[#C5A46D] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-[#E2DFD9] flex items-center justify-between shrink-0">
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 text-xs text-[#737780] hover:text-[#101B2A]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>선택 초기화</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onNavigate('/decision-frame/');
              }}
              className="text-xs text-[#101B2A] underline hover:text-[#C5A46D]"
            >
              5단계 프레임 가이드 읽기
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold bg-[#101B2A] text-white rounded-md hover:bg-[#1a2d46] transition-colors"
            >
              진단 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
