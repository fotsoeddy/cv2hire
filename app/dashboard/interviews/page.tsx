"use client";

import Link from "next/link";
import { History } from "lucide-react";
import { useInterviewSessions } from "@/hooks/useInterviewSessions";
import { useJobs } from "@/hooks/useJobs";
import { RecentSessionCard } from "@/components/dashboard/DashboardComponents";

export default function InterviewsHistoryPage() {
  const { data: sessions, loading, error } = useInterviewSessions();
  const { data: jobs } = useJobs();

  const jobNameById = new Map((jobs ?? []).map((j) => [j.id, j.name]));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2>Your Interviews</h2>
          <p className="text-light-400 mt-1">Track every mock interview you&apos;ve taken.</p>
        </div>
        <Link href="/dashboard/mock-interview" className="btn-primary text-sm">
          Start New Interview
        </Link>
      </div>

      {error && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[60px] rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : sessions && sessions.length > 0 ? (
        <div className="flex flex-col gap-3">
          {sessions.map((session) => (
            <RecentSessionCard
              key={session.id}
              session={session}
              jobName={jobNameById.get(session.job) ?? "Role unavailable"}
            />
          ))}
        </div>
      ) : (
        !error && (
          <div className="card-border">
            <div className="card p-10 flex flex-col items-center text-center gap-3">
              <div className="size-12 rounded-full bg-primary-200/10 flex-center">
                <History className="size-6 text-primary-200" />
              </div>
              <h4 className="text-base font-semibold text-white">No interviews yet</h4>
              <p className="text-sm text-light-400 max-w-sm">
                Start your first AI mock interview to see it show up here.
              </p>
              <Link href="/dashboard/mock-interview" className="btn-primary text-sm mt-2">
                Start Mock Interview
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
}
