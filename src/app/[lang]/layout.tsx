import type { Metadata } from "next";
import { Geist_Mono, Cairo } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { Locale, i18n } from "../../i18n-config";
import { getDictionary } from "../../dictionaries";
import SmoothScroll from "@/components/common/SmoothScroll";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import NavigationProgressBar from "@/components/common/NavigationProgressBar";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lufga = localFont({
  src: [
    {
      path: "../../fonts/Lufga-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Lufga-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/Lufga-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/Lufga-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-lufga",
  display: "swap",
  preload: false,
});

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL('https://diwrapp.com'),
    title: {
      template: '%s | DiWrapp',
      default: dict.metadata.defaultTitle,
    },
    description: dict.metadata.defaultDescription,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: 'https://diwrapp.com/en',
        ar: 'https://diwrapp.com/ar',
        'x-default': 'https://diwrapp.com/en',
      }
    },
    openGraph: {
      title: {
        template: '%s | DiWrapp',
        default: dict.metadata.defaultTitle,
      },
      description: dict.metadata.defaultDescription,
      url: `https://diwrapp.com/${lang}`,
      siteName: 'DiWrapp',
      locale: lang === 'ar' ? 'ar_AR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/og-banner.png',
          width: 1200,
          height: 630,
          alt: 'DiWrapp Media Network',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.defaultTitle,
      description: dict.metadata.defaultDescription,
      images: ['/images/og-banner.png'],
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const isArabic = lang === 'ar';
  const fontClasses = isArabic 
    ? `${cairo.variable} ${cairo.className}` 
    : `${lufga.variable} ${lufga.className}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://diwrapp.com/#organization',
        name: 'DiWrapp',
        url: 'https://diwrapp.com',
        logo: 'https://diwrapp.com/logo.png',
        sameAs: ['https://distin-gui.com/'],
      },
      {
        '@type': 'WebSite',
        '@id': `https://diwrapp.com/${lang}/#website`,
        url: `https://diwrapp.com/${lang}`,
        name: 'DiWrapp',
        inLanguage: lang,
        publisher: {
          '@id': 'https://diwrapp.com/#organization',
        },
      },
    ],
  };

  return (
    <html
      lang={lang}
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`${geistMono.variable} ${fontClasses} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans overflow-x-clip" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NavigationProgressBar />
          <SmoothScroll>{props.children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
