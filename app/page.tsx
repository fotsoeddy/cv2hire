"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";
import { FileText, Mic, BarChart3, Zap, CheckCircle, ArrowRight, Briefcase, Check, Sparkles, Target, Award, X } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const bentoRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-element", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      // Bento Box Animation
      gsap.from(".bento-card", {
        scrollTrigger: {
          trigger: bentoRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });

      // Stats Animation
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pattern">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="main-section py-20">
        <div className="page-heading">
          <div className="hero-element px-4 py-1.5 rounded-full bg-primary-200/10 text-primary-200 text-sm font-medium w-fit mx-auto lg:mx-0">
            AI-Powered Job Readiness
          </div>
          <h1 className="hero-element text-5xl md:text-6xl font-bold tracking-tight mt-6 text-center lg:text-left">
            From <span className="text-gradient">Resume</span> to{" "}
            <span className="text-gradient">Hired</span>
          </h1>
          <p className="hero-element text-lg text-light-100 max-w-2xl mt-6 text-center lg:text-left">
            Analyze your CV, generate motivation letters, practice mock interviews, and get AI-powered feedback —
            all in one platform. Land your dream job with confidence.
          </p>
          <div className="hero-element flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
            <Link href="/auth/sign-up" className="btn-primary px-8">
              Get Started Free
            </Link>
            <Link href="#features" className="btn-ghost">
              Learn More
            </Link>
          </div>
        </div>

        {/* Floating stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto lg:mx-0">
          {[
            { value: "10K+", label: "CVs Analyzed" },
            { value: "5K+", label: "Mock Interviews" },
            { value: "92%", label: "Improvement Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center hero-element">
              <p className="text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="text-sm text-light-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Sections */}
      <div className="border-t border-white/5 bg-black/20">
        <Section
          title={<>Smart <span className="text-gradient">CV Generation</span> & ATS Scoring</>}
          description="Don't let the bots reject you. Our AI analyzes your CV against real job descriptions, gives you an ATS score, and helps you rewrite bullet points to highlight your true impact."
          imageSrc="/images/resume-scan.gif"
          imageAlt="CV Generation and ATS Score"
          features={[
            "Instant ATS compatibility scoring",
            "Action verb and keyword suggestions",
            "Tailor your CV to specific job descriptions"
          ]}
          ctaText="Explore CV Builder"
          ctaLink="/cv-builder"
          reverse={false}
        />

        <Section
          title={<>Generate Winning <span className="text-gradient">Motivation Letters</span></>}
          description="Struggling to write a cover letter? Let our AI generate a personalized, compelling motivation letter that perfectly bridges your experience with the company's needs."
          imageSrc="/images/resume_02.png"
          imageAlt="Motivation Letter Generation"
          features={[
            "Personalized tone and style matching",
            "Highlights your most relevant achievements",
            "Saves hours of writing block"
          ]}
          ctaText="Try it out"
          ctaLink="/auth/sign-up"
          reverse={true}
        />

        <Section
          title={<>Real-time <span className="text-gradient">Voice Agent</span> Interviews</>}
          description="Nervous about the phone screen? Practice with our real-time Voice AI. It asks technical and behavioral questions, listens to your answers, and provides immediate feedback."
          imageSrc="/images/resume_03.png"
          imageAlt="Voice Mock Interviews"
          features={[
            "Conversational AI interviewer",
            "Role-specific technical questions",
            "Post-interview feedback report"
          ]}
          ctaText="Discover Voice Agent"
          ctaLink="/voice-agent"
          reverse={false}
        />

        <Section
          title={<>AI-Curated <span className="text-gradient">Personal Courses</span></>}
          description="Identify your skill gaps and level up. Based on your target role and interview performance, our AI curates personalized learning paths and course recommendations to make you the perfect candidate."
          imageSrc="/images/personal_course_teal.png"
          imageAlt="Personalized AI Courses"
          features={[
            "Skill gap identification",
            "Tailored learning roadmaps",
            "Track your upskilling progress"
          ]}
          ctaText="Start Learning"
          ctaLink="/auth/sign-up"
          reverse={true}
        />
      </div>

      {/* Bento Box Features */}
      <section ref={bentoRef} id="features" className="main-section py-24 border-t border-white/5">
        <h2 className="text-center mb-4 text-4xl font-bold">Everything You Need</h2>
        <p className="text-center text-light-400 mb-16 max-w-xl mx-auto text-lg">
          A complete ecosystem designed to accelerate your job search and boost your confidence.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          <div className="md:col-span-2 card bento-card p-8 md:p-12 rounded-3xl border border-white/5 hover:border-primary-200/30 transition-all duration-300 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-200/20 transition-all" />
            <div className="size-14 rounded-2xl primary-gradient flex-center mb-6 relative z-10">
              <Sparkles className="size-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Actionable AI Feedback</h3>
            <p className="text-light-400 leading-relaxed max-w-md relative z-10">
              Stop guessing why you didn't get the interview. Our AI breaks down your CV and interview performance into actionable, step-by-step recommendations.
            </p>
          </div>

          <div className="card bento-card p-8 rounded-3xl border border-white/5 hover:border-primary-200/30 transition-all duration-300 group overflow-hidden relative">
            <div className="size-12 rounded-xl bg-white/5 flex-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
              <Target className="size-6 text-primary-200" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">Targeted Roles</h3>
            <p className="text-sm text-light-400 leading-relaxed relative z-10">
              Tailor every simulation and analysis to the exact role you are applying for.
            </p>
          </div>

          <div className="card bento-card p-8 rounded-3xl border border-white/5 hover:border-primary-200/30 transition-all duration-300 group overflow-hidden relative">
            <div className="size-12 rounded-xl bg-white/5 flex-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
              <BarChart3 className="size-6 text-primary-200" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">Performance Tracking</h3>
            <p className="text-sm text-light-400 leading-relaxed relative z-10">
              Visualize your improvement over time with detailed charts and historical scores.
            </p>
          </div>

          <div className="md:col-span-2 card bento-card p-8 md:p-12 rounded-3xl border border-white/5 hover:border-primary-200/30 transition-all duration-300 group overflow-hidden relative">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-200/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2 group-hover:bg-primary-200/20 transition-all" />
            <div className="size-14 rounded-2xl primary-gradient flex-center mb-6 relative z-10">
              <Award className="size-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Expert-Level Accuracy</h3>
            <p className="text-light-400 leading-relaxed max-w-md relative z-10">
              Our models are trained on thousands of successful resumes and technical interviews from top-tier tech companies.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="main-section py-24 bg-white/[0.02] border-y border-white/5 w-full">
        <div className="max-w-6xl w-full mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Simple, transparent <span className="text-gradient">pricing</span></h2>
          <p className="text-light-400 mb-16 max-w-xl mx-auto text-lg">Invest in your career today. Choose the plan that best fits your job search needs.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            
            {/* Free Plan */}
            <div className="card p-8 rounded-3xl border border-white/10 flex flex-col relative hover:border-white/20 transition-colors h-full">
              <h3 className="text-xl font-bold text-white mb-2">Free</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-light-400">/ forever</span>
              </div>
              <p className="text-sm text-light-400 border-b border-white/10 pb-6 mb-6">Test the waters with basic features.</p>
              <div className="flex flex-col gap-4 mb-8 flex-1">
                <div className="flex gap-3"><Check className="size-5 text-light-400 shrink-0" /><span className="text-light-100 text-sm">1 CV ATS Scan</span></div>
                <div className="flex gap-3"><Check className="size-5 text-light-400 shrink-0" /><span className="text-light-100 text-sm">Basic Motivation Letter</span></div>
                <div className="flex gap-3"><X className="size-5 text-red-500/50 shrink-0" /><span className="text-light-400/50 text-sm line-through">Voice Mock Interviews</span></div>
                <div className="flex gap-3"><X className="size-5 text-red-500/50 shrink-0" /><span className="text-light-400/50 text-sm line-through">Personalized Courses</span></div>
              </div>
              <div className="mt-auto">
                <Link href="/auth/sign-up" className="btn-ghost w-full justify-center">Sign Up Free</Link>
              </div>
            </div>

            {/* Starter Plan */}
            <div className="card p-8 rounded-3xl border border-primary-200/50 bg-primary-200/5 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-primary-200/10 h-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-200 text-dark-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Popular</div>
              <h3 className="text-xl font-bold text-primary-200 mb-2">Starter</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-white">$9</span>
                <span className="text-light-400">/ month</span>
              </div>
              <p className="text-sm text-light-400 border-b border-white/10 pb-6 mb-6">Perfect for active job seekers.</p>
              <div className="flex flex-col gap-4 mb-8 flex-1">
                <div className="flex gap-3"><Check className="size-5 text-primary-200 shrink-0" /><span className="text-white text-sm">10 CV ATS Scans</span></div>
                <div className="flex gap-3"><Check className="size-5 text-primary-200 shrink-0" /><span className="text-white text-sm">5 Motivation Letters</span></div>
                <div className="flex gap-3"><Check className="size-5 text-primary-200 shrink-0" /><span className="text-white text-sm">3 Voice Mock Interviews</span></div>
                <div className="flex gap-3"><X className="size-5 text-red-500/50 shrink-0" /><span className="text-light-400/50 text-sm line-through">Personalized Courses</span></div>
              </div>
              <div className="mt-auto">
                <Link href="/pricing" className="btn-primary w-full justify-center">Get Starter</Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="card p-8 rounded-3xl border border-white/10 flex flex-col relative hover:border-white/20 transition-colors h-full">
              <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-white">$19</span>
                <span className="text-light-400">/ month</span>
              </div>
              <p className="text-sm text-light-400 border-b border-white/10 pb-6 mb-6">Unlimited access to land your dream job.</p>
              <div className="flex flex-col gap-4 mb-8 flex-1">
                <div className="flex gap-3"><Check className="size-5 text-primary-200 shrink-0" /><span className="text-white text-sm">Unlimited CV Generations</span></div>
                <div className="flex gap-3"><Check className="size-5 text-primary-200 shrink-0" /><span className="text-white text-sm">Unlimited Motivation Letters</span></div>
                <div className="flex gap-3"><Check className="size-5 text-primary-200 shrink-0" /><span className="text-white text-sm">Unlimited Voice Interviews</span></div>
                <div className="flex gap-3"><Check className="size-5 text-primary-200 shrink-0" /><span className="text-white text-sm">Personalized Courses</span></div>
              </div>
              <div className="mt-auto">
                <Link href="/pricing" className="btn-ghost border-primary-200/50 text-primary-200 w-full justify-center hover:bg-primary-200/10">Get Pro</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <div className="border-b border-white/5 bg-black/20">
        <Section
          title={<>Why <span className="text-gradient">Choose Us?</span></>}
          description="We provide the competitive edge you need. Check out our real success metrics from thousands of job seekers who landed roles at top tech companies."
          imageSrc="/images/why_choose_us_teal.png"
          imageAlt="Analytics Dashboard"
          features={[
            "3x More Interviews secured on average",
            "95% ATS Pass Rate after optimization",
            "48h Average Time Saved per application"
          ]}
          reverse={false}
        />
      </div>

      {/* Massive CTA Section */}
      <section className="w-full relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-primary-200/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary-200/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to land your <br/><span className="text-primary-200">Dream Job?</span>
          </h2>
          <p className="text-light-100 text-xl max-w-2xl mx-auto mb-10">
            Join thousands of professionals who have transformed their job search with CV2Hire's AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up" className="btn-primary text-lg px-10 py-4 h-auto shadow-[0_0_40px_rgba(33,230,193,0.3)] hover:shadow-[0_0_60px_rgba(33,230,193,0.5)] transition-all">
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
