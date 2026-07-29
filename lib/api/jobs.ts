import { apiRequest } from "@/lib/api/client";
import type { JobDetail, JobListItem } from "@/types/jobs";

export const jobsApi = {
  list: () => apiRequest<JobListItem[]>("/api/jobs/", { auth: true }),

  get: (id: string) => apiRequest<JobDetail>(`/api/jobs/${id}/`, { auth: true }),
};
