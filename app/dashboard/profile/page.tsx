"use client";

import { User } from "lucide-react";
import { useSessionUser } from "@/hooks/useSessionUser";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function ProfilePage() {
  const user = useSessionUser();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2>Profile</h2>
        <p className="text-light-400 mt-1">Your account identity.</p>
      </div>

      <div className="card p-8 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-full bg-primary-200/20 flex-center flex-shrink-0">
            <span className="text-primary-200 text-xl font-bold uppercase">
              {user?.email?.charAt(0) ?? "?"}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-medium truncate">{user?.email ?? "—"}</p>
            <p className="text-xs text-light-400 mt-0.5">Account ID: {user?.id ?? "—"}</p>
          </div>
        </div>
      </div>

      <ComingSoon
        icon={User}
        title="More profile details are coming soon"
        description="Bio, photo, phone, and social links already have a home on the backend (the Profile model) but no API endpoint yet to read or update them."
      />
    </div>
  );
}
