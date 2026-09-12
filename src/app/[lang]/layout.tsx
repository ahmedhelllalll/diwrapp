import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Geist_Mono, Cairo } from "next/font/google";
import "../globals.css";
import "@/components/layout/header.css";
import { Locale, i18n } from "../../i18n-config";
import { getDictionary } from "../../dictionaries";
import SmoothScroll from "@/components/common/SmoothScroll";
import { ThemeProvider } from "@/components/common/ThemeProvider";

const lufga = localFont({
  src: [
    {
      path: '../../../public/fonts/Lufga-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Lufga-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Lufga-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Lufga-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Lufga-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-lufga',
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return {
    title: {
      template: '%s | Diwrapp',
      default: dict.metadata.defaultTitle,
    },
    description: dict.metadata.defaultDescription,
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
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
        className={`${lufga.variable} ${cairo.variable} ${geistMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >

        <body className={`min-h-full flex flex-col ${lang === 'ar' ? 'font-cairo' : 'font-lufga'}`} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={false}
            disableTransitionOnChange
          >
            <SmoothScroll>{props.children}</SmoothScroll>
          </ThemeProvider>
        </body>
      </html>
  );
}
