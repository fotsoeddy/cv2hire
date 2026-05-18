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
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

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
          padding: "0.75rem 1rem",
        }}
      >
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/logo.png"
            alt="CV2Hire Logo"
            width={110}
            height={36}
            className="object-contain"
            priority
          />
        </Link>
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
            width: "48px",
            height: "48px",
            color: "white",
            background: open ? "rgba(255,255,255,0.1)" : "transparent",
            border: "none",
            borderRadius: "0.75rem",
            cursor: "pointer",
            zIndex: 101,
            position: "relative",
          }}
        >
          {open ? (
            <X className="size-8" />
          ) : (
            <div className="flex flex-col gap-1.5 items-end">
              <div className="w-8 h-1 bg-white rounded-full" />
              <div className="w-6 h-1 bg-white rounded-full" />
              <div className="w-8 h-1 bg-white rounded-full" />
            </div>
          )}
        </button>
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
            width={160}
            height={50}
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

        {/* User Info */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", marginTop: "auto" }}>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary-200/20 flex-center">
              <span className="text-primary-200 text-sm font-bold">E</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-white font-medium truncate">Eddy</p>
              <p className="text-xs text-light-400">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
