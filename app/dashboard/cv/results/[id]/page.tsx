import Link from "next/link";
import { mockCVAnalyses } from "@/constants/mock-data";
import ResumeSummary from "@/components/cv/ResumeSummary";
import FeedbackDetails from "@/components/cv/FeedbackDetails";
import { ArrowLeft } from "lucide-react";

export default async function CVResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const analysis = mockCVAnalyses.find((a) => a.id === id);

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2>Analysis Not Found</h2>
        <p className="text-light-400">The CV analysis you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/dashboard/cv/upload" className="btn-primary">
          Upload a CV
        </Link>
      </div>
    );
  }

  const { feedback } = analysis;
  const categories = [
    { id: "ats", label: "ATS Compatibility", score: feedback.ATS.score, tips: feedback.ATS.tips },
    { id: "tone", label: "Tone & Style", score: feedback.toneAndStyle.score, tips: feedback.toneAndStyle.tips },
    { id: "content", label: "Content", score: feedback.content.score, tips: feedback.content.tips },
    { id: "structure", label: "Structure", score: feedback.structure.score, tips: feedback.structure.tips },
    { id: "skills", label: "Skills", score: feedback.skills.score, tips: feedback.skills.tips },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-light-400 hover:text-white transition-colors mb-3 text-sm"
          >
            <ArrowLeft className="size-4" /> Back to Dashboard
          </Link>
          <h2>CV Analysis Results</h2>
          <p className="text-light-400 mt-1">
            {analysis.fileName}
            {analysis.jobTitle && ` · ${analysis.jobTitle} at ${analysis.companyName}`}
          </p>
        </div>
        <Link href="/dashboard/cv/upload" className="btn-primary text-sm">
          Analyze Another CV
        </Link>
      </div>

      {/* Results Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Score Summary */}
        <div className="w-full lg:w-[360px] flex-shrink-0">
          <ResumeSummary feedback={feedback} />
        </div>

        {/* Right: Detailed Feedback */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-white mb-4">Detailed Feedback</h3>
          <FeedbackDetails categories={categories} />
        </div>
      </div>
    </div>
  );
}
