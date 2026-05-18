import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar border-b border-border">
      <Link href="/" className="flex items-center gap-2">
        <div className="size-9 rounded-lg primary-gradient flex-center">
          <span className="text-white font-bold text-sm">C2</span>
        </div>
        <h2 className="text-xl font-bold text-primary-100">CV2Hire</h2>
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
