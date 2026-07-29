"use client";

import { useCallback, useEffect, useRef } from "react";
import { interviewsApi } from "@/lib/api/interviews";
import { useApiResource } from "@/hooks/useApiResource";

const POLL_INTERVAL_MS = 4000;

/**
 * Fetches a single interview session. When `pollUntilGraded` is set, keeps
 * re-fetching every few seconds while the session hasn't finished grading
 * yet — grading happens asynchronously, driven by Vapi's `grade_interview`
 * tool call during/after the voice call, not by anything this page does.
 */
export function useInterviewSession(id: string | undefined, pollUntilGraded = false) {
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

    const timer = setInterval(() => refetchRef.current(), POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [pollUntilGraded, status]);

  return result;
}
