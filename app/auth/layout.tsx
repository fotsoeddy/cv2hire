import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout pattern relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[36rem] rounded-full bg-primary-200/10 blur-3xl"
      />

      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-light-400 hover:text-white transition-colors z-10"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>

      <div className="relative z-10 w-full flex justify-center">{children}</div>
    </div>
  );
}
