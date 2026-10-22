import { constructMetadata } from "@/lib/seo/metadata";
import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import JoinUsHero from '@/components/marketing/join-us/JoinUsHero';
import OpportunitiesSection from '@/components/marketing/join-us/OpportunitiesSection';
import BentoShowcaseSection from '@/components/marketing/join-us/BentoShowcaseSection';
import PlatformFeaturesSection from '@/components/marketing/join-us/PlatformFeaturesSection';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const meta = dict.metadata?.joinUs;
  const title = meta?.title || (lang === 'ar' ? 'شبكة الشركاء وملاك المساحات والشاشات الإعلانية' : 'Media Partner Network | Monetize DOOH Screens');
  const description = meta?.description || 'Monetize your billboard inventory and commercial screens with Di-Wrapp.';

  return constructMetadata({
    title,
    description,
    path: '/join-us',
    lang,
    ogImageAlt: lang === 'ar' ? 'انضم لشبكة شركاء Di-Wrapp' : 'Join the Di-Wrapp Media Partner Network',
  });
}

export default async function JoinUsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const joinData = (dict as any).joinUs;
  const joinHero = joinData?.hero;
  const opportunities = joinData?.opportunities;
  const metrics = joinData?.metricsBento || joinData?.metrics;
  const platformFeatures = joinData?.platformFeatures;

  return (
    <main className="flex-grow flex flex-col bg-white dark:bg-[#080808] transition-colors duration-300">
        <JoinUsHero
          lang={lang}
          badgeText={joinHero?.badge}
          titleText={joinHero?.title}
          subtitleLine1={joinHero?.subtitleLine1}
          subtitleLine2={joinHero?.subtitleLine2}
          ctaText={joinHero?.cta}
          ctaHref={`/${lang}/coming-soon`}
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
      </main>
  );
}
