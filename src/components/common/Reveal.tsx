"use client";

import React, { useEffect } from "react";

export type RevealVariant = "up" | "fade" | "scale" | "pop" | "line";
export type RevealState = "pending" | "in";

let sharedObserver: IntersectionObserver | null = null;

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
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      }
    );
  }

  return sharedObserver;
}

/**
 * Initializes below-the-fold reveal animations:
 * 1. Checks prefers-reduced-motion: if reduce, marks all visible immediately with 0 animation.
 * 2. Selects all elements with [data-reveal]:not([data-reveal-state]).
 * 3. BATCH READS: measures getBoundingClientRect for all matching elements.
 * 4. BATCH WRITES:
 *    - Elements inside or above the viewport are marked 'in' immediately with no animation.
 *    - Elements below the viewport are marked 'pending' and observed by the shared IntersectionObserver.
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
    document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-state])")
  );

  if (elements.length === 0) return;

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const triggerBottom = viewportHeight * 0.92; // 8% bottom margin trigger

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
    } else {
      el.setAttribute("data-reveal-state", "pending");
      observer.observe(el);
      toObserve.push(el);
    }
  });

  return () => {
    toObserve.forEach((el) => observer.unobserve(el));
  };
}

export function RevealInit() {
  useEffect(() => {
    const cleanup = initRevealObserver();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

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
