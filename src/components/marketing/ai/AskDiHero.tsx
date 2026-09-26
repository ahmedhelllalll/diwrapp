'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Internet, Flare, StatsUpSquare, DesignNib } from 'iconoir-react';

export interface AskDiHeroDict {
  badge?: string;
  titleBold?: string;
  titleRegular?: string;
  subtitleNormal?: string;
  subtitleBold?: string;
  ctaButton?: string;
  cards?: {
    bookingAssistant?: {
      title?: string;
      description?: string;
    };
    campaignResults?: {
      title?: string;
      description?: string;
    };
    startDesigning?: {
      title?: string;
      description?: string;
    };
  };
}

interface AskDiHeroProps {
  dict?: {
    askDiHero?: AskDiHeroDict;
    [key: string]: any;
  };
  lang?: string;
}

const DEFAULT_DATA: AskDiHeroDict = {
  badge: 'Integrated Across the Platform',
  titleBold: 'Just Ask_Di” — ',
  titleRegular: 'and she’ll take care of the rest.',
  subtitleNormal:
    "Whether you're booking a single screen or managing a network, Ask_Di is always active — ",
  subtitleBold: 'working alongside your team 24/7.',
  ctaButton: 'Try Ask_Di',
  cards: {
    bookingAssistant: {
      title: 'Smart Booking Assistant',
      description:
        'Ready to launch a campaign? Ask_Di handles the setup — you just confirm and go live.',
    },
    campaignResults: {
      title: 'View Campaign Results',
      description:
        'Instantly access reports, screen activity, visual insights and performance metrics.',
    },
    startDesigning: {
      title: 'Start Designing Ad',
      description:
        'Our AI-powered help you create your ad. Or get connected with a creative agency.',
    },
  },
};

const renderBidiText = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/(Ask_Di|\(24\/7\)|24\/7|\bDi\b)/g);
  if (parts.length === 1) return text;
  return parts.map((part, index) => {
    if (part === 'Ask_Di' || part === 'Di' || part === '(24/7)' || part === '24/7') {
      return (
        <span key={index} dir="ltr" className="inline-block whitespace-nowrap">
          {part}
        </span>
      );
    }
    return part;
  });
};

