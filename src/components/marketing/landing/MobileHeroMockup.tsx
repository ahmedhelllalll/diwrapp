import React from "react";
import Image from "next/image";

export default function MobileHeroMockup() {
  return (
    <div
      dir="ltr"
      className="block lg:hidden w-[130%] max-w-[720px] sm:max-w-[840px] mx-auto mt-8 sm:mt-10 mb-0 -mb-4 sm:-mb-6 pb-0 pointer-events-none select-none relative z-30 px-2 sm:px-4 translate-x-36 sm:translate-x-48 bg-transparent"
    >
      <div className="hero-lcp-mockup w-full">
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
        className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-white dark:from-surface-1 via-white/80 dark:via-surface-1/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
