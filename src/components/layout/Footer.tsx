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
    { label: dict?.legal?.terms || 'Terms & Conditions', href: `/${lang}/terms-and-conditions` },
    { label: dict?.legal?.privacy || 'Privacy Policy', href: `/${lang}/privacy-policy` },
    { label: dict?.legal?.cookies || 'Cookie Policy', href: `/${lang}/cookie-policy` },
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
              <a
                href="https://distin-gui.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#0F172A] dark:text-zinc-100 hover:text-[#1665ff] dark:hover:text-blue-400 transition-colors"
              >
                {dict?.groupName || 'Distin-Gui Group.'}
              </a>
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
            <h3 className="text-[#0F172A] dark:text-zinc-100 font-bold text-[15px] mb-5 tracking-tight">
              {dict?.columns?.diWrapp || 'Di-Wrapp'}
            </h3>
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
            <h3 className="text-[#0F172A] dark:text-zinc-100 font-bold text-[15px] mb-5 tracking-tight">
              {dict?.columns?.support || 'Support'}
            </h3>
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
            <h3 className="text-[#0F172A] dark:text-zinc-100 font-bold text-[15px] mb-5 tracking-tight">
              {dict?.columns?.joinIn || 'Join In'}
            </h3>
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
            <span>©2026</span>
            <span className="font-bold text-[#0F172A] dark:text-zinc-100" dir="ltr">DiWrapp.</span>
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

          {/* Right: Social Media Icons (Hidden until official handles are established) */}
          {/* TODO: Add official social media handles (Facebook, X, Instagram, LinkedIn) once configured */}
          <div className="order-1 md:order-3 justify-self-center md:justify-self-end hidden" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
