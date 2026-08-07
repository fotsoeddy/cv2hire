"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { useInterviewSession } from "@/hooks/useInterviewSession";
import { useJob } from "@/hooks/useJob";
import { useJobQuestions } from "@/hooks/useJobQuestions";
import VapiInterviewAgent from "@/components/interviews/VapiInterviewAgent";
import { getStableCover } from "@/lib/utils";

export default function InterviewSessionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: session, loading: sessionLoading, error: sessionError } = useInterviewSession(id);
  const { data: job, loading: jobLoading } = useJob(session?.job);
  const {
    data: jobQuestions,
    loading: questionsLoading,
    error: questionsError,
  } = useJobQuestions(session?.job);

  const loading = sessionLoading || jobLoading || questionsLoading;

  // Declared before the loading/error early returns below (Rules of Hooks —
  // VapiInterviewAgent only renders once session is loaded, so by the time
  // this actually gets called `session` is guaranteed to be set).
  const sessionIdForEnd = session?.id;
  const handleEnd = useCallback(() => {
    if (!sessionIdForEnd) return;
    router.replace(`/interview-results/${sessionIdForEnd}`);
  }, [router, sessionIdForEnd]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
        <div className="h-4 w-24 rounded bg-white/5" />
        <div className="h-16 rounded-xl bg-white/5" />
        <div className="h-[400px] rounded-xl bg-white/5" />
      </div>
    );
  }

  if (sessionError || questionsError || !session || !job || !jobQuestions) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2>Interview Not Found</h2>
        <p className="text-light-400">
          {sessionError || questionsError || "This interview doesn't exist."}
        </p>
        <Link href="/dashboard/jobs" className="btn-primary">
          Browse Jobs
        </Link>
      </div>
    );
  }

  const coverImage = getStableCover(job.id);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <Link
        href={`/dashboard/jobs/${job.id}`}
        className="flex items-center gap-2 text-light-400 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft className="size-4" /> Back to {job.name}
      </Link>

      <div className="flex flex-row gap-4 justify-between items-center flex-wrap">
        <div className="flex flex-row gap-4 items-center">
          <Image
            src={coverImage}
            alt="cover"
            width={40}
            height={40}
            className="rounded-full object-cover size-[40px]"
          />
          <h3 className="capitalize">{job.name} Interview</h3>
        </div>
        {job.seniority_level && (
          <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit text-sm capitalize">
            {job.seniority_level}
          </p>
        )}
      </div>

      {/* Agent UI */}
      <VapiInterviewAgent
        sessionId={session.id}
        jobTitle={job.name}
        questions={jobQuestions.questions}
        onEnd={handleEnd}
      />
    </div>
  );
}
