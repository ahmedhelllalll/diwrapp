import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LandingHeader from '@/components/layout/LandingHeader';
import Footer from '@/components/layout/Footer';
import enDict from '@/dictionaries/en.json';
import arDict from '@/dictionaries/ar.json';
import { Locale } from '@/i18n-config';
import {
  MotionContentContainer,
  MotionContentItem,
  MotionBillboardContainer,
  MotionButtonWrapper,
} from '@/components/common/MotionWrapper';

interface NotFoundViewProps {
  lang?: Locale;
}

export default function NotFoundView({ lang = 'en' }: NotFoundViewProps) {
  const isRtl = lang === 'ar';
  const dict = isRtl ? arDict : enDict;
  const nextLang = isRtl ? 'en' : 'ar';
  const langLabel = isRtl ? 'English' : 'عربي';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="flex-1 flex flex-col min-h-screen bg-white dark:bg-[#080808] transition-colors duration-300 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
    >
      {/* Navigation Header */}
      <LandingHeader
        lang={lang}
        nextLang={nextLang}
        langLabel={langLabel}
        dictNav={dict.landing?.nav}
      />

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center w-full bg-[#F2F4F7] dark:bg-[#0B0D10] border-b border-[#EAECF0] dark:border-zinc-800/80 transition-colors duration-300 pt-24 sm:pt-28 lg:pt-32 pb-0 overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">
          {/* Billboard Mockup (Bottom on mobile, Left 7 Cols on desktop) */}
          <MotionBillboardContainer className="order-2 lg:order-1 lg:col-span-7 relative flex items-end justify-center w-full self-end">
            <div className="relative w-full max-w-[540px] sm:max-w-[600px] lg:max-w-[680px] h-auto select-none">
              <Image
                src="/images/not-found-billboard.webp"
                alt="Error 404 - Not Found Billboard"
                width={716}
                height={563}
                priority
                className="w-full h-auto object-contain select-none pointer-events-none block"
              />
            </div>
          </MotionBillboardContainer>

          {/* Copy & Call to Action (Top on mobile, Right 5 Cols on desktop) */}
          <MotionContentContainer className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-start justify-center max-w-lg w-full pt-6 pb-2 lg:py-16 self-center text-start">
            {/* Pill Badge */}
            <MotionContentItem>
              <div className="inline-flex items-center px-3 py-1 rounded-full font-medium text-[14px] leading-[20px] tracking-normal bg-[#F2F4F7] dark:bg-zinc-800 text-[#344054] dark:text-zinc-300 border border-[#EAECF0] dark:border-zinc-700/60 mb-5 lg:mb-6 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
                <span>{dict.notFound.badge}</span>
              </div>
            </MotionContentItem>

            {/* Main Heading */}
            <MotionContentItem>
              <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-medium text-[#101828] dark:text-white leading-[36px] lg:leading-[44px] tracking-[-0.01em] mb-3 sm:mb-4 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
                {dict.notFound.title}
              </h1>
            </MotionContentItem>

            {/* Subtext */}
            <MotionContentItem>
              <p className="text-[16px] font-normal text-[#667085] dark:text-zinc-400 leading-[24px] tracking-normal mb-6 sm:mb-8 max-w-md font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] m-0">
                {dict.notFound.description}
              </p>
            </MotionContentItem>

            {/* Button */}
            <MotionContentItem>
              <MotionButtonWrapper>
                <Link
                  href={`/${lang}`}
                  className="h-[46px] px-6 rounded-lg bg-[#101828] hover:bg-[#1D2939] dark:bg-white dark:text-[#101828] dark:hover:bg-zinc-100 text-white font-medium text-[16px] leading-[24px] tracking-normal text-center transition-all duration-200 shadow-xs inline-flex items-center justify-center font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] cursor-pointer"
                >
                  {dict.notFound.backHome}
                </Link>
              </MotionButtonWrapper>
            </MotionContentItem>
          </MotionContentContainer>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
