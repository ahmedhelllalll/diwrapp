import React from 'react';
import { Sparks } from 'iconoir-react';

interface HeroEyebrowBadgeProps {
  text: string;
}

export default function HeroEyebrowBadge({ text }: HeroEyebrowBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-transparent mb-5 sm:mb-6 max-w-[94vw] sm:max-w-none">
      <Sparks className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#344054] dark:text-neutral-300 stroke-[1.5] shrink-0" strokeWidth={1.5} />
      <span className="text-[11.5px] sm:text-[14px] font-medium text-[#344054] dark:text-neutral-200 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] tracking-tight text-center leading-tight">
        {text}
      </span>
    </div>
  );
}
