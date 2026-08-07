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
    <>
      <style>{`
        .lang-toggle-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px 7px 8px;
          background: #ffffff;
          border: 1.5px solid #e8eaed;
          border-radius: 14px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-jakarta, sans-serif);
        }
        .lang-toggle-btn:hover {
          background: #f8f9fb;
          border-color: #d1d5db;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.05);
          transform: translateY(-1px);
        }
        .lang-toggle-btn:active {
          transform: translateY(0);
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .lang-flag-img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid #e8eaed;
          background: #f0f0f0;
        }
        .lang-btn-code {
          font-size: 13px;
          font-weight: 700;
          color: #111827;
          letter-spacing: 0.02em;
          line-height: 1;
        }
        .lang-chevron {
          font-size: 9px;
          color: #9ca3af;
          margin-left: 2px;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .lang-chevron.open {
          transform: rotate(180deg);
        }
        .lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          inset-inline-end: 0;
          width: 196px;
          background: #ffffff;
          border: 1.5px solid #f0f0f2;
          border-radius: 18px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06);
          padding: 6px;
          transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: top right;
          z-index: 100;
        }
        .lang-dropdown.closed {
          opacity: 0;
          transform: scale(0.92) translateY(-8px);
          pointer-events: none;
        }
        .lang-dropdown.open {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: all;
        }
        .lang-dropdown-header {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #9ca3af;
          padding: 6px 10px 4px;
        }
        .lang-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 10px;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.15s ease;
          border: 1.5px solid transparent;
          width: 100%;
          text-align: start;
          background: transparent;
          font-family: var(--font-jakarta, sans-serif);
        }
        .lang-option:hover {
          background: #f8f9fb;
        }
        .lang-option.active {
          background: #f4f5f7;
          border-color: #e8eaed;
        }
        .lang-option-flag {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid #e8eaed;
          background: #f0f0f0;
          flex-shrink: 0;
        }
        .lang-option-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 1px;
        }
        .lang-option-name {
          font-size: 13.5px;
          font-weight: 700;
          color: #111827;
          line-height: 1;
        }
        .lang-option-native {
          font-size: 11.5px;
          font-weight: 500;
          color: #9ca3af;
          line-height: 1;
        }
        .lang-active-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          box-shadow: 0 0 0 2.5px rgba(34,197,94,0.15);
        }
      `}</style>

      <div style={{ position: 'absolute', top: '20px', insetInlineEnd: '20px', zIndex: 50 }} ref={dropdownRef}>
        <button className="lang-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <img src={current.flagUrl} alt={current.name} className="lang-flag-img" />
          <span className="lang-btn-code">{current.code.toUpperCase()}</span>
          <i className={`fa-solid fa-chevron-down lang-chevron ${isOpen ? 'open' : ''}`}></i>
        </button>

        <div className={`lang-dropdown ${isOpen ? 'open' : 'closed'}`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
            >
              <img src={lang.flagUrl} alt={lang.name} className="lang-option-flag" />
              <div className="lang-option-info">
                <span className="lang-option-name">{lang.native}</span>
                <span className="lang-option-native">{lang.name}</span>
              </div>
              {currentLang === lang.code && <div className="lang-active-dot" />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
