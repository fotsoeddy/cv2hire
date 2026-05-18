import Image from "next/image";
import Link from "next/link";
import type { Job } from "@/types";
import { cn, getStableCover, getTechLogos } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  interviewCount?: number;
}

export default function JobCard({ job, interviewCount = 0 }: JobCardProps) {
  const techIcons = getTechLogos(job.techstack);
  const coverImage = getStableCover(job.id);

  const badgeColor: Record<string, string> = {
    Behavioral: "bg-light-400",
    Mixed: "bg-light-600",
    Technical: "bg-light-800",
  };

  return (
    <div className="card-border w-full group">
      <div className="card p-6 border border-white/5 hover:border-primary-200/30 transition-all flex flex-col h-full min-h-[220px]">
        <div className="flex justify-between items-start mb-6">
          <div className="size-12 rounded-xl bg-white/5 p-2 flex-center overflow-hidden border border-white/5">
            <Image
              src={coverImage}
              alt={job.company}
              width={100}
              height={100}
              className="size-full object-contain"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap justify-end">
            <span className={cn(
              "px-2 py-0.5 rounded-full text-[10px] font-bold",
              badgeColor[job.type] || "bg-light-600",
              "text-white shadow-sm"
            )}>
              {job.type}
            </span>
            {interviewCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-200/20 text-primary-200">
                {interviewCount} {interviewCount > 1 ? "Interviews" : "Interview"}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-100 transition-colors">
            {job.role}
          </h3>
          <p className="text-sm text-primary-200 mb-4 font-medium opacity-90">
            {job.company} <span className="text-light-400 mx-1">·</span> {job.level}
          </p>
          <p className="text-sm text-light-100/70 line-clamp-2 leading-relaxed mb-6">
            {job.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
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

          <Link href={`/dashboard/jobs/${job.id}`} className="btn-secondary text-xs px-5 py-2 min-h-0 flex items-center gap-2">
            View Role <span className="opacity-50 text-[10px]">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
