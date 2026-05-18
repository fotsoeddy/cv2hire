"use client";

import Link from "next/link";
import { FileText, Download, Eye, Trash2, Calendar, Target, Briefcase } from "lucide-react";
import { mockCVHistory } from "@/constants/mock-data";
import dayjs from "dayjs";
import { cn, getScoreColor } from "@/lib/utils";

export default function CVHistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">My Analyzed CVs</h2>
        <p className="text-light-400 mt-1">
          Access and manage all your past resume analyses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCVHistory.map((cv) => {
          const score = cv.feedback?.overallScore || 0;
          const scoreColor = getScoreColor(score);
          const formattedDate = dayjs(cv.createdAt).format("MMM D, YYYY");

          return (
            <div key={cv.id} className="card p-6 border border-white/5 hover:border-primary-200/20 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="size-10 rounded-xl bg-primary-200/10 flex-center">
                  <FileText className="size-5 text-primary-200" />
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold",
                  scoreColor === "green" && "score-badge-green",
                  scoreColor === "yellow" && "score-badge-yellow",
                  scoreColor === "red" && "score-badge-red"
                )}>
                  {score}% Score
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white truncate mb-1" title={cv.fileName}>
                  {cv.fileName}
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-light-400">
                    <Briefcase className="size-3.5" />
                    <span>{cv.jobTitle} @ {cv.companyName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-light-400">
                    <Calendar className="size-3.5" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 mt-auto">
                <Link
                  href={`/dashboard/cv/results/${cv.id}`}
                  className="btn-secondary text-xs py-2 min-h-0 flex-center gap-2 w-full"
                >
                  <Eye className="size-4" />
                  View Report
                </Link>
                <button
                  onClick={() => alert("Downloading CV...")}
                  className="btn-ghost border border-white/10 text-xs py-2 min-h-0 flex-center gap-2 hover:bg-white/5 w-full"
                >
                  <Download className="size-4" />
                  Download
                </button>
              </div>
              
              <button 
                className="absolute top-2 right-2 p-1.5 text-light-400 hover:text-destructive-100 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Delete analysis"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          );
        })}

        {/* Empty / Add State */}
        <Link 
          href="/dashboard/cv/upload"
          className="card p-6 border-2 border-dashed border-white/5 hover:border-primary-200/30 transition-all flex flex-col items-center justify-center gap-3 group min-h-[220px]"
        >
          <div className="size-12 rounded-full bg-white/5 flex-center group-hover:bg-primary-200/10 transition-colors">
            <FileText className="size-6 text-light-400 group-hover:text-primary-200" />
          </div>
          <p className="text-sm font-medium text-light-400 group-hover:text-white">Analyze New CV</p>
        </Link>
      </div>
    </div>
  );
}
