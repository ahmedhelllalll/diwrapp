'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CardWallet } from 'iconoir-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

interface WalletHeroProps {
  lang: string;
  dict: {
    heroBadge?: string;
    heroTitleLine1?: string;
    heroTitleLine2?: string;
    heroSubtitlePart1?: string;
    heroSubtitleLine1?: string;
    heroSubtitleLine2?: string;
    heroSubtitleLine3?: string;
    heroSubtitleHighlight?: string;
    ctaButton?: string;
    heroImageAlt?: string;
    wallet?: Record<string, string | undefined>;
  };
}

const renderBidiText = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/(Di_Wrapped|Di_Wrapp|Ask_Di|\(24\/7\)|24\/7|Apple Pay|Visa|EGP|USD|SAR|AED|\bDi\b)/g);
  if (parts.length === 1) return text;
  return parts.map((part, index) => {
    if (
      part === 'Di_Wrapped' ||
      part === 'Di_Wrapp' ||
      part === 'Ask_Di' ||
      part === 'Di' ||
      part === '(24/7)' ||
      part === '24/7' ||
      part === 'Apple Pay' ||
      part === 'Visa' ||
      part === 'EGP' ||
      part === 'USD' ||
      part === 'SAR' ||
      part === 'AED'
    ) {
      return (
        <span key={index} dir="ltr" className="inline-block whitespace-nowrap">
          {part}
        </span>
      );
    }
    return part;
  });
};