export const AskDiHero: React.FC<AskDiHeroProps> = ({ dict, lang = 'en' }) => {
  const shouldReduceMotion = useReducedMotion();

  const d = dict?.askDiHero;
  const data: AskDiHeroDict = {
    badge: d?.badge || DEFAULT_DATA.badge,
    titleBold: d?.titleBold || DEFAULT_DATA.titleBold,
    titleRegular: d?.titleRegular || DEFAULT_DATA.titleRegular,
    subtitleNormal: d?.subtitleNormal || DEFAULT_DATA.subtitleNormal,
    subtitleBold: d?.subtitleBold || DEFAULT_DATA.subtitleBold,
    ctaButton: d?.ctaButton || DEFAULT_DATA.ctaButton,
    cards: {
      bookingAssistant: {
        title: d?.cards?.bookingAssistant?.title || DEFAULT_DATA.cards!.bookingAssistant!.title,
        description:
          d?.cards?.bookingAssistant?.description ||
          DEFAULT_DATA.cards!.bookingAssistant!.description,
      },
      campaignResults: {
        title: d?.cards?.campaignResults?.title || DEFAULT_DATA.cards!.campaignResults!.title,
        description:
          d?.cards?.campaignResults?.description ||
          DEFAULT_DATA.cards!.campaignResults!.description,
      },
      startDesigning: {
        title: d?.cards?.startDesigning?.title || DEFAULT_DATA.cards!.startDesigning!.title,
        description:
          d?.cards?.startDesigning?.description || DEFAULT_DATA.cards!.startDesigning!.description,
      },
    },
  };

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const hoverCardAnimation = shouldReduceMotion
    ? {}
    : {
        whileHover: {
          y: -4,
          boxShadow: '0 20px 40px -12px rgba(16, 24, 40, 0.12)',
        },
        transition: { duration: 0.2 },
      };

  return (
    <section className="w-full bg-white dark:bg-[#080808] transition-colors duration-300 py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* ========================================================================= */}
        {/* A. Header Stack                                                           */}
        {/* ========================================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
          className="flex flex-col items-center text-center max-w-[840px] mx-auto"
        >
          {/* Pill Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E7EC] dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 py-1 mb-6 shadow-2xs select-none"
          >
            <Internet className="w-4 h-4 text-[#344054] dark:text-neutral-300 stroke-[1.8]" />
            <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] leading-[20px] font-medium text-[#344054] dark:text-neutral-300">
              {data.badge}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[34px] sm:text-[42px] lg:text-[48px] leading-[44px] sm:leading-[52px] lg:leading-[60px] tracking-[-0.01em] text-center mb-6"
          >
            <span className="font-semibold text-[#101828] dark:text-white">
              {renderBidiText(data.titleBold)}
            </span>
            <span className="font-normal text-[#101828] dark:text-white">
              {renderBidiText(data.titleRegular)}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] text-[#475467] dark:text-neutral-400 max-w-[780px] mx-auto text-center mb-8"
          >
            <span>{renderBidiText(data.subtitleNormal)}</span>{' '}
            <span className="font-semibold text-[#101828] dark:text-white">
              {renderBidiText(data.subtitleBold)}
            </span>
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Link
              href={lang ? `/${lang}/join-us` : '/join-us'}
              className="h-[44px] px-6 rounded-[8px] bg-[#0066FF] hover:bg-blue-600 text-white font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium leading-[20px] shadow-xs transition-all duration-200 inline-flex items-center justify-center cursor-pointer active:scale-[0.98]"
            >
              {renderBidiText(data.ctaButton)}
            </Link>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* B. Visual Composition & Device Stage                                      */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[1200px] mx-auto mt-12 sm:mt-16 lg:mt-20 min-h-[460px] sm:min-h-[560px] lg:min-h-[640px] flex items-center justify-center"
        >
          {/* 1. Center Tablet Mockup (Back Layer - z-[2]) */}
          <div className="w-[88%] sm:w-[80%] lg:w-[55%] max-w-[720px] mx-auto relative z-[2] select-none pointer-events-none -translate-x-4 sm:-translate-x-8 lg:-translate-x-[70px] transition-transform duration-300">
            <Image
              src="/assets/ask-di-tablet-mockup.webp"
              alt="Ask_Di Tablet Interface Mockup"
              width={2420}
              height={1689}
              priority
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 80vw, 720px"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* 2. Angled Mobile Mockup (Front Overlap Layer - z-[4]) */}
          <div className="absolute right-[14%] lg:right-[18%] bottom-[24px] sm:bottom-[48px] lg:bottom-[76px] w-[34%] sm:w-[30%] lg:w-[28%] max-w-[340px] z-[4] select-none pointer-events-none transition-all duration-300">
            <Image
              src="/assets/ask-di-mobile-mockup.webp"
              alt="Ask_Di Mobile Interface Mockup"
              width={1386}
              height={1736}
              priority
              sizes="(max-width: 640px) 34vw, (max-width: 1024px) 30vw, 340px"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* 3. Floating Feature Cards (Desktop >= lg, Absolute Placement) */}

          {/* Card 1: Smart Booking Assistant (Top-Left, z-[1] Behind Tablet) */}
          <motion.div
            {...hoverCardAnimation}
            className="hidden lg:flex flex-col justify-between items-start w-[347px] max-w-[347px] min-h-[200px] absolute -left-4 lg:-left-8 top-[1%] lg:top-[2%] z-[1] rounded-[20px] border-2 border-[#EAECF0] dark:border-neutral-800 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md pt-6 px-6 pb-8 shadow-[0_12px_32px_-8px_rgba(16,24,40,0.08)] text-left rtl:text-right gap-6"
          >
            <div className="w-10 h-10 rounded-[10px] border border-[#EAECF0] dark:border-neutral-700 bg-transparent flex items-center justify-center shrink-0">
              <Flare className="w-5 h-5 text-[#101828] dark:text-white stroke-[1.8]" />
            </div>
            <div className="w-full">
              <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] font-semibold text-[#101828] dark:text-white mb-1.5">
                {renderBidiText(data.cards?.bookingAssistant?.title)}
              </h3>
              <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal leading-[20px] text-[#667085] dark:text-neutral-400">
                {renderBidiText(data.cards?.bookingAssistant?.description)}
              </p>
            </div>
          </motion.div>

          {/* Card 2: View Campaign Results (Bottom-Left, z-[5]) */}
          <motion.div
            {...hoverCardAnimation}
            className="hidden lg:flex flex-col justify-between items-start w-[347px] max-w-[347px] min-h-[200px] absolute left-[5%] lg:left-[12%] bottom-[-8px] lg:bottom-[-22px] z-[5] rounded-[20px] border-2 border-[#EAECF0] dark:border-neutral-800 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md pt-6 px-6 pb-8 shadow-[0_12px_32px_-8px_rgba(16,24,40,0.08)] text-left rtl:text-right gap-6"
          >
            <div className="w-10 h-10 rounded-[10px] border border-[#EAECF0] dark:border-neutral-700 bg-transparent flex items-center justify-center shrink-0">
              <StatsUpSquare className="w-5 h-5 text-[#101828] dark:text-white stroke-[1.8]" />
            </div>
            <div className="w-full">
              <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] font-semibold text-[#101828] dark:text-white mb-1.5">
                {renderBidiText(data.cards?.campaignResults?.title)}
              </h3>
              <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal leading-[20px] text-[#667085] dark:text-neutral-400">
                {renderBidiText(data.cards?.campaignResults?.description)}
              </p>
            </div>
          </motion.div>

          {/* Card 3: Start Designing Ad (Mid-Right, z-[5]) */}
          <motion.div
            {...hoverCardAnimation}
            className="hidden lg:flex flex-col justify-between items-start w-[347px] max-w-[347px] min-h-[200px] absolute right-0 lg:-right-4 top-[24%] lg:top-[26%] z-[5] rounded-[20px] border-2 border-[#EAECF0] dark:border-neutral-800 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md pt-6 px-6 pb-8 shadow-[0_12px_32px_-8px_rgba(16,24,40,0.08)] text-left rtl:text-right gap-6"
          >
            <div className="w-10 h-10 rounded-[10px] border border-[#EAECF0] dark:border-neutral-700 bg-transparent flex items-center justify-center shrink-0">
              <DesignNib className="w-5 h-5 text-[#101828] dark:text-white stroke-[1.8]" />
            </div>
            <div className="w-full">
              <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] font-semibold text-[#101828] dark:text-white mb-1.5">
                {renderBidiText(data.cards?.startDesigning?.title)}
              </h3>
              <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal leading-[20px] text-[#667085] dark:text-neutral-400">
                {renderBidiText(data.cards?.startDesigning?.description)}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* Mobile / Tablet Responsive Grid (< lg screens)                            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 w-full max-w-[1100px] lg:hidden">
          {/* Mobile Card 1 */}
          <motion.div
            {...hoverCardAnimation}
            className="flex flex-col justify-between items-start w-full min-h-[200px] rounded-[20px] border-2 border-[#EAECF0] dark:border-neutral-800 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md pt-6 px-6 pb-8 shadow-[0_8px_24px_-4px_rgba(16,24,40,0.06)] text-left rtl:text-right gap-6"
          >
            <div className="w-10 h-10 rounded-[10px] border border-[#EAECF0] dark:border-neutral-700 bg-transparent flex items-center justify-center shrink-0">
              <Flare className="w-5 h-5 text-[#101828] dark:text-white stroke-[1.8]" />
            </div>
            <div className="w-full">
              <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] font-semibold text-[#101828] dark:text-white mb-1.5">
                {renderBidiText(data.cards?.bookingAssistant?.title)}
              </h3>
              <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal leading-[20px] text-[#667085] dark:text-neutral-400">
                {renderBidiText(data.cards?.bookingAssistant?.description)}
              </p>
            </div>
          </motion.div>

          {/* Mobile Card 2 */}
          <motion.div
            {...hoverCardAnimation}
            className="flex flex-col justify-between items-start w-full min-h-[200px] rounded-[20px] border-2 border-[#EAECF0] dark:border-neutral-800 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md pt-6 px-6 pb-8 shadow-[0_8px_24px_-4px_rgba(16,24,40,0.06)] text-left rtl:text-right gap-6"
          >
            <div className="w-10 h-10 rounded-[10px] border border-[#EAECF0] dark:border-neutral-700 bg-transparent flex items-center justify-center shrink-0">
              <StatsUpSquare className="w-5 h-5 text-[#101828] dark:text-white stroke-[1.8]" />
            </div>
            <div className="w-full">
              <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] font-semibold text-[#101828] dark:text-white mb-1.5">
                {renderBidiText(data.cards?.campaignResults?.title)}
              </h3>
              <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal leading-[20px] text-[#667085] dark:text-neutral-400">
                {renderBidiText(data.cards?.campaignResults?.description)}
              </p>
            </div>
          </motion.div>

          {/* Mobile Card 3 */}
          <motion.div
            {...hoverCardAnimation}
            className="flex flex-col justify-between items-start w-full min-h-[200px] rounded-[20px] border-2 border-[#EAECF0] dark:border-neutral-800 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md pt-6 px-6 pb-8 shadow-[0_8px_24px_-4px_rgba(16,24,40,0.06)] text-left rtl:text-right sm:col-span-2 md:col-span-1 gap-6"
          >
            <div className="w-10 h-10 rounded-[10px] border border-[#EAECF0] dark:border-neutral-700 bg-transparent flex items-center justify-center shrink-0">
              <DesignNib className="w-5 h-5 text-[#101828] dark:text-white stroke-[1.8]" />
            </div>
            <div className="w-full">
              <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] font-semibold text-[#101828] dark:text-white mb-1.5">
                {renderBidiText(data.cards?.startDesigning?.title)}
              </h3>
              <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal leading-[20px] text-[#667085] dark:text-neutral-400">
                {renderBidiText(data.cards?.startDesigning?.description)}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AskDiHero;
