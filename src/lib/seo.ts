import { ArticleData } from '../types';

export const DOMAIN_URL = 'https://moneykim.lab';

export function updatePageSeo(options: {
  title: string;
  description: string;
  canonicalPath?: string;
  article?: ArticleData;
}) {
  const canonicalUrl = `${DOMAIN_URL}${options.canonicalPath || '/'}`;

  // Update Title
  document.title = options.title;

  // Update or create Meta Tags
  setMetaTag('name', 'description', options.description);
  setMetaTag('property', 'og:title', options.title);
  setMetaTag('property', 'og:description', options.description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:site_name', '피망머니상 | 머니김박사');

  // OpenGraph Image for Naver Yeti & Social Preview
  const imageUrl = options.article?.image?.src
    ? `${DOMAIN_URL}${options.article.image.src}`
    : `${DOMAIN_URL}/images/hero_editorial_journal.jpg`;
  setMetaTag('property', 'og:image', imageUrl);
  setMetaTag('property', 'og:image:width', '1200');
  setMetaTag('property', 'og:image:height', '630');
  setMetaTag('property', 'og:image:alt', options.title);

  setMetaTag('name', 'twitter:title', options.title);
  setMetaTag('name', 'twitter:description', options.description);
  setMetaTag('name', 'twitter:url', canonicalUrl);
  setMetaTag('name', 'twitter:image', imageUrl);

  // Update Canonical
  let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // Inject / Update JSON-LD Script
  updateJsonLd(options.canonicalPath || '/', options.title, options.description, options.article);
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function generateOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${DOMAIN_URL}/#organization`,
    name: '머니김박사',
    alternateName: '피망머니상 | 머니김박사',
    legalName: 'MONEY KIM LAB Research Journal',
    url: `${DOMAIN_URL}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${DOMAIN_URL}/#logo`,
      url: `${DOMAIN_URL}/favicon.svg`,
      caption: '머니김박사 로고'
    },
    description: '피망 게임머니 가격 구조, 정보 차이, 판단 기준과 주의사항을 분석하는 독립 리서치 저널',
    knowsAbout: [
      '피망 게임머니 가격 구조',
      '웹보드게임 재화 정책',
      '게임이용약관 해석',
      '디지털 사기 피해 예방'
    ]
  };
}

export function generateWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${DOMAIN_URL}/#website`,
    url: `${DOMAIN_URL}/`,
    name: '피망머니상 | 머니김박사',
    alternateName: 'MONEY KIM LAB',
    inLanguage: 'ko-KR',
    publisher: {
      '@id': `${DOMAIN_URL}/#organization`
    }
  };
}

export function generateWebPageSchema(path: string, title: string, description: string) {
  const pageUrl = `${DOMAIN_URL}${path}`;
  return {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description: description,
    isPartOf: {
      '@id': `${DOMAIN_URL}/#website`
    },
    inLanguage: 'ko-KR'
  };
}

export function generateBreadcrumbSchema(path: string, title: string) {
  const pageUrl = `${DOMAIN_URL}${path}`;
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: '홈',
      item: `${DOMAIN_URL}/`
    }
  ];

  if (path !== '/') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: title,
      item: pageUrl
    });
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items
  };
}

export function generateArticleSchema(article: ArticleData, path: string) {
  const pageUrl = `${DOMAIN_URL}${path}`;
  return {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    isPartOf: {
      '@id': `${pageUrl}#webpage`
    },
    headline: article.title,
    description: article.metaDescription,
    inLanguage: 'ko-KR',
    mainEntityOfPage: pageUrl,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
      worksFor: {
        '@id': `${DOMAIN_URL}/#organization`
      }
    },
    publisher: {
      '@id': `${DOMAIN_URL}/#organization`
    },
    articleSection: article.category,
    wordCount: 1850
  };
}

export function updateJsonLd(path: string, title: string, description: string, article?: ArticleData) {
  let scriptEl = document.querySelector<HTMLScriptElement>('#json-ld-graph');
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'json-ld-graph';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const graphNodes: unknown[] = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateWebPageSchema(path, title, description),
    generateBreadcrumbSchema(path, title)
  ];

  if (article && path !== '/') {
    graphNodes.push(generateArticleSchema(article, path));
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': graphNodes
  };

  // Safe JSON serialization
  scriptEl.textContent = JSON.stringify(jsonLdData, null, 2);
}
