"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect matching media queries with SSR safety.
 * Defaults to false on initial render/server-side to prevent hydration mismatch
 * and avoid triggering mobile downloads.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
