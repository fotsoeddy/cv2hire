"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InterviewAgentMockProps {
  userName: string;
  onEnd?: (transcript: { role: string; content: string }[]) => void;
}

const mockMessages = [
  "Hello! Thank you for taking the time to speak with me today. Let's get started.",
  "Can you tell me a little about yourself and your background?",
  "That's great! How do you handle challenging situations at work?",
  "Thank you for sharing. What are your greatest strengths?",
  "Excellent. Do you have any questions for me about the role?",
];

type CallStatus = "INACTIVE" | "CONNECTING" | "ACTIVE" | "FINISHED";

export default function InterviewAgentMock({ userName, onEnd }: InterviewAgentMockProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>("INACTIVE");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);

  const handleCall = () => {
    setCallStatus("CONNECTING");
    // Simulate connection delay
    setTimeout(() => {
      setCallStatus("ACTIVE");
      setIsSpeaking(true);
      setLastMessage(mockMessages[0]);
      setMessageIndex(1);
      setTimeout(() => setIsSpeaking(false), 3000);
    }, 1500);
  };

  const handleDisconnect = () => {
    setCallStatus("FINISHED");
    onEnd?.([
      { role: "assistant", content: "Thank you for the interview!" },
      { role: "user", content: "Thank you for having me." },
    ]);
  };

  const simulateNextMessage = () => {
    if (messageIndex < mockMessages.length) {
      setIsSpeaking(true);
      setLastMessage(mockMessages[messageIndex]);
      setMessageIndex((prev) => prev + 1);
      setTimeout(() => setIsSpeaking(false), 2500);
    }
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
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

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="User"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {/* Transcript */}
      {lastMessage && (
        <div className="transcript-border">
          <div className="transcript">
            <p className="animate-fadeIn">{lastMessage}</p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="w-full flex justify-center gap-4">
        {callStatus !== "ACTIVE" ? (
          <button
            className="relative btn-call"
            onClick={handleCall}
            disabled={callStatus === "FINISHED"}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />
            <span className="relative">
              {callStatus === "INACTIVE"
                ? "Start Interview"
                : callStatus === "CONNECTING"
                ? ". . ."
                : "Interview Ended"}
            </span>
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              className="btn-secondary text-sm"
              onClick={simulateNextMessage}
            >
              Simulate Response
            </button>
            <button className="btn-disconnect" onClick={handleDisconnect}>
              End Interview
            </button>
          </div>
        )}
      </div>
    </>
  );
}
