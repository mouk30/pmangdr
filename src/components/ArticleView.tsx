import React from 'react';
import { ArticleData } from '../types';
import { ARTICLES } from '../data/articles';
import {
  ArrowLeft,
  Calendar,
  Clock,
  UserCheck,
  Sparkles,
  HelpCircle,
  Share2,
  Check,
  AlertOctagon,
  Info,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface ArticleViewProps {
  article: ArticleData;
  onNavigate: (path: string) => void;
  onOpenChecklist: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onNavigate,
  onOpenChecklist
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="py-10 lg:py-16 bg-[#F7F5F0]">
      <div className="editorial-container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="브레드크럼" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-[#737780]">
            <li>
              <button
                onClick={() => onNavigate('/')}
                className="hover:text-[#101B2A] transition-colors"
              >
                홈
              </button>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-[#737780]">{article.category}</span>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-[#101B2A] font-medium truncate max-w-xs inline-block align-bottom" aria-current="page">
                {article.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="article-container mb-12">
          {/* Kicker */}
          <div className="text-xs font-semibold tracking-widest text-[#C5A46D] uppercase mb-3">
            {article.heroKicker}
          </div>

          {/* Main Title (H1) */}
          <h1 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#101B2A] leading-[1.2] mb-6">
            {article.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-base sm:text-lg text-[#525760] leading-relaxed mb-8">
            {article.metaDescription}
          </p>

          {/* Editorial Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E2DFD9] text-xs text-[#737780]">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>수정 {article.dateModified}</span>
                <span className="text-[#A5ACB8]">(발행 {article.datePublished})</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>{article.readTime}</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>작성: {article.author.name}</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#101B2A] bg-white border border-[#E2DFD9] rounded-md hover:bg-[#101B2A] hover:text-white transition-all shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#C5A46D]" />}
              <span>{copied ? 'URL 복사 완료' : '링크 공유'}</span>
            </button>
          </div>
        </header>

        {/* GEO / AEO Direct Answer Block */}
        <div className="article-container mb-12">
          <div className="p-6 rounded-lg bg-[#101B2A] text-white shadow-md border border-[#273448]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A46D] uppercase tracking-wider mb-2.5">
              <Sparkles className="w-4 h-4" />
              <span>DIRECT ANSWER · 리서치 핵심 결론</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#F7F5F0]">
              {article.directAnswer}
            </p>
          </div>
        </div>

        {/* Featured Editorial Image */}
        {article.image && (
          <figure className="article-container mb-14">
            <div className="rounded-lg overflow-hidden border border-[#E2DFD9] shadow-sm bg-white">
              <img
                src={article.image.src}
                alt={article.image.alt}
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
            </div>
            <figcaption className="text-xs font-serif italic text-[#737780] mt-3 text-center">
              {article.image.caption}
            </figcaption>
          </figure>
        )}

        {/* Article Body Sections */}
        <div className="article-container space-y-14">
          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-editorial-serif text-2xl sm:text-3xl font-semibold text-[#101B2A] mb-3">
                {section.heading}
              </h2>

              {section.subheading && (
                <div className="text-sm font-medium text-[#737780] mb-5">
                  {section.subheading}
                </div>
              )}

              <div className="space-y-4 text-[16px] sm:text-[17px] text-[#292D32] leading-[1.85]">
                {section.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Callout Box */}
              {section.callout && (
                <div
                  className={`mt-6 p-5 rounded-lg border ${
                    section.callout.type === 'warning'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                      : section.callout.type === 'insight'
                      ? 'bg-[#101B2A]/5 border-[#101B2A]/20 text-[#101B2A]'
                      : 'bg-white border-[#E2DFD9] text-[#292D32]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wider mb-2">
                    {section.callout.type === 'warning' && <AlertOctagon className="w-4 h-4 text-amber-600" />}
                    {section.callout.type === 'insight' && <Info className="w-4 h-4 text-[#C5A46D]" />}
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{section.callout.text}</p>
                </div>
              )}

              {/* Structured Comparison Table */}
              {section.table && (
                <div className="mt-8 overflow-hidden rounded-lg border border-[#E2DFD9] bg-white shadow-2xs">
                  <div className="px-5 py-3.5 bg-[#F7F5F0] border-b border-[#E2DFD9] text-xs font-semibold text-[#101B2A]">
                    {section.table.caption}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#FAF9F7] text-[#737780] border-b border-[#E2DFD9]">
                        <tr>
                          {section.table.headers.map((th, thIdx) => (
                            <th key={thIdx} className="px-5 py-3 font-semibold">
                              {th}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2DFD9]">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#F7F5F0]/50 transition-colors">
                            {row.map((td, tdIdx) => (
                              <td
                                key={tdIdx}
                                className={`px-5 py-3.5 ${
                                  tdIdx === 0 ? 'font-semibold text-[#101B2A]' : 'text-[#525760]'
                                }`}
                              >
                                {td}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Key Takeaways */}
              {section.keyTakeaways && (
                <div className="mt-6 p-5 rounded-lg bg-white border border-[#E2DFD9]">
                  <div className="text-xs font-semibold text-[#101B2A] uppercase tracking-wider mb-3">
                    핵심 점검 포인트:
                  </div>
                  <ul className="space-y-2">
                    {section.keyTakeaways.map((k, kIdx) => (
                      <li key={kIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#525760]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D] mt-2 shrink-0" />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {/* FAQs Section */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="pt-10 border-t border-[#E2DFD9]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A46D] uppercase tracking-wider mb-3">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS · 자주 묻는 질문</span>
              </div>
              <h2 className="font-editorial-serif text-2xl sm:text-3xl font-semibold text-[#101B2A] mb-6">
                이용자들이 가장 자주 묻는 질문
              </h2>

              <div className="space-y-4">
                {article.faqs.map((faq, idx) => (
                  <div key={idx} className="p-6 rounded-lg bg-white border border-[#E2DFD9]">
                    <h3 className="text-[15px] font-semibold text-[#101B2A] mb-2 flex items-start gap-2">
                      <span className="text-[#C5A46D] font-bold">Q.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#525760] leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Author & Reviewer Transparency Card */}
          <div className="p-6 rounded-lg bg-white border border-[#E2DFD9] shadow-2xs mt-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#737780] mb-3">
              RESEARCH ETHICS &amp; REVIEW TRANSPARENCY
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#525760]">
              <div>
                <span className="font-semibold text-[#101B2A] block">수석 집필: {article.author.name}</span>
                <span className="text-[#737780]">{article.author.role}</span>
                <div className="text-[11px] text-[#A5ACB8] mt-1">{article.author.affiliation}</div>
              </div>
              <div className="sm:border-l sm:border-[#E2DFD9] sm:pl-4">
                <span className="font-semibold text-[#101B2A] block">검수 위원: {article.reviewer.name}</span>
                <span className="text-[#737780]">{article.reviewer.role}</span>
                <div className="text-[11px] text-[#A5ACB8] mt-1">공식 이용약관 및 게임산업법령 교차검증</div>
              </div>
            </div>
          </div>

          {/* Interactive Checklist Banner */}
          <div className="p-6 bg-[#101B2A] rounded-lg text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <div className="text-sm font-semibold">지금 보고 있는 정보의 안전성이 의심되시나요?</div>
              <div className="text-xs text-[#A5ACB8] mt-0.5">5단계 체크리스트로 즉시 진단해보세요.</div>
            </div>
            <button
              onClick={onOpenChecklist}
              className="px-4 py-2 text-xs font-semibold bg-[#C5A46D] text-[#101B2A] hover:bg-[#d6b77e] transition-colors rounded-md shrink-0"
            >
              5단계 자가진단 실행
            </button>
          </div>

          {/* Related Articles Navigation */}
          {article.relatedSlugs && article.relatedSlugs.length > 0 && (
            <div className="pt-12 border-t border-[#E2DFD9]">
              <div className="text-xs font-semibold text-[#737780] uppercase tracking-wider mb-4">
                연계 심층 리서치 가이드
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {article.relatedSlugs.map((slug) => {
                  const related = ARTICLES[slug];
                  if (!related) return null;
                  return (
                    <button
                      key={slug}
                      onClick={() => onNavigate(`/${slug}/`)}
                      className="p-5 rounded-lg bg-white border border-[#E2DFD9] hover:border-[#101B2A]/40 transition-all text-left group flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[11px] font-semibold text-[#C5A46D] block mb-1">
                          {related.category}
                        </span>
                        <div className="text-sm font-semibold text-[#101B2A] group-hover:text-[#C5A46D] transition-colors line-clamp-2">
                          {related.title}
                        </div>
                      </div>
                      <div className="pt-3 mt-3 border-t border-[#E2DFD9]/60 flex items-center justify-between text-xs text-[#737780]">
                        <span>{related.readTime}</span>
                        <span className="text-[#C5A46D] font-medium group-hover:translate-x-1 transition-transform">
                          읽기 →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back to Home Button */}
          <div className="pt-6 flex justify-center">
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-[#101B2A] bg-white border border-[#E2DFD9] rounded-md hover:border-[#101B2A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>머니김박사 홈으로 돌아가기</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
