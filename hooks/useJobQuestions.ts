"use client";

import { useCallback } from "react";
import { interviewsApi } from "@/lib/api/interviews";
import { useApiResource } from "@/hooks/useApiResource";

export function useJobQuestions(jobId: string | undefined) {
  const fetcher = useCallback(() => interviewsApi.getJobQuestions(jobId as string), [jobId]);
  return useApiResource(fetcher, Boolean(jobId));
}
