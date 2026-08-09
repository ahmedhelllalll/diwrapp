"use client";

import LanguageToggle from "@/components/common/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ lang, dict }: { lang: string; dict?: any }) {
  const [mounted, setMounted] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isAdvertiser = pathname?.includes('/advertiser');

  const vendorNotifications = [
    { id: 1, title: dict?.notifications?.items?.newRequestTitle || "New Campaign Request", desc: dict?.notifications?.items?.pepsiRequest || "Pepsi requested Downtown Display.", time: dict?.notifications?.time?.minsAgo?.replace('{{count}}', '2') || "2 mins ago", unread: true },
    { id: 2, title: dict?.notifications?.items?.paymentReceivedTitle || "Payment Received", desc: dict?.notifications?.items?.paymentReceivedDesc || "$4,250 deposited for Metro Station B.", time: dict?.notifications?.time?.hourAgo || "1 hour ago", unread: true },
    { id: 3, title: dict?.notifications?.items?.systemUpdateTitle || "System Update", desc: dict?.notifications?.items?.systemUpdateDesc || "Analytics reporting v2.4 is now live.", time: dict?.notifications?.time?.dayAgo || "1 day ago", unread: true }
  ];

  const advertiserNotifications = [
    { id: 1, title: dict?.dashboard?.notifications?.advertiser?.approvedTitle || "Campaign Approved", desc: dict?.dashboard?.notifications?.advertiser?.approvedDesc || "'Downtown Digital Billboard' is now live!", time: dict?.notifications?.time?.minsAgo?.replace('{{count}}', '5') || "5 mins ago", unread: true },
    { id: 2, title: dict?.dashboard?.notifications?.advertiser?.invoiceTitle || "Invoice Generated", desc: dict?.dashboard?.notifications?.advertiser?.invoiceDesc || "$800 payment confirmed for July cycle.", time: dict?.notifications?.time?.hoursAgo?.replace('{{count}}', '2') || "2 hours ago", unread: true },
    { id: 3, title: "Proposal Received", desc: "New spot available on Ring Road Highway.", time: dict?.notifications?.time?.dayAgo || "1 day ago", unread: true }
  ];

  const [notifications, setNotifications] = useState(isAdvertiser ? advertiserNotifications : vendorNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside, { passive: true });
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const DesktopNotificationDropdown = (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute end-0 top-full mt-2 w-[340px] max-w-[calc(100vw-2rem)] bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-black/40 overflow-hidden z-[9999]"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-900/30">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          {dict?.notifications?.title || "Notifications"} {unreadCount > 0 && <span className="bg-blue-100 text-[#1E6BFF] dark:bg-[#1E6BFF]/20 dark:text-blue-400 text-[10px] px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
        </h3>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs font-semibold text-[#1E6BFF] hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
            {dict?.notifications?.markAllRead || "Mark all as read"}
          </button>
        )}
      </div>
      
      <div className="max-h-[350px] overflow-y-auto flex flex-col">
        {notifications.map((notif) => (
          <div 
            key={notif.id}
            onClick={() => markRead(notif.id)}
            className={`px-4 py-2.5 border-b border-slate-100 dark:border-zinc-800/50 last:border-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors relative ${notif.unread ? 'bg-blue-50/30 dark:bg-[#1E6BFF]/5' : ''}`}
          >
            {notif.unread && <span className="absolute start-2.5 top-3.5 w-1.5 h-1.5 rounded-full bg-[#1E6BFF] shadow-[0_0_6px_rgba(30,107,255,0.6)]"></span>}
            <div className={`flex flex-col gap-0.5 ${notif.unread ? 'ms-2' : 'ms-0'}`}>
              <div className="flex justify-between items-start">
                <span className={`text-xs text-slate-900 dark:text-white ${notif.unread ? 'font-bold' : 'font-medium'}`}>{notif.title}</span>
                <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-medium shrink-0 pt-0.5">{notif.time}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{notif.desc}</p>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="p-4 text-center text-xs text-slate-500 dark:text-zinc-400 font-medium">
            No notifications right now.
          </div>
        )}
      </div>
    </motion.div>
  );

  const MobileNotificationSheet = mounted && typeof window !== 'undefined' ? createPortal(
    <AnimatePresence>
      {isMobile && isNotifOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col justify-end pointer-events-auto" key="mobile-sheet">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsNotifOpen(false);
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />
          {/* Drawer Content */}
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-[9999] w-full bg-white dark:bg-zinc-900 rounded-t-3xl p-4 sm:p-5 shadow-2xl h-auto max-h-[60vh] flex flex-col overflow-hidden pb-6 transform-gpu will-change-transform"
          >
            {/* Top Drag Handle */}
            <div className="w-10 h-1 bg-slate-300 dark:bg-zinc-700 rounded-full mx-auto mb-3 shrink-0"></div>
            
            {/* Sheet Header */}
            <div className="flex items-center justify-between mb-2 shrink-0">
              <h3 className="font-bold text-slate-900 dark:text-white text-[15px] flex items-center gap-2">
                {dict?.notifications?.title || "Notifications"} {unreadCount > 0 && <span className="bg-blue-100 text-[#1E6BFF] dark:bg-[#1E6BFF]/20 dark:text-blue-400 text-[10px] px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
              </h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-[11px] font-semibold text-[#1E6BFF] hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  {dict?.notifications?.markAllRead || "Mark all as read"}
                </button>
              )}
            </div>
            
            {/* Sheet Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto space-y-2 my-2 pe-1">
              {notifications.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => markRead(notif.id)}
                  className={`p-2.5 border-b border-slate-100 dark:border-zinc-800/50 last:border-0 cursor-pointer relative ${notif.unread ? 'bg-blue-50/30 dark:bg-[#1E6BFF]/5 rounded-xl' : ''}`}
                >
                  {notif.unread && <span className="absolute start-1.5 top-4 w-1.5 h-1.5 rounded-full bg-[#1E6BFF] shadow-[0_0_6px_rgba(30,107,255,0.6)]"></span>}
                  <div className={`flex flex-col gap-0.5 ${notif.unread ? 'ms-2.5' : 'ms-0'}`}>
                    <div className="flex justify-between items-start">
                      <span className={`text-xs text-slate-900 dark:text-white ${notif.unread ? 'font-bold' : 'font-medium'}`}>{notif.title}</span>
                      <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-medium shrink-0 pt-0.5">{notif.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{notif.desc}</p>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="p-4 text-center text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                  No notifications right now.
                </div>
              )}
            </div>

            {/* Close Button */}
            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 shrink-0 mt-1">
              <button onClick={() => setIsNotifOpen(false)} className="w-full bg-slate-100 dark:bg-zinc-800/60 text-slate-900 dark:text-white text-xs font-bold py-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors active:scale-95">
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  ) : null;

  return (
    <header className="sticky top-0 z-40 w-full h-14 backdrop-blur-md bg-white/90 dark:bg-[#0a0a0a]/90 border-b border-slate-200/80 dark:border-zinc-800 flex items-center justify-between px-4 sm:px-6 shrink-0 transition-colors transform-gpu will-change-transform">
      
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => document.dispatchEvent(new CustomEvent('toggleSidebar'))}
          className="md:hidden text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white p-1"
        >
          <i className="fa-solid fa-bars text-lg"></i>
        </button>

        {/* Mobile Brand Logo */}
        <Link href={`/${lang}/vendor`} className="md:hidden flex items-center gap-2 ms-1">
          <div className="flex items-center justify-center shrink-0">
            <Image src="/logo.png" alt="Di-wrapp" width={20} height={20} className="object-contain" />
          </div>
          <span className="text-[15px] font-extrabold tracking-tight text-slate-900 dark:text-white">Di-wrapp</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Notification Bell Context Wrapper */}
        <div className="relative flex items-center" ref={dropdownRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-zinc-900 transition-colors"
          >
            <i className="fa-regular fa-bell text-[19px]"></i>
            {unreadCount > 0 && (
              <span className="absolute top-2 end-2 w-2 h-2 bg-[#1E6BFF] rounded-full animate-pulse border-2 border-white dark:border-[#0a0a0a]"></span>
            )}
          </button>

          {/* Desktop Dropdown Menu */}
          <AnimatePresence>
            {!isMobile && isNotifOpen && DesktopNotificationDropdown}
          </AnimatePresence>
        </div>

        {/* Mobile Bottom Sheet Drawer (Rendered via Portal to body) */}
        {MobileNotificationSheet}

        {/* Desktop Only Extra Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-px h-5 bg-slate-200 dark:bg-zinc-800 mx-1"></div>
          <ThemeToggle />
          <LanguageToggle currentLang={lang as any} />
        </div>
      </div>

    </header>
  );
}
