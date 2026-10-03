'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors
    console.error('Route error caught by boundary:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center font-['Lufga',sans-serif]">
      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-6 text-red-600 dark:text-red-400">
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white mb-3">
        Something went wrong
      </h1>
      <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-md mb-8">
        We encountered an unexpected error while loading this page. Please try again or return to the homepage.
      </p>

      <div className="flex items-center gap-4 flex-wrap justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className="h-11 px-6 rounded-xl bg-brand text-white font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer focus-visible:ring-2 focus-visible:ring-brand"
        >
          Try again
        </button>
        <Link
          href="/"
          className="h-11 px-6 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-[#101828] dark:text-white font-medium text-sm hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-brand"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
