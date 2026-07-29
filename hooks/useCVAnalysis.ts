"use client";

import { useCallback } from "react";
import { cvApi } from "@/lib/api/cv";
import { useApiResource } from "@/hooks/useApiResource";

export function useCVAnalysis(id: string | undefined) {
  const fetcher = useCallback(() => cvApi.getAnalysis(id as string), [id]);
  return useApiResource(fetcher, Boolean(id));
}
