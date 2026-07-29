const ACCESS_TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "authUser";

export interface SessionUser {
  id: string | number;
  email: string;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

// Cache the parsed user keyed on the raw string so repeated calls with
// unchanged localStorage content return the same object reference —
// required for useSyncExternalStore (hooks/useSessionUser.ts), which
// treats a new reference on every call as the store changing forever.
let cachedRawUser: string | null = null;
let cachedUser: SessionUser | null = null;

export function getSessionUser(): SessionUser | null {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(USER_KEY);
  if (raw === cachedRawUser) return cachedUser;

  cachedRawUser = raw;
  if (!raw) {
    cachedUser = null;
    return null;
  }
  try {
    cachedUser = JSON.parse(raw) as SessionUser;
  } catch {
    cachedUser = null;
  }
  return cachedUser;
}

export function setSession(params: {
  access: string;
  refresh: string;
  user?: SessionUser;
}): void {
  if (!isBrowser()) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, params.access);
  localStorage.setItem(REFRESH_TOKEN_KEY, params.refresh);
  if (params.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(params.user));
  }
}

export function setAccessToken(access: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
}

export function clearSession(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function hasSession(): boolean {
  return Boolean(getAccessToken() || getRefreshToken());
}
