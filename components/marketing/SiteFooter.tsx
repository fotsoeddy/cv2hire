import Link from "next/link";
import Image from "next/image";
import { Mail, Code2 } from "lucide-react";

const productLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "AI Voice Interview", href: "/#voice-interview" },
  { label: "CV Analysis", href: "/#cv-analysis" },
  { label: "Pricing", href: "/#pricing" },
];

const accountLinks = [
  { label: "Sign In", href: "/auth/sign-in" },
  { label: "Sign Up", href: "/auth/sign-up" },
  { label: "Dashboard", href: "/dashboard" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border w-full">
      <div className="max-w-[80rem] w-full mx-auto px-4 sm:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Image src="/logo.png" alt="CV2Hire Logo" width={32} height={32} className="object-contain" />
              <span className="text-base font-semibold text-white">CV2Hire</span>
            </Link>
            <p className="text-sm text-light-400 max-w-sm leading-relaxed">
              AI-powered CV analysis and voice mock interviews, all in one platform —
              built to help you walk into every application job-ready.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="mailto:support@cv2hire.app"
                aria-label="Email CV2Hire support"
                className="size-9 rounded-full bg-white/5 flex-center text-light-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Mail className="size-4" />
              </a>
              <a
                href="https://github.com/fotsoeddy/cv2hire"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub"
                className="size-9 rounded-full bg-white/5 flex-center text-light-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Code2 className="size-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white">Product</h3>
            {productLinks.map((l) => (
              <Link key={l.label} href={l.href} className="text-sm text-light-400 hover:text-white transition-colors w-fit">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white">Account</h3>
            {accountLinks.map((l) => (
              <Link key={l.label} href={l.href} className="text-sm text-light-400 hover:text-white transition-colors w-fit">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white">Legal</h3>
            {legalLinks.map((l) => (
              <Link key={l.label} href={l.href} className="text-sm text-light-400 hover:text-white transition-colors w-fit">
                {l.label}
              </Link>
            ))}
            <a href="mailto:support@cv2hire.app" className="text-sm text-light-400 hover:text-white transition-colors w-fit">
              Contact Us
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-light-400">© 2026 CV2Hire. All rights reserved.</p>
          <p className="text-xs text-light-400/70">Made for job seekers, by job seekers.</p>
        </div>
      </div>
    </footer>
  );
}
