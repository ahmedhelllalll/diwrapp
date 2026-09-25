"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, OpenInWindow, SelectWindow, Tv, CheckCircle, Coins } from 'iconoir-react';

export interface HowItWorksSectionProps {
  dict: any;
  lang?: string;
}

export default function HowItWorksSection({ dict, lang = 'en' }: HowItWorksSectionProps) {
  const [activeTab, setActiveTab] = useState<'brands' | 'vendors'>('brands');
  const isRtl = lang === 'ar';

  const brandsCards = [
    {
      icon: Map,
      title: dict?.brands?.step1Title || dict?.step1Title || "01. Choose Your Spot",
      desc: dict?.brands?.step1Desc || dict?.step1Desc || "Discover a Diverse Range of Inventories Across Multiple Cities and Countries.",
    },
    {
      icon: OpenInWindow,
      title: dict?.brands?.step2Title || dict?.step2Title || "02. Schedule & Upload",
      desc: dict?.brands?.step2Desc || dict?.step2Desc || "Select your preferred time slot and upload your media effortlessly.",
    },
    {
      icon: SelectWindow,
      title: dict?.brands?.step3Title || dict?.step3Title || "03. Launch & Monitor",
      desc: dict?.brands?.step3Desc || dict?.step3Desc || "Once approved, your campaigns go live. Easily track and manage them.",
    },
  ];

  const vendorsCards = [
    {
      icon: Tv,
      title: dict?.vendors?.step1Title || "01. List Your Spaces",
      desc: dict?.vendors?.step1Desc || "Add your digital and physical billboards with custom pricing and availability.",
    },
    {
      icon: CheckCircle,
      title: dict?.vendors?.step2Title || "02. Review & Accept Bookings",
      desc: dict?.vendors?.step2Desc || "Manage incoming campaign requests from leading global and regional brands.",
    },
    {
      icon: Coins,
      title: dict?.vendors?.step3Title || "03. Monetize & Grow",
      desc: dict?.vendors?.step3Desc || "Receive guaranteed timely payouts and monitor your inventory performance.",
    },
  ];

  const currentCards = activeTab === 'brands' ? brandsCards : vendorsCards;

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 mt-6 sm:mt-12 lg:mt-20 mb-16 sm:mb-20 text-center flex flex-col items-center relative z-20">
      {/* 1. Eyebrow Badge (User Guide) */}
      <div className="inline-flex items-center justify-center px-3.5 py-1 rounded-[10px] border border-[#EAECF0] dark:border-neutral-800 bg-transparent mb-4">
        <span className="text-[13px] font-medium text-[#475467] dark:text-neutral-400 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
          {dict?.howItWorks?.badge || dict?.badge || (isRtl ? "دليل المستخدم" : "User Guide")}
        </span>
      </div>

      {/* Title & Subtitle */}
      <h2 className="text-[36px] font-medium leading-[44px] tracking-[-0.01em] text-[#101828] dark:text-white font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
        {dict?.howItWorks?.title || dict?.title || (isRtl ? "كيف تعمل المنصة" : "How it Works")}
      </h2>
      <p className="text-slate-600 dark:text-neutral-300 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[16px] sm:text-[18px] leading-[1.65] rtl:leading-[1.8] max-w-[700px] mx-auto text-center mt-3 transition-colors">
        {dict?.howItWorks?.description || dict?.howItWorks?.subtitle || dict?.subtitle || (isRtl ? "تمكين العلامات التجارية وأصحاب وسائل الإعلام من خلال منصة ذكية واحدة للاكتشاف والتخطيط والحجز بثقة" : "Empowering Brands and Media Owners Through One Intelligent Platform to Discover, Plan and Book with Confidence")}
      </p>

      {/* 2. Segmented Pill Tab Switcher with Smooth Sliding Indicator */}
      <div className="inline-flex items-center p-1 rounded-[14px] bg-[#F2F4F7] dark:bg-neutral-900 border border-[#EAECF0] dark:border-neutral-800 relative mt-8 mb-12">
        {(['brands', 'vendors'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative z-10 px-5 py-2 text-[14px] font-semibold transition-colors duration-200 cursor-pointer font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] ${
                isActive 
                  ? "text-[#101828] dark:text-white" 
                  : "text-[#667085] dark:text-neutral-400 hover:text-[#101828] dark:hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeHowItWorksTab"
                  className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-[10px] shadow-[0_1px_3px_rgba(16,24,40,0.1),0_1px_2px_rgba(16,24,40,0.06)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span>
                {tab === 'brands' 
                  ? (dict?.howItWorks?.forBrands || dict?.forBrands || (isRtl ? "أعلن معنا" : "For Brands"))
                  : (dict?.howItWorks?.forVendors || dict?.forVendors || (isRtl ? "للشركاء وأصحاب المساحات" : "For Vendors"))
                }
              </span>
            </button>
          );
        })}
      </div>

      {/* 3 & 4. Cards Structure with In-Place Content Fade and Minimalist Hover */}
      <div className="w-full max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {currentCards.map((card, idx) => (
            <div
              key={idx}
              className="group rounded-2xl p-7 text-left rtl:text-right flex flex-col justify-start bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-neutral-200/80 dark:border-white/[0.08] hover:border-neutral-300 dark:hover:border-white/[0.18] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 ease-out hover:-translate-y-1"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`${activeTab}-${idx}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex flex-col h-full"
                >
                  {/* Transparent Reacting Icon Container */}
                  <div className="w-11 h-11 rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-transparent flex items-center justify-center text-neutral-800 dark:text-neutral-200 mb-6 rtl:self-start group-hover:border-neutral-300 dark:group-hover:border-white/[0.2] transition-colors duration-300">
                    <card.icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  {/* Title */}
                  <h3 className="text-[17px] font-bold text-neutral-900 dark:text-white font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] mb-2">
                    {card.title}
                  </h3>
                  {/* Description */}
                  <p className="text-[14px] text-slate-600 dark:text-neutral-400 leading-relaxed rtl:leading-[1.7] font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] transition-colors">
                    {card.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
