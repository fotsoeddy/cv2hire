import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import type { Job, InterviewFeedback } from "@/types";
import { cn, getStableCover, getTechLogos } from "@/lib/utils";

interface InterviewCardProps {
  interviewId: string;
  job: Job;
  feedback?: InterviewFeedback | null;
  createdAt: string;
}

export default function InterviewCard({
  interviewId,
  job,
  feedback,
  createdAt,
}: InterviewCardProps) {
  const normalizedType = /mix/gi.test(job.type) ? "Mixed" : job.type;
  const badgeColor: Record<string, string> = {
    Behavioral: "bg-light-400",
    Mixed: "bg-light-600",
    Technical: "bg-light-800",
  };
  const formattedDate = dayjs(createdAt).format("MMM D, YYYY");
  const techIcons = getTechLogos(job.techstack);
  const coverImage = getStableCover(interviewId);

  return (
    <div className="card-border w-full group h-full">
      <div className="card p-6 border border-white/5 hover:border-primary-200/30 transition-all flex flex-col h-full min-h-[340px]">
        <div className="flex justify-between items-start mb-6">
          <div className="size-14 rounded-2xl bg-white/5 flex-center overflow-hidden border border-white/5 shadow-inner">
            <Image
              src={coverImage}
              alt="cover"
              width={120}
              height={120}
              className="size-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm",
              badgeColor[normalizedType] || "bg-light-600"
            )}>
              {normalizedType}
            </span>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-dark-200 rounded-lg border border-white/5">
              <Image src="/star.svg" width={14} height={14} alt="star" className="opacity-80" />
              <p className="text-[11px] font-bold text-white">{feedback?.totalScore || "---"}</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1 leading-tight">{job.role} Interview</h3>
          <div className="flex items-center gap-2 mb-4 text-xs text-light-400">
            <Image src="/calendar.svg" width={14} height={14} alt="calendar" className="opacity-60" />
            <span>{formattedDate}</span>
          </div>
          <p className="text-sm text-light-100/70 line-clamp-3 leading-relaxed mb-6">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Complete it now to get personalized AI feedback."}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
          {/* Tech icons stack */}
          <div className="flex flex-row -space-x-2">
            {techIcons.slice(0, 4).map(({ tech, url }) => (
              <div
                key={tech}
                className="relative group size-10 rounded-full bg-dark-200 border-2 border-background flex-center hover:z-10 transition-transform hover:-translate-y-0.5"
              >
                <span className="tech-tooltip">{tech}</span>
                <Image src={url} alt={tech} width={100} height={100} className="size-5 opacity-80 group-hover:opacity-100" />
              </div>
            ))}
          </div>

          <Link
            href={
              feedback
                ? `/dashboard/interviews/feedback/${interviewId}`
                : `/dashboard/interviews/session/${interviewId}`
            }
            className="btn-secondary text-xs px-5 py-2 min-h-0 flex items-center gap-2"
          >
            {feedback ? "Feedback" : "Start"} <span className="opacity-50 text-[10px]">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
