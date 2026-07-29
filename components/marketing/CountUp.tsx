"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ target, suffix = "", duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = `${target}${suffix}`;
        return;
      }

      const counter = { value: 0 };
      gsap.to(counter, {
        value: target,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.value)}${suffix}`;
        },
      });
    },
    { scope: ref, dependencies: [target, suffix, duration] }
  );

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
