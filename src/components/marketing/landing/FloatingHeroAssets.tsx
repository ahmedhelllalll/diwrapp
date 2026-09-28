"use client";

import React from "react";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function FloatingHeroAssets() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Strict viewport gate: mobile/tablet (<1024px) renders null, saving 100% of DOM weight and download bandwidth
  if (!isDesktop) return null;

  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-visible" dir="ltr">
      {/* Background Grid Line Frame (Top Right) */}
      <div
        className="hidden lg:block absolute top-[175px] right-0 w-[389px] z-0 pointer-events-none hero-float-grid"
      >
        <Image
          src="/images/floating/float-grid-frame.png"
          alt="Grid Line Frame"
          width={392}
          height={707}
          sizes="392px"
          className="w-full h-auto object-contain select-none"
        />
      </div>

      {/* Background Grid Line Frame Reversed (Bottom Left) */}
      <div
        className="hidden lg:block absolute top-[510px] left-[-6%] w-[389px] z-0 pointer-events-none hero-float-grid"
      >
        <Image
          src="/images/floating/float-grid-frame.png"
          alt="Grid Line Frame Reversed"
          width={392}
          height={707}
          sizes="392px"
          className="w-full h-auto object-contain -scale-x-100 select-none"
        />
      </div>

      {/* Add New Glass Asset (Top Right) - Directional entry from top-right + 6s float loop */}
      <div
        className="hidden lg:block absolute top-[95px] xl:top-[110px] right-[3%] xl:right-[5%] w-[390px] xl:w-[440px] z-50 pointer-events-none drop-shadow-2xl hero-float-top-right"
      >
        <div className="float-loop-6s">
          <Image
            src="/images/floating/float-add-new.webp"
            alt="Add New Glass"
            width={1310}
            height={734}
            sizes="(min-width: 1280px) 440px, 390px"
            className="dark:hidden block w-full h-auto object-contain select-none"
          />
          <Image
            src="/images/floating/float-add-new-dark.webp"
            alt="Add New Glass Dark"
            width={1310}
            height={734}
            sizes="(min-width: 1280px) 440px, 390px"
            className="hidden dark:block w-full h-auto object-contain select-none"
          />
        </div>
      </div>

      {/* Calendar Asset (Middle Left) - Directional entry from left + 7.5s float loop */}
      <div
        className="hidden lg:block absolute top-[375px] xl:top-[385px] left-[-6%] xl:left-[-4%] w-[480px] xl:w-[540px] z-50 pointer-events-none drop-shadow-2xl hero-float-mid-left"
      >
        <div className="float-loop-7s">
          <Image
            src="/images/floating/float-calendar.webp"
            alt="Calendar Asset"
            width={1920}
            height={1080}
            sizes="(min-width: 1280px) 540px, 480px"
            className="w-full h-auto object-contain -scale-x-100 select-none"
          />
        </div>
      </div>

      {/* Random Floating Cluster (Middle Right) - Directional entry from right + 9s float loop */}
      <div
        className="hidden lg:block absolute top-[400px] xl:top-[415px] right-[-8%] xl:right-[-6%] w-[680px] xl:w-[760px] z-50 pointer-events-none drop-shadow-2xl hero-float-mid-right"
      >
        <div className="float-loop-9s">
          <Image
            src="/images/floating/float-cluster.webp"
            alt="Random Floating Cluster"
            width={1920}
            height={1080}
            sizes="(min-width: 1280px) 760px, 680px"
            className="dark:hidden block w-full h-auto object-contain select-none"
          />
          <Image
            src="/images/floating/float-cluster-dark.webp"
            alt="Random Floating Cluster Dark"
            width={1920}
            height={1080}
            sizes="(min-width: 1280px) 760px, 680px"
            className="hidden dark:block w-full h-auto object-contain select-none"
          />
        </div>
      </div>

      {/* iPad Mini Mockup (Hero Centerpiece) - Production Scale & Position */}
      <div
        className="hidden lg:block absolute top-[430px] xl:top-[440px] left-[34%] xl:left-[35%] z-[60] w-[125%] max-w-[1450px] pointer-events-none hero-float-centerpiece"
      >
        <Image
          src="/images/floating/float-dashboard.webp"
          alt="iPad Mini Mockup"
          width={3000}
          height={2250}
          sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 1080px, 100vw"
          className="w-full h-auto object-contain drop-shadow-2xl select-none"
          style={{ transform: "translateX(-50%) rotate(25deg)" }}
        />
      </div>

      {/* Bottom-Left Adaptive Faded Grid Pattern (Behind Tablet - 50px Cells) */}
      <div
        className="hidden lg:block absolute top-[1200px] left-[2.5%] lg:top-[1200px] lg:left-[2.5%] z-0 w-[440px] lg:w-[440px] h-[440px] lg:h-[440px] pointer-events-none select-none overflow-hidden hero-float-grid"
        style={{
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 75%)",
        }}
        aria-hidden="true"
      >
        <svg
          className="w-full h-full stroke-neutral-300/70 dark:stroke-white/[0.12]"
          fill="none"
        >
          <defs>
            <pattern
              id="faded-hero-grid-pattern-left"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M.5 50V.5H50"
                strokeWidth="1"
                strokeDasharray="0"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faded-hero-grid-pattern-left)" />
        </svg>
      </div>

      {/* 3D Decorative Element (Bottom Right) */}
      <div
        className="hidden lg:block absolute top-[1140px] right-[5%] lg:top-[1140px] lg:right-[5%] z-20 pointer-events-none w-[600px] lg:w-[600px] hero-float-3d"
      >
        <Image
          src="/images/floating/float-3d-element.png"
          alt="3D Element"
          width={600}
          height={480}
          sizes="600px"
          className="w-full h-auto dark:hidden block select-none"
        />
        <Image
          src="/images/floating/float-3d-element-dark.webp"
          alt="3D Element Dark"
          width={600}
          height={480}
          sizes="600px"
          className="w-full h-auto hidden dark:block select-none mix-blend-screen"
        />
      </div>

      {/* Native Adaptive Faded Grid Pattern (Replaces Decorative Element 527) */}
      <div
        className="hidden lg:block absolute top-[800px] right-[2.5%] lg:top-[800px] lg:right-[2.5%] z-10 w-[380px] lg:w-[380px] h-[380px] lg:h-[380px] pointer-events-none select-none overflow-hidden hero-float-grid"
        style={{
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 75%)",
        }}
        aria-hidden="true"
      >
        <svg
          className="w-full h-full stroke-neutral-300/70 dark:stroke-white/[0.12]"
          fill="none"
        >
          <defs>
            <pattern
              id="faded-hero-grid-pattern"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M.5 50V.5H50"
                strokeWidth="1"
                strokeDasharray="0"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faded-hero-grid-pattern)" />
        </svg>
      </div>
    </div>
  );
}
