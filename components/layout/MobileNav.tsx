"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  CreditCard,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Image from "next/image";
import { mockUser } from "@/constants/mock-data";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  FileText,
  Briefcase,
  CreditCard,
  Settings,
};

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "CV Analyzer", href: "/dashboard/cv/upload", icon: "FileText" },
  { label: "Jobs", href: "/dashboard/jobs", icon: "Briefcase" },
  { label: "Pricing", href: "/dashboard/pricing", icon: "CreditCard" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Fixed Top Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "linear-gradient(to bottom, #1A1C20, #08090D)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
        }}
      >
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
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary-200/10 border border-primary-200/20">
            <CreditCard className="size-3.5 text-primary-200" />
            <span className="text-xs font-bold text-primary-100">{mockUser.credits}</span>
          </div>
          <button
            onClick={() => {
              console.log("Burger clicked", !open);
              setOpen(!open);
            }}
            type="button"
            aria-label="Toggle menu"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              color: "white",
              background: open ? "rgba(255,255,255,0.1)" : "transparent",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              zIndex: 101,
              position: "relative",
            }}
          >
            {open ? (
              <X className="size-5" />
            ) : (
              <div className="flex flex-col gap-1 items-end">
                <div className="w-5 h-0.5 bg-white rounded-full" />
                <div className="w-3 h-0.5 bg-white rounded-full" />
                <div className="w-5 h-0.5 bg-white rounded-full" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => {
            console.log("Overlay clicked, closing");
            setOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 90,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* Side Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 110,
          width: "280px",
          background: "linear-gradient(to bottom, #1A1C20, #08090D)",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s ease-in-out",
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "3rem", display: "flex", justifyContent: "center" }}>
          <Image
            src="/logo.png"
            alt="CV2Hire Logo"
            width={90}
            height={30}
            className="object-contain"
          />
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "sidebar-link",
                  isActive && "sidebar-link-active"
                )}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Log Out */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", marginTop: "auto" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-full bg-primary-200/20 flex-center">
              <span className="text-primary-200 text-sm font-bold">
                {mockUser.name.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-white font-medium truncate">{mockUser.name}</p>
              <p className="text-xs text-light-400">{mockUser.credits} credits</p>
            </div>
          </div>
          <Link
            href="/auth/sign-in"
            onClick={() => setOpen(false)}
            className="sidebar-link text-destructive-100 hover:bg-destructive-100/10"
          >
            <LogOut className="size-5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
