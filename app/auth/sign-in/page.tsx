"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Placeholder: will connect to Django REST auth later
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="card-border lg:min-w-[520px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <div className="size-9 rounded-lg primary-gradient flex-center">
            <span className="text-white font-bold text-sm">C2</span>
          </div>
          <h2 className="text-xl font-bold text-primary-100">CV2Hire</h2>
        </div>

        <h3 className="text-center">Welcome back</h3>

        <form onSubmit={handleSignIn} className="w-full space-y-5 mt-4">
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
