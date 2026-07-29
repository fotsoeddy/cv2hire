"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}

export function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  autoComplete = "current-password",
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="form-div">
      <label htmlFor={id}>{label}</label>
      <div className="relative w-full">
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="pr-12"
          required
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-light-400 hover:text-white transition-colors"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
