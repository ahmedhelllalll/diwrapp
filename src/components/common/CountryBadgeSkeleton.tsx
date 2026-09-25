import React from 'react';

export function CountryBadgeSkeleton({ className }: { className?: string }) {
  return (
    <sup
      className={className || "text-[10px] font-bold ml-0.5 inline-block min-w-[14px] h-[10px] opacity-0 select-none pointer-events-none"}
      aria-hidden="true"
    >
      &nbsp;
    </sup>
  );
}

export default CountryBadgeSkeleton;
