import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Modal({ isOpen, onClose, title, children, footer, type = 'standard' }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode, footer?: React.ReactNode, type?: 'standard' | 'danger' }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-6">
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
           <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="relative bg-white dark:bg-[#0a0a0a] rounded-t-3xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-lg overflow-hidden flex flex-col mt-auto sm:mt-0 max-h-[90vh] border dark:border-zinc-800">
             <div className="px-6 py-5 border-b border-[#e2e8f0] dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-[#0a0a0a]">
                <div className="flex items-center gap-3">
                  {type === 'danger' && (
                     <div className="w-10 h-10 rounded-full bg-[#fef2f2] dark:bg-red-500/10 text-[#ef4444] dark:text-red-400 border border-transparent dark:border-red-500/20 flex items-center justify-center shrink-0">
                       <i className="fa-solid fa-triangle-exclamation text-[15px]"></i>
                     </div>
                  )}
                  <h3 className="text-[17px] font-bold text-[#0f172a] dark:text-zinc-100">{title}</h3>
                </div>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94a3b8] dark:text-zinc-500 hover:text-[#475569] dark:hover:text-zinc-300 hover:bg-[#f1f5f9] dark:hover:bg-zinc-800 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0">
                  <i className="fa-solid fa-xmark text-[15px]"></i>
                </button>
             </div>
             <div className="p-6 text-[13.5px] text-[#64748b] dark:text-zinc-400 leading-relaxed bg-white dark:bg-[#0a0a0a]">
               {children}
             </div>
             {footer && (
               <div className="px-6 py-4 bg-[#f8fafc] dark:bg-zinc-900/50 border-t border-[#e2e8f0] dark:border-zinc-800 flex items-center justify-end gap-3">
                 {footer}
               </div>
             )}
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
