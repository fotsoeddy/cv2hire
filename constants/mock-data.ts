import type {
  User,
  CVAnalysis,
  Job,
  Interview,
  InterviewFeedback,
  DashboardStats,
  ActivityItem,
} from "@/types";

// ==========================================
// Current User
// ==========================================
export const mockUser: User = {
  id: "user-1",
  name: "Eddy Johnson",
  email: "eddy@cv2hire.com",
  avatarUrl: "/user-avatar.png",
  credits: 12,
  plan: "pro",
  createdAt: "2025-11-01T10:00:00Z",
};

// ==========================================
// Jobs / Interview Roles
// ==========================================
export const mockJobs: Job[] = [
  {
    id: "job-1",
    role: "Frontend Developer",
    company: "Google",
    level: "Mid",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    description:
      "Build responsive, accessible, and performant web applications using React and Next.js. Collaborate with designers and backend engineers.",
    coverImage: "/covers/amazon.png",
    createdAt: "2025-12-01T10:00:00Z",
  },
  {
    id: "job-2",
    role: "Full Stack Developer",
    company: "Microsoft",
    level: "Senior",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    description:
      "Design and implement full-stack features, mentor junior developers, and ensure code quality through reviews.",
    coverImage: "/covers/facebook.png",
    createdAt: "2025-12-05T10:00:00Z",
  },
  {
    id: "job-3",
    role: "Backend Engineer",
    company: "Spotify",
    level: "Mid",
    type: "Technical",
    techstack: ["Python", "Django", "PostgreSQL", "Docker"],
    description:
      "Build scalable APIs and services, optimize database queries, and maintain CI/CD pipelines.",
    coverImage: "/covers/spotify.png",
    createdAt: "2025-12-10T10:00:00Z",
  },
  {
    id: "job-4",
    role: "Product Manager",
    company: "Adobe",
    level: "Senior",
    type: "Behavioral",
    techstack: ["Figma", "Jira", "SQL"],
    description:
      "Define product strategy and roadmap, work cross-functionally with engineering and design teams.",
    coverImage: "/covers/adobe.png",
    createdAt: "2025-12-15T10:00:00Z",
  },
  {
    id: "job-5",
    role: "DevOps Engineer",
    company: "Reddit",
    level: "Mid",
    type: "Technical",
    techstack: ["AWS", "Docker", "Kubernetes", "Terraform"],
    description:
      "Manage cloud infrastructure, automate deployments, and ensure system reliability.",
    coverImage: "/covers/reddit.png",
    createdAt: "2025-12-20T10:00:00Z",
  },
  {
    id: "job-6",
    role: "Data Scientist",
    company: "Pinterest",
    level: "Junior",
    type: "Mixed",
    techstack: ["Python", "TensorFlow", "SQL", "Pandas"],
    description:
      "Analyze large datasets, build predictive models, and present insights to stakeholders.",
    coverImage: "/covers/pinterest.png",
    createdAt: "2025-12-25T10:00:00Z",
  },
];

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
// Interviews
// ==========================================
export const mockInterviews: Interview[] = [
  {
    id: "int-1",
    jobId: "job-1",
    userId: "user-1",
    questions: [
      "Can you explain the difference between server-side rendering and client-side rendering in Next.js?",
      "How do you manage state in a large React application?",
      "Describe a challenging frontend performance issue you solved.",
      "How would you implement an accessible form with validation?",
      "What's your experience with design systems and component libraries?",
    ],
    status: "completed",
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "int-2",
    jobId: "job-2",
    userId: "user-1",
    questions: [
      "Tell me about your experience building RESTful APIs.",
      "How do you handle database migrations in a production environment?",
      "Describe a time you had to mentor a junior developer.",
      "How would you design a scalable notification system?",
    ],
    status: "completed",
    createdAt: "2026-02-10T14:00:00Z",
  },
  {
    id: "int-3",
    jobId: "job-3",
    userId: "user-1",
    questions: [
      "Explain how you would design a rate limiting system.",
      "What is your approach to writing testable code in Python?",
      "How do you optimize slow database queries?",
    ],
    status: "pending",
    createdAt: "2026-03-01T09:00:00Z",
  },
];

