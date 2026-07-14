import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

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
              className="object-contain"
            />
          </Link>
          <p className="text-light-400 text-sm mt-2 max-w-xs">
            Empowering job seekers with AI-driven CV analysis, motivation letters, and mock interviews. Land your dream job faster.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="text-light-400 hover:text-primary-200 transition-colors">
              <Twitter className="size-5" />
            </a>
            <a href="#" className="text-light-400 hover:text-primary-200 transition-colors">
              <Linkedin className="size-5" />
            </a>
            <a href="#" className="text-light-400 hover:text-primary-200 transition-colors">
              <Github className="size-5" />
            </a>
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Product</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/cv-builder" className="text-light-400 hover:text-primary-200 text-sm transition-colors">CV Builder</Link></li>
            <li><Link href="/ats-score" className="text-light-400 hover:text-primary-200 text-sm transition-colors">ATS Matching</Link></li>
            <li><Link href="/voice-agent" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Mock Interviews</Link></li>
            <li><Link href="/pricing" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Pricing</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/about" className="text-light-400 hover:text-primary-200 text-sm transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Blog</Link></li>
            <li><Link href="/careers" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="text-light-400 hover:text-primary-200 text-sm transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="flex flex-col gap-3">
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
