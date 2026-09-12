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
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).lenis;
      }
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
