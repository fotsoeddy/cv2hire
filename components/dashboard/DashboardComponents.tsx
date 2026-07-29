import Link from "next/link";
import dayjs from "dayjs";
import { cn, getScoreColor } from "@/lib/utils";
import type { InterviewSessionListItem, InterviewSessionStatus } from "@/types/interviews";

export function StatCard({
  label,
  value,
  icon: Icon,
  delay = 0,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  delay?: number;
}) {
  return (
    <div
      className="stat-card"
      style={{ animation: `fadeIn 300ms var(--ease-out) ${delay}ms both` }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-light-400">{label}</p>
        <Icon className="size-5 text-primary-200" />
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 rounded bg-white/5 animate-pulse" />
        <div className="size-5 rounded bg-white/5 animate-pulse" />
      </div>
      <div className="h-8 w-14 rounded bg-white/5 animate-pulse" />
    </div>
  );
}

const STATUS_STYLES: Record<InterviewSessionStatus, string> = {
  pending: "bg-light-600/20 text-light-100",
  active: "bg-primary-200/15 text-primary-200",
  completed: "score-badge-green",
  cancelled: "bg-light-600/20 text-light-400",
  failed: "score-badge-red",
};

const STATUS_LABELS: Record<InterviewSessionStatus, string> = {
  pending: "Not started",
  active: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
  failed: "Failed",
};

export function SessionStatusBadge({ status }: { status: InterviewSessionStatus }) {
  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap",
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export function RecentSessionCard({
  session,
  jobName,
}: {
  session: InterviewSessionListItem;
  jobName: string;
}) {
  const scoreColor = getScoreColor(session.overall_score);
  const href =
    session.status === "completed"
      ? `/dashboard/interviews/feedback/${session.id}`
      : `/dashboard/interviews/session/${session.id}`;

  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-3 rounded-xl bg-dark-300 hover:bg-dark-300/80 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{jobName}</p>
        <p className="text-xs text-light-400">{dayjs(session.created_at).format("MMM D, YYYY")}</p>
      </div>
      <SessionStatusBadge status={session.status} />
      {session.status === "completed" && (
        <div
          className={cn(
            "px-3 py-1 rounded-full text-sm font-semibold",
            scoreColor === "green" && "score-badge-green",
            scoreColor === "yellow" && "score-badge-yellow",
            scoreColor === "red" && "score-badge-red"
          )}
        >
          {session.overall_score}
        </div>
      )}
    </Link>
  );
}
