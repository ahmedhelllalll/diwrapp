import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/i18n-config";
import "../../../advertise.css";
import AdvertiseHeroSection from "@/components/marketing/advertise/AdvertiseHeroSection";
import FeatureBentoGrid from "@/components/marketing/advertise/FeatureBentoGrid";
import AiCarouselSection from "@/components/marketing/advertise/AiCarouselSection";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const adv = dict.advertise as any;
  const meta = dict.metadata as any;

  return {
    title: meta?.advertise?.title || 'Advertise',
    description: meta?.advertise?.description || `${adv?.heroTitleLight} ${adv?.heroTitleBold}`,
    alternates: {
      canonical: `/${lang}/advertise`,
      languages: {
        en: '/en/advertise',
        ar: '/ar/advertise',
        'x-default': '/en/advertise',
      },
    },
  };
}

export default async function AdvertisePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const adv = dict.advertise as any;

  return (
    <div className="advertise-scope">
      <main className="bg-[var(--background)] dark:bg-[var(--surface-1)] transition-colors duration-300 flex-grow">
        <div className="advertise-container">
          {/* Hero, Banner Image & Feature Header Section */}
          <AdvertiseHeroSection lang={lang} dict={adv} />

          {/* Feature Bento Grid Showcase */}
          <FeatureBentoGrid dict={adv?.bento} />

          {/* Wrapp AI Showcase Section */}
          <AiCarouselSection slides={adv?.aiCarousel?.slides} />
        </div>
      </main>
    </div>
  );
}
