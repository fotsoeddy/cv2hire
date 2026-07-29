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
 *
 * This deliberately checks `hasSession()` inside the effect rather than
 * via a lazy `useState`/`useSyncExternalStore` initializer: those run
 * during the SSR/first-paint render, before localStorage exists, so
 * they'd always see "no session" and redirect every logged-in user on
 * refresh. Only an effect (client-only, post-mount) reads the real value.
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
