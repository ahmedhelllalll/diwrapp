import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileTabDropdown({ activeTab, tabs, onChange }: { activeTab: string, tabs: string[], onChange: (tab: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="block md:hidden w-full mt-5" ref={menuRef}>
      <div className="flex items-center gap-2 mb-2 ml-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1665ff] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1665ff]"></span>
        </span>
        <span className="text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">Categories / View Section</span>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-slate-50 dark:bg-[#0a0a0a] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-left shadow-sm focus:outline-none focus:ring-4 focus:ring-[#1665ff]/10 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-[#1665ff] dark:text-blue-500 shadow-sm">
              <i className="fa-solid fa-layer-group text-[13px]"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider leading-none mb-1">Viewing</span>
              <span className="text-[14px] font-bold text-[#0f172a] dark:text-zinc-100 leading-none">{activeTab}</span>
            </div>
          </div>
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }} 
            className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400"
          >
            <i className="fa-solid fa-chevron-down text-[10px]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-[150] top-full left-0 right-0 mt-2 backdrop-blur-md bg-white/95 dark:bg-[#0a0a0a]/95 shadow-xl border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-2 overflow-hidden"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => { onChange(tab); setIsOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-[13.5px] rounded-xl flex items-center justify-between transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 ${
                      isActive 
                        ? 'bg-[#eff6ff] dark:bg-blue-950/30 text-[#1665ff] dark:text-blue-400 font-bold' 
                        : 'text-slate-600 dark:text-zinc-400 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {tab}
                    {isActive && <i className="fa-solid fa-check text-[13px] text-[#1665ff] dark:text-blue-400"></i>}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
