export type CVAnalysisStatus = "pending" | "completed" | "failed";

export type CVFeedbackCategory =
  | "formatting"
  | "keywords"
  | "experience"
  | "projects"
  | "skills"
  | "education";

export type PriorityLevel = "low" | "medium" | "high";

export type LevelMatchResult =
  | "excellent_match"
  | "good_match"
  | "acceptable_match"
  | "overqualified"
  | "underqualified";

export interface CVAnalysisFeedbackItem {
  id: string;
  category: CVFeedbackCategory;
  score: number;
  feedback: string;
  priority: PriorityLevel;
}

export interface CVImprovementSuggestion {
  id: string;
  section: string;
  original_text: string;
  suggested_text: string;
  reason: string;
  accepted: boolean;
}

export interface CVJobLevelMatch {
  id: string;
  candidate_level: string;
  job_level: string;
  compatibility_score: number;
  match_result: LevelMatchResult;
  reason: string;
  recommendations: string[];
  job: string | null;
}

export interface CVAnalysisDetail {
  id: string;
  cv_document: string;
  job: string | null;
  overall_score: number;
  ats_score: number;
  readability_score: number;
  keyword_match_score: number;
  experience_score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  extracted_data: Record<string, unknown>;
  missing_requirements: { requirement: string; severity: string }[];
  career_level: string;
  career_level_reason: string;
  ai_provider: string;
  processing_time: number;
  status: CVAnalysisStatus;
  created_at: string;
  feedback_items: CVAnalysisFeedbackItem[];
  improvement_suggestions: CVImprovementSuggestion[];
  level_matches: CVJobLevelMatch[];
}

export interface CVAnalysisListItem {
  id: string;
  cv_document: string;
  job: string | null;
  overall_score: number;
  career_level: string;
  status: CVAnalysisStatus;
  created_at: string;
}
