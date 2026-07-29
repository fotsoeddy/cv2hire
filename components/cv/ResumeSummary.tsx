import { ScoreGauge, ScoreBadge } from "@/components/cv/ScoreComponents";
import type { CVAnalysisDetail } from "@/types/cv";

interface ResumeSummaryProps {
  analysis: CVAnalysisDetail;
}

export default function ResumeSummary({ analysis }: ResumeSummaryProps) {
  const categories = [
    { label: "ATS Compatibility", score: analysis.ats_score },
    { label: "Readability", score: analysis.readability_score },
    { label: "Keyword Match", score: analysis.keyword_match_score },
    { label: "Experience", score: analysis.experience_score },
  ];

  return (
    <div className="flex flex-col gap-6 items-center">
      {/* Overall Score */}
      <div className="flex flex-col items-center gap-4 card p-5 md:p-6 rounded-2xl w-full border border-white/5">
        <h3 className="text-base font-semibold text-white">Overall Score</h3>
        <ScoreGauge score={analysis.overall_score} />
        <ScoreBadge score={analysis.overall_score} />
      </div>

      {/* Category Breakdown */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="flex items-center justify-between bg-dark-300 rounded-2xl p-4"
          >
            <span className="text-sm text-light-100">{cat.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{cat.score}</span>
              <span className="text-light-400 text-sm">/100</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
