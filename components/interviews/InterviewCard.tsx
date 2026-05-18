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
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
              badgeColor[normalizedType] || "bg-light-600"
            )}
          >
            <p className="badge-text">{normalizedType}</p>
          </div>

          {/* Cover */}
          <Image
            src={coverImage}
            alt="cover"
            width={90}
            height={90}
            className="rounded-full object-cover size-[90px]"
          />

          <h3 className="mt-5 capitalize">{job.role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
              <p>{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center">
          {/* Tech icons stack */}
          <div className="flex flex-row mr-2">
            {techIcons.slice(0, 4).map(({ tech, url }, idx) => (
              <div
                key={tech}
                className={cn(
                  "relative group bg-white/10 rounded-full p-2 flex-center border border-white/5",
                  idx >= 1 && "-ml-3"
                )}
              >
                <span className="tech-tooltip">{tech}</span>
                <Image src={url} alt={tech} width={100} height={100} className="size-6" />
              </div>
            ))}
          </div>

          <Link
            href={
              feedback
                ? `/dashboard/interviews/feedback/${interviewId}`
                : `/dashboard/interviews/session/${interviewId}`
            }
            className="btn-primary text-xs px-5 py-2 min-h-0"
          >
            {feedback ? "Check Feedback" : "Start"}
          </Link>
        </div>
      </div>
    </div>
  );
}
