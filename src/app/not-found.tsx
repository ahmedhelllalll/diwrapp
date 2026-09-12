import './globals.css';
import './landing.css';
import { headers } from 'next/headers';
import localFont from 'next/font/local';
import { Cairo } from 'next/font/google';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import NotFoundView from '@/components/common/NotFoundView';
import { Locale } from '@/i18n-config';

const lufgaFont = localFont({
  src: [
    {
      path: '../fonts/Lufga-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Lufga-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Lufga-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-lufga',
  display: 'swap',
});

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default async function RootNotFound() {
  const headerList = await headers();
  const pathname = headerList.get('x-pathname') || '';
  const lang: Locale = pathname.startsWith('/ar') ? 'ar' : 'en';

  return (
    <html
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className={`${lufgaFont.variable} ${cairo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`min-h-full flex flex-col ${lang === 'ar' ? 'font-cairo' : 'font-lufga'}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NotFoundView lang={lang} />
        </ThemeProvider>
      </body>
    </html>
  );
}
