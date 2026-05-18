import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { FileText, Mic, BarChart3, Zap, CheckCircle, ArrowRight, Briefcase } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI CV Analysis",
    description:
      "Upload your CV and get instant ATS scoring, content feedback, and actionable improvement tips powered by AI.",
  },
  {
    icon: Mic,
    title: "Voice Mock Interviews",
    description:
      "Practice real-time voice interviews with an AI interviewer tailored to your target role and tech stack.",
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description:
      "Track your progress across multiple CV versions and interview attempts to measure improvement.",
  },
  {
    icon: Zap,
    title: "Actionable Feedback",
    description:
      "Get detailed category breakdowns, strengths, areas for improvement, and expert-level recommendations.",
  },
];

const steps = [
  { step: "01", title: "Upload Your CV", desc: "Drop your PDF resume and optionally add a job description to compare against." },
  { step: "02", title: "Get AI Feedback", desc: "Receive ATS scores, tone analysis, content review, and skills matching in seconds." },
  { step: "03", title: "Practice Interviews", desc: "Select a role and start a voice mock interview with our AI interviewer." },
  { step: "04", title: "Land the Job", desc: "Use your feedback to improve and track your progress toward job readiness." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen pattern">
      <Navbar />

      {/* Hero */}
      <section className="main-section py-20">
        <div className="page-heading">
          <div className="px-4 py-1.5 rounded-full bg-primary-200/10 text-primary-200 text-sm font-medium w-fit">
            AI-Powered Job Readiness
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            From <span className="text-gradient">Resume</span> to{" "}
            <span className="text-gradient">Hired</span>
          </h1>
          <p className="text-lg text-light-100 max-w-2xl">
            Analyze your CV, practice mock interviews, and get AI-powered feedback —
            all in one platform. Land your dream job with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            <Link href="/auth/sign-up" className="btn-primary px-8">
              Get Started Free
            </Link>
            <Link href="#how-it-works" className="btn-ghost">
              Learn More
            </Link>
          </div>
        </div>

        {/* Floating stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl">
          {[
            { value: "10K+", label: "CVs Analyzed" },
            { value: "5K+", label: "Mock Interviews" },
            { value: "92%", label: "Improvement Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="text-sm text-light-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="main-section py-20">
        <h2 className="text-center mb-4">Everything You Need</h2>
        <p className="text-center text-light-400 mb-12 max-w-xl">
          One platform combining CV analysis and interview preparation with powerful AI.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
          {features.map((f) => (
            <div key={f.title} className="card p-5 rounded-2xl flex flex-col gap-3">
              <div className="size-10 rounded-xl primary-gradient flex-center">
                <f.icon className="size-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white">{f.title}</h3>
              <p className="text-xs text-light-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="main-section py-20">
        <h2 className="text-center mb-4">How It Works</h2>
        <p className="text-center text-light-400 mb-12 max-w-xl">
          Four simple steps to transform your job search.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full">
          {steps.map((s) => (
            <div key={s.step} className="card p-6 rounded-2xl flex flex-col gap-3 relative">
              <span className="text-5xl font-bold text-primary-200/10">{s.step}</span>
              <h3 className="text-base font-semibold text-white">{s.title}</h3>
              <p className="text-sm text-light-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Roles Section */}
      <section className="main-section py-24 bg-white/[0.02] border-y border-white/5 w-full">
        <div className="max-w-5xl w-full mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold">Recommended <span className="text-gradient">Roles</span></h2>
              <p className="text-light-400 mt-2">Practice for the most in-demand positions in tech</p>
            </div>
            <Link href="/auth/sign-up" className="text-primary-200 hover:underline text-sm font-medium">
              View all roles →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                role: "Frontend Developer",
                company: "Google",
                logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_\"G\"_Logo.svg",
                desc: "Work on world-class user interfaces using React and Next.js.",
                tech: ["React", "Next.js", "Tailwind"]
              },
              {
                role: "Product Manager",
                company: "Meta",
                logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
                desc: "Drive product strategy and execution for global social platforms.",
                tech: ["Agile", "Jira", "Strategy"]
              },
              {
                role: "Backend Engineer",
                company: "Spotify",
                logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
                desc: "Scale high-performance APIs for millions of music lovers.",
                tech: ["Node.js", "Python", "Redis"]
              },
            ].map((job, i) => (
              <div key={i} className="card p-6 border border-white/5 hover:border-primary-200/30 transition-all flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-10 rounded-lg bg-white/5 p-2 flex-center overflow-hidden">
                    <img src={job.logo} alt={job.company} className="size-full object-contain" />
                  </div>
                  <div className="flex gap-1">
                    {job.tech.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-white/5 text-light-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1 text-white">{job.role}</h3>
                <p className="text-xs text-primary-200 mb-3 font-medium">{job.company}</p>
                <p className="text-xs text-light-400 mb-6 leading-relaxed flex-1">
                  {job.desc}
                </p>
                <Link href="/auth/sign-up" className="btn-secondary w-full text-xs py-2 min-h-0">
                  Prepare for this role
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="main-section py-24 w-full">
        <div className="max-w-5xl w-full mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">Success <span className="text-gradient">Stories</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "CV2Hire helped me identify critical gaps in my resume. I landed a Senior Dev role at Spotify in 3 weeks!",
                author: "Sarah J.",
                role: "Senior Software Engineer",
                initial: "S"
              },
              {
                quote: "The mock interview AI is incredibly realistic. It's like talking to a real technical recruiter, but with instant feedback.",
                author: "Michael R.",
                role: "Product Manager",
                initial: "M"
              }
            ].map((t, i) => (
              <div key={i} className="card p-8 text-left relative overflow-hidden">
                <p className="text-lg italic text-light-100 mb-8 font-medium relative z-10">"{t.quote}"</p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="size-10 rounded-full bg-primary-200/20 flex-center text-primary-200 font-bold border border-primary-200/20">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.author}</p>
                    <p className="text-xs text-light-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full mt-20">
        <div className="card-cta flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 p-8 md:p-12 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to land your <span className="text-primary-200">Dream Job?</span>
            </h2>
            <p className="text-light-400 text-lg max-w-xl mx-auto md:mx-0">
              Join 10,000+ professionals using CV2Hire to prepare for their next career move.
            </p>
          </div>
          <Link href="/dashboard" className="btn-primary text-base px-8 py-3 w-full md:w-auto min-h-0">
            Start Now &rarr;
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-light-400">
          © 2026 CV2Hire. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
