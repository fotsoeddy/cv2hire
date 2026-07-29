import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen pattern flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <div className="page-heading text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, transparent <span className="text-gradient">pricing</span></h1>
          <p className="text-light-400 text-lg">Invest in your career today. Choose the plan that best fits your job search needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Free Plan */}
          <div className="card p-10 rounded-3xl border border-white/10 flex flex-col relative h-full">
            <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold text-white">$0</span>
              <span className="text-light-400">/ forever</span>
            </div>
            <p className="text-light-400 mb-8 border-b border-white/10 pb-8">Perfect for testing the waters and getting basic feedback on your current CV.</p>
            <div className="flex-1 flex flex-col gap-5 mb-10">
              <div className="flex gap-3 items-start"><Check className="size-5 text-light-400 shrink-0 mt-0.5" /><span className="text-light-100">3 CV ATS Scans</span></div>
              <div className="flex gap-3 items-start"><Check className="size-5 text-light-400 shrink-0 mt-0.5" /><span className="text-light-100">1 Motivation Letter</span></div>
              <div className="flex gap-3 items-start"><Check className="size-5 text-light-400 shrink-0 mt-0.5" /><span className="text-light-100">Basic Feedback</span></div>
            </div>
            <Link href="/auth/sign-up" className="btn-ghost w-full justify-center py-3">Get Started</Link>
          </div>

          {/* Pro Plan */}
          <div className="card p-10 rounded-3xl border border-primary-200/50 bg-primary-200/5 flex flex-col relative h-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-200 text-dark-100 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">Most Popular</div>
            <h3 className="text-2xl font-bold text-primary-200 mb-2">Pro</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold text-white">$15</span>
              <span className="text-light-400">/ month</span>
            </div>
            <p className="text-light-400 mb-8 border-b border-white/10 pb-8">Everything you need to land your dream job faster with unlimited access.</p>
            <div className="flex-1 flex flex-col gap-5 mb-10">
              <div className="flex gap-3 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white">Unlimited CV Generations</span></div>
              <div className="flex gap-3 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white">Unlimited Voice Mock Interviews</span></div>
              <div className="flex gap-3 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white">Advanced AI Recommendations</span></div>
              <div className="flex gap-3 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white">Priority Support</span></div>
            </div>
            <Link href="/auth/sign-up" className="btn-primary w-full justify-center py-3">Upgrade to Pro</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
