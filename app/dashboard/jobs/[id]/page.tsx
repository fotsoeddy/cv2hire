"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useJob } from "@/hooks/useJob";
import { useCreateInterviewSession } from "@/hooks/useCreateInterviewSession";
import { cn, getStableCover } from "@/lib/utils";

function JobDetailSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-4 w-24 rounded bg-white/5" />
      <div className="card p-8 rounded-2xl space-y-6">
        <div className="flex items-center gap-6">
          <div className="size-[80px] rounded-full bg-white/5" />
          <div className="flex-1 space-y-2">
            <div className="h-7 w-1/3 rounded bg-white/5" />
            <div className="h-4 w-1/4 rounded bg-white/5" />
          </div>
        </div>
        <div className="h-20 rounded bg-white/5" />
      </div>
    </div>
  );
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: job, loading, error } = useJob(id);
  const { createSession, loading: creating, error: createError } = useCreateInterviewSession();

  const handleStartInterview = async () => {
    const session = await createSession({ job_id: id });
    if (session) {
      router.push(`/dashboard/interviews/session/${session.id}`);
    }
  };

  if (loading) {
    return <JobDetailSkeleton />;
  }

  if (error || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2>Job Not Found</h2>
        <p className="text-light-400">{error || "This role doesn't exist."}</p>
        <Link href="/dashboard/jobs" className="btn-primary">
          Browse Jobs
        </Link>
      </div>
    );
  }

  const coverImage = getStableCover(job.id);
  const noQuestions = job.total_questions === 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <Link
        href="/dashboard/jobs"
        className="flex items-center gap-2 text-light-400 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft className="size-4" /> Back to Jobs
      </Link>

      {/* Job Details Card */}
      <div className="card p-8 rounded-2xl space-y-6">
        <div className="flex items-center gap-6 max-sm:flex-col max-sm:items-start">
          <Image
            src={coverImage}
            alt={job.name}
            width={80}
            height={80}
            className="rounded-full object-cover size-[80px]"
          />
          <div className="flex-1">
            <h2 className="capitalize">{job.name}</h2>
            <p className="text-light-400 mt-1 capitalize">
              {job.experience_level.replace(/_/g, " ")}
              {job.seniority_level && ` · ${job.seniority_level}`}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleStartInterview}
              disabled={creating || noQuestions}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? "Starting..." : "Start Mock Interview"}
            </button>
            {noQuestions && (
              <p className="text-xs text-light-400 text-right max-w-50">
                Questions haven&apos;t been generated for this role yet.
              </p>
            )}
          </div>
        </div>

        {createError && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
            {createError}
          </div>
        )}

        <p className="text-light-100">{job.description}</p>

        {job.requirements && (
          <div>
            <h3 className="text-base font-semibold text-white mb-3">Requirements</h3>
            <p className="text-light-100 whitespace-pre-line">{job.requirements}</p>
          </div>
        )}

        {job.skills.length > 0 && (
          <div>
            <h3 className="text-base font-semibold text-white mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill.id}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium",
                    skill.is_required
                      ? "bg-primary-200/15 text-primary-200"
                      : "bg-dark-300 text-light-100"
                  )}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-white/5 text-sm text-light-400">
          <span>
            {job.total_questions} question{job.total_questions === 1 ? "" : "s"}
          </span>
          {job.estimated_duration_seconds ? (
            <span>~{Math.round(job.estimated_duration_seconds / 60)} min</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
