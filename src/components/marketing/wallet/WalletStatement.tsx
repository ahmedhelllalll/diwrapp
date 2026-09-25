'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WalletStatementProps {
  dict: {
    statementLight?: string;
    statementMedium?: string;
  };
}

export default function WalletStatement({ dict }: WalletStatementProps) {
  return (
    <section className="w-full py-16 md:py-20 bg-white dark:bg-[#080808] transition-colors duration-300">
      <motion.div 
        className="max-w-[840px] mx-auto text-center px-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-[26px] sm:text-[32px] md:text-[36px] leading-[36px] sm:leading-[42px] md:leading-[46px] font-light text-[#101828] dark:text-white">
          {dict?.statementLight || "Whether you're running a single ad or managing hundreds of locations — "}{' '}
          <span className="font-medium text-[#101828] dark:text-white">
            {dict?.statementMedium || 'the Wallet keeps your operations smooth and traceable.'}
          </span>
        </h2>
      </motion.div>
    </section>
  );
}
