import { SelectHTMLAttributes } from "react";

type Option = {
  label: string;
  value: string;
};

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
  error?: string;
};

export default function FormSelect({
  label,
  options,
  error,
  className = "",
  ...props
}: FormSelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-stone-700">
        {label}
      </label>
      <select
        className={`w-full rounded-xl border border-stone-300 bg-[#fdfaf6] px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-red-500 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}