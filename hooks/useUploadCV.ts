"use client";

import { useCallback, useState } from "react";
import { cvApi } from "@/lib/api/cv";
import { ApiRequestError } from "@/lib/api/client";
import type { CVAnalysisDetail } from "@/types/cv";

export function useUploadCV() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (data: {
      resume: File;
      jobTitle: string;
      jobDescription: string;
    }): Promise<CVAnalysisDetail | null> => {
      setLoading(true);
      setError(null);
      try {
        return await cvApi.analyze(data);
      } catch (err) {
        const message =
          err instanceof ApiRequestError ? err.message : "Could not analyze this resume.";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { upload, loading, error };
}
