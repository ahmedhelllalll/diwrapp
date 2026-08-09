"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Dict = any;

export default function Sidebar({ dict, lang }: { dict: Dict; lang: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeTab = searchParams.get("tab") || "overview";
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const isAdvertiser = pathname?.includes('/advertiser');
  const roleName = isAdvertiser ? dict.dashboard.sidebar.advertiser || "Advertiser" : dict.dashboard.sidebar.vendor || "Vendor";
  const userFallback = isAdvertiser ? "Ahmed Helal" : dict.dashboard.vendor.fallbackName;

  const [userName, setUserName] = useState(userFallback);

  useEffect(() => {
    const userStr = localStorage.getItem("diwrapp_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, [dict.dashboard.vendor.fallbackName]);

  useEffect(() => {
    const handleToggle = () => setIsMobileOpen(prev => !prev);
    document.addEventListener('toggleSidebar', handleToggle);
    return () => document.removeEventListener('toggleSidebar', handleToggle);
  }, []);

  const closeMobileSidebar = () => setIsMobileOpen(false);

  const vendorNavItems = [
    { id: "overview", name: dict.dashboard.sidebar.overview, href: `/${lang}/vendor?tab=overview`, icon: "fa-house", active: true },
    { id: "listings", name: dict.dashboard.sidebar.myListings, href: `/${lang}/vendor?tab=listings`, icon: "fa-layer-group", active: false },
    { id: "bookings", name: dict.dashboard.sidebar.bookings, href: `/${lang}/vendor?tab=bookings`, icon: "fa-calendar-check", badge: 2, active: false },
    { id: "analytics", name: dict.dashboard.sidebar.analytics, href: `/${lang}/vendor?tab=analytics`, icon: "fa-chart-simple", active: false },
    { id: "settings", name: dict.dashboard.sidebar.settings, href: `/${lang}/vendor?tab=settings`, icon: "fa-gear", active: false },
  ];

  const advertiserNavItems = [
    { id: "overview", name: dict.dashboard.sidebar.overview, href: `/${lang}/advertiser?tab=overview`, icon: "fa-house", active: true },
    { id: "campaigns", name: dict.dashboard.sidebar.myCampaigns, href: `/${lang}/advertiser?tab=campaigns`, icon: "fa-bullhorn", active: false },
    { id: "bookings", name: dict.dashboard.sidebar.bookingsAndInvoices, href: `/${lang}/advertiser?tab=bookings`, icon: "fa-file-invoice-dollar", active: false },
    { id: "analytics", name: dict.dashboard.sidebar.analytics, href: `/${lang}/advertiser?tab=analytics`, icon: "fa-chart-simple", active: false },
    { id: "settings", name: dict.dashboard.sidebar.settings, href: `/${lang}/advertiser?tab=settings`, icon: "fa-gear", active: false },
  ];

  const navItems = isAdvertiser ? advertiserNavItems : vendorNavItems;

  const SidebarContent = (
    <>
      {/* Brand Header */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-slate-200/70 dark:border-zinc-800/80 shrink-0">
        <Link href={`/${lang}/vendor`} onClick={closeMobileSidebar} className="flex items-center gap-3 w-full">
          <div className="flex items-center justify-center shrink-0">
            <Image src="/logo.png" alt="Di-wrapp" width={22} height={22} className="object-contain" />
          </div>
          <span className="text-[15px] font-extrabold tracking-tight text-slate-900 dark:text-white">Di-wrapp</span>
        </Link>
        <button onClick={closeMobileSidebar} className="md:hidden text-slate-500 hover:text-slate-900 dark:hover:text-white p-1 transition-colors">
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const isDev = item.active === false;

          const baseClasses = `flex items-center justify-between w-full text-start px-3 py-2.5 rounded-xl text-xs transition-all duration-200 group ${
            isActive 
              ? "bg-slate-100/90 text-slate-900 dark:bg-zinc-800/90 dark:text-white dark:border dark:border-zinc-700/60 font-medium" 
              : "bg-transparent hover:bg-slate-50 dark:hover:bg-zinc-900/50 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200 font-normal"
          }`;

          const content = (
            <>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-4 h-4 shrink-0 transition-colors">
                  <i className={`fa-solid ${item.icon} text-[14px]`}></i>
                </div>
                {item.name}
              </div>
              {item.badge && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? "bg-blue-100 text-[#1E6BFF] dark:bg-blue-500/20 dark:text-blue-400" : "bg-slate-200 text-slate-700 dark:bg-zinc-700 dark:text-zinc-300"
                }`}>
                  {item.badge}
                </span>
              )}
            </>
          );

          if (isDev) {
            return (
              <button
                key={item.id}
                onClick={() => {
                  closeMobileSidebar();
                  document.dispatchEvent(new CustomEvent('showGlobalToast', { 
                    detail: { 
                      title: `${item.name} Module`, 
                      desc: "This section is currently under development for your workspace.",
                      icon: "fa-wand-magic-sparkles"
                    }
                  }));
                }}
                className={baseClasses}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              scroll={false}
              onClick={closeMobileSidebar}
              className={baseClasses}
            >
              {content}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="p-4 border-t border-slate-200/70 dark:border-zinc-800/80 shrink-0">
        <div className="flex items-center justify-between group cursor-pointer p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-zinc-900 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0F172A] dark:bg-zinc-800 flex items-center justify-center text-white text-[12px] font-bold shadow-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className={`text-[12px] ${lang === 'ar' ? 'font-medium' : 'font-bold'} text-slate-900 dark:text-white truncate max-w-[100px]`}>{userName}</span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-zinc-400 uppercase tracking-wider">{roleName}</span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-red-500 transition-colors" title={dict.dashboard.sidebar.logout}>
            <i className="fa-solid fa-arrow-right-from-bracket text-[13px] rtl:rotate-180"></i>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col w-64 h-full bg-white dark:bg-black border-e border-slate-200/70 dark:border-zinc-800/80 transition-colors duration-300 ${lang === 'ar' ? 'leading-relaxed' : ''}`}>
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileSidebar}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm md:hidden"
            />
            {/* Drawer */}
            <motion.aside 
              initial={{ x: lang === 'ar' ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: lang === 'ar' ? "100%" : "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className={`fixed top-0 bottom-0 start-0 z-[101] w-[280px] bg-white dark:bg-black flex flex-col md:hidden shadow-2xl border-e border-slate-200/70 dark:border-zinc-800/80 transform-gpu will-change-transform ${lang === 'ar' ? 'leading-relaxed' : ''}`}
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
