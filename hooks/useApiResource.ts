"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiRequestError } from "@/lib/api/client";

interface ApiResourceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Shared fetch/loading/error state for a GET-style API call. Callers pass
 * an already-memoized `fetcher` (via `useCallback` with their own real
 * deps, e.g. `[id]`) — that identity change is what triggers a re-fetch,
 * so this hook doesn't need its own separate deps array.
 *
 * `enabled` lets callers defer the request (e.g. until a route param is
 * available) without violating the rules of hooks.
 */
export function useApiResource<T>(fetcher: () => Promise<T>, enabled = true) {
  const [state, setState] = useState<ApiResourceState<T>>({
    data: null,
    loading: enabled,
    error: null,
  });

  const load = useCallback(() => {
    if (!enabled) return;
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
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
  }, [enabled, fetcher]);

  // Fetch-on-mount/dep-change is the standard "synchronize with an
  // external system" effect React's own docs describe — there's no way
  // to kick off the request without eventually calling setState from
  // inside the effect.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => load(), [load]);

  return { ...state, refetch: load };
}
