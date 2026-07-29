"use client";

import { Mic } from "lucide-react";
import JobCard, { JobCardSkeleton } from "@/components/interviews/JobCard";
import { useJobs } from "@/hooks/useJobs";
import { useInterviewSessions } from "@/hooks/useInterviewSessions";

export default function MockInterviewHubPage() {
  const { data: jobs, loading, error } = useJobs();
  const { data: sessions } = useInterviewSessions();

  const sessionCountByJob = new Map<string, number>();
  for (const session of sessions ?? []) {
    sessionCountByJob.set(session.job, (sessionCountByJob.get(session.job) ?? 0) + 1);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="size-11 rounded-2xl bg-primary-200/10 flex-center flex-shrink-0">
          <Mic className="size-5 text-primary-200" />
        </div>
        <div>
          <h2>AI Mock Interview</h2>
          <p className="text-light-400 mt-1">
            Pick a role to practice — the AI interviewer will ask real, role-specific questions.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : jobs && jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} interviewCount={sessionCountByJob.get(job.id) ?? 0} />
          ))}
        </div>
      ) : (
        !error && (
          <div className="card-border">
            <div className="card p-10 flex flex-col items-center text-center gap-3">
              <div className="size-12 rounded-full bg-primary-200/10 flex-center">
                <Mic className="size-6 text-primary-200" />
              </div>
              <h4 className="text-base font-semibold text-white">No roles available yet</h4>
              <p className="text-sm text-light-400 max-w-sm">
                Check back soon — new roles are added regularly.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
