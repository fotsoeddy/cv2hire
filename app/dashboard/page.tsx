import Link from "next/link";
import { FileText, Mic, Target, CreditCard } from "lucide-react";
import { StatCard, RecentActivityCard } from "@/components/dashboard/DashboardComponents";
import { mockDashboardStats, mockRecentActivity, mockUser } from "@/constants/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2>Welcome back, {mockUser.name.split(" ")[0]}!</h2>
          <p className="text-light-400 mt-1">
            Here&apos;s your job readiness overview.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/cv/upload" className="btn-primary text-sm">
            Analyze CV
          </Link>
          <Link href="/dashboard/jobs" className="btn-secondary text-sm">
            Browse Jobs
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="CV Analyses"
          value={mockDashboardStats.totalCVAnalyses}
          icon={FileText}
        />
        <StatCard
          label="Mock Interviews"
          value={mockDashboardStats.totalInterviews}
          icon={Mic}
        />
        <StatCard
          label="Avg. CV Score"
          value={`${mockDashboardStats.averageCVScore}%`}
          icon={Target}
        />
        <StatCard
          label="Credits"
          value={mockDashboardStats.credits}
          icon={CreditCard}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CV CTA */}
        <Link
          href="/dashboard/cv/upload"
          className="card-cta flex-col items-start gap-4 p-6 hover:opacity-90 transition-opacity"
        >
          <div className="size-12 rounded-xl bg-primary-200/10 flex-center">
            <FileText className="size-6 text-primary-200" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Analyze Your CV</h3>
            <p className="text-sm text-light-400 mt-1">
              Upload your resume and get instant AI-powered feedback
            </p>
          </div>
        </Link>

        {/* Interview CTA */}
        <Link
          href="/dashboard/jobs"
          className="card-cta flex-col items-start gap-4 p-6 hover:opacity-90 transition-opacity"
        >
          <div className="size-12 rounded-xl bg-success-100/10 flex-center">
            <Mic className="size-6 text-success-100" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Mock Interview</h3>
            <p className="text-sm text-light-400 mt-1">
              Practice with an AI interviewer for your target role
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
        <div className="flex flex-col gap-3">
          {mockRecentActivity.map((item) => (
            <RecentActivityCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
