import React from 'react';
import { headers } from 'next/headers';
import { getCountryCode } from '@/lib/geo';
export { CountryBadgeSkeleton } from './CountryBadgeSkeleton';

export async function CountryBadge({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const headerList = await headers();
  const countryCode = getCountryCode(headerList);

  return (
    <sup
      className={
        className ||
        "font-['Lufga',sans-serif] font-normal text-[10px] leading-[20px] tracking-normal text-center text-[#64748b] dark:text-neutral-400 lowercase select-none ml-0.5"
      }
      style={{
        fontFamily: "'Lufga', sans-serif",
        fontWeight: 400,
        fontStyle: 'normal',
        fontSize: '10px',
        lineHeight: '20px',
        letterSpacing: '0%',
        textAlign: 'center',
        ...style,
      }}
    >
      {countryCode.toLowerCase()}
    </sup>
  );
}

export default CountryBadge;
