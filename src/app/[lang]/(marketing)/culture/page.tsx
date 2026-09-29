import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import OurCultureSection from '@/components/marketing/culture/OurCultureSection';
import LifeAtDiwrapp from '@/components/marketing/culture/LifeAtDiwrapp';
import CareersBentoGrid from '@/components/marketing/culture/CareersBentoGrid';

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const culture = (dict as any).culture;

  return {
    title: culture?.badge || 'Our Culture',
    description: culture?.subtitle || 'We believe in a work culture that feels as good as it performs.',
    alternates: {
      canonical: `/${lang}/culture`,
      languages: {
        en: '/en/culture',
        ar: '/ar/culture',
        'x-default': '/en/culture',
      },
    },
  };
}

export default async function CulturePage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const culture = (dict as any).culture;

  return (
    <main className="flex-grow flex flex-col bg-white dark:bg-[#080808] transition-colors duration-300">
      <OurCultureSection lang={lang} culture={culture} />
      <LifeAtDiwrapp dict={dict} />
      <CareersBentoGrid dict={dict} lang={lang} />
    </main>
  );
}

