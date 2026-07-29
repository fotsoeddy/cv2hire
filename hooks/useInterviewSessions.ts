"use client";

import { useCallback } from "react";
import { interviewsApi } from "@/lib/api/interviews";
import { useApiResource } from "@/hooks/useApiResource";

export function useInterviewSessions() {
  const fetcher = useCallback(() => interviewsApi.listSessions(), []);
  return useApiResource(fetcher);
}
