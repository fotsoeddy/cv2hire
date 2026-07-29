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
