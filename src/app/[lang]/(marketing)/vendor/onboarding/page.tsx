import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import VendorOnboardingWizard from '@/components/marketing/vendor/onboarding/VendorOnboardingWizard';

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ step?: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : {};
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const onboarding = (dict as any).vendorOnboarding;
  const stepInfo =
    searchParams.step === '4'
      ? onboarding?.success
      : searchParams.step === '3'
      ? onboarding?.step3
      : searchParams.step === '2'
      ? onboarding?.step2
      : onboarding?.step1;

  return {
    title: stepInfo?.title || 'Vendor Onboarding',
    description: (stepInfo?.subtitle || stepInfo?.emailNotice || 'Tell us about your organization').trim(),
    alternates: {
      canonical: `/${lang}/vendor/onboarding`,
      languages: {
        en: '/en/vendor/onboarding',
        ar: '/ar/vendor/onboarding',
        'x-default': '/en/vendor/onboarding',
      },
    },
  };
}

import { CountryBadge, CountryBadgeSkeleton } from '@/components/common/CountryBadge';

async function VendorOnboardingContent({
  lang,
  searchParamsPromise,
}: {
  lang: Locale;
  searchParamsPromise?: Promise<{ step?: string }>;
}) {
  const searchParams = searchParamsPromise ? await searchParamsPromise : {};
  const dict = await getDictionary(lang);
  const onboarding = (dict as any).vendorOnboarding;
  const stepNum = searchParams.step ? parseInt(searchParams.step, 10) : 1;
  const initialStep = [1, 2, 3, 4].includes(stepNum) ? stepNum : 1;

  return (
    <VendorOnboardingWizard 
      lang={lang} 
      dict={onboarding} 
      initialStep={initialStep} 
      countryBadge={
        <Suspense key="country-badge" fallback={<CountryBadgeSkeleton />}>
          <CountryBadge />
        </Suspense>
      }
    />
  );
}

export default async function VendorOnboardingPage(props: {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ step?: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-[#080808] transition-colors duration-300">
      <Suspense fallback={<div className="w-full flex-1 max-w-[1120px] mx-auto p-8 animate-pulse" />}>
        <VendorOnboardingContent 
          lang={lang} 
          searchParamsPromise={props.searchParams} 
        />
      </Suspense>
    </main>
  );
}


