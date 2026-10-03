import React, { Suspense } from "react";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";
import Header from "@/components/layout/Header";
import Footer, { FooterDict } from "@/components/layout/Footer";
import { CountryBadge, CountryBadgeSkeleton } from "@/components/common/CountryBadge";

export default async function MarketingLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const l = dict.landing;

  // Language switcher data
  const nextLang = lang === 'en' ? 'ar' : 'en';
  const langLabel = lang === 'en' ? 'عربي' : 'English';

  return (
    <>
      <Header
        lang={lang}
        nextLang={nextLang}
        langLabel={langLabel}
        dictNav={l.nav}
        dict={dict}
        countryBadge={
          <Suspense key="country-badge" fallback={<CountryBadgeSkeleton />}>
            <CountryBadge />
          </Suspense>
        }
      />
      {props.children}
      <Footer lang={lang} dict={(dict as { footer?: FooterDict }).footer} />
    </>
  );
}
