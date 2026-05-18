import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { FileText, Mic, BarChart3, Zap, CheckCircle, ArrowRight } from "lucide-react";

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
          <div className="flex gap-4 mt-4">
            <Link href="/auth/sign-up" className="btn-primary text-base px-8 py-3">
              Get Started Free
            </Link>
            <Link href="#features" className="btn-ghost text-base px-8 py-3">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {features.map((f) => (
            <div key={f.title} className="card p-6 rounded-2xl flex flex-col gap-4">
              <div className="size-12 rounded-xl primary-gradient flex-center">
                <f.icon className="size-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm text-light-400">{f.description}</p>
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

      {/* CTA */}
      <section className="main-section py-20 pb-32">
        <div className="card-cta w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 px-12 py-10">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to Get Hired?
            </h2>
            <p className="text-light-100">
              Start your free trial today. No credit card required.
            </p>
          </div>
          <Link href="/auth/sign-up" className="btn-primary text-base px-8 py-3 flex items-center gap-2">
            Start Now <ArrowRight className="size-4" />
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
