"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About us', href: '#' },
    { name: 'Advertise', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Join us', href: '#' },
    { name: 'Contact us', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-[#e2e8f0] dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="Di-wrapp Logo" 
              width={40} 
              height={40} 
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex items-center">
            <span className="text-[20px] font-bold text-[#0f172a] dark:text-zinc-100 tracking-tight leading-none">Di-wrapp</span>
            <span className="text-[9px] font-bold text-[#64748b] dark:text-zinc-500 ml-0.5 uppercase tracking-wider relative -top-2">SD</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[14px] font-bold text-[#334155] dark:text-zinc-400 hover:text-[#1665ff] dark:hover:text-blue-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Tools */}
        <div className="hidden lg:flex items-center gap-6">
          <ThemeToggle />
          <button className="px-7 py-3 rounded-xl bg-[#0f172a] dark:bg-blue-600 text-white font-bold text-[14px] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] dark:hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] active:scale-[0.98] active:translate-y-0">
            Sign In
          </button>
          <Link href="#" className="text-[15px] font-bold text-[#0f172a] dark:text-zinc-100 hover:text-[#1665ff] dark:hover:text-blue-500 transition-colors pr-2">
            عربي
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden w-10 h-10 flex items-center justify-center text-[#0f172a] dark:text-zinc-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-[20px]`}></i>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-[#e2e8f0] dark:border-zinc-800/80 bg-white dark:bg-black overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-[16px] font-bold text-[#334155] dark:text-zinc-100"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-[1px] bg-[#e2e8f0] dark:bg-[#0a0a0a]/80 my-2"></div>
              <div className="flex items-center gap-4">
                <button className="flex-1 px-4 py-3.5 rounded-xl bg-[#0f172a] dark:bg-blue-600 text-white font-bold text-[15px] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] dark:hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] active:scale-[0.98] active:translate-y-0">
                  Sign In
                </button>
                <div className="flex items-center justify-center w-12 h-12">
                  <ThemeToggle />
                </div>
              </div>
              <Link href="#" className="text-[17px] font-bold text-[#0f172a] dark:text-zinc-100 text-center py-2 mt-2">
                عربي
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