// ==========================================
// Interview Feedback
// ==========================================
export const mockInterviewFeedback: InterviewFeedback[] = [
  {
    id: "fb-1",
    interviewId: "int-1",
    jobId: "job-1",
    userId: "user-1",
    totalScore: 78,
    categoryScores: [
      { name: "Communication Skills", score: 82, comment: "Articulate and structured responses. Clear explanations of technical concepts." },
      { name: "Technical Knowledge", score: 85, comment: "Demonstrated excellent understanding of React, Next.js, and frontend architecture patterns." },
      { name: "Problem Solving", score: 72, comment: "Good analytical approach but could provide more systematic breakdown of solutions." },
      { name: "Cultural Fit", score: 80, comment: "Showed strong alignment with collaborative environments and continuous learning." },
      { name: "Confidence and Clarity", score: 71, comment: "Generally confident but hesitated on some advanced questions about performance optimization." },
    ],
    strengths: [
      "Strong understanding of React and Next.js ecosystems",
      "Clear communication of technical decisions",
      "Good examples from real-world projects",
    ],
    areasForImprovement: [
      "Provide more quantitative metrics when discussing past achievements",
      "Practice explaining system design decisions under time pressure",
      "Deepen knowledge of web performance optimization techniques",
    ],
    finalAssessment:
      "The candidate demonstrated a solid understanding of frontend development with React and Next.js. Their communication skills are above average, and they provided relevant real-world examples. To improve, the candidate should focus on quantifying their impact and practicing more complex system design scenarios.",
    createdAt: "2026-01-15T11:00:00Z",
  },
  {
    id: "fb-2",
    interviewId: "int-2",
    jobId: "job-2",
    userId: "user-1",
    totalScore: 65,
    categoryScores: [
      { name: "Communication Skills", score: 70, comment: "Adequate communication but could be more concise in explanations." },
      { name: "Technical Knowledge", score: 60, comment: "Moderate understanding of full-stack concepts. Stronger on frontend than backend." },
      { name: "Problem Solving", score: 65, comment: "Identified problems well but struggled with optimizing proposed solutions." },
      { name: "Cultural Fit", score: 72, comment: "Positive attitude and willingness to learn new technologies." },
      { name: "Confidence and Clarity", score: 58, comment: "Noticeable hesitation on backend-specific questions about database design." },
    ],
    strengths: [
      "Honest about areas where knowledge gaps exist",
      "Strong React and frontend experience",
      "Good team player mentality",
    ],
    areasForImprovement: [
      "Deepen backend knowledge, especially around database design and API security",
      "Practice system design interviews for distributed systems",
      "Improve confidence when discussing unfamiliar technologies",
      "Study common design patterns for scalable applications",
    ],
    finalAssessment:
      "The candidate has a strong frontend foundation but needs to significantly improve their backend expertise for a Full Stack Developer role. They showed a growth mindset and willingness to learn, but would benefit from focused study on database design, API architecture, and system scalability.",
    createdAt: "2026-02-10T15:30:00Z",
  },
];

// ==========================================
// Dashboard Stats
// ==========================================
export const mockDashboardStats: DashboardStats = {
  totalCVAnalyses: 2,
  totalInterviews: 3,
  averageCVScore: 74,
  averageInterviewScore: 72,
  credits: 12,
};

// ==========================================
// Recent Activity
// ==========================================
export const mockRecentActivity: ActivityItem[] = [
  {
    id: "act-1",
    type: "cv_analysis",
    title: "CV Analysis — Frontend Developer",
    subtitle: "Google",
    score: 82,
    createdAt: "2026-01-10T14:30:00Z",
  },
  {
    id: "act-2",
    type: "interview",
    title: "Mock Interview — Frontend Developer",
    subtitle: "Google",
    score: 78,
    createdAt: "2026-01-15T11:00:00Z",
  },
  {
    id: "act-3",
    type: "cv_analysis",
    title: "CV Analysis — Backend Engineer",
    subtitle: "Spotify",
    score: 65,
    createdAt: "2026-02-05T09:15:00Z",
  },
  {
    id: "act-4",
    type: "interview",
    title: "Mock Interview — Full Stack Developer",
    subtitle: "Microsoft",
    score: 65,
    createdAt: "2026-02-10T15:30:00Z",
  },
];

// ==========================================
// Mock Transcript (for interview session)
// ==========================================
export const mockTranscript = [
  { role: "assistant" as const, content: "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience. Let's start — can you tell me about yourself?" },
  { role: "user" as const, content: "Hi! Thank you for having me. I'm a frontend developer with 4 years of experience, primarily working with React and TypeScript. I've been building web applications and recently got into Next.js." },
  { role: "assistant" as const, content: "That's great to hear! Can you explain the difference between server-side rendering and client-side rendering in Next.js?" },
  { role: "user" as const, content: "Sure. Server-side rendering generates the HTML on the server for each request, which is great for SEO and initial load time. Client-side rendering generates the page in the browser, which can be faster for subsequent navigation but has a slower initial load." },
  { role: "assistant" as const, content: "Excellent explanation. Now, how do you typically manage state in a large React application?" },
  { role: "user" as const, content: "For global state I usually use Zustand or Redux Toolkit. For server state, I prefer React Query. And for local component state, I use React's built-in useState and useReducer hooks." },
];
