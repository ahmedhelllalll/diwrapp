'use client';

import React, { useState, useEffect, useCallback, useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion, PanInfo } from 'framer-motion';
import { Sparks } from 'iconoir-react';

interface SlideData {
  badge: string;
  title: string;
  description: string;
  highlight: string;
  cta: string;
  bgImage: string;
  isDarkTheme?: boolean;
}

interface AskDiCarouselProps {
  dict?: any;
  lang?: string;
}

const DEFAULT_SLIDES: Record<string, SlideData> = {
  slide1: {
    badge: 'Wrapp AI – Your Smart Advertising Companion',
    title: 'Empowering Through intelligent, data-driven support.',
    description:
      'Ask_Di” is your smart, friendly AI assistant built into the Di_Wrapp platform. It helps advertisers, vendors, and support teams navigate booking, optimize campaigns, and even create content —',
    highlight: 'all through intuitive, AI-powered interactions.',
    cta: 'Try Ask_Di',
    bgImage: '/assets/ask-di-slide-white.webp',
    isDarkTheme: false,
  },
  slide2: {
    badge: 'Ad Creation Tools',
    title: 'Don’t have a design team? No problem.',
    description:
      'Streamlines your advertising process by generating visual ad drafts, suggests messaging and tone, and recommends trending ad styles tailored to your product. —',
    highlight: 'so you can build impactful campaigns, all in one place.',
    cta: 'Create with Ask_Di',
    bgImage: '/assets/ask-di-slide-purple.webp',
    isDarkTheme: true,
  },
};

const renderBidiText = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/(Ask_Di|Di_Wrapp|\(24\/7\)|24\/7|\bDi\b)/g);
  if (parts.length === 1) return text;
  return parts.map((part, index) => {
    if (
      part === 'Ask_Di' ||
      part === 'Di_Wrapp' ||
      part === 'Di' ||
      part === '(24/7)' ||
      part === '24/7'
    ) {
      return (
        <span key={index} dir="ltr" className="inline-block whitespace-nowrap">
          {part}
        </span>
      );
    }
    return part;
  });
};

