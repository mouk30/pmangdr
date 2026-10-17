import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'compact';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '' }) => {
  const isDark = variant === 'dark';

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <div className="w-8 h-8 rounded-md bg-[#101B2A] flex items-center justify-center border border-[#C5A46D]/40 shadow-xs">
          <span className="font-editorial-serif text-sm font-bold text-[#F7F5F0] tracking-wider">MK</span>
        </div>
        <span className="font-editorial-serif font-bold tracking-wider text-base text-[#101B2A]">
          MONEY KIM
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <div className="flex items-center gap-2.5">
        {/* Monogram Seal */}
        <div
          className={`w-7 h-7 rounded-sm flex items-center justify-center border transition-colors ${
            isDark
              ? 'bg-[#101B2A] border-[#C5A46D]/60 text-[#F7F5F0]'
              : 'bg-[#101B2A] border-[#C5A46D]/50 text-[#F7F5F0]'
          }`}
        >
          <span className="font-editorial-serif text-xs font-semibold tracking-wider">MK</span>
        </div>

        {/* English Brand Wordmark */}
        <span
          className={`font-editorial-serif text-lg lg:text-xl font-bold tracking-[0.14em] uppercase transition-colors ${
            isDark ? 'text-[#F7F5F0]' : 'text-[#101B2A]'
          }`}
        >
          MONEY KIM LAB
        </span>
      </div>

      {/* Korean Subtitle Lockup */}
      <div className="flex items-center gap-1.5 mt-0.5 pl-9.5">
        <span
          className={`text-[11px] font-medium tracking-tight ${
            isDark ? 'text-[#C5A46D]' : 'text-[#737780]'
          }`}
        >
          피망머니상 | 머니김박사
        </span>
      </div>
    </div>
  );
};
