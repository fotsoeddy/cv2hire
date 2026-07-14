"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
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

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length < 6) return;
    
    setLoading(true);
    // Placeholder: NO API CALL per user request
    setTimeout(() => {
      setLoading(false);
      router.push("/auth/sign-in");
    }, 800);
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
          We&apos;ve sent a 6-digit code to your email. Enter it below to verify your account.
        </p>

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
          <button type="button" className="font-bold text-primary-200 hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
