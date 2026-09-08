/**
 * Common API Types
 * 
 * Generic response and error types for backend interactions.
 * No specific endpoint shapes are defined here yet, pending backend completion.
 */

/**
 * Standard backend error structure (ASP.NET Core ProblemDetails or custom API errors).
 */
export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}

/**
 * Generic pagination metadata.
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

/**
 * Generic paginated response wrapper.
 */
export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}
