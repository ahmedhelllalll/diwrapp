'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { appleEasing } from '@/lib/motion';

export interface AdvertiseHeroSectionProps {
  lang: string;
  dict: {
    heroBadge?: string;
    heroTitleLight?: string;
    heroTitleBold?: string;
    featureBadge?: string;
    featureHeading?: string;
    featureDescLight?: string;
    featureDescBold?: string;
    ctaButton?: string;
  };
}

export default function AdvertiseHeroSection({ lang, dict }: AdvertiseHeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Motion variants with appleEasing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemFadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.7,
        ease: appleEasing,
      },
    },
  };

  const bannerVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 22,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.85,
        ease: appleEasing,
      },
    },
  };

  const featureStaggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section 
        className="advertise-hero"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Eyebrow Badge */}
        <motion.div 
          className="advertise-badge"
          variants={itemFadeUpVariants}
          whileHover={shouldReduceMotion ? undefined : { 
            scale: 1.02, 
            transition: { duration: 0.2, ease: appleEasing } 
          }}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="advertise-badge-icon"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          <span>{dict?.heroBadge || "Bridging Vision with Functionality"}</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 className="advertise-title" variants={itemFadeUpVariants}>
          <span className="advertise-title-light">
            {dict?.heroTitleLight || "Empowering Brands Through"}
          </span>
          <span className="advertise-title-bold">
            {dict?.heroTitleBold || "Smart, Seamless Experiences"}
          </span>
        </motion.h1>
      </motion.section>

      {/* Banner Image Section */}
      <motion.section 
        className="advertise-image-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={bannerVariants}
      >
        <div className="advertise-image-wrapper">
          <Image 
            src="/assets/advertise-image.jpg" 
            alt={`${dict?.heroTitleLight || "Empowering Brands Through"} ${dict?.heroTitleBold || "Smart, Seamless Experiences"}`}
            width={1920}
            height={1080}
            priority
            className="advertise-hero-img"
            sizes="(max-width: 1024px) 100vw, 1380px"
          />
        </div>
      </motion.section>

      {/* Feature Header Content ("All in One Place.") */}
      <motion.div 
        className="advertise-feature-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={featureStaggerVariants}
      >
        {/* Left Column: Pill Badge */}
        <motion.div className="advertise-feature-badge-col" variants={itemFadeUpVariants}>
          <motion.div 
            className="advertise-feature-badge"
            whileHover={shouldReduceMotion ? undefined : { 
              scale: 1.025, 
              transition: { duration: 0.2, ease: appleEasing } 
            }}
          >
            <svg 
              className="advertise-feature-badge-icon" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path 
                d="M8 1.5V3.5M8 12.5V14.5M1.5 8H3.5M12.5 8H14.5M3.4 3.4L4.818 4.818M11.182 11.182L12.6 12.6M3.4 12.6L4.818 11.182M11.182 4.818L12.6 3.4" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
              />
            </svg>
            <span>{dict?.featureBadge || "Plan, Launch, and Track With Confidence"}</span>
          </motion.div>
        </motion.div>

        {/* Right Column: Title, Paragraph, Button */}
        <motion.div className="advertise-feature-content" variants={itemFadeUpVariants}>
          <motion.h2 className="advertise-feature-title" variants={itemFadeUpVariants}>
            {dict?.featureHeading || "All in One Place."}
          </motion.h2>
          
          <motion.p className="advertise-feature-desc" variants={itemFadeUpVariants}>
            <span>{dict?.featureDescLight || "From discovering media spaces to managing budgets and accessing reports — "}</span>
            <strong className="advertise-feature-desc-bold">{dict?.featureDescBold || "everything is built to save time, boost impact, and deliver measurable value."}</strong>
          </motion.p>

          <motion.div variants={itemFadeUpVariants}>
            <motion.div
              className="inline-block"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.18, ease: appleEasing }}
            >
              <Link 
                href={`/${lang}/signup?role=advertiser`}
                className="advertise-btn-primary"
              >
                {dict?.ctaButton || "Book Your Spot"}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
