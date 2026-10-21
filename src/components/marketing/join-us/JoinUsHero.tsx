'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { SystemRestart, ArrowRightCircle } from 'iconoir-react';
import { Badge } from '@/components/ui/Badge';

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
  const targetHref = ctaHref || `/${lang}/coming-soon`;

  const shouldReduceMotion = useReducedMotion();
  const appleEasing = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="join-us-hero" className="min-h-[100dvh] w-full relative overflow-hidden flex flex-col justify-center items-center px-4 pt-24 pb-12 sm:px-6 lg:px-8 sm:pt-32 sm:pb-20 bg-white dark:bg-[#080808]">
      {/* 3D Room Background Image - Preserves natural aspect ratio without stretching */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        {/* Light Mode 3D Room Graphic */}
        <Image
          src="/assets/join-background.webp"
          alt="Join Us Background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="w-full h-full object-cover object-center pointer-events-none select-none transform-gpu [image-rendering:-webkit-optimize-contrast] dark:hidden"
        />

        {/* Dark Mode 3D Room Graphic */}
        <Image
          src="/assets/join-background-dark.webp"
          alt="Join Us Background Dark"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="w-full h-full object-cover object-center pointer-events-none select-none transform-gpu [image-rendering:-webkit-optimize-contrast] hidden dark:block"
        />
      </div>

      {/* Soft Ambient Radial Vignette behind center text on mobile (zero flat gray film / zero blur) */}
      <div 
        className="sm:hidden absolute inset-0 w-full h-full pointer-events-none select-none bg-[radial-gradient(ellipse_65%_45%_at_50%_50%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(ellipse_65%_45%_at_50%_50%,rgba(8,8,8,0.75)_0%,rgba(8,8,8,0)_100%)] z-[1]"
        aria-hidden="true"
      />

      {/* Bottom Fade Gradient for Smooth Theme-Aware Transition into Next Section */}
      <div 
        className="absolute bottom-0 inset-x-0 w-full h-36 sm:h-48 md:h-60 lg:h-72 pointer-events-none select-none z-[4] bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#080808] dark:via-[#080808]/85 dark:to-transparent"
        aria-hidden="true"
      />

      {/* Central Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center w-full">
        {/* Top Hero Badge */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.08, ease: appleEasing }}
          className="mb-6 flex justify-center"
        >
          <Badge variant="outline-sm">
            <SystemRestart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#344054] dark:text-[#D4D4D8] shrink-0" strokeWidth={1.5} />
            <span className="whitespace-nowrap">{badgeText}</span>
          </Badge>
        </motion.div>

        {/* Main Heading H1 */}
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: appleEasing }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight lg:leading-[1.15] tracking-[-0.01em] text-center text-[#101828] dark:text-white drop-shadow-md font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
          style={{
            letterSpacing: '-0.01em',
          }}
        >
          {titleText}
        </motion.h1>

        {/* Subtitle / Body Content - High Contrast Drop Shadow */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: appleEasing }}
          className="max-w-md mx-auto mt-4 mb-8 text-sm sm:text-base leading-relaxed text-center text-[#344054] dark:text-zinc-300 font-medium drop-shadow font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
        >
          <p className="m-0">
            {subtitleLine1}
            {subtitleLine2 && (
              <>
                <br className="hidden sm:inline" /> {subtitleLine2}
              </>
            )}
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.3, ease: appleEasing }}
        >
          <Link
            href={targetHref}
            className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-blue-600 text-white font-medium px-7 py-3 rounded-full text-base transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35 active:scale-[0.98] cursor-pointer group"
          >
            <span>{ctaText}</span>
            <ArrowRightCircle
              className="w-5 h-5 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              strokeWidth={1.75}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
