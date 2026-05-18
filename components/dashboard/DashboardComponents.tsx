import { cn, getScoreColor } from "@/lib/utils";
import type { ActivityItem } from "@/types";
import { FileText, Mic } from "lucide-react";
import dayjs from "dayjs";

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <p className="text-sm text-light-400">{label}</p>
        <Icon className="size-5 text-primary-200" />
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

export function RecentActivityCard({ item }: { item: ActivityItem }) {
  const isCV = item.type === "cv_analysis";
  const color = item.score ? getScoreColor(item.score) : "green";

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-300 hover:bg-dark-300/80 transition-colors">
      <div
        className={cn(
          "size-10 rounded-full flex-center flex-shrink-0",
          isCV ? "bg-primary-200/10" : "bg-success-100/10"
        )}
      >
        {isCV ? (
          <FileText className="size-5 text-primary-200" />
        ) : (
          <Mic className="size-5 text-success-100" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{item.title}</p>
        <p className="text-xs text-light-400">
          {item.subtitle} · {dayjs(item.createdAt).format("MMM D, YYYY")}
        </p>
      </div>
      {item.score !== undefined && (
        <div
          className={cn(
            "px-3 py-1 rounded-full text-sm font-semibold",
            color === "green" && "score-badge-green",
            color === "yellow" && "score-badge-yellow",
            color === "red" && "score-badge-red"
          )}
        >
          {item.score}
        </div>
      )}
    </div>
  );
}
