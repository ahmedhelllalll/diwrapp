import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/i18n-config";
import ContactHero from "@/components/marketing/contact/ContactHero";
import ContactCardsGrid from "@/components/marketing/contact/ContactCardsGrid";
import ContactForm from "@/components/marketing/contact/ContactForm";
import NewsletterSection from "@/components/marketing/contact/NewsletterSection";
import "@/app/contact.css";

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
  const contact = (dict as any).contact;
  const newsletter = (dict as any).newsletter;

  return (
    <div className="contact-scope contact-page-container" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <main className="bg-white dark:bg-[#080808] transition-colors duration-300 flex-grow flex flex-col relative overflow-hidden">
        {/* Ambient Background Glow (Canvas Depth in Dark Mode) */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-b from-indigo-500/[0.07] via-slate-400/[0.03] to-transparent blur-3xl opacity-0 dark:opacity-100 transition-opacity duration-500" 
        />

        {/* Main Content Container */}
        <div className="contact-main-container relative z-10 px-4 sm:px-6 md:px-8">
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
    </div>
  );
}
