import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';
import { constructMetadata } from '@/lib/seo/metadata';
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
  const dict = await getDictionary(lang);
  const meta = dict.metadata?.privacyPolicy;
  const title = meta?.title || (lang === 'ar' ? 'سياسة الخصوصية | حماية وسرية البيانات الشخصية' : 'Privacy Policy | Data Protection & User Privacy');
  const description = meta?.description || 'Review the Di-wrapp Privacy Policy to understand how we collect, protect, and process personal data.';

  return constructMetadata({
    title,
    description,
    path: '/privacy-policy',
    lang,
    type: 'article',
    ogImageAlt: lang === 'ar' ? 'سياسة الخصوصية لمنصة Di-wrapp' : 'Di-wrapp Privacy Policy',
  });
}

export default async function PrivacyPolicyPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = (params.lang || 'en') as Locale;
  const doc = getPrivacyPolicy(lang);

  return <LegalArticle lang={lang} document={doc} />;
}
