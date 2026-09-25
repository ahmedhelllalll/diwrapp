import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export const DEFAULT_COUNTRY_CODE = 'SD';
export const COUNTRY_COOKIE_NAME = 'di_country';

/**
 * Extracts the 2-letter uppercase country code from headers with safe fallback.
 * Deduplicates `headerList.get('x-country-code') || 'SD'` across all server components.
 */
export function getCountryCode(headerList?: Headers | ReadonlyHeaders | null): string {
  if (!headerList) return DEFAULT_COUNTRY_CODE;
  const code = headerList.get('x-country-code');
  return code ? code.trim().toUpperCase() : DEFAULT_COUNTRY_CODE;
}

/**
 * Extracts country code client-side from document.cookie.
 */
export function getClientCountryCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COUNTRY_COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]).trim().toUpperCase() : null;
}
