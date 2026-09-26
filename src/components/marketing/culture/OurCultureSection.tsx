'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Community,
  Group,
  HomeUser,
  BrainElectricity,
  Box3dThreePoints,
} from 'iconoir-react';

export interface CultureDictionary {
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  values?: {
    collaboration?: {
      title?: string;
      description?: string;
    };
    flexibility?: {
      title?: string;
      description?: string;
    };
    creativity?: {
      title?: string;
      description?: string;
    };
    diversity?: {
      title?: string;
      description?: string;
    };
  };
}

interface OurCultureSectionProps {
  lang: string;
  culture?: CultureDictionary;
}

export default function OurCultureSection({ lang, culture }: OurCultureSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const c = culture || {};
  const values = c.values || {};

  const valueItems = [
    {
      key: 'collaboration',
      icon: Group,
      title: values.collaboration?.title || 'Collaboration',
      description: values.collaboration?.description || 'We move fast together, not alone.',
    },
    {
      key: 'flexibility',
      icon: HomeUser,
      title: values.flexibility?.title || 'Flexibility',
      description: values.flexibility?.description || 'Hybrid and remote options that work for your lifestyle.',
    },
    {
      key: 'creativity',
      icon: BrainElectricity,
      title: values.creativity?.title || 'Creativity',
      description: values.creativity?.description || 'Big ideas are always welcome here.',
    },
    {
      key: 'diversity',
      icon: Box3dThreePoints,
      title: values.diversity?.title || 'Diversity',
      description: values.diversity?.description || 'Different perspectives make us smarter, stronger, and more human.',
    },
  ];

  // Snappy transition constants
  const snappyTransition = {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  // Header & section motion variants
  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: snappyTransition,
    },
  };

  // 4 Values Grid motion variants
  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const gridItemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: snappyTransition,
    },
  };

  const iconContainerVariants = {
    initial: {
      y: 0,
    },
    hover: {
      y: shouldReduceMotion ? 0 : -3,
      transition: {
        duration: 0.18,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="w-full bg-white dark:bg-[#080808] transition-colors duration-300 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 lg:pb-16 overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* A. Header & Typography Block */}
        <div className="flex flex-col items-center text-center max-w-[880px] mx-auto">
          {/* Badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUpVariants}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full border border-[#E4E7EC] dark:border-neutral-800 bg-white/80 dark:bg-neutral-800/80 shadow-xs backdrop-blur-xs text-[#344054] dark:text-neutral-300 select-none">
              <Community className="w-4 h-4 text-[#344054] dark:text-neutral-300 shrink-0" strokeWidth={1.5} />
              <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] leading-[20px] font-medium">
                {c.badge || 'Our Culture'}
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUpVariants}
            className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[34px] sm:text-[44px] lg:text-[48px] font-bold text-[#101828] dark:text-white leading-[1.2] tracking-[-0.02em] text-center mb-4 sm:mb-5"
          >
            <span className="block">{c.titleLine1 || 'We believe in a work culture that'}</span>
            <span className="block">{c.titleLine2 || 'feels as good as it performs.'}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUpVariants}
            className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[16px] sm:text-[18px] leading-[28px] text-[#667085] dark:text-neutral-400 max-w-[760px] mx-auto text-center mb-12 sm:mb-16 lg:mb-20"
          >
            {c.subtitle ||
              "Whether you're a developer, designer, strategist, or storyteller, you'll find a space where your skills are celebrated and your growth is continuous."}
          </motion.p>
        </div>

        {/* B. Four Values Grid (4 Columns) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={gridContainerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12 sm:mb-16 lg:mb-20"
        >
          {valueItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.key}
                variants={gridItemVariants}
                whileHover="hover"
                className="group relative flex flex-col items-start text-start lg:border-e lg:border-[#EAECF0] dark:lg:border-neutral-800/80 lg:last:border-e-0 lg:pe-8 xl:pe-10 cursor-default"
              >
                {/* Icon Container with snappy Framer Motion lift feedback */}
                <motion.div
                  variants={iconContainerVariants}
                  className="w-11 h-11 rounded-[10px] border border-[#EAECF0] dark:border-neutral-800 bg-transparent flex items-center justify-center mb-4 sm:mb-5 text-[#344054] dark:text-neutral-200 shrink-0"
                >
                  <IconComponent className="w-5 h-5 text-[#344054] dark:text-neutral-200" strokeWidth={1.5} />
                </motion.div>

                {/* Item Title */}
                <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] leading-[28px] font-medium text-[#101828] dark:text-white mb-1.5">
                  {item.title}
                </h3>

                {/* Item Description */}
                <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] leading-[20px] font-normal text-[#667085] dark:text-neutral-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* C. Bottom Visual Banner */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={snappyTransition}
          className="w-full"
        >
          <div className="relative w-full aspect-[16/7] min-h-[260px] sm:min-h-[380px] lg:h-[480px] rounded-[28px] sm:rounded-[32px] overflow-hidden border border-black/5 dark:border-white/10 shadow-xs">
            <Image
              src="/assets/culture-hero-banner.webp"
              alt={c.badge || 'Our Culture Banner'}
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
