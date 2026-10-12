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
  const w = (dict as any)?.wallet || dict || {};

  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-surface-1 min-h-[780px] lg:h-[840px] flex flex-col justify-start transition-colors duration-300">
      {/* Unified Background Layer (Full Width Cover) */}
      <motion.div 
        dir="ltr"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden" 
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
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
              <img 
                src="/assets/wallet-trajectory-line.webp" 
                alt="" 
                aria-hidden="true"
                className="object-contain pointer-events-none select-none"
                style={{
                  position: 'absolute',
                  width: '110%',
                  height: '222%',
                  left: '-5.55%',
                  top: '0px',
                  right: '0px',
                  bottom: '0px',
                }}
              />
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
      </motion.div>

      {/* Layer 3: Foreground Centered Content (relative z-10) */}
      <motion.div 
        className="relative z-10 w-full max-w-[800px] mx-auto px-6 flex flex-col items-center text-center pt-[180px] sm:pt-[200px] lg:pt-[240px]"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.08,
            }
          }
        }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 h-[28px] px-3.5 py-1 rounded-full border border-border-200 dark:border-card-border bg-transparent text-xs font-medium text-text-secondary dark:text-neutral-300 mb-5 shadow-xs select-none font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
          <CardWallet className="w-3.5 h-3.5 text-text-secondary dark:text-neutral-300 stroke-[1.8]" />
          <span>{renderBidiText(w?.heroBadge || 'Di_Wrapp Wallet')}</span>
        </motion.div>

        {/* Title: 2 lines */}
        <motion.h1 variants={itemVariants} className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[40px] sm:text-[46px] lg:text-[48px] font-semibold leading-[52px] sm:leading-[58px] lg:leading-[60px] tracking-[-0.01em] text-heading dark:text-white mb-4 max-w-[650px]">
          {renderBidiText(w?.heroTitleLine1 || 'Secure, Flexible &')}
          <br />
          {renderBidiText(w?.heroTitleLine2 || 'Instant Transactions')}
        </motion.h1>

        {/* Subtitle: 3 lines */}
        <motion.p variants={itemVariants} className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] text-text-secondary dark:text-neutral-400 max-w-[620px] mb-24 font-normal">
          {w?.heroSubtitleLine1 ? (
            <>
              {renderBidiText(w.heroSubtitleLine1)}
              <br />
              {renderBidiText(w.heroSubtitleLine2)}
              <br />
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
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          whileHover={shouldReduceMotion ? {} : { y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={`/${lang}/signup?role=advertiser`}
            className="h-[44px] px-6 rounded-lg bg-brand hover:bg-brand-strong text-white text-[14px] font-medium leading-[20px] transition-colors shadow-xs hover:shadow-[0_4px_14px_rgba(0,102,255,0.25)] inline-flex items-center justify-center cursor-pointer font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] active:scale-[0.98]"
          >
            {renderBidiText(w?.ctaButton || 'Top Up my Wallet')}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
