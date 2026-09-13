import React from 'react';
import Image from 'next/image';

interface BentoCardData {
  label?: string;
  stat?: string;
  title?: string;
  description?: string;
}

interface BentoShowcaseSectionProps {
  lang: string;
  card1?: BentoCardData;
  card2?: BentoCardData;
  card3?: BentoCardData;
}

export default function BentoShowcaseSection({
  lang,
  card1 = {
    label: 'Higher Occupancy',
    stat: '24/7',
    title: 'Sell Your Inventory Around The Clock',
    description:
      'Turn your advertising assets into a continuously bookable digital marketplace with real-time availability and automated reservations.',
  },
  card2 = {
    label: 'Real-Time Management',
    stat: 'Live',
    title: 'Inventory Always Available',
    description:
      'Pricing, availability, scheduling, and bookings update instantly across your entire media network.',
  },
  card3 = {
    label: 'Automation First',
    stat: '100%',
    title: 'Digital Booking Workflow',
    description:
      'Reduce manual quotations, approvals, and bookings management through automated workflows.',
  },
}: BentoShowcaseSectionProps) {
  return (
    <section className="relative w-full bg-white dark:bg-[#080808] transition-colors duration-300 py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* 2-Row Structural Architecture */}
        <div className="flex flex-col gap-6">
          {/* Row 1 (Top Row — 2 Equal Columns): Card 1 (Left) & Card 2 (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-0">
            {/* Card 1 (Top Left): Higher Occupancy */}
            <div className="bg-[#F8F9FA] dark:bg-[#111318] border border-[#EAECF0] dark:border-white/[0.08] rounded-[24px] p-8 lg:p-10 flex flex-col justify-between min-h-[220px] hover:border-gray-300 hover:dark:border-white/20 hover:shadow-xs transition-all duration-200">
              <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium leading-[20px] text-[#101828] dark:text-zinc-200">
                {card1.label}
              </span>

              <div className="mt-8">
                <div className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[48px] leading-[44px] tracking-[-0.01em] text-[#0066FF] mt-6 mb-3">
                  {card1.stat}
                </div>
                <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-semibold text-[18px] leading-[26px] text-[#101828] dark:text-white mb-2">
                  {card1.title}
                </h3>
                <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[22px] text-[#637083] dark:text-zinc-400 m-0">
                  {card1.description}
                </p>
              </div>
            </div>

            {/* Card 2 (Top Right): Real-Time Management (Constrained text width max-w-[240px] to prevent laptop overlap) */}
            <div className="bg-[#F8F9FA] dark:bg-[#111318] border border-[#EAECF0] dark:border-white/[0.08] rounded-[24px] p-8 lg:p-10 flex flex-col justify-between min-h-[220px] relative overflow-hidden md:overflow-visible hover:border-gray-300 hover:dark:border-white/20 hover:shadow-xs transition-all duration-200">
              <div className="max-w-[240px] relative z-10">
                <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium leading-[20px] text-[#101828] dark:text-zinc-200 block">
                  {card2.label}
                </span>

                <div className="mt-8">
                  <div className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[48px] leading-[44px] tracking-[-0.01em] text-[#0066FF] mt-6 mb-3">
                    {card2.stat}
                  </div>
                  <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-semibold text-[18px] leading-[26px] text-[#101828] dark:text-white mb-2">
                    {card2.title}
                  </h3>
                  <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[22px] text-[#637083] dark:text-zinc-400 m-0">
                    {card2.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 (Bottom Row — Full Width Card with overflow-visible Stacking): Card 3 & Upward-Breaking Laptop */}
          <div className="w-full bg-[#F8F9FA] dark:bg-[#111318] border border-[#EAECF0] dark:border-white/[0.08] rounded-[24px] p-8 lg:p-10 relative overflow-visible flex flex-col justify-between min-h-[260px] hover:border-gray-300 hover:dark:border-white/20 hover:shadow-xs transition-all duration-200 z-10">
            {/* Card 3 Content (Left Side) */}
            <div className="max-w-[340px] relative z-10">
              <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium leading-[20px] text-[#101828] dark:text-zinc-200 block">
                {card3.label}
              </span>

              <div className="mt-8">
                <div className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[48px] leading-[44px] tracking-[-0.01em] text-[#0066FF] mt-6 mb-3">
                  {card3.stat}
                </div>
                <h3 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-semibold text-[18px] leading-[26px] text-[#101828] dark:text-white mb-2">
                  {card3.title}
                </h3>
                <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[22px] text-[#637083] dark:text-zinc-400 m-0">
                  {card3.description}
                </p>
              </div>
            </div>

            {/* Laptop Image: Scaled down ~8-10%, shifted right, and clipped clean at the bottom */}
            <div className="relative mt-8 md:mt-0 md:absolute md:right-[-8%] lg:right-[-9%] md:bottom-0 pointer-events-none select-none z-20 w-full sm:w-[85%] md:w-[65%] lg:w-[68%] max-w-[720px] rtl:md:right-auto rtl:md:left-[-8%] rtl:lg:left-[-9%]">
              <Image
                src="/assets/join-laptop.png"
                alt="Di-wrapp Platform on Laptop"
                width={1100}
                height={850}
                priority
                style={{ clipPath: 'polygon(0px 0px, 100% 0px, 100% 95%, 0px 95%)' }}
                className="w-full h-auto object-contain drop-shadow-2xl translate-y-3 md:translate-y-5 lg:translate-y-6 translate-x-6 md:translate-x-14 lg:translate-x-20 rtl:translate-x-0 rtl:md:-translate-x-14 rtl:lg:-translate-x-20 transition-transform duration-500 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
