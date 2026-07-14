"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";
import { Check, Sparkles, Target, Award, X, TrendingUp, Clock, Zap, BarChart3, CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const bentoRef = useRef<HTMLElement>(null);
  const whyChooseUsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation - Staggered fade and slide up
      gsap.fromTo(".hero-element", 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 }
      );

      // Bento Box Animation - Scale in and fade up
      gsap.fromTo(".bento-card",
        { y: 80, opacity: 0, scale: 0.95 },
        { 
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 75%",
          }
        }
      );

      // Why Choose Us Stats Animation
      gsap.fromTo(".stat-card",
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: {
            trigger: whyChooseUsRef.current,
            start: "top 75%",
          }
        }
      );

      // CTA Pulse Effect Parallax
      gsap.to(".cta-glow", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pattern overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="main-section pt-32 pb-20 relative">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary-200/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
        
        <div className="page-heading relative z-10">
          <div className="hero-element px-4 py-1.5 rounded-full bg-primary-200/10 border border-primary-200/20 text-primary-200 text-sm font-medium w-fit mx-auto lg:mx-0 shadow-[0_0_15px_rgba(33,230,193,0.2)]">
            AI-Powered Job Readiness
          </div>
          <h1 className="hero-element text-5xl md:text-7xl font-bold tracking-tight mt-6 text-center lg:text-left leading-tight">
            From <span className="text-gradient">Resume</span> <br className="hidden md:block" />to{" "}
            <span className="text-gradient">Hired</span>
          </h1>
          <p className="hero-element text-lg md:text-xl text-light-100 max-w-2xl mt-6 text-center lg:text-left leading-relaxed">
            Analyze your CV, generate motivation letters, practice mock interviews, and get AI-powered feedback —
            all in one platform.
          </p>
          <div className="hero-element flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
            <Link href="/auth/sign-up" className="btn-primary px-8 text-lg py-4 shadow-[0_0_30px_rgba(33,230,193,0.3)] hover:shadow-[0_0_50px_rgba(33,230,193,0.5)] transition-all">
              Get Started Free
            </Link>
            <Link href="#features" className="btn-ghost px-8 text-lg py-4">
              Explore Platform
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <div className="border-t border-white/5 bg-black/40">
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

      {/* Redesigned Bento Box Features */}
      <section ref={bentoRef} id="features" className="main-section py-32 border-t border-white/5 relative">
        <h2 className="text-center mb-6 text-4xl md:text-5xl font-bold">Everything You Need</h2>
        <p className="text-center text-light-400 mb-20 max-w-2xl mx-auto text-lg leading-relaxed">
          A complete ecosystem designed to accelerate your job search and boost your confidence.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          {/* Large Card 1 */}
          <div className="md:col-span-2 card bento-card p-10 md:p-12 rounded-[2rem] border border-white/5 hover:border-primary-200/30 transition-all duration-500 group overflow-hidden relative min-h-[350px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-200/10 to-transparent blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
              <Zap className="size-32 text-primary-200" />
            </div>
            <div className="size-16 rounded-2xl primary-gradient flex-center mb-6 relative z-10 shadow-lg shadow-primary-200/20">
              <Sparkles className="size-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Actionable AI Feedback</h3>
            <p className="text-light-400 leading-relaxed max-w-md relative z-10 text-lg">
              Stop guessing why you didn't get the interview. Our AI breaks down your CV and interview performance into actionable, step-by-step recommendations.
            </p>
          </div>

          {/* Small Card 1 */}
          <div className="card bento-card p-10 rounded-[2rem] border border-white/5 hover:border-primary-200/30 transition-all duration-500 group overflow-hidden relative min-h-[350px] flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-200/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="size-14 rounded-2xl bg-white/5 flex-center mb-6 relative z-10 group-hover:scale-110 group-hover:bg-primary-200/20 transition-all duration-300">
              <Target className="size-7 text-primary-200" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Targeted Roles</h3>
            <p className="text-light-400 leading-relaxed relative z-10 flex-1">
              Tailor every simulation and analysis to the exact role you are applying for, from software engineering to marketing.
            </p>
          </div>

          {/* Small Card 2 */}
          <div className="card bento-card p-10 rounded-[2rem] border border-white/5 hover:border-primary-200/30 transition-all duration-500 group overflow-hidden relative min-h-[350px] flex flex-col">
            <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">
              <BarChart3 className="size-40 text-primary-200 translate-x-10 translate-y-10" />
            </div>
            <div className="size-14 rounded-2xl bg-white/5 flex-center mb-6 relative z-10 group-hover:scale-110 group-hover:bg-primary-200/20 transition-all duration-300">
              <TrendingUp className="size-7 text-primary-200" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Performance Tracking</h3>
            <p className="text-light-400 leading-relaxed relative z-10 flex-1">
              Visualize your improvement over time with detailed charts and historical scores.
            </p>
          </div>

          {/* Large Card 2 */}
          <div className="md:col-span-2 card bento-card p-10 md:p-12 rounded-[2rem] border border-white/5 hover:border-primary-200/30 transition-all duration-500 group overflow-hidden relative min-h-[350px] flex flex-col justify-end">
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary-200/10 to-transparent blur-3xl rounded-full translate-y-1/2 -translate-x-1/3 group-hover:scale-110 transition-transform duration-700" />
            <div className="size-16 rounded-2xl primary-gradient flex-center mb-6 relative z-10 shadow-lg shadow-primary-200/20">
              <Award className="size-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Expert-Level Accuracy</h3>
            <p className="text-light-400 leading-relaxed max-w-md relative z-10 text-lg">
              Our models are trained on thousands of successful resumes and technical interviews from top-tier tech companies.
            </p>
          </div>
        </div>
      </section>

      {/* Expanded Pricing */}
      <section className="main-section py-32 bg-white/[0.02] border-y border-white/5 w-full relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-7xl w-full mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, transparent <span className="text-gradient">pricing</span></h2>
          <p className="text-light-400 mb-20 max-w-2xl mx-auto text-lg">Invest in your career today. Choose the plan that best fits your job search needs.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            
            {/* Free Plan */}
            <div className="card p-10 rounded-[2rem] border border-white/10 flex flex-col relative hover:border-white/20 transition-colors h-full bg-black/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-white">$0</span>
                <span className="text-light-400">/ forever</span>
              </div>
              <p className="text-light-400 border-b border-white/10 pb-8 mb-8">Test the waters with basic features.</p>
              <div className="flex flex-col gap-5 mb-10 flex-1">
                <div className="flex gap-4 items-start"><Check className="size-5 text-light-400 shrink-0 mt-0.5" /><span className="text-light-100">1 CV ATS Scan</span></div>
                <div className="flex gap-4 items-start"><Check className="size-5 text-light-400 shrink-0 mt-0.5" /><span className="text-light-100">1 Motivation Letter</span></div>
                <div className="flex gap-4 items-start"><Check className="size-5 text-light-400 shrink-0 mt-0.5" /><span className="text-light-100">Basic Community Support</span></div>
                <div className="flex gap-4 items-start"><Check className="size-5 text-light-400 shrink-0 mt-0.5" /><span className="text-light-100">1 PDF Export</span></div>
                <div className="flex gap-4 items-start opacity-50"><X className="size-5 text-red-500 shrink-0 mt-0.5" /><span className="text-light-400 line-through">Voice Mock Interviews</span></div>
                <div className="flex gap-4 items-start opacity-50"><X className="size-5 text-red-500 shrink-0 mt-0.5" /><span className="text-light-400 line-through">Personalized Courses</span></div>
              </div>
              <div className="mt-auto">
                <Link href="/auth/sign-up" className="btn-ghost w-full justify-center py-4">Sign Up Free</Link>
              </div>
            </div>

            {/* Starter Plan */}
            <div className="card p-10 rounded-[2rem] border border-primary-200/50 bg-primary-200/5 flex flex-col relative transform lg:-translate-y-8 shadow-2xl shadow-primary-200/10 h-full backdrop-blur-md">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-200 text-dark-100 text-sm font-bold px-6 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-primary-200/30">Most Popular</div>
              <h3 className="text-2xl font-bold text-primary-200 mb-2">Starter</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-white">$9</span>
                <span className="text-light-400">/ month</span>
              </div>
              <p className="text-light-400 border-b border-white/10 pb-8 mb-8">Perfect for active job seekers.</p>
              <div className="flex flex-col gap-5 mb-10 flex-1">
                <div className="flex gap-4 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white font-medium">10 CV ATS Scans</span></div>
                <div className="flex gap-4 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white font-medium">5 Motivation Letters</span></div>
                <div className="flex gap-4 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white font-medium">3 Voice Mock Interviews</span></div>
                <div className="flex gap-4 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white">3 PDF Exports</span></div>
                <div className="flex gap-4 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white">Priority Email Support</span></div>
                <div className="flex gap-4 items-start opacity-50"><X className="size-5 text-red-500 shrink-0 mt-0.5" /><span className="text-light-400 line-through">Personalized Courses</span></div>
              </div>
              <div className="mt-auto">
                <Link href="/pricing" className="btn-primary w-full justify-center py-4 text-lg shadow-[0_0_20px_rgba(33,230,193,0.2)]">Get Starter</Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="card p-10 rounded-[2rem] border border-white/10 flex flex-col relative hover:border-white/20 transition-colors h-full bg-black/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-white">$19</span>
                <span className="text-light-400">/ month</span>
              </div>
              <p className="text-light-400 border-b border-white/10 pb-8 mb-8">Unlimited access to land your dream job.</p>
              <div className="flex flex-col gap-5 mb-10 flex-1">
                <div className="flex gap-4 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white font-medium">Unlimited CV Generations</span></div>
                <div className="flex gap-4 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white font-medium">Unlimited Motivation Letters</span></div>
                <div className="flex gap-4 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white font-medium">Unlimited Voice Interviews</span></div>
                <div className="flex gap-4 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white font-medium">Personalized Courses</span></div>
                <div className="flex gap-4 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white">Unlimited PDF Exports</span></div>
                <div className="flex gap-4 items-start"><Check className="size-5 text-primary-200 shrink-0 mt-0.5" /><span className="text-white">24/7 Priority Support</span></div>
              </div>
              <div className="mt-auto">
                <Link href="/pricing" className="btn-ghost border-primary-200/50 text-primary-200 w-full justify-center py-4 hover:bg-primary-200/10 transition-colors">Get Pro</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Custom Why Choose Us Section */}
      <section ref={whyChooseUsRef} className="main-section py-32 border-b border-white/5 bg-black/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Why <span className="text-gradient">Choose Us?</span>
            </h2>
            <p className="text-light-400 text-lg mb-12 max-w-xl leading-relaxed">
              We provide the competitive edge you need. Check out our real success metrics from thousands of job seekers who landed roles at top tech companies.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="card stat-card p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col gap-2">
                <div className="size-12 rounded-xl bg-primary-200/10 flex-center mb-2">
                  <Target className="size-6 text-primary-200" />
                </div>
                <span className="text-4xl font-bold text-white">3x</span>
                <span className="text-light-400 text-sm">More Interviews secured on average</span>
              </div>
              
              <div className="card stat-card p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col gap-2">
                <div className="size-12 rounded-xl bg-primary-200/10 flex-center mb-2">
                  <CheckCircle className="size-6 text-primary-200" />
                </div>
                <span className="text-4xl font-bold text-white">95%</span>
                <span className="text-light-400 text-sm">ATS Pass Rate after optimization</span>
              </div>
              
              <div className="card stat-card p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col gap-2">
                <div className="size-12 rounded-xl bg-primary-200/10 flex-center mb-2">
                  <Clock className="size-6 text-primary-200" />
                </div>
                <span className="text-4xl font-bold text-white">48h</span>
                <span className="text-light-400 text-sm">Average Time Saved per application</span>
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden card-border group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-200/20 to-transparent opacity-50 z-10 pointer-events-none" />
            <Image
              src="/images/why_choose_us_teal.png"
              alt="Analytics Dashboard"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover relative z-0 transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="cta-section w-full relative overflow-hidden py-40">
        <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-primary-200/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center px-6">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Ready to land your <br/><span className="text-primary-200">Dream Job?</span>
          </h2>
          <p className="text-light-100 text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Join thousands of professionals who have transformed their job search with CV2Hire's AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth/sign-up" className="btn-primary text-xl px-12 py-5 h-auto rounded-full shadow-[0_0_40px_rgba(33,230,193,0.4)] hover:shadow-[0_0_70px_rgba(33,230,193,0.6)] hover:scale-105 transition-all duration-300">
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
