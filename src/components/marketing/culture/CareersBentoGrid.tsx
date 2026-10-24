'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { UserPlus } from 'iconoir-react';
import { Badge } from '@/components/ui/Badge';

export interface CareersSectionData {
  innovativeWork?: {
    title: string;
    description: string;
  };
  aiTech?: {
    title: string;
    description: string;
  };
  globalVision?: {
    title: string;
    description: string;
  };
  cta?: {
    badge: string;
    title: string;
    description: string;
    button: string;
  };
}

interface CareersBentoGridProps {
  dict?: {
    careersSection?: CareersSectionData;
  };
  lang?: string;
}

const DEFAULT_DATA: CareersSectionData = {
  innovativeWork: {
    title: 'Innovative Work',
    description: "You're part of creating real-world tech with real-world impact.",
  },
  aiTech: {
    title: 'AI & Tech-First:',
    description: 'Build and work with cutting-edge tools that redefine industries.',
  },
  globalVision: {
    title: 'Global Vision:',
    description:
      'Join the big goals and a growing footprint. Where learning & leadership opportunities at every stage.',
  },
  cta: {
    badge: 'Build With Us',
    title: 'Ready to take your career to the next level?',
    description:
      "Explore our open roles or reach out to share your story — we're always looking for passionate, talented minds.",
    button: 'View Careers',
  },
};

