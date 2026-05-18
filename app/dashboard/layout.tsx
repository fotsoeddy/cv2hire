import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <MobileNav />
      <main className="lg:ml-64 min-h-screen p-8 pt-6 max-lg:pt-20 max-sm:px-4">
        {children}
      </main>
    </div>
  );
}
