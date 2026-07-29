import type { CVAnalysis } from "@/types";

// ==========================================
// CV Analyses
// ==========================================
export const mockCVAnalyses: CVAnalysis[] = [
  {
    id: "cv-1",
    userId: "user-1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    fileName: "eddy_johnson_resume.pdf",
    imagePath: "/images/resume_01.png",
    feedback: {
      overallScore: 82,
      ATS: {
        score: 88,
        tips: [
          { type: "good", tip: "Proper use of keywords matching the job description" },
          { type: "good", tip: "Clean formatting that ATS systems can parse" },
          { type: "improve", tip: "Add more measurable achievements with numbers" },
          { type: "improve", tip: "Include relevant certifications section" },
        ],
      },
      toneAndStyle: {
        score: 85,
        tips: [
          { type: "good", tip: "Professional Tone", explanation: "Your resume maintains a professional and confident tone throughout, which is appropriate for a senior-level position." },
          { type: "good", tip: "Action Verbs", explanation: "You effectively use strong action verbs like 'Architected', 'Implemented', and 'Led' to describe your accomplishments." },
          { type: "improve", tip: "Consistency", explanation: "Some bullet points use past tense while others use present tense. Standardize to past tense for previous roles." },
        ],
      },
      content: {
        score: 78,
        tips: [
          { type: "good", tip: "Relevant Experience", explanation: "Your work experience is highly relevant to the Frontend Developer position and demonstrates progressive career growth." },
          { type: "improve", tip: "Quantify Impact", explanation: "Add specific metrics to your achievements. For example, 'Improved page load time by 40%' instead of 'Improved page performance'." },
          { type: "improve", tip: "Missing Projects", explanation: "Consider adding a dedicated projects section showcasing personal or open-source contributions." },
        ],
      },
      structure: {
        score: 90,
        tips: [
          { type: "good", tip: "Logical Flow", explanation: "The resume follows a clear, logical flow — summary, experience, skills, education — which is the industry standard." },
          { type: "good", tip: "Readable Layout", explanation: "Good use of white space, clear section headers, and consistent formatting make the resume easy to scan." },
          { type: "improve", tip: "Skills Section", explanation: "Consider organizing your skills into categories (Frontend, Backend, Tools) for better scannability." },
        ],
      },
      skills: {
        score: 80,
        tips: [
          { type: "good", tip: "Core Skills Listed", explanation: "React, TypeScript, and Next.js are prominently featured, matching the job requirements." },
          { type: "improve", tip: "Missing Skills", explanation: "The job description mentions testing frameworks (Jest, Cypress). Add relevant testing experience." },
          { type: "improve", tip: "Soft Skills", explanation: "Consider briefly mentioning collaboration and communication skills, especially for a team-oriented role." },
        ],
      },
    },
    createdAt: "2026-01-10T14:30:00Z",
  },
  {
    id: "cv-2",
    userId: "user-1",
    companyName: "Spotify",
    jobTitle: "Backend Engineer",
    fileName: "eddy_backend_resume.pdf",
    imagePath: "/images/resume_02.png",
    feedback: {
      overallScore: 65,
      ATS: {
        score: 60,
        tips: [
          { type: "improve", tip: "Resume uses fancy formatting that ATS may not parse" },
          { type: "improve", tip: "Missing key backend-specific terminology" },
          { type: "good", tip: "Contact information is properly placed at the top" },
        ],
      },
      toneAndStyle: {
        score: 70,
        tips: [
          { type: "good", tip: "Clear Language", explanation: "The language is clear and easy to read." },
          { type: "improve", tip: "Too Casual", explanation: "Some sections use overly casual language. Replace 'handled' with 'managed' or 'orchestrated'." },
        ],
      },
      content: {
        score: 62,
        tips: [
          { type: "improve", tip: "Misaligned Focus", explanation: "The resume emphasizes frontend skills while applying for a backend role. Reframe experience around API design, data storage, and system architecture." },
          { type: "improve", tip: "No System Design", explanation: "For a mid-level backend role, include examples of system design decisions or architecture contributions." },
        ],
      },
      structure: {
        score: 68,
        tips: [
          { type: "good", tip: "Standard Layout", explanation: "Uses a conventional resume structure that's easy to follow." },
          { type: "improve", tip: "Too Long", explanation: "The resume is 3 pages. Condense to 1-2 pages for best results." },
        ],
      },
      skills: {
        score: 55,
        tips: [
          { type: "improve", tip: "Skills Mismatch", explanation: "Python, Django, and PostgreSQL are not prominently featured but are critical for this role. Move them to the top of your skills section." },
          { type: "improve", tip: "No Infrastructure", explanation: "The job requires Docker and CI/CD experience. Add these skills if applicable." },
        ],
      },
    },
    createdAt: "2026-02-05T09:15:00Z",
  },
];

// ==========================================
// CV History
// ==========================================
interface MockCVHistoryEntry extends Omit<Partial<CVAnalysis>, "feedback"> {
  feedback?: { overallScore: number };
}

export const mockCVHistory: MockCVHistoryEntry[] = [
  {
    id: "cv-1",
    fileName: "Senior_Frontend_Dev_2026.pdf",
    jobTitle: "Senior Frontend Developer",
    companyName: "Google",
    createdAt: "2026-05-10T14:30:00Z",
    feedback: { overallScore: 82 },
  },
  {
    id: "cv-2",
    fileName: "Resume_Product_Manager.pdf",
    jobTitle: "Product Manager",
    companyName: "Meta",
    createdAt: "2026-05-12T09:15:00Z",
    feedback: { overallScore: 74 },
  },
  {
    id: "cv-3",
    fileName: "Backend_Engineer_Spotify.pdf",
    jobTitle: "Backend Engineer",
    companyName: "Spotify",
    createdAt: "2026-05-15T16:45:00Z",
    feedback: { overallScore: 88 },
  },
];
