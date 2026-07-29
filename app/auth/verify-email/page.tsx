"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { ApiRequestError } from "@/lib/api/client";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("verify_email") || "";
      const search = new URLSearchParams(window.location.search).get("email") || "";
      return stored || search;
    }
    return "";
  });
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Allow only numbers
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous on backspace if empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length < 6) return;
    
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await authApi.verifyEmail({ email, code: fullCode });
      setSuccessMessage("Email verified successfully! Redirecting to sign in...");
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 1500);
    } catch (err) {
      setLoading(false);
      if (err instanceof ApiRequestError) {
        setError(err.message);
      } else {
        setError("Invalid code or connection issue.");
      }
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("No email specified. Please register first.");
      return;
    }
    setResending(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await authApi.resendCode(email);
      setSuccessMessage(response.message || "Verification code resent successfully.");
      setResending(false);
    } catch (err) {
      setResending(false);
      if (err instanceof ApiRequestError) {
        setError(err.message);
      } else {
        setError("Failed to resend code. Please try again.");
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

        <h3 className="text-center">Verify your email</h3>
        <p className="text-sm text-light-400 text-center">
          We&apos;ve sent a 6-digit code to <strong className="text-white">{email || "your email"}</strong>. Enter it below to verify your account.
        </p>

        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-500 text-sm rounded-xl text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleVerify} className="w-full space-y-6 mt-2">
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl bg-dark-100/50 border border-white/10 rounded-lg text-white focus:border-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-200 transition-all"
                required
              />
            ))}
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading || code.some(d => d === "")}
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <p className="text-center text-sm">
          Didn&apos;t receive the code?{" "}
          <button 
            type="button" 
            onClick={handleResend}
            disabled={resending || !email}
            className="font-bold text-primary-200 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resending ? "Resending..." : "Resend"}
          </button>
        </p>
      </div>
    </div>
  );
}

