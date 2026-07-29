import Image from "next/image";
import {
  Bot,
  Mic,
  Briefcase,
  CornerDownRight,
  ClipboardCheck,
  FileText,
  Gauge,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const capabilities = [
  { icon: Bot, label: "Real-time AI interviewer" },
  { icon: Mic, label: "Natural voice conversation" },
  { icon: Briefcase, label: "Job-specific interview questions" },
  { icon: CornerDownRight, label: "Smart follow-up questions" },
  { icon: ClipboardCheck, label: "Instant AI evaluation" },
  { icon: FileText, label: "Detailed interview report" },
  { icon: Gauge, label: "Performance scoring" },
  { icon: TrendingUp, label: "Confidence improvement" },
];

export function VoiceInterviewSection() {
  return (
    <section id="voice-interview" className="main-section py-24 w-full">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <Reveal className="flex flex-col gap-6">
          <div className="px-4 py-1.5 rounded-full bg-primary-200/10 border border-primary-200/20 text-primary-200 text-sm font-medium w-fit">
            AI Voice Interview
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-white">
            Practice like it&apos;s the <span className="text-gradient">real thing</span>
          </h2>
          <p className="text-light-400 leading-relaxed max-w-lg">
            Talk through a live interview with an AI interviewer that listens, asks
            job-specific follow-ups, and evaluates your answers the way a real
            technical recruiter would — then hands you a report you can act on.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-2">
            {capabilities.map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-primary-200/10 flex-center shrink-0">
                  <c.icon className="size-4 text-primary-200" />
                </div>
                <span className="text-sm text-light-100">{c.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="card border border-primary-200/10 p-8 flex flex-col items-center gap-6">
            <div className="avatar">
              <Image
                src="/ai-avatar.png"
                alt="AI Interviewer"
                width={65}
                height={54}
                className="object-cover"
              />
              <span className="animate-speak" />
            </div>
            <h3 className="text-white font-semibold">AI Interviewer</h3>

            <div className="transcript-border w-full">
              <div className="transcript">
                <p className="text-base">
                  &ldquo;Can you walk me through a challenging project you led?&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-light-400">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success-100 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full size-2 bg-success-100" />
              </span>
              Live voice session
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
