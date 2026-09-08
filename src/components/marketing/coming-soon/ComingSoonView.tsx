import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ComingSoonNavbar from './ComingSoonNavbar';
import Footer from '@/components/layout/Footer';

interface ComingSoonViewProps {
  lang: string;
  dict?: {
    tag?: string;
    title?: string;
    description?: string;
    button?: string;
    screenLaunching?: string;
    screenStayTuned?: string;
  };
  dictNav?: {
    about?: string;
    advertise?: string;
    blog?: string;
    join?: string;
    contact?: string;
    signIn?: string;
  };
  showNavLinks?: boolean;
}

export default function ComingSoonView({
  lang,
  dict = {
    tag: '#Coming_Soon',
    title: 'Stay tuned for exclusive updates and early access!',
    description: "We have something exciting in the works, and we can't wait to share it with you!",
    button: 'Back To Homepage',
    screenLaunching: 'Launching Soon',
    screenStayTuned: 'Stay Tuned!',
  },
  dictNav,
  showNavLinks = true,
}: ComingSoonViewProps) {
  const isRtl = lang === 'ar';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-white dark:bg-[#080808] transition-colors duration-300 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
    >
      {/* 1. Header with System Design Links */}
      <ComingSoonNavbar
        lang={lang}
        dictNav={dictNav}
        showNavLinks={showNavLinks}
      />

      {/* 2. Hero Section Refinements */}
      <main className="flex-1 flex items-center justify-center w-full bg-[#F2F4F7] dark:bg-[#0B0D10] border-b border-[#EAECF0] dark:border-zinc-800/80 transition-colors duration-300 pt-10 lg:pt-14 pb-0 overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
          {/* Billboard Mockup (Left 7 Cols) */}
          <div className="lg:col-span-7 relative flex items-end justify-center w-full self-end">
            <div className="relative w-full max-w-[680px] h-auto select-none">
              {/* Billboard Mockup Graphic */}
              <Image
                src="/assets/billboard-mockup.png"
                alt="Billboard Mockup"
                width={716}
                height={563}
                priority
                className="w-full h-auto object-contain select-none pointer-events-none block"
              />

              {/* Screen Content Overlay: Anchored directly over the white LED billboard display */}
              <div className="absolute left-[9%] right-[23%] top-[11%] bottom-[30%] flex flex-col items-center justify-center text-center pointer-events-none select-none z-10 px-4">
                <span className="text-sm lg:text-base font-medium text-[#101828] mb-1 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
                  {dict.screenLaunching}
                </span>
                <div className="inline-flex items-center justify-center gap-2 sm:gap-2.5">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101828] font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] tracking-tight m-0 inline-flex items-center gap-2">
                    {dict.screenStayTuned}
                  </h1>
                  <Image
                    src="/assets/rocket-3d.png"
                    alt="Rocket"
                    width={48}
                    height={48}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 object-contain inline-block select-none pointer-events-none drop-shadow-sm flex-shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Copy & Call to Action (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center max-w-lg w-full py-10 lg:py-16 self-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F2F4F7] dark:bg-zinc-800 text-[#344054] dark:text-zinc-300 border border-[#EAECF0] dark:border-zinc-700/60 mb-6 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
              <span>{dict.tag}</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl lg:text-[42px] font-bold text-[#101828] dark:text-white leading-[1.2] tracking-tight mb-4 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
              {dict.title}
            </h2>

            {/* Subtext */}
            <p className="text-sm lg:text-base text-[#667085] dark:text-zinc-400 leading-relaxed mb-8 max-w-md font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] m-0">
              {dict.description}
            </p>

            {/* Button */}
            <Link
              href={`/${lang}`}
              className="h-[46px] px-6 rounded-lg bg-[#101828] hover:bg-[#1D2939] dark:bg-white dark:text-[#101828] dark:hover:bg-zinc-100 text-white text-sm font-medium transition-all duration-200 shadow-xs inline-flex items-center justify-center font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] cursor-pointer active:scale-[0.98]"
            >
              {dict.button}
            </Link>
          </div>
        </div>
      </main>

      {/* 3. Complete Footer Integration */}
      <Footer />
    </div>
  );
}
