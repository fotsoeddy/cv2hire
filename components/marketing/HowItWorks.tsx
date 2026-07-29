import { UploadCloud, ScanSearch, Mic, ClipboardCheck, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: UploadCloud,
    title: "Upload Your CV",
    desc: "Drop your PDF resume and optionally add a job description to compare against.",
  },
  {
    icon: ScanSearch,
    title: "AI Analyzes Your Resume",
    desc: "Our model scans structure, tone, and keywords to surface an ATS-ready score.",
  },
  {
    icon: Mic,
    title: "Start Your Mock Interview",
    desc: "Select a role and speak live with an AI interviewer tailored to your target job.",
  },
  {
    icon: ClipboardCheck,
    title: "Receive Detailed Feedback",
    desc: "Get a full breakdown of your answers, tone, and technical depth after every session.",
  },
  {
    icon: TrendingUp,
    title: "Improve and Track Progress",
    desc: "Apply the feedback, re-run analyses, and watch your readiness score climb.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="main-section py-20">
      <Reveal className="flex flex-col items-center">
        <h2 className="text-center mb-4">How It Works</h2>
        <p className="text-center text-light-400 mb-16 max-w-xl">
          Five simple steps to transform your job search.
        </p>
      </Reveal>

      <div className="relative w-full max-w-6xl">
        <div className="step-connector hidden md:block" aria-hidden />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 80} className="flex flex-col items-center text-center gap-4 relative">
              <div className="relative z-10 size-12 rounded-full bg-dark-200 border border-primary-200/20 flex-center shrink-0">
                <s.icon className="size-5 text-primary-200" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-primary-200/70 tracking-widest">
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-light-400 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
