import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-[#e2e8f0] dark:border-zinc-800/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Column 1: Brand & Contact (Span 2 for wider text) */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Di-wrapp Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex items-center">
                <span className="text-[20px] font-bold text-[#0f172a] dark:text-zinc-100 tracking-tight leading-none">Di-wrapp</span>
                <span className="text-[9px] font-bold text-[#64748b] dark:text-zinc-500 ml-0.5 uppercase tracking-wider relative -top-2">SD</span>
              </div>
            </div>
            
            <p className="text-[#475569] dark:text-zinc-400 text-[13.5px] leading-relaxed max-w-[280px] font-medium">
              Streamline Your Ads, Amplify Your Reach.<br/>
              Powered by <span className="font-bold text-black dark:text-zinc-100">Distin-Gui Group.</span>
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-[#475569] dark:text-zinc-400 text-[13px] font-medium group">
                <i className="fa-solid fa-phone mt-0.5 text-[14px] text-[#64748b] dark:text-zinc-500 group-hover:text-[#1665ff] dark:group-hover:text-blue-500 transition-colors"></i>
                <span className="group-hover:text-black dark:group-hover:text-zinc-100 transition-colors">+966 00 000 0000</span>
              </div>
              <div className="flex items-start gap-3 text-[#475569] dark:text-zinc-400 text-[13px] font-medium group">
                <i className="fa-regular fa-envelope mt-0.5 text-[14px] text-[#64748b] dark:text-zinc-500 group-hover:text-[#1665ff] dark:group-hover:text-blue-500 transition-colors"></i>
                <span className="group-hover:text-black dark:group-hover:text-zinc-100 transition-colors">info@di-wrapp.com</span>
              </div>
              <div className="flex items-start gap-3 text-[#475569] dark:text-zinc-400 text-[13px] font-medium leading-relaxed max-w-[240px] group">
                <i className="fa-solid fa-location-dot mt-0.5 text-[14px] text-[#64748b] dark:text-zinc-500 group-hover:text-[#1665ff] dark:group-hover:text-blue-500 transition-colors"></i>
                <span className="group-hover:text-black dark:group-hover:text-zinc-100 transition-colors">Olaya Street - Olaya District,<br/>Riyadh, Saudi Arabia.</span>
              </div>
            </div>
          </div>

          {/* Column 2: Di-Wrapp */}
          <div>
            <h4 className="text-black dark:text-zinc-100 font-bold text-[14.5px] mb-6">Di-Wrapp</h4>
            <ul className="space-y-4 text-[13.5px] font-semibold text-[#64748b] dark:text-zinc-400">
              {['About', 'Booking', 'Blog', 'Career', 'Contact', 'Investors', 'Life At Di-Wrapp', 'Promocodes'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-[#1665ff] dark:hover:text-blue-500 hover:underline underline-offset-4 transition-all">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-black dark:text-zinc-100 font-bold text-[14.5px] mb-6">Support</h4>
            <ul className="space-y-4 text-[13.5px] font-semibold text-[#64748b] dark:text-zinc-400">
              {['Help Center', 'How It Works', 'Cancellation Option', 'Live Chat', 'Collections', 'Ticket', 'Modes', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-[#1665ff] dark:hover:text-blue-500 hover:underline underline-offset-4 transition-all">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Join In */}
          <div>
            <h4 className="text-black dark:text-zinc-100 font-bold text-[14.5px] mb-6">Join In</h4>
            <ul className="space-y-4 text-[13.5px] font-semibold text-[#64748b] dark:text-zinc-400">
              {['Vendor', 'E-Branding', 'Get Di-Wrapped', 'Responsibility', 'Resources', 'Elements', 'Documentation', 'Community'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-[#1665ff] dark:hover:text-blue-500 hover:underline underline-offset-4 transition-all">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#e2e8f0] dark:border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[13.5px] font-medium text-[#64748b] dark:text-zinc-400 order-3 md:order-1">
            ©2024 <span className="font-bold text-black dark:text-zinc-100">Di-Wrapp.</span> - All rights reserved
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-[13.5px] font-bold text-[#475569] dark:text-zinc-400 order-2">
            <Link href="#" className="hover:text-[#1665ff] dark:hover:text-blue-500 transition-colors">Terms & Conditions</Link>
            <Link href="#" className="hover:text-[#1665ff] dark:hover:text-blue-500 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#1665ff] dark:hover:text-blue-500 transition-colors">Cookie Policy</Link>
          </div>

          <div className="flex items-center gap-5 text-[#64748b] dark:text-zinc-500 order-1 md:order-3">
            <Link href="#" className="hover:text-[#1877F2] hover:-translate-y-1 transition-all">
              <i className="fa-brands fa-facebook text-[19px]"></i>
            </Link>
            <Link href="#" className="hover:text-black dark:hover:text-zinc-100 hover:-translate-y-1 transition-all">
              <svg viewBox="0 0 1200 1227" fill="currentColor" className="w-[17px] h-[17px] inline-block mb-0.5">
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-[#E1306C] hover:-translate-y-1 transition-all">
              <i className="fa-brands fa-instagram text-[19px]"></i>
            </Link>
            <Link href="#" className="hover:text-[#0A66C2] hover:-translate-y-1 transition-all">
              <i className="fa-brands fa-linkedin text-[19px]"></i>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
