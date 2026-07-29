"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { authApi } from "@/lib/api/auth";
import { ApiRequestError, type ValidationError } from "@/lib/api/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ValidationError>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      await authApi.forgotPassword(email);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      if (err instanceof ApiRequestError) {
        if (err.errors) {
          setFieldErrors(err.errors);
        } else {
          setError(err.message);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-[520px] card-border">
      <div className="flex flex-col gap-6 card py-10 px-6 sm:py-14 sm:px-10">
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.png"
            alt="CV2Hire Logo"
            width={100}
            height={32}
            className="object-contain"
            priority
          />
        </div>

        <h3 className="text-center">Reset your password</h3>

        {submitted ? (
          <div className="text-center space-y-4 mt-4">
            <div className="size-16 rounded-full bg-success-100/10 flex-center mx-auto bg-green-500/10 border border-green-500/20">
              <span className="text-green-500 text-3xl">✓</span>
            </div>
            <p className="text-light-100">
              If an account exists with <strong className="text-white">{email}</strong>,
              you&apos;ll receive a password reset link shortly.
            </p>
            <Link href="/auth/sign-in" className="btn-primary inline-block mt-4">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-5 mt-4">
            <p className="text-sm text-light-400 text-center">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>

            {error && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="form-div">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.email.join(" ")}</p>
              )}
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            
            <p className="text-center text-sm">
              <Link href="/auth/sign-in" className="text-primary-200 hover:underline">
                Back to Sign In
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

