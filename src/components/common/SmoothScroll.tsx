"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable Lenis smooth scroll on touch / mobile devices or if user prefers reduced motion
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      if (prefersReduced || isCoarse) {
        return;
      }
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: false,
      allowNestedScroll: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Attach lenis instance to window for global scroll control
    if (typeof window !== 'undefined') {
      (window as unknown as { lenis?: Lenis }).lenis = lenis;
    }

    // Automatic Resize Observer to recalculate page height for dynamic tabs/components
    let resizeTimer: NodeJS.Timeout | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!lenis.isStopped) {
          lenis.resize();
        }
      }, 150);
    });
    resizeObserver.observe(document.body);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      if (typeof window !== 'undefined') {
        (window as unknown as { lenis?: Lenis | undefined }).lenis = undefined;
      }
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
