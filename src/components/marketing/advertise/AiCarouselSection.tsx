'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparks } from "iconoir-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { appleEasing } from "@/lib/motion";

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
}

export default function AiCarouselSection({
  slides = defaultSlides,
  className = ""
}: AiCarouselSectionProps) {
  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const goToSlide = (nextIndex: number) => {
    if (nextIndex === currentIndex) return;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSlides.length]);

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

  return (
    <section className={`ai-carousel-section ${className}`} aria-label="Wrapp AI Showcase">
      {/* Outer Card Container with Viewport In-View Reveal */}
      <motion.div 
        className="ai-carousel-card"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.75, ease: appleEasing }}
      >
        {/* Fixed Background Image - Light Mode */}
        <Image
          src="/assets/background-ai.webp"
          alt="Wrapp AI Background"
          fill
          priority
          unoptimized
          className="ai-carousel-bg dark:hidden"
        />

        {/* Fixed Background Image - Dark Mode */}
        <Image
          src="/assets/background-ai-dark.webp"
          alt="Wrapp AI Background Dark"
          fill
          priority
          unoptimized
          className="ai-carousel-bg hidden dark:block"
        />

        {/* Dynamic Carousel Content with High-End AnimatePresence Cross-Fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id || currentIndex}
            className="ai-carousel-content"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, ease: appleEasing }}
          >
            {/* Badge (Top Tag) */}
            <motion.div 
              className="ai-carousel-badge"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              transition={{ duration: 0.2, ease: appleEasing }}
            >
              <Sparks width={14} height={14} strokeWidth={1.75} className="ai-carousel-badge-icon" aria-hidden="true" />
              <span>{currentSlide.badge}</span>
            </motion.div>

            {/* Heading (Slide Title) */}
            <h2 className="ai-carousel-title">
              {currentSlide.title}
            </h2>

            {/* Body Description */}
            <p className="ai-carousel-desc">
              {renderDescription(currentSlide.description, currentSlide.highlightText)}
            </p>

            {/* Action Button (CTA) */}
            <div>
              <motion.div
                className="inline-block"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.18, ease: appleEasing }}
              >
                <Link
                  href={currentSlide.ctaLink}
                  className="ai-carousel-cta"
                >
                  {currentSlide.ctaText}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Pagination Indicator Dots */}
      <div className="ai-carousel-dots" role="tablist" aria-label="Carousel pagination">
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

      {/* Bottom Section Divider */}
      <motion.div 
        className="ai-carousel-divider"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: appleEasing }}
      />
    </section>
  );
}
