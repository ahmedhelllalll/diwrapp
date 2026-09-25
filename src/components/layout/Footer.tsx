import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface FooterDict {
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
    wallet?: string;
    ticket?: string;
    wrappAi?: string;
    faq?: string;
    vendor?: string;
    eBranding?: string;
    getDiWrapped?: string;
    creativePro?: string;
    responsibility?: string;
    resources?: string;
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

export interface FooterProps {
  lang?: string;
  dict?: FooterDict;
}

export default function Footer({ lang = 'en', dict }: FooterProps) {
  const isRtl = lang === 'ar';

  const diWrappLinks = [
    { label: dict?.links?.about || 'About', href: `/${lang}/about` },
    { label: dict?.links?.booking || 'Booking', href: `/${lang}/coming-soon?feature=Booking` },
    { label: dict?.links?.blog || 'Blog', href: `/${lang}/blog` },
    { label: dict?.links?.career || 'Career', href: `/${lang}/coming-soon?feature=Career` },
    { label: dict?.links?.contact || 'Contact', href: `/${lang}/contact` },
    { label: dict?.links?.investors || 'Investors', href: `/${lang}/coming-soon?feature=Investors` },
    { label: dict?.links?.lifeAtDiWrapp || 'Life At Di-Wrapp', href: `/${lang}/culture` },
    { label: dict?.links?.promocodes || 'Promocodes', href: `/${lang}/coming-soon?feature=Promocodes` },
  ];

  const supportLinks = [
    { label: dict?.links?.helpCenter || 'Help Center', href: `/${lang}/coming-soon?feature=Help-Center` },
    { label: dict?.links?.howItWorks || 'How It Works', href: `/${lang}/coming-soon?feature=How-It-Works` },
    { label: dict?.links?.cancellationOption || 'Cancellation Option', href: `/${lang}/coming-soon?feature=Cancellation-Option` },
    { label: dict?.links?.liveChat || 'Live Chat', href: `/${lang}/coming-soon?feature=Live-Chat` },
    { label: dict?.links?.wallet || 'Wallet', href: `/${lang}/wallet` },
    { label: dict?.links?.ticket || 'Ticket', href: `/${lang}/coming-soon?feature=Ticket` },
    { label: dict?.links?.wrappAi || 'Wrapp-AI', href: `/${lang}/ask-di` },
    { label: dict?.links?.faq || 'FAQ', href: `/${lang}#faq` },
  ];

  const joinInLinks = [
    { label: dict?.links?.vendor || 'Vendor', href: `/${lang}/vendor` },
    { label: dict?.links?.eBranding || 'E-Branding', href: `/${lang}/coming-soon?feature=E-Branding` },
    { label: dict?.links?.getDiWrapped || 'Get Di-Wrapped', href: `/${lang}/coming-soon?feature=Get-Di-Wrapped` },
    { label: dict?.links?.creativePro || 'CreativePro', href: `/${lang}/coming-soon?feature=CreativePro` },
    { label: dict?.links?.responsibility || 'Responsibility', href: `/${lang}/coming-soon?feature=Responsibility` },
    { label: dict?.links?.resources || 'Resources', href: `/${lang}/coming-soon?feature=Resources` },
    { label: dict?.links?.documentation || 'Documentation', href: `/${lang}/coming-soon?feature=Documentation` },
    { label: dict?.links?.community || 'Community', href: `/${lang}/coming-soon?feature=Community` },
  ];

  const legalLinks = [
    { label: dict?.legal?.terms || 'Terms & Conditions', href: `/${lang}/coming-soon?feature=Terms-and-Conditions` },
    { label: dict?.legal?.privacy || 'Privacy Policy', href: `/${lang}/coming-soon?feature=Privacy-Policy` },
    { label: dict?.legal?.cookies || 'Cookie Policy', href: `/${lang}/coming-soon?feature=Cookie-Policy` },
  ];

  return (
    <footer className="w-full font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] bg-white dark:bg-[#080808] transition-colors duration-300">
      {/* Top Full Divider Line */}
      <div className="w-full h-[1px] bg-[#EAECF0] dark:bg-neutral-800" />

      {/* Main Inner Constrained Container */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Contact Info (Spans 2 cols on lg) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Brand Logo & Name */}
            <Link 
              href={`/${lang}`} 
              className="inline-flex items-center gap-2.5 select-none group" 
              dir="ltr"
            >
              <div className="w-[34px] h-[34px] flex items-center justify-center shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Di-wrapp Logo" 
                  width={34} 
                  height={34} 
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-bold text-[20px] tracking-tight text-[#0F172A] dark:text-zinc-100 group-hover:text-[#1665ff] dark:group-hover:text-blue-400 transition-colors">
                Di-wrapp
              </span>
            </Link>
            
            {/* Brand Slogan & Subtext */}
            <p className="text-[#475569] dark:text-zinc-400 text-[13.5px] leading-relaxed max-w-[320px] font-normal">
              {dict?.slogan || 'Streamline Your Ads, Amplify Your Reach.'}
              <br />
              {dict?.poweredBy || 'Powered by'}{' '}
              <span className="font-bold text-[#0F172A] dark:text-zinc-100">
                {dict?.groupName || 'Distin-Gui Group.'}
              </span>
            </p>

            {/* Contact Details List */}
            <div className="space-y-3.5 pt-1">
              {/* Phone */}
              <div className="flex items-center gap-3 text-[#475569] dark:text-zinc-400 text-[13.5px] font-normal group">
                <svg 
                  className="w-4 h-4 text-[#475569] dark:text-zinc-400 group-hover:text-[#1665ff] dark:group-hover:text-blue-400 transition-colors shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  viewBox="0 0 24 24"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a 
                  href="tel:+966000000000" 
                  className="group-hover:text-black dark:group-hover:text-zinc-100 transition-colors font-sans"
                  dir="ltr"
                >
                  {dict?.phone || '+966 00 000 0000'}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 text-[#475569] dark:text-zinc-400 text-[13.5px] font-normal group">
                <svg 
                  className="w-4 h-4 text-[#475569] dark:text-zinc-400 group-hover:text-[#1665ff] dark:group-hover:text-blue-400 transition-colors shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <a 
                  href="mailto:info@di-wrapp.com" 
                  className="group-hover:text-black dark:group-hover:text-zinc-100 transition-colors"
                  dir="ltr"
                >
                  {dict?.email || 'info@di-wrapp.com'}
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 text-[#475569] dark:text-zinc-400 text-[13.5px] font-normal leading-relaxed max-w-[280px] group">
                <svg 
                  className="w-4 h-4 text-[#475569] dark:text-zinc-400 group-hover:text-[#1665ff] dark:group-hover:text-blue-400 transition-colors shrink-0 mt-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  viewBox="0 0 24 24"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="group-hover:text-black dark:group-hover:text-zinc-100 transition-colors whitespace-pre-line">
                  {dict?.address || (isRtl ? 'طريق العليا - حي العليا،\nالرياض، المملكة العربية السعودية.' : 'Olaya Street - Olaya District,\nRiyadh, Saudi Arabia.')}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Di-Wrapp Links */}
          <div>
            <h4 className="text-[#0F172A] dark:text-zinc-100 font-bold text-[15px] mb-5 tracking-tight">
              {dict?.columns?.diWrapp || 'Di-Wrapp'}
            </h4>
            <ul className="space-y-3.5 text-[13.5px] font-normal text-[#64748B] dark:text-zinc-400">
              {diWrappLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-[#1665ff] dark:hover:text-blue-400 hover:underline underline-offset-4 transition-all inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div>
            <h4 className="text-[#0F172A] dark:text-zinc-100 font-bold text-[15px] mb-5 tracking-tight">
              {dict?.columns?.support || 'Support'}
            </h4>
            <ul className="space-y-3.5 text-[13.5px] font-normal text-[#64748B] dark:text-zinc-400">
              {supportLinks.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="hover:text-[#1665ff] dark:hover:text-blue-400 hover:underline underline-offset-4 transition-all inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Join In Links */}
          <div>
            <h4 className="text-[#0F172A] dark:text-zinc-100 font-bold text-[15px] mb-5 tracking-tight">
              {dict?.columns?.joinIn || 'Join In'}
            </h4>
            <ul className="space-y-3.5 text-[13.5px] font-normal text-[#64748B] dark:text-zinc-400">
              {joinInLinks.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="hover:text-[#1665ff] dark:hover:text-blue-400 hover:underline underline-offset-4 transition-all inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Horizontal Divider */}
        <div className="w-full h-[1px] bg-[#EAECF0] dark:bg-neutral-800 mt-14 sm:mt-16 mb-8" />

        {/* Bottom Bar: Copyright, Legal Links, Social Icons */}
        <div className="flex flex-col md:grid md:grid-cols-3 items-center gap-6">
          {/* Left: Copyright */}
          <div className="order-3 md:order-1 justify-self-center md:justify-self-start text-[13.5px] font-normal text-[#64748B] dark:text-zinc-400 flex items-center gap-1.5 flex-wrap">
            <span>©2024</span>
            <span className="font-bold text-[#0F172A] dark:text-zinc-100" dir="ltr">Di-Wrapp.</span>
            <span>-</span>
            <span>{dict?.legal?.allRightsReserved || 'All rights reserved'}</span>
          </div>
          
          {/* Center: Legal Links */}
          <div className="order-2 justify-self-center flex flex-wrap justify-center items-center gap-6 sm:gap-7 text-[13.5px] font-normal text-[#475569] dark:text-zinc-400">
            {legalLinks.map((legal, idx) => (
              <Link 
                key={idx}
                href={legal.href} 
                className="hover:text-[#1665ff] dark:hover:text-blue-400 hover:underline underline-offset-4 transition-colors"
              >
                {legal.label}
              </Link>
            ))}
          </div>

          {/* Right: Social Media Icons */}
          <div className="order-1 md:order-3 justify-self-center md:justify-self-end flex items-center gap-4 text-[#64748B] dark:text-zinc-400">
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook" 
              className="hover:text-[#1877F2] hover:-translate-y-0.5 transition-all p-1"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="X (Twitter)" 
              className="hover:text-black dark:hover:text-white hover:-translate-y-0.5 transition-all p-1"
            >
              <svg viewBox="0 0 1200 1227" fill="currentColor" className="w-[15px] h-[15px]">
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="hover:text-[#E1306C] hover:-translate-y-0.5 transition-all p-1"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              className="hover:text-[#0A66C2] hover:-translate-y-0.5 transition-all p-1"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
