'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CardWallet } from 'iconoir-react';
import { motion, useReducedMotion } from 'framer-motion';

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
    <section aria-labelledby="wallet-hero-heading" className="relative w-full overflow-hidden bg-white dark:bg-surface-1 min-h-[780px] lg:h-[840px] flex flex-col justify-start transition-colors duration-300">
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
            <div className="absolute bottom-[20px] sm:bottom-[35px] left-[-15%] sm:left-[-10%] w-[130%] sm:w-[120%] h-[320px] sm:h-[400px]">
              <Image
                src="/assets/wallet-trajectory-line.webp"
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                className="object-contain pointer-events-none select-none -rotate-[3deg]"
              />
            </div>
          </div>

          {/* Top-Left Card */}
          <div className="absolute top-[75px] sm:top-[85px] left-[-28px] sm:left-[2%] w-[135px] sm:w-[195px] md:w-[245px] aspect-[360/240] z-[1]">
            <Image
              src="/assets/wallet-card-tl.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 135px, (max-width: 768px) 195px, 245px"
              className="object-contain pointer-events-none select-none drop-shadow-md"
            />
          </div>

          {/* Bottom-Left Magenta Card */}
          <div className="absolute bottom-[25px] sm:bottom-[40px] left-[-30px] sm:left-[-10px] md:left-[2%] w-[185px] sm:w-[260px] md:w-[330px] aspect-[510/265] z-[2]">
            <Image
              src="/assets/wallet-card-bl.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 185px, (max-width: 768px) 260px, 330px"
              className="object-contain pointer-events-none select-none drop-shadow-lg"
            />
          </div>

          {/* Bottom-Right Champagne + Silver Cards */}
          <div className="absolute bottom-[15px] sm:bottom-[28px] right-[-35px] sm:right-[-10px] md:right-[2%] w-[215px] sm:w-[315px] md:w-[405px] aspect-[720/355] z-[2]">
            <Image
              src="/assets/wallet-card-br.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 215px, (max-width: 768px) 315px, 405px"
              className="object-contain pointer-events-none select-none drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Layer 3: Foreground Centered Content (relative z-10) */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto px-6 flex flex-col items-center text-center pt-[180px] sm:pt-[200px] lg:pt-[240px]">
        {/* Badge */}
        <div className="hero-anim-badge inline-flex items-center gap-1.5 h-[28px] px-3.5 py-1 rounded-full border wallet-badge-hero shadow-xs backdrop-blur-sm mb-5 select-none font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-xs font-medium">
          <CardWallet aria-hidden="true" className="w-3.5 h-3.5 stroke-[1.8]" />
          <span>{renderBidiText(w?.heroBadge || 'Di_Wrapp Wallet')}</span>
        </div>

        {/* Title: 2 lines (CSS-only entrance for immediate LCP paint) */}
        <h1 id="wallet-hero-heading" className="hero-lcp-title font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[32px] sm:text-[42px] lg:text-[48px] font-semibold leading-[40px] sm:leading-[52px] lg:leading-[60px] tracking-[-0.01em] text-heading dark:text-white mb-4 max-w-[650px]">
          {renderBidiText(w?.heroTitleLine1 || 'Secure, Flexible &')}
          <br />
          {renderBidiText(w?.heroTitleLine2 || 'Instant Transactions')}
        </h1>

        {/* Subtitle: 3 lines */}
        <p className="hero-anim-subtitle font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] text-text-secondary dark:text-neutral-400 max-w-[620px] mb-10 sm:mb-14 lg:mb-24 font-normal">
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
          whileTap={{ scale: 0.98 }}
          className="hero-anim-cta"
        >
          <Link
            href={`/${lang}/signup?role=advertiser`}
            className="h-[44px] px-6 rounded-lg bg-brand hover:bg-brand-strong text-white text-[14px] font-medium leading-[20px] transition-colors shadow-xs hover:shadow-[0_4px_14px_rgba(0,102,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-1 inline-flex items-center justify-center cursor-pointer font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] active:scale-[0.98]"
          >
            {renderBidiText(w?.ctaButton || 'Top Up My Wallet')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
