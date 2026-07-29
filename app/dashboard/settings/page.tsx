"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { clearSession, getSessionUser, type SessionUser } from "@/lib/auth/session";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    setUser(getSessionUser());
  }, []);

  const handleLogout = () => {
    clearSession();
    router.push("/auth/sign-in");
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2>Settings</h2>
        <p className="text-light-400 mt-1">Manage your account settings.</p>
      </div>

      {/* Account */}
      <div className="card p-8 rounded-2xl space-y-4">
        <h3 className="text-lg font-semibold text-white">Account</h3>
        <div className="flex items-center justify-between bg-dark-300 p-4 rounded-xl">
          <div>
            <p className="text-sm text-light-400">Email</p>
            <p className="text-white font-medium">{user?.email ?? "—"}</p>
          </div>
        </div>
        <p className="text-xs text-light-400">
          Editing your name and email needs a profile API endpoint that doesn&apos;t exist on the
          backend yet — see the{" "}
          <a href="/dashboard/profile" className="text-primary-200 hover:underline">
            Profile
          </a>{" "}
          page for details.
        </p>
      </div>

      {/* Subscription */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Subscription</h3>
        <ComingSoon
          icon={CreditCard}
          title="Billing isn't wired up yet"
          description="The backend has credit wallet and subscription models, but no API endpoints exposing them. This section will show your plan and credit balance once that's built."
        />
      </div>

      {/* Danger Zone */}
      <div className="card p-8 rounded-2xl space-y-4 border border-destructive-100/20">
        <h3 className="text-lg font-semibold text-destructive-100">Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white">Sign out of your account</p>
          </div>
          <button onClick={handleLogout} className="btn-disconnect text-sm">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
