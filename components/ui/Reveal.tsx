"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms, applied via the --reveal-delay custom property. */
  delay?: number;
}

/**
 * Fades + lifts children into view the first time they cross the viewport.
 * Respects prefers-reduced-motion by relying on the CSS in globals.css,
 * which strips the transform under that media query.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;

  return (
    <div
      ref={ref}
      data-reveal={isVisible ? "in" : ""}
      style={style}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
