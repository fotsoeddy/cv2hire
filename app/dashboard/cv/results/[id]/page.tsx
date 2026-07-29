"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import ResumeSummary from "@/components/cv/ResumeSummary";
import FeedbackDetails from "@/components/cv/FeedbackDetails";
import { useCVAnalysis } from "@/hooks/useCVAnalysis";

function ResultsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-4 w-32 rounded bg-white/5" />
      <div className="h-9 w-1/2 rounded bg-white/5" />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[360px] h-80 rounded-2xl bg-white/5" />
        <div className="flex-1 h-80 rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}

export default function CVResultsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: analysis, loading, error } = useCVAnalysis(id);

  if (loading) {
    return <ResultsSkeleton />;
  }

  if (error || !analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2>Analysis Not Found</h2>
        <p className="text-light-400">
          {error || "The CV analysis you're looking for doesn't exist."}
        </p>
        <Link href="/dashboard/cv/upload" className="btn-primary">
          Upload a CV
        </Link>
      </div>
    );
  }

  if (analysis.status !== "completed") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
        <h2>{analysis.status === "failed" ? "Analysis Failed" : "Still Analyzing…"}</h2>
        <p className="text-light-400 max-w-sm">
          {analysis.status === "failed"
            ? "Something went wrong while analyzing this resume. Please try uploading it again."
            : "This can take a few moments. Refresh the page shortly."}
        </p>
        <Link href="/dashboard/cv/upload" className="btn-primary">
          Analyze Another CV
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4">
        <div className="flex-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-light-400 hover:text-white transition-colors mb-4 text-xs font-medium"
          >
            <ArrowLeft className="size-4" /> Back to Dashboard
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            CV Analysis Results
          </h2>
          {analysis.career_level && (
            <p className="text-xs md:text-sm text-light-400 mt-2 leading-relaxed opacity-80 capitalize">
              {analysis.career_level} level
            </p>
          )}
        </div>
        <div className="flex w-full md:w-auto">
          <Link
            href="/dashboard/cv/upload"
            className="btn-primary text-xs px-8 py-2.5 w-full md:w-auto min-h-0"
          >
            Analyze Another CV
          </Link>
        </div>
      </div>

      {analysis.summary && (
        <div className="card p-6 rounded-2xl border border-white/5">
          <p className="text-light-100 leading-relaxed">{analysis.summary}</p>
        </div>
      )}

      {/* Results Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Score Summary */}
        <div className="w-full lg:w-[360px] flex-shrink-0">
          <ResumeSummary analysis={analysis} />
        </div>

        {/* Right: Detailed Feedback */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-white mb-4">Detailed Feedback</h3>
          <FeedbackDetails items={analysis.feedback_items} />
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      {(analysis.strengths.length > 0 || analysis.weaknesses.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysis.strengths.length > 0 && (
            <div className="card p-6 rounded-2xl border border-white/5">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-success-100" /> Strengths
              </h3>
              <ul className="flex flex-col gap-2">
                {analysis.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-light-100">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {analysis.weaknesses.length > 0 && (
            <div className="card p-6 rounded-2xl border border-white/5">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <XCircle className="size-4 text-destructive-100" /> Weaknesses
              </h3>
              <ul className="flex flex-col gap-2">
                {analysis.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-light-100">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Improvement Suggestions */}
      {analysis.improvement_suggestions.length > 0 && (
        <div className="card p-6 rounded-2xl border border-white/5">
          <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="size-4 text-primary-200" /> Suggested Rewrites
          </h3>
          <div className="flex flex-col gap-4">
            {analysis.improvement_suggestions.map((s) => (
              <div key={s.id} className="flex flex-col gap-2 p-4 rounded-xl bg-dark-300">
                <p className="text-xs font-semibold text-light-400 uppercase">{s.section}</p>
                <p className="text-sm text-light-100 line-through opacity-60">{s.original_text}</p>
                <p className="text-sm text-white">{s.suggested_text}</p>
                {s.reason && <p className="text-xs text-light-400">{s.reason}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
