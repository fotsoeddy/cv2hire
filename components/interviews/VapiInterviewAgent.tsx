"use client";

import Image from "next/image";
import { Mic, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useVapiCall } from "@/hooks/useVapiCall";
import { useInterviewSession, isSessionGraded } from "@/hooks/useInterviewSession";
import type { InterviewQuestion } from "@/types/interviews";
import { cn } from "@/lib/utils";

interface VapiInterviewAgentProps {
  sessionId: string;
  jobTitle: string;
  questions: InterviewQuestion[];
  onEnd: () => void;
}

const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_INTERVIEWER_ASSISTANT_ID;
const SESSION_STORAGE_KEY = "cv2hire:activeInterviewSessionId";

// How long to let the assistant finish its spoken closing line before we
// force the call closed and navigate away — grading already succeeded by
// the time this fires, this is purely about not cutting off the audio.
const RESULTS_READY_DELAY_MS = 1500;

export default function VapiInterviewAgent({
  sessionId,
  jobTitle,
  questions,
  onEnd,
}: VapiInterviewAgentProps) {
  const { status, isSpeaking, localVolume, transcript, error, start, stop, retry } =
    useVapiCall();
  // Grading is driven by Vapi's grade_interview tool call, independently of
  // whether/when the call itself ends — poll for it directly rather than
  // relying solely on the call-end event, which the assistant may never fire
  // (e.g. it never invokes its End Call tool) or which may fire before
  // Django has actually finished saving the grade.
  const { data: session } = useInterviewSession(sessionId, true, 1500);
  const graded = isSessionGraded(session);

  const [resultsReady, setResultsReady] = useState(false);
  const hasFinishedRef = useRef(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Call-end path: the assistant (or the user) ended the call. Navigate
  // immediately — the results page keeps polling on its own if grading
  // hasn't landed yet.
  useEffect(() => {
    if (status === "ended" && !hasFinishedRef.current) {
      hasFinishedRef.current = true;
      onEnd();
    }
  }, [status, onEnd]);

  // Grading-complete path: Django saved a grade while the call is still
  // open. Show a brief "results are ready" state, give the assistant a
  // moment to say its closing line, then stop the call ourselves as a
  // failsafe and navigate.
  useEffect(() => {
    if (!graded || hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setResultsReady(true);

    const timer = setTimeout(() => {
      if (status === "active" || status === "connecting") stop();
      onEnd();
    }, RESULTS_READY_DELAY_MS);

    return () => clearTimeout(timer);
  }, [graded, status, stop, onEnd]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [transcript]);

  if (!ASSISTANT_ID) {
    return (
      <div className="card-border">
        <div className="card p-8 flex flex-col items-center text-center gap-3">
          <h4 className="text-base font-semibold text-white">Voice interview isn&apos;t configured</h4>
          <p className="text-sm text-light-400 max-w-md">
            <code>NEXT_PUBLIC_VAPI_INTERVIEWER_ASSISTANT_ID</code> is missing from the environment,
            so the AI interviewer can&apos;t start a call.
          </p>
        </div>
      </div>
    );
  }

  const handleStart = () => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    } catch {
      // Private browsing / storage disabled — sessionId still lives in the
      // route and in this component's props, so nothing depends on this.
    }
    start({
      assistantId: ASSISTANT_ID,
      variableValues: {
        sessionId,
        questionsJson: JSON.stringify(questions),
        jobTitle,
      },
    });
  };

  const live = status === "active" || status === "connecting";
  const userScale = 1 + Math.min(localVolume, 1) * 0.35;

  return (
    <div className="space-y-6">
      {/* Video-call style split view */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* AI Interviewer */}
        <div
          className={cn(
            "relative rounded-2xl overflow-hidden border transition-colors duration-300 aspect-video sm:aspect-square",
            "bg-[linear-gradient(to_bottom,#171532,#08090D)]",
            isSpeaking ? "border-primary-200/60" : "border-white/5"
          )}
        >
          <div className="absolute inset-0 flex-center">
            <div className="relative size-24 sm:size-28 rounded-full flex-center">
              {isSpeaking && (
                <span className="absolute inset-0 rounded-full bg-primary-200/40 animate-ping" />
              )}
              <div className="relative size-full rounded-full overflow-hidden border-2 border-primary-200/40 bg-primary-100/10">
                <Image src="/ai-avatar.png" alt="AI Interviewer" fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-100/70 backdrop-blur-sm border border-white/10">
            <span
              className={cn(
                "size-2 rounded-full",
                isSpeaking ? "bg-success-100" : "bg-light-400"
              )}
            />
            <span className="text-xs font-semibold text-white">AI Interviewer</span>
          </div>
        </div>

        {/* Candidate */}
        <div
          className={cn(
            "relative rounded-2xl overflow-hidden border transition-colors duration-300 aspect-video sm:aspect-square",
            "bg-[linear-gradient(to_bottom,#1A1C20,#08090D)]",
            live && localVolume > 0.05 ? "border-success-100/50" : "border-white/5"
          )}
        >
          <div className="absolute inset-0 flex-center">
            <div className="relative size-24 sm:size-28 rounded-full flex-center">
              {live && (
                <span
                  className="absolute inset-0 rounded-full bg-success-100/25 transition-transform duration-100 ease-out"
                  style={{ transform: `scale(${userScale})` }}
                />
              )}
              <div className="relative size-full rounded-full overflow-hidden border-2 border-white/10">
                <Image src="/user-avatar.png" alt="You" fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-100/70 backdrop-blur-sm border border-white/10">
            <Mic className="size-3.5 text-white" />
            <span className="text-xs font-semibold text-white">You</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center">
          {error}
        </div>
      )}

      {/* Full transcript */}
      <div className="card-border">
        <div className="card p-4 sm:p-5">
          <h4 className="text-sm font-semibold text-light-400 mb-3">Transcript</h4>
          <div className="flex flex-col gap-2.5 max-h-80 overflow-y-auto pr-1">
            {transcript.length === 0 ? (
              <p className="text-sm text-light-400 text-center py-6">
                {live
                  ? "Listening — the conversation will appear here as you talk."
                  : "The transcript will appear here once the interview starts."}
              </p>
            ) : (
              transcript.map((entry, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col max-w-[85%] animate-fadeIn",
                    entry.role === "assistant" ? "items-start self-start" : "items-end self-end"
                  )}
                >
                  <span className="text-[11px] text-light-400 mb-0.5 px-1">
                    {entry.role === "assistant" ? "AI Interviewer" : "You"}
                  </span>
                  <p
                    className={cn(
                      "text-sm px-3.5 py-2 rounded-2xl leading-relaxed",
                      entry.role === "assistant"
                        ? "bg-dark-300 text-light-100 rounded-tl-sm"
                        : "bg-primary-200/15 text-primary-100 rounded-tr-sm"
                    )}
                  >
                    {entry.content}
                  </p>
                </div>
              ))
            )}
            <div ref={transcriptEndRef} />
          </div>
        </div>
      </div>

      {resultsReady && (
        <div className="p-3.5 bg-success-100/10 border border-success-100/20 text-success-100 text-sm rounded-xl text-center flex items-center justify-center gap-2">
          <Sparkles className="size-4" />
          Results are ready — wrapping up the call…
        </div>
      )}

      <div className="w-full flex justify-center gap-4">
        {status === "active" ? (
          <button className="btn-disconnect" onClick={stop} disabled={resultsReady}>
            End Interview
          </button>
        ) : status === "error" ? (
          <button className="btn-call" onClick={retry}>
            Retry
          </button>
        ) : (
          <button
            className="relative btn-call"
            onClick={handleStart}
            disabled={status === "connecting" || status === "ended"}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                status !== "connecting" && "hidden"
              )}
            />
            <span className="relative">
              {status === "connecting"
                ? ". . ."
                : status === "ended"
                ? "Interview Ended"
                : "Start Interview"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
