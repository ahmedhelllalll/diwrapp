import type { Variants, Transition } from "framer-motion";

/**
 * Standard Apple-style cubic bezier easing used across marketing components:
 * [0.16, 1, 0.3, 1] (smooth deceleration with natural settling)
 */
export const appleEasing = [0.16, 1, 0.3, 1] as const;

export const defaultTransition: Transition = {
  duration: 0.75,
  ease: appleEasing,
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: appleEasing,
    },
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: appleEasing,
    },
  },
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: appleEasing,
    },
  },
};

export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
