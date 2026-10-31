"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { makeQueryClient } from "@/lib/query-client";

/**
 * Global TanStack Query provider.
 *
 * Wraps the entire application in a QueryClientProvider so all components
 * can use useQuery, useMutation, etc.
 *
 * ReactQueryDevtools is included in development only (zero bundle impact in production).
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // useState ensures the QueryClient is created once per component lifecycle
  // and is not re-created on every render
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
