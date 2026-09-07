'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

interface StayTunedNavbarProps {
  lang: string;
  dictNav?: {
    about?: string;
    advertise?: string;
    blog?: string;
    join?: string;
    contact?: string;
    signIn?: string;
  };
  showNavLinks?: boolean;
}

export default function StayTunedNavbar({
  lang,
  dictNav,
  showNavLinks = true,
}: StayTunedNavbarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextLang = lang === 'en' ? 'ar' : 'en';
  const langLabel = lang === 'en' ? 'عربي' : 'English';
  const targetLangHref = pathname.startsWith(`/${lang}`)
    ? pathname.replace(`/${lang}`, `/${nextLang}`)
    : `/${nextLang}/blog`;

  const activeTheme = theme === 'system' ? resolvedTheme : theme;
  const toggleTheme = () => setTheme(activeTheme === 'dark' ? 'light' : 'dark');

  const navLinks = [
    { name: dictNav?.about || (lang === 'ar' ? 'من نحن' : 'About us'), href: `/${lang}/about` },
    { name: dictNav?.advertise || (lang === 'ar' ? 'أعلن معنا' : 'Advertise'), href: `/${lang}/advertise` },
    { name: dictNav?.blog || (lang === 'ar' ? 'المدونة' : 'Blog'), href: `/${lang}/blog` },
    { name: dictNav?.join || (lang === 'ar' ? 'انضم إلينا' : 'Join us'), href: `/${lang}/join-us` },
    { name: dictNav?.contact || (lang === 'ar' ? 'تواصل معنا' : 'Contact us'), href: `/${lang}/contact` },
  ];

  return (
    <header className="w-full bg-white dark:bg-[#080808] border-b border-gray-100 dark:border-zinc-800/60 transition-colors duration-300 relative z-30">
      <div className="w-full max-w-[1320px] mx-auto px-6 lg:px-12 py-5 sm:py-6 flex items-center justify-between">
        {/* Left: Di_wrapp Logo */}
        <Link href={`/${lang}`} className="inline-flex items-center gap-2 select-none group shrink-0">
          <Image
            src="/logo.png"
            alt="Di-wrapp Logo"
            width={34}
            height={34}
            className="object-contain"
          />
          <span className="text-xl font-bold text-[#101828] dark:text-white tracking-tight font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
            Di-wrapp
          </span>
          <span className="text-[10px] font-bold text-[#667085] dark:text-zinc-400 uppercase -mt-2">
            SO
          </span>
        </Link>

        {/* Center: Navigation Links (System Design) */}
        {showNavLinks && (
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href.includes('/blog') && pathname.includes('/blog'));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm transition-colors duration-150 ${
                    isActive
                      ? 'text-[#1665FF] dark:text-[#3B82F6] font-bold'
                      : 'text-[#475569] dark:text-zinc-400 hover:text-[#101828] dark:hover:text-white font-medium'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right: Theme Toggle + Sign In + Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-xs active:scale-[0.98]"
            aria-label="Toggle theme"
          >
            {mounted ? (
              activeTheme === 'dark' ? (
                /* Sun icon */
                <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                /* Moon icon */
                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )
            ) : (
              <div className="w-4 h-4" />
            )}
          </button>

          {/* Sign In Button */}
          <Link
            href={`/${lang}/login`}
            className="hidden sm:inline-flex h-[40px] px-5 rounded-lg bg-[#101828] hover:bg-[#1D2939] dark:bg-white dark:text-[#101828] dark:hover:bg-zinc-100 text-white text-sm font-medium transition-all shadow-xs items-center justify-center font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] active:scale-[0.98]"
          >
            {dictNav?.signIn || (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
          </Link>

          {/* Language Switcher */}
          <Link
            href={targetLangHref}
            className="text-sm font-semibold text-[#101828] dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-['Cairo',sans-serif] px-1.5 py-1"
          >
            {langLabel}
          </Link>

          {/* Mobile Hamburger Menu Button */}
          {showNavLinks && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-[#101828] dark:text-white"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showNavLinks && mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-zinc-800/80 bg-white dark:bg-[#0A0C0E] px-6 py-5 space-y-3 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href.includes('/blog') && pathname.includes('/blog'));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-base transition-colors ${
                  isActive
                    ? 'text-[#1665FF] dark:text-[#3B82F6] font-bold'
                    : 'text-[#475569] dark:text-zinc-300 font-medium'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href={`/${lang}/login`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-[42px] rounded-lg bg-[#101828] text-white text-sm font-medium flex items-center justify-center dark:bg-white dark:text-[#101828]"
            >
              {dictNav?.signIn || (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
