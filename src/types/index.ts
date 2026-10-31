// ─── App-wide Types ────────────────────────────────────────────────────────────
// Add your shared TypeScript type definitions here.
// Keep model-specific types co-located with their feature folders.

/**
 * Generic API response wrapper.
 * Use this for all API route responses to maintain a consistent shape.
 */
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Generic paginated response.
 */
export type PaginatedData<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
