'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Arcade, AppleImac2021, UserStar, Computer } from 'iconoir-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface OpportunitiesSectionProps {
  lang: string;
  titleLine1?: string;
  titleLine2?: string;
  cards?: {
    activation?: string;
    displays?: string;
    influencers?: string;
    digital?: string;
  };
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

const appleEasing = [0.22, 1, 0.36, 1] as const;

export default function OpportunitiesSection({
  lang,
  titleLine1 = 'Every Advertising Opportunity,',
  titleLine2 = 'One Digital Platform',
  cards = {
    activation: 'Activation Spaces',
    displays: 'Advertising Displays',
    influencers: 'Influencers',
    digital: 'Digital Channels',
  },
  description = 'Di-Wrapp simplifies operations, automates scheduling, and maximizes monetization — all while giving media owners complete visibility and control over their media assets.',
  ctaText = 'Book A Demo',
  ctaHref,
}: OpportunitiesSectionProps) {
  const targetHref = ctaHref || `/${lang}/contact`;
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const animMargin = isDesktop ? '-40px' : '0px';
  const noDelay = shouldReduceMotion || !isDesktop;

  const categoryCards = [
    {
      id: 'activation',
      label: cards?.activation || 'Activation Spaces',
      Icon: Arcade,
    },
    {
      id: 'displays',
      label: cards?.displays || 'Advertising Displays',
      Icon: AppleImac2021,
    },
    {
      id: 'influencers',
      label: cards?.influencers || 'Influencers',
      Icon: UserStar,
    },
    {
      id: 'digital',
      label: cards?.digital || 'Digital Channels',
      Icon: Computer,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#080808] transition-colors duration-300 py-16 md:py-20">
      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6 text-center">
        {/* Top Heading H2 */}
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: animMargin }}
          transition={{ duration: 0.75, ease: appleEasing }}
          className="text-[22px] sm:text-[24px] font-medium leading-[32px] tracking-[-0.01em] text-center text-[#101828] dark:text-white font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
        >
          {titleLine1}
          {titleLine2 && (
            <>
              <br />
              {titleLine2}
            </>
          )}
        </motion.h2>

        {/* 4 Interactive Category Cards with Confined Background Grid */}
        <div className="relative max-w-[1100px] mx-auto mt-10">
          {/* Confined Background Grid - Light Mode */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: animMargin }}
            transition={{ duration: 0.9, ease: appleEasing }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1140px] h-[260px] pointer-events-none select-none z-0 dark:hidden"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(16, 24, 40, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 24, 40, 0.06) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              backgroundPosition: 'center center',
              maskImage: 'radial-gradient(ellipse 75% 50% at 50% 50%, #000 70%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 75% 50% at 50% 50%, #000 70%, transparent 100%)',
            }}
            aria-hidden="true"
          />
          {/* Confined Background Grid - Dark Mode */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: animMargin }}
            transition={{ duration: 0.9, ease: appleEasing }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1140px] h-[260px] pointer-events-none select-none z-0 hidden dark:block"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              backgroundPosition: 'center center',
              maskImage: 'radial-gradient(ellipse 75% 50% at 50% 50%, #000 70%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 75% 50% at 50% 50%, #000 70%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 relative z-10">
            {categoryCards.map(({ id, label, Icon }, idx) => (
              <motion.div
                key={id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: animMargin }}
                transition={{
                  duration: 0.75,
                  delay: noDelay ? 0 : 0.08 + idx * 0.06,
                  ease: appleEasing,
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-[#0a0a0a] border border-[#EAECF0] dark:border-zinc-800 rounded-2xl px-6 py-7 flex flex-col items-center justify-center h-[128px] min-h-[120px] gap-3 hover:border-slate-300 hover:dark:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 ease-out cursor-pointer group"
              >
                <Icon
                  className="w-6 h-6 text-[#344054] dark:text-zinc-300 transition-colors duration-200 group-hover:text-[#0066FF] dark:group-hover:text-blue-400"
                  strokeWidth={1.5}
                />
                <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[17px] sm:text-[18px] leading-[26px] tracking-normal text-center text-[#101828] dark:text-white transition-colors duration-200 group-hover:text-[#0066FF] dark:group-hover:text-blue-400">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Supporting Description Paragraph */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: animMargin }}
          transition={{ duration: 0.7, delay: noDelay ? 0 : 0.35, ease: appleEasing }}
          className="max-w-[620px] mx-auto mt-10 mb-8"
        >
          <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[26px] tracking-normal text-center text-[#344054] dark:text-zinc-300 m-0">
            {description}
          </p>
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: animMargin }}
          transition={{ duration: 0.65, delay: noDelay ? 0 : 0.42, ease: appleEasing }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={targetHref}
            className="inline-flex items-center justify-center bg-[#0066FF] hover:bg-blue-600 text-white font-medium px-6 py-2.5 rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow-blue-500/25 active:scale-[0.98] cursor-pointer"
          >
            {ctaText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
