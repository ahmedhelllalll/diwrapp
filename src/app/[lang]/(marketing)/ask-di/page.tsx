import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import AskDiHero from '@/components/marketing/ai/AskDiHero';
import AskDiCarousel from '@/components/marketing/ai/AskDiCarousel';

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const askDi = (dict as any).askDiHero;

  return {
    title: askDi?.badge || 'Ask_Di AI Assistant',
    description: `${askDi?.subtitleNormal || ''} ${askDi?.subtitleBold || ''}`.trim(),
    alternates: {
      canonical: `/${lang}/ask-di`,
      languages: {
        en: '/en/ask-di',
        ar: '/ar/ask-di',
        'x-default': '/en/ask-di',
      },
    },
  };
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
