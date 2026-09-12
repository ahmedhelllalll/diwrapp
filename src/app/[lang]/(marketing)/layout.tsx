import React from "react";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";
import LandingHeader from "@/components/layout/LandingHeader";
import Footer from "@/components/layout/Footer";

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
      <LandingHeader
        lang={lang}
        nextLang={nextLang}
        langLabel={langLabel}
        dictNav={l.nav}
      />
      {props.children}
      <Footer lang={lang} dict={(dict as any).footer} />
    </>
  );
}
