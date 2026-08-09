'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface LandingHeaderProps {
  lang: string;
  nextLang: string;
  langLabel: string;
  dictNav: any;
}

export default function LandingHeader({ lang, nextLang, langLabel, dictNav }: LandingHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <header className={`landing-header sticky top-0 z-50 bg-white/70 dark:bg-[#080808]/70 backdrop-blur-md transition-all duration-300 ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="header-container">
          <Link href={`/${lang}`} className="brand-logo">
            <div className="logo-icon w-10 h-10 bg-transparent flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Di-wrapp Logo" 
                width={40} 
                height={40} 
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex items-center ml-2">
              <span className="text-[20px] font-bold text-[#0f172a] dark:text-zinc-100 tracking-tight leading-none">Di-wrapp</span>
              <span className="text-[9px] font-bold text-[#64748b] dark:text-zinc-500 ml-0.5 uppercase tracking-wider relative -top-2">SD</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav *:text-slate-600 hover:*:text-slate-900 dark:*:text-zinc-400 dark:hover:*:text-white *:transition-colors">
            <Link href="#">{dictNav.about}</Link>
            <Link href="#">{dictNav.advertise}</Link>
            <Link href="#">{dictNav.blog}</Link>
            <Link href="#">{dictNav.join}</Link>
            <Link href="#">{dictNav.contact}</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions desktop-actions">
            <ThemeToggle />
            <a href={`/${lang}/login`} className="btn-sign-in bg-slate-900 text-white hover:bg-blue-600 dark:bg-zinc-100 dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white shadow-blue-500/20 dark:shadow-blue-600/30">{dictNav.signIn}</a>
            <Link href={`/${nextLang}`} className="lang-switch text-slate-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-500">{langLabel}</Link>
          </div>

          {/* Mobile Actions (Visible on Mobile) */}
          <div className="mobile-header-actions flex items-center gap-2">
            <ThemeToggle />
            <Link href={`/${nextLang}`} className="lang-switch text-slate-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-500">{langLabel}</Link>
            
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
          <Link href="#" onClick={toggleMenu}>{dictNav.about}</Link>
          <Link href="#" onClick={toggleMenu}>{dictNav.advertise}</Link>
          <Link href="#" onClick={toggleMenu}>{dictNav.blog}</Link>
          <Link href="#" onClick={toggleMenu}>{dictNav.join}</Link>
          <Link href="#" onClick={toggleMenu}>{dictNav.contact}</Link>
          <div className="split-mobile-actions">
            <a href={`/${lang}/login`} className="btn-sign-in bg-slate-900 text-white hover:bg-blue-600 dark:bg-zinc-100 dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white shadow-blue-500/20 dark:shadow-blue-600/30" onClick={toggleMenu}>{dictNav.signIn}</a>
          </div>
        </div>
      </div>
    </>
  );
}
