import React from 'react';

export function CountryBadgeSkeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <sup
      className={
        className ||
        "font-['Lufga',sans-serif] font-light text-[10px] leading-[20px] tracking-normal text-center ml-0.5 inline-block min-w-[14px] h-[20px] opacity-0 select-none pointer-events-none"
      }
      style={{
        fontFamily: "'Lufga', sans-serif",
        fontWeight: 300,
        fontStyle: 'normal',
        fontSize: '10px',
        lineHeight: '20px',
        letterSpacing: '0%',
        textAlign: 'center',
        ...style,
      }}
      aria-hidden="true"
    >
      &nbsp;
    </sup>
  );
}

export default CountryBadgeSkeleton;
