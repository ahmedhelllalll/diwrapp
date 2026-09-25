"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { SunLight, HalfMoon } from "iconoir-react";

export function ThemeToggle({ className }: { className?: string } = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseClasses =
    className ||
    "relative w-[60px] h-[40px] px-[20px] py-[10px] gap-2 rounded-[12px] border border-[#EAECF0] dark:border-neutral-800 bg-[var(--Components-Buttons-button-base-secondary-bg,#FFFFFF)] dark:bg-neutral-900 flex items-center justify-center text-[#101828] dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/80 shadow-[0px_1px_2px_0px_#151C240D] cursor-pointer overflow-hidden transition-colors";

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
    <motion.button
      type="button"
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.15 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
      className={baseClasses}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={isDark ? "dark-icon" : "light-icon"}
          initial={{ opacity: 0, rotate: isDark ? -45 : 45, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: isDark ? 45 : -45, scale: 0.6 }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 24,
            mass: 0.8,
          }}
          className="flex items-center justify-center pointer-events-none"
        >
          {isDark ? (
            <SunLight className="w-[19px] h-[19px] stroke-[1.8]" />
          ) : (
            <HalfMoon className="w-[19px] h-[19px] stroke-[1.8]" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
