export type InterviewSessionStatus =
  | "pending"
  | "active"
  | "completed"
  | "cancelled"
  | "failed";

export type InterviewDifficulty = "beginner" | "intermediate" | "senior" | "professional";

export type RecommendedLevel = "entry" | "junior" | "mid" | "senior";

export interface InterviewFeedbackCategory {
  category: string;
  score: number;
  feedback: string;
  recommendation: string;
}

export interface InterviewFeedback {
  overall_score: number;
  technical_score: number;
  communication_score: number;
  confidence_score: number;
  problem_solving_score: number;
  strengths: string[];
  weaknesses: string[];
  improvement_areas: string[];
  final_feedback: string;
  recommended_level: RecommendedLevel;
  passed: boolean;
  categories: InterviewFeedbackCategory[];
}

export interface InterviewSession {
  id: string;
  job: string;
  interview_category: string | null;
  status: InterviewSessionStatus;
  interview_difficulty: InterviewDifficulty | null;
  started_at: string | null;
  ended_at: string | null;
  duration_seconds: number;
  total_questions: number;
  questions_answered: number;
  overall_score: number;
  created_at: string;
  feedback: InterviewFeedback | null;
}

export interface InterviewSessionListItem {
  id: string;
  job: string;
  status: InterviewSessionStatus;
  interview_difficulty: InterviewDifficulty | null;
  overall_score: number;
  created_at: string;
}

export interface CreateInterviewSessionPayload {
  job_id: string;
  interview_category?: string;
  interview_difficulty?: InterviewDifficulty;
  question_count?: number;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  expected_answer: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  times_used: number;
  is_active: boolean;
}

export interface JobQuestions {
  job_id: string;
  job_name: string;
  seniority_level: string;
  questions_count: number;
  questions: InterviewQuestion[];
}
