/**
 * Generic API response wrapper.
 * All backend endpoints return this structure.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data:    T;
}

/**
 * Pagination metadata returned in list endpoints.
 * Used by patient list and appointment list responses.
 */
export interface PaginationMeta {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
}
