import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import { Mic, ArrowRight, Play, Settings, FileAudio } from "lucide-react";

export default function VoiceAgentPage() {
  return (
    <div className="min-h-screen pattern flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="main-section py-20 lg:py-32">
          <div className="page-heading text-center max-w-3xl mx-auto">
            <div className="px-4 py-1.5 rounded-full bg-primary-200/10 text-primary-200 text-sm font-medium w-fit mx-auto mb-6">
              AI Interview Practice
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Master the interview with our <span className="text-gradient">Voice Agent</span>
            </h1>
            <p className="text-lg text-light-400 mb-8 max-w-2xl mx-auto">
              Simulate real-world technical and behavioral interviews with a conversational AI that responds to your answers in real-time.
            </p>
            <Link href="/auth/sign-up" className="btn-primary px-8 py-3">
              Start a Mock Interview
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="main-section py-12 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
            <div className="card p-8 text-center flex flex-col items-center">
              <div className="size-14 rounded-2xl bg-white/5 flex-center mb-6">
                <Settings className="size-6 text-primary-200" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Customizable Roles</h3>
              <p className="text-light-400 text-sm">Select from dozens of roles and tech stacks to get hyper-relevant interview questions.</p>
            </div>
            <div className="card p-8 text-center flex flex-col items-center">
              <div className="size-14 rounded-2xl bg-white/5 flex-center mb-6">
                <Mic className="size-6 text-primary-200" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-time Conversation</h3>
              <p className="text-light-400 text-sm">Talk naturally. The AI listens, understands context, and asks follow-up questions.</p>
            </div>
            <div className="card p-8 text-center flex flex-col items-center">
              <div className="size-14 rounded-2xl bg-white/5 flex-center mb-6">
                <FileAudio className="size-6 text-primary-200" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Detailed Feedback</h3>
              <p className="text-light-400 text-sm">Get a comprehensive breakdown of your performance, tone, and technical accuracy.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
