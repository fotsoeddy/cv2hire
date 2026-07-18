"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authApi, ApiRequestError, type ValidationError } from "@/lib/api-client";

interface Props {
  params: Promise<{
    uid: string;
    token: string;
  }>;
}

export default function ResetPasswordConfirmPage({ params }: Props) {
  const router = useRouter();
  const { uid: uidb64, token } = use(params);
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ValidationError>({});

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFieldErrors({ confirm_password: ["Passwords do not match."] });
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    setFieldErrors({});

    try {
      await authApi.resetPasswordConfirm({
        uidb64,
        token,
        new_password: password,
        confirm_password: confirmPassword,
      });

      setSuccess("Your password has been reset successfully. Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 2000);
    } catch (err) {
      setLoading(false);
      if (err instanceof ApiRequestError) {
        if (err.errors) {
          setFieldErrors(err.errors);
        } else {
          setError(err.message);
        }
      } else {
        setError("Failed to reset password. The link might be invalid or expired.");
      }
    }
  };

  return (
    <div className="auth-layout pattern">
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

          {error && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-500 text-sm rounded-xl text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleReset} className="w-full space-y-5 mt-2">
            <div className="form-div">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {fieldErrors.new_password && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.new_password.join(" ")}</p>
              )}
            </div>

            <div className="form-div">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {fieldErrors.confirm_password && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.confirm_password.join(" ")}</p>
              )}
            </div>

            <button type="submit" className="auth-button" disabled={loading || !!success}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="text-center text-sm">
            Remember your password?{" "}
            <Link href="/auth/sign-in" className="font-bold text-primary-200 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
