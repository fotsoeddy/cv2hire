import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: "10K+", label: "CVs Analyzed" },
  { value: "5K+", label: "Mock Interviews" },
  { value: "92%", label: "Improvement Rate" },
];

export function Hero() {
  return (
    <section className="main-section py-20 relative overflow-hidden">
      {/* Ambient depth — static, decorative only */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[36rem] rounded-full bg-primary-200/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -right-24 size-72 rounded-full bg-primary-200/10 blur-3xl"
      />

      <Reveal className="page-heading relative z-10">
        <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-200/10 border border-primary-200/20 text-primary-200 text-sm font-medium w-fit">
          <Sparkles className="size-3.5" />
          AI-Powered Job Readiness
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-[-0.02em]">
          From <span className="text-gradient">Resume</span> to{" "}
          <span className="text-gradient">Hired</span>
        </h1>
        <p className="text-lg text-light-100 max-w-2xl leading-relaxed">
          Analyze your CV, practice mock interviews, and get AI-powered feedback —
          all in one platform. Land your dream job with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <Link href="/auth/sign-up" className="btn-primary px-8 group">
            Get Started Free
            <ArrowRight className="size-4 ml-1.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
          </Link>
          <Link href="#how-it-works" className="btn-ghost">
            Learn More
          </Link>
        </div>
      </Reveal>

      <Reveal
        delay={120}
        className="relative z-10 flex divide-x divide-white/10 mt-16 w-fit mx-auto"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center px-8 first:pl-0 last:pr-0">
            <p className="text-3xl font-bold text-gradient tabular-nums">{stat.value}</p>
            <p className="text-sm text-light-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
