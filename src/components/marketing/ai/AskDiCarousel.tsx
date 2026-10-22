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
  bgImageDesktop: string;
  bgImageMobile: string;
  bgDarkDesktop?: string;
  bgDarkMobile?: string;
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
      'Ask Di is your smart, friendly AI assistant built into the Di-Wrapp platform. It helps advertisers, vendors, and support teams navigate booking, optimize campaigns, and even create content —',
    highlight: 'all through intuitive, AI-powered interactions.',
    cta: 'Try Ask Di',
    bgImageDesktop: '/assets/ask-di-slide-white.webp',
    bgImageMobile: '/assets/background-ai-light-mobile.webp',
    bgDarkDesktop: '/assets/background-ai-dark.webp',
    bgDarkMobile: '/assets/background-ai-dark-mobile.webp',
    isDarkTheme: false,
  },
  slide2: {
    badge: 'Ad Creation Tools',
    title: 'Don’t have a design team? No problem.',
    description:
      'Streamlines your advertising process by generating visual ad drafts, suggests messaging and tone, and recommends trending ad styles tailored to your product. —',
    highlight: 'so you can build impactful campaigns, all in one place.',
    cta: 'Create with Ask Di',
    bgImageDesktop: '/assets/ask-di-slide-purple.webp',
    bgImageMobile: '/assets/ask-di-slide-purple-mobile.webp',
    isDarkTheme: true,
  },
};

