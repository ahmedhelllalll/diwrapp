'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Premium snappy cubic-bezier easing curve
const CUSTOM_EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface MotionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Parent container for content column that orchestrates staggered fade-up of its children.
 * GPU-optimized: Only animates opacity.
 */
export function MotionContentContainer({ children, className = '' }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Child item for content elements (Badge, Headline, Description, Button).
 * GPU-optimized: Only animates opacity and transform Y.
 */
export function MotionContentItem({ children, className = '' }: MotionProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: CUSTOM_EASING,
          },
        },
      }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Billboard visual column container.
 * GPU-optimized: Only animates opacity, transform Y, and scale.
 * Keeps the flush bottom alignment intact during and after animation.
 */
export function MotionBillboardContainer({ children, className = '' }: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.75,
        ease: CUSTOM_EASING,
      }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Micro-interaction wrapper for primary action button.
 * Hover lifts by 2px, tap depresses to scale 0.98.
 */
export function MotionButtonWrapper({ children, className = '' }: MotionProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        ease: CUSTOM_EASING,
      }}
      style={{ willChange: 'transform' }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
