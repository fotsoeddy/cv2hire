import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black/80 border-t border-white/5 py-12 md:py-16 px-6">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="CV2Hire Logo"
              width={100}
              height={32}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />
          </Link>
          <p className="text-light-400 text-sm mt-2 max-w-xs">
            Empowering job seekers with AI-driven CV analysis, motivation letters, and mock interviews. Land your dream job faster.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="text-light-400 hover:text-primary-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" className="text-light-400 hover:text-primary-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" className="text-light-400 hover:text-primary-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Product</h4>
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            <li><Link href="/cv-builder" className="text-light-400 hover:text-primary-200 text-sm transition-colors">CV Builder</Link></li>
            <li><Link href="/ats-score" className="text-light-400 hover:text-primary-200 text-sm transition-colors">ATS Matching</Link></li>
            <li><Link href="/voice-agent" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Mock Interviews</Link></li>
            <li><Link href="/pricing" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Pricing</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            <li><Link href="/about" className="text-light-400 hover:text-primary-200 text-sm transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Blog</Link></li>
            <li><Link href="/careers" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            <li><Link href="/privacy" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Terms of Service</Link></li>
            <li><Link href="/cookies" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-6xl mx-auto w-full mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-light-400">
          © {new Date().getFullYear()} CV2Hire. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-sm text-light-400">
          <span>Built with</span>
          <span className="text-red-500">♥</span>
          <span>for job seekers</span>
        </div>
      </div>
    </footer>
  );
}
