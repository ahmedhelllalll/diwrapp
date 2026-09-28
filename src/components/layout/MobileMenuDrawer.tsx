"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, HalfMoon, SunLight } from 'iconoir-react';

const menuDrawerVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.22,
      ease: [0.32, 0, 0.67, 0] as const,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1] as const,
      when: "beforeChildren" as const,
      staggerChildren: 0.04,
    },
  },
};

const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.15,
      ease: "easeOut" as const,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const menuFooterVariants = {
  hidden: {
    opacity: 0,
    y: 8,
    transition: {
      duration: 0.15,
      ease: "easeOut" as const,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.18,
    },
  },
};

export interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isRtl: boolean;
  currentLang: string;
  targetLangHref: string;
  navLinks: Array<{ name: string; label: string; href: string; isActive: boolean }>;
  toggleTheme: () => void;
  isDark: boolean;
  user?: {
    name?: string;
    email?: string;
    image?: string;
    [key: string]: any;
  } | null;
  dictNav?: {
    signIn?: string;
    [key: string]: any;
  };
  nav: {
    signIn: string;
    [key: string]: any;
  };
}

export default function MobileMenuDrawer({
  isOpen,
  onClose,
  isRtl,
  currentLang,
  targetLangHref,
  navLinks,
  toggleTheme,
  isDark,
  user,
  dictNav,
  nav,
}: MobileMenuDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuDrawerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-x-0 bottom-0 top-[72px] z-[999] bg-white dark:bg-[#080808] lg:hidden flex flex-col justify-between overflow-y-auto px-6 py-8"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Centered navigation links */}
          <div className="flex-1 flex flex-col items-center justify-center gap-6 my-auto" dir={isRtl ? 'rtl' : 'ltr'}>
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={menuItemVariants} className="flex items-center justify-center">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`text-[17px] sm:text-[18px] font-medium tracking-normal text-center transition-colors font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] ${
                    link.isActive 
                      ? "text-slate-900 dark:text-white font-semibold" 
                      : "text-slate-700 dark:text-zinc-300 font-medium hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom utilities & CTA */}
          <motion.div variants={menuFooterVariants} className="w-full flex flex-col gap-4 pt-4" dir="ltr">
            <div className="flex items-center justify-center gap-5 text-sm font-bold text-slate-600 dark:text-zinc-400">
              {/* Language Switcher */}
              <Link
                className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
                href={targetLangHref}
                onClick={onClose}
              >
                <Globe className="w-4 h-4 stroke-[1.5]"/>
                <span>{currentLang === "en" ? "عربي" : "English"}</span>
              </Link>

              <span className="w-[1px] h-3.5 bg-slate-300 dark:bg-zinc-700" />

              {/* Single Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-1 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Toggle Theme"
              >
                <motion.div
                  key={isDark ? "dark" : "light"}
                  initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-flex items-center justify-center"
                >
                  {isDark ? (
                    <SunLight className="w-4 h-4 stroke-[2]"/>
                  ) : (
                    <HalfMoon className="w-4 h-4 stroke-[2]"/>
                  )}
                </motion.div>
              </button>
            </div>

            {/* Sign In Button or User Profile */}
            {user ? (
              <Link
                href={`/${currentLang}/coming-soon?feature=Dashboard`}
                onClick={onClose}
                className="w-full h-[48px] rounded-[14px] border border-[#EAECF0] dark:border-neutral-800 bg-white dark:bg-neutral-900 text-[#101828] dark:text-white text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-xs font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <span>{user.name || 'Dashboard'}</span>
              </Link>
            ) : (
              <Link
                className="w-full h-[48px] rounded-[14px] bg-[#101828] dark:bg-white text-white dark:text-[#101828] text-[15px] font-semibold flex items-center justify-center hover:bg-[#1D2939] dark:hover:bg-neutral-100 transition-colors shadow-xs font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
                href={`/${currentLang}/login`}
                onClick={onClose}
              >
                {dictNav?.signIn || nav.signIn || "Sign In"}
              </Link>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
