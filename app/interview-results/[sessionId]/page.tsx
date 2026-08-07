"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useInterviewSession } from "@/hooks/useInterviewSession";
import { useJob } from "@/hooks/useJob";
import InterviewFeedbackView from "@/components/interviews/InterviewFeedback";

function AuthCheckingScreen() {
  return (
    <div className="min-h-screen flex-center">
      <Image
        src="/logo.png"
        alt="CV2Hire"
        width={40}
        height={40}
        className="object-contain animate-pulse"
        priority
      />
    </div>
  );
}

export default function InterviewResultsPage() {
  const authorized = useAuthGuard();
  const params = useParams();
  const sessionId = params.sessionId as string;

  // This page is reached two ways: grading already finished (the normal
  // path) or the Vapi call just ended and grading is still in flight (the
  // failsafe path — the call may end before Django saves the grade, or the
  // candidate may hang up manually). Keep polling here regardless of which
  // one got us here; the backend's saved grade is the only source of truth.
  const { data: session, loading, error } = useInterviewSession(sessionId, true, 2000);
  const { data: job } = useJob(session?.job);

  if (!authorized) {
    return <AuthCheckingScreen />;
  }

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
          <div className="h-8 w-2/3 mx-auto rounded bg-white/5" />
          <div className="h-24 rounded bg-white/5" />
          <div className="h-40 rounded bg-white/5" />
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2>Results Not Found</h2>
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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center">
        {failed ? (
          <>
            <h2>No Results Available</h2>
            <p className="text-light-400 max-w-sm">
              This interview was {session.status} before it could be graded.
            </p>
          </>
        ) : (
          <>
            <Loader2 className="size-8 text-primary-200 animate-spin" />
            <h2>Preparing your interview results…</h2>
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
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <InterviewFeedbackView
          feedback={session.feedback}
          role={job?.name ?? "this role"}
          sessionId={session.id}
          gradedAt={session.ended_at}
        />
      </div>
    </div>
  );
}
