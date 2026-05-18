"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Mic,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUser } from "@/constants/mock-data";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  FileText,
  Briefcase,
  Mic,
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

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen dark-gradient border-r border-border flex flex-col py-6 z-50 transition-all duration-300 max-lg:hidden",
        collapsed ? "w-20 px-3" : "w-64 px-6"
      )}
    >
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 mb-8">
        <div className="size-9 rounded-lg primary-gradient flex-center flex-shrink-0">
          <span className="text-white font-bold text-sm">C2</span>
        </div>
        {!collapsed && (
          <h2 className="text-xl font-bold text-primary-100">CV2Hire</h2>
        )}
      </Link>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "sidebar-link",
                isActive && "sidebar-link-active"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="size-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-border pt-4 mt-4 flex flex-col gap-2">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 mb-2">
            <div className="size-9 rounded-full bg-primary-200/20 flex-center flex-shrink-0">
              <span className="text-primary-200 text-sm font-bold">
                {mockUser.name.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-white font-medium truncate">
                {mockUser.name}
              </p>
              <p className="text-xs text-light-400 truncate">
                {mockUser.credits} credits
              </p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-link justify-center"
        >
          {collapsed ? (
            <ChevronRight className="size-5" />
          ) : (
            <>
              <ChevronLeft className="size-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
