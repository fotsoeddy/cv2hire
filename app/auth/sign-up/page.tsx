"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Please accept the Terms of Service and Privacy Policy to continue.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Your passwords do not match. Please try again.");
      return;
    }
    
    setLoading(true);
    // Placeholder: NO API CALL per user request
    setTimeout(() => {
      setLoading(false);
      router.push("/auth/verify-email");
    }, 800);
  };

  return (
    <div className="w-full max-w-[560px] card-border">
      <div className="flex flex-col gap-4 card py-6 px-4 sm:py-10 sm:px-8">
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

        <h3 className="text-center">Create your account</h3>

        <form onSubmit={handleSignUp} className="w-full space-y-4 mt-2">
          <div className="flex gap-3">
            <div className="form-div flex-1">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-div flex-1">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-div">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3">
            <div className="form-div flex-1">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-div flex-1">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-4 h-4 bg-transparent border border-dark-300 dark:border-light-100/50 rounded accent-primary-200"
            />
            <label htmlFor="terms" className="text-sm text-dark-300 dark:text-light-100 flex-1">
              I accept the <span className="text-primary-200">Terms of Service</span> and <span className="text-primary-200">Privacy Policy</span>
            </label>
          </div>

          <button type="submit" className="auth-button mt-2" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          
          <div className="flex items-center my-4">
            <div className="flex-1 h-[1px] bg-black/10 dark:bg-white/10" />
            <span className="px-4 text-dark-300 dark:text-light-100 text-xs">OR</span>
            <div className="flex-1 h-[1px] bg-black/10 dark:bg-white/10" />
          </div>

          <div className="flex gap-3">
            <button type="button" className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
              <span className="text-sm font-semibold">Google</span>
            </button>
            <button type="button" className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
              <span className="text-sm font-semibold">GitHub</span>
            </button>
          </div>

        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-bold text-primary-200 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
