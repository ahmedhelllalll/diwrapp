import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import VendorPortalHero from '@/components/marketing/vendor/VendorPortalHero';
import WhyGetDiWrapped from '@/components/marketing/vendor/WhyGetDiWrapped';
import VendorFaq from '@/components/marketing/vendor/VendorFaq';

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const vendorHero = (dict as any).vendorPortalHero;

  return {
    title: vendorHero?.badge || 'Vendor Portal',
    description: (vendorHero?.subtitle || 'Empower Your Inventory, Unlock New Revenue with Di_Wrapp.').trim(),
    alternates: {
      canonical: `/${lang}/vendor`,
      languages: {
        en: '/en/vendor',
        ar: '/ar/vendor',
        'x-default': '/en/vendor',
      },
    },
  };
}

export default async function VendorPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <main className="flex-grow flex flex-col bg-white dark:bg-[#080808] transition-colors duration-300">
      <VendorPortalHero dict={dict} lang={lang} />
      <WhyGetDiWrapped dict={dict} lang={lang} />
      <VendorFaq dict={dict} lang={lang} />
    </main>
  );
}
