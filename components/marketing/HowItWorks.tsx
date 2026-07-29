"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { UploadCloud, ScanSearch, Mic, ClipboardCheck, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

interface Step {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  ring: string;
  hex: string;
}

const steps: Step[] = [
  {
    icon: UploadCloud,
    title: "Upload Your CV",
    desc: "Drop your PDF resume and optionally add a job description to compare against.",
    color: "text-primary-200",
    ring: "border-primary-200/30",
    hex: "#cac5fe",
  },
  {
    icon: ScanSearch,
    title: "AI Analyzes Your Resume",
    desc: "Our model scans structure, tone, and keywords to surface an ATS-ready score.",
    color: "text-resume-blue",
    ring: "border-resume-blue/30",
    hex: "#8E97C5",
  },
  {
    icon: Mic,
    title: "Start Your Mock Interview",
    desc: "Select a role and speak live with an AI interviewer tailored to your target job.",
    color: "text-success-100",
    ring: "border-success-100/30",
    hex: "#49de50",
  },
  {
    icon: ClipboardCheck,
    title: "Receive Detailed Feedback",
    desc: "Get a full breakdown of your answers, tone, and technical depth after every session.",
    color: "text-resume-pink",
    ring: "border-resume-pink/30",
    hex: "#AB8C95",
  },
  {
    icon: TrendingUp,
    title: "Improve and Track Progress",
    desc: "Apply the feedback, re-run analyses, and watch your readiness score climb.",
    color: "text-primary-100",
    ring: "border-primary-100/30",
    hex: "#dddfff",
  },
];

function StepCopy({ step, index }: { step: Step; index: number }) {
  return (
    <div className="space-y-1.5">
      <span className={cn("text-[11px] font-bold tracking-widest", step.color)}>
        STEP {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="text-base font-semibold text-white">{step.title}</h3>
      <p className="text-sm text-light-400 leading-relaxed">{step.desc}</p>
    </div>
  );
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!pathRef.current) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(pathRef.current, { drawSVG: "100%" });
        gsap.set(".how-it-works-copy", { opacity: 1, x: 0, y: 0 });
        gsap.set(".how-it-works-node", { opacity: 1, scale: 1 });
        if (dotRef.current) gsap.set(dotRef.current, { opacity: 0 });
        return;
      }

      gsap.set(pathRef.current, { drawSVG: "0%" });

      const scrollRange = {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 65%",
        scrub: 0.6,
      };

      gsap.to(pathRef.current, {
        drawSVG: "100%",
        ease: "none",
        scrollTrigger: scrollRange,
      });

      if (dotRef.current) {
        gsap.to(dotRef.current, {
          ease: "none",
          scrollTrigger: scrollRange,
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".how-it-works-step").forEach((item) => {
        const isRight = item.dataset.side === "right";

        gsap.fromTo(
          item.querySelector(".how-it-works-copy"),
          { opacity: 0, x: isRight ? 32 : -32, y: 12 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%" },
          }
        );

        gsap.fromTo(
          item.querySelector(".how-it-works-node"),
          { opacity: 0, scale: 0.4 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.1,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger: item, start: "top 82%" },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="how-it-works" className="main-section py-20">
      <div className="flex flex-col items-center">
        <h2 className="text-center mb-4">How It Works</h2>
        <p className="text-center text-light-400 mb-16 max-w-xl">
          Five simple steps to transform your job search.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
        <svg
          aria-hidden
          className="block absolute left-1/2 -translate-x-1/2 top-7 bottom-7 w-3"
          viewBox="0 0 10 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="stepLineGradient" x1="0" y1="0" x2="0" y2="1">
              {steps.map((s, i) => (
                <stop key={s.hex} offset={`${(i / (steps.length - 1)) * 100}%`} stopColor={s.hex} />
              ))}
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d="M5,0 L5,100"
            fill="none"
            stroke="url(#stepLineGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div
          ref={dotRef}
          aria-hidden
          className="block absolute left-1/2 top-7 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full bg-white z-20 shadow-[0_0_12px_2px_rgba(255,255,255,0.55)]"
        />

        <div className="flex flex-col gap-14 sm:gap-20">
          {steps.map((s, i) => {
            const isRight = i % 2 === 1;
            return (
              <div
                key={s.title}
                data-side={isRight ? "right" : "left"}
                className="how-it-works-step grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8"
              >
                <div
                  className={cn(
                    "how-it-works-copy text-center sm:text-right",
                    isRight ? "order-3 sm:order-0" : "order-2 sm:order-0"
                  )}
                >
                  {!isRight && <StepCopy step={s} index={i} />}
                </div>

                <div
                  className={cn(
                    "how-it-works-node relative z-10 size-14 rounded-full bg-dark-200 border-2 flex-center shrink-0 mx-auto order-1 sm:order-0",
                    s.ring
                  )}
                >
                  <s.icon className={cn("size-6", s.color)} />
                </div>

                <div
                  className={cn(
                    "how-it-works-copy text-center sm:text-left",
                    isRight ? "order-2 sm:order-0" : "order-3 sm:order-0"
                  )}
                >
                  {isRight && <StepCopy step={s} index={i} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
