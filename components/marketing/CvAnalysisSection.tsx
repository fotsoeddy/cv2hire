import { FileCheck, KeyRound, SpellCheck, Target, Percent, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ScoreCircle, ScoreBadge } from "@/components/cv/ScoreComponents";

const tiles = [
  {
    icon: FileCheck,
    title: "Resume Strength Analysis",
    desc: "A category-by-category breakdown of formatting, clarity, and impact.",
  },
  {
    icon: KeyRound,
    title: "Missing Keywords",
    desc: "See exactly which role-specific keywords your resume is missing.",
  },
  {
    icon: SpellCheck,
    title: "Grammar & Writing",
    desc: "Catch tone, phrasing, and grammar issues before a recruiter does.",
  },
  {
    icon: Target,
    title: "Skills Gap Detection",
    desc: "Compare your listed skills against the job description's requirements.",
  },
  {
    icon: Percent,
    title: "Job Match Percentage",
    desc: "A single score showing how well your CV fits a specific posting.",
  },
  {
    icon: Lightbulb,
    title: "Actionable Suggestions",
    desc: "Specific, prioritized edits — not vague advice — for every section.",
  },
];

export function CvAnalysisSection() {
  return (
    <section id="cv-analysis" className="main-section py-24 w-full bg-white/[0.02] border-y border-white/5">
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-14">
        <Reveal className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <div className="px-4 py-1.5 rounded-full bg-primary-200/10 border border-primary-200/20 text-primary-200 text-sm font-medium w-fit">
            AI CV Analysis
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Know exactly where your <span className="text-gradient">resume stands</span>
          </h2>
          <p className="text-light-400 leading-relaxed">
            Every upload runs through the same scoring engine recruiters&apos; ATS
            software uses — so you fix what matters before you hit submit.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="card p-8 md:p-10 flex flex-col md:flex-row items-center gap-10 border border-primary-200/10">
            <ScoreCircle score={82} />
            <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
              <ScoreBadge score={82} />
              <h3 className="text-xl font-bold text-white">Real ATS scoring, not guesswork</h3>
              <p className="text-light-400 text-sm max-w-md leading-relaxed">
                Your overall readiness score is computed from ATS compatibility,
                keyword coverage, structure, and tone — the same signals applicant
                tracking systems check before a human ever opens your CV.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map((t, i) => (
            <Reveal key={t.title} delay={i * 60}>
              <div className="card p-6 rounded-2xl flex flex-col gap-3 h-full">
                <div className="size-10 rounded-xl bg-primary-200/10 flex-center">
                  <t.icon className="size-5 text-primary-200" />
                </div>
                <h3 className="text-base font-semibold text-white">{t.title}</h3>
                <p className="text-sm text-light-400 leading-relaxed">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
