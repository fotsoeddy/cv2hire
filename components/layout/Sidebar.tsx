"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { clearSession } from "@/lib/auth/session";
import { useSessionUser } from "@/hooks/useSessionUser";
import { useSidebar } from "@/components/layout/SidebarContext";
import { NAV_GROUPS, isNavItemActive } from "@/components/layout/nav-config";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebar();
  const email = useSessionUser()?.email ?? null;

  const handleSignOut = () => {
    clearSession();
    router.push("/auth/sign-in");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen dark-gradient border-r border-border flex flex-col py-6 z-60 transition-all duration-300 max-lg:hidden",
        collapsed ? "w-20 px-3" : "w-64 px-5"
      )}
    >
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center justify-center mb-8 w-full">
        <Image
          src="/logo.png"
          alt="CV2Hire Logo"
          width={collapsed ? 28 : 60}
          height={collapsed ? 28 : 60}
          className="object-contain flex-shrink-0 transition-all duration-300"
          priority
        />
      </Link>

      {/* Nav groups */}
      <nav className="flex flex-col gap-5 flex-1 overflow-y-auto no-scrollbar">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-col gap-1">
            {!collapsed && (
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-light-600">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isNavItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("sidebar-link relative", active && "sidebar-link-active")}
                  title={collapsed ? item.label : undefined}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-primary-200" />
                  )}
                  <Icon className="size-[18px] flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User section */}
      <div className="border-t border-border pt-4 mt-4 flex flex-col gap-2">
        {!collapsed && email && (
          <div className="flex items-center gap-3 px-2 mb-2">
            <div className="size-9 rounded-full bg-primary-200/20 flex-center flex-shrink-0">
              <span className="text-primary-200 text-sm font-bold uppercase">
                {email.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-white font-medium truncate">{email}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-link justify-center mb-1"
        >
          {collapsed ? (
            <ChevronRight className="size-[18px]" />
          ) : (
            <>
              <ChevronLeft className="size-[18px]" />
              <span>Collapse Sidebar</span>
            </>
          )}
        </button>
        <button
          onClick={handleSignOut}
          className="sidebar-link text-destructive-100 hover:bg-destructive-100/10 w-full"
        >
          <LogOut className="size-[18px] flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
