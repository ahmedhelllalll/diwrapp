import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function DropdownMenu({ trigger, items, align = 'right' }: { 
  trigger: React.ReactNode, 
  items: { label: string, icon?: string, onClick?: () => void, danger?: boolean, divider?: boolean }[],
  align?: 'left' | 'right'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<'bottom' | 'top'>('bottom');
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If there's less than 220px below, flip the menu upwards
      if (spaceBelow < 220) {
        setPlacement('top');
      } else {
        setPlacement('bottom');
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: placement === 'bottom' ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: placement === 'bottom' ? -10 : 10 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-[100] min-w-[200px] max-w-[calc(100vw-2rem)] bg-white dark:bg-[#0a0a0a] border border-[#e2e8f0] dark:border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-xl py-1.5 
              ${align === 'right' ? 'right-0' : 'left-0'} 
              ${placement === 'top' ? 'bottom-full mb-2 origin-bottom' : 'top-full mt-2 origin-top'}`}
          >
            {items.map((item, idx) => {
              if (item.divider) return <div key={idx} className="h-px bg-[#f1f5f9] dark:bg-zinc-800/80 my-1.5 mx-3"></div>;
              return (
                <button
                  key={idx}
                  onClick={() => { item.onClick?.(); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-[#0f172a] dark:text-zinc-100 font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 flex items-center gap-2 ${
                    item.danger ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30' : 'text-[#334155] dark:text-zinc-300 hover:bg-[#f8fafc] dark:hover:bg-zinc-900/50'
                  }`}
                >
                  {item.icon && <i className={`fa-solid ${item.icon} w-4 text-center ${item.danger ? 'text-red-500' : 'text-[#94a3b8] dark:text-zinc-500'}`}></i>}
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
