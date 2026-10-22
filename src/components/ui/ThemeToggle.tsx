"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { SunLight, HalfMoon } from "iconoir-react";
import { motion, AnimatePresence } from "framer-motion";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const springTransition = {
  type: "spring" as const,
  stiffness: 280,
  damping: 22,
};

export function ThemeToggle({ className }: { className?: string } = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const baseClasses =
    className ||
    "relative w-[60px] h-[40px] px-[20px] py-[10px] gap-2 rounded-[12px] border border-[#EAECF0] dark:border-neutral-800 bg-[var(--Components-Buttons-button-base-secondary-bg,#FFFFFF)] dark:bg-neutral-900 flex items-center justify-center text-[#101828] dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/80 shadow-[0px_1px_2px_0px_#151C240D] cursor-pointer overflow-hidden transition-colors duration-200 select-none";

  if (!mounted) {
    return (
      <div
        className={baseClasses}
        aria-hidden="true"
      >
        <div className="relative w-[19px] h-[19px] flex items-center justify-center">
          <SunLight className="w-[19px] h-[19px] stroke-[1.8]" />
        </div>
      </div>
    );
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={baseClasses}
    >
      <div className="relative w-[19px] h-[19px] flex items-center justify-center pointer-events-none select-none">
        <AnimatePresence initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={springTransition}
              className="absolute inset-0 flex items-center justify-center text-white"
            >
              <HalfMoon className="w-[19px] h-[19px] stroke-[1.8]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={springTransition}
              className="absolute inset-0 flex items-center justify-center text-[#101828] dark:text-white"
            >
              <SunLight className="w-[19px] h-[19px] stroke-[1.8]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

