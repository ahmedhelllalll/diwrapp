'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface LandingHeaderProps {
  lang: string;
  nextLang: string;
  langLabel: string;
  dictNav: any;
  transparent?: boolean;
}

export default function LandingHeader({ lang, nextLang, langLabel, dictNav, transparent }: LandingHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isJoinUs = pathname.includes('/join-us');
  const isTransparent = transparent || isJoinUs;
  const isSubPage = pathname.includes('/advertise') || pathname.includes('/about') || pathname.includes('/contact') || pathname.includes('/blog') || pathname.includes('/coming-soon') || pathname.includes('/stay-tuned') || isJoinUs;
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

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        className={`landing-header transition-all duration-300 ${
          isTransparent
            ? 'header-transparent bg-transparent border-transparent absolute top-0 left-0 w-full z-50 !backdrop-blur-none !bg-none'
            : 'sticky top-0 z-50 bg-white/70 dark:bg-[#080808]/70 backdrop-blur-md'
        } ${isMenuOpen ? 'menu-open' : ''}`}
      >
        <div className="header-container">
          <Link href={`/${lang}`} className="brand-logo !inline-flex !items-center !gap-2 !shrink-0 select-none !m-0 !p-0">
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
            <span className="!font-semibold !text-xl !tracking-tight !leading-none text-[#101828] dark:text-zinc-100 flex items-center !m-0">
              Di-wrapp
              <sup className="text-[10px] font-bold ml-0.5 text-[#64748b] dark:text-zinc-500 uppercase">SD</sup>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav *:text-slate-600 hover:*:text-slate-900 dark:*:text-zinc-400 dark:hover:*:text-white *:transition-colors">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.label} 
                  href={item.href}
                  className={isActive ? '!text-blue-600 dark:!text-blue-500 font-bold' : ''}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions desktop-actions">
            <ThemeToggle />
            <a href={`/${lang}/login`} className="btn-sign-in bg-slate-900 text-white hover:bg-blue-600 dark:bg-zinc-100 dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white shadow-blue-500/20 dark:shadow-blue-600/30">{dictNav?.signIn || 'Sign In'}</a>
            <Link href={targetLangHref} className="lang-switch font-bold text-[14px] leading-[20px] tracking-normal text-center text-slate-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-500">{langLabel}</Link>
          </div>

          {/* Mobile Actions (Visible on Mobile) */}
          <div className="mobile-header-actions flex items-center gap-2">
            <ThemeToggle />
            <Link href={targetLangHref} className="lang-switch font-bold text-[14px] leading-[20px] tracking-normal text-center text-slate-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-500">{langLabel}</Link>
            
            {/* Mobile Hamburger Button */}
            <button 
              className={`mobile-menu-btn text-slate-900 dark:text-zinc-100 ${isMenuOpen ? 'is-active' : ''}`} 
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <div className="hamburger-box">
                <span className="hamburger-inner"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Split Dual-Panel Mobile Menu */}
      <div className={`split-overlay ${isMenuOpen ? 'is-active' : ''}`}>
        <div className="split-panel-left"></div>
        <div className="split-panel-right"></div>
        <div className="split-content">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label} 
                href={item.href} 
                onClick={toggleMenu}
                className={isActive ? 'text-blue-600 dark:text-blue-500 font-bold' : ''}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="split-mobile-actions">
            <a href={`/${lang}/login`} className="btn-sign-in bg-slate-900 text-white hover:bg-blue-600 dark:bg-zinc-100 dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white shadow-blue-500/20 dark:shadow-blue-600/30" onClick={toggleMenu}>{dictNav.signIn}</a>
          </div>
        </div>
      </div>
    </>
  );
}
