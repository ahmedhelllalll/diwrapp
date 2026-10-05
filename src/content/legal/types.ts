export interface LegalParagraph {
  text?: string;
  paragraphs?: string[];
  list?: string[];
  subheading?: string;
  callout?: {
    type: 'info' | 'warning' | 'placeholder';
    text: string;
  };
}

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: (string | LegalParagraph)[];
}

export interface RelatedLegalDoc {
  title: string;
  description: string;
  href: string;
}

export interface LegalDocument {
  slug: string;
  category: string;
  title: string;
  intro: string;
  effectiveDate: string;
  lastUpdated: string;
  tableOfContentsTitle: string;
  sidebar: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  sections: LegalSection[];
  relatedDocsTitle: string;
  relatedDocs: RelatedLegalDoc[];
}

export type Locale = 'en' | 'ar';
