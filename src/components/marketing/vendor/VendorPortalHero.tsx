'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Suitcase, ArrowRightCircle } from 'iconoir-react';

interface VendorPortalHeroProps {
  dict?: any;
  lang?: string;
}

const DEFAULT_DATA = {
  badge: 'Vendor Portal',
  title: 'Empower Your Inventory, Unlock\nNew Revenue.',
  subtitle: "Join Di_Wrapp's Smart Network",
  descriptionPrefix: 'If you own a Inventory — ',
  descriptionHighlight: 'Di_Wrapp gives you the tools to modernize, monetize, and manage with ease.',
  descriptionSuffix:
    ' Our Vendor Portal connects your channel to a smart, automated platform where brands are actively looking to book spaces like yours.',
  readMoreBtn: 'Read More',
  ctaBtn: "Let's Get Started",
};

const renderBidiText = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/(Di_Wrapp|Ask_Di|\(24\/7\)|24\/7|\bDi\b)/g);
  if (parts.length === 1) return text;
  return parts.map((part, index) => {
    if (
      part === 'Di_Wrapp' ||
      part === 'Ask_Di' ||
      part === 'Di' ||
      part === '(24/7)' ||
      part === '24/7'
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

export const VendorPortalHero: React.FC<VendorPortalHeroProps> = ({ dict, lang = 'en' }) => {
  const shouldReduceMotion = useReducedMotion();
  const d = dict?.vendorPortalHero;

  const data = {
    badge: d?.badge || DEFAULT_DATA.badge,
    title: d?.title || DEFAULT_DATA.title,
    subtitle: d?.subtitle || DEFAULT_DATA.subtitle,
    descriptionPrefix: d?.descriptionPrefix || DEFAULT_DATA.descriptionPrefix,
    descriptionHighlight: d?.descriptionHighlight || DEFAULT_DATA.descriptionHighlight,
    descriptionSuffix: d?.descriptionSuffix || DEFAULT_DATA.descriptionSuffix,
    readMoreBtn: d?.readMoreBtn || DEFAULT_DATA.readMoreBtn,
    ctaBtn: d?.ctaBtn || DEFAULT_DATA.ctaBtn,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="w-full py-14 lg:py-20 bg-transparent flex flex-col items-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={containerVariants}
        className="w-full flex flex-col items-center"
      >
        {/* ========================================================================= */}
        {/* A. Header Stack                                                           */}
        {/* ========================================================================= */}
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          {/* 1. Pill Badge (Strictly 100% Transparent) */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D0D5DD] dark:border-neutral-700 bg-transparent mb-5 select-none"
          >
            <Suitcase className="w-3.5 h-3.5 text-[#344054] dark:text-neutral-300 stroke-[1.8]" />
            <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[13px] font-medium leading-[18px] text-[#344054] dark:text-neutral-300 bg-transparent">
              {renderBidiText(data.badge)}
            </span>
          </motion.div>

          {/* 2. Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[28px] sm:text-[32px] lg:text-[36px] font-medium leading-[36px] sm:leading-[40px] lg:leading-[44px] tracking-[-1%] text-[#101828] dark:text-white max-w-[720px] whitespace-pre-line mb-3"
          >
            {renderBidiText(data.title)}
          </motion.h1>

          {/* 3. Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[16px] font-normal leading-[24px] text-[#667085] dark:text-neutral-400 mb-8"
          >
            {renderBidiText(data.subtitle)}
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* B. Visual Media Card                                                      */}
        {/* ========================================================================= */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 mb-10"
        >
          <div className="w-full relative aspect-[16/7.2] sm:aspect-[16/6.8] lg:aspect-[16/6.2] rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-sm">
            <Image
              src="/assets/vendor-portal-billboard.webp"
              alt="Vendor Portal Billboard"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1240px) 100vw, 1240px"
            />
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* C. Bottom Description & CTA Stack                                         */}
        {/* ========================================================================= */}
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          {/* Paragraph */}
          <motion.p
            variants={itemVariants}
            className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[16px] font-light leading-[25px] text-[#475467] dark:text-neutral-400 max-w-[760px] mx-auto text-center mb-8"
          >
            <span className="font-medium text-[#101828] dark:text-neutral-200">
              {renderBidiText(data.descriptionPrefix)}
            </span>
            <span>{renderBidiText(data.descriptionHighlight)}</span>
            <span>{renderBidiText(data.descriptionSuffix)}</span>
          </motion.p>

          {/* Action Buttons Container */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
          >
            {/* Read More Secondary Button */}
            <Link
              href={lang ? `/${lang}/about` : '/about'}
              className="h-[44px] px-6 rounded-[8px] border border-[#D0D5DD] dark:border-neutral-700 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 text-[#344054] dark:text-neutral-200 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium leading-[20px] transition-colors cursor-pointer inline-flex items-center justify-center active:scale-[0.98]"
            >
              {renderBidiText(data.readMoreBtn)}
            </Link>

            {/* Let's Get Started Primary Button */}
            <Link
              href={lang ? `/${lang}/join-us` : '/join-us'}
              className="h-[44px] px-6 rounded-[8px] bg-[#0066FF] hover:bg-blue-600 text-white font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium leading-[20px] inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer active:scale-[0.98]"
            >
              <span>{renderBidiText(data.ctaBtn)}</span>
              <ArrowRightCircle className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default VendorPortalHero;
