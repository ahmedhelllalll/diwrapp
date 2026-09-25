'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
    <section className="min-h-screen h-screen w-full relative overflow-hidden flex flex-col justify-center items-center px-4 pt-28 pb-16 sm:px-6 lg:px-8 sm:pt-32 sm:pb-20 bg-white dark:bg-[#080808]">
      {/* 3D Room Background Image - Completely Static & Stretched to Full Viewport */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        {/* Light Mode 3D Room Graphic */}
        <Image
          src="/assets/join-background.webp"
          alt="Join Us Background"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="w-full h-full object-fill sm:object-cover object-center pointer-events-none select-none dark:hidden"
        />

        {/* Dark Mode 3D Room Graphic */}
        <Image
          src="/assets/join-background-dark.webp"
          alt="Join Us Background Dark"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="w-full h-full object-fill sm:object-cover object-center pointer-events-none select-none hidden dark:block"
        />
      </div>

      {/* Soft Ambient Radial Vignette behind center text on mobile (zero flat gray film / zero blur) */}
      <div 
        className="sm:hidden absolute inset-0 w-full h-full pointer-events-none select-none bg-[radial-gradient(ellipse_65%_45%_at_50%_50%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(ellipse_65%_45%_at_50%_50%,rgba(8,8,8,0.75)_0%,rgba(8,8,8,0)_100%)] z-[1]"
        aria-hidden="true"
      />

      {/* Central Content Container with Crisp Entry Transition */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: 'transform, opacity' }}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center w-full"
      >
        {/* Top Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EAECF0] dark:border-zinc-700/60 bg-white/90 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm mb-6 text-xs sm:text-sm font-medium text-[#344054] dark:text-zinc-300 select-none transition-all">
          <SystemRestart className="w-4 h-4 text-[#344054] dark:text-zinc-300 shrink-0" strokeWidth={1.75} />
          <span>{badgeText}</span>
        </div>

        {/* Main Heading H1 */}
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight lg:leading-[44px] tracking-[-0.01em] text-center text-slate-900 dark:text-white drop-shadow-md font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
          style={{
            letterSpacing: '-0.01em',
          }}
        >
          {titleText}
        </h1>

        {/* Subtitle / Body Content - High Contrast Drop Shadow */}
        <div className="max-w-md mx-auto mt-4 mb-8 text-sm sm:text-base leading-relaxed text-center text-zinc-600 dark:text-zinc-200 font-medium drop-shadow font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
          <p className="m-0">
            {subtitleLine1}
            {subtitleLine2 && (
              <>
                <br className="hidden sm:inline" /> {subtitleLine2}
              </>
            )}
          </p>
        </div>

        {/* CTA Button with Hover & Tap Micro-interactions */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform' }}
        >
          <Link
            href={targetHref}
            className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-blue-600 text-white font-medium px-7 py-3 rounded-full text-base transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98] cursor-pointer group"
          >
            <span>{ctaText}</span>
            <ArrowRightCircle
              className="w-5 h-5 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              strokeWidth={1.75}
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
