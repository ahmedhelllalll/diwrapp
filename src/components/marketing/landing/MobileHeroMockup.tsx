import React from "react";
import Image from "next/image";
import HeroMarqueeBackground, { MarqueeBadge } from "./HeroMarqueeBackground";

interface MobileHeroMockupProps {
  lang?: string;
  dictMarquee?: {
    row1?: MarqueeBadge[];
    row2?: MarqueeBadge[];
    row3?: MarqueeBadge[];
  };
}

export default function MobileHeroMockup({
  lang = "en",
  dictMarquee,
}: MobileHeroMockupProps) {
  return (
    <div
      dir="ltr"
      className="w-full flex justify-center lg:hidden pointer-events-none select-none relative z-30"
    >
      {/* Ambient 3-Row Infinite Marquee Background (strictly behind phone mockup - z-10) */}
      <div
        className="absolute inset-0 pt-16 sm:pt-20 pb-24 sm:pb-36 left-1/2 -translate-x-1/2 w-screen max-w-[1440px] flex flex-col justify-between pointer-events-none select-none z-10 overflow-hidden"
        style={{ contain: "paint layout" }}
        aria-hidden="true"
      >
        <HeroMarqueeBackground
          lang={lang}
          badges={dictMarquee}
          className="opacity-80 dark:opacity-70"
        />
      </div>

      {/* Phone Mockup Foreground Layer (z-20) */}
      <div className="w-full max-w-[480px] sm:max-w-[600px] shrink-0 mt-8 sm:mt-10 mb-0 -mb-4 sm:-mb-6 pb-0 px-4 bg-transparent relative z-20 mx-auto flex justify-center">
        <div className="hero-lcp-mockup w-full flex justify-center">
          <Image
            src="/images/hero/mobile-phone-mockup.webp"
            alt="Di-wrapp Platform Mobile Mockup"
            width={785}
            height={658}
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 100vw, 785px"
            className="w-full h-auto object-contain select-none mx-auto bg-transparent"
          />
        </div>

        {/* Performant bottom fade gradient overlay replacing expensive CSS maskImage */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-white dark:from-surface-1 via-white/85 dark:via-surface-1/85 to-transparent pointer-events-none z-30"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
