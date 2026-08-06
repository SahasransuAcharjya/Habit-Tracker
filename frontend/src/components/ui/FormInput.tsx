"use client";

import { InputHTMLAttributes, useState } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function FormInput({
  label,
  error,
  className = "",
  type,
  ...props
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          className={`w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary-500 ${
            isPassword ? "pr-12" : ""
          } ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error ? <p className="mt-2 text-xs text-primary-500">{error}</p> : null}
    </div>
  );
}