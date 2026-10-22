'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

// Module-level singleton state to survive component unmounts across dynamic root layouts (e.g. /[lang])
let isGlobalNavigating = false;
let isGlobalBarShown = false;
let globalDelayTimer: ReturnType<typeof setTimeout> | null = null;
let globalFailsafeTimer: ReturnType<typeof setTimeout> | null = null;
let activeCompletePending: (() => void) | null = null;

function clearGlobalNavigation() {
  isGlobalNavigating = false;
  isGlobalBarShown = false;
  if (globalDelayTimer) {
    clearTimeout(globalDelayTimer);
    globalDelayTimer = null;
  }
  if (globalFailsafeTimer) {
    clearTimeout(globalFailsafeTimer);
    globalFailsafeTimer = null;
  }
}

export default function NavigationProgressBar() {
  const pathname = usePathname();

  // If a global navigation already showed the progress bar before this layout mounted,
  // initialize immediately in 'completing' state to seamlessly finish without visual glitch
  const [status, setStatus] = useState<'idle' | 'pending' | 'completing'>(() => {
    if (typeof window !== 'undefined' && isGlobalNavigating && isGlobalBarShown) {
      return 'completing';
    }
    return 'idle';
  });

  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && isGlobalNavigating && isGlobalBarShown) {
      return true;
    }
    return false;
  });

  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathnameRef = useRef<string>(pathname);

  const completePending = useCallback(() => {
    if (globalDelayTimer) {
      clearTimeout(globalDelayTimer);
      globalDelayTimer = null;
    }
    clearGlobalNavigation();

    setStatus((prevStatus) => {
      if (prevStatus === 'pending' || prevStatus === 'completing') {
        if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

        completeTimerRef.current = setTimeout(() => {
          setVisible(false);
          resetTimerRef.current = setTimeout(() => {
            setStatus('idle');
          }, 130);
        }, 120);
        return 'completing';
      }
      setVisible(false);
      return 'idle';
    });
  }, []);

  const startPending = useCallback(() => {
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    clearGlobalNavigation();

    isGlobalNavigating = true;
    isGlobalBarShown = false;

    // Show only if navigation takes longer than ~150ms
    globalDelayTimer = setTimeout(() => {
      isGlobalBarShown = true;
      setVisible(true);
      setStatus('pending');
    }, 150);

    // Failsafe: complete/reset after 4 seconds if navigation never completes
    globalFailsafeTimer = setTimeout(() => {
      if (activeCompletePending) {
        activeCompletePending();
      } else {
        clearGlobalNavigation();
      }
    }, 4000);
  }, []);

  // Register active completer for failsafe timer
  useEffect(() => {
    activeCompletePending = completePending;
    return () => {
      if (activeCompletePending === completePending) {
        activeCompletePending = null;
      }
    };
  }, [completePending]);

  // Handle cross-locale / cross-segment remount on component mount
  useEffect(() => {
    if (isGlobalNavigating) {
      if (isGlobalBarShown) {
        // Complete the bar that was already displayed by the preceding layout
        completeTimerRef.current = setTimeout(() => {
          setVisible(false);
          resetTimerRef.current = setTimeout(() => {
            setStatus('idle');
          }, 130);
        }, 120);
      }
      clearGlobalNavigation();
    }
  }, []);

  // Intercept internal link clicks and popstate
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Ignore non-primary or modified clicks
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return;

        // Don't start when pathname is identical (guards against search-param-only and hash navigations)
        if (url.pathname === window.location.pathname) {
          return;
        }

        startPending();
      } catch {
        // Ignore invalid URLs
      }
    };

    const handlePopState = () => {
      // Guard popstate: don't start if pathname is unchanged (e.g. hash anchor back/forward)
      if (window.location.pathname === prevPathnameRef.current) {
        return;
      }
      startPending();
    };

    document.addEventListener('click', handleClick, { capture: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [startPending]);

  // Complete when new pathname renders in the same layout instance
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      completePending();
      prevPathnameRef.current = pathname;
    }
  }, [pathname, completePending]);

  if (!visible && status === 'idle') {
    return null;
  }

  let scale = 0;
  let opacity = 1;
  let transition = 'none';

  if (status === 'pending') {
    scale = 0.8;
    transition = 'transform 8s cubic-bezier(0.1, 0.5, 0.1, 1)';
    opacity = 1;
  } else if (status === 'completing') {
    scale = 1;
    transition = 'transform 0.12s ease-out, opacity 0.13s ease-out';
    opacity = visible ? 1 : 0;
  }

  return (
    <div
      aria-hidden="true"
      className="navigation-progress-bar"
      style={{
        transform: `scaleX(${scale})`,
        opacity,
        transition,
      }}
    />
  );
}

