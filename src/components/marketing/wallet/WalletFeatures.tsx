'use client';

import React from 'react';
import { Suitcase, CardWallet, Flare, HomeSecure } from 'iconoir-react';
import { motion, useReducedMotion } from 'framer-motion';

interface WalletCardData {
  title?: string;
  description?: string;
}

interface WalletFeaturesProps {
  dict: {
    featuresBadge?: string;
    featuresDesc?: string;
    cards?: {
      card1?: WalletCardData;
      card2?: WalletCardData;
      card3?: WalletCardData;
    };
  };
}

export default function WalletFeatures({ dict }: WalletFeaturesProps) {
  const shouldReduceMotion = useReducedMotion();

  const cards = [
    {
      id: 'card1',
      icon: <CardWallet className="w-5 h-5 text-heading dark:text-white stroke-[1.8]" />,
      title: dict?.cards?.card1?.title || 'Top-Up Any Time',
      description:
        dict?.cards?.card1?.description ||
        'Instantly fund your wallet using various payment methods (Visa, Apple Pay, Bank Transfer, Purchase Order "only for verified Org.").',
    },
    {
      id: 'card2',
      icon: <Flare className="w-5 h-5 text-heading dark:text-white stroke-[1.8]" />,
      title: dict?.cards?.card2?.title || 'Real-Time Tracking',
      description:
        dict?.cards?.card2?.description ||
        'View every wallet-related transaction in detail: top-ups, refunds, order payments, and status.',
    },
    {
      id: 'card3',
      icon: <HomeSecure className="w-5 h-5 text-heading dark:text-white stroke-[1.8]" />,
      title: dict?.cards?.card3?.title || 'Secure & Audited',
      description:
        dict?.cards?.card3?.description ||
        'Every wallet transaction is recorded, secured, and available for export and audit.',
    },
  ];

  return (
    <section className="w-full pt-4 pb-28 md:pb-36 bg-white dark:bg-surface-1 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Top Row: Intro & Badge */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start mb-12"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Badge Column (4 Cols) */}
          <div className="md:col-span-4 flex justify-start">
            <div className="inline-flex items-center gap-1.5 h-[28px] px-3.5 py-1 rounded-full border border-border-200 dark:border-card-border bg-transparent text-[12px] font-medium text-text-secondary dark:text-neutral-300 shadow-xs select-none font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
              <Suitcase className="w-3.5 h-3.5 text-text-secondary dark:text-neutral-300 shrink-0 stroke-[1.8]" />
              <span>{dict?.featuresBadge || 'Features'}</span>
            </div>
          </div>

          {/* Description Column (8 Cols) */}
          <div className="md:col-span-8">
            <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] font-normal text-text-secondary dark:text-neutral-300 max-w-2xl text-start">
              {dict?.featuresDesc ||
                "Built for convenience, the Wallet keeps your funds organized and ready to use. Whether you're topping up, monitoring payouts, or reviewing your transaction history, it offers a smooth and transparent way to handle your campaign finances."}
            </p>
          </div>
        </motion.div>

        {/* Bottom Row: 3-Column Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.12,
              }
            }
          }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-card-surface dark:bg-surface-2 border border-border-200 dark:border-card-border rounded-[24px] p-8 flex flex-col justify-start items-start shadow-xs hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl border border-border-200 dark:border-card-border bg-card-surface dark:bg-surface-2 flex items-center justify-center mb-6 text-heading dark:text-white group-hover:scale-105 group-hover:bg-neutral-50 dark:group-hover:bg-surface-3 transition-all duration-200">
                {card.icon}
              </div>

              {/* Card Title */}
              <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] font-medium leading-[28px] text-heading dark:text-white mb-2 text-start w-full">
                {card.title}
              </h3>

              {/* Card Body */}
              <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal leading-[20px] text-text-secondary dark:text-neutral-400 text-start w-full">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
