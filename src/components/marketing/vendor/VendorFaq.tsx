'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShieldQuestion, Plus, ArrowUpRight } from 'iconoir-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface VendorFaqProps {
  dict?: any;
  lang?: string;
}

const DEFAULT_DATA = {
  badge: 'FAQ',
  heading: 'Frequently\nAsked Questions',
  items: [
    {
      id: 'setup-payout',
      question: 'How to set up inventory and get paid',
      answer:
        'You can register your inventory by adding your screen specifications, location, and operating hours through the Vendor Dashboard. Once verified, payout details (bank transfer, digital wallet, or wire) are linked directly, and earnings are credited automatically following campaign completion.',
    },
    {
      id: 'pricing-hours',
      question: 'Can I set prices and operating hours?',
      answer:
        'Yes, you have full control over your inventory pricing (CPM, hourly, or fixed packages) and daily operating schedules. You can also define surge pricing during peak hours or offer discounts for long-term campaigns.',
    },
    {
      id: 'review-bookings',
      question: 'Can I manually review bookings?',
      answer:
        'Absolutely. You can toggle between automatic approval for verified advertisers or manual review mode where every campaign creative and schedule requires your explicit approval before going live.',
    },
    {
      id: 'formats-supported',
      question: 'Which formats are supported?',
      answer:
        'Di-wrapp supports static high-res images (JPEG, PNG, WebP), dynamic HTML5 creatives, and high-definition video formats (MP4, MOV up to 4K resolution) tailored to digital displays and billboards.',
    },
    {
      id: 'min-inventories',
      question: 'Minimum number of inventories?',
      answer:
        'There is no minimum requirement. Whether you manage a single storefront screen or a nationwide network of hundreds of digital billboards, you can monetize your inventory seamlessly.',
    },
    {
      id: 'taxes-invoices',
      question: 'Taxes & Invoices',
      answer:
        'All invoices, VAT receipts, and tax statements are generated automatically per campaign and are exportable anytime directly from your billing overview.',
    },
  ],
  guideCard: {
    titlePrefix: "Can't Find your Question? ",
    titleHighlight: 'Read the Vendor Guide',
  },
};

const renderBidiText = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/(Di-wrapped|Di-wrapp|Ask Di|\(24\/7\)|24\/7|\bDi\b)/g);
  if (parts.length === 1) return text;
  return parts.map((part, index) => {
    if (
      part === 'Di-wrapped' ||
      part === 'Di-wrapp' ||
      part === 'Ask Di' ||
      part === 'Di' ||
      part === '(24/7)' ||
      part === '24/7'
    ) {
      return (
        <span key={index} dir="ltr" className="inline-block unicode-bidi-isolate">
          {part}
        </span>
      );
    }
    return part;
  });
};

export const VendorFaq: React.FC<VendorFaqProps> = ({ dict, lang }) => {
  const shouldReduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const d = dict?.vendorFaq;
  const data = {
    badge: d?.badge || DEFAULT_DATA.badge,
    heading: d?.heading || DEFAULT_DATA.heading,
    items: (d?.items && Array.isArray(d.items) && d.items.length > 0)
      ? d.items
      : DEFAULT_DATA.items,
    guideCard: {
      titlePrefix: d?.guideCard?.titlePrefix || DEFAULT_DATA.guideCard.titlePrefix,
      titleHighlight: d?.guideCard?.titleHighlight || DEFAULT_DATA.guideCard.titleHighlight,
    },
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
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="w-full relative overflow-hidden bg-transparent">
      <div className="site-container w-full max-w-[2520px] mx-auto relative px-6 sm:px-10 xl:px-20 py-16 lg:py-24">
        {/* ========================================================================= */}
        {/* Background Grid (Desktop Only)                                            */}
        {/* ========================================================================= */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-0 start-[-60px] w-[380px] h-[380px] opacity-35 dark:opacity-20 pointer-events-none select-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0H0V40' stroke='%23CBD5E1' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* ========================================================================= */}
        {/* Header Stack                                                              */}
        {/* ========================================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
          className="flex flex-col items-center text-center"
        >
          {/* Pill Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border vendor-badge bg-transparent mb-3 select-none"
          >
            <ShieldQuestion className="w-3.5 h-3.5 stroke-[1.8]" />
            <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[13px] font-medium">
              {renderBidiText(data.badge)}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[32px] sm:text-[40px] font-semibold leading-[44px] text-heading dark:text-white text-center whitespace-pre-line mt-3 mb-12"
          >
            {renderBidiText(data.heading)}
          </motion.h2>
        </motion.div>

        {/* ========================================================================= */}
        {/* Accordion Stack                                                           */}
        {/* ========================================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
          className="max-w-[760px] mx-auto flex flex-col gap-3.5"
        >
          {/* 6 FAQ Cards */}
          {data.items.map((item: FaqItem) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="w-full rounded-[16px] border vendor-card px-6 sm:px-8 py-5 transition-all shadow-2xs"
              >
                <h3 className="w-full m-0 p-0">
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-question-${item.id}`}
                    className="w-full flex items-center justify-between text-start gap-4 cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900 rounded-lg"
                  >
                    <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[16px] sm:text-[17px] font-medium text-heading dark:text-white group-hover:text-brand transition-colors">
                      {renderBidiText(item.question)}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="shrink-0 text-text-tertiary dark:text-neutral-400 group-hover:text-brand transition-colors"
                    >
                      <Plus className="w-5 h-5 stroke-[2]" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] leading-[24px] text-text-secondary dark:text-neutral-400 pt-3 pb-1 border-t vendor-divider mt-3">
                        {renderBidiText(item.answer)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* ======================================================================= */}
          {/* 7th Card (Guide Banner)                                                */}
          {/* ======================================================================= */}
          <motion.div variants={itemVariants}>
            <Link
              href={lang ? `/${lang}/contact` : '/contact'}
              aria-label={`${data.guideCard.titlePrefix} ${data.guideCard.titleHighlight}`.trim()}
              className="w-full rounded-[16px] border vendor-card px-6 sm:px-8 py-5 flex items-center justify-between transition-colors group cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
            >
              <div className="text-[16px] text-heading dark:text-white font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
                <span className="font-normal text-text-tertiary dark:text-neutral-400">
                  {renderBidiText(data.guideCard.titlePrefix)}
                </span>
                <span className="font-semibold text-heading dark:text-white">
                  {renderBidiText(data.guideCard.titleHighlight)}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full border vendor-btn-secondary flex items-center justify-center shrink-0 group-hover:border-brand transition-colors">
                <ArrowUpRight className="w-4 h-4 text-text-secondary dark:text-neutral-300 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 transition-all rtl:rotate-[-90deg]" />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VendorFaq;
