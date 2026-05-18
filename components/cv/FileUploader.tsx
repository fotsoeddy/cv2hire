"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "@/lib/utils";
import { Upload, X, FileText } from "lucide-react";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
  const maxFileSize = 20 * 1024 * 1024; // 20MB

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
  });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full card-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer dark-gradient rounded-2xl p-6">
          {file ? (
            <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <FileText className="size-8 text-primary-200" />
                <div>
                  <p className="text-sm font-medium text-white truncate max-w-xs">{file.name}</p>
                  <p className="text-sm text-light-400">{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                className="p-2 cursor-pointer hover:bg-white/10 rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect?.(null);
                }}
              >
                <X className="w-4 h-4 text-light-400" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="size-16 rounded-full bg-primary-200/10 flex-center">
                <Upload className="size-7 text-primary-200" />
              </div>
              <p className="text-lg text-light-100">
                <span className="font-semibold text-white">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm text-light-400">PDF (max {formatSize(maxFileSize)})</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
