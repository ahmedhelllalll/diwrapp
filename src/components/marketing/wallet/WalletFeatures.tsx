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

const renderBidiText = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/(Di_Wrapped|Di_Wrapp|Ask_Di|\(24\/7\)|24\/7|Apple Pay|Visa|EGP|USD|SAR|AED|\bDi\b)/g);
  if (parts.length === 1) return text;
  return parts.map((part, index) => {
    if (
      part === 'Di_Wrapped' ||
      part === 'Di_Wrapp' ||
      part === 'Ask_Di' ||
      part === 'Di' ||
      part === '(24/7)' ||
      part === '24/7' ||
      part === 'Apple Pay' ||
      part === 'Visa' ||
      part === 'EGP' ||
      part === 'USD' ||
      part === 'SAR' ||
      part === 'AED'
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
            <div className="inline-flex items-center gap-1.5 h-[28px] px-3.5 py-1 rounded-full border wallet-badge bg-transparent text-[12px] font-medium shadow-xs select-none font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
              <Suitcase className="w-3.5 h-3.5 shrink-0 stroke-[1.8]" />
              <span>{renderBidiText(dict?.featuresBadge || 'Features')}</span>
            </div>
          </div>

          {/* Description Column (8 Cols) */}
          <div className="md:col-span-8">
            <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] font-normal text-text-secondary dark:text-neutral-300 max-w-2xl text-start">
              {renderBidiText(
                dict?.featuresDesc ||
                  "Built for convenience, the Wallet keeps your funds organized and ready to use. Whether you're topping up, monitoring payouts, or reviewing your transaction history, it offers a smooth and transparent way to handle your campaign finances."
              )}
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
              className="w-full rounded-[24px] border wallet-card p-8 flex flex-col justify-start items-start text-start shadow-xs hover:shadow-md transition-all duration-300 relative z-10 group"
            >
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl border wallet-icon-box flex items-center justify-center mb-6 text-heading dark:text-white group-hover:scale-105 transition-all duration-200 shrink-0">
                {card.icon}
              </div>

              {/* Card Title */}
              <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[18px] font-medium leading-[28px] text-heading dark:text-white mb-2 text-start w-full">
                {renderBidiText(card.title)}
              </h3>

              {/* Card Body */}
              <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal leading-[20px] text-text-secondary dark:text-neutral-400 text-start w-full">
                {renderBidiText(card.description)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
