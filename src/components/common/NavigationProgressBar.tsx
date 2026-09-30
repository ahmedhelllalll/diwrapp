'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationProgressBar() {
  const pathname = usePathname();
  const [status, setStatus] = useState<'idle' | 'pending' | 'completing'>('idle');
  const [visible, setVisible] = useState(false);

  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const completeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prevPathnameRef = useRef<string>(pathname);

  const startPending = () => {
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);

    // Show only if navigation takes longer than ~150ms
    delayTimerRef.current = setTimeout(() => {
      setVisible(true);
      setStatus('pending');
    }, 150);
  };

  const completePending = () => {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }

    if (visible || status === 'pending') {
      setStatus('completing');
      completeTimerRef.current = setTimeout(() => {
        setVisible(false);
        resetTimerRef.current = setTimeout(() => {
          setStatus('idle');
        }, 300);
      }, 200);
    } else {
      setStatus('idle');
      setVisible(false);
    }
  };

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
        // Same page with same hash
        if (url.pathname === window.location.pathname && url.search === window.location.search) {
          return;
        }

        startPending();
      } catch {
        // Ignore invalid URLs
      }
    };

    const handlePopState = () => {
      startPending();
    };

    document.addEventListener('click', handleClick, { capture: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  // Complete when new pathname renders
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      completePending();
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

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
    transition = 'transform 0.2s ease-out, opacity 0.3s ease-out';
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
