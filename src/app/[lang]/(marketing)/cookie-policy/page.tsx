import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n-config';
import { getCookiePolicy } from '@/content/legal/cookies';
import LegalArticle from '@/components/legal/LegalArticle';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = (params.lang || 'en') as Locale;
  const doc = getCookiePolicy(lang);

  const title = lang === 'ar' ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy';
  const description = doc.intro;

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/cookie-policy`,
      languages: {
        en: 'https://diwrapp.com/en/cookie-policy',
        ar: 'https://diwrapp.com/ar/cookie-policy',
        'x-default': 'https://diwrapp.com/en/cookie-policy',
      },
    },
    openGraph: {
      title: `${title} | DiWrapp`,
      description,
      url: `https://diwrapp.com/${lang}/cookie-policy`,
      siteName: 'DiWrapp',
      locale: lang === 'ar' ? 'ar_AR' : 'en_US',
      type: 'article',
      images: [
        {
          url: '/images/og-banner.png',
          width: 1920,
          height: 620,
          alt: `${title} - DiWrapp Media Network`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | DiWrapp`,
      description,
      images: ['/images/og-banner.png'],
    },
  };
}

export default async function CookiePolicyPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = (params.lang || 'en') as Locale;
  const doc = getCookiePolicy(lang);

  return <LegalArticle lang={lang} document={doc} />;
}
