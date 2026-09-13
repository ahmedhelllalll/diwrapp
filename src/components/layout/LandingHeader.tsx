'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface LandingHeaderProps {
  lang: string;
  nextLang: string;
  langLabel: string;
  dictNav: any;
  transparent?: boolean;
  countryCode?: string;
  solidBackground?: boolean;
}

export default function LandingHeader({ 
  lang, 
  nextLang, 
  langLabel, 
  dictNav, 
  transparent,
  countryCode = "sa",
  solidBackground,
}: LandingHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(70);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const isComingSoon = Boolean(pathname && (pathname.includes('/coming-soon') || pathname.endsWith('/coming-soon')));
  const isBlog = Boolean(pathname && (pathname.includes('/blog') || pathname.endsWith('/blog')));
  const is404 = Boolean(solidBackground || (pathname && (pathname.includes('/404') || pathname.includes('/not-found'))));
  const isSolidTheme = isComingSoon || isBlog || is404;

  const isJoinUs = pathname ? pathname.includes('/join-us') : false;
  const isTransparent = !isSolidTheme && (transparent || isJoinUs);
  
  const navItems = [
    { href: `/${lang}/about`, label: dictNav?.about || 'About us' },
    { href: `/${lang}/advertise`, label: dictNav?.advertise || 'Advertise' },
    { href: `/${lang}/blog`, label: dictNav?.blog || 'Blog' },
    { href: `/${lang}/join-us`, label: dictNav?.join || 'Join us' },
    { href: `/${lang}/contact`, label: dictNav?.contact || 'Contact us' },
  ];

  const targetLangHref = pathname.startsWith(`/${lang}`)
    ? pathname.replace(`/${lang}`, `/${nextLang}`)
    : `/${nextLang}`;

  // Scroll listener for elevate-on-scroll navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update header height dynamically for exact drawer positioning
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Prevent background page scrolling and stop smooth scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isMenuOpen]);

  // Close mobile menu if resized to desktop viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Dynamic header styles based on scroll state, menu state, and transparency
  const getHeaderClasses = () => {
    if (isMenuOpen) {
      return 'bg-white/95 dark:bg-[#080808]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800/80';
    }
    if (isSolidTheme) {
      return 'sticky top-0 bg-white dark:bg-[#080808] border-b border-slate-200/80 dark:border-zinc-800/80 shadow-xs';
    }
    if (isTransparent && !isScrolled) {
      return 'header-transparent absolute top-0 left-0 w-full bg-transparent border-b border-transparent backdrop-blur-none shadow-none';
    }
    if (isScrolled) {
      return 'sticky top-0 bg-white/80 dark:bg-[#080808]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800/80 shadow-xs';
    }
    return 'sticky top-0 bg-transparent dark:bg-transparent border-b border-transparent shadow-none';
  };

  const normalizedPathname = (pathname || '').replace(/\/$/, '') || '/';

  return (
    <>
      <header
        ref={headerRef}
        className={`landing-header z-50 transition-all duration-200 ease-in-out ${getHeaderClasses()}`}
        dir="ltr"
      >
        <div className="header-container relative" dir="ltr">
          <Link 
            href={`/${lang}`} 
            className="brand-logo !inline-flex !items-center !shrink-0 select-none !m-0 !p-0"
            dir="ltr"
            style={{ fontFamily: 'var(--font-lufga), var(--font-sans), sans-serif' }}
          >
            <div className="flex items-center gap-2" dir="ltr">
              {/* Logo Icon */}
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

              {/* Brand Text + Lowercase Country Code */}
              <div className="relative inline-flex items-center leading-none" dir="ltr">
                <span className="font-semibold text-xl tracking-tight text-slate-900 dark:text-white">
                  Di-wrapp
                </span>
                <span 
                  className="relative -top-2.5 ml-0.5 text-[10px] font-light leading-[20px] tracking-normal text-slate-700 dark:text-zinc-300 lowercase select-none"
                  style={{ fontFamily: 'var(--font-lufga), sans-serif', fontWeight: 300 }}
                >
                  {countryCode ? countryCode.toLowerCase() : 'sa'}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto">
            {navItems.map((item) => {
              const normalizedHref = item.href.replace(/\/$/, '') || '/';
              const isActive = normalizedPathname === normalizedHref || (normalizedHref !== `/${lang}` && normalizedPathname.startsWith(`${normalizedHref}/`));
              return (
                <Link 
                  key={item.label} 
                  href={item.href}
                  className={`text-sm transition-colors duration-150 ${
                    isActive 
                      ? 'text-slate-950 dark:text-white font-semibold' 
                      : 'text-slate-600 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white font-medium'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions desktop-actions hidden lg:flex items-center gap-3 shrink-0">
            {/* 1. Theme Toggle: Must render with explicit 60x40px styling on desktop */}
            <ThemeToggle />

            {/* 2. Sign In Button */}
            <a
              href={`/${lang}/login`}
              className="h-10 px-5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-medium text-sm whitespace-nowrap flex items-center justify-center transition-all duration-150 ease-out hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:translate-y-0 active:scale-[0.99]"
            >
              {dictNav?.signIn || 'Sign In'}
            </a>

            {/* 3. Language Switcher */}
            <Link 
              href={targetLangHref} 
              className="text-slate-600 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white text-sm font-semibold transition-colors whitespace-nowrap px-2"
            >
              {langLabel}
            </Link>
          </div>

          {/* Mobile Actions (Visible on Mobile) */}
          <div className="mobile-header-actions flex lg:hidden items-center gap-2">
            {/* Animated Hamburger-to-X Morphing Button */}
            <button 
              className={`mobile-menu-btn w-10 h-10 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-slate-800 dark:text-zinc-200 shadow-xs hover:bg-slate-50 dark:hover:bg-zinc-800/80 transition-all duration-150 cursor-pointer ${isMenuOpen ? 'is-active' : ''}`} 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="overflow-visible"
              >
                <motion.line
                  x1="4"
                  y1="6"
                  x2="20"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  animate={isMenuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.line
                  x1="4"
                  y1="18"
                  x2="20"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Luxury B2B SaaS Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ top: `${headerHeight}px` }}
            className="fixed inset-x-0 bottom-0 z-40 bg-white/95 dark:bg-[#080808]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-zinc-800/80 lg:hidden flex flex-col justify-between overflow-y-auto"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            {/* Navigation links wrapper explicitly centering items */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 py-6 w-full">
              {navItems.map((item) => {
                const normalizedHref = item.href.replace(/\/$/, '') || '/';
                const isActive = normalizedPathname === normalizedHref || (normalizedHref !== `/${lang}` && normalizedPathname.startsWith(`${normalizedHref}/`));
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={toggleMenu}
                    className={`text-2xl tracking-tight transition-colors text-center ${
                      isActive
                        ? 'text-slate-950 dark:text-white font-semibold'
                        : 'text-slate-600 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white font-medium'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Fully Transparent & Centered Utility Dock (Language & Theme) */}
            <div className="w-full flex justify-center items-center px-6 mb-4">
              <div className="inline-flex flex-row items-center justify-center gap-4 bg-transparent border-none p-0 shadow-none">
                {/* Language Switch */}
                <Link 
                  className="flex flex-row items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white transition-colors bg-transparent border-none" 
                  href={targetLangHref} 
                  onClick={toggleMenu}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-500 dark:text-zinc-400"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>{langLabel}</span>
                </Link>

                {/* Subtle Vertical Divider */}
                <span className="h-4 w-px bg-slate-200 dark:bg-zinc-700" />

                {/* Theme Toggle */}
                <div className="flex items-center justify-center bg-transparent">
                  <ThemeToggle className="!w-6 !h-6 !p-0 !border-0 !bg-transparent text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white flex items-center justify-center cursor-pointer shadow-none" />
                </div>
              </div>
            </div>

            {/* Primary CTA wrapper */}
            <div className="w-full px-6 pb-8">
              <a 
                href={`/${lang}/login`} 
                onClick={toggleMenu} 
                className="w-full h-12 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium text-base shadow-sm flex items-center justify-center active:scale-[0.98] transition-transform"
              >
                {dictNav?.signIn || 'Sign In'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
