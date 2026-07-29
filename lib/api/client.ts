import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "@/lib/auth/session";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type ValidationError = Record<string, string[]>;

export class ApiRequestError extends Error {
  status: number;
  errors?: ValidationError;
  detail?: string;

  constructor(status: number, message: string, errors?: ValidationError, detail?: string) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.detail = detail;
  }
}

export interface ApiRequestOptions extends RequestInit {
  /** Attach the access token and enable refresh-on-401 handling. */
  auth?: boolean;
}

// Shared across concurrent requests so a wave of parallel 401s triggers
// exactly one refresh call instead of one per request.
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  let response: Response;
  try {
    response = await fetch(`${BASE_URL.replace(/\/$/, "")}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
  } catch {
    return null;
  }

  if (!response.ok) return null;

  const data = (await response.json().catch(() => null)) as { access?: string } | null;
  if (!data?.access) return null;

  setAccessToken(data.access);
  return data.access;
}

function redirectToSignIn(): void {
  clearSession();
  if (typeof window !== "undefined") {
    window.location.href = "/auth/sign-in";
  }
}

async function parseErrorResponse(response: Response): Promise<never> {
  let errorData: unknown = null;
  try {
    errorData = await response.json();
  } catch {
    throw new ApiRequestError(response.status, "Server error. Please try again.");
  }

  if (response.status === 400 && typeof errorData === "object" && errorData !== null) {
    const errObj = errorData as Record<string, unknown>;
    if ("detail" in errObj) {
      const detailVal = errObj.detail;
      const detail = Array.isArray(detailVal)
        ? detailVal.join(" ")
        : typeof detailVal === "string"
        ? detailVal
        : JSON.stringify(detailVal);
      throw new ApiRequestError(response.status, detail, undefined, detail);
    }
    throw new ApiRequestError(response.status, "Validation failed", errorData as ValidationError);
  }

  const errObj = errorData as Record<string, unknown> | null;
  const detailMsg = errObj?.detail || errObj?.message || "An error occurred.";
  const displayMsg = Array.isArray(detailMsg)
    ? detailMsg.join(" ")
    : typeof detailMsg === "string"
    ? detailMsg
    : JSON.stringify(detailMsg);
  throw new ApiRequestError(
    response.status,
    displayMsg,
    undefined,
    typeof detailMsg === "string" ? detailMsg : undefined
  );
}

async function parseSuccessResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) return {} as T;
  const text = await response.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return {} as T;
  }
}

async function performRequest<T>(
  path: string,
  options: RequestInit,
  auth: boolean,
  isRetry: boolean
): Promise<T> {
  const url = `${BASE_URL.replace(/\/$/, "")}${path}`;
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (auth) {
    const token = getAccessToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, { ...options, headers: requestHeaders });

  if (response.status === 401 && auth) {
    if (isRetry) {
      redirectToSignIn();
      throw new ApiRequestError(401, "Session expired. Please sign in again.");
    }

    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }
    const newAccess = await refreshPromise;

    if (!newAccess) {
      redirectToSignIn();
      throw new ApiRequestError(401, "Session expired. Please sign in again.");
    }

    return performRequest<T>(path, options, auth, true);
  }

  if (!response.ok) {
    return parseErrorResponse(response);
  }

  return parseSuccessResponse<T>(response);
}

/**
 * Core request helper. Pass `auth: true` for endpoints that require a
 * logged-in user — this attaches the bearer token and transparently
 * refreshes/retries once on a 401, or redirects to sign-in if the session
 * can't be recovered.
 */
export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { auth = false, ...rest } = options;

  if (auth && !getAccessToken() && !getRefreshToken()) {
    redirectToSignIn();
    throw new ApiRequestError(401, "Not authenticated.");
  }

  return performRequest<T>(path, rest, auth, false);
}
