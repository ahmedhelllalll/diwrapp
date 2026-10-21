'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface BentoCardData {
  label?: string;
  stat?: string;
  title?: string;
  description?: string;
}

interface BentoShowcaseSectionProps {
  lang: string;
  card1?: BentoCardData;
  card2?: BentoCardData;
  card3?: BentoCardData;
}

const appleEasing = [0.22, 1, 0.36, 1] as const;

export default function BentoShowcaseSection({
  lang,
  card1 = {
    label: 'Higher Occupancy',
    stat: '24/7',
    title: 'Sell Your Inventory Around The Clock',
    description:
      'Turn your advertising assets into a continuously bookable digital marketplace with real-time availability and automated reservations.',
  },
  card2 = {
    label: 'Real-Time Management',
    stat: 'Live',
    title: 'Inventory Always Available',
    description:
      'Pricing, availability, scheduling, and bookings update instantly across your entire media network.',
  },
  card3 = {
    label: 'Automation First',
    stat: '100%',
    title: 'Digital Booking Workflow',
    description:
      'Reduce manual quotations, approvals, and bookings management through automated workflows.',
  },
}: BentoShowcaseSectionProps) {
  const isRtl = lang === 'ar';
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const animMargin = isDesktop ? '-40px' : '0px';
  const noDelay = shouldReduceMotion || !isDesktop;

  return (
    <section className="relative w-full bg-white dark:bg-[#080808] transition-colors duration-300 py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* 2-Row Structural Architecture */}
        <div className="flex flex-col gap-6">
          {/* Row 1 (Top Row — 2 Equal Columns): Card 1 (Left) & Card 2 (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-0">
            {/* Card 1 (Top Left): Higher Occupancy */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: animMargin }}
              transition={{ duration: 0.75, delay: noDelay ? 0 : 0.08, ease: appleEasing }}
              className="bg-[#FAFAFA] dark:bg-[#0a0a0a] border border-[#EAECF0] dark:border-zinc-800 rounded-[24px] p-9 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[220px] hover:border-slate-300 hover:dark:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 ease-out"
            >
              <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium leading-[20px] text-[#344054] dark:text-zinc-300">
                {card1.label}
              </span>

              <div className="mt-8">
                <div className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[48px] leading-[44px] tracking-[-0.01em] text-[#0066FF] dark:text-blue-400 mt-6 mb-3">
                  {card1.stat}
                </div>
                <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-semibold text-[18px] leading-[26px] text-[#101828] dark:text-white mb-2">
                  {card1.title}
                </h3>
                <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[22px] text-[#475467] dark:text-zinc-300 m-0">
                  {card1.description}
                </p>
              </div>
            </motion.div>

            {/* Card 2 (Top Right): Real-Time Management */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: animMargin }}
              transition={{ duration: 0.75, delay: noDelay ? 0 : 0.16, ease: appleEasing }}
              className="bg-[#FAFAFA] dark:bg-[#0a0a0a] border border-[#EAECF0] dark:border-zinc-800 rounded-[24px] p-9 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[220px] relative overflow-hidden md:overflow-visible hover:border-slate-300 hover:dark:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 ease-out"
            >
              <div className="max-w-[240px] relative z-10">
                <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium leading-[20px] text-[#344054] dark:text-zinc-300 block">
                  {card2.label}
                </span>

                <div className="mt-8">
                  <div className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[48px] leading-[44px] tracking-[-0.01em] text-[#0066FF] dark:text-blue-400 mt-6 mb-3">
                    {card2.stat}
                  </div>
                  <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-semibold text-[18px] leading-[26px] text-[#101828] dark:text-white mb-2">
                    {card2.title}
                  </h3>
                  <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[22px] text-[#475467] dark:text-zinc-300 m-0">
                    {card2.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2 (Bottom Row — Full Width Card with overflow-visible Stacking): Card 3 & Upward-Breaking Laptop */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: animMargin }}
            transition={{ duration: 0.8, delay: noDelay ? 0 : 0.12, ease: appleEasing }}
            className="w-full bg-[#FAFAFA] dark:bg-[#0a0a0a] border border-[#EAECF0] dark:border-zinc-800 rounded-[24px] p-9 sm:p-8 lg:p-10 relative overflow-hidden md:overflow-visible flex flex-col justify-between min-h-[260px] hover:border-slate-300 hover:dark:border-zinc-700 hover:shadow-md dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 ease-out z-10"
          >
            {/* Card 3 Content (Left Side) */}
            <div className="max-w-[340px] relative z-10">
              <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium leading-[20px] text-[#344054] dark:text-zinc-300 block">
                {card3.label}
              </span>

              <div className="mt-8">
                <div className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[48px] leading-[44px] tracking-[-0.01em] text-[#0066FF] dark:text-blue-400 mt-6 mb-3">
                  {card3.stat}
                </div>
                <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-semibold text-[18px] leading-[26px] text-[#101828] dark:text-white mb-2">
                  {card3.title}
                </h3>
                <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[22px] text-[#475467] dark:text-zinc-300 m-0">
                  {card3.description}
                </p>
              </div>
            </div>

            {/* Laptop Image: Scaled down ~8-10%, shifted right, and clipped clean at the bottom */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: isRtl ? -16 : 16, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: animMargin }}
              transition={{ duration: 0.85, delay: noDelay ? 0 : 0.22, ease: appleEasing }}
              className="relative mt-8 -mb-9 md:mt-0 md:mb-0 md:absolute md:right-[-8%] lg:right-[-9%] md:bottom-0 pointer-events-none select-none z-20 w-full sm:w-[85%] md:w-[65%] lg:w-[68%] max-w-[720px] rtl:md:right-auto rtl:md:left-[-8%] rtl:lg:left-[-9%]"
            >
              <Image
                src="/assets/join-laptop.png"
                alt="Di-wrapp Platform on Laptop"
                width={1100}
                height={850}
                sizes="(max-width: 768px) 100vw, 720px"
                style={{ clipPath: 'polygon(0px 0px, 100% 0px, 100% 95%, 0px 95%)' }}
                className="w-full h-auto object-contain drop-shadow-2xl translate-y-[5%] md:translate-y-5 lg:translate-y-6 translate-x-0 md:translate-x-14 lg:translate-x-20 rtl:translate-x-0 rtl:md:-translate-x-14 rtl:lg:-translate-x-20 rtl:md:-scale-x-100"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
