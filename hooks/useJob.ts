"use client";

import { useCallback } from "react";
import { jobsApi } from "@/lib/api/jobs";
import { useApiResource } from "@/hooks/useApiResource";

export function useJob(id: string | undefined) {
  const fetcher = useCallback(() => jobsApi.get(id as string), [id]);
  return useApiResource(fetcher, [id], Boolean(id));
}
