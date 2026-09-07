import type { Metadata } from "next";
import { getDictionary } from "../../../dictionaries";
import { Locale } from "../../../i18n-config";
import LandingHeader from "@/components/layout/LandingHeader";
import Footer from "@/components/layout/Footer";

import ContactHero from "@/components/contact/ContactHero";
import ContactCardsGrid from "@/components/contact/ContactCardsGrid";
import ContactForm from "@/components/contact/ContactForm";
import NewsletterSection from "@/components/contact/NewsletterSection";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const meta = dict.metadata as any;
  const contact = (dict as any).contact;

  return {
    title: `${meta?.contact?.title || 'Contact Us'} - Di-Wrapp`,
    description: meta?.contact?.description || contact?.hero?.subtitle || "Let’s Get Connected",
  };
}

export default async function ContactPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const l = dict.landing;
  const contact = (dict as any).contact;
  const newsletter = (dict as any).newsletter;

  // Language switcher data
  const nextLang = lang === 'en' ? 'ar' : 'en';
  const langLabel = lang === 'en' ? 'عربي' : 'English';

  return (
    <div className="contact-scope">
      {/* Top Header Navigation */}
      <LandingHeader 
        lang={lang} 
        nextLang={nextLang} 
        langLabel={langLabel} 
        dictNav={l.nav} 
      />

      <main className="bg-white dark:bg-[#080808] transition-colors duration-300 flex-grow flex flex-col">
        {/* Main Content Container */}
        <div className="contact-main-container">
          {/* Hero & Breadcrumb */}
          <ContactHero
            lang={lang}
            breadcrumbHome={contact?.breadcrumb?.home}
            breadcrumbCurrent={contact?.breadcrumb?.current}
            title={contact?.hero?.title}
            subtitle={contact?.hero?.subtitle}
          />

          {/* Contact Layout: Left Cards + Right Form with Submit below baseline */}
          <ContactForm
            lang={lang}
            dict={contact?.form}
            cardsSlot={<ContactCardsGrid cards={contact?.cards} />}
          />
        </div>

        {/* Full-Width Newsletter Banner */}
        <NewsletterSection dict={newsletter} lang={lang} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
