import React from 'react';
import { Sparks } from 'iconoir-react';
import { Badge } from '@/components/ui/Badge';

interface HeroEyebrowBadgeProps {
  text: string;
}

export default function HeroEyebrowBadge({ text }: HeroEyebrowBadgeProps) {
  return (
    <Badge variant="outline-sm" className="mb-5 sm:mb-6 max-w-full">
      <Sparks className="w-4 h-4 text-[#344054] dark:text-[#D4D4D8] stroke-[1.5] shrink-0" strokeWidth={1.5} />
      <span>{text}</span>
    </Badge>
  );
}
