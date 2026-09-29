"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { appleEasing, fadeUpVariants } from "@/lib/motion";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function OverviewMotion({ children, className = "" }: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: appleEasing }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FeaturesHeaderMotion({ children, className = "" }: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: appleEasing }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FeaturesCardMotion({ 
  children, 
  className = "", 
  delay = 0 
}: MotionSectionProps & { delay?: number }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.75, delay, ease: appleEasing }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
