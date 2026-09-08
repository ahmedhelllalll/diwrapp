/**
 * Custom API Error class representing failed HTTP requests.
 */
export class ApiError extends Error {
  public readonly status: number;
  public readonly body?: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;

    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Request options for apiClient, extending standard fetch options with an optional auth token.
 */
export interface ApiClientOptions extends Omit<RequestInit, 'body'> {
  token?: string;
  body?: BodyInit | Record<string, unknown> | unknown[] | null;
}

const DEFAULT_BASE_URL = 'http://localhost:5000/api';

/**
 * Generic API client for communicating with the backend (ASP.NET Core).
 *
 * @param path - Relative endpoint path (e.g. "/auth/login" or "users")
 * @param options - Fetch options including optional bearer token and payload
 * @returns Parsed response body typed as T
 * @throws ApiError when the HTTP response status is not in the 200-299 range
 */
export async function apiClient<T = unknown>(
  path: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const { token, headers: customHeaders, body, ...restOptions } = options;

  const baseUrl = (
    process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_BASE_URL
  ).replace(/\/+$/, '');

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = `${baseUrl}${normalizedPath}`;

  const headers = new Headers(customHeaders);

  // Attach authorization header if token provided
  if (token) {
    const authValue = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    headers.set('Authorization', authValue);
  }

  // Handle JSON serialization if body is a plain object or array
  let requestBody: BodyInit | undefined;
  if (body !== undefined && body !== null) {
    const isPlainObjectOrArray =
      typeof body === 'object' &&
      !(body instanceof FormData) &&
      !(body instanceof URLSearchParams) &&
      !(body instanceof Blob) &&
      !(body instanceof ArrayBuffer);

    if (isPlainObjectOrArray) {
      requestBody = JSON.stringify(body);
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
    } else {
      requestBody = body as BodyInit;
    }
  }

  // Set default Accept header if not specified
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  const response = await fetch(fullUrl, {
    ...restOptions,
    headers,
    body: requestBody,
  });

  if (!response.ok) {
    let errorBody: unknown;
    let errorMessage = `HTTP ${response.status} ${response.statusText}`.trim();

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      try {
        errorBody = await response.json();
        if (
          errorBody &&
          typeof errorBody === 'object' &&
          'message' in errorBody &&
          typeof (errorBody as { message: unknown }).message === 'string'
        ) {
          errorMessage = (errorBody as { message: string }).message;
        } else if (
          errorBody &&
          typeof errorBody === 'object' &&
          'title' in errorBody &&
          typeof (errorBody as { title: unknown }).title === 'string'
        ) {
          errorMessage = (errorBody as { title: string }).title;
        }
      } catch {
        // Fallback to default message if JSON parsing fails
      }
    } else {
      try {
        const text = await response.text();
        if (text) {
          errorBody = text;
          errorMessage = text;
        }
      } catch {
        // Fallback to default message
      }
    }

    throw new ApiError(response.status, errorMessage, errorBody);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  const responseContentType = response.headers.get('content-type');
  if (responseContentType && responseContentType.includes('application/json')) {
    return (await response.json()) as T;
  }

  return (await response.text()) as unknown as T;
}
