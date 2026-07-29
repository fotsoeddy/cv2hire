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

export function getSessionUser(): SessionUser | null {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
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
