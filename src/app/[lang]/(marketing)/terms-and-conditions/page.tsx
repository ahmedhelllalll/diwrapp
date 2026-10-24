import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';
import { constructMetadata } from '@/lib/seo/metadata';
import { getTermsAndConditions } from '@/content/legal/terms';
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
  const meta = dict.metadata?.termsAndConditions;
  const title = meta?.title || (lang === 'ar' ? 'الشروط والأحكام | القواعد المنظمة لمنصة الإعلانات' : 'Terms & Conditions | Platform & Marketplace Rules');
  const description = meta?.description || 'Read the official Terms & Conditions governing your use of the Di-wrapp marketplace.';

  return constructMetadata({
    title,
    description,
    path: '/terms-and-conditions',
    lang,
    type: 'article',
    ogImageAlt: lang === 'ar' ? 'الشروط والأحكام لمنصة Di-wrapp' : 'Di-wrapp Terms & Conditions',
  });
}

export default async function TermsAndConditionsPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = (params.lang || 'en') as Locale;
  const doc = getTermsAndConditions(lang);

  return <LegalArticle lang={lang} document={doc} />;
}
