"use client";

import Link from "next/link";
import { FileSearch, Mic, Briefcase, TrendingUp } from "lucide-react";
import {
  StatCard,
  StatCardSkeleton,
  RecentSessionCard,
} from "@/components/dashboard/DashboardComponents";
import { useJobs } from "@/hooks/useJobs";
import { useInterviewSessions } from "@/hooks/useInterviewSessions";

export default function DashboardPage() {
  const { data: jobs, loading: jobsLoading, error: jobsError } = useJobs();
  const { data: sessions, loading: sessionsLoading, error: sessionsError } = useInterviewSessions();

  const loading = jobsLoading || sessionsLoading;
  const completedSessions = (sessions ?? []).filter((s) => s.status === "completed");
  const averageScore = completedSessions.length
    ? Math.round(
        completedSessions.reduce((sum, s) => sum + s.overall_score, 0) / completedSessions.length
      )
    : null;

  const jobNameById = new Map((jobs ?? []).map((j) => [j.id, j.name]));
  const recentSessions = (sessions ?? []).slice(0, 5);
  const hasNoActivity = !loading && (sessions ?? []).length === 0;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2>Welcome back</h2>
          <p className="text-light-400 mt-1">Here&apos;s your job readiness overview.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/mock-interview" className="btn-primary text-sm">
            Start Mock Interview
          </Link>
          <Link href="/dashboard/jobs" className="btn-secondary text-sm">
            Browse Jobs
          </Link>
        </div>
      </div>

      {(jobsError || sessionsError) && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
          {jobsError || sessionsError}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard label="Interview Sessions" value={sessions?.length ?? 0} icon={Mic} delay={0} />
            <StatCard
              label="Avg. Interview Score"
              value={averageScore !== null ? `${averageScore}%` : "—"}
              icon={TrendingUp}
              delay={40}
            />
            <StatCard label="Jobs Available" value={jobs?.length ?? 0} icon={Briefcase} delay={80} />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/cv/upload"
          className="card-cta gap-4 hover:border-primary-200/30 transition-all"
        >
          <div className="size-10 rounded-xl bg-primary-200/10 flex-center flex-shrink-0">
            <FileSearch className="size-5 text-primary-200" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">Analyze Your CV</h3>
            <p className="text-xs text-light-400 mt-0.5">
              Upload resume & get instant AI feedback
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/mock-interview"
          className="card-cta gap-4 hover:border-success-100/30 transition-all"
        >
          <div className="size-10 rounded-xl bg-success-100/10 flex-center flex-shrink-0">
            <Mic className="size-5 text-success-100" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">Mock Interview</h3>
            <p className="text-xs text-light-400 mt-0.5">
              Practice with AI for your target role
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
        {loading ? (
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[60px] rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : hasNoActivity ? (
          <div className="card-border">
            <div className="card p-10 flex flex-col items-center text-center gap-3">
              <div className="size-12 rounded-full bg-primary-200/10 flex-center">
                <Mic className="size-6 text-primary-200" />
              </div>
              <h4 className="text-base font-semibold text-white">No interviews yet</h4>
              <p className="text-sm text-light-400 max-w-sm">
                Pick a role and start your first AI mock interview to see your progress here.
              </p>
              <Link href="/dashboard/jobs" className="btn-primary text-sm mt-2">
                Browse Jobs
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {recentSessions.map((session) => (
              <RecentSessionCard
                key={session.id}
                session={session}
                jobName={jobNameById.get(session.job) ?? "Role unavailable"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
