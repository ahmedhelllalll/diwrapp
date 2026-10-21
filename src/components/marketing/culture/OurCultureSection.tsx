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
import { Badge } from '@/components/ui/Badge';

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
  lang?: string;
  culture?: CultureDictionary;
}

export default function OurCultureSection({ culture }: OurCultureSectionProps) {
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

  // 4 Values Grid motion variants with staggered entrance variety
  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const getGridItemVariants = (index: number) => ({
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : (index % 2 === 0 ? 16 : 0),
      scale: shouldReduceMotion ? 1 : (index % 2 === 1 ? 0.96 : 1),
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: snappyTransition,
    },
  });

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
    <section className="w-full bg-white dark:bg-surface-1 transition-colors duration-300 pt-[104px] sm:pt-28 lg:pt-28 pb-10 sm:pb-14 lg:pb-16 overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* A. Header & Typography Block (Server-rendered CSS-only rise matching Landing/About) */}
        <div className="flex flex-col items-center text-center max-w-[880px] mx-auto">
          {/* Badge */}
          <div className="hero-anim-badge flex justify-center mb-6">
            <Badge variant="outline-sm">
              <Community className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#344054] dark:text-[#D4D4D8] shrink-0" strokeWidth={1.5} />
              <span className="whitespace-nowrap">{c.badge || 'Our Culture'}</span>
            </Badge>
          </div>

          {/* Title (LCP Element) */}
          <div className="w-full flex justify-center">
            <h1 className="hero-lcp-title font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[34px] sm:text-[44px] lg:text-[48px] font-bold text-heading dark:text-white leading-[1.2] tracking-[-0.02em] text-center mb-4 sm:mb-5">
              <span className="block">{c.titleLine1 || 'We believe in a work culture that'}</span>
              <span className="block">{c.titleLine2 || 'feels as good as it performs.'}</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="hero-anim-subtitle w-full flex justify-center">
            <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] text-text-tertiary dark:text-neutral-400 max-w-[760px] mx-auto text-center mb-8 sm:mb-12 lg:mb-16">
              {c.subtitle ||
                "Whether you're a developer, designer, strategist, or storyteller, you'll find a space where your skills are celebrated and your growth is continuous."}
            </p>
          </div>
        </div>

        {/* B. Four Values Grid (4 Columns) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={gridContainerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 lg:gap-10 mb-10 sm:mb-14 lg:mb-20"
        >
          {valueItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.key}
                variants={getGridItemVariants(index)}
                whileHover="hover"
                className="group relative flex flex-col items-start text-start pb-5 sm:pb-0 border-b border-[#EAECF0] dark:border-[#27272A] sm:border-b-0 last:border-b-0 last:pb-0 lg:border-e lg:border-[#EAECF0] dark:lg:border-[#27272A] lg:last:border-e-0 lg:pe-8 xl:pe-10 cursor-default"
              >
                {/* Icon Container with snappy Framer Motion lift feedback */}
                <motion.div
                  variants={iconContainerVariants}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] border border-[#EAECF0] dark:border-[#27272A] bg-transparent flex items-center justify-center mb-3 sm:mb-5 text-text-secondary dark:text-neutral-200 shrink-0"
                >
                  <IconComponent className="w-5 h-5 text-text-secondary dark:text-neutral-200" strokeWidth={1.5} />
                </motion.div>

                {/* Item Title */}
                <h2 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[17px] sm:text-[18px] leading-[26px] sm:leading-[28px] font-medium text-heading dark:text-white mb-1 sm:mb-1.5 text-start">
                  {item.title}
                </h2>

                {/* Item Description */}
                <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] leading-[20px] font-normal text-text-tertiary dark:text-neutral-400 text-start">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* C. Bottom Visual Banner */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full"
        >
          <div className="relative w-full aspect-[16/7] min-h-[260px] sm:min-h-[380px] lg:h-[480px] rounded-[28px] sm:rounded-[32px] overflow-hidden border border-[#EAECF0] dark:border-[#27272A] shadow-xs">
            <Image
              src="/assets/culture-hero-banner.webp"
              alt={c.badge || 'Our Culture Banner'}
              fill
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1240px) calc(100vw - 48px), 1240px"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
