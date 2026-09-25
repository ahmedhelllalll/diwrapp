import React from 'react';
import { Sparks } from 'iconoir-react';

interface HeroEyebrowBadgeProps {
  text: string;
}

export default function HeroEyebrowBadge({ text }: HeroEyebrowBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-transparent mb-6">
      <Sparks className="w-4 h-4 text-[#344054] dark:text-neutral-300 stroke-[1.5]" strokeWidth={1.5} />
      <span className="text-[13px] sm:text-[14px] font-medium text-[#344054] dark:text-neutral-200 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] tracking-tight">
        {text}
      </span>
    </div>
  );
}
