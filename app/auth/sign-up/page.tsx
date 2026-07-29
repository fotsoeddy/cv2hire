"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { authApi, ApiRequestError, type ValidationError } from "@/lib/api-client";
import { PasswordField } from "@/components/ui/PasswordField";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

const STEPS = [
  { title: "Personal Details", subtitle: "Let's start with the basics." },
  { title: "Secure your account", subtitle: "Set a password and review terms." },
] as const;

const LAST_STEP = STEPS.length - 1;

const FIELD_STEP: Record<string, number> = {
  first_name: 0,
  last_name: 0,
  email: 0,
  password: 1,
  password_confirm: 1,
  confirm_password: 1,
  accepted_terms_and_policy: 1,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ValidationError>({});
  const [stepErrors, setStepErrors] = useState<Partial<Record<number, string>>>({});
  const [stepHeight, setStepHeight] = useState<number>();
  const [isDesktop, setIsDesktop] = useState(true);

  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize(); // init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keep the wizard card's height in sync with whichever step is active so
  // shorter steps don't leave a block of empty space below their content.
  useEffect(() => {
    if (isDesktop) {
      setStepHeight(undefined);
      return;
    }
    const el = stepRefs.current[step];
    if (!el) return;

    setStepHeight(el.offsetHeight);
    const observer = new ResizeObserver((entries) => setStepHeight(entries[0].contentRect.height));
    observer.observe(el);
    return () => observer.disconnect();
  }, [step, isDesktop]);

  // Move focus to the new step's first field on navigation, but not on the
  // initial page load (autofocus on mount is jarring, especially on mobile).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isDesktop) return; // Don't manage focus like this on desktop
    const el = stepRefs.current[step];
    el?.querySelector<HTMLElement>("input:not([type=checkbox])")?.focus();
  }, [step, isDesktop]);

  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const clearStepError = (index: number) => {
    setStepErrors((prev) => (prev[index] ? { ...prev, [index]: undefined } : prev));
  };

  const validateStep = (index: number): boolean => {
    if (index === 0) {
      if (!firstName.trim() || !lastName.trim()) {
        setStepErrors((prev) => ({ ...prev, 0: "Please enter your first and last name." }));
        return false;
      }
      if (!EMAIL_RE.test(email.trim())) {
        setStepErrors((prev) => ({ ...prev, 0: "Please enter a valid email address." }));
        return false;
      }
    }
    if (index === 1) {
      if (password.length < 8) {
        setStepErrors((prev) => ({ ...prev, 1: "Password must be at least 8 characters." }));
        return false;
      }
      if (password !== confirmPassword) {
        setStepErrors((prev) => ({ ...prev, 1: "Your passwords do not match. Please try again." }));
        return false;
      }
      if (!acceptedTerms) {
        setStepErrors((prev) => ({ ...prev, 1: "Please accept the Terms of Service and Privacy Policy to continue." }));
        return false;
      }
    }
    clearStepError(index);
    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setError(null);
    setStep((s) => Math.min(s + 1, LAST_STEP));
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isDesktop) {
      if (!validateStep(0)) return;
      if (!validateStep(1)) return;
    } else {
      if (step < LAST_STEP) {
        goNext();
        return;
      }
      if (!validateStep(LAST_STEP)) return;
    }

    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      await authApi.register({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirm: confirmPassword,
        accepted_terms_and_policy: acceptedTerms,
      });

      sessionStorage.setItem("verify_email", email);
      router.push("/auth/verify-email");
    } catch (err) {
      setLoading(false);
      if (err instanceof ApiRequestError) {
        if (err.errors) {
          setFieldErrors(err.errors);
          const erroredStep = Object.keys(err.errors).reduce((min, field) => {
            const fieldStep = FIELD_STEP[field];
            return fieldStep !== undefined && fieldStep < min ? fieldStep : min;
          }, LAST_STEP);
          setStep(erroredStep);
        } else {
          setError(err.message);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGoogleCredential = async (idToken: string) => {
    setGoogleLoading(true);
    setError(null);

    try {
      const response = await authApi.googleLogin(idToken);
      localStorage.setItem("authToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);
      router.push("/dashboard");
    } catch (err) {
      setGoogleLoading(false);
      setError(err instanceof ApiRequestError ? err.message : "Google sign-up failed. Please try again.");
    }
  };

  const busy = loading || googleLoading;

  return (
    <div className="w-full max-w-120 card-border mx-auto">
      <div className="flex flex-col gap-5 card py-6 px-5 sm:py-9 sm:px-8">
        <div className="flex flex-col items-center gap-2">
          <Image src="/logo.png" alt="CV2Hire Logo" width={40} height={40} className="object-contain" priority />
          <h3 className="text-center">Create your account</h3>
          <p className="text-sm text-light-400 text-center">
            Start analyzing your CV and practicing interviews for free.
          </p>
        </div>

        {/* Mobile-only Wizard Progress */}
        <div className="flex flex-col gap-2 md:hidden">
          <div className="wizard-progress">
            {STEPS.map((s, i) => (
              <div key={s.title} className="wizard-progress-segment" data-state={i <= step ? "active" : "idle"}>
                <div className="wizard-progress-segment-fill" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-light-400">
              Step {step + 1} of {STEPS.length}
            </span>
            <span className="text-xs text-light-400">{STEPS[step].title}</span>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-6">
          {isDesktop ? (
            // Desktop View: All fields in a single column
            <div className="flex flex-col gap-6">
              {/* Personal Details */}
              <div className="flex flex-col gap-4">
                <GoogleSignInButton
                  onCredential={handleGoogleCredential}
                  loading={googleLoading}
                  disabled={loading}
                />
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-light-400">OR</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="form-div flex-1">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        clearStepError(0);
                        clearFieldError("first_name");
                      }}
                      autoComplete="given-name"
                      required
                    />
                    {fieldErrors.first_name && (
                      <p className="text-red-500 text-xs mt-1">{fieldErrors.first_name.join(" ")}</p>
                    )}
                  </div>
                  <div className="form-div flex-1">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        clearStepError(0);
                        clearFieldError("last_name");
                      }}
                      autoComplete="family-name"
                      required
                    />
                    {fieldErrors.last_name && (
                      <p className="text-red-500 text-xs mt-1">{fieldErrors.last_name.join(" ")}</p>
                    )}
                  </div>
                </div>
                <div className="form-div">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearStepError(0);
                      clearFieldError("email");
                    }}
                    autoComplete="email"
                    required
                  />
                  {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email.join(" ")}</p>}
                </div>
                {stepErrors[0] && <p className="text-red-500 text-xs">{stepErrors[0]}</p>}
              </div>

              {/* Secure Account */}
              <div className="flex flex-col gap-4">
                <PasswordField
                  id="password"
                  label="Password"
                  placeholder="Create password"
                  value={password}
                  onChange={(v) => {
                    setPassword(v);
                    clearStepError(1);
                    clearFieldError("password");
                  }}
                  error={fieldErrors.password?.join(" ")}
                  autoComplete="new-password"
                />
                
                <PasswordField
                  id="confirmPassword"
                  label="Confirm Password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(v) => {
                    setConfirmPassword(v);
                    clearStepError(1);
                  }}
                  error={fieldErrors.password_confirm?.join(" ") ?? fieldErrors.confirm_password?.join(" ")}
                  autoComplete="new-password"
                />

                <div className="flex items-start gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => {
                      setAcceptedTerms(e.target.checked);
                      clearStepError(1);
                      clearFieldError("accepted_terms_and_policy");
                    }}
                    className="w-4 h-4 mt-0.5 bg-transparent border border-dark-300 dark:border-light-100/50 rounded accent-primary-200"
                  />
                  <label htmlFor="terms" className="text-sm text-dark-300 dark:text-light-100 flex-1">
                    I accept the{" "}
                    <Link href="/terms" className="text-primary-200 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary-200 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                {fieldErrors.accepted_terms_and_policy && (
                  <p className="text-red-500 text-xs">
                    {fieldErrors.accepted_terms_and_policy.join(" ")}
                  </p>
                )}
                {stepErrors[1] && <p className="text-red-500 text-xs">{stepErrors[1]}</p>}
              </div>

              <button type="submit" className="auth-button w-full" disabled={busy}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="size-5 border-2 border-dark-100 border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          ) : (
            // Mobile View: Wizard Form
            <div className="flex flex-col gap-6">
              <div 
                className="relative overflow-hidden" 
                style={{ height: stepHeight }}
              >
                <div 
                  className="flex flex-row transition-transform duration-300" 
                  style={{ transform: `translateX(-${step * 100}%)` }}
                >
                  {/* Step 1: Personal Details */}
                  <div
                    ref={(el) => {
                      stepRefs.current[0] = el;
                    }}
                    className="w-full shrink-0 flex flex-col gap-4 pr-0.5"
                    style={{ visibility: step === 0 ? "visible" : "hidden" }}
                  >
                    <GoogleSignInButton
                      onCredential={handleGoogleCredential}
                      loading={googleLoading}
                      disabled={loading}
                    />

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-xs text-light-400">OR</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <h4 className="text-base font-semibold text-white">{STEPS[0].title}</h4>
                      <p className="text-sm text-light-400">{STEPS[0].subtitle}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="form-div flex-1">
                        <label htmlFor="firstNameMobile">First Name</label>
                        <input
                          id="firstNameMobile"
                          type="text"
                          placeholder="First name"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            clearStepError(0);
                            clearFieldError("first_name");
                          }}
                          autoComplete="given-name"
                          required
                        />
                        {fieldErrors.first_name && (
                          <p className="text-red-500 text-xs mt-1">{fieldErrors.first_name.join(" ")}</p>
                        )}
                      </div>
                      <div className="form-div flex-1">
                        <label htmlFor="lastNameMobile">Last Name</label>
                        <input
                          id="lastNameMobile"
                          type="text"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            clearStepError(0);
                            clearFieldError("last_name");
                          }}
                          autoComplete="family-name"
                          required
                        />
                        {fieldErrors.last_name && (
                          <p className="text-red-500 text-xs mt-1">{fieldErrors.last_name.join(" ")}</p>
                        )}
                      </div>
                    </div>

                    <div className="form-div">
                      <label htmlFor="emailMobile">Email Address</label>
                      <input
                        id="emailMobile"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearStepError(0);
                          clearFieldError("email");
                        }}
                        autoComplete="email"
                        required
                      />
                      {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email.join(" ")}</p>}
                    </div>
                    {stepErrors[0] && <p className="text-red-500 text-xs">{stepErrors[0]}</p>}
                  </div>

                  {/* Step 2: Secure Account */}
                  <div
                    ref={(el) => {
                      stepRefs.current[1] = el;
                    }}
                    className="w-full shrink-0 flex flex-col gap-4 pr-0.5"
                    style={{ visibility: step === 1 ? "visible" : "hidden" }}
                  >
                    <div className="flex flex-col gap-1">
                      <h4 className="text-base font-semibold text-white">{STEPS[1].title}</h4>
                      <p className="text-sm text-light-400">{STEPS[1].subtitle}</p>
                    </div>
                    
                    <PasswordField
                      id="passwordMobile"
                      label="Password"
                      placeholder="Create password"
                      value={password}
                      onChange={(v) => {
                        setPassword(v);
                        clearStepError(1);
                        clearFieldError("password");
                      }}
                      error={fieldErrors.password?.join(" ")}
                      autoComplete="new-password"
                    />
                    
                    <PasswordField
                      id="confirmPasswordMobile"
                      label="Confirm Password"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(v) => {
                        setConfirmPassword(v);
                        clearStepError(1);
                      }}
                      error={fieldErrors.password_confirm?.join(" ") ?? fieldErrors.confirm_password?.join(" ")}
                      autoComplete="new-password"
                    />

                    <div className="flex items-start gap-2 mt-2">
                      <input
                        type="checkbox"
                        id="termsMobile"
                        checked={acceptedTerms}
                        onChange={(e) => {
                          setAcceptedTerms(e.target.checked);
                          clearStepError(1);
                          clearFieldError("accepted_terms_and_policy");
                        }}
                        className="w-4 h-4 mt-0.5 bg-transparent border border-dark-300 dark:border-light-100/50 rounded accent-primary-200"
                      />
                      <label htmlFor="termsMobile" className="text-sm text-dark-300 dark:text-light-100 flex-1">
                        I accept the{" "}
                        <Link href="/terms" className="text-primary-200 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary-200 hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    
                    {fieldErrors.accepted_terms_and_policy && (
                      <p className="text-red-500 text-xs">
                        {fieldErrors.accepted_terms_and_policy.join(" ")}
                      </p>
                    )}
                    {stepErrors[1] && <p className="text-red-500 text-xs">{stepErrors[1]}</p>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={busy}
                    aria-label="Go back"
                    className="btn-secondary !w-12 !min-h-12 !p-0 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                )}
                
                <button type="submit" className="auth-button flex-1" disabled={busy}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="size-5 border-2 border-dark-100 border-t-transparent rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : step === LAST_STEP ? (
                    "Create Account"
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      Continue
                      <ChevronRight className="size-4" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-bold text-primary-200 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
