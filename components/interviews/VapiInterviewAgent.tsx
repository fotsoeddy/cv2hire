"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useVapiCall } from "@/hooks/useVapiCall";
import type { InterviewQuestion } from "@/types/interviews";
import { cn } from "@/lib/utils";

interface VapiInterviewAgentProps {
  sessionId: string;
  jobTitle: string;
  questions: InterviewQuestion[];
  onEnd: () => void;
}

const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_INTERVIEWER_ASSISTANT_ID;

export default function VapiInterviewAgent({
  sessionId,
  jobTitle,
  questions,
  onEnd,
}: VapiInterviewAgentProps) {
  const { status, isSpeaking, transcript, error, start, stop, retry } = useVapiCall();
  const hasEndedRef = useRef(false);

  useEffect(() => {
    if (status === "ended" && !hasEndedRef.current) {
      hasEndedRef.current = true;
      onEnd();
    }
  }, [status, onEnd]);

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
    start({
      assistantId: ASSISTANT_ID,
      variableValues: {
        sessionId,
        questionsJson: JSON.stringify(questions),
        jobTitle,
      },
    });
  };

  const lastMessage = transcript[transcript.length - 1];

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="AI Interviewer"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* Candidate */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="You"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>You</h3>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center">
          {error}
        </div>
      )}

      {lastMessage && status === "active" && (
        <div className="transcript-border">
          <div className="transcript">
            <p className="animate-fadeIn">{lastMessage.content}</p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center gap-4">
        {status === "active" ? (
          <button className="btn-disconnect" onClick={stop}>
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
    </>
  );
}
