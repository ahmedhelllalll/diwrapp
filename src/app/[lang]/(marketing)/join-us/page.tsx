import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import '../../../landing.css';
import LandingHeader from '@/components/layout/LandingHeader';
import Footer from '@/components/layout/Footer';
import JoinUsHero from '@/components/join-us/JoinUsHero';
import OpportunitiesSection from '@/components/join-us/OpportunitiesSection';
import BentoShowcaseSection from '@/components/join-us/BentoShowcaseSection';
import PlatformFeaturesSection from '@/components/join-us/PlatformFeaturesSection';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang as Locale);
  const meta = (dict as any)?.metadata;
  const joinMeta = meta?.joinUs;

  return {
    title: `${joinMeta?.title || 'Join Us'} - Di-Wrapp`,
    description: joinMeta?.description || 'Clone Yourself. Scale Your Expertise. Extend Your Reach. A Digital Marketplace that Operate Without Limits.',
  };
}

export default async function JoinUsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const l = dict.landing;
  const joinData = (dict as any).joinUs;
  const joinHero = joinData?.hero;
  const opportunities = joinData?.opportunities;
  const metrics = joinData?.metricsBento || joinData?.metrics;
  const platformFeatures = joinData?.platformFeatures;

  const nextLang = lang === 'en' ? 'ar' : 'en';
  const langLabel = lang === 'en' ? 'عربي' : 'English';

  return (
    <>
      {/* Shared Navbar */}
      <LandingHeader
        lang={lang}
        nextLang={nextLang}
        langLabel={langLabel}
        dictNav={l.nav}
      />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col bg-white dark:bg-[#080808] transition-colors duration-300">
        <JoinUsHero
          lang={lang}
          badgeText={joinHero?.badge}
          titleText={joinHero?.title}
          subtitleLine1={joinHero?.subtitleLine1}
          subtitleLine2={joinHero?.subtitleLine2}
          ctaText={joinHero?.cta}
          ctaHref={`/${lang}/signup`}
        />

        <OpportunitiesSection
          lang={lang}
          titleLine1={opportunities?.titleLine1}
          titleLine2={opportunities?.titleLine2}
          cards={opportunities?.cards}
          description={opportunities?.description}
          ctaText={opportunities?.cta}
          ctaHref={`/${lang}/contact`}
        />

        <BentoShowcaseSection
          lang={lang}
          card1={metrics?.card1}
          card2={metrics?.card2}
          card3={metrics?.card3}
        />

        <PlatformFeaturesSection
          lang={lang}
          badge={platformFeatures?.badge}
          headingPrefix={platformFeatures?.headingPrefix}
          headingSuffix={platformFeatures?.headingSuffix}
          card1={platformFeatures?.card1}
          card2={platformFeatures?.card2}
          card3={platformFeatures?.card3}
          ctaBanner={platformFeatures?.ctaBanner}
        />

        {/* Divider between last section and Footer */}
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="w-full border-t border-[#EAECF0] dark:border-[#222630]" />
        </div>
      </main>

      {/* Shared Footer (placed outside any scoped wrapper) */}
      <Footer />
    </>
  );
}
