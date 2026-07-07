"use client";

type FormCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export default function FormCheckbox({
  label,
  checked,
  onChange,
  disabled = false,
}: FormCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-200">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border border-slate-600 bg-slate-950 accent-cyan-500"
      />
      <span>{label}</span>
    </label>
  );
}