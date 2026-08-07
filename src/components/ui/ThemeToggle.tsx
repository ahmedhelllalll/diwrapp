"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by waiting until mounted
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-11 h-11 rounded-xl border border-[#e2e8f0] dark:border-zinc-800 flex items-center justify-center text-[#64748b] dark:text-zinc-400 bg-transparent" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-11 h-11 overflow-hidden rounded-xl border border-[#e2e8f0] dark:border-zinc-800 flex items-center justify-center text-[#64748b] dark:text-zinc-400 transition-all duration-200 ease-out hover:-translate-y-0.5 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:bg-[#f8fafc] dark:hover:bg-zinc-800/80 hover:text-[#0f172a] dark:hover:text-zinc-100 active:scale-[0.98] active:translate-y-0"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -180, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <i className="fa-regular fa-moon text-[16px]"></i>
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 180, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -180, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <i className="fa-regular fa-sun text-[16px]"></i>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
