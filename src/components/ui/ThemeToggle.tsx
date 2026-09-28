"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunLight, HalfMoon } from "iconoir-react";

export function ThemeToggle({ className }: { className?: string } = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseClasses =
    className ||
    "relative w-[60px] h-[40px] px-[20px] py-[10px] gap-2 rounded-[12px] border border-[#EAECF0] dark:border-neutral-800 bg-[var(--Components-Buttons-button-base-secondary-bg,#FFFFFF)] dark:bg-neutral-900 flex items-center justify-center text-[#101828] dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/80 active:scale-[0.94] shadow-[0px_1px_2px_0px_#151C240D] cursor-pointer overflow-hidden transition-all duration-150 select-none";

  if (!mounted) {
    return (
      <div
        className={baseClasses}
        aria-hidden="true"
      >
        <HalfMoon className="w-[19px] h-[19px] stroke-[1.8]" />
      </div>
    );
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
      className={baseClasses}
    >
      <div className="relative w-[19px] h-[19px] flex items-center justify-center pointer-events-none">
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-45 scale-50 pointer-events-none"
          }`}
          aria-hidden={!isDark}
        >
          <SunLight className="w-[19px] h-[19px] stroke-[1.8]" />
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            !isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-45 scale-50 pointer-events-none"
          }`}
          aria-hidden={isDark}
        >
          <HalfMoon className="w-[19px] h-[19px] stroke-[1.8]" />
        </span>
      </div>
    </button>
  );
}
