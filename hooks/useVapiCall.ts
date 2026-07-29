"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getVapiClient, VapiConfigError } from "@/lib/vapi/client";

export type VapiCallStatus = "idle" | "connecting" | "active" | "ended" | "error";

export interface TranscriptEntry {
  role: "user" | "assistant";
  content: string;
}

interface VapiTranscriptMessage {
  type: string;
  role?: "user" | "assistant";
  transcriptType?: "partial" | "final";
  transcript?: string;
}

interface StartParams {
  assistantId: string;
  variableValues: Record<string, unknown>;
}

const MISSING_KEY_MESSAGE =
  "Voice interviews aren't configured yet — NEXT_PUBLIC_VAPI_PUBLIC_KEY is missing.";

function hasVapiPublicKey(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
}

function describeStartError(err: unknown): string {
  if (err instanceof VapiConfigError) return err.message;
  if (err instanceof DOMException && err.name === "NotAllowedError") {
    return "Microphone access was denied. Allow microphone access and try again.";
  }
  if (err instanceof Error) return err.message;
  return "Could not start the call. Check your connection and try again.";
}

export function useVapiCall() {
  const [status, setStatus] = useState<VapiCallStatus>(() =>
    hasVapiPublicKey() ? "idle" : "error"
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [error, setError] = useState<string | null>(() =>
    hasVapiPublicKey() ? null : MISSING_KEY_MESSAGE
  );
  const lastParamsRef = useRef<StartParams | null>(null);

  // Mirrors `status` for the unmount-cleanup effect below, which needs the
  // latest value without re-subscribing to Vapi events on every change.
  const statusRef = useRef(status);
  useEffect(() => {
    statusRef.current = status;
  });

  // Subscribe to the Vapi client's events for this component's lifetime.
  // If the public key is missing, `hasVapiPublicKey()` already gated the
  // error into the initial state above — nothing to subscribe to here.
  useEffect(() => {
    if (!hasVapiPublicKey()) return;
    const vapi = getVapiClient();

    const handleCallStart = () => setStatus("active");
    const handleCallEnd = () => setStatus("ended");
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);
    const handleMessage = (message: VapiTranscriptMessage) => {
      if (
        message.type === "transcript" &&
        message.transcriptType === "final" &&
        message.role &&
        message.transcript
      ) {
        setTranscript((prev) => [
          ...prev,
          { role: message.role as "user" | "assistant", content: message.transcript as string },
        ]);
      }
    };
    const handleError = (err: unknown) => {
      setError(describeStartError(err));
      setStatus("error");
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("message", handleMessage);
    vapi.on("error", handleError);

    return () => {
      vapi.removeListener("call-start", handleCallStart);
      vapi.removeListener("call-end", handleCallEnd);
      vapi.removeListener("speech-start", handleSpeechStart);
      vapi.removeListener("speech-end", handleSpeechEnd);
      vapi.removeListener("message", handleMessage);
      vapi.removeListener("error", handleError);
    };
  }, []);

  const start = useCallback(async (params: StartParams) => {
    lastParamsRef.current = params;
    setError(null);
    setTranscript([]);
    setStatus("connecting");
    try {
      const vapi = getVapiClient();
      await vapi.start(params.assistantId, { variableValues: params.variableValues });
    } catch (err) {
      setError(describeStartError(err));
      setStatus("error");
    }
  }, []);

  const stop = useCallback(() => {
    try {
      getVapiClient().stop();
    } catch {
      // Not configured or already stopped — nothing to clean up.
    }
  }, []);

  const retry = useCallback(() => {
    if (lastParamsRef.current) {
      start(lastParamsRef.current);
    }
  }, [start]);

  // Make sure a call doesn't keep running in the background if the user
  // navigates away from the interview page mid-call.
  useEffect(() => {
    return () => {
      if (statusRef.current === "active" || statusRef.current === "connecting") {
        stop();
      }
    };
  }, [stop]);

  return { status, isSpeaking, transcript, error, start, stop, retry };
}
