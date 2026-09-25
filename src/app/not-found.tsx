import './globals.css';
import './landing.css';
import localFont from 'next/font/local';
import { Cairo } from 'next/font/google';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import NotFoundView from '@/components/common/NotFoundView';

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

export default function RootNotFound() {
  return (
    <html
      lang="en"
      className={`${lufgaFont.variable} ${cairo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NotFoundView />
        </ThemeProvider>
      </body>
    </html>
  );
}
