import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import type { InterviewFeedback as IFeedback } from "@/types";

interface InterviewFeedbackProps {
  feedback: IFeedback;
  role: string;
  interviewId: string;
}

export default function InterviewFeedbackView({
  feedback,
  role,
  interviewId,
}: InterviewFeedbackProps) {
  return (
    <section className="section-feedback">
      {/* Header */}
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold text-center">
          Feedback on the Interview —{" "}
          <span className="capitalize">{role}</span>
        </h1>
      </div>

      {/* Score & Date */}
      <div className="flex flex-row justify-center">
        <div className="flex flex-row gap-5">
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>
              Overall Impression:{" "}
              <span className="text-primary-200 font-bold">
                {feedback.totalScore}
              </span>
              /100
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>{dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")}</p>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* Final Assessment */}
      <p>{feedback.finalAssessment}</p>

      {/* Category Breakdown */}
      <div className="flex flex-col gap-4">
        <h2>Breakdown of the Interview:</h2>
        {feedback.categoryScores.map((category, index) => (
          <div key={index}>
            <p className="font-bold text-white">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      {/* Strengths */}
      <div className="flex flex-col gap-3">
        <h3>Strengths</h3>
        <ul>
          {feedback.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Areas for Improvement */}
      <div className="flex flex-col gap-3">
        <h3>Areas for Improvement</h3>
        <ul>
          {feedback.areasForImprovement.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="buttons">
        <Link href="/dashboard" className="btn-secondary flex-1 text-center">
          Back to Dashboard
        </Link>
        <Link
          href={`/dashboard/interviews/session/${interviewId}`}
          className="btn-primary flex-1 text-center"
        >
          Retake Interview
        </Link>
      </div>
    </section>
  );
}
