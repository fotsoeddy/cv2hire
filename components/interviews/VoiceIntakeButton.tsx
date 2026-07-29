"use client";

import { Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useVapiCall } from "@/hooks/useVapiCall";
import { useSessionUser } from "@/hooks/useSessionUser";
import { cn } from "@/lib/utils";

const INTAKE_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_INTAKE_ASSISTANT_ID;

/**
 * Flow 2 entry point: the "cv2hire Intake" assistant gathers the role
 * verbally, creates the session + questions itself (via the
 * create_interview_session / generate_interview_questions tool calls),
 * then hands the live call off to the Interviewer assistant server-side
 * through Vapi's own call-transfer mechanism — this component only ever
 * starts the Intake call, it never calls `.start()` a second time.
 */
export function VoiceIntakeButton() {
  const router = useRouter();
  const user = useSessionUser();
  const { status, isSpeaking, error, start, stop, retry } = useVapiCall();
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    if (status === "ended" && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      router.push("/dashboard/interviews");
    }
  }, [status, router]);

  if (!INTAKE_ASSISTANT_ID) {
    return (
      <div className="card-border">
        <div className="card p-8 flex flex-col items-center text-center gap-2">
          <h4 className="text-base font-semibold text-white">Voice intake isn&apos;t configured</h4>
          <p className="text-sm text-light-400 max-w-sm">
            <code>NEXT_PUBLIC_VAPI_INTAKE_ASSISTANT_ID</code> is missing from the environment.
          </p>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    if (status === "error") {
      retry();
      return;
    }
    if (status === "active" || status === "connecting") {
      stop();
      return;
    }
    if (!user) return;
    start({ assistantId: INTAKE_ASSISTANT_ID, variableValues: { userId: user.id } });
  };

  const label =
    status === "connecting"
      ? "Connecting…"
      : status === "active"
      ? isSpeaking
        ? "Listening…"
        : "In progress — tap to end"
      : status === "ended"
      ? "Finishing up…"
      : status === "error"
      ? "Retry"
      : "Start with Voice";

  return (
    <div className="card-border">
      <div className="card p-8 flex flex-col items-center text-center gap-4">
        <button
          onClick={handleClick}
          disabled={!user || status === "ended"}
          className={cn(
            "relative size-16 rounded-full flex-center transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
            status === "active" ? "bg-destructive-100" : "primary-gradient"
          )}
        >
          {status === "connecting" && (
            <span className="absolute inset-0 rounded-full animate-ping bg-primary-200/50" />
          )}
          <Mic className="size-6 text-dark-100 relative" />
        </button>
        <div>
          <h4 className="text-base font-semibold text-white">{label}</h4>
          <p className="text-sm text-light-400 mt-1 max-w-sm">
            Talk to the AI intake assistant — describe the role you want to practice for and
            it&apos;ll set everything up and hand you off to the interviewer.
          </p>
        </div>
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
