import { InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function FormInput({
  label,
  error,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-stone-700">
        {label}
      </label>
      <input
        className={`w-full rounded-xl border border-stone-300 bg-[#fdfaf6] px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-red-500 ${className}`}
        {...props}
      />
      {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}