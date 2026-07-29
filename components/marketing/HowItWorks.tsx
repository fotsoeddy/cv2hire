import { UploadCloud, ScanSearch, Mic, ClipboardCheck, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
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

// Icon centers for a 5-column row, expressed as percentages of width (column
// midpoints) and px of height (24 = resting center, 64 = dropped center —
// see the matching `md:mt-10` below). Kept in sync manually since the SVG
// viewBox maps 1:1 to these units.
const nodeX = [10, 30, 50, 70, 90];
const nodeY = [24, 64, 24, 64, 24];

function buildSnakePath() {
  let d = `M${nodeX[0]},${nodeY[0]}`;
  for (let i = 1; i < nodeX.length; i++) {
    const [x0, y0] = [nodeX[i - 1], nodeY[i - 1]];
    const [x1, y1] = [nodeX[i], nodeY[i]];
    const midX = (x0 + x1) / 2;
    // Horizontal tangent at every node — the hallmark of a smooth wave
    // rather than a series of visible kinks.
    d += ` C${midX},${y0} ${midX},${y1} ${x1},${y1}`;
  }
  return d;
}

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
        <svg
          aria-hidden
          className="hidden md:block absolute top-0 left-0 w-full h-22"
          viewBox="0 0 100 88"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="snakeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#cac5fe" stopOpacity="0" />
              <stop offset="12%" stopColor="#cac5fe" stopOpacity="0.5" />
              <stop offset="88%" stopColor="#cac5fe" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#cac5fe" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={buildSnakePath()}
            fill="none"
            stroke="url(#snakeGradient)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6">
          {steps.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 80}
              className={cn(
                "flex flex-col items-center text-center gap-4 relative",
                i % 2 === 1 && "md:mt-10"
              )}
            >
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
