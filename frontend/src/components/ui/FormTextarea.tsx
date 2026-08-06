import { TextareaHTMLAttributes } from "react";

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export default function FormTextarea({
  label,
  error,
  className = "",
  ...props
}: FormTextareaProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <textarea
        className={`min-h-24 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary-500 ${className}`}
        {...props}
      />
      {error ? <p className="mt-2 text-xs text-primary-300">{error}</p> : null}
    </div>
  );
}