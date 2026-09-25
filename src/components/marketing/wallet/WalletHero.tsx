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
  };
}

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
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#080808] min-h-[780px] lg:h-[840px] flex flex-col justify-start transition-colors duration-300">
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
            alt="Di_Wrapp Wallet Visual"
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
        <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 h-[28px] px-3.5 py-1 rounded-full border border-[#E4E7EC] dark:border-neutral-800 bg-transparent text-xs font-medium text-[#344054] dark:text-neutral-300 mb-5 shadow-xs select-none">
          <CardWallet className="w-3.5 h-3.5 text-[#344054] dark:text-neutral-300" strokeWidth={1.5} />
          <span>{w?.heroBadge || 'Di_Wrapp Wallet'}</span>
        </motion.div>

        {/* Title: 2 lines */}
        <motion.h1 variants={itemVariants} className="text-[40px] sm:text-[46px] lg:text-[48px] font-semibold leading-[52px] sm:leading-[58px] lg:leading-[60px] tracking-[-0.01em] text-[#101828] dark:text-white mb-4 max-w-[650px]">
          {w?.heroTitleLine1 || 'Secure, Flexible &'}
          <br />
          {w?.heroTitleLine2 || 'Instant Transactions'}
        </motion.h1>

        {/* Subtitle: 3 lines */}
        <motion.p variants={itemVariants} className="text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] text-[#667085] dark:text-neutral-400 max-w-[620px] mb-24 font-normal">
          {w?.heroSubtitleLine1 ? (
            <>
              {w.heroSubtitleLine1}
              <br />
              {w.heroSubtitleLine2}
              <br />
              {w.heroSubtitleLine3}
              <span className="font-semibold text-[#101828] dark:text-white">
                {w.heroSubtitleHighlight || 'all in one place.'}
              </span>
            </>
          ) : (
            <>
              {w?.heroSubtitlePart1 ||
                'The Di_Wrapp Wallet is your digital financial hub within the platform. It gives advertisers and vendors full control over transactions, top-ups, and campaign payments — '}
              <span className="font-semibold text-[#101828] dark:text-white">
                {w?.heroSubtitleHighlight || 'all in one place.'}
              </span>
            </>
          )}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            href={`/${lang}/signup?role=advertiser`}
            className="h-[44px] px-6 rounded-[8px] bg-[#0066FF] hover:bg-blue-600 text-white text-[14px] font-medium leading-[20px] transition-colors shadow-xs hover:shadow-[0_4px_14px_rgba(0,102,255,0.3)] inline-flex items-center justify-center cursor-pointer"
          >
            {w?.ctaButton || 'Top Up my Wallet'}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
