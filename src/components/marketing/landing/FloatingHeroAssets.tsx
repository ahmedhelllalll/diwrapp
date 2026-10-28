"use client";

import React from "react";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Hero design canvas: every asset is authored on a 1440px-wide canvas (the approved
 * laptop/reference composition) and scaled with the `--u` unit defined on `.hero-section`
 * (1px at >=1440px viewport width, shrinking to 0.8px). Text and art use the same unit,
 * so the composition scales as one piece and never introduces new overlaps.
 */
const CANVAS_CENTER_X = 720; // 1440 / 2
const HEADER_OFFSET_Y = 88; // fixed header clearance — the only distance that does not scale

/** Positions an asset on the design canvas. x = left edge, y = top, w/h = size (design px). */
const place = (x: number, y: number, w: number, h?: number): React.CSSProperties => ({
  left: `calc(50% + ${x - CANVAS_CENTER_X} * var(--u-art, var(--u)))`,
  top: `calc(${HEADER_OFFSET_Y}px + ${y - HEADER_OFFSET_Y} * var(--u-art, var(--u)) + var(--hero-shift))`,
  width: `calc(${w} * var(--u-art, var(--u)))`,
  ...(h ? { height: `calc(${h} * var(--u-art, var(--u)))` } : {}),
});

export default function FloatingHeroAssets() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Strict viewport gate: mobile/tablet (<1024px) renders null, saving 100% of DOM weight and download bandwidth
  if (!isDesktop) return null;

  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-visible" dir="ltr" aria-hidden="true">
      <div className="relative w-full h-full mx-auto pointer-events-none overflow-visible">
        {/* Background Grid Line Frame (Top Right) */}
      <div
        className="hidden lg:block absolute z-0 pointer-events-none hero-float-grid"
        style={{
          ...place(1108.6, 175, 389),
          maskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 52%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 52%)",
        }}
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
        className="hidden lg:block absolute z-0 pointer-events-none hero-float-grid"
        style={place(-57.6, 510, 389)}
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
        className="hidden lg:block absolute z-30 pointer-events-none drop-shadow-2xl hero-float-top-right"
        style={place(928, 115, 440)}
      >
        <div className="float-loop-6s">
          <Image
            src="/images/floating/float-add-new.webp"
            alt="Add New Glass"
            width={1310}
            height={734}
            sizes="440px"
            className="dark:hidden block w-full h-auto object-contain select-none"
          />
          <Image
            src="/images/floating/float-add-new-dark.webp"
            alt="Add New Glass Dark"
            width={1310}
            height={734}
            sizes="440px"
            className="hidden dark:block w-full h-auto object-contain select-none"
          />
        </div>
      </div>

      {/* Calendar Asset (Middle Left) - Directional entry from left + 7.5s float loop */}
      <div
        className="hidden lg:block absolute z-30 pointer-events-none drop-shadow-2xl hero-float-mid-left"
        style={place(-43.2, 385, 540)}
      >
        <div className="float-loop-7s">
          <Image
            src="/images/floating/float-calendar.webp"
            alt="Calendar Asset"
            width={1920}
            height={1080}
            sizes="540px"
            className="w-full h-auto object-contain -scale-x-100 select-none"
          />
        </div>
      </div>

      {/* Random Floating Cluster (Middle Right) - Directional entry from right + 9s float loop */}
      <div
        className="hidden lg:block absolute z-30 pointer-events-none drop-shadow-2xl hero-float-mid-right"
        style={place(737.6, 415, 760)}
      >
        <div className="float-loop-9s">
          <Image
            src="/images/floating/float-cluster.webp"
            alt="Random Floating Cluster"
            width={1920}
            height={1080}
            sizes="760px"
            className="dark:hidden block w-full h-auto object-contain select-none"
          />
          <Image
            src="/images/floating/float-cluster-dark.webp"
            alt="Random Floating Cluster Dark"
            width={1920}
            height={1080}
            sizes="760px"
            className="hidden dark:block w-full h-auto object-contain select-none"
          />
        </div>
      </div>

      {/* iPad Mini Mockup (Hero Centerpiece) - x is the image CENTER; the image keeps its own translateX(-50%) rotate(25deg) */}
      <div
        className="hidden lg:block absolute z-20 pointer-events-none hero-float-centerpiece"
        style={place(504, 500, 1500)}
      >
        <Image
          src="/images/floating/float-dashboard.webp"
          alt="iPad Mini Mockup"
          width={3000}
          height={2250}
          sizes="1500px"
          className="w-full h-auto object-contain drop-shadow-2xl select-none"
          style={{ transform: "translateX(-50%) rotate(25deg)" }}
        />
      </div>

      {/* Bottom-Left Adaptive Faded Grid Pattern (Behind Tablet - 50px Cells) */}
      <div
        className="hidden lg:block absolute z-0 pointer-events-none select-none overflow-hidden hero-float-grid"
        style={{
          ...place(36, 1200, 440, 440),
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
        className="hidden lg:block absolute z-10 pointer-events-none hero-float-3d"
        style={place(768, 1140, 600)}
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
        className="hidden lg:block absolute z-10 pointer-events-none select-none overflow-hidden hero-float-grid"
        style={{
          ...place(1024, 800, 380, 380),
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
    </div>
  );
}
