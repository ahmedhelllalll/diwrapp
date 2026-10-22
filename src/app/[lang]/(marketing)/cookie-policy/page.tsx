import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';
import { constructMetadata } from '@/lib/seo/metadata';
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
  const dict = await getDictionary(lang);
  const meta = dict.metadata?.cookiePolicy;
  const title = meta?.title || (lang === 'ar' ? 'سياسة ملفات تعريف الارتباط | الشفافية والتخزين' : 'Cookie Policy | Transparent Tracking & Storage');
  const description = meta?.description || 'Learn how Di-Wrapp utilizes essential first-party cookies and edge routing.';

  return constructMetadata({
    title,
    description,
    path: '/cookie-policy',
    lang,
    type: 'article',
    ogImageAlt: lang === 'ar' ? 'سياسة ملفات تعريف الارتباط - Di-Wrapp' : 'Di-Wrapp Cookie Policy',
  });
}

export default async function CookiePolicyPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = (params.lang || 'en') as Locale;
  const doc = getCookiePolicy(lang);

  return <LegalArticle lang={lang} document={doc} />;
}
