"use client";

import { useCallback, useEffect, useRef } from "react";
import { interviewsApi } from "@/lib/api/interviews";
import { useApiResource } from "@/hooks/useApiResource";

const DEFAULT_POLL_INTERVAL_MS = 2000;

/**
 * True once grading has actually finished — status flipping to "completed"
 * is the authoritative signal, but a populated `feedback` is checked too
 * since that's what the UI actually needs to render.
 */
export function isSessionGraded(session: { status?: string; feedback?: unknown } | null | undefined) {
  return session?.status === "completed" || Boolean(session?.feedback);
}

/**
 * Fetches a single interview session. When `pollUntilGraded` is set, keeps
 * re-fetching every few seconds while the session hasn't finished grading
 * yet — grading happens asynchronously, driven by Vapi's `grade_interview`
 * tool call during/after the voice call, not by anything this page does.
 * Polls silently (no loading-state flicker, stale data kept on a transient
 * fetch error) so a fast interval doesn't disturb whatever's on screen.
 */
export function useInterviewSession(
  id: string | undefined,
  pollUntilGraded = false,
  pollIntervalMs = DEFAULT_POLL_INTERVAL_MS
) {
  const fetcher = useCallback(() => interviewsApi.getSession(id as string), [id]);
  const result = useApiResource(fetcher, Boolean(id));
  const { data, refetch } = result;
  const status = data?.status;

  const refetchRef = useRef(refetch);
  useEffect(() => {
    refetchRef.current = refetch;
  });

  useEffect(() => {
    if (!pollUntilGraded) return;
    if (!status || status === "completed" || status === "cancelled" || status === "failed") return;

    const timer = setInterval(() => refetchRef.current({ silent: true }), pollIntervalMs);
    return () => clearInterval(timer);
  }, [pollUntilGraded, status, pollIntervalMs]);

  return result;
}
