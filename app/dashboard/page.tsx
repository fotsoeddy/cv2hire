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
        <Link
          href="/dashboard/cv/upload"
          className="card-cta gap-4 hover:border-primary-200/30 transition-all"
        >
          <div className="size-10 rounded-xl bg-primary-200/10 flex-center flex-shrink-0">
            <FileText className="size-5 text-primary-200" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">Analyze Your CV</h3>
            <p className="text-xs text-light-400 mt-0.5">
              Upload resume & get instant AI feedback
            </p>
          </div>
        </Link>

        {/* Interview CTA */}
        <Link
          href="/dashboard/jobs"
          className="card-cta gap-4 hover:border-success-100/30 transition-all"
        >
          <div className="size-10 rounded-xl bg-success-100/10 flex-center flex-shrink-0">
            <Mic className="size-5 text-success-100" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">Mock Interview</h3>
            <p className="text-xs text-light-400 mt-0.5">
              Practice with AI for your target role
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
