'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { BrightStar, BoxIso, HardDrive, Suitcase, ArrowRightCircle } from 'iconoir-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface FeatureBadgeProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

export const FeatureBadge = ({ icon, text, className = '' }: FeatureBadgeProps) => (
  <div
    className={`inline-flex items-center h-[28px] py-1 pl-2 pr-2.5 rtl:pl-2.5 rtl:pr-2 gap-1 rounded-full border border-[var(--Border-Colors-border-secondary,#E4E7EC)] dark:border-zinc-800 bg-transparent text-xs font-medium text-[var(--Text-text-secondary,#344054)] dark:text-zinc-300 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] ${className}`}
  >
    <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
      {icon}
    </span>
    <span className="leading-none">{text}</span>
  </div>
);

interface PlatformFeaturesSectionProps {
  lang: string;
  badge?: string;
  headingPrefix?: string;
  headingSuffix?: string;
  card1?: {
    badge?: string;
    title?: string;
    description?: string;
  };
  card2?: {
    badge?: string;
    title?: string;
    description?: string;
    descriptionHighlight?: string;
  };
  card3?: {
    badge?: string;
    title?: string;
    description?: string;
  };
  ctaBanner?: {
    badge?: string;
    title?: string;
    description?: string;
    contactBtn?: string;
    getStartedBtn?: string;
  };
}

const appleEasing = [0.22, 1, 0.36, 1] as const;

