'use client';

import React, { useState, useEffect, useCallback, useId } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, PanInfo } from "framer-motion";
import { Sparks } from "iconoir-react";

export interface CarouselSlide {
  id: number;
  badge: string;
  title: string;
  description: string;
  highlightText: string;
  ctaText: string;
  ctaLink: string;
}

const defaultSlides: CarouselSlide[] = [
  {
    id: 1,
    badge: "Wrapp AI – Your Smart Companion",
    title: "Empowering Through intelligent, data-driven support.",
    description: "Ask_Di is your smart, friendly AI assistant built into the Di_Wrapp platform. It helps brands, vendors, and support teams navigate booking, optimize campaigns, and even create content — all through intuitive, AI-powered interactions.",
    highlightText: "all through intuitive, AI-powered interactions.",
    ctaText: "Try Ask_Di",
    ctaLink: "#"
  },
  {
    id: 2,
    badge: "Wrapp AI – Automated Insights",
    title: "Instant campaign analytics and predictive forecasting.",
    description: "Analyze live engagement metrics and ad inventory in real-time. Ask_Di pinpoints high-converting billboard spaces and optimizes budget distribution — with zero manual guesswork.",
    highlightText: "with zero manual guesswork.",
    ctaText: "Explore Insights",
    ctaLink: "#"
  }
];

interface AiCarouselSectionProps {
  slides?: CarouselSlide[];
  className?: string;
  showDivider?: boolean;
}

const appleEasing = [0.22, 1, 0.36, 1] as const;

export default function AiCarouselSection({
  slides = defaultSlides,
  className = "",
  showDivider = false,
}: AiCarouselSectionProps) {
  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const componentId = useId();

  const totalSlides = activeSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (nextIndex: number) => {
    if (nextIndex === currentIndex) return;
    setCurrentIndex(nextIndex);
  };

  // Auto-play timer with pause on hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  // Swipe gesture handling
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 40;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -swipeThreshold || velocity < -350) {
      nextSlide();
    } else if (offset > swipeThreshold || velocity > 350) {
      prevSlide();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  // Render description with bold highlight text
  const renderDescription = (desc: string, highlight?: string) => {
    if (!highlight || !desc.includes(highlight)) {
      return <span>{desc}</span>;
    }
    const parts = desc.split(highlight);
    return (
      <>
        <span>{parts[0]}</span>
        <strong className="ai-carousel-highlight">{highlight}</strong>
        <span>{parts.slice(1).join(highlight)}</span>
      </>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -8,
      transition: {
        duration: 0.22,
        ease: appleEasing,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: appleEasing,
      },
    },
  };

  return (
    <section className={`ai-carousel-section ${className}`} aria-label="Wrapp AI Showcase">
      {/* Outer Card Container */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Wrapp AI Features"
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="ai-carousel-card outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        data-reveal="up"
        style={{ '--i': 0 } as React.CSSProperties}
      >
        {/* Fixed Background Image - Light Mode */}
        <picture className="ai-carousel-bg ai-carousel-bg-light dark:hidden">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/background-ai-light-mobile.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/assets/background-ai.webp"
            type="image/webp"
          />
          <img
            src="/assets/background-ai.webp"
            alt=""
            aria-hidden="true"
            className="ai-carousel-img"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>

        {/* Fixed Background Image - Dark Mode */}
        <picture className="ai-carousel-bg ai-carousel-bg-dark hidden dark:block">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/background-ai-dark-mobile.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/assets/background-ai-dark.webp"
            type="image/webp"
          />
          <img
            src="/assets/background-ai-dark.webp"
            alt=""
            aria-hidden="true"
            className="ai-carousel-img"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>

        {/* Dynamic Carousel Content with buttery smooth AnimatePresence transition */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${componentId}-slide-${currentIndex}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
            className="ai-carousel-content cursor-grab active:cursor-grabbing"
          >
            {/* Badge (Top Tag) */}
            <motion.div variants={itemVariants} className="ai-carousel-badge">
              <Sparks width={14} height={14} strokeWidth={1.75} className="ai-carousel-badge-icon" aria-hidden="true" />
              <span>{currentSlide.badge}</span>
            </motion.div>

            {/* Heading (Slide Title) */}
            <motion.h2 variants={itemVariants} className="ai-carousel-title">
              {currentSlide.title}
            </motion.h2>

            {/* Body Description */}
            <motion.p variants={itemVariants} className="ai-carousel-desc">
              {renderDescription(currentSlide.description, currentSlide.highlightText)}
            </motion.p>

            {/* Action Button (CTA) */}
            <motion.div variants={itemVariants}>
              <Link
                href={currentSlide.ctaLink}
                className="ai-carousel-cta"
              >
                {currentSlide.ctaText}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Indicator Dots */}
      <div
        className="ai-carousel-dots"
        role="tablist"
        aria-label="Carousel pagination"
        data-reveal="fade"
        style={{ '--i': 1 } as React.CSSProperties}
      >
        {activeSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id || index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
              className={`ai-carousel-dot ${isActive ? "ai-carousel-dot-active" : ""}`}
            />
          );
        })}
      </div>

      {/* Bottom Section Divider (omitted by default when directly preceding Footer) */}
      {showDivider && (
        <div
          className="ai-carousel-divider"
          data-reveal="line"
          style={{ '--i': 1 } as React.CSSProperties}
        />
      )}
    </section>
  );
}
