/**
 * ============================================================================
 * ARCHITECTURAL NOTICE:
 *
 * This file handles lightweight request proxying (Next.js 16 proxy convention)
 * including locale negotiation, security headers, and lightweight session checks
 * on the frontend ONLY, for UX purposes -- such as fast-redirecting to the
 * login page when no session exists or the token appears expired.
 *
 * This check is NOT a substitute for real security or verification.
 * The Backend (ASP.NET Core) is the single source of truth for security
 * verification, signature validation, and role/permission checks.
 * ============================================================================
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { decodeSessionToken, isSessionExpired } from '@/lib/auth/session';
import { AUTH_COOKIE_NAME } from '@/lib/auth/config';

/**
 * Extensible list of protected path prefixes (without locale prefix).
 * Currently empty pending implementation of real vendor/advertiser/admin routes.
 *
 * Examples of future paths:
 *   '/dashboard'
 *   '/vendor'
 *   '/advertiser'
 *   '/admin'
 */
export const PROTECTED_PATH_PREFIXES: string[] = [
  // Add protected path prefixes here once endpoints/pages are ready
];

/**
 * Helper to determine if a normalized path matches any protected path prefix.
 */
function isPathProtected(path: string): boolean {
  if (PROTECTED_PATH_PREFIXES.length === 0) {
    return false;
  }

  const normalizedPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;

  return PROTECTED_PATH_PREFIXES.some((prefix) => {
    const normalizedPrefix = prefix.endsWith('/') && prefix.length > 1 ? prefix.slice(0, -1) : prefix;
    return normalizedPath === normalizedPrefix || normalizedPath.startsWith(`${normalizedPrefix}/`);
  });
}

/**
 * Negotiates the preferred locale based on request headers.
 */
function getLocale(request: NextRequest): string {
  try {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-expect-error locales are readonly
    const locales: string[] = i18n.locales;

    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    languages = languages.filter((lang) => lang && lang !== '*');

    if (languages.length === 0) {
      return i18n.defaultLocale;
    }

    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch {
    return i18n.defaultLocale;
  }
}

/**
 * Applies standard security headers to a response.
 */
function applySecurityHeaders(response: NextResponse): void {
  const securityHeaders = [
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  ];

  securityHeaders.forEach(({ key, value }) => {
    response.headers.set(key, value);
  });
}

/**
 * Main request proxy function (Next.js 16 convention replacing middleware).
 */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 1. Locale redirection if missing locale prefix
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const redirectUrl = new URL(
      `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
      request.url
    );
    redirectUrl.search = request.nextUrl.search;

    const response = NextResponse.redirect(redirectUrl);
    applySecurityHeaders(response);
    return response;
  }

  // 2. Extract locale and stripped path for route inspection
  const pathSegments = pathname.split('/');
  const currentLocale = pathSegments[1] || i18n.defaultLocale;
  const strippedPath = '/' + pathSegments.slice(2).join('/');

  // 3. Lightweight route protection check (UX-only)
  if (isPathProtected(strippedPath)) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = token ? decodeSessionToken(token) : null;
    const isExpired = isSessionExpired(session);

    if (!session || isExpired) {
      const loginUrl = new URL(`/${currentLocale}/login`, request.url);
      const response = NextResponse.redirect(loginUrl);
      applySecurityHeaders(response);
      return response;
    }
  }

  // 4. If path is not protected or session is valid, pass through
  const response = NextResponse.next();
  applySecurityHeaders(response);
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf)$).*)',
  ],
};
