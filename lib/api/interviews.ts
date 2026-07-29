import { apiRequest } from "@/lib/api/client";
import type {
  CreateInterviewSessionPayload,
  InterviewSession,
  InterviewSessionListItem,
  JobQuestions,
} from "@/types/interviews";

export const interviewsApi = {
  listSessions: () =>
    apiRequest<InterviewSessionListItem[]>("/api/interviews/sessions/", { auth: true }),

  getSession: (id: string) =>
    apiRequest<InterviewSession>(`/api/interviews/sessions/${id}/`, { auth: true }),

  createSession: (payload: CreateInterviewSessionPayload) =>
    apiRequest<InterviewSession>("/api/interviews/sessions/", {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    }),

  getJobQuestions: (jobId: string) =>
    apiRequest<JobQuestions>(`/api/interviews/questions/${jobId}/`, { auth: true }),
};
