import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import ComingSoonView from '@/components/marketing/coming-soon/ComingSoonView';

export async function generateMetadata(props: { 
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ feature?: string; title?: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const dict = await getDictionary(lang);
  const stayTuned = (dict as any)?.stayTuned;

  const rawFeature = searchParams?.title || searchParams?.feature;
  const featureLabel = rawFeature ? rawFeature.replace(/[-_]/g, ' ') : undefined;

  return {
    title: featureLabel 
      ? `${featureLabel} - ${stayTuned?.screenStayTuned || 'Coming Soon'}`
      : `${stayTuned?.screenStayTuned || 'Stay Tuned'}`,
    description: stayTuned?.description || 'Stay tuned for exclusive updates and early access!',
    alternates: {
      canonical: `/${lang}/coming-soon`,
      languages: {
        en: '/en/coming-soon',
        ar: '/ar/coming-soon',
        'x-default': '/en/coming-soon',
      },
    },
  };
}

async function ComingSoonContent({ 
  lang, 
  searchParamsPromise 
}: { 
  lang: Locale; 
  searchParamsPromise?: Promise<{ feature?: string; title?: string }>;
}) {
  const searchParams = searchParamsPromise ? await searchParamsPromise : undefined;
  const dict = await getDictionary(lang);
  const stayTuned = (dict as any)?.stayTuned;

  const rawFeature = searchParams?.title || searchParams?.feature;

  const customizedDict = rawFeature ? {
    ...stayTuned,
    tag: `#${rawFeature.replace(/\s+/g, '_')}`,
  } : stayTuned;

  return (
    <ComingSoonView
      lang={lang}
      dict={customizedDict}
    />
  );
}

export default async function ComingSoonPage(props: { 
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ feature?: string; title?: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;

  return (
    <Suspense fallback={null}>
      <ComingSoonContent lang={lang} searchParamsPromise={props.searchParams} />
    </Suspense>
  );
}
