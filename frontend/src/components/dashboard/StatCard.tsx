type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "success" | "warning" | "danger";
};

const toneClasses = {
  default: "border-stone-200 bg-white",
  success: "border-emerald-800 bg-sky-50/20",
  warning: "border-amber-800 bg-amber-950/20",
  danger: "border-red-800 bg-red-950/20",
};

export default function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: StatCardProps) {
  return (
    <div className={`rounded-2xl border p-5 ${toneClasses[tone]}`}>
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{label}</p>
      <h3 className="mt-3 text-3xl font-bold text-stone-800">{value}</h3>
      {hint ? <p className="mt-2 text-sm text-stone-500">{hint}</p> : null}
    </div>
  );
}