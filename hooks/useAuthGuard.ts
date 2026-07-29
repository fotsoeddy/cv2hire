"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { hasSession } from "@/lib/auth/session";

function subscribe(): () => void {
  return () => {};
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Client-side route guard. Tokens live in localStorage (not cookies), so
 * Next.js middleware can't see them — real edge-level protection would
 * need a bigger auth-storage change. This is the pragmatic equivalent:
 * redirect before rendering protected content if no session exists at
 * all. An actually-expired-but-present token is still caught later, by
 * the first authenticated request's 401 -> refresh -> redirect flow in
 * lib/api/client.ts.
 */
export function useAuthGuard() {
  const router = useRouter();
  const authorized = useSyncExternalStore(subscribe, hasSession, getServerSnapshot);

  useEffect(() => {
    if (!authorized) {
      router.replace("/auth/sign-in");
    }
  }, [authorized, router]);

  return authorized;
}
