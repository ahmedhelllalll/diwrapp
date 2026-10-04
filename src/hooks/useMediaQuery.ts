"use client";

import { useSyncExternalStore, useCallback } from "react";

/**
 * Custom hook to detect matching media queries with SSR safety.
 * Defaults to false on initial render/server-side to prevent hydration mismatch
 * and avoid triggering mobile downloads.
 */
const getServerSnapshot = () => false;

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => {
        mediaQuery.removeEventListener("change", callback);
      };
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useMediaQuery;
