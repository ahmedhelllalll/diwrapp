import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import { constructMetadata } from '@/lib/seo/metadata';
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
  const meta = dict.metadata?.vendor;
  const vendorHero = (dict as any).vendorPortalHero;
  const isAr = lang === 'ar';
  const title = meta?.title || (isAr ? 'بوابة الموردين | إدارة واستثمار الشاشات الإعلانية' : 'Vendor Portal | Manage & Monetize DOOH Inventory');
  const description = meta?.description || vendorHero?.subtitle || "Join Di-Wrapp's Smart Network to empower your inventory.";

  return constructMetadata({
    title,
    description,
    path: '/vendor',
    lang,
    ogImageAlt: isAr ? 'بوابة ملاك الشاشات - Di-Wrapp' : 'Di-Wrapp Vendor Portal',
  });
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
