import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  return (
    <div className="navbar-shell">
      <nav className="navbar">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="CV2Hire Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <span className="text-base font-semibold tracking-tight text-white">
            CV2Hire
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-light-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/auth/sign-in" className="btn-ghost text-sm">
            Sign In
          </Link>
          <Link href="/auth/sign-up" className="btn-primary text-xs px-4">
            Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
}