export default function WalletHero({ lang, dict }: WalletHeroProps) {
  const w = (dict.wallet as typeof dict | undefined) || dict;

  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="wallet-hero-heading" className="relative w-full overflow-hidden bg-white dark:bg-surface-1 min-h-[640px] sm:min-h-[720px] lg:h-[840px] flex flex-col justify-start transition-colors duration-300">
      {/* Unified Background Layer (Full Width Cover & Responsive Dynamic Cards) */}
      <div 
        dir="ltr"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden" 
        aria-hidden="true"
      >
        {/* Desktop Synchronized Presentation (>=1024px) - Exact canonical desktop preservation */}
        <div className="hidden lg:block absolute inset-0 w-full h-full">
          {/* Layer 1: Trajectory Curve (Synchronized coordinate context) */}
          <div className="absolute inset-0 w-full h-full z-0 flex justify-center items-start">
            <div className="relative min-w-full min-h-full aspect-[1440/810]">
              <div 
                className="absolute z-0 overflow-visible dark:invert dark:opacity-60"
                style={{
                  width: '100.07%',
                  height: '57.41%',
                  top: '17.04%', // 138px / 810px
                  transform: 'rotate(-2deg)',
                  transformOrigin: 'center center',
                }}
              >
                <div
                  className="absolute"
                  style={{
                    width: '110%',
                    height: '222%',
                    left: '-5.55%',
                    top: '0px',
                  }}
                >
                  <Image 
                    src="/assets/wallet-trajectory-line.webp" 
                    alt="" 
                    aria-hidden="true"
                    fill
                    sizes="100vw"
                    className="object-contain pointer-events-none select-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Layer 2: 3D Cards Asset (wallet-hero-cards.webp) */}
          <div className="absolute inset-0 w-full h-full z-[1]">
            <Image
              src="/assets/wallet-hero-cards.webp"
              alt={w?.heroImageAlt || (lang === 'ar' ? 'عرض توضيحي لمحفظة دي-راب' : 'Di_Wrapp Wallet Visual')}
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Dynamic Responsive Multi-Screen & Mobile System (<1024px) */}
        <div className="block lg:hidden absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
          {/* Mobile Dynamic Trajectory Line */}
          <div className="absolute inset-0 w-full h-full overflow-hidden dark:invert dark:opacity-60">
            <div className="absolute bottom-[10px] sm:bottom-[25px] left-[-10%] sm:left-[-5%] w-[120%] sm:w-[110%] h-[280px] sm:h-[360px]">
              <Image
                src="/assets/wallet-trajectory-line.webp"
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                className="object-contain pointer-events-none select-none -rotate-[2deg]"
              />
            </div>
          </div>

          {/* Top-Left Card - Floating subtly in upper-left background */}
          <div className="absolute top-[85px] sm:top-[95px] left-[-18px] sm:left-[1%] w-[125px] sm:w-[175px] md:w-[225px] aspect-[360/240] z-[1] opacity-90 sm:opacity-100">
            <Image
              src="/assets/wallet-card-tl.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 125px, (max-width: 768px) 175px, 225px"
              className="object-contain pointer-events-none select-none drop-shadow-md"
            />
          </div>

          {/* Bottom-Left Magenta Card - Vibrant gradient card framing lower-left */}
          <div className="absolute bottom-[18px] sm:bottom-[32px] left-[-15px] sm:left-[0%] md:left-[2%] w-[175px] sm:w-[245px] md:w-[315px] aspect-[510/265] z-[2]">
            <Image
              src="/assets/wallet-card-bl.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 175px, (max-width: 768px) 245px, 315px"
              className="object-contain pointer-events-none select-none drop-shadow-lg"
            />
          </div>

          {/* Bottom-Right Champagne + Silver Cards - Overlapping cards framing lower-right */}
          <div className="absolute bottom-[12px] sm:bottom-[22px] right-[-18px] sm:right-[0%] md:right-[2%] w-[200px] sm:w-[290px] md:w-[380px] aspect-[720/355] z-[2]">
            <Image
              src="/assets/wallet-card-br.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 200px, (max-width: 768px) 290px, 380px"
              className="object-contain pointer-events-none select-none drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Layer 3: Foreground Centered Content (relative z-10) */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto px-5 sm:px-6 flex flex-col items-center text-center pt-[100px] sm:pt-[140px] lg:pt-[240px]">
        {/* Hero Badge */}
        <div className="hero-anim-badge flex justify-center mb-4 sm:mb-5">
          <Badge variant="outline-sm">
            <CardWallet aria-hidden="true" className="w-4 h-4 text-[#344054] dark:text-[#D4D4D8] stroke-[1.5] shrink-0" />
            <span>{renderBidiText(w?.heroBadge || 'Di_Wrapp Wallet')}</span>
          </Badge>
        </div>

        {/* Title: 2 lines (CSS-only entrance for immediate LCP paint) */}
        <h1 id="wallet-hero-heading" className="hero-lcp-title font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[30px] sm:text-[40px] lg:text-[48px] font-semibold leading-[38px] sm:leading-[50px] lg:leading-[60px] tracking-[-0.01em] text-heading dark:text-white mb-3 sm:mb-4 max-w-[650px]">
          {renderBidiText(w?.heroTitleLine1 || 'Secure, Flexible &')}
          <br />
          {renderBidiText(w?.heroTitleLine2 || 'Instant Transactions')}
        </h1>

        {/* Subtitle: 3 lines */}
        <p className="hero-anim-subtitle font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[15px] sm:text-[17px] lg:text-[18px] leading-[24px] sm:leading-[26px] lg:leading-[28px] text-text-secondary dark:text-neutral-400 max-w-[620px] mb-7 sm:mb-10 lg:mb-24 font-normal">
          {w?.heroSubtitleLine1 ? (
            <>
              {renderBidiText(w.heroSubtitleLine1)}
              <br className="hidden sm:inline" />{' '}
              {renderBidiText(w.heroSubtitleLine2)}
              <br className="hidden sm:inline" />{' '}
              {renderBidiText(w.heroSubtitleLine3)}
              <span className="font-semibold text-heading dark:text-white">
                {renderBidiText(w.heroSubtitleHighlight || 'all in one place.')}
              </span>
            </>
          ) : (
            <>
              {renderBidiText(
                w?.heroSubtitlePart1 ||
                  'The Di_Wrapp Wallet is your digital financial hub within the platform. It gives advertisers and vendors full control over transactions, top-ups, and campaign payments — '
              )}
              <span className="font-semibold text-heading dark:text-white">
                {renderBidiText(w?.heroSubtitleHighlight || 'all in one place.')}
              </span>
            </>
          )}
        </p>

        {/* CTA Button */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -2 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          className="hero-anim-cta"
        >
          <Link
            href={`/${lang}/coming-soon`}
            className="h-[44px] px-6 rounded-lg bg-brand hover:bg-brand-strong text-white text-[14px] font-medium leading-[20px] transition-colors shadow-xs hover:shadow-[0_4px_14px_rgba(0,102,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-1 inline-flex items-center justify-center cursor-pointer font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] active:scale-[0.98]"
          >
            {renderBidiText(w?.ctaButton || 'Top Up My Wallet')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
