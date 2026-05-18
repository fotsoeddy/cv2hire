import { mockJobs, mockInterviews } from "@/constants/mock-data";
import JobCard from "@/components/interviews/JobCard";

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2>Available Roles</h2>
        <p className="text-light-400 mt-1">
          Browse available job roles and start a mock interview to practice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {mockJobs.map((job) => {
          const interviewCount = mockInterviews.filter(
            (i) => i.jobId === job.id
          ).length;
          return (
            <JobCard
              key={job.id}
              job={job}
              interviewCount={interviewCount}
            />
          );
        })}
      </div>
    </div>
  );
}
