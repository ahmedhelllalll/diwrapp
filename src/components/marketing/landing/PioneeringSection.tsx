"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

export interface PioneeringSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict?: any;
  lang?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1, ease: "easeOut" }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function PioneeringSection({ dict, lang = "en" }: PioneeringSectionProps) {
  const isRtl = lang === "ar";

  const features = [
    dict?.feature1 || (isRtl ? "وسّع نطاق وصولك عبر جميع الأسواق بسهولة" : "Expand Your Reach Across All Markets Easily"),
    dict?.feature2 || (isRtl ? "أدر قوائمك في أي وقت ومن أي مكان وسلط الضوء على الرؤى الرئيسية" : "Manage your Listings anytime, anywhere and highlight key insights"),
    dict?.feature3 || (isRtl ? "احصل على إشعارات فورية وتحديثات مهمة حول تقارير الحجوزات" : "Get instant notifications & important updates on Booking Reports"),
  ];

  return (
    <section id="media-reach-section" className="pioneering-section w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24 lg:my-32 relative overflow-x-clip z-10">
      
      {/* Dynamic Panorama Banner (Light vs Dark) - Higher z-index than map */}
      <div className="relative z-20 w-full max-w-7xl mx-auto overflow-hidden mb-8 sm:mb-12 lg:mb-20">
        {/* Light Mode Banner */}
        <div className="block dark:hidden relative w-full aspect-[1920/620] lg:aspect-auto lg:h-[460px]">
          <Image 
            alt="Diwrapp Media Reach Vehicles and OOH" 
            className="object-contain object-bottom" 
            fill 
            sizes="(max-width: 1280px) 100vw, 1200px"
            src="/images/features/pioneering-banner-light.webp"
          />
        </div>

        {/* Dark Mode Banner */}
        <div className="hidden dark:block relative w-full aspect-[1920/620] lg:aspect-auto lg:h-[460px]">
          <Image 
            alt="Diwrapp Media Reach Vehicles and OOH" 
            className="object-contain object-bottom" 
            fill 
            sizes="(max-width: 1280px) 100vw, 1200px"
            src="/images/features/pioneering-banner-dark.webp"
          />
        </div>
      </div>

      {/* Lower Showcase Area (Decoupled Background Map + Interactive Two-Column Grid) */}
      <div className="relative z-10 w-full">
        
        {/* =========================================================================
            DECOUPLED STATIC WORLD MAP BACKDROP:
            Completely locked in LTR coordinates, perfectly aligned to desktop right columns,
            never flipped, never mirrored, and never shifted to the left in RTL.
           ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" dir="ltr">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 w-full h-full">
            <div className="hidden lg:block lg:col-span-5" />
            <div className="lg:col-span-7 relative flex items-start justify-center overflow-visible w-full">
              <div 
                className="absolute top-0 sm:top-2 lg:-top-64 xl:-top-72 left-1/2 -translate-x-1/2 z-0 flex items-start justify-center pointer-events-none select-none overflow-visible w-full"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 96%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 96%)',
                }}
              >
                {/* Light Mode Map */}
                <div 
                  className="block dark:hidden relative w-full sm:w-full md:w-[720px] lg:w-[860px] max-w-full lg:max-w-[880px] h-[360px] sm:h-[400px] lg:h-[440px] shrink-0"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 96%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 96%)',
                  }}
                >
                  <Image 
                    src={lang === "ar" ? "/images/features/world-map-light-ar.webp" : "/images/features/world-map-light-en.webp"}
                    alt="World Coverage Map"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 720px, 828px"
                    className="object-contain object-top opacity-90"
                  />
                </div>

                {/* Dark Mode Map */}
                <div 
                  className="hidden dark:block relative w-full sm:w-full md:w-[720px] lg:w-[860px] max-w-full lg:max-w-[880px] h-[360px] sm:h-[400px] lg:h-[440px] shrink-0"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 96%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 96%)',
                  }}
                >
                  <Image 
                    src={lang === "ar" ? "/images/features/world-map-dark-ar.webp" : "/images/features/world-map-dark-en.webp"}
                    alt="World Coverage Map"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 720px, 828px"
                    className="object-contain object-top opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TWO-COLUMN INTERACTIVE CONTENT GRID:
            In Arabic (RTL): Text Column on the RIGHT, Cards Showcase on the LEFT.
            In English (LTR): Text Column on the LEFT, Cards Showcase on the RIGHT.
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10" dir={isRtl ? "rtl" : "ltr"}>
          
          {/* PRIMARY TEXT COLUMN (Right in RTL, Left in LTR) */}
          <motion.div 
            className="lg:col-span-5 flex flex-col items-start text-left rtl:text-right relative z-20"
            dir={isRtl ? "rtl" : "ltr"}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
          >
            {/* Eyebrow Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <Badge>
                {dict?.badge || (isRtl ? "ذكي، سريع وموثوق – فقط لأجلك!" : "Smart, Fast & Reliable – Just for You!")}
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h2 
              variants={itemVariants}
              className="pioneering-title font-lufga rtl:font-['Cairo',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-heading dark:text-white tracking-tight leading-[1.15] mb-4"
            >
              {dict?.title || (isRtl ? "ريادة مستقبل إمكانية الوصول للوسائط" : "Pioneering the Future of Media Accessibility")}
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="pioneering-desc font-lufga rtl:font-['Cairo',sans-serif] text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed max-w-lg mb-8 transition-colors"
            >
              {dict?.desc || (isRtl ? "تقود تقنية دي-راب ثورة في إمكانية الوصول إلى الوسائط، لضمان أن تكون كل مساحة في متناول الجميع." : "Di_Wrapp Technology is leading the revolution in media accessibility, ensuring every Inventory is within reach for all.")}
            </motion.p>

            {/* Feature List Items with Clean White SVG Checkmarks */}
            <motion.ul variants={itemVariants} className="space-y-4 mb-8 w-full">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3.5 group">
                  <div className="w-5 h-5 rounded-full bg-brand dark:bg-blue-500/90 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-heading dark:text-zinc-200 group-hover:text-brand dark:group-hover:text-blue-400 transition-colors font-lufga rtl:font-['Cairo',sans-serif]">
                    {feature}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons (Learn More & Book Your Spot) */}
            <motion.div variants={itemVariants} className="pioneering-actions flex items-center gap-3.5 pt-2 flex-wrap">
              {/* Secondary Button */}
              <Link
                href={`/${lang}/about`}
                aria-label={isRtl ? "اكتشف المزيد حول حلول دي راب الإعلانية" : "Learn more about Diwrapp advertising and media solutions"}
                className="inline-flex items-center justify-center min-w-[130px] h-[48px] px-6 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-bold text-heading dark:text-white hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-300 transition-all active:scale-[0.98] font-lufga rtl:font-['Cairo',sans-serif]"
              >
                <span>{dict?.learnMore || (isRtl ? "اكتشف المزيد" : "Learn More")}<span className="sr-only"> {isRtl ? "حول حلول دي راب الإعلانية" : "about Diwrapp media solutions"}</span></span>
              </Link>

              {/* Primary Button */}
              <Link
                href={`/${lang}/book`}
                aria-label={isRtl ? "احجز مساحتك الإعلانية على دي راب" : "Book your advertising spot on Diwrapp"}
                className="inline-flex items-center justify-center min-w-[150px] h-[48px] px-6 rounded-xl bg-brand hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-sm font-bold text-white transition-all shadow-sm dark:shadow-[0_4px_24px_rgba(37,99,235,0.28)] active:scale-[0.98] font-lufga rtl:font-['Cairo',sans-serif]"
              >
                {dict?.bookSpot || (isRtl ? "احجز مساحتك" : "Book Your Spot")}
              </Link>
            </motion.div>
          </motion.div>

          {/* VISUAL CARDS SHOWCASE (Left in RTL, Right in LTR) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] w-full" dir="ltr">
            
            {/* Independent Floating Dashboard Cards Over the Map - Locked in LTR */}
            <div className="relative z-10 w-full max-w-[920px] mx-auto flex flex-col lg:flex-row items-center lg:items-end justify-center gap-5 select-none mt-8 sm:mt-12" dir="ltr">
              
              {/* Combined Productivity Showcase (Width ~580px) */}
              <div className="flex-1 flex flex-col gap-5 max-w-[560px]">
                
                {/* Top Row: Calendar + Developer Image (Strictly Equal Heights via Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch min-h-[270px]">
                  
                  {/* 1. Calendar Card */}
                  <div className="relative h-full w-full bg-[#FAFAFA] dark:bg-surface-2 border border-slate-200/80 dark:border-zinc-800 rounded-[24px] pt-5 pl-4 sm:pl-5 pr-0 pb-0 overflow-hidden flex flex-col justify-end items-end shadow-sm" aria-hidden="true">
                    {/* Inner White Calendar Window Docked to Bottom-Right */}
                    <div className="w-full bg-white dark:bg-surface-3 rounded-tl-xl shadow-sm border border-slate-200/80 dark:border-zinc-700/80 p-4 sm:p-5 border-r-0 border-b-0 relative z-10 translate-x-1 translate-y-1">
                      {/* Mac Dots */}
                      <div className="flex items-center gap-1.5 mb-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                      </div>

                      {/* Header */}
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-white mb-3 font-['Lufga',sans-serif]">
                        <span>Calendar</span>
                        <span className="text-[10px] text-slate-600 dark:text-zinc-400 font-semibold flex items-center gap-1">
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                          August 2025
                        </span>
                      </div>

                      {/* Day Headers */}
                      <div className="grid grid-cols-7 text-[10px] font-semibold text-slate-600 dark:text-zinc-400 text-center mb-2 font-['Lufga',sans-serif]">
                        <span>Mo</span><span>Tu</span><span>We</span><span>Thu</span><span>Fr</span><span>Sa</span><span>Su</span>
                      </div>

                      {/* Days Grid */}
                      <div className="grid grid-cols-7 gap-y-2 text-center text-[11px] font-medium text-slate-700 dark:text-zinc-300">
                        <span className="text-slate-500 dark:text-zinc-400">16</span>
                        <span className="text-slate-500 dark:text-zinc-400">28</span>
                        <span className="text-slate-500 dark:text-zinc-400">29</span>
                        <span className="text-slate-500 dark:text-zinc-400">30</span>
                        <span className="text-slate-500 dark:text-zinc-400">31</span>
                        <span>1</span>
                        <span>2</span>

                        <span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
                        
                        <span className="bg-[#2563EB] text-white rounded w-6 h-6 flex items-center justify-center mx-auto shadow-sm font-semibold">10</span>
                        <span className="flex items-center justify-center h-6">11</span>
                        <span className="flex items-center justify-center h-6">12</span>
                        <span className="bg-[#2563EB] text-white rounded w-6 h-6 flex items-center justify-center mx-auto shadow-sm font-semibold">13</span>
                        <span className="flex items-center justify-center h-6">14</span>
                        <span className="flex items-center justify-center h-6">15</span>
                        <span className="flex items-center justify-center h-6">16</span>
                        
                        <span className="text-slate-500 dark:text-zinc-400">17</span>
                        <span className="text-slate-500 dark:text-zinc-400">18</span>
                        <span className="text-slate-500 dark:text-zinc-400">19</span>
                        <span>20</span><span>21</span><span>22</span><span>23</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Developer Workspace Image Card */}
                  <div className="relative h-full rounded-[24px] overflow-hidden shadow-sm border border-slate-200/80 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-surface-2">
                    <Image alt="Developer at workspace" className="object-cover" fill src="/images/features/developer-desk.webp" sizes="(max-width: 640px) 50vw, 260px" />
                    {/* Floating Pill Overlay at Bottom - INSIDE THE IMAGE */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[88%] bg-white dark:bg-surface-3 rounded-[14px] p-2.5 shadow-md border border-slate-100 dark:border-zinc-800 flex items-center gap-3 z-10" aria-hidden="true">
                      <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <svg className="w-3 h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="whitespace-nowrap flex flex-col justify-center">
                        <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight font-['Lufga',sans-serif]">Publish New Listing</p>
                        <p className="text-[10px] text-slate-600 dark:text-zinc-300 font-medium leading-tight font-['Lufga',sans-serif]">Due Today</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Row: 5x Productivity Pill Matched to Calendar Card in Dark Mode */}
                <div 
                  className="relative w-full overflow-hidden bg-[#F4F7FD] dark:bg-surface-3 border border-[#E1EAF8] dark:border-zinc-800 rounded-[24px] sm:rounded-[28px] min-h-[105px] sm:min-h-[110px] py-6 sm:py-7 px-5 sm:px-6 flex items-center justify-between shadow-xs select-none isolate"
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  
                  {/* Content (Text & Multiplier) - Positioned on Left in LTR, Right in RTL */}
                  <div className="flex items-center gap-4 sm:gap-5 relative z-10" dir={isRtl ? "rtl" : "ltr"}>
                    <span className="text-3xl sm:text-4xl font-black text-brand dark:text-blue-400 tracking-tight font-lufga shrink-0" dir="ltr">
                      5x
                    </span>
                    <div className={`space-y-1 max-w-[340px] ${isRtl ? "text-right" : "text-left"}`}>
                      <p className="text-xs sm:text-sm font-bold text-heading dark:text-white leading-snug rtl:leading-normal font-lufga rtl:font-['Cairo',sans-serif]">
                        {isRtl ? "سرّع إنتاجية أعمالك" : "Fasten your Business Productivity"}
                      </p>
                      <p className="text-xs font-normal text-slate-500 dark:text-zinc-400 leading-snug rtl:leading-normal font-lufga rtl:font-['Cairo',sans-serif]">
                        {isRtl ? "من خلال حلولنا المبتكرة والمتطورة" : "with our cutting edge-solutions"}
                      </p>
                    </div>
                  </div>

                  {/* Geometric Flash Graphic - Anchored to Bottom-Right in LTR, Bottom-Left in RTL */}
                  <div 
                    className={`absolute -bottom-8 sm:-bottom-12 w-48 sm:w-56 h-48 sm:h-56 pointer-events-none select-none ${
                      isRtl ? "-left-8 sm:-left-12" : "-right-8 sm:-right-12"
                    }`}
                  >
                    <svg
                      viewBox="0 0 120 120"
                      className="w-full h-full text-brand opacity-[0.10] dark:opacity-100 dark:text-zinc-500/15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M68 8 L24 64 L60 64 L52 112 L96 56 L60 56 Z" />
                    </svg>
                  </div>

                </div>

              </div>

              {/* RIGHT COLUMN: Tablet Backdrop Frame */}
              <div className="relative w-full max-w-[250px] sm:max-w-[260px] rounded-[20px] bg-[#F4F6F9] dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800/80 p-3 sm:p-3.5 flex flex-col items-center select-none shadow-sm self-center lg:self-end">
                
                {/* 1. Mac Window Control Dots */}
                <div className="w-full flex items-center gap-1.5 mb-2.5 px-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>

                {/* 2. Floating Main Card with Floating Reach Badge */}
                <div className="relative w-full">
                  
                  {/* Floating Reach Badge (floats outside the clipped card boundary) */}
                  <div className="absolute top-[34px] -right-2.5 sm:-right-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-md px-2 py-1 shadow-lg border border-slate-100/80 dark:border-zinc-700/80 z-20 pointer-events-none" aria-hidden="true">
                    <p className="text-[9px] font-bold text-slate-900 dark:text-white leading-tight font-lufga">Increase Reach</p>
                    <div className="flex items-center gap-1 mt-0.5 whitespace-nowrap">
                      <span className="text-[11px] font-black text-slate-900 dark:text-white font-lufga">45%</span>
                      <span className="text-[7.5px] text-slate-600 dark:text-zinc-400 font-medium font-lufga">vs. last period</span>
                      <span className="text-[8.5px] font-bold text-emerald-500 flex items-center font-lufga">↑ 12%</span>
                    </div>
                  </div>

                  {/* Strictly Clipped Card Container: Prevents Any White Background Corner Leakage */}
                  <div className="w-full bg-white dark:bg-surface-3 rounded-[13px] shadow-xl border border-slate-100 dark:border-zinc-800 flex flex-col overflow-hidden">
                    
                    {/* Uncropped Full Graphic Card Asset */}
                    <div className="w-full">
                      <Image
                        src="/images/features/kingdom-tower.webp"
                        alt="Kingdom Tower"
                        width={549}
                        height={747}
                        sizes="260px"
                        className="w-full h-auto object-contain block select-none"
                      />
                    </div>

                    {/* Bottom Flush CTA Button: linked to advertise page */}
                    <Link
                      href={`/${lang}/advertise`}
                      className="w-full bg-[#111827] hover:bg-black dark:bg-[#111827] dark:hover:bg-black text-white text-[11px] font-bold py-2.5 px-3 flex items-center justify-center gap-1.5 transition-all active:scale-[0.99] font-lufga rounded-none cursor-pointer"
                    >
                      <span>Book Channel</span>
                      <svg className="w-3.5 h-3.5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16l4-4-4-4m4 4H8" />
                      </svg>
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
