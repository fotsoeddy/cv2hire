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
    desc: "Drop your PDF resume and optionally add a job description.",
    color: "text-primary-200",
    ring: "border-primary-200/30",
    hex: "#cac5fe",
  },
  {
    icon: ScanSearch,
    title: "AI Analyzes Your Resume",
    desc: "We scan structure, tone, and keywords for an ATS-ready score.",
    color: "text-resume-blue",
    ring: "border-resume-blue/30",
    hex: "#8E97C5",
  },
  {
    icon: Mic,
    title: "Start Your Mock Interview",
    desc: "Speak live with an AI interviewer tailored to your target job.",
    color: "text-success-100",
    ring: "border-success-100/30",
    hex: "#49de50",
  },
  {
    icon: ClipboardCheck,
    title: "Receive Detailed Feedback",
    desc: "Get a breakdown of your answers, tone, and technical depth.",
    color: "text-resume-pink",
    ring: "border-resume-pink/30",
    hex: "#AB8C95",
  },
  {
    icon: TrendingUp,
    title: "Improve and Track Progress",
    desc: "Re-run analyses and watch your readiness score climb.",
    color: "text-primary-100",
    ring: "border-primary-100/30",
    hex: "#dddfff",
  },
];

// A gentle left/right wiggle applied to the icon only — the text column
// underneath stays put so copy length never has to fight the curve.
const NODE_OFFSET = [0, 28, 0, -28, 0];

function buildSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const midY = (p0.y + p1.y) / 2;
    // Horizontal tangent at every node keeps the curve a smooth wave
    // instead of a series of visible kinks.
    d += ` C${p0.x},${midY} ${p1.x},${midY} ${p1.x},${p1.y}`;
  }
  return d;
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const svg = svgRef.current;
      const path = pathRef.current;
      if (!section || !svg || !path) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let ctx: ReturnType<typeof gsap.context> | undefined;

      const build = () => {
        ctx?.revert();

        const containerRect = section.getBoundingClientRect();
        const points = nodeRefs.current
          .filter((el): el is HTMLDivElement => !!el)
          .map((el) => {
            const r = el.getBoundingClientRect();
            return {
              x: r.left + r.width / 2 - containerRect.left,
              y: r.top + r.height / 2 - containerRect.top,
            };
          });

        if (points.length < 2) return;

        svg.setAttribute("viewBox", `0 0 ${containerRect.width} ${containerRect.height}`);
        path.setAttribute("d", buildSmoothPath(points));
        if (dotRef.current) {
          gsap.set(dotRef.current, { x: points[0].x, y: points[0].y });
        }

        ctx = gsap.context(() => {
          if (prefersReducedMotion) {
            gsap.set(path, { drawSVG: "100%" });
            gsap.set(".how-it-works-copy, .how-it-works-node", { opacity: 1, y: 0, scale: 1 });
            if (dotRef.current) gsap.set(dotRef.current, { opacity: 0 });
            return;
          }

          gsap.set(path, { drawSVG: "0%" });

          const scrollRange = {
            trigger: section,
            start: "top 75%",
            end: "bottom 70%",
            scrub: 0.6,
          };

          gsap.to(path, { drawSVG: "100%", ease: "none", scrollTrigger: scrollRange });

          if (dotRef.current) {
            gsap.to(dotRef.current, {
              ease: "none",
              scrollTrigger: scrollRange,
              motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
            });
          }

          gsap.utils.toArray<HTMLElement>(".how-it-works-step").forEach((item) => {
            gsap.fromTo(
              item.querySelector(".how-it-works-copy"),
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: { trigger: item, start: "top 85%" },
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
                scrollTrigger: { trigger: item, start: "top 85%" },
              }
            );
          });
        }, section);
      };

      build();

      const resizeObserver = new ResizeObserver(() => build());
      resizeObserver.observe(section);

      return () => {
        resizeObserver.disconnect();
        ctx?.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section id="how-it-works" className="main-section py-20">
      <div className="flex flex-col items-center max-w-md mx-auto">
        <h2 className="text-center mb-4">How It Works</h2>
        <p className="text-center text-light-400 mb-16">
          Five simple steps to transform your job search.
        </p>
      </div>

      <div ref={sectionRef} className="relative w-full max-w-md mx-auto">
        <svg ref={svgRef} aria-hidden className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id="stepLineGradient" x1="0" y1="0" x2="0" y2="1">
              {steps.map((s, i) => (
                <stop key={s.hex} offset={`${(i / (steps.length - 1)) * 100}%`} stopColor={s.hex} />
              ))}
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            fill="none"
            stroke="url(#stepLineGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <div
          ref={dotRef}
          aria-hidden
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full bg-white z-20 shadow-[0_0_12px_2px_rgba(255,255,255,0.55)]"
        />

        <div className="flex flex-col gap-10">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="how-it-works-step relative z-10 flex flex-col items-center text-center gap-4"
            >
              <div
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                style={{ transform: `translateX(${NODE_OFFSET[i]}px)` }}
                className={cn(
                  "how-it-works-node size-12 rounded-full bg-dark-200 border-2 flex-center shrink-0",
                  s.ring
                )}
              >
                <s.icon className={cn("size-5", s.color)} />
              </div>
              <div className="how-it-works-copy space-y-1.5 max-w-xs">
                <span className={cn("text-[11px] font-bold tracking-widest", s.color)}>
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-light-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
