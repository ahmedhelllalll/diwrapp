'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-[#080808] text-[#101828] dark:text-white font-sans text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-6 text-red-600 dark:text-red-400">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Application Error</h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 mb-8 max-w-md">
          A critical error occurred while rendering the page. Please click below to refresh.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="h-11 px-6 rounded-xl bg-[#0066FF] text-white font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          Reload application
        </button>
      </body>
    </html>
  );
}
