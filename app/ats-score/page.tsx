import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import { BarChart3, Upload, CheckCircle2, AlertTriangle } from "lucide-react";

export default function ATSScorePage() {
  return (
    <div className="min-h-screen pattern flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="main-section py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 max-w-6xl mx-auto w-full">
            <div className="flex-1 text-center lg:text-left">
              <div className="px-4 py-1.5 rounded-full bg-primary-200/10 text-primary-200 text-sm font-medium w-fit mx-auto lg:mx-0 mb-6">
                ATS Matching
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Check your <span className="text-gradient">ATS Score</span>
              </h1>
              <p className="text-lg text-light-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Most resumes are rejected by bots before a human ever sees them. Instantly check if your resume can pass the Applicant Tracking System.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/auth/sign-up" className="btn-primary px-8 py-3 flex items-center justify-center gap-2">
                  <Upload className="size-4" />
                  Scan My Resume
                </Link>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden card-border border border-white/10">
                <div className="absolute inset-0 bg-black/20 z-0" />
                <Image
                  src="/images/resume-scan-2.gif"
                  alt="ATS Scoring Animation"
                  fill
                  className="object-cover relative z-0"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="main-section py-12 pb-24 border-t border-white/5 bg-black/20">
          <div className="max-w-4xl mx-auto w-full text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What we check for</h2>
            <p className="text-light-400">Our scanning algorithm mimics the exact parameters used by Taleo, Workday, and Greenhouse.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            <div className="card p-6 flex items-start gap-4 border border-white/5">
              <div className="mt-1"><CheckCircle2 className="size-6 text-primary-200" /></div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Keyword Density</h3>
                <p className="text-light-400 text-sm">We analyze the job description and ensure you have the exact required skills.</p>
              </div>
            </div>
            <div className="card p-6 flex items-start gap-4 border border-white/5">
              <div className="mt-1"><AlertTriangle className="size-6 text-yellow-500" /></div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Formatting Issues</h3>
                <p className="text-light-400 text-sm">We detect complex layouts, images, and tables that break ATS parsing.</p>
              </div>
            </div>
            <div className="card p-6 flex items-start gap-4 border border-white/5">
              <div className="mt-1"><CheckCircle2 className="size-6 text-primary-200" /></div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Action Verbs</h3>
                <p className="text-light-400 text-sm">We check if you start bullet points with strong, impactful action verbs.</p>
              </div>
            </div>
            <div className="card p-6 flex items-start gap-4 border border-white/5">
              <div className="mt-1"><BarChart3 className="size-6 text-primary-200" /></div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Measurable Results</h3>
                <p className="text-light-400 text-sm">We score you based on how many metrics and numbers you use in your experience.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
