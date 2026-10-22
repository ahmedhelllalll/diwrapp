import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import { constructMetadata } from '@/lib/seo/metadata';
import AskDiHero from '@/components/marketing/ai/AskDiHero';
import AskDiCarousel from '@/components/marketing/ai/AskDiCarousel';

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const meta = dict.metadata?.askDi;
  const askDi = (dict as any).askDiHero;
  const title = meta?.title || (lang === 'ar' ? 'Ask Di | المساعد الذكي لتخطيط الحملات الإعلانية' : 'Ask Di | AI DOOH Campaign & Media Planning Co-Pilot');
  const description = meta?.description || `${askDi?.subtitleNormal || ''} ${askDi?.subtitleBold || ''}`.trim();

  return constructMetadata({
    title,
    description,
    path: '/ask-di',
    lang,
    ogImageAlt: lang === 'ar' ? 'Ask Di - المساعد الذكي للإعلانات' : 'Ask Di - AI Advertising Assistant',
  });
}

export default async function AskDiPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <main className="flex-grow flex flex-col bg-white dark:bg-[#080808] transition-colors duration-300">
      <AskDiHero dict={dict} lang={lang} />
      <AskDiCarousel dict={dict} lang={lang} />
    </main>
  );
}
