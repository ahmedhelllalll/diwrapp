import type { Metadata } from 'next';
import { Locale } from '@/i18n-config';

export interface PageMetadataConfig {
  title: string;
  description: string;
  path: string; // e.g. '/advertise' or '' for home
  lang: Locale;
  ogImageAlt?: string;
  type?: 'website' | 'article';
}

const BASE_URL = 'https://diwrapp.com';

/**
 * Standardized metadata builder for Next.js App Router routes.
 * Ensures 100% compliance with Google SEO, Open Graph (1200x630),
 * Twitter Cards, and absolute canonical/hreflang alternates.
 */
export function constructMetadata({
  title,
  description,
  path,
  lang,
  ogImageAlt,
  type = 'website',
}: PageMetadataConfig): Metadata {
  const isAr = lang === 'ar';
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const canonicalUrl = `${BASE_URL}/${lang}${cleanPath}`;
  const localizedTitle = `${title} | Di-wrapp`;
  const defaultOgAlt = isAr
    ? `${title} - شبكة Di-wrapp الإعلانية`
    : `${title} | Di-wrapp Media Network`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/en${cleanPath}`,
        ar: `${BASE_URL}/ar${cleanPath}`,
        'x-default': `${BASE_URL}/en${cleanPath}`,
      },
    },
    openGraph: {
      title: localizedTitle,
      description,
      url: canonicalUrl,
      siteName: 'Di-wrapp',
      locale: isAr ? 'ar_AR' : 'en_US',
      type,
      images: [
        {
          url: '/images/og-banner.png',
          width: 1200,
          height: 630,
          alt: ogImageAlt || defaultOgAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedTitle,
      description,
      images: ['/images/og-banner.png'],
    },
  };
}
