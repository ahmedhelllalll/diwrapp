'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
}

export default function AiCarouselSection({
  slides = defaultSlides,
  className = ""
}: AiCarouselSectionProps) {
  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (nextIndex: number) => {
    if (nextIndex === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(nextIndex);
    setTimeout(() => {
      setDisplayedIndex(nextIndex);
      setIsTransitioning(false);
    }, 220);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % activeSlides.length;
        setIsTransitioning(true);
        setTimeout(() => {
          setDisplayedIndex(next);
          setIsTransitioning(false);
        }, 220);
        return next;
      });
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSlides.length]);

  const currentSlide = activeSlides[displayedIndex] || activeSlides[0];

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
      {/* Outer Card Container */}
      <div className="ai-carousel-card">
        {/* Fixed Background Image */}
        <Image
          src="/assets/background-ai.jpg"
          alt="Wrapp AI Background"
          fill
          priority
          sizes="(max-width: 1380px) 100vw, 1380px"
          className="ai-carousel-bg"
        />

        {/* Dynamic Carousel Content */}
        <div
          className={`ai-carousel-content ${
            isTransitioning ? "ai-carousel-fading" : ""
          }`}
        >
          {/* Badge (Top Tag) */}
          <div className="ai-carousel-badge">
            <Sparks width={14} height={14} strokeWidth={1.75} className="ai-carousel-badge-icon" aria-hidden="true" />
            <span>{currentSlide.badge}</span>
          </div>

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
            <Link
              href={currentSlide.ctaLink}
              className="ai-carousel-cta"
            >
              {currentSlide.ctaText}
            </Link>
          </div>
        </div>
      </div>

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
      <div className="ai-carousel-divider" />
    </section>
  );
}
