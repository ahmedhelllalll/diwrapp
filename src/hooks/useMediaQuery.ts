"use client";

import { useSyncExternalStore, useCallback } from "react";

/**
 * Custom hook to detect matching media queries with SSR safety.
 * Defaults to false on initial render/server-side to prevent hydration mismatch
 * and avoid triggering mobile downloads.
 */
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

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return false;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useMediaQuery;
