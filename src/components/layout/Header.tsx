"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Globe, HalfMoon, SunLight } from 'iconoir-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { CountryBadgeSkeleton } from '@/components/common/CountryBadgeSkeleton';

export interface HeaderProps {
  lang?: string;
  nextLang?: string;
  langLabel?: string;
  dictNav?: {
    about?: string;
    advertise?: string;
    blog?: string;
    join?: string;
    contact?: string;
    signIn?: string;
    [key: string]: any;
  };
  dict?: any;
  user?: {
    name?: string;
    email?: string;
    image?: string;
    [key: string]: any;
  } | null;
  countryCode?: string;
  countryBadge?: React.ReactNode;
  className?: string;
}

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

export default function Header({
  lang,
  nextLang,
  langLabel,
  dictNav,
  dict,
  user,
  countryCode: _initialCountryCode,
  countryBadge,
  className,
}: HeaderProps = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname() || '';
  const { theme, setTheme, resolvedTheme } = useTheme();
  const activeTheme = theme === 'system' ? resolvedTheme : theme;
  const isDark = activeTheme === 'dark';
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  // Auto-detect current locale if not provided directly
  const detectedLang = pathname.startsWith('/ar') ? 'ar' : 'en';
  const currentLang = lang || detectedLang;
  const isRtl = currentLang === 'ar';
  const derivedNextLang = nextLang || (isRtl ? 'en' : 'ar');
  const derivedLangLabel = langLabel || (isRtl ? 'English' : 'عربي');

  // Unified fallback dictionary tokens
  const defaultNav = isRtl
    ? {
        about: 'معلومات عنا',
        advertise: 'أعلن معنا',
        blog: 'المدونة',
        join: 'انضم إلينا',
        contact: 'اتصل بنا',
        signIn: 'تسجيل الدخول',
      }
    : {
        about: 'About us',
        advertise: 'Advertise',
        blog: 'Blog',
        join: 'Join us',
        contact: 'Contact us',
        signIn: 'Sign In',
      };

  const nav = {
    about: dictNav?.about || dict?.landing?.nav?.about || defaultNav.about,
    advertise: dictNav?.advertise || dict?.landing?.nav?.advertise || defaultNav.advertise,
    blog: dictNav?.blog || dict?.landing?.nav?.blog || defaultNav.blog,
    join: dictNav?.join || dict?.landing?.nav?.join || defaultNav.join,
    contact: dictNav?.contact || dict?.landing?.nav?.contact || defaultNav.contact,
    signIn: dictNav?.signIn || dict?.landing?.nav?.signIn || defaultNav.signIn,
  };

  const normalizedPathname = pathname.replace(/\/$/, '') || '/';

  const navLinks = [
    { name: nav.about, label: nav.about, href: `/${currentLang}/about` },
    { name: nav.advertise, label: nav.advertise, href: `/${currentLang}/advertise` },
    { name: nav.blog, label: nav.blog, href: `/${currentLang}/blog` },
    { name: nav.join, label: nav.join, href: `/${currentLang}/join-us` },
    { name: nav.contact, label: nav.contact, href: `/${currentLang}/contact` },
  ].map((link) => {
    const normalizedHref = link.href.replace(/\/$/, '') || '/';
    const isActive =
      normalizedPathname === normalizedHref ||
      (normalizedHref !== `/${currentLang}` && normalizedPathname.startsWith(`${normalizedHref}/`));
    return { ...link, isActive };
  });

  // Target URL for language switcher
  const targetLangHref = pathname.startsWith(`/${currentLang}`)
    ? pathname.replace(new RegExp(`^/${currentLang}`), `/${derivedNextLang}`)
    : `/${derivedNextLang}`;

  // Prevent background scrolling when mobile menu is open without blocking the initial animation frame
  useEffect(() => {
    let rafId: number;
    if (isMobileMenuOpen) {
      rafId = requestAnimationFrame(() => {
        document.body.style.overflow = 'hidden';
        if (typeof window !== 'undefined' && (window as any).lenis) {
          (window as any).lenis.stop();
        }
      });
    } else {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isMobileMenuOpen]);

  // Close mobile drawer upon desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 8;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.includes('/vendor/onboarding')) {
    return null;
  }

  return (
    <>
      <header
        dir="ltr"
        className={`fixed top-0 inset-x-0 z-[1000] w-full transform-gpu ${
          isMobileMenuOpen
            ? "bg-white dark:bg-[#080808] border-b border-transparent"
            : `backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ease-out ${
                isScrolled
                  ? "bg-white/85 dark:bg-[#080808]/85 border-b border-slate-200/60 dark:border-zinc-800/60 shadow-sm"
                  : "bg-white/95 dark:bg-[#080808]/95 border-b border-transparent"
              }`
        } ${className || ""}`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between relative" dir="ltr">
          {/* Left: Brand Logo (Always on the Left) */}
          <div className="flex items-center">
            <Link
              href={`/${currentLang}`}
              className="brand-logo !inline-flex !items-center !gap-2 !shrink-0 select-none !m-0 !p-0"
              dir="ltr"
            >
              <div className="!w-8 !h-8 !shrink-0 !m-0 !p-0 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Di-wrapp Logo"
                  width={32}
                  height={32}
                  priority
                  className="!m-0 !p-0 !block object-contain w-full h-full"
                />
              </div>
              <span className="!font-semibold !text-xl !tracking-tight !leading-none text-[#101828] dark:text-white flex items-center !m-0 font-['Lufga',sans-serif]">
                Di-wrapp
                {countryBadge ?? <CountryBadgeSkeleton key="country-badge-skeleton" />}
              </span>
            </Link>
          </div>

          {/* Center: Navigation Links (True Center) */}
          <nav
            dir={isRtl ? "rtl" : "ltr"}
            className="hidden lg:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] transition-colors py-1 ${
                  link.isActive
                    ? "text-slate-900 dark:text-white font-semibold"
                    : "text-slate-700 dark:text-zinc-300 font-medium hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions Cluster (Desktop) */}
          <div className="hidden lg:flex items-center gap-3" dir="ltr">
            {/* Dark Mode Toggle: Bordered rounded square matching Figma */}
            <ThemeToggle />

            {/* Sign In Button or User Profile */}
            {user ? (
              <Link
                href={`/${currentLang}/coming-soon?feature=Dashboard`}
                className="inline-flex items-center justify-center h-[40px] px-4 rounded-[12px] border border-[#EAECF0] dark:border-neutral-800 bg-white dark:bg-neutral-900 text-[#101828] dark:text-white text-[14px] font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors gap-2 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <span className="max-w-[120px] truncate">{user.name || 'User'}</span>
              </Link>
            ) : (
              <Link
                href={`/${currentLang}/login`}
                className="inline-flex items-center justify-center h-[40px] px-5 rounded-[12px] bg-[#101828] dark:bg-white text-white dark:text-[#101828] font-medium text-[14px] hover:bg-[#1f2a37] dark:hover:bg-neutral-100 transition-all duration-200 shadow-xs font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] whitespace-nowrap"
              >
                {nav.signIn}
              </Link>
            )}

            {/* Language Switcher */}
            <Link
              href={targetLangHref}
              className="inline-flex items-center text-sm font-bold text-[#344054] dark:text-neutral-300 hover:text-[#101828] dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] ml-1"
            >
              {derivedLangLabel}
            </Link>
          </div>

          {/* Mobile Action Buttons (Always on the Right) */}
          <div className="flex lg:hidden items-center" dir="ltr">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <span
                className={`block h-0.5 w-6 bg-[#101828] dark:bg-white rounded-full transition-transform duration-300 ease-out origin-center ${
                  isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#101828] dark:bg-white rounded-full transition-opacity duration-200 ease-out ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#101828] dark:bg-white rounded-full transition-transform duration-300 ease-out origin-center ${
                  isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
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
                    onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {dictNav?.signIn || nav.signIn || "Sign In"}
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
