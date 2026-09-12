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
    <div 
      className="contact-page-container contact-scope min-h-screen bg-white dark:bg-black transition-colors duration-300 flex flex-col justify-between" 
      lang={lang} 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <main className="flex-grow flex flex-col relative overflow-hidden">
        {/* Ambient Background Glow (Canvas Depth in Dark Mode) */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-b from-indigo-500/[0.07] via-slate-400/[0.03] to-transparent blur-3xl opacity-0 dark:opacity-100 transition-opacity duration-500" 
        />

        {/* Hero & Breadcrumb */}
        <div className="relative z-10 px-4 sm:px-6 md:px-8">
          <ContactHero
            lang={lang}
            breadcrumbHome={contact?.breadcrumb?.home}
            breadcrumbCurrent={contact?.breadcrumb?.current}
            title={contact?.hero?.title}
            subtitle={contact?.hero?.subtitle}
          />
        </div>

        {/* Bounded Desktop Layout Grid & Alignment: Left Cards + Right Form */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 w-full relative z-10 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch w-full">
            {/* Cards Column */}
            <div className="w-full h-full">
              <ContactCardsGrid cards={contact?.cards} lang={lang} />
            </div>

            {/* Form Column */}
            <div className="w-full flex flex-col justify-between">
              <ContactForm lang={lang} dict={contact?.form} />
            </div>
          </div>
        </div>

        {/* Full-Width Newsletter Banner */}
        <NewsletterSection dict={newsletter} lang={lang} />
      </main>
    </div>
  );
}
