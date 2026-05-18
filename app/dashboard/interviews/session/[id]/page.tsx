"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { mockInterviews, mockJobs } from "@/constants/mock-data";
import InterviewAgentMock from "@/components/interviews/InterviewAgentMock";
import { getStableCover, getTechLogos, cn } from "@/lib/utils";

export default function InterviewSessionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const interview = mockInterviews.find((i) => i.id === id);
  const job = interview ? mockJobs.find((j) => j.id === interview.jobId) : null;

  if (!interview || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2>Interview Not Found</h2>
        <p className="text-light-400">This interview doesn&apos;t exist.</p>
        <Link href="/dashboard/jobs" className="btn-primary">
          Browse Jobs
        </Link>
      </div>
    );
  }

  const techIcons = getTechLogos(job.techstack);
  const coverImage = getStableCover(job.id);

  const handleEnd = () => {
    // Placeholder: will send transcript to Django API for feedback generation
    router.push(`/dashboard/interviews/feedback/${interview.id}`);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <Link
        href={`/dashboard/jobs/${job.id}`}
        className="flex items-center gap-2 text-light-400 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft className="size-4" /> Back to {job.role}
      </Link>

      <div className="flex flex-row gap-4 justify-between items-center flex-wrap">
        <div className="flex flex-row gap-4 items-center">
          <Image
            src={coverImage}
            alt="cover"
            width={40}
            height={40}
            className="rounded-full object-cover size-[40px]"
          />
          <h3 className="capitalize">{job.role} Interview</h3>
          {/* Tech icons */}
          <div className="flex flex-row max-sm:hidden">
            {techIcons.slice(0, 3).map(({ tech, url }, idx) => (
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
        </div>
        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit text-sm">
          {job.type}
        </p>
      </div>

      {/* Agent UI */}
      <InterviewAgentMock userName="Eddy" onEnd={handleEnd} />
    </div>
  );
}
