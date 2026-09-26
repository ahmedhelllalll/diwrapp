"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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
      (window as any).lenis = lenis;
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
        delete (window as any).lenis;
      }
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
