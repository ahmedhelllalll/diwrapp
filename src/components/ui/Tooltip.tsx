import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Tooltip({ children, content, position = 'top' }: { children: React.ReactNode, content: string, position?: 'top' | 'bottom' | 'left' | 'right' }) {
  const [isVisible, setIsVisible] = useState(false);
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-[100] px-2.5 py-1.5 bg-black text-white text-[11.5px] font-medium rounded-lg whitespace-nowrap shadow-md pointer-events-none ${positionClasses[position]}`}
          >
            {content}
            {position === 'top' && <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[4px] border-transparent border-t-black"></div>}
            {position === 'bottom' && <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-[4px] border-transparent border-b-black"></div>}
            {position === 'left' && <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-px border-[4px] border-transparent border-l-black"></div>}
            {position === 'right' && <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-px border-[4px] border-transparent border-r-black"></div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
