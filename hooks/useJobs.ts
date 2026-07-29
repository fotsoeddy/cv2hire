"use client";

import { useCallback } from "react";
import { jobsApi } from "@/lib/api/jobs";
import { useApiResource } from "@/hooks/useApiResource";

export function useJobs() {
  const fetcher = useCallback(() => jobsApi.list(), []);
  return useApiResource(fetcher);
}
