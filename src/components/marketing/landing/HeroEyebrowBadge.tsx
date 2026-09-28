import React from 'react';
import { Sparks } from 'iconoir-react';
import { Badge } from '@/components/ui/Badge';

interface HeroEyebrowBadgeProps {
  text: string;
}

export default function HeroEyebrowBadge({ text }: HeroEyebrowBadgeProps) {
  return (
    <Badge className="mb-5 sm:mb-6 max-w-[94vw] sm:max-w-none gap-1.5 sm:gap-2">
      <Sparks className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#344054] dark:text-neutral-300 stroke-[1.5] shrink-0" strokeWidth={1.5} />
      <span>{text}</span>
    </Badge>
  );
}
