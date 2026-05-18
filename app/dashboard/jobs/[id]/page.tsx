import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import {
  mockJobs,
  mockInterviews,
  mockInterviewFeedback,
} from "@/constants/mock-data";
import { getStableCover, getTechLogos } from "@/lib/utils";
import InterviewCard from "@/components/interviews/InterviewCard";
import { cn } from "@/lib/utils";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2>Job Not Found</h2>
        <p className="text-light-400">This role doesn&apos;t exist.</p>
        <Link href="/dashboard/jobs" className="btn-primary">
          Browse Jobs
        </Link>
      </div>
    );
  }

  const jobInterviews = mockInterviews.filter((i) => i.jobId === job.id);
  const techIcons = getTechLogos(job.techstack);
  const coverImage = getStableCover(job.id);

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
            alt={job.company}
            width={80}
            height={80}
            className="rounded-full object-cover size-[80px]"
          />
          <div className="flex-1">
            <h2 className="capitalize">{job.role}</h2>
            <p className="text-light-400 mt-1">
              {job.company} · {job.level} · {job.type}
            </p>
          </div>
          <Link
            href={
              jobInterviews.find((i) => i.status === "pending")
                ? `/dashboard/interviews/session/${jobInterviews.find((i) => i.status === "pending")!.id}`
                : `/dashboard/interviews/session/int-3`
            }
            className="btn-primary"
          >
            Start Mock Interview
          </Link>
        </div>

        <p className="text-light-100">{job.description}</p>

        {/* Tech Stack */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {job.techstack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-dark-300 rounded-full text-sm text-light-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Past Interviews for this Job */}
      {jobInterviews.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Your Interviews for this Role
          </h3>
          <div className="interviews-section">
            {jobInterviews.map((interview) => {
              const feedback = mockInterviewFeedback.find(
                (f) => f.interviewId === interview.id
              );
              return (
                <InterviewCard
                  key={interview.id}
                  interviewId={interview.id}
                  job={job}
                  feedback={feedback}
                  createdAt={interview.createdAt}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
