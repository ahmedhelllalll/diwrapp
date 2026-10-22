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
  const { theme, setTheme } = useTheme();

  // Synchronously maintain class & colorScheme on documentElement before paint
  useIsomorphicLayoutEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      const root = document.documentElement;

      let effectiveTheme: 'dark' | 'light';
      if (stored === 'dark' || stored === 'light') {
        effectiveTheme = stored;
      } else {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      if (effectiveTheme === 'dark') {
        if (!root.classList.contains('dark')) {
          root.classList.add('dark');
        }
      } else {
        if (root.classList.contains('dark')) {
          root.classList.remove('dark');
        }
      }
      root.style.colorScheme = effectiveTheme;

      // Keep next-themes internal state in sync across route navigations
      if (stored === 'dark' || stored === 'light') {
        if (theme !== stored) {
          setTheme(stored);
        }
      } else {
        if (theme !== 'system') {
          setTheme('system');
        }
      }
    } catch {
      // Ignore storage access errors
    }
  }, [pathname, theme, setTheme]);

  // Real-time OS appearance listener (matchMedia 'change' event)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      try {
        const stored = localStorage.getItem('theme');
        // Only react to OS changes dynamically if user hasn't set an explicit manual override
        if (!stored || stored === 'system') {
          const root = document.documentElement;
          const isDark = 'matches' in e ? e.matches : mediaQuery.matches;

          if (isDark) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
          root.style.colorScheme = isDark ? 'dark' : 'light';

          if (theme !== 'system') {
            setTheme('system');
          }
        }
      } catch {
        // Ignore storage access errors
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else if ('addListener' in mediaQuery) {
      (mediaQuery as MediaQueryList).addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else if ('removeListener' in mediaQuery) {
        (mediaQuery as MediaQueryList).removeListener(handleChange);
      }
    };
  }, [theme, setTheme]);

  return null;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      {...props}
    >
      <ThemeSynchronizer />
      {children}
    </NextThemesProvider>
  );
}

