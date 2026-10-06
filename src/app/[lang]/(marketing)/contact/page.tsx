import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/i18n-config";
import ContactHero from "@/components/marketing/contact/ContactHero";
import ContactCardsGrid from "@/components/marketing/contact/ContactCardsGrid";
import ContactForm from "@/components/marketing/contact/ContactForm";
import NewsletterSection from "@/components/marketing/contact/NewsletterSection";
import "../../../contact.css";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const contact = dict.contact;
  const isAr = lang === 'ar';
  const title = isAr ? 'تواصل معنا | DiWrapp' : 'Contact Us | DiWrapp';
  const description =
    contact?.hero?.subtitle ||
    (isAr
      ? 'تواصل مع فريق منصة دي-راب لأي استفسار أو شراكة إعلانية أو دعم فني.'
      : 'Connect with the DiWrapp team for questions, support, or partnership inquiries.');

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/contact`,
      languages: {
        en: '/en/contact',
        ar: '/ar/contact',
        'x-default': '/en/contact',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://diwrapp.com/${lang}/contact`,
      siteName: 'DiWrapp',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ContactPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const contact = dict.contact;
  const newsletter = dict.newsletter;

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
