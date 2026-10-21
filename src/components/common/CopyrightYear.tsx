'use client';

interface CopyrightYearProps {
  fallbackYear?: number;
}

export default function CopyrightYear({ fallbackYear = 2026 }: CopyrightYearProps) {
  const currentYear = typeof window !== 'undefined' ? new Date().getFullYear() : fallbackYear;
  return <span suppressHydrationWarning>©{currentYear}</span>;
}
