"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { clearSession, getSessionUser } from "@/lib/auth/session";
import { NAV_GROUPS, isNavItemActive } from "@/components/layout/nav-config";

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getSessionUser()?.email ?? null);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSignOut = () => {
    clearSession();
    setOpen(false);
    router.push("/auth/sign-in");
  };

  return (
    <div className="lg:hidden">
      {/* Fixed top bar */}
      <div className="fixed top-0 left-0 right-0 z-100 dark-gradient border-b border-border flex items-center justify-between px-4 py-2">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/logo.png"
            alt="CV2Hire Logo"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className={cn(
            "flex-center size-8 rounded-lg text-white transition-colors",
            open ? "bg-white/10" : "bg-transparent"
          )}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-90 bg-black/60 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Side drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 z-110 w-[280px] dark-gradient border-r border-border p-6 flex flex-col transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="CV2Hire Logo"
            width={90}
            height={30}
            className="object-contain"
          />
        </div>

        <nav className="flex flex-col gap-5 flex-1 overflow-y-auto no-scrollbar">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-1">
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-light-600">
                {group.label}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isNavItemActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn("sidebar-link", active && "sidebar-link-active")}
                  >
                    <Icon className="size-[18px]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="border-t border-border pt-4 mt-4">
          {email && (
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="size-9 rounded-full bg-primary-200/20 flex-center flex-shrink-0">
                <span className="text-primary-200 text-sm font-bold uppercase">
                  {email.charAt(0)}
                </span>
              </div>
              <p className="text-sm text-white font-medium truncate">{email}</p>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="sidebar-link text-destructive-100 hover:bg-destructive-100/10 w-full"
          >
            <LogOut className="size-[18px]" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