export default function PlatformFeaturesSection({
  lang,
  badge = 'Platform Features',
  headingPrefix = 'Empowering Media Owners',
  headingSuffix = 'with a robust toolset that transforms their inventory.',
  card1 = {
    badge: 'Inventory Listing & Categorization',
    title: 'Manage your inventory efficiently.',
    description:
      'List and manage your inventory by categorizing them based on location, format, automation level, and availability, making it easier for brands to discover & book.',
  },
  card2 = {
    badge: 'Smart Hardware Integration "Ai-Powered"',
    title: 'Empowering vendors to seamlessly upgrade their Inventories',
    description:
      'Powered by advanced hardware and AI-integrated sensors, Di_Wrapp empowers with an embedded system that allows automated booking, scheduling, and content capabilities —',
    descriptionHighlight:
      'eliminating manual intervention and reducing the risk of human error.',
  },
  card3 = {
    badge: 'Operation Modes',
    title: 'Providing complete flexibility in how bookings are configured and managed.',
    description:
      'Assigning a unique operational mode to each media asset, Allows a tailored scheduling, dynamic availability settings, and optimized utilization based on the specific objectives of each bookings',
  },
  ctaBanner = {
    badge: 'Join Di_Wrapp Vendor Network',
    title: 'Ready to connect your Inventory and earn more?',
    description:
      'Join instantly, link your Space, set your prices, and start Monitoring Bookings',
    contactBtn: 'Contact Us',
    getStartedBtn: "Let's Get Started",
  },
}: PlatformFeaturesSectionProps) {
  const isRtl = lang === 'ar';
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const animMargin = isDesktop ? '-40px' : '0px';
  const noDelay = shouldReduceMotion || !isDesktop;

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#080808] transition-colors duration-300 py-16 md:py-24">
      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Subtle Top-Right Background Grid - Light Mode */}
        <motion.div
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: animMargin }}
          transition={{ duration: 0.9, ease: appleEasing }}
          className="absolute -top-12 -right-8 rtl:right-auto rtl:-left-8 w-[420px] h-[360px] pointer-events-none select-none -z-10 dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 24, 40, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 24, 40, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: isRtl
              ? 'radial-gradient(ellipse at 20% 20%, #000 30%, transparent 80%)'
              : 'radial-gradient(ellipse at 80% 20%, #000 30%, transparent 80%)',
            WebkitMaskImage: isRtl
              ? 'radial-gradient(ellipse at 20% 20%, #000 30%, transparent 80%)'
              : 'radial-gradient(ellipse at 80% 20%, #000 30%, transparent 80%)',
          }}
        />
        {/* Subtle Top-Right Background Grid - Dark Mode */}
        <motion.div
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: animMargin }}
          transition={{ duration: 0.9, ease: appleEasing }}
          className="absolute -top-12 -right-8 rtl:right-auto rtl:-left-8 w-[420px] h-[360px] pointer-events-none select-none -z-10 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: isRtl
              ? 'radial-gradient(ellipse at 20% 20%, #000 30%, transparent 80%)'
              : 'radial-gradient(ellipse at 80% 20%, #000 30%, transparent 80%)',
            WebkitMaskImage: isRtl
              ? 'radial-gradient(ellipse at 20% 20%, #000 30%, transparent 80%)'
              : 'radial-gradient(ellipse at 80% 20%, #000 30%, transparent 80%)',
          }}
        />
        {/* Subtle Bottom-Left Background Grid - Light Mode */}
        <motion.div
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: animMargin }}
          transition={{ duration: 0.9, ease: appleEasing }}
          className="absolute -bottom-10 -left-10 rtl:-left-auto rtl:-right-10 w-[420px] h-[360px] pointer-events-none select-none -z-10 dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 24, 40, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 24, 40, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: isRtl
              ? 'radial-gradient(ellipse at 80% 80%, #000 30%, transparent 80%)'
              : 'radial-gradient(ellipse at 20% 80%, #000 30%, transparent 80%)',
            WebkitMaskImage: isRtl
              ? 'radial-gradient(ellipse at 80% 80%, #000 30%, transparent 80%)'
              : 'radial-gradient(ellipse at 20% 80%, #000 30%, transparent 80%)',
          }}
        />
        {/* Subtle Bottom-Left Background Grid - Dark Mode */}
        <motion.div
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: animMargin }}
          transition={{ duration: 0.9, ease: appleEasing }}
          className="absolute -bottom-10 -left-10 rtl:-left-auto rtl:-right-10 w-[420px] h-[360px] pointer-events-none select-none -z-10 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: isRtl
              ? 'radial-gradient(ellipse at 80% 80%, #000 30%, transparent 80%)'
              : 'radial-gradient(ellipse at 20% 80%, #000 30%, transparent 80%)',
            WebkitMaskImage: isRtl
              ? 'radial-gradient(ellipse at 80% 80%, #000 30%, transparent 80%)'
              : 'radial-gradient(ellipse at 20% 80%, #000 30%, transparent 80%)',
          }}
        />
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -10, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: animMargin }}
            transition={{ duration: 0.65, ease: appleEasing }}
            className="inline-flex items-center h-[28px] py-1 pl-2 pr-2.5 rtl:pl-2.5 rtl:pr-2 gap-1 rounded-full border border-[var(--Border-Colors-border-secondary,#E4E7EC)] dark:border-zinc-800 bg-transparent text-xs font-medium text-[var(--Text-text-secondary,#344054)] dark:text-zinc-300 mb-4 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
          >
            <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
              <BrightStar className="w-3.5 h-3.5 text-[var(--Text-text-secondary,#344054)] dark:text-zinc-300" strokeWidth={1.5} />
            </span>
            <span className="leading-none">{badge}</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: animMargin }}
            transition={{ duration: 0.75, delay: noDelay ? 0 : 0.08, ease: appleEasing }}
            className="text-[26px] sm:text-[28px] lg:text-[32px] font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] leading-[1.3] text-center max-w-xl mx-auto"
          >
            <span className="font-semibold text-[#101828] dark:text-white">{headingPrefix} </span>
            <span className="font-normal text-[#475467] dark:text-zinc-400">{headingSuffix}</span>
          </motion.h2>
        </div>

        {/* Bento Grid Architecture (3 Feature Cards) */}
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1 (Left Tall Card — 6 Columns) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: animMargin }}
            transition={{ duration: 0.75, delay: noDelay ? 0 : 0.08, ease: appleEasing }}
            className="lg:col-span-6 bg-white dark:bg-[#0a0a0a] border border-[#EAECF0] dark:border-zinc-800 rounded-[24px] p-8 lg:p-10 flex flex-col justify-between shadow-xs relative overflow-visible hover:border-slate-300 hover:dark:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 ease-out"
          >
            <div className="flex flex-col items-start w-full relative">
              {/* Top Badge */}
              <div className="self-start relative z-20">
                <FeatureBadge
                  icon={<BoxIso className="w-3.5 h-3.5 text-[var(--Text-text-secondary,#344054)] dark:text-zinc-300" strokeWidth={1.5} />}
                  text={card1.badge || ''}
                  className="mb-4"
                />
              </div>

              {/* Inner Grey Surface Box */}
              <div className="relative w-full rounded-2xl bg-[#F2F4F7]/70 dark:bg-zinc-900/60 min-h-[420px] lg:min-h-[460px] h-[420px] lg:h-[460px] my-4 overflow-visible flex items-center justify-center">
                {/* Tablet Clipping Wrapper */}
                <div
                  className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
                  style={{ clipPath: 'inset(-300px -300px 0px -300px)' }}
                >
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: animMargin }}
                    transition={{ duration: 0.8, delay: noDelay ? 0 : 0.22, ease: appleEasing }}
                    className="w-[140%] max-w-none h-auto flex items-center justify-center"
                  >
                    <Image
                      src="/assets/join-tablet.webp"
                      alt={card1.title || 'Platform Tablet'}
                      width={960}
                      height={720}
                      sizes="(max-width: 768px) 100vw, 960px"
                      className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-xl translate-x-8 -translate-y-6 rtl:-translate-x-8"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom Copy */}
            <div className="mt-6 mb-2">
              <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-semibold text-lg text-[#101828] dark:text-white mb-2">
                {card1.title}
              </h3>
              <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-sm text-[#475467] dark:text-zinc-300 leading-relaxed m-0">
                {card1.description}
              </p>
            </div>
          </motion.div>

          {/* Right Column (Cards 2 & 3 — 6 Columns) */}
          <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
            {/* Card 2 (Top Right Card) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: animMargin }}
              transition={{ duration: 0.75, delay: noDelay ? 0 : 0.16, ease: appleEasing }}
              className="flex-1 flex flex-col justify-between items-start p-8 lg:p-10 rounded-[24px] bg-white dark:bg-[#0a0a0a] border border-[#EAECF0] dark:border-zinc-800 shadow-xs hover:border-slate-300 hover:dark:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 ease-out min-h-[280px]"
            >
              <div className="self-start">
                <FeatureBadge
                  icon={<HardDrive className="w-3.5 h-3.5 text-[var(--Text-text-secondary,#344054)] dark:text-zinc-300" strokeWidth={1.5} />}
                  text={card2.badge || ''}
                />
              </div>

              <div className="mt-8">
                <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-semibold text-xl text-[#101828] dark:text-white mb-3 leading-snug">
                  {card2.title}
                </h3>

                <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-sm text-[#475467] dark:text-zinc-300 leading-relaxed m-0">
                  {card2.description}{' '}
                  {card2.descriptionHighlight && (
                    <strong className="font-medium text-[#101828] dark:text-white">
                      {card2.descriptionHighlight}
                    </strong>
                  )}
                </p>
              </div>
            </motion.div>

            {/* Card 3 (Bottom Right Card) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: animMargin }}
              transition={{ duration: 0.75, delay: noDelay ? 0 : 0.24, ease: appleEasing }}
              className="flex-1 flex flex-col justify-between items-start p-8 lg:p-10 rounded-[24px] bg-white dark:bg-[#0a0a0a] border border-[#EAECF0] dark:border-zinc-800 shadow-xs hover:border-slate-300 hover:dark:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 ease-out min-h-[280px]"
            >
              <div className="self-start">
                <FeatureBadge
                  icon={<Suitcase className="w-3.5 h-3.5 text-[var(--Text-text-secondary,#344054)] dark:text-zinc-300" strokeWidth={1.5} />}
                  text={card3.badge || ''}
                />
              </div>

              <div className="mt-8">
                <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-semibold text-xl text-[#101828] dark:text-white mb-3 leading-snug">
                  {card3.title}
                </h3>

                <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-sm text-[#475467] dark:text-zinc-300 leading-relaxed m-0">
                  {card3.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Banner Card (Full Width CTA Banner) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: animMargin }}
          transition={{ duration: 0.75, delay: noDelay ? 0 : 0.15, ease: appleEasing }}
          className="w-full max-w-[1240px] mx-auto mt-6 bg-white dark:bg-[#0a0a0a] border border-[#EAECF0] dark:border-zinc-800 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xs hover:border-slate-300 hover:dark:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 ease-out"
        >
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center h-[28px] py-1 pl-2 pr-2.5 rtl:pl-2.5 rtl:pr-2 gap-1 rounded-full bg-[#0066FF] text-white text-xs font-medium w-fit mb-4 shadow-xs font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
              <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                <BrightStar className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
              </span>
              <span className="leading-none">{ctaBanner.badge}</span>
            </div>
            <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-semibold text-xl lg:text-[22px] text-[#101828] dark:text-white mb-2.5 leading-snug">
              {ctaBanner.title}
            </h3>
            <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-sm lg:text-[15px] text-[#475467] dark:text-zinc-300 leading-relaxed m-0">
              {ctaBanner.description}
            </p>
          </div>

          {/* Right Actions (2 Buttons) */}
          <div className="flex items-center gap-3.5 shrink-0">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href={`/${lang}/contact`}
                className="h-[44px] px-5 rounded-full border border-[#D0D5DD] dark:border-zinc-700 bg-white dark:bg-zinc-900/60 hover:bg-gray-50 dark:hover:bg-zinc-800 text-sm font-medium text-[#344054] dark:text-zinc-200 inline-flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
              >
                {ctaBanner.contactBtn}
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href={`/${lang}/signup`}
                className="h-[44px] px-5 rounded-full bg-[#0066FF] hover:bg-blue-600 text-sm font-medium text-white inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-xs hover:shadow-blue-500/25 cursor-pointer font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
              >
                <span>{ctaBanner.getStartedBtn}</span>
                <ArrowRightCircle className="w-4 h-4 rtl:rotate-180" strokeWidth={1.75} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
