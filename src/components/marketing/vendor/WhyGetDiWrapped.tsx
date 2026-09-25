'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldQuestion,
  SquareCursor,
  Calendar,
  ReloadWindow,
  SystemRestart,
  MoneySquare,
  UserBadgeCheck,
  BrightStar,
  ArrowRightCircle,
} from 'iconoir-react';

interface WhyGetDiWrappedProps {
  dict?: any;
  lang?: string;
}

const DEFAULT_DATA = {
  topBadge: 'Why Get Di_Wrapped',
  heading: 'Get Connected. Get Booked. Get Di_Wrapped.',
  features: {
    automated: {
      title: 'Automated Booking',
      description: 'Instantly receive bookings and reduce manual coordination.',
    },
    advanced: {
      title: 'Advanced Scheduling',
      description: 'Flexible Booking management based on availability and location.',
    },
    realTime: {
      title: 'Real-Time Insights',
      description: 'Track impressions, revenue, and performance in one powerful dashboard.',
    },
    smartTech: {
      title: 'Smart Tech Integration',
      description:
        'Our system supports AI sensors and scheduling tech for better ROI and audience measurement.',
    },
    flexible: {
      title: 'Flexible Monetization Modes',
      description: 'Choose from Variaty models tailored to your setup and pricing needs.',
    },
    verified: {
      title: 'Verified Profiles',
      description: 'Get access to curated Bookings from vetted, professional brands.',
    },
  },
  ctaBanner: {
    badge: 'Join Di_Wrapp Vendor Network',
    title: 'Ready to connect your Inventory and earn more?',
    description: 'Join instantly, link your Space, set your prices, and start Monitoring Bookings',
    contactBtn: 'Contact Us',
    getStartedBtn: "Let's Get Started",
  },
};

