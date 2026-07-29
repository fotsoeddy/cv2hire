import { FileText, Mic, BarChart3, Zap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

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

export function FeatureHighlights() {
  return (
    <section id="features" className="main-section py-20">
      <Reveal className="flex flex-col items-center">
        <h2 className="text-center mb-4">Everything You Need</h2>
        <p className="text-center text-light-400 mb-12 max-w-xl">
          One platform combining CV analysis and interview preparation with powerful AI.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 60} className="group">
            <div className="card p-5 rounded-2xl flex flex-col gap-3 h-full">
              <div className="size-10 rounded-xl primary-gradient flex-center transition-transform duration-200 ease-out group-hover:scale-105">
                <f.icon className="size-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white">{f.title}</h3>
              <p className="text-xs text-light-400 leading-relaxed">{f.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
