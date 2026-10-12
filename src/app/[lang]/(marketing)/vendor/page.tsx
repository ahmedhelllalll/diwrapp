import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import VendorPortalHero from '@/components/marketing/vendor/VendorPortalHero';
import WhyGetDiWrapped from '@/components/marketing/vendor/WhyGetDiWrapped';
import VendorFaq from '@/components/marketing/vendor/VendorFaq';
import '../../../vendor.css';

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const vendorHero = (dict as any).vendorPortalHero;
  const isAr = lang === 'ar';
  const title = vendorHero?.badge || (isAr ? 'بوابة أصحاب المساحات الإعلانية' : 'Vendor Portal');
  const description = (
    vendorHero?.subtitle ||
    (isAr
      ? 'انضم إلى شبكة Di_Wrapp الذكية، ومكّن مساحاتك الإعلانية لتحقيق عوائد مجزية.'
      : "Join Di_Wrapp's Smart Network to empower your inventory and unlock new revenue.")
  ).trim();

  return {
    metadataBase: new URL('https://diwrapp.com'),
    title,
    description,
    alternates: {
      canonical: `/${lang}/vendor`,
      languages: {
        en: 'https://diwrapp.com/en/vendor',
        ar: 'https://diwrapp.com/ar/vendor',
        'x-default': 'https://diwrapp.com/en/vendor',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://diwrapp.com/${lang}/vendor`,
      siteName: 'DiWrapp',
      locale: isAr ? 'ar_AR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/og-banner.png',
          width: 1920,
          height: 620,
          alt: isAr ? 'دي-راب - بوابة أصحاب المساحات الإعلانية' : 'DiWrapp Vendor Portal',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-banner.png'],
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
    <main className="vendor-scope flex-grow flex flex-col bg-white dark:bg-surface-1 transition-colors duration-300 overflow-visible">
      <VendorPortalHero dict={dict} lang={lang} />
      <WhyGetDiWrapped dict={dict} lang={lang} />
      <VendorFaq dict={dict} lang={lang} />
    </main>
  );
}
