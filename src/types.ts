export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SectionContent {
  id: string;
  heading: string;
  subheading?: string;
  paragraphs: string[];
  callout?: {
    type: 'note' | 'warning' | 'insight';
    title: string;
    text: string;
  };
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  keyTakeaways?: string[];
}

export interface ArticleData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  readTime: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    role: string;
    affiliation: string;
  };
  reviewer: {
    name: string;
    role: string;
  };
  directAnswer: string;
  heroKicker: string;
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
  sections: SectionContent[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
}

export interface TerminologyItem {
  term: string;
  english?: string;
  category: 'unit' | 'market' | 'policy' | 'risk';
  definition: string;
  practicalContext: string;
  cautionNotice: string;
}

export interface CsvAuditItem {
  domain: string;
  status: string;
  statusColor: 'green' | 'amber' | 'red';
  httpCode: number;
  wordCount: number;
  identifiedIssues: string[];
  remediationAction: string;
}
