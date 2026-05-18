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
      <div className="fixed top-0 left-0 right-0 z-50 dark-gradient border-b border-border flex items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="size-8 rounded-lg primary-gradient flex-center">
            <span className="text-white font-bold text-xs">C2</span>
          </div>
          <span className="text-lg font-bold text-primary-100">CV2Hire</span>
        </Link>
        <button onClick={() => setOpen(!open)} className="text-white p-1">
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Dropdown nav */}
      {open && (
        <div className="fixed inset-0 top-16 z-[70] dark-gradient p-4 animate-fadeIn">
          <nav className="flex flex-col gap-2 mt-4">
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
        </div>
      )}
    </div>
  );
}
