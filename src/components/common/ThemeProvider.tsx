'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return;
    }
    orig.apply(console, args);
  };
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function ThemeSynchronizer() {
  const pathname = usePathname();
  const { theme, resolvedTheme, setTheme } = useTheme();

  useIsomorphicLayoutEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      const root = document.documentElement;

      // Synchronously maintain class on documentElement before paint
      if (stored === 'dark') {
        if (!root.classList.contains('dark')) {
          root.classList.add('dark');
        }
      } else if (stored === 'light') {
        if (root.classList.contains('dark')) {
          root.classList.remove('dark');
        }
      }

      // Keep next-themes internal state in sync with localStorage across route navigations
      const currentActive = theme === 'system' ? resolvedTheme : theme;
      if (stored && stored !== currentActive) {
        setTheme(stored);
      }
    } catch {
      // Ignore storage access errors
    }
  }, [pathname, theme, resolvedTheme, setTheme]);

  return null;
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSynchronizer />
      {children}
    </NextThemesProvider>
  );
}