const renderBidiText = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/(Ask Di|Di-Wrapp|\(24\/7\)|24\/7|\bDi\b)/g);
  if (parts.length === 1) return text;
  return parts.map((part, index) => {
    if (
      part === 'Ask Di' ||
      part === 'Di-Wrapp' ||
      part === 'Di' ||
      part === '(24/7)' ||
      part === '24/7'
    ) {
      return (
        <span key={index} dir="ltr" className="inline whitespace-nowrap">
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
      bgImageDesktop: '/assets/ask-di-slide-white.webp',
      bgImageMobile: '/assets/background-ai-light-mobile.webp',
      bgDarkDesktop: '/assets/background-ai-dark.webp',
      bgDarkMobile: '/assets/background-ai-dark-mobile.webp',
      isDarkTheme: false,
    },
    {
      badge: c?.slide2?.badge || DEFAULT_SLIDES.slide2.badge,
      title: c?.slide2?.title || DEFAULT_SLIDES.slide2.title,
      description: c?.slide2?.description || DEFAULT_SLIDES.slide2.description,
      highlight: c?.slide2?.highlight || DEFAULT_SLIDES.slide2.highlight,
      cta: c?.slide2?.cta || DEFAULT_SLIDES.slide2.cta,
      bgImageDesktop: '/assets/ask-di-slide-purple.webp',
      bgImageMobile: '/assets/ask-di-slide-purple-mobile.webp',
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
        ease: [0.25, 0.1, 0.25, 1] as const,
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
      aria-label="Ask Di Features Carousel"
      className="w-full py-10 sm:py-16 lg:py-24 bg-transparent"
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
          className="relative w-full max-w-[1240px] mx-auto min-h-[520px] sm:min-h-[480px] lg:h-[520px] rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-[#EAECF0]/80 dark:border-neutral-800/80 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 select-none cursor-grab active:cursor-grabbing touch-pan-y"
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
              className="absolute inset-0 w-full h-full flex flex-col justify-end md:justify-center overflow-hidden"
            >
              {/* Background Art Layer */}
              <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
                {/* Mobile Background (<768px) */}
                <div className="absolute inset-0 md:hidden">
                  <Image
                    src={currentSlide.bgImageMobile}
                    alt=""
                    fill
                    priority={currentIndex === 0}
                    sizes="100vw"
                    className={`object-cover object-top ${
                      currentSlide.bgDarkMobile ? 'dark:hidden' : ''
                    }`}
                  />
                  {currentSlide.bgDarkMobile && (
                    <Image
                      src={currentSlide.bgDarkMobile}
                      alt=""
                      fill
                      priority={currentIndex === 0}
                      sizes="100vw"
                      className="object-cover object-top hidden dark:block"
                    />
                  )}
                </div>

                {/* Desktop Background (>=768px) */}
                <div className="absolute inset-0 hidden md:block">
                  <Image
                    src={currentSlide.bgImageDesktop}
                    alt=""
                    fill
                    priority={currentIndex === 0}
                    sizes="1240px"
                    className={`object-cover object-right md:rtl:object-left md:rtl:scale-x-[-1] transition-transform duration-500 ${
                      currentSlide.bgDarkDesktop ? 'dark:hidden' : ''
                    } ${lang === 'ar' ? 'md:scale-x-[-1] md:object-left' : ''}`}
                  />
                  {currentSlide.bgDarkDesktop && (
                    <Image
                      src={currentSlide.bgDarkDesktop}
                      alt=""
                      fill
                      priority={currentIndex === 0}
                      sizes="1240px"
                      className={`object-cover object-right md:rtl:object-left md:rtl:scale-x-[-1] transition-transform duration-500 hidden dark:block ${
                        lang === 'ar' ? 'md:scale-x-[-1] md:object-left' : ''
                      }`}
                    />
                  )}
                </div>
              </div>

              {/* Slide Content Stack */}
              <div className="relative z-10 w-full h-full flex flex-col justify-end md:justify-center items-start rtl:items-start max-[359px]:px-3.5 max-[359px]:py-4 p-5 sm:p-10 lg:p-16 text-left rtl:text-right">
                <motion.div
                  variants={contentContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full max-w-[580px] lg:max-w-[620px] ltr:mr-auto rtl:ml-auto mr-auto rtl:mr-0 rtl:ml-auto flex flex-col items-start rtl:items-start text-left rtl:text-right"
                >
                  {/* Pill Badge */}
                  <motion.div variants={contentItemVariants} className="self-start">
                    <div
                      className={`inline-flex items-center whitespace-nowrap gap-1 sm:gap-2 rounded-full max-[359px]:px-1.5 px-2.5 py-0.5 sm:px-3.5 sm:py-1 mb-3 sm:mb-5 lg:mb-6 shadow-2xs bg-transparent ${
                        currentSlide.isDarkTheme
                          ? 'border border-white/20'
                          : 'border border-[#D0D5DD] dark:border-white/20'
                      }`}
                    >
                      <Sparks
                        className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 ${
                          currentSlide.isDarkTheme ? 'text-white/90' : 'text-[#344054] dark:text-white/90'
                        }`}
                      />
                      <span
                        className={`font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] whitespace-nowrap max-[359px]:text-[10px] text-[11px] sm:text-[14px] max-[359px]:leading-[15px] leading-[16px] sm:leading-[20px] font-medium ${
                          currentSlide.isDarkTheme ? 'text-white' : 'text-[#344054] dark:text-white'
                        }`}
                      >
                        {renderBidiText(currentSlide.badge)}
                      </span>
                    </div>
                  </motion.div>

                  {/* Heading */}
                  <motion.h2
                    variants={contentItemVariants}
                    className={`font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[20px] sm:text-[30px] lg:text-[44px] font-semibold leading-[28px] sm:leading-[38px] lg:leading-[54px] tracking-[-0.01em] mb-2.5 sm:mb-4 ${
                      currentSlide.isDarkTheme
                        ? 'text-white'
                        : 'text-[#101828] dark:text-white'
                    }`}
                  >
                    {renderBidiText(currentSlide.title)}
                  </motion.h2>

                  {/* Description & Bold Highlight */}
                  <motion.p
                    variants={contentItemVariants}
                    className={`font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[13px] sm:text-[15px] lg:text-[17px] leading-[20px] sm:leading-[24px] lg:leading-[27px] mb-5 sm:mb-8 ${
                      currentSlide.isDarkTheme ? 'text-white/85' : 'text-[#475467] dark:text-white/85'
                    }`}
                  >
                    <span>{renderBidiText(currentSlide.description)}</span>{' '}
                    <span
                      className={`font-semibold ${
                        currentSlide.isDarkTheme ? 'text-white' : 'text-[#101828] dark:text-white'
                      }`}
                    >
                      {renderBidiText(currentSlide.highlight)}
                    </span>
                  </motion.p>

                  {/* CTA Button */}
                  <motion.div variants={contentItemVariants} className="self-start">
                    <Link
                      href={lang ? `/${lang}/join-us` : '/join-us'}
                      className={`h-[40px] sm:h-[44px] px-5 sm:px-6 rounded-[8px] font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[13.5px] sm:text-[14px] font-medium transition-all duration-200 inline-flex items-center justify-center cursor-pointer shadow-xs active:scale-[0.98] ${
                        currentSlide.isDarkTheme
                          ? 'bg-white text-[#101828] hover:bg-neutral-100'
                          : 'bg-[#0066FF] hover:bg-blue-600 text-white dark:bg-white dark:text-[#101828] dark:hover:bg-neutral-100'
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
          className="flex items-center justify-center gap-2 mt-4 sm:mt-6 rtl:flex-row-reverse"
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

