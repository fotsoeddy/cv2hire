import { apiRequest } from "@/lib/api/client";

export const authApi = {
  register: (data: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirm: string;
    accepted_terms_and_policy: boolean;
  }) =>
    apiRequest<{ message: string; user: { id: string; email: string; full_name: string } }>(
      "/api/register/",
      { method: "POST", body: JSON.stringify(data) }
    ),

  login: (data: { email: string; password: string }) =>
    apiRequest<{
      message: string;
      user: { id: number; email: string };
      access: string;
      refresh: string;
    }>("/api/login/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  verifyEmail: (data: { email: string; code: string }) =>
    apiRequest<{ message: string; email: string }>("/api/verify-email/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  resendCode: (email: string) =>
    apiRequest<{ message: string }>("/api/resend-code/", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  forgotPassword: (email: string) =>
    apiRequest<{ message: string }>("/api/forgot-password/", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPasswordConfirm: (data: {
    uidb64: string;
    token: string;
    new_password: string;
    confirm_password: string;
  }) =>
    apiRequest<{ message: string }>("/api/reset-password-confirm/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  googleLogin: (idToken: string) =>
    apiRequest<{
      message: string;
      user: { id: number; email: string };
      access: string;
      refresh: string;
    }>("/api/google-login/", {
      method: "POST",
      body: JSON.stringify({ id_token: idToken }),
    }),
};
