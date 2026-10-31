import { QueryClient } from "@tanstack/react-query";

/**
 * Creates a new QueryClient instance with sensible defaults.
 *
 * Called once per user session on the client.
 * Separate instances are used for server-side rendering via React Query's
 * HydrationBoundary / dehydrate pattern.
 */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 60 seconds after fetching
        staleTime: 60 * 1000,
        // Retry failed requests once before showing an error
        retry: 1,
        // Disable automatic refetch when window gains focus (adjust as needed)
        refetchOnWindowFocus: false,
      },
      mutations: {
        // Retry failed mutations once
        retry: 0,
      },
    },
  });
}
