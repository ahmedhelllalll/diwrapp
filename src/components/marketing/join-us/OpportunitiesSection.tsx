import React from 'react';
import Link from 'next/link';
import { Arcade, AppleImac2021, UserStar, Computer } from 'iconoir-react';

interface OpportunitiesSectionProps {
  lang: string;
  titleLine1?: string;
  titleLine2?: string;
  cards?: {
    activation?: string;
    displays?: string;
    influencers?: string;
    digital?: string;
  };
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function OpportunitiesSection({
  lang,
  titleLine1 = 'Every Advertising Opportunity,',
  titleLine2 = 'One Digital Platform',
  cards = {
    activation: 'Activation Spaces',
    displays: 'Advertising Displays',
    influencers: 'Influencers',
    digital: 'Digital Channels',
  },
  description = 'Di_Wrapp simplifies operations, automates scheduling, and maximizes monetization — all while giving media owners complete visibility and control over their media assets.',
  ctaText = 'Book A Demo',
  ctaHref,
}: OpportunitiesSectionProps) {
  const targetHref = ctaHref || `/${lang}/contact`;

  const categoryCards = [
    {
      id: 'activation',
      label: cards?.activation || 'Activation Spaces',
      Icon: Arcade,
    },
    {
      id: 'displays',
      label: cards?.displays || 'Advertising Displays',
      Icon: AppleImac2021,
    },
    {
      id: 'influencers',
      label: cards?.influencers || 'Influencers',
      Icon: UserStar,
    },
    {
      id: 'digital',
      label: cards?.digital || 'Digital Channels',
      Icon: Computer,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#080808] transition-colors duration-300 py-16 md:py-20">
      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6 text-center">
        {/* Top Heading H2 */}
        <h2 className="text-[22px] sm:text-[24px] font-medium leading-[32px] tracking-[-0.01em] text-center text-[#101828] dark:text-white font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
          {titleLine1}
          {titleLine2 && (
            <>
              <br />
              {titleLine2}
            </>
          )}
        </h2>

        {/* 4 Interactive Category Cards with Confined Background Grid */}
        <div className="relative max-w-[1100px] mx-auto mt-10">
          {/* Confined Background Grid - Light Mode */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1140px] h-[260px] pointer-events-none select-none z-0 dark:hidden"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(16, 24, 40, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 24, 40, 0.06) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              backgroundPosition: 'center center',
              maskImage: 'radial-gradient(ellipse 75% 50% at 50% 50%, #000 70%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 75% 50% at 50% 50%, #000 70%, transparent 100%)',
            }}
            aria-hidden="true"
          />
          {/* Confined Background Grid - Dark Mode */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1140px] h-[260px] pointer-events-none select-none z-0 hidden dark:block"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              backgroundPosition: 'center center',
              maskImage: 'radial-gradient(ellipse 75% 50% at 50% 50%, #000 70%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 75% 50% at 50% 50%, #000 70%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 relative z-10">
            {categoryCards.map(({ id, label, Icon }) => (
              <div
                key={id}
                className="bg-white dark:bg-[#111318] border border-[#EAECF0] dark:border-white/[0.08] rounded-2xl px-6 py-7 flex flex-col items-center justify-center h-[128px] min-h-[120px] gap-3 hover:border-gray-300 hover:dark:border-white/20 hover:shadow-xs transition-all duration-200 cursor-pointer group hover:-translate-y-0.5"
              >
                <Icon
                  className="w-6 h-6 text-[#344054] dark:text-zinc-300 transition-colors group-hover:text-[#0066FF]"
                  strokeWidth={1.5}
                />
                <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[17px] sm:text-[18px] leading-[26px] tracking-normal text-center text-[#101828] dark:text-zinc-100 transition-colors group-hover:text-[#0066FF]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Supporting Description Paragraph (mt-10 mb-8 max-w-[620px]) */}
        <div className="max-w-[620px] mx-auto mt-10 mb-8">
          <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[26px] tracking-normal text-center text-[#637083] dark:text-zinc-400 m-0">
            {description}
          </p>
        </div>

        {/* Call to Action Button (mt-6 px-6 py-2.5 rounded-full text-sm) */}
        <div>
          <Link
            href={targetHref}
            className="inline-flex items-center justify-center bg-[#0066FF] hover:bg-blue-600 text-white font-medium px-6 py-2.5 rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow-blue-500/25 active:scale-[0.98] cursor-pointer"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
