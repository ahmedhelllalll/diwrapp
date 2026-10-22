import './globals.css';
import type { Viewport } from 'next';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import NotFoundView from '@/components/common/NotFoundView';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootNotFound() {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <NotFoundView />
        </ThemeProvider>
      </body>
    </html>
  );
}

