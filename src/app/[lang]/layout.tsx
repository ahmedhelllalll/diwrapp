import type { Metadata } from "next";
import { Geist_Mono, Cairo } from "next/font/google";
import "../globals.css";
import { Locale, i18n } from "../../i18n-config";
import { getDictionary } from "../../dictionaries";
import SmoothScroll from "@/components/common/SmoothScroll";
import { ThemeProvider } from "@/components/common/ThemeProvider";

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
  preload: false,
});

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL('https://diwrapp.com'),
    title: {
      template: '%s | Diwrapp',
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
    }
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

  return (
      <html
        lang={lang}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        className={`${geistMono.variable} ${lang === 'ar' ? cairo.variable : ''} h-full antialiased`}
        suppressHydrationWarning
      >
        <head>
          <link
            rel="preload"
            href="/fonts/Lufga-Regular.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Lufga-Medium.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Lufga-Bold.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
        </head>
        <body className="min-h-full flex flex-col font-sans overflow-x-clip" suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <SmoothScroll>{props.children}</SmoothScroll>
          </ThemeProvider>
        </body>
      </html>
  );
}
