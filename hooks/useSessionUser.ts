"use client";

import { useSyncExternalStore } from "react";
import { getSessionUser, type SessionUser } from "@/lib/auth/session";

function subscribe(): () => void {
  // The session is only ever written by this tab's own login/logout
  // actions, which already trigger a re-render via navigation — no
  // external change events to subscribe to.
  return () => {};
}

function getServerSnapshot(): SessionUser | null {
  return null;
}

/** Reads the cached {id, email} from the logged-in session, hydration-safe. */
export function useSessionUser(): SessionUser | null {
  return useSyncExternalStore(subscribe, getSessionUser, getServerSnapshot);
}
