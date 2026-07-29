"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useInterviewSession } from "@/hooks/useInterviewSession";
import { useJob } from "@/hooks/useJob";
import InterviewFeedbackView from "@/components/interviews/InterviewFeedback";

export default function InterviewFeedbackPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: session, loading, error } = useInterviewSession(id, true);
  const { data: job } = useJob(session?.job);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 w-2/3 mx-auto rounded bg-white/5" />
        <div className="h-24 rounded bg-white/5" />
        <div className="h-40 rounded bg-white/5" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2>Feedback Not Found</h2>
        <p className="text-light-400">{error || "This interview doesn't exist."}</p>
        <Link href="/dashboard/jobs" className="btn-primary">
          Browse Jobs
        </Link>
      </div>
    );
  }

  if (!session.feedback) {
    const failed = session.status === "failed" || session.status === "cancelled";
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
        {failed ? (
          <>
            <h2>No Feedback Available</h2>
            <p className="text-light-400 max-w-sm">
              This interview was {session.status} before it could be graded.
            </p>
          </>
        ) : (
          <>
            <Loader2 className="size-8 text-primary-200 animate-spin" />
            <h2>Grading your interview…</h2>
            <p className="text-light-400 max-w-sm">
              This usually takes a moment after the call ends. This page will update
              automatically.
            </p>
          </>
        )}
        <Link href="/dashboard" className="btn-secondary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <InterviewFeedbackView
      feedback={session.feedback}
      role={job?.name ?? "this role"}
      sessionId={session.id}
      gradedAt={session.ended_at}
    />
  );
}
