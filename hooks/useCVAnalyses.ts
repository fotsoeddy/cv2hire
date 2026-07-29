"use client";

import { useCallback } from "react";
import { cvApi } from "@/lib/api/cv";
import { useApiResource } from "@/hooks/useApiResource";

export function useCVAnalyses() {
  const fetcher = useCallback(() => cvApi.listAnalyses(), []);
  return useApiResource(fetcher);
}
