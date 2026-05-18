// ==========================================
// User
// ==========================================
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  credits: number;
  plan: "free" | "pro" | "enterprise";
  createdAt: string;
}

// ==========================================
// CV / Resume Analysis
// ==========================================
export interface CVTip {
  type: "good" | "improve";
  tip: string;
  explanation?: string;
}

export interface CVCategory {
  score: number;
  tips: CVTip[];
}

export interface CVFeedback {
  overallScore: number;
  ATS: { score: number; tips: CVTip[] };
  toneAndStyle: CVCategory;
  content: CVCategory;
  structure: CVCategory;
  skills: CVCategory;
}

export interface CVAnalysis {
  id: string;
  userId: string;
  companyName?: string;
  jobTitle?: string;
  jobDescription?: string;
  fileName: string;
  imagePath: string;
  feedback: CVFeedback;
  createdAt: string;
}

// ==========================================
// Jobs
// ==========================================
export interface Job {
  id: string;
  role: string;
  company: string;
  level: "Junior" | "Mid" | "Senior" | "Lead";
  type: "Technical" | "Behavioral" | "Mixed";
  techstack: string[];
  description: string;
  coverImage: string;
  createdAt: string;
}

// ==========================================
// Interviews
// ==========================================
export interface Interview {
  id: string;
  jobId: string;
  userId: string;
  questions: string[];
  status: "pending" | "in_progress" | "completed";
  createdAt: string;
}

export interface InterviewCategoryScore {
  name: string;
  score: number;
  comment: string;
}

export interface InterviewFeedback {
  id: string;
  interviewId: string;
  jobId: string;
  userId: string;
  totalScore: number;
  categoryScores: InterviewCategoryScore[];
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

// ==========================================
// Dashboard
// ==========================================
export interface DashboardStats {
  totalCVAnalyses: number;
  totalInterviews: number;
  averageCVScore: number;
  averageInterviewScore: number;
  credits: number;
}

export interface ActivityItem {
  id: string;
  type: "cv_analysis" | "interview";
  title: string;
  subtitle: string;
  score?: number;
  createdAt: string;
}

// ==========================================
// Navigation
// ==========================================
export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

// ==========================================
// Tech icons
// ==========================================
export interface TechIcon {
  tech: string;
  url: string;
}
