"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUploader from "@/components/cv/FileUploader";
import { useUploadCV } from "@/hooks/useUploadCV";

export default function CVUploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const { upload, loading, error } = useUploadCV();

  const canSubmit = Boolean(file && jobTitle.trim() && jobDescription.trim());

  const handleAnalyze = async () => {
    if (!file || !canSubmit) return;
    const analysis = await upload({
      resume: file,
      jobTitle: jobTitle.trim(),
      jobDescription: jobDescription.trim(),
    });
    if (analysis) {
      router.push(`/dashboard/cv/results/${analysis.id}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2>Analyze Your CV</h2>
        <p className="text-light-400 mt-2">
          Upload your resume and the job you&apos;re targeting — the AI compares them directly,
          so both are needed to run an analysis.
        </p>
      </div>

      {error && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* File Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Resume (PDF)</label>
        <FileUploader onFileSelect={setFile} />
      </div>

      {/* Job Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Job Details</h3>

        <div className="form-div">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            id="jobTitle"
            type="text"
            placeholder="e.g. Frontend Developer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        <div className="form-div">
          <label htmlFor="jobDesc">Job Description</label>
          <textarea
            id="jobDesc"
            placeholder="Paste the job description here to compare your CV against it..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleAnalyze}
        disabled={!canSubmit || loading}
        className="auth-button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="size-5 border-2 border-dark-100 border-t-transparent rounded-full animate-spin" />
            Analyzing...
          </span>
        ) : (
          "Analyze CV"
        )}
      </button>
    </div>
  );
}
