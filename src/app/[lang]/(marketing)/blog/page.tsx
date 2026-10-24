import { constructMetadata } from "@/lib/seo/metadata";
import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import ComingSoonView from '@/components/marketing/coming-soon/ComingSoonView';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const meta = dict.metadata?.blog;
  const title = meta?.title || (lang === 'ar' ? 'المدونة | أحدث اتجاهات ورؤى الإعلانات الرقمية DOOH' : 'DOOH Insights, Media Trends & Case Studies | Blog');
  const description = meta?.description || 'Stay ahead in digital out-of-home advertising. Read expert insights and media trends.';

  return constructMetadata({
    title,
    description,
    path: '/blog',
    lang,
    ogImageAlt: lang === 'ar' ? 'مدونة Di-wrapp للأفكار الإعلامية' : 'Di-wrapp Media & DOOH Blog',
  });
}

export default async function BlogPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const stayTuned = (dict as any)?.stayTuned;

  return (
    <ComingSoonView
      lang={lang}
      dict={stayTuned}
    />
  );
}
