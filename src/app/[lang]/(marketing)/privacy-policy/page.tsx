import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n-config';
import { getPrivacyPolicy } from '@/content/legal/privacy';
import LegalArticle from '@/components/legal/LegalArticle';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = (params.lang || 'en') as Locale;
  const doc = getPrivacyPolicy(lang);

  const title = lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy';
  const description = doc.intro;

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/privacy-policy`,
      languages: {
        en: 'https://diwrapp.com/en/privacy-policy',
        ar: 'https://diwrapp.com/ar/privacy-policy',
        'x-default': 'https://diwrapp.com/en/privacy-policy',
      },
    },
    openGraph: {
      title: `${title} | DiWrapp`,
      description,
      url: `https://diwrapp.com/${lang}/privacy-policy`,
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

export default async function PrivacyPolicyPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = (params.lang || 'en') as Locale;
  const doc = getPrivacyPolicy(lang);

  return <LegalArticle lang={lang} document={doc} />;
}