const renderBidiText = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/(Di_Wrapped|Di_Wrapp|Ask_Di|\(24\/7\)|24\/7|\bDi\b)/g);
  if (parts.length === 1) return text;
  return parts.map((part, index) => {
    if (
      part === 'Di_Wrapped' ||
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

export const WhyGetDiWrapped: React.FC<WhyGetDiWrappedProps> = ({ dict, lang = 'en' }) => {
  const shouldReduceMotion = useReducedMotion();
  const d = dict?.whyGetDiWrapped;

  const data = {
    topBadge: d?.topBadge || DEFAULT_DATA.topBadge,
    heading: d?.heading || DEFAULT_DATA.heading,
    features: {
      automated: {
        title: d?.features?.automated?.title || DEFAULT_DATA.features.automated.title,
        description: d?.features?.automated?.description || DEFAULT_DATA.features.automated.description,
      },
      advanced: {
        title: d?.features?.advanced?.title || DEFAULT_DATA.features.advanced.title,
        description: d?.features?.advanced?.description || DEFAULT_DATA.features.advanced.description,
      },
      realTime: {
        title: d?.features?.realTime?.title || DEFAULT_DATA.features.realTime.title,
        description: d?.features?.realTime?.description || DEFAULT_DATA.features.realTime.description,
      },
      smartTech: {
        title: d?.features?.smartTech?.title || DEFAULT_DATA.features.smartTech.title,
        description: d?.features?.smartTech?.description || DEFAULT_DATA.features.smartTech.description,
      },
      flexible: {
        title: d?.features?.flexible?.title || DEFAULT_DATA.features.flexible.title,
        description: d?.features?.flexible?.description || DEFAULT_DATA.features.flexible.description,
      },
      verified: {
        title: d?.features?.verified?.title || DEFAULT_DATA.features.verified.title,
        description: d?.features?.verified?.description || DEFAULT_DATA.features.verified.description,
      },
    },
    ctaBanner: {
      badge: d?.ctaBanner?.badge || DEFAULT_DATA.ctaBanner.badge,
      title: d?.ctaBanner?.title || DEFAULT_DATA.ctaBanner.title,
      description: d?.ctaBanner?.description || DEFAULT_DATA.ctaBanner.description,
      contactBtn: d?.ctaBanner?.contactBtn || DEFAULT_DATA.ctaBanner.contactBtn,
      getStartedBtn: d?.ctaBanner?.getStartedBtn || DEFAULT_DATA.ctaBanner.getStartedBtn,
    },
  };

  const featureCards = [
    {
      id: 'automated',
      icon: SquareCursor,
      title: data.features.automated.title,
      description: data.features.automated.description,
    },
    {
      id: 'advanced',
      icon: Calendar,
      title: data.features.advanced.title,
      description: data.features.advanced.description,
    },
    {
      id: 'realTime',
      icon: ReloadWindow,
      title: data.features.realTime.title,
      description: data.features.realTime.description,
    },
    {
      id: 'smartTech',
      icon: SystemRestart,
      title: data.features.smartTech.title,
      description: data.features.smartTech.description,
    },
    {
      id: 'flexible',
      icon: MoneySquare,
      title: data.features.flexible.title,
      description: data.features.flexible.description,
    },
    {
      id: 'verified',
      icon: UserBadgeCheck,
      title: data.features.verified.title,
      description: data.features.verified.description,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
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
    <section className="w-full relative overflow-hidden py-16 lg:py-24 bg-transparent">
      {/* ========================================================================= */}
      {/* Background Grids (Top-Right & Bottom-Left)                                 */}
      {/* ========================================================================= */}
      {/* Top-Right Architectural Grid (Aligned with Cards Top) */}
      <div 
        aria-hidden="true"
        className="absolute top-[180px] lg:top-[210px] right-0 w-[380px] lg:w-[440px] h-[340px] pointer-events-none select-none z-0 opacity-45 dark:opacity-20 hidden md:block"
        style={{
          backgroundImage: `linear-gradient(to right, var(--grid-line-color, #E4E7EC) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color, #E4E7EC) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at top right, black 35%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top right, black 35%, transparent 75%)',
        }}
      />

      {/* Bottom-Left Architectural Grid (Aligned with Cards Bottom) */}
      <div 
        aria-hidden="true"
        className="absolute bottom-[200px] lg:bottom-[230px] left-0 w-[380px] lg:w-[440px] h-[340px] pointer-events-none select-none z-0 opacity-45 dark:opacity-20 hidden md:block"
        style={{
          backgroundImage: `linear-gradient(to right, var(--grid-line-color, #E4E7EC) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color, #E4E7EC) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at bottom left, black 35%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at bottom left, black 35%, transparent 75%)',
        }}
      />

      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 relative">
        {/* ========================================================================= */}
        {/* A. Header Stack                                                           */}
        {/* ========================================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
          className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-14 sm:mb-16"
        >
          {/* Pill Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#EAECF0] dark:border-neutral-800 bg-transparent mb-5 select-none"
          >
            <ShieldQuestion className="w-3.5 h-3.5 text-[#667085] dark:text-neutral-400 stroke-[1.8]" />
            <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[13px] font-medium text-[#667085] dark:text-neutral-400">
              {renderBidiText(data.topBadge)}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[24px] sm:text-[30px] lg:text-[32px] font-medium leading-[1.2] tracking-[-0.01em] text-[#101828] dark:text-white max-w-[700px] mx-auto"
          >
            {renderBidiText(data.heading)}
          </motion.h2>
        </motion.div>

        {/* ========================================================================= */}
        {/* B. 6-Card Features Grid                                                   */}
        {/* ========================================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {featureCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                transition={{ duration: 0.2 }}
                className="w-full rounded-[16px] border border-[#EAECF0] dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-6 sm:p-7 flex flex-col justify-start items-start text-left rtl:text-right shadow-xs hover:shadow-md transition-all duration-300 relative z-10"
              >
                <div className="w-10 h-10 rounded-[10px] border border-[#EAECF0] dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center mb-4 shrink-0">
                  <IconComponent className="w-5 h-5 text-[#101828] dark:text-white stroke-[1.8]" />
                </div>
                <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[17px] sm:text-[18px] font-medium leading-[26px] text-[#101828] dark:text-white mb-2">
                  {renderBidiText(card.title)}
                </h3>
                <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal leading-[22px] text-[#475467] dark:text-neutral-400">
                  {renderBidiText(card.description)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ========================================================================= */}
        {/* C. CTA Banner (Integrated Row)                                            */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1240px] mx-auto rounded-[16px] border border-[#EAECF0] dark:border-neutral-800 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xs relative z-10"
        >
          {/* Content Stack (Left) */}
          <div className="flex flex-col items-start text-left rtl:text-right">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF] mb-4 select-none">
              <BrightStar className="w-3.5 h-3.5 text-white stroke-[1.8]" />
              <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[12px] font-medium text-white">
                {renderBidiText(data.ctaBanner.badge)}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] font-medium leading-[28px] text-[#101828] dark:text-white mb-1.5">
              {renderBidiText(data.ctaBanner.title)}
            </h3>

            {/* Description */}
            <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal leading-[20px] text-[#475467] dark:text-neutral-400 max-w-[620px]">
              {renderBidiText(data.ctaBanner.description)}
            </p>
          </div>

          {/* Buttons Stack (Right) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 shrink-0 w-full sm:w-auto">
            {/* Contact Us */}
            <Link
              href={lang ? `/${lang}/contact` : '/contact'}
              className="h-[40px] px-6 rounded-[8px] border border-[#EAECF0] dark:border-neutral-700 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#344054] dark:text-neutral-200 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium leading-[20px] transition-colors cursor-pointer inline-flex items-center justify-center active:scale-[0.98]"
            >
              {renderBidiText(data.ctaBanner.contactBtn)}
            </Link>

            {/* Let's Get Started */}
            <Link
              href={lang ? `/${lang}/join-us` : '/join-us'}
              className="h-[40px] px-6 rounded-[8px] bg-[#0066FF] hover:bg-blue-600 text-white font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium leading-[20px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <span>{renderBidiText(data.ctaBanner.getStartedBtn)}</span>
              <ArrowRightCircle className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyGetDiWrapped;
