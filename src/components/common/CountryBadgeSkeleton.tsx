'use client';

import React, { useSyncExternalStore } from 'react';
import { getClientCountryCookie, DEFAULT_COUNTRY_CODE } from '@/lib/geo';

const noopSubscribe = () => () => {};
const getClientSnapshot = () => getClientCountryCookie() || DEFAULT_COUNTRY_CODE;
const getServerSnapshot = () => DEFAULT_COUNTRY_CODE;

export function CountryBadgeSkeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const code = useSyncExternalStore(noopSubscribe, getClientSnapshot, getServerSnapshot);

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
      suppressHydrationWarning
    >
      {code.toLowerCase()}
    </sup>
  );
}

export default CountryBadgeSkeleton;
