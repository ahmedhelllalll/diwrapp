"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { SunLight, HalfMoon } from "iconoir-react";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string } = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const baseClasses =
    className ||
    "theme-toggle w-[60px] h-[40px] min-w-[60px] rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 flex items-center justify-center cursor-pointer transition-all duration-150 ease-out hover:-translate-y-[1px] hover:shadow-xs active:translate-y-0 active:scale-[0.99]";

  if (!mounted) {
    return (
      <div
        className={baseClasses}
        aria-hidden="true"
      />
    );
  }

  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = activeTheme === "dark";
  const currentTheme = isDark ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={baseClasses}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentTheme}
          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <SunLight width={18} height={18} strokeWidth={1.75} className="text-zinc-200" />
          ) : (
            <HalfMoon width={18} height={18} strokeWidth={1.75} className="text-slate-700" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
