import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import type { InterviewFeedback as IFeedback } from "@/types/interviews";

interface InterviewFeedbackProps {
  feedback: IFeedback;
  role: string;
  sessionId: string;
  gradedAt: string | null;
}

const CATEGORY_LABELS: Record<string, string> = {
  technical: "Technical Knowledge",
  communication: "Communication",
  confidence: "Confidence",
  problem_solving: "Problem Solving",
  clarity: "Clarity",
  behavioral: "Behavioral",
};

export default function InterviewFeedbackView({
  feedback,
  role,
  sessionId,
  gradedAt,
}: InterviewFeedbackProps) {
  return (
    <section className="section-feedback">
      {/* Header */}
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold text-center">
          Feedback on the Interview — <span className="capitalize">{role}</span>
        </h1>
      </div>

      {/* Score & Date */}
      <div className="flex flex-row justify-center flex-wrap gap-x-5 gap-y-2">
        <div className="flex flex-row gap-2 items-center">
          <Image src="/star.svg" width={22} height={22} alt="star" />
          <p>
            Overall Impression:{" "}
            <span className="text-primary-200 font-bold">{feedback.overall_score}</span>/100
          </p>
        </div>
        {gradedAt && (
          <div className="flex flex-row gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>{dayjs(gradedAt).format("MMM D, YYYY h:mm A")}</p>
          </div>
        )}
        <div
          className={`px-3 py-1 rounded-full text-sm font-semibold h-fit ${
            feedback.passed ? "score-badge-green" : "score-badge-yellow"
          }`}
        >
          {feedback.passed ? "Passed" : "Needs improvement"}
        </div>
      </div>

      <hr className="border-border" />

      {/* Final Assessment */}
      <p>{feedback.final_feedback}</p>

      {/* Category Breakdown */}
      {feedback.categories.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2>Breakdown of the Interview:</h2>
          {feedback.categories.map((category) => (
            <div key={category.category}>
              <p className="font-bold text-white">
                {CATEGORY_LABELS[category.category] ?? category.category} ({category.score}/100)
              </p>
              <p>{category.feedback}</p>
              {category.recommendation && (
                <p className="text-light-400 text-sm mt-1">{category.recommendation}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Strengths */}
      {feedback.strengths.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3>Strengths</h3>
          <ul>
            {feedback.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Weaknesses */}
      {feedback.weaknesses.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3>Weaknesses</h3>
          <ul>
            {feedback.weaknesses.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvement Areas */}
      {feedback.improvement_areas.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3>Areas for Improvement</h3>
          <ul>
            {feedback.improvement_areas.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="buttons">
        <Link href="/dashboard" className="btn-secondary flex-1 text-center">
          Back to Dashboard
        </Link>
        <Link
          href={`/dashboard/interviews/session/${sessionId}`}
          className="btn-primary flex-1 text-center"
        >
          Retake Interview
        </Link>
      </div>
    </section>
  );
}
