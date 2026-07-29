"use client";

import { useCallback, useState } from "react";
import { interviewsApi } from "@/lib/api/interviews";
import { ApiRequestError } from "@/lib/api/client";
import type { CreateInterviewSessionPayload, InterviewSession } from "@/types/interviews";

export function useCreateInterviewSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSession = useCallback(
    async (payload: CreateInterviewSessionPayload): Promise<InterviewSession | null> => {
      setLoading(true);
      setError(null);
      try {
        const session = await interviewsApi.createSession(payload);
        return session;
      } catch (err) {
        const message =
          err instanceof ApiRequestError ? err.message : "Could not start the interview.";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createSession, loading, error };
}
