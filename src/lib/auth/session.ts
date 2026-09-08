/**
 * ============================================================================
 * ARCHITECTURAL NOTICE:
 *
 * This file handles lightweight session checks on the frontend ONLY, for UX
 * purposes -- such as fast-redirecting to the login page when no session
 * exists or the token appears expired.
 *
 * This check is NOT a substitute for real security or verification.
 * The Backend (ASP.NET Core) is the single source of truth for security
 * verification, signature validation, and role/permission checks.
 * ============================================================================
 */

/**
 * Standard JWT Payload structure for lightweight client-side inspection.
 */
export interface SessionPayload {
  sub?: string;
  exp?: number;
  iat?: number;
  nbf?: number;
  iss?: string;
  aud?: string | string[];
  [key: string]: unknown;
}

/**
 * Decodes a Base64Url string across Node.js, Edge, and Browser environments.
 */
function decodeBase64Url(base64Url: string): string {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }

  // Node.js environment
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }

  // Browser / Edge environment
  const binaryString = atob(base64);
  const bytes = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/**
 * Decodes the payload portion of a JWT string without verifying its cryptographic signature.
 * Verification is strictly the responsibility of the backend.
 *
 * @param token - Raw JWT string
 * @returns Parsed SessionPayload or null if decoding/parsing fails
 */
export function decodeSessionToken<T extends SessionPayload = SessionPayload>(
  token: string
): T | null {
  if (!token || typeof token !== 'string') {
    return null;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  try {
    const jsonString = decodeBase64Url(parts[1]);
    const parsed: unknown = JSON.parse(jsonString);

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as T;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Checks whether a session payload is expired based on its `exp` claim.
 * Returns true if the token is expired or if the exp claim is missing.
 *
 * @param payload - Decoded SessionPayload or null/undefined
 * @returns boolean indicating if the session is expired
 */
export function isSessionExpired(
  payload: SessionPayload | null | undefined
): boolean {
  if (!payload || typeof payload.exp !== 'number') {
    return true;
  }

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= currentTimeInSeconds;
}