export const CareersBentoGrid: React.FC<CareersBentoGridProps> = ({ dict, lang = 'en' }) => {
  const shouldReduceMotion = useReducedMotion();

  const data: CareersSectionData = {
    innovativeWork: {
      title: dict?.careersSection?.innovativeWork?.title || DEFAULT_DATA.innovativeWork!.title,
      description:
        dict?.careersSection?.innovativeWork?.description ||
        DEFAULT_DATA.innovativeWork!.description,
    },
    aiTech: {
      title: dict?.careersSection?.aiTech?.title || DEFAULT_DATA.aiTech!.title,
      description: dict?.careersSection?.aiTech?.description || DEFAULT_DATA.aiTech!.description,
    },
    globalVision: {
      title: dict?.careersSection?.globalVision?.title || DEFAULT_DATA.globalVision!.title,
      description:
        dict?.careersSection?.globalVision?.description || DEFAULT_DATA.globalVision!.description,
    },
    cta: {
      badge: dict?.careersSection?.cta?.badge || DEFAULT_DATA.cta!.badge,
      title: dict?.careersSection?.cta?.title || DEFAULT_DATA.cta!.title,
      description: dict?.careersSection?.cta?.description || DEFAULT_DATA.cta!.description,
      button: dict?.careersSection?.cta?.button || DEFAULT_DATA.cta!.button,
    },
  };

  const isRtl = lang === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  // 1. Text cards: subtle upward entrance
  const textCardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // 2. Visual image cards: subtle scale bloom
  const imageCardVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.46,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // 3. Wide office interior card: subtle horizontal slide from layout start (mirrored in RTL)
  const officeCardVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : (isRtl ? 16 : -16) },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.48,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // 4. CTA Action card: subtle horizontal slide from layout end (mirrored in RTL)
  const ctaCardVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : (isRtl ? -16 : 16) },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.48,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="w-full bg-white dark:bg-surface-1 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {/* ============================================================ */}
          {/* ROW 1                                                         */}
          {/* ============================================================ */}

          {/* Card 1: Text Card (Innovative Work) */}
          <motion.div
            variants={textCardVariants}
            whileHover={shouldReduceMotion ? undefined : 'hover'}
            className="group rounded-[28px] lg:rounded-[32px] bg-white dark:bg-surface-2 border border-[#EAECF0] dark:border-[#27272A] p-8 sm:p-10 flex flex-col items-center justify-center text-center min-h-[300px] lg:min-h-[340px] transition-[border-color,box-shadow] duration-300 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]"
          >
            <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[20px] font-medium leading-[28px] text-heading dark:text-white text-center mb-2">
              {data.innovativeWork?.title}
            </h3>
            <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] font-normal leading-[25px] text-text-tertiary dark:text-neutral-400 text-center max-w-[280px]">
              {data.innovativeWork?.description}
            </p>
          </motion.div>

          {/* Card 2: Image Card (Blue Neon Glasses Visual) */}
          <motion.div
            variants={imageCardVariants}
            whileHover={shouldReduceMotion ? undefined : 'hover'}
            className="group relative overflow-hidden rounded-[28px] lg:rounded-[32px] border border-[#EAECF0] dark:border-[#27272A] bg-surface-2 min-h-[300px] lg:min-h-[340px] transition-[border-color,box-shadow] duration-300 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="/assets/culture-card-tech.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          </motion.div>

          {/* Card 3: Text Card (AI & Tech-First) */}
          <motion.div
            variants={textCardVariants}
            whileHover={shouldReduceMotion ? undefined : 'hover'}
            className="group rounded-[28px] lg:rounded-[32px] bg-white dark:bg-surface-2 border border-[#EAECF0] dark:border-[#27272A] p-8 sm:p-10 flex flex-col items-center justify-center text-center min-h-[300px] lg:min-h-[340px] transition-[border-color,box-shadow] duration-300 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]"
          >
            <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[20px] font-medium leading-[28px] text-heading dark:text-white text-center mb-2">
              {data.aiTech?.title}
            </h3>
            <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] font-normal leading-[25px] text-text-tertiary dark:text-neutral-400 text-center max-w-[280px]">
              {data.aiTech?.description}
            </p>
          </motion.div>

          {/* ============================================================ */}
          {/* ROW 2                                                         */}
          {/* ============================================================ */}

          {/* Card 4: Image Card (Neon Cyan Circle Visual) */}
          <motion.div
            variants={imageCardVariants}
            whileHover={shouldReduceMotion ? undefined : 'hover'}
            className="group relative overflow-hidden rounded-[28px] lg:rounded-[32px] border border-[#EAECF0] dark:border-[#27272A] bg-surface-2 min-h-[300px] lg:min-h-[340px] transition-[border-color,box-shadow] duration-300 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="/assets/culture-card-circle.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          </motion.div>

          {/* Card 5: Text Card (Global Vision) */}
          <motion.div
            variants={textCardVariants}
            whileHover={shouldReduceMotion ? undefined : 'hover'}
            className="group rounded-[28px] lg:rounded-[32px] bg-white dark:bg-surface-2 border border-[#EAECF0] dark:border-[#27272A] p-8 sm:p-10 flex flex-col items-center justify-center text-center min-h-[300px] lg:min-h-[340px] transition-[border-color,box-shadow] duration-300 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]"
          >
            <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[20px] font-medium leading-[28px] text-heading dark:text-white text-center mb-2">
              {data.globalVision?.title}
            </h3>
            <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] font-normal leading-[25px] text-text-tertiary dark:text-neutral-400 text-center max-w-[280px]">
              {data.globalVision?.description}
            </p>
          </motion.div>

          {/* Card 6: Image Card (Prism Hand Visual) */}
          <motion.div
            variants={imageCardVariants}
            whileHover={shouldReduceMotion ? undefined : 'hover'}
            className="group relative overflow-hidden rounded-[28px] lg:rounded-[32px] border border-[#EAECF0] dark:border-[#27272A] bg-surface-2 min-h-[300px] lg:min-h-[340px] transition-[border-color,box-shadow] duration-300 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="/assets/culture-card-hand.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          </motion.div>

          {/* ============================================================ */}
          {/* ROW 3 (Wide Asymmetric Split)                                 */}
          {/* ============================================================ */}

          {/* Office Visual (Spans 2 columns / ~66% width on desktop) */}
          <motion.div
            variants={officeCardVariants}
            whileHover={shouldReduceMotion ? undefined : 'hover'}
            className="group md:col-span-2 lg:col-span-2 relative min-h-[360px] lg:min-h-[420px] rounded-[28px] lg:rounded-[32px] overflow-hidden border border-[#EAECF0] dark:border-[#27272A] bg-white dark:bg-surface-2 transition-[border-color,box-shadow] duration-300 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="/assets/culture-office-interior.webp"
              alt={lang === 'ar' ? 'مساحة العمل الحديثة في Di-wrapp' : 'Modern Di-wrapp workspace'}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
          </motion.div>

          {/* CTA Action Card (Spans 1 column / ~33% width on desktop) */}
          <motion.div
            variants={ctaCardVariants}
            whileHover={shouldReduceMotion ? undefined : 'hover'}
            className="md:col-span-2 lg:col-span-1 rounded-[28px] lg:rounded-[32px] bg-white dark:bg-surface-2 border border-[#EAECF0] dark:border-[#27272A] p-8 sm:p-10 flex flex-col justify-center items-start text-start min-h-[360px] lg:min-h-[420px] transition-[border-color,box-shadow] duration-300 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]"
          >
            {/* Pill Badge */}
            <Badge variant="pill" className="gap-1.5 px-3 py-1 mb-5">
              <UserPlus className="w-3.5 h-3.5 text-text-secondary dark:text-neutral-300 stroke-[1.8]" />
              <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[12px] font-medium text-text-secondary dark:text-neutral-300">
                {data.cta?.badge}
              </span>
            </Badge>

            {/* Title */}
            <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[26px] sm:text-[30px] lg:text-[32px] font-bold leading-[1.2] text-heading dark:text-white mb-4">
              {data.cta?.title}
            </h3>

            {/* Description */}
            <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[15px] sm:text-[16px] leading-[24px] text-text-tertiary dark:text-neutral-400 mb-6 max-w-[360px]">
              {data.cta?.description}
            </p>

            {/* Action Button */}
            <Link
              href={lang ? `/${lang}/join-us` : '/join-us'}
              className="h-[44px] px-6 rounded-[8px] bg-[#101828] hover:bg-neutral-800 dark:bg-white dark:text-[#101828] dark:hover:bg-neutral-200 text-white text-[14px] font-medium transition-colors inline-flex items-center justify-center cursor-pointer shadow-xs active:scale-[0.98]"
            >
              {data.cta?.button}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersBentoGrid;
