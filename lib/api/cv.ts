import { apiRequest } from "@/lib/api/client";
import type { CVAnalysisDetail, CVAnalysisListItem } from "@/types/cv";

export const cvApi = {
  analyze: (data: { resume: File; jobTitle: string; jobDescription: string }) => {
    const formData = new FormData();
    formData.append("resume", data.resume);
    formData.append("job_title", data.jobTitle);
    formData.append("job_description", data.jobDescription);
    return apiRequest<CVAnalysisDetail>("/api/cv/analyze/", {
      method: "POST",
      auth: true,
      body: formData,
    });
  },

  listAnalyses: () => apiRequest<CVAnalysisListItem[]>("/api/cv/analyses/", { auth: true }),

  getAnalysis: (id: string) =>
    apiRequest<CVAnalysisDetail>(`/api/cv/analyses/${id}/`, { auth: true }),
};
