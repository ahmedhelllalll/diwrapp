'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface WalletStatementProps {
  dict: {
    statementLight?: string;
    statementMedium?: string;
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

export default function WalletStatement({ dict }: WalletStatementProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full py-16 md:py-20 bg-white dark:bg-surface-1 transition-colors duration-300">
      <motion.div 
        className="max-w-[840px] mx-auto text-center px-6"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[26px] sm:text-[32px] md:text-[36px] leading-[36px] sm:leading-[42px] md:leading-[46px] font-light text-heading dark:text-white">
          {renderBidiText(dict?.statementLight || "Whether you're running a single ad or managing hundreds of locations — ")}{' '}
          <span className="font-medium text-heading dark:text-white">
            {renderBidiText(dict?.statementMedium || 'the Wallet keeps your operations smooth and traceable.')}
          </span>
        </h2>
      </motion.div>
    </section>
  );
}
