import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="navbar border-b border-border">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="CV2Hire Logo"
          width={120}
          height={40}
          className="object-contain"
          priority
        />
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/auth/sign-in" className="btn-ghost text-sm">
          Sign In
        </Link>
        <Link href="/auth/sign-up" className="btn-primary text-sm">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
