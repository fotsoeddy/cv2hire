"use client";

import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import { SidebarProvider, useSidebar } from "@/components/layout/SidebarContext";
import { cn } from "@/lib/utils";
import { useAuthGuard } from "@/hooks/useAuthGuard";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <main
      className={cn(
        "min-h-screen p-8 pt-6 max-lg:pt-20 max-sm:px-4 transition-all duration-300",
        collapsed ? "lg:ml-20" : "lg:ml-64"
      )}
    >
      {children}
    </main>
  );
}

function AuthCheckingScreen() {
  return (
    <div className="min-h-screen flex-center">
      <Image
        src="/logo.png"
        alt="CV2Hire"
        width={40}
        height={40}
        className="object-contain animate-pulse"
        priority
      />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authorized = useAuthGuard();

  if (!authorized) {
    return <AuthCheckingScreen />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar />
        <DashboardContent>{children}</DashboardContent>
        <MobileNav />
      </div>
    </SidebarProvider>
  );
}
