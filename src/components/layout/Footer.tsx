import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
                <i className="fa-solid fa-phone text-[14px] text-[#64748b] dark:text-zinc-500 group-hover:text-[#1665ff] dark:group-hover:text-blue-500 transition-colors shrink-0"></i>
                <a href="tel:+966000000000" className="group-hover:text-black dark:group-hover:text-zinc-100 transition-colors">
                  <span dir="ltr" className="inline-block font-sans">
                    {dict?.phone || '+966 00 000 0000'}
                  </span>
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#475569] dark:text-zinc-400 text-[13px] font-medium group">
                <i className="fa-regular fa-envelope text-[14px] text-[#64748b] dark:text-zinc-500 group-hover:text-[#1665ff] dark:group-hover:text-blue-500 transition-colors shrink-0"></i>
                <a href="mailto:info@di-wrapp.com" className="group-hover:text-black dark:group-hover:text-zinc-100 transition-colors">
                  <span dir="ltr" className="inline-block font-sans">
                    {dict?.email || 'info@di-wrapp.com'}
                  </span>
                </a>
              </div>
              <div className="flex items-start gap-3 text-[#475569] dark:text-zinc-400 text-[13px] font-medium leading-relaxed max-w-[260px] group">
                <i className="fa-solid fa-location-dot mt-0.5 text-[14px] text-[#64748b] dark:text-zinc-500 group-hover:text-[#1665ff] dark:group-hover:text-blue-500 transition-colors shrink-0"></i>
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
              <i className="fa-brands fa-facebook text-[18px]"></i>
            </Link>
            <Link href="#" aria-label="X (Twitter)" className="hover:text-black dark:hover:text-zinc-100 hover:-translate-y-0.5 transition-all">
              <svg viewBox="0 0 1200 1227" fill="currentColor" className="w-[16px] h-[16px] inline-block">
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
              </svg>
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-[#E1306C] hover:-translate-y-0.5 transition-all">
              <i className="fa-brands fa-instagram text-[18px]"></i>
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-[#0A66C2] hover:-translate-y-0.5 transition-all">
              <i className="fa-brands fa-linkedin text-[18px]"></i>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
