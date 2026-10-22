'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Lifebelt } from 'iconoir-react';
import { Badge } from '@/components/ui/Badge';

interface LifeAtDiwrappProps {
  dict: {
    lifeAtDiwrapp?: {
      badge: string;
      title: string;
      statementHighlight: string;
      statementBody: string;
    };
  };
}

export const LifeAtDiwrapp: React.FC<LifeAtDiwrappProps> = ({ dict }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
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

  const data = dict?.lifeAtDiwrapp || {
    badge: 'Life At Di-Wrapp',
    title: 'Where Innovation Meets Impact',
    statementHighlight: "At Di-Wrapp, we're not just building a platform —",
    statementBody:
      "we're reshaping how brands connect with the world around them. Every day, our teams bring together creativity, technology, and purpose to turn ambitious ideas into industry-defining solutions.",
  };

  return (
    <section className="w-full bg-white dark:bg-surface-1 py-16 sm:py-20 lg:py-24 transition-colors duration-300">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Animated Wrapper */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <Badge variant="pill" className="gap-1.5 h-[28px] px-3.5 py-1 mb-6 bg-white/90 dark:bg-surface-2/80">
            <Lifebelt className="w-3.5 h-3.5 text-text-secondary dark:text-neutral-300 stroke-[1.8]" />
            <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] leading-[20px] font-medium tracking-[0%]">
              {data.badge}
            </span>
          </Badge>

          {/* Heading */}
          <h2 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[30px] sm:text-[34px] lg:text-[36px] leading-[36px] sm:leading-[40px] font-semibold tracking-[0%] text-heading dark:text-white mb-6">
            {data.title}
          </h2>

          {/* Statement Paragraph */}
          <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] tracking-[0%] text-text-tertiary dark:text-neutral-400 max-w-[820px]">
            <span className="font-semibold text-heading dark:text-neutral-100">
              {data.statementHighlight}{' '}
            </span>
            <span className="font-normal font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
              {data.statementBody}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LifeAtDiwrapp;
