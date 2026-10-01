"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export type RevealVariant = "up" | "fade" | "scale" | "pop" | "line";
export type RevealState = "pending" | "in";

let sharedObserver: IntersectionObserver | null = null;
const observedElements = new WeakSet<HTMLElement>();

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            observer.unobserve(target);
            observedElements.delete(target);

            // Animate only transform and opacity with temporary will-change
            target.style.willChange = "opacity, transform";

            const cleanUp = () => {
              target.style.willChange = "";
              target.removeEventListener("transitionend", onTransitionEnd);
            };

            const onTransitionEnd = (e: TransitionEvent) => {
              if (e.target === target) {
                cleanUp();
              }
            };

            target.addEventListener("transitionend", onTransitionEnd);
            // Safety timeout: max duration (800ms) + max delay (280ms) + buffer
            setTimeout(cleanUp, 1400);

            target.setAttribute("data-reveal-state", "in");
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -40px 0px",
      }
    );
  }

  return sharedObserver;
}

/**
 * Initializes below-the-fold reveal animations:
 * 1. Checks prefers-reduced-motion: if reduce, marks all visible immediately with 0 animation.
 * 2. Selects all elements with [data-reveal]:not([data-reveal-state='in']).
 * 3. BATCH READS: measures getBoundingClientRect for all matching elements.
 * 4. BATCH WRITES:
 *    - Elements inside or above the viewport are marked 'in' immediately with no animation.
 *    - Elements below the viewport are marked 'pending' and observed by the shared IntersectionObserver.
 * 5. Includes a passive scroll fallback and safety timeout so elements are never permanently hidden.
 */
export function initRevealObserver(): (() => void) | undefined {
  if (typeof window === "undefined") return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      el.setAttribute("data-reveal-state", "in");
    });
    return;
  }

  const observer = getSharedObserver();
  if (!observer) {
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      el.setAttribute("data-reveal-state", "in");
    });
    return;
  }

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-state='in'])")
  );

  if (elements.length === 0) return;

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const triggerBottom = viewportHeight - 40;

  // Step 1: Batch Layout Reads
  const reads = elements.map((el) => ({
    el,
    rect: el.getBoundingClientRect(),
  }));

  // Step 2: Batch Layout Writes
  const toObserve: HTMLElement[] = [];

  reads.forEach(({ el, rect }) => {
    const isHidden = rect.width === 0 && rect.height === 0;
    if (!isHidden && rect.top <= triggerBottom) {
      el.setAttribute("data-reveal-state", "in");
      if (observedElements.has(el)) {
        observer.unobserve(el);
        observedElements.delete(el);
      }
    } else {
      el.setAttribute("data-reveal-state", "pending");
      if (!observedElements.has(el)) {
        observer.observe(el);
        observedElements.add(el);
        toObserve.push(el);
      }
    }
  });

  // Fallback 1: Passive scroll/resize check to catch any pending elements on fast scroll or layout shift
  const checkPendingFallback = () => {
    const pendingElements = document.querySelectorAll<HTMLElement>(
      "[data-reveal][data-reveal-state='pending']"
    );
    if (pendingElements.length === 0) {
      window.removeEventListener("scroll", checkPendingFallback);
      window.removeEventListener("resize", checkPendingFallback);
      return;
    }
    const currentVh = window.innerHeight || document.documentElement.clientHeight;
    pendingElements.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top <= currentVh) {
        el.setAttribute("data-reveal-state", "in");
        observer.unobserve(el);
        observedElements.delete(el);
      }
    });
  };

  window.addEventListener("scroll", checkPendingFallback, { passive: true });
  window.addEventListener("resize", checkPendingFallback, { passive: true });

  // Fallback 2: Absolute safety timeout so no content remains permanently hidden
  const safetyTimeout = setTimeout(() => {
    document
      .querySelectorAll<HTMLElement>("[data-reveal][data-reveal-state='pending']")
      .forEach((el) => {
        el.setAttribute("data-reveal-state", "in");
        observer.unobserve(el);
        observedElements.delete(el);
      });
  }, 3500);

  return () => {
    clearTimeout(safetyTimeout);
    window.removeEventListener("scroll", checkPendingFallback);
    window.removeEventListener("resize", checkPendingFallback);
    toObserve.forEach((el) => {
      observer.unobserve(el);
      observedElements.delete(el);
    });
  };
}

export function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const rafId = requestAnimationFrame(() => {
      cleanup = initRevealObserver();
    });

    const handleLoad = () => {
      initRevealObserver();
    };

    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    if (document.readyState === "complete") {
      settleTimer = setTimeout(() => {
        initRevealObserver();
      }, 200);
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (settleTimer) clearTimeout(settleTimer);
      window.removeEventListener("load", handleLoad);
      if (cleanup) cleanup();
    };
  }, [pathname]);

  return null;
}

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: RevealVariant;
  delayIndex?: number;
  delayMs?: number;
  children?: React.ReactNode;
  className?: string;
}

export const Reveal = React.forwardRef<HTMLElement, RevealProps>(
  (
    {
      as: Component = "div",
      variant = "up",
      delayIndex,
      delayMs,
      className = "",
      style,
      children,
      ...props
    },
    ref
  ) => {
    const inlineStyle: React.CSSProperties = {
      ...style,
      ...(delayIndex !== undefined ? ({ "--i": delayIndex } as React.CSSProperties) : {}),
      ...(delayMs !== undefined ? ({ "--reveal-delay": `${delayMs}ms` } as React.CSSProperties) : {}),
    };

    return (
      <Component
        ref={ref}
        data-reveal={variant}
        data-reveal-delay={delayMs !== undefined ? `${delayMs}ms` : undefined}
        className={className}
        style={inlineStyle}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Reveal.displayName = "Reveal";

export interface RevealGroupProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export function RevealGroup({
  as: Component = "div",
  className = "",
  children,
  ...props
}: RevealGroupProps) {
  useEffect(() => {
    const cleanup = initRevealObserver();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

export default Reveal;
