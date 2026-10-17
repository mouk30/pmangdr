import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ArticleView } from './components/ArticleView';
import { TerminologyDecoderModal } from './components/TerminologyDecoderModal';
import { DecisionChecklistModal } from './components/DecisionChecklistModal';
import { CsvAuditModal } from './components/CsvAuditModal';
import { SearchModal } from './components/SearchModal';
import { FloatingContactButtons } from './components/FloatingContactButtons';
import { ARTICLES } from './data/articles';
import { updatePageSeo } from './lib/seo';

export default function App() {
  // Normalize initial pathname
  const getInitialPath = () => {
    let p = window.location.pathname;
    if (!p || p === '') p = '/';
    // ensure trailing slash if not root
    if (p !== '/' && !p.endsWith('/')) {
      p = `${p}/`;
    }
    return p;
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDecoderOpen, setIsDecoderOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  // Synchronize browser history and popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getInitialPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update SEO metadata & JSON-LD @graph whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Determine clean slug
    const cleanSlug = currentPath.replace(/^\//, '').replace(/\/$/, '');

    if (cleanSlug === '' || currentPath === '/') {
      updatePageSeo({
        title: '피망머니상 | 머니김박사',
        description:
          '피망머니상 정보를 머니김박사가 정리합니다. 피망 게임머니의 가격 구조, 정보 차이, 판단 기준과 확인 전 주의사항을 체계적으로 살펴보세요.',
        canonicalPath: '/'
      });
    } else {
      const article = ARTICLES[cleanSlug];
      if (article) {
        updatePageSeo({
          title: article.metaTitle,
          description: article.metaDescription,
          canonicalPath: `/${cleanSlug}/`,
          article
        });
      } else {
        // Fallback
        updatePageSeo({
          title: '피망머니상 | 머니김박사 — 리서치 저널',
          description: '피망 게임머니 가격 구조, 정보 차이, 판단 기준과 주의사항을 분석하는 머니김박사 리서치 저널',
          canonicalPath: currentPath
        });
      }
    }
  }, [currentPath]);

  // Keyboard shortcut for Cmd+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (path: string) => {
    // Normalization
    let target = path;
    if (target !== '/' && !target.endsWith('/')) {
      target = `${target}/`;
    }
    window.history.pushState({}, '', target);
    setCurrentPath(target);
  };

  // Find article for current path
  const currentSlug = currentPath.replace(/^\//, '').replace(/\/$/, '');
  const activeArticle = currentSlug ? ARTICLES[currentSlug] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#161A20]">
      {/* Header with 3-Zone Contract */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAudit={() => setIsAuditOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPath === '/' || !activeArticle ? (
          <HomeView
            onNavigate={handleNavigate}
            onOpenDecoder={() => setIsDecoderOpen(true)}
            onOpenChecklist={() => setIsChecklistOpen(true)}
            onOpenAudit={() => setIsAuditOpen(true)}
          />
        ) : (
          <ArticleView
            article={activeArticle}
            onNavigate={handleNavigate}
            onOpenChecklist={() => setIsChecklistOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAudit={() => setIsAuditOpen(true)}
        onOpenDecoder={() => setIsDecoderOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
      />

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        onOpenDecoder={() => setIsDecoderOpen(true)}
      />

      <TerminologyDecoderModal
        isOpen={isDecoderOpen}
        onClose={() => setIsDecoderOpen(false)}
      />

      <DecisionChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        onNavigate={handleNavigate}
      />

      <CsvAuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
      />

      {/* Floating Action Buttons (KakaoTalk & Phone) */}
      <FloatingContactButtons />
    </div>
  );
}
