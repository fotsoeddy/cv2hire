"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi, ApiRequestError, type ValidationError } from "@/lib/api-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ValidationError>({});

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await authApi.login({ email, password });
      
      // Save tokens
      localStorage.setItem("authToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setLoading(false);
      if (err instanceof ApiRequestError) {
        // If unverified, save email and redirect to verification page
        if (err.message && err.message.toLowerCase().includes("not verified")) {
          sessionStorage.setItem("verify_email", email);
          router.push("/auth/verify-email");
          return;
        }

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

        <h3 className="text-center">Welcome back</h3>

        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="w-full space-y-5 mt-2">
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

          <div className="form-div">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.password.join(" ")}</p>
            )}
          </div>

          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-sm text-primary-200 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="font-bold text-primary-200 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

