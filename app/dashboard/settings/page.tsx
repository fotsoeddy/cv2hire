"use client";

import { useState } from "react";
import { mockUser } from "@/constants/mock-data";

export default function SettingsPage() {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: will connect to Django REST API later
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    // Placeholder: will connect to Django REST auth later
    window.location.href = "/auth/sign-in";
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2>Settings</h2>
        <p className="text-light-400 mt-1">Manage your account settings.</p>
      </div>

      {/* Profile */}
      <div className="card p-8 rounded-2xl space-y-6">
        <h3 className="text-lg font-semibold text-white">Profile</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="form-div">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-div">
            <label htmlFor="settings-email">Email</label>
            <input
              id="settings-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">
            {saved ? "Saved ✓" : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Subscription */}
      <div className="card p-8 rounded-2xl space-y-4">
        <h3 className="text-lg font-semibold text-white">Subscription</h3>
        <div className="flex items-center justify-between bg-dark-300 p-4 rounded-xl">
          <div>
            <p className="font-medium text-white capitalize">{mockUser.plan} Plan</p>
            <p className="text-sm text-light-400">{mockUser.credits} credits remaining</p>
          </div>
          <a href="/dashboard/pricing" className="btn-secondary text-sm">
            Manage Plan
          </a>
        </div>
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
