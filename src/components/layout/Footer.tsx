import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'iconoir-react';

interface FooterDict {
  slogan?: string;
  poweredBy?: string;
  groupName?: string;
  address?: string;
  phone?: string;
  email?: string;
  columns?: {
    diWrapp?: string;
    support?: string;
    joinIn?: string;
  };
  links?: {
    about?: string;
    booking?: string;
    blog?: string;
    career?: string;
    contact?: string;
    investors?: string;
    lifeAtDiWrapp?: string;
    promocodes?: string;
    helpCenter?: string;
    howItWorks?: string;
    cancellationOption?: string;
    liveChat?: string;
    collections?: string;
    ticket?: string;
    modes?: string;
    faq?: string;
    vendor?: string;
    eBranding?: string;
    getDiWrapped?: string;
    responsibility?: string;
    resources?: string;
    elements?: string;
    documentation?: string;
    community?: string;
  };
  legal?: {
    terms?: string;
    privacy?: string;
    cookies?: string;
    allRightsReserved?: string;
  };
}

interface FooterProps {
  lang?: string;
  dict?: FooterDict;
}

export default function Footer({ lang = 'en', dict }: FooterProps) {
  const isRtl = lang === 'ar';

  const diWrappLinks = [
    { label: dict?.links?.about || 'About', href: `/${lang}/about` },
    { label: dict?.links?.booking || 'Booking', href: '#' },
    { label: dict?.links?.blog || 'Blog', href: `/${lang}/blog` },
    { label: dict?.links?.career || 'Career', href: '#' },
    { label: dict?.links?.contact || 'Contact', href: `/${lang}/contact` },
    { label: dict?.links?.investors || 'Investors', href: '#' },
    { label: dict?.links?.lifeAtDiWrapp || 'Life At Di-Wrapp', href: '#' },
    { label: dict?.links?.promocodes || 'Promocodes', href: '#' },
  ];

  const supportLinks = [
    { label: dict?.links?.helpCenter || 'Help Center', href: '#' },
    { label: dict?.links?.howItWorks || 'How It Works', href: '#' },
    { label: dict?.links?.cancellationOption || 'Cancellation Option', href: '#' },
    { label: dict?.links?.liveChat || 'Live Chat', href: '#' },
    { label: dict?.links?.collections || 'Collections', href: '#' },
    { label: dict?.links?.ticket || 'Ticket', href: '#' },
    { label: dict?.links?.modes || 'Modes', href: '#' },
    { label: dict?.links?.faq || 'FAQ', href: '#' },
  ];

  const joinInLinks = [
    { label: dict?.links?.vendor || 'Vendor', href: '#' },
    { label: dict?.links?.eBranding || 'E-Branding', href: '#' },
    { label: dict?.links?.getDiWrapped || 'Get Di-Wrapped', href: '#' },
    { label: dict?.links?.responsibility || 'Responsibility', href: '#' },
    { label: dict?.links?.resources || 'Resources', href: '#' },
    { label: dict?.links?.elements || 'Elements', href: '#' },
    { label: dict?.links?.documentation || 'Documentation', href: '#' },
    { label: dict?.links?.community || 'Community', href: '#' },
  ];

  return (
    <footer className="font-sans bg-white dark:bg-[#0a0a0a] pt-16 pb-8 border-t border-slate-100 dark:border-zinc-800/60">
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-6 lg:col-span-2">
            <Link 
              href={`/${lang}`} 
              className="inline-flex items-center gap-2 select-none" 
              dir="ltr"
              style={{ fontFamily: 'var(--font-lufga), var(--font-sans), sans-serif' }}
            >
              <div className="w-9 h-9 flex items-center justify-center shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Di-wrapp Logo" 
                  width={36} 
                  height={36} 
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="relative inline-flex items-center leading-none" dir="ltr">
                <span className="font-bold text-[20px] tracking-tight text-[#0f172a] dark:text-zinc-100">
                  Di-wrapp
                </span>
                <span 
                  className="relative -top-2.5 ml-0.5 text-[9px] font-light leading-[18px] tracking-normal text-slate-500 dark:text-zinc-400 lowercase select-none"
                  style={{ fontFamily: 'var(--font-lufga), sans-serif', fontWeight: 300 }}
                >
                  sa
                </span>
              </div>
            </Link>
            
            <p className="text-[#475569] dark:text-zinc-400 text-[13.5px] leading-relaxed max-w-[300px] font-medium">
              {dict?.slogan || 'Streamline Your Ads, Amplify Your Reach.'}<br/>
              {dict?.poweredBy || 'Powered by'} <span className="font-bold text-black dark:text-zinc-100">{dict?.groupName || 'Distin-Gui Group.'}</span>
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-[#475569] dark:text-zinc-400 text-[13px] font-medium group">
                <Phone width={15} height={15} strokeWidth={1.8} className="text-[#64748b] dark:text-zinc-500 group-hover:text-[#1665ff] dark:group-hover:text-blue-500 transition-colors shrink-0" />
                <a href="tel:+966000000000" className="group-hover:text-black dark:group-hover:text-zinc-100 transition-colors">
                  <span dir="ltr" className="inline-block font-sans">
                    {dict?.phone || '+966 00 000 0000'}
                  </span>
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#475569] dark:text-zinc-400 text-[13px] font-medium group">
                <Mail width={15} height={15} strokeWidth={1.8} className="text-[#64748b] dark:text-zinc-500 group-hover:text-[#1665ff] dark:group-hover:text-blue-500 transition-colors shrink-0" />
                <a href="mailto:info@di-wrapp.com" className="group-hover:text-black dark:group-hover:text-zinc-100 transition-colors">
                  <span dir="ltr" className="inline-block font-sans">
                    {dict?.email || 'info@di-wrapp.com'}
                  </span>
                </a>
              </div>
              <div className="flex items-start gap-3 text-[#475569] dark:text-zinc-400 text-[13px] font-medium leading-relaxed max-w-[260px] group">
                <MapPin width={15} height={15} strokeWidth={1.8} className="mt-0.5 text-[#64748b] dark:text-zinc-500 group-hover:text-[#1665ff] dark:group-hover:text-blue-500 transition-colors shrink-0" />
                <span className="group-hover:text-black dark:group-hover:text-zinc-100 transition-colors whitespace-pre-line">
                  {dict?.address || (isRtl ? 'طريق العليا - حي العليا،\nالرياض، المملكة العربية السعودية.' : 'Olaya Street - Olaya District,\nRiyadh, Saudi Arabia.')}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Di-Wrapp */}
          <div>
            <h4 className="text-black dark:text-zinc-100 font-bold text-[14.5px] mb-6">
              {dict?.columns?.diWrapp || 'Di-Wrapp'}
            </h4>
            <ul className="space-y-3.5 text-[13.5px] font-medium text-[#64748b] dark:text-zinc-400">
              {diWrappLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-[#1665ff] dark:hover:text-blue-500 hover:underline underline-offset-4 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-black dark:text-zinc-100 font-bold text-[14.5px] mb-6">
              {dict?.columns?.support || 'Support'}
            </h4>
            <ul className="space-y-3.5 text-[13.5px] font-medium text-[#64748b] dark:text-zinc-400">
              {supportLinks.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="hover:text-[#1665ff] dark:hover:text-blue-500 hover:underline underline-offset-4 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Join In */}
          <div>
            <h4 className="text-black dark:text-zinc-100 font-bold text-[14.5px] mb-6">
              {dict?.columns?.joinIn || 'Join In'}
            </h4>
            <ul className="space-y-3.5 text-[13.5px] font-medium text-[#64748b] dark:text-zinc-400">
              {joinInLinks.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="hover:text-[#1665ff] dark:hover:text-blue-500 hover:underline underline-offset-4 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#e2e8f0] dark:border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[13.5px] font-medium text-[#64748b] dark:text-zinc-400 order-3 md:order-1 flex items-center gap-1.5 flex-wrap">
            <span>©{new Date().getFullYear()}</span>
            <span className="font-bold text-black dark:text-zinc-100 inline-block" dir="ltr">Di-Wrapp.</span>
            <span>-</span>
            <span>{dict?.legal?.allRightsReserved || 'All rights reserved'}</span>
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-[13.5px] font-medium text-[#475569] dark:text-zinc-400 order-2">
            <Link href="#" className="hover:text-[#1665ff] dark:hover:text-blue-500 transition-colors">
              {dict?.legal?.terms || 'Terms & Conditions'}
            </Link>
            <Link href="#" className="hover:text-[#1665ff] dark:hover:text-blue-500 transition-colors">
              {dict?.legal?.privacy || 'Privacy Policy'}
            </Link>
            <Link href="#" className="hover:text-[#1665ff] dark:hover:text-blue-500 transition-colors">
              {dict?.legal?.cookies || 'Cookie Policy'}
            </Link>
          </div>

          <div className="flex items-center gap-5 text-[#64748b] dark:text-zinc-500 order-1 md:order-3">
            <Link href="#" aria-label="Facebook" className="hover:text-[#1877F2] hover:-translate-y-0.5 transition-all">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] inline-block">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Link>
            <Link href="#" aria-label="X (Twitter)" className="hover:text-black dark:hover:text-zinc-100 hover:-translate-y-0.5 transition-all">
              <svg viewBox="0 0 1200 1227" fill="currentColor" className="w-[16px] h-[16px] inline-block">
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
              </svg>
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-[#E1306C] hover:-translate-y-0.5 transition-all">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] inline-block">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-[#0A66C2] hover:-translate-y-0.5 transition-all">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] inline-block">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
