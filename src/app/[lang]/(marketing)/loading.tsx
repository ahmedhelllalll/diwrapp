import React from "react";

export default function MarketingLoading() {
  return (
    <main className="w-full flex-grow pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto animate-pulse">
      {/* Hero Rhythm Placeholder */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        {/* Pill Badge */}
        <div className="h-7 w-28 sm:w-36 rounded-full bg-[var(--card-surface)] border border-[var(--card-border)] mb-5" />
        
        {/* Hero Title Lines */}
        <div className="h-9 sm:h-12 w-4/5 max-w-xl rounded-2xl bg-[var(--card-surface)] border border-[var(--card-border)] mb-4" />
        <div className="h-7 sm:h-9 w-2/3 max-w-md rounded-xl bg-[var(--card-surface)] border border-[var(--card-border)] mb-6 opacity-80" />

        {/* Subtitle Line */}
        <div className="h-4 sm:h-5 w-3/5 max-w-sm rounded-lg bg-[var(--card-surface)] border border-[var(--card-border)] opacity-60" />
      </div>

      {/* Content Rhythm Cards Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="h-64 sm:h-80 rounded-2xl bg-[var(--card-surface)] border border-[var(--card-border)]" />
        <div className="h-64 sm:h-80 rounded-2xl bg-[var(--card-surface)] border border-[var(--card-border)]" />
        <div className="h-64 sm:h-80 rounded-2xl bg-[var(--card-surface)] border border-[var(--card-border)] md:col-span-2 lg:col-span-1" />
      </div>
    </main>
  );
}
