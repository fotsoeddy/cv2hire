export interface JobSkill {
  id: string;
  name: string;
  skill_level: "beginner" | "intermediate" | "advanced";
  is_required: boolean;
}

export interface JobListItem {
  id: string;
  name: string;
  slug: string;
  seniority_level: string | null;
  experience_level: string;
  interview_difficulty: string | null;
  is_generated: boolean;
  created_at: string;
  total_questions: number;
  estimated_duration_seconds: number | null;
  question_categories: string[];
}

export interface JobDetail extends JobListItem {
  description: string;
  requirements: string;
  seniority_reason: string;
  skills: JobSkill[];
}