export const AskDiCarousel: React.FC<AskDiCarouselProps> = ({ dict, lang = 'en' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const componentId = useId();

  const isRtl = lang === 'ar';
  const c = dict?.askDiCarousel;

  const slides: SlideData[] = [
    {
      badge: c?.slide1?.badge || DEFAULT_SLIDES.slide1.badge,
      title: c?.slide1?.title || DEFAULT_SLIDES.slide1.title,
      description: c?.slide1?.description || DEFAULT_SLIDES.slide1.description,
      highlight: c?.slide1?.highlight || DEFAULT_SLIDES.slide1.highlight,
      cta: c?.slide1?.cta || DEFAULT_SLIDES.slide1.cta,
      bgImage: '/assets/ask-di-slide-white.webp',
      isDarkTheme: false,
    },
    {
      badge: c?.slide2?.badge || DEFAULT_SLIDES.slide2.badge,
      title: c?.slide2?.title || DEFAULT_SLIDES.slide2.title,
      description: c?.slide2?.description || DEFAULT_SLIDES.slide2.description,
      highlight: c?.slide2?.highlight || DEFAULT_SLIDES.slide2.highlight,
      cta: c?.slide2?.cta || DEFAULT_SLIDES.slide2.cta,
      bgImage: '/assets/ask-di-slide-purple.webp',
      isDarkTheme: true,
    },
  ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((targetIndex: number) => {
    setCurrentIndex(targetIndex);
  }, []);

  const handleDotClick = goToSlide;

  // Auto-play timer with pause-on-hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  // Swipe / Drag gesture handling
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 40;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -swipeThreshold || velocity < -350) {
      if (isRtl) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else if (offset > swipeThreshold || velocity > 350) {
      if (isRtl) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      if (isRtl) prevSlide();
      else nextSlide();
    } else if (e.key === 'ArrowLeft') {
      if (isRtl) nextSlide();
      else prevSlide();
    }
  };

  const currentSlide = slides[currentIndex];

  const slideVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const, // Smooth cubic-bezier ease
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const contentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: shouldReduceMotion ? 0 : 0.1,
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const contentItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Ask_Di Features Carousel"
      className="w-full py-16 lg:py-24 bg-transparent"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Main Card Container */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Features Slide"
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full max-w-[1240px] mx-auto min-h-[500px] lg:h-[520px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-[#EAECF0]/60 dark:border-neutral-800/60 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 select-none cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={`${componentId}-slide-${currentIndex}`}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 w-full h-full flex flex-col justify-center overflow-hidden"
            >
              {/* Background Art Layer */}
              <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
                <Image
                  src={currentSlide.bgImage}
                  alt={currentSlide.title}
                  fill
                  priority
                  className={`object-cover object-right rtl:object-left rtl:scale-x-[-1] transition-transform duration-500 ${
                    lang === 'ar' ? 'scale-x-[-1] object-left' : ''
                  }`}
                />
              </div>

              {/* Text Contrast Shield for Mobile / Small Screens */}
              <div
                className={`absolute inset-0 pointer-events-none sm:hidden ${
                  currentSlide.isDarkTheme
                    ? 'bg-gradient-to-t from-purple-900/90 via-purple-900/60 to-transparent'
                    : 'bg-gradient-to-t from-white/95 via-white/70 to-transparent'
                }`}
              />

              {/* Slide Content Stack */}
              <div className="relative z-10 w-full h-full flex flex-col justify-center items-start rtl:items-start p-8 sm:p-12 lg:p-16 text-left rtl:text-right">
                <motion.div
                  variants={contentContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full max-w-[580px] lg:max-w-[620px] ltr:mr-auto rtl:ml-auto mr-auto rtl:mr-0 rtl:ml-auto flex flex-col items-start rtl:items-start text-left rtl:text-right"
                >
                  {/* Pill Badge */}
                  <motion.div variants={contentItemVariants} className="self-start">
                    <div
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-6 shadow-2xs backdrop-blur-md bg-transparent ${
                        currentSlide.isDarkTheme
                          ? 'border border-white/20'
                          : 'border border-[#D0D5DD]'
                      }`}
                    >
                      <Sparks
                        className={`w-4 h-4 shrink-0 ${
                          currentSlide.isDarkTheme ? 'text-white/90' : 'text-[#344054]'
                        }`}
                      />
                      <span
                        className={`font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] leading-[20px] font-medium ${
                          currentSlide.isDarkTheme ? 'text-white' : 'text-[#344054]'
                        }`}
                      >
                        {renderBidiText(currentSlide.badge)}
                      </span>
                    </div>
                  </motion.div>

                  {/* Heading */}
                  <motion.h2
                    variants={contentItemVariants}
                    className={`font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[32px] sm:text-[40px] lg:text-[48px] font-semibold leading-[40px] sm:leading-[50px] lg:leading-[58px] tracking-[-0.01em] mb-4 ${
                      currentSlide.isDarkTheme
                        ? 'text-white'
                        : 'text-[#101828]'
                    }`}
                  >
                    {renderBidiText(currentSlide.title)}
                  </motion.h2>

                  {/* Description & Bold Highlight */}
                  <motion.p
                    variants={contentItemVariants}
                    className={`font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[15px] sm:text-[16px] lg:text-[18px] leading-[24px] sm:leading-[26px] lg:leading-[28px] mb-8 ${
                      currentSlide.isDarkTheme ? 'text-white/85' : 'text-[#475467]'
                    }`}
                  >
                    <span>{renderBidiText(currentSlide.description)}</span>{' '}
                    <span
                      className={`font-semibold ${
                        currentSlide.isDarkTheme ? 'text-white' : 'text-[#101828]'
                      }`}
                    >
                      {renderBidiText(currentSlide.highlight)}
                    </span>
                  </motion.p>

                  {/* CTA Button */}
                  <motion.div variants={contentItemVariants} className="self-start">
                    <Link
                      href={lang ? `/${lang}/join-us` : '/join-us'}
                      className={`h-[44px] px-6 rounded-[8px] font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium transition-all duration-200 inline-flex items-center justify-center cursor-pointer shadow-xs active:scale-[0.98] ${
                        currentSlide.isDarkTheme
                          ? 'bg-white text-[#101828] hover:bg-neutral-100'
                          : 'bg-[#0066FF] hover:bg-blue-600 text-white'
                      }`}
                    >
                      {renderBidiText(currentSlide.cta)}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Indicators */}
        <div
          role="tablist"
          aria-label="Carousel pagination"
          dir="ltr"
          className="flex items-center justify-center gap-2 mt-6 rtl:flex-row-reverse"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={currentIndex === index}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                currentIndex === index
                  ? 'w-6 bg-[#101828] dark:bg-white'
                  : 'w-2 bg-[#D0D5DD] dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AskDiCarousel;
