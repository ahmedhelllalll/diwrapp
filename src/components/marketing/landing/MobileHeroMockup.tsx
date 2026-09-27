import React from "react";
import Image from "next/image";

export default function MobileHeroMockup() {
  return (
    <div
      className="block lg:hidden w-[130%] max-w-[720px] sm:max-w-[840px] mx-auto mt-8 sm:mt-10 mb-0 -mb-4 sm:-mb-6 pb-0 pointer-events-none select-none relative z-30 px-2 sm:px-4 translate-x-36 sm:translate-x-48 rtl:-translate-x-36 rtl:sm:-translate-x-48 bg-transparent"
      style={{
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.3) 88%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.3) 88%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="hero-lcp-mockup w-full">
        <Image
          src="/images/hero/mobile-phone-mockup.webp"
          alt="Di-wrapp Platform Mobile Mockup"
          width={785}
          height={658}
          priority
          sizes="(max-width: 640px) 100vw, 785px"
          className="w-full h-auto object-contain select-none mx-auto bg-transparent"
        />
      </div>
    </div>
  );
}
