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
import { useState } from "react";

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

  return (
    <div className="lg:hidden">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-[80] dark-gradient border-b border-border flex items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="size-8 rounded-lg primary-gradient flex-center">
            <span className="text-white font-bold text-xs">C2</span>
          </div>
          <span className="text-lg font-bold text-primary-100">CV2Hire</span>
        </Link>
        <button 
          onClick={() => setOpen(!open)} 
          className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          type="button"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Drawer Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      {/* Side Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 z-[100] w-[280px] dark-gradient border-r border-border p-6 transition-transform duration-300 ease-in-out flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-2 mb-10">
          <div className="size-9 rounded-lg primary-gradient flex-center">
            <span className="text-white font-bold text-sm">C2</span>
          </div>
          <span className="text-xl font-bold text-primary-100">CV2Hire</span>
        </div>

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

        {/* User Info in drawer */}
        <div className="border-t border-border pt-6 mt-auto">
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
