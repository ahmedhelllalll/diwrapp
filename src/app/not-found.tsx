import './globals.css';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import NotFoundView from '@/components/common/NotFoundView';

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
          enableSystem={false}
          disableTransitionOnChange
        >
          <NotFoundView />
        </ThemeProvider>
      </body>
    </html>
  );
}

