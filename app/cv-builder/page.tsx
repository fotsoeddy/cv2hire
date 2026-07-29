import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import { FileText, ArrowRight, Wand2, FileSearch } from "lucide-react";

export default function CVBuilderPage() {
  return (
    <div className="min-h-screen pattern flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="main-section py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto w-full">
            <div className="flex-1 text-center lg:text-left">
              <div className="px-4 py-1.5 rounded-full bg-primary-200/10 text-primary-200 text-sm font-medium w-fit mx-auto lg:mx-0 mb-6">
                CV Builder
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Build a CV that <span className="text-gradient">stands out</span>
              </h1>
              <p className="text-lg text-light-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Stop guessing what recruiters want. Our AI analyzes your experience and rewrites your CV to maximize impact and beat the ATS.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/auth/sign-up" className="btn-primary px-8 py-3">
                  Create Your CV
                </Link>
                <Link href="/ats-score" className="btn-ghost px-8 py-3">
                  Check ATS Score
                </Link>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden card-border border border-white/10">
                <div className="absolute inset-0 bg-black/20 z-0" />
                <Image
                  src="/images/resume-scan.gif"
                  alt="CV Builder AI"
                  fill
                  className="object-cover relative z-0"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="main-section py-12 pb-24 border-t border-white/5 bg-black/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
            <div className="card p-8 flex flex-col items-start border border-white/5">
              <div className="size-12 rounded-xl primary-gradient flex-center mb-6">
                <Wand2 className="size-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Bullet Points</h3>
              <p className="text-light-400 text-sm">Automatically rewrite your responsibilities into powerful, metric-driven achievements.</p>
            </div>
            <div className="card p-8 flex flex-col items-start border border-white/5">
              <div className="size-12 rounded-xl primary-gradient flex-center mb-6">
                <FileSearch className="size-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Job Matching</h3>
              <p className="text-light-400 text-sm">Paste a job description and our AI will highlight missing keywords in your current CV.</p>
            </div>
            <div className="card p-8 flex flex-col items-start border border-white/5">
              <div className="size-12 rounded-xl primary-gradient flex-center mb-6">
                <FileText className="size-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Professional Templates</h3>
              <p className="text-light-400 text-sm">Export to ATS-friendly PDF templates designed by top recruiters.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
