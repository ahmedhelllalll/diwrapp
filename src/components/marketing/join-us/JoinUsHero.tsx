import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SystemRestart, ArrowRightCircle } from 'iconoir-react';

interface JoinUsHeroProps {
  lang: string;
  badgeText?: string;
  titleText?: string;
  subtitleLine1?: string;
  subtitleLine2?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function JoinUsHero({
  lang,
  badgeText = 'Designed for Control, Simplicity & Scale',
  titleText = 'Clone Yourself.',
  subtitleLine1 = 'Scale Your Expertise. Extend Your Reach.',
  subtitleLine2 = 'A Digital Marketplace that Operate Without Limits.',
  ctaText = 'Join Us Now',
  ctaHref,
}: JoinUsHeroProps) {
  const isRtl = lang === 'ar';
  const targetHref = ctaHref || `/${lang}/signup`;

  return (
    <section className="relative w-full min-h-[720px] lg:min-h-[840px] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-20">
      {/* Background Graphic: Perspective Grid + 3D Cards */}
      <Image
        src="/assets/join-background.jpg"
        alt="Join Us Background"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      />

      {/* Central Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Top Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EAECF0] dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-sm mb-6 text-xs sm:text-sm font-medium text-[#344054] dark:text-zinc-200 select-none transition-all">
          <SystemRestart className="w-4 h-4 text-[#344054] dark:text-zinc-200 shrink-0" strokeWidth={1.75} />
          <span>{badgeText}</span>
        </div>

        {/* Main Heading H1 */}
        <h1
          className="text-4xl sm:text-5xl lg:text-[64px] font-medium leading-tight lg:leading-[44px] tracking-[-0.01em] text-center text-[#101828] dark:text-white font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
          style={{
            letterSpacing: '-0.01em',
          }}
        >
          {titleText}
        </h1>

        {/* Subtitle / Body Content */}
        <div className="max-w-xl mx-auto mt-4 mb-8 text-base sm:text-[18px] leading-[28px] text-center text-[#637083] dark:text-zinc-400 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
          <p className="m-0">
            {subtitleLine1}
            {subtitleLine2 && (
              <>
                <br className="hidden sm:inline" /> {subtitleLine2}
              </>
            )}
          </p>
        </div>

        {/* CTA Button */}
        <Link
          href={targetHref}
          className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-blue-600 text-white font-medium px-7 py-3 rounded-full text-base transition-all duration-200 shadow-sm hover:shadow-blue-500/25 active:scale-[0.98] cursor-pointer group"
        >
          <span>{ctaText}</span>
          <ArrowRightCircle
            className="w-5 h-5 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            strokeWidth={1.75}
          />
        </Link>
      </div>
    </section>
  );
}
