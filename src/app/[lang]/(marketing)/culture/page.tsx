import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import { constructMetadata } from '@/lib/seo/metadata';
import OurCultureSection from '@/components/marketing/culture/OurCultureSection';
import LifeAtDiwrapp from '@/components/marketing/culture/LifeAtDiwrapp';
import CareersBentoGrid from '@/components/marketing/culture/CareersBentoGrid';

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const meta = dict.metadata?.culture;
  const culture = dict.culture;
  const title = meta?.title || (lang === 'ar' ? 'بيئة العمل وثقافتنا | ابتكار مستقبل وسائط DOOH' : 'Life & Culture | Building the Future of DOOH Media');
  const description = meta?.description || culture?.subtitle || 'Explore careers and life at Di-wrapp.';

  return constructMetadata({
    title,
    description,
    path: '/culture',
    lang,
    ogImageAlt: lang === 'ar' ? 'ثقافتنا وبيئة العمل - Di-wrapp' : 'Di-wrapp Culture & Careers',
  });
}

export default async function CulturePage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const culture = dict.culture;

  return (
    <main className="flex-grow flex flex-col bg-white dark:bg-surface-1 transition-colors duration-300">
      <OurCultureSection culture={culture} />
      <LifeAtDiwrapp dict={dict} />
      <CareersBentoGrid dict={dict} lang={lang} />
    </main>
  );
}

