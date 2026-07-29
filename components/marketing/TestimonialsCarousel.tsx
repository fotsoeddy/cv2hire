import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const testimonials = [
  {
    quote: "CV2Hire helped me identify critical gaps in my resume. I landed a Senior Dev role in 3 weeks!",
    author: "Sarah Jenkins",
    role: "Senior Software Engineer",
    company: "Spotify",
    initial: "S",
  },
  {
    quote: "The mock interview AI is incredibly realistic. It's like talking to a real technical recruiter, but with instant feedback.",
    author: "Michael Reyes",
    role: "Product Manager",
    company: "Meta",
    initial: "M",
  },
  {
    quote: "The ATS score alone was worth it. I rewrote three bullet points and my callback rate doubled.",
    author: "Amara Okafor",
    role: "Data Analyst",
    company: "Amazon",
    initial: "A",
  },
  {
    quote: "Practicing follow-up questions out loud made the real interview feel like round two, not round one.",
    author: "Daniel Kim",
    role: "Backend Engineer",
    company: "Stripe",
    initial: "D",
  },
  {
    quote: "The skills gap breakdown showed me exactly what to learn before applying to senior roles.",
    author: "Priya Raman",
    role: "Frontend Developer",
    company: "Notion",
    initial: "P",
  },
  {
    quote: "Detailed, specific, and honest feedback — no generic tips. Exactly what I needed before job hunting again.",
    author: "Lucas Bennett",
    role: "Product Designer",
    company: "Figma",
    initial: "L",
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className="card w-[360px] shrink-0 p-8 text-left relative overflow-hidden">
      <Quote aria-hidden className="absolute -top-2 -right-2 size-24 text-primary-200/[0.06]" fill="currentColor" />
      <div className="flex gap-0.5 mb-4 relative z-10">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star key={idx} className="size-3.5 text-primary-200 fill-primary-200" />
        ))}
      </div>
      <p className="text-base text-light-100 mb-8 font-medium leading-relaxed relative z-10">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 relative z-10">
        <div className="size-10 rounded-full bg-primary-200/20 flex-center text-primary-200 font-bold border border-primary-200/20 shrink-0">
          {t.initial}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-white text-sm truncate">{t.author}</p>
          <p className="text-xs text-light-400 truncate">
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsCarousel() {
  return (
    <section className="py-24 w-full">
      <div className="max-w-5xl w-full mx-auto text-center mb-12 px-4">
        <Reveal>
          <h2 className="text-3xl font-bold text-white">
            Success <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-light-400 mt-3">Real results from people who used CV2Hire to get hired.</p>
        </Reveal>
      </div>

      <Reveal delay={80} className="marquee-mask overflow-hidden w-full">
        <div className="marquee-track">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.author}-${i}`} t={t} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
