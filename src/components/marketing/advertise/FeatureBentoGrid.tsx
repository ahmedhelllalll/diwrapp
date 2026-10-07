'use client';

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { appleEasing } from "@/lib/motion";
import {
  UploadDataWindow,
  Brain,
  Camera,
  CardWallet,
  BadgeCheck,
  BellNotification,
} from "iconoir-react";

interface BentoDict {
  card1Alt?: string;
  card2Title?: string;
  card2Desc?: string;
  card3Title?: string;
  card3Desc?: string;
  card4Title?: string;
  card4Desc?: string;
  card5Title?: string;
  card5Desc?: string;
  card6Alt?: string;
  card7Title?: string;
  card7Desc?: string;
  card8Title?: string;
  card8Desc?: string;
}

interface FeatureBentoGridProps {
  dict?: BentoDict;
  className?: string;
}

export default function FeatureBentoGrid({ dict, className = "" }: FeatureBentoGridProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.65,
        ease: appleEasing,
      },
    },
  };

  const hoverAnimation = shouldReduceMotion ? undefined : {
    y: -4,
    transition: { duration: 0.22, ease: appleEasing },
  };

  return (
    <section className={`bento-section ${className}`} aria-label="Feature Showcase">
      <motion.div 
        className="bento-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={containerVariants}
      >
        {/* =================================================================
            ROW 1
            ================================================================= */}
        {/* Card 1: Tablet Showcase */}
        <motion.div 
          className="bento-card bento-card-tablet"
          variants={cardVariants}
          whileHover={hoverAnimation}
        >
          <div className="bento-tablet-inner">
            <Image
              src="/assets/table.webp"
              alt={dict?.card1Alt || "Di_Wrapp Tablet Booking Showcase"}
              width={640}
              height={480}
              sizes="(max-width: 768px) 100vw, 640px"
              className="bento-tablet-img"
            />
          </div>
        </motion.div>

        {/* Card 2: Instant Browse & Book */}
        <motion.div 
          className="bento-card"
          variants={cardVariants}
          whileHover={hoverAnimation}
        >
          <div className="bento-icon-box" aria-hidden="true">
            <UploadDataWindow width={20} height={20} strokeWidth={1.75} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">
              {dict?.card2Title || "Instant Browse & Book"}
            </h3>
            <p className="bento-card-desc">
              {dict?.card2Desc || "— no delays, no back-and-forth. Just select, schedule, and go live."}
            </p>
          </div>
        </motion.div>

        {/* Card 3: Smart Dashboard */}
        <motion.div 
          className="bento-card"
          variants={cardVariants}
          whileHover={hoverAnimation}
        >
          <div className="bento-icon-box" aria-hidden="true">
            <Brain width={20} height={20} strokeWidth={1.75} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">
              {dict?.card3Title || "Smart Dashboard"}
            </h3>
            <p className="bento-card-desc">
              {dict?.card3Desc || "A fully customizable dashboard that highlights the data that matters most"}
            </p>
          </div>
        </motion.div>

        {/* =================================================================
            ROW 2
            ================================================================= */}
        {/* Card 4: Booking Proof & Reporting */}
        <motion.div 
          className="bento-card"
          variants={cardVariants}
          whileHover={hoverAnimation}
        >
          <div className="bento-icon-box" aria-hidden="true">
            <Camera width={20} height={20} strokeWidth={1.75} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">
              {dict?.card4Title || "Booking Proof & Reporting"}
            </h3>
            <p className="bento-card-desc">
              {dict?.card4Desc || "Get visual confirmation when your Booking goes live, along with detailed reports"}
            </p>
          </div>
        </motion.div>

        {/* Card 5: Wallet Top-Ups & Payouts */}
        <motion.div 
          className="bento-card"
          variants={cardVariants}
          whileHover={hoverAnimation}
        >
          <div className="bento-icon-box" aria-hidden="true">
            <CardWallet width={20} height={20} strokeWidth={1.75} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">
              {dict?.card5Title || "Wallet Top-Ups & Payouts"}
            </h3>
            <p className="bento-card-desc">
              {dict?.card5Desc || "Securely Fund your account and track every transaction"}
            </p>
          </div>
        </motion.div>

        {/* Card 6: Illuminated Doorway Image Visual */}
        <motion.div 
          className="bento-card bento-card-image"
          variants={cardVariants}
          whileHover={hoverAnimation}
        >
          <Image
            src="/assets/digital-door.png"
            alt={dict?.card6Alt || "Di_Wrapp Illuminated Digital Doorway Visual"}
            fill
            className="bento-door-img"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
          />
        </motion.div>

        {/* =================================================================
            ROW 3
            ================================================================= */}
        {/* Card 7: Streamlined approval Workflows (Wide Card, col-span-2) */}
        <motion.div 
          className="bento-card bento-card-wide"
          variants={cardVariants}
          whileHover={hoverAnimation}
        >
          <div className="bento-icon-box" aria-hidden="true">
            <BadgeCheck width={20} height={20} strokeWidth={1.75} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">
              {dict?.card7Title || "Streamlined approval Workflows"}
            </h3>
            <p className="bento-card-desc">
              {dict?.card7Desc || "— ensuring quality, compliance, and control across the board."}
            </p>
          </div>
        </motion.div>

        {/* Card 8: Stay instantly updated */}
        <motion.div 
          className="bento-card"
          variants={cardVariants}
          whileHover={hoverAnimation}
        >
          <div className="bento-icon-box" aria-hidden="true">
            <BellNotification width={20} height={20} strokeWidth={1.75} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">
              {dict?.card8Title || "Stay instantly updated"}
            </h3>
            <p className="bento-card-desc">
              {dict?.card8Desc || "— right when it happens."}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
