import { headers } from 'next/headers';
import { getCountryCode } from '@/lib/geo';
export { CountryBadgeSkeleton } from './CountryBadgeSkeleton';

export async function CountryBadge({ className }: { className?: string }) {
  const headerList = await headers();
  const countryCode = getCountryCode(headerList);

  return (
    <sup className={className || "text-[10px] font-bold ml-0.5 text-[#64748b] dark:text-neutral-400 uppercase select-none"}>
      {countryCode}
    </sup>
  );
}

export default CountryBadge;
