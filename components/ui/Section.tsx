"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  title: React.ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
}

export default function Section({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  features = [],
  ctaText,
  ctaLink,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in text from bottom
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Scale and fade image from the side
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: reverse ? -50 : 50,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reverse]);

  return (
    <section ref={sectionRef} className="main-section py-20 lg:py-32 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center">
        
        {/* Text Content */}
        <div 
          ref={textRef}
          className={`w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left z-20 ${
            reverse ? 'lg:order-2 lg:-ml-12' : 'lg:order-1 lg:-mr-12'
          }`}
        >
          <div className="card p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl bg-black/60 backdrop-blur-xl w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              {title}
            </h2>
            <p className="text-lg text-light-400 mb-8 max-w-xl">
              {description}
            </p>
            
            {features.length > 0 && (
              <div className="flex flex-col gap-4 mb-10 w-full max-w-md mx-auto lg:mx-0">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-left">
                    <CheckCircle2 className="size-6 text-primary-200 shrink-0" />
                    <span className="text-light-100">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {ctaText && ctaLink && (
              <Link href={ctaLink} className="btn-primary inline-flex items-center gap-2 group mx-auto lg:mx-0">
                {ctaText}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Image Content */}
        <div 
          ref={imageRef}
          className={`w-full lg:w-[45%] flex justify-center mt-12 lg:mt-0 z-10 ${
            reverse ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div className="relative w-full max-w-sm aspect-[1/1.4] rounded-3xl overflow-hidden card-border group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-black/40 z-0" />
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain p-2 relative z-0 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
