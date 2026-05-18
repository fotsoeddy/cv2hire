"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUploader from "@/components/cv/FileUploader";

export default function CVUploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!file) return;
    setAnalyzing(true);
    // Placeholder: will connect to Django REST API later
    setTimeout(() => {
      router.push("/dashboard/cv/results/cv-1");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2>Analyze Your CV</h2>
        <p className="text-light-400 mt-2">
          Upload your resume and optionally add a job description to compare against.
        </p>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Resume (PDF)</label>
        <FileUploader onFileSelect={setFile} />
      </div>

      {/* Job Details (Optional) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">
          Job Details <span className="text-light-400 font-normal text-sm">(optional)</span>
        </h3>

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
        disabled={!file || analyzing}
        className="auth-button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {analyzing ? (
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
