"use client";

import Link from "next/link";
import { FileText, Eye, Calendar, TrendingUp } from "lucide-react";
import dayjs from "dayjs";
import { cn, getScoreColor } from "@/lib/utils";
import { useCVAnalyses } from "@/hooks/useCVAnalyses";
import { useJobs } from "@/hooks/useJobs";

function CVCardSkeleton() {
  return (
    <div className="card p-6 border border-white/5 animate-pulse min-h-[220px] flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="size-10 rounded-xl bg-white/5" />
        <div className="h-6 w-20 rounded-full bg-white/5" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="h-5 w-2/3 rounded bg-white/5" />
        <div className="h-4 w-1/2 rounded bg-white/5" />
      </div>
      <div className="h-9 w-full rounded-full bg-white/5 mt-5" />
    </div>
  );
}

export default function CVHistoryPage() {
  const { data: analyses, loading, error } = useCVAnalyses();
  const { data: jobs } = useJobs();

  const jobNameById = new Map((jobs ?? []).map((j) => [j.id, j.name]));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">My Analyzed CVs</h2>
        <p className="text-light-400 mt-1">Access and manage all your past resume analyses.</p>
      </div>

      {error && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            <CVCardSkeleton />
            <CVCardSkeleton />
            <CVCardSkeleton />
          </>
        ) : (
          (analyses ?? []).map((cv) => {
            const scoreColor = getScoreColor(cv.overall_score);
            const formattedDate = dayjs(cv.created_at).format("MMM D, YYYY");
            const jobName = cv.job ? jobNameById.get(cv.job) : null;

            return (
              <div
                key={cv.id}
                className="card p-6 border border-white/5 hover:border-primary-200/20 transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="size-10 rounded-xl bg-primary-200/10 flex-center">
                    <FileText className="size-5 text-primary-200" />
                  </div>
                  {cv.status === "completed" ? (
                    <div
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold",
                        scoreColor === "green" && "score-badge-green",
                        scoreColor === "yellow" && "score-badge-yellow",
                        scoreColor === "red" && "score-badge-red"
                      )}
                    >
                      {cv.overall_score}% Score
                    </div>
                  ) : (
                    <div className="px-3 py-1 rounded-full text-xs font-bold bg-light-600/20 text-light-100 capitalize">
                      {cv.status}
                    </div>
                  )}
                </div>

                <div className="mb-6 flex-1">
                  <h3 className="text-lg font-bold text-white truncate mb-1">
                    {jobName ?? "CV Analysis"}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {cv.career_level && (
                      <div className="flex items-center gap-2 text-xs text-light-400">
                        <TrendingUp className="size-3.5" />
                        <span className="capitalize">{cv.career_level} level</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-light-400">
                      <Calendar className="size-3.5" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/dashboard/cv/results/${cv.id}`}
                  className="btn-secondary text-xs py-2 min-h-0 flex-center gap-2 w-full"
                >
                  <Eye className="size-4" />
                  View Report
                </Link>
              </div>
            );
          })
        )}

        {/* Empty / Add State */}
        {!loading && (
          <Link
            href="/dashboard/cv/upload"
            className="card p-6 border-2 border-dashed border-white/5 hover:border-primary-200/30 transition-all flex flex-col items-center justify-center gap-3 group min-h-[220px]"
          >
            <div className="size-12 rounded-full bg-white/5 flex-center group-hover:bg-primary-200/10 transition-colors">
              <FileText className="size-6 text-light-400 group-hover:text-primary-200" />
            </div>
            <p className="text-sm font-medium text-light-400 group-hover:text-white">
              Analyze New CV
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
