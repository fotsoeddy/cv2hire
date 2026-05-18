import { mockInterviewFeedback, mockInterviews, mockJobs } from "@/constants/mock-data";
import InterviewFeedbackView from "@/components/interviews/InterviewFeedback";
import Link from "next/link";

export default async function InterviewFeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const feedback = mockInterviewFeedback.find((f) => f.interviewId === id);
  const interview = mockInterviews.find((i) => i.id === id);
  const job = interview ? mockJobs.find((j) => j.id === interview.jobId) : null;

  if (!feedback || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2>Feedback Not Found</h2>
        <p className="text-light-400">
          No feedback available for this interview yet.
        </p>
        <Link href="/dashboard/jobs" className="btn-primary">
          Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <InterviewFeedbackView
      feedback={feedback}
      role={job.role}
      interviewId={id}
    />
  );
}
