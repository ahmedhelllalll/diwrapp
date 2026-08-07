"use client";

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const languages = [
  {
    code: 'en',
    name: 'English',
    native: 'English',
    flagUrl: 'https://flagcdn.com/w80/us.png',
  },
  {
    code: 'ar',
    name: 'Arabic',
    native: 'العربية',
    flagUrl: 'https://flagcdn.com/w80/sa.png',
  },
];

export default function LanguageToggle({ currentLang }: { currentLang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (newLang: string) => {
    setIsOpen(false);
    if (newLang === currentLang || !pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLang;
    router.push(segments.join('/'));
  };

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-11 px-3.5 flex items-center gap-2.5 rounded-xl border border-[#e2e8f0] dark:border-zinc-800 bg-transparent text-[#111827] dark:text-zinc-100 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:bg-[#f8fafc] dark:hover:bg-zinc-800/80 active:scale-[0.98] active:translate-y-0"
        aria-label="Toggle Language"
      >
        <img src={current.flagUrl} alt={current.name} className="w-[18px] h-[18px] rounded-full object-cover border border-[#e2e8f0] dark:border-zinc-700 bg-[#f0f0f0] dark:bg-zinc-800" />
        <span className="text-[13px] font-bold tracking-wide">{current.code.toUpperCase()}</span>
        <i className={`fa-solid fa-chevron-down text-[9px] text-[#9ca3af] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu - Minimal Design */}
      <div 
        className={`absolute top-[calc(100%+8px)] ltr:right-0 rtl:left-0 min-w-[140px] bg-white dark:bg-[#0f172a] border border-[#e2e8f0] dark:border-zinc-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] p-1.5 transition-all duration-200 origin-top-right ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[10px] transition-colors ${currentLang === lang.code ? 'bg-[#f8fafc] dark:bg-zinc-800/60 text-[#111827] dark:text-white' : 'text-[#64748b] dark:text-zinc-400 hover:bg-[#f8fafc] dark:hover:bg-zinc-800/40 hover:text-[#111827] dark:hover:text-zinc-200'}`}
          >
            <div className="flex items-center gap-2.5">
              <img src={lang.flagUrl} alt={lang.name} className="w-[16px] h-[16px] rounded-full object-cover shrink-0" />
              <span className={`text-[13px] leading-none ${currentLang === lang.code ? 'font-semibold' : 'font-medium'}`}>{lang.native}</span>
            </div>
            
            {currentLang === lang.code && (
              <i className="fa-solid fa-check text-[11px] text-[#0f172a] dark:text-white shrink-0 ml-3" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
