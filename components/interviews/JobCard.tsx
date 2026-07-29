import Image from "next/image";
import Link from "next/link";
import type { JobListItem } from "@/types/jobs";
import { getStableCover } from "@/lib/utils";

interface JobCardProps {
  job: JobListItem;
  interviewCount?: number;
}

export function JobCardSkeleton() {
  return (
    <div className="card-border w-full">
      <div className="card p-6 border border-white/5 flex flex-col h-full min-h-[220px] animate-pulse">
        <div className="flex justify-between items-start mb-6">
          <div className="size-12 rounded-xl bg-white/5" />
          <div className="h-5 w-16 rounded-full bg-white/5" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="h-5 w-3/4 rounded bg-white/5" />
          <div className="h-4 w-1/2 rounded bg-white/5" />
        </div>
        <div className="h-9 w-24 rounded-full bg-white/5 mt-5" />
      </div>
    </div>
  );
}

function formatDuration(seconds: number | null): string | null {
  if (!seconds) return null;
  const minutes = Math.round(seconds / 60);
  return `~${minutes} min`;
}

export default function JobCard({ job, interviewCount = 0 }: JobCardProps) {
  const coverImage = getStableCover(job.id);
  const duration = formatDuration(job.estimated_duration_seconds);

  return (
    <div className="card-border w-full group">
      <div className="card p-6 border border-white/5 hover:border-primary-200/30 transition-all flex flex-col h-full min-h-[220px]">
        <div className="flex justify-between items-start mb-6">
          <div className="size-12 rounded-xl bg-white/5 p-2 flex-center overflow-hidden border border-white/5">
            <Image
              src={coverImage}
              alt={job.name}
              width={100}
              height={100}
              className="size-full object-contain"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap justify-end">
            {job.seniority_level && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-light-600 text-white shadow-sm capitalize">
                {job.seniority_level}
              </span>
            )}
            {interviewCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-200/20 text-primary-200">
                {interviewCount} {interviewCount > 1 ? "Interviews" : "Interview"}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-100 transition-colors capitalize">
            {job.name}
          </h3>
          <p className="text-sm text-primary-200 mb-4 font-medium opacity-90 capitalize">
            {job.experience_level.replace(/_/g, " ")}
          </p>
          {job.question_categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {job.question_categories.slice(0, 3).map((category) => (
                <span
                  key={category}
                  className="px-2 py-0.5 rounded-md text-[11px] bg-dark-200 text-light-100 capitalize"
                >
                  {category.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
          <p className="text-xs text-light-400">
            {job.total_questions} question{job.total_questions === 1 ? "" : "s"}
            {duration && ` · ${duration}`}
          </p>
          <Link
            href={`/dashboard/jobs/${job.id}`}
            className="btn-secondary text-xs px-5 py-2 min-h-0 flex items-center gap-2"
          >
            View Role <span className="opacity-50 text-[10px]">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
