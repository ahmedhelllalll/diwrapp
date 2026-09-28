import type { Metadata } from "next";
import { getDictionary } from "../../dictionaries";
import { Locale } from "../../i18n-config";
import Link from 'next/link';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dynamic from 'next/dynamic';
import HeroEyebrowBadge from "@/components/marketing/landing/HeroEyebrowBadge";
import MobileHeroMockup from "@/components/marketing/landing/MobileHeroMockup";

const FloatingHeroAssets = dynamic(() => import("@/components/marketing/landing/FloatingHeroAssets"));
const HowItWorksSection = dynamic(() => import("@/components/marketing/landing/HowItWorksSection"));
const PioneeringSection = dynamic(() => import("@/components/marketing/landing/PioneeringSection"));
const FaqSection = dynamic(() => import("@/components/marketing/landing/FaqSection"));

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: { absolute: dict.metadata.defaultTitle },
    description: dict.metadata.landing.description,
  };
}

import { Suspense } from 'react';
import { CountryBadge, CountryBadgeSkeleton } from '@/components/common/CountryBadge';

export default async function LandingPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const l = dict.landing;

  // For the language switcher
  const nextLang = lang === 'en' ? 'ar' : 'en';
  const langLabel = lang === 'en' ? 'عربي' : 'English';

  return (
    <>
      {/* Navigation */}
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

      <div className="landing-scope">

        {/* Hero Section */}
      <main className="bg-white dark:bg-surface-1 transition-colors duration-300">
        <section id="hero-section" className="hero-section relative pt-[88px] sm:pt-24 lg:pt-28 overflow-hidden">
          
          {/* Floating Hero Background and Foreground Assets */}
          <FloatingHeroAssets />

          <div className="hero-content min-h-0 lg:min-h-[calc(100vh-180px)] pt-4 pb-0 lg:pb-8 flex flex-col items-center justify-center w-full relative z-10">
            <div className="w-full max-w-[900px] mx-auto flex flex-col items-center text-center">
              <div className="hero-anim-badge w-full flex justify-center">
                <HeroEyebrowBadge text={l.hero.eyebrow || l.hero.badge} />
              </div>

              <div className="w-full flex justify-center">
                <h1 
                  className="hero-title hero-lcp-title text-heading dark:text-[#F9FAFB] font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-bold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.12] tracking-[-0.03em] relative z-40" 
                  dangerouslySetInnerHTML={{ __html: l.hero.title }} 
                />
              </div>

              <div className="hero-anim-subtitle w-full flex justify-center">
                <p className="hero-subtitle text-slate-600 dark:text-neutral-300 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[15px] sm:text-[17px] leading-[1.65] rtl:leading-[1.8] max-w-[620px] mx-auto mb-8 relative z-40 text-center transition-colors">
                  {l.hero.subtitle}
                </p>
              </div>

              <div className="hero-anim-cta w-full flex justify-center">
                <Link 
                  href={`/${lang}/advertise`} 
                  className="inline-flex items-center justify-center h-[52px] px-9 rounded-[16px] bg-brand text-white font-medium text-[16px] tracking-[-0.01em] shadow-[0_4px_12px_rgba(0,102,255,0.25)] hover:shadow-[0_8px_20px_rgba(0,102,255,0.35)] transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0 cursor-pointer font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] relative z-40 transform-gpu"
                >
                  {l.hero.discover || "Discover More"}
                </Link>
              </div>
            </div>

            <MobileHeroMockup />
          </div>
          
          {/* Spacer to account for absolute dashboard image height */}
          <div className="hidden lg:block lg:h-[980px] w-full pointer-events-none" aria-hidden="true"></div>
        </section>

        {/* How It Works Section */}
        <HowItWorksSection dict={l.works} lang={lang} />

        {/* Pioneering Accessibility Section */}
        <PioneeringSection dict={l.pioneering} lang={lang} />

        {/* FAQ Section */}
        <FaqSection lang={lang as "en" | "ar"} />
      </main>
      </div>

      <Footer lang={lang} dict={(dict as unknown as { footer: React.ComponentProps<typeof Footer>["dict"] }).footer} />
    </>
  );
}
