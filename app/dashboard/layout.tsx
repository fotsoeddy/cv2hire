"use client";

import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import { SidebarProvider, useSidebar } from "@/components/layout/SidebarContext";
import { cn } from "@/lib/utils";

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar />
        <MobileNav />
        <DashboardContent>{children}</DashboardContent>
      </div>
    </SidebarProvider>
  );
}
