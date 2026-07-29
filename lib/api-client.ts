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

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL.replace(/\/$/, "")}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
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
    throw new ApiRequestError(response.status, displayMsg, undefined, typeof detailMsg === "string" ? detailMsg : undefined);
  }

  // Handle successful empty messages (e.g. 200 OK with empty body or 204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return {} as T;
  }
}

export const authApi = {
  register: (data: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirm: string;
    accepted_terms_and_policy: boolean;
  }) => request<{ message: string; user: { id: string; email: string; full_name: string } }>("/api/register/", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  login: (data: { email: string; password: string }) =>
    request<{
      message: string;
      user: { id: number; email: string };
      access: string;
      refresh: string;
    }>("/api/login/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  verifyEmail: (data: { email: string; code: string }) =>
    request<{ message: string; email: string }>("/api/verify-email/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  resendCode: (email: string) =>
    request<{ message: string }>("/api/resend-code/", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  forgotPassword: (email: string) =>
    request<{ message: string }>("/api/forgot-password/", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPasswordConfirm: (data: {
    uidb64: string;
    token: string;
    new_password: string;
    confirm_password: string;
  }) =>
    request<{ message: string }>("/api/reset-password-confirm/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  googleLogin: (idToken: string) =>
    request<{
      message: string;
      user: { id: number; email: string };
      access: string;
      refresh: string;
    }>("/api/google-login/", {
      method: "POST",
      body: JSON.stringify({ id_token: idToken }),
    }),
};
