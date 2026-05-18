"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: will connect to Django REST auth later
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-[520px] card-border">
      <div className="flex flex-col gap-6 card py-10 px-6 sm:py-14 sm:px-10">
        <div className="flex flex-row gap-2 justify-center">
          <div className="size-9 rounded-lg primary-gradient flex-center">
            <span className="text-white font-bold text-sm">C2</span>
          </div>
          <h2 className="text-xl font-bold text-primary-100">CV2Hire</h2>
        </div>

        <h3 className="text-center">Reset your password</h3>

        {submitted ? (
          <div className="text-center space-y-4 mt-4">
            <div className="size-16 rounded-full bg-success-100/10 flex-center mx-auto">
              <span className="text-success-100 text-3xl">✓</span>
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
            </div>
            <button type="submit" className="auth-button">
              Send Reset Link
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
