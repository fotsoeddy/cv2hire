"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ApiRequestError } from "@/lib/api/client";

interface ApiResourceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Shared fetch/loading/error state for a GET-style API call. `enabled`
 * lets callers defer the request (e.g. until a route param is available)
 * without violating the rules of hooks.
 */
export function useApiResource<T>(
  fetcher: () => Promise<T>,
  deps: unknown[],
  enabled = true
) {
  const [state, setState] = useState<ApiResourceState<T>>({
    data: null,
    loading: enabled,
    error: null,
  });
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const load = useCallback(() => {
    if (!enabled) return;
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcherRef
      .current()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof ApiRequestError ? err.message : "Something went wrong.";
        setState({ data: null, loading: false, error: message });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  useEffect(() => load(), [load]);

  return { ...state, refetch: load };
}
