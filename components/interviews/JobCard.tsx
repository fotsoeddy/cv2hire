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
    <div className="card-border w-[360px] max-sm:w-full">
      <div className="card-interview">
        <div>
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
              badgeColor[job.type] || "bg-light-600"
            )}
          >
            <p className="badge-text">{job.type}</p>
          </div>

          <div className="flex items-center gap-4">
            <Image
              src={coverImage}
              alt={job.company}
              width={60}
              height={60}
              className="rounded-full object-cover size-[60px]"
            />
            <div>
              <h3 className="text-xl capitalize">{job.role}</h3>
              <p className="text-light-400 text-sm">{job.company} · {job.level}</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-4 text-sm">{job.description}</p>

          {interviewCount > 0 && (
            <p className="text-xs text-primary-200 mt-3">
              {interviewCount} interview{interviewCount > 1 ? "s" : ""} taken
            </p>
          )}
        </div>

        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-row">
            {techIcons.slice(0, 4).map(({ tech, url }, idx) => (
              <div
                key={tech}
                className={cn(
                  "relative group bg-dark-300 rounded-full p-2 flex-center",
                  idx >= 1 && "-ml-3"
                )}
              >
                <span className="tech-tooltip">{tech}</span>
                <Image src={url} alt={tech} width={100} height={100} className="size-5" />
              </div>
            ))}
          </div>

          <Link href={`/dashboard/jobs/${job.id}`} className="btn-primary text-sm">
            View Role
          </Link>
        </div>
      </div>
    </div>
  );
}
