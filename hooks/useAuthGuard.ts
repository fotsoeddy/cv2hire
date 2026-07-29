"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasSession } from "@/lib/auth/session";

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
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!hasSession()) {
      router.replace("/auth/sign-in");
      return;
    }
    setChecked(true);
  }, [router]);

  return checked;
}
