"use client";

type TaskFiltersValue = {
  status: string;
  priority: string;
  category: string;
};

type TaskFiltersProps = {
  filters: TaskFiltersValue;
  onChange: (filters: TaskFiltersValue) => void;
};

export default function TaskFilters({
  filters,
  onChange,
}: TaskFiltersProps) {
  const updateField = (field: keyof TaskFiltersValue, value: string) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="DONE">Done</option>
            <option value="MISSED">Missed</option>
            <option value="SKIPPED">Skipped</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => updateField("priority", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
          >
            <option value="">All</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Category
          </label>
          <input
            value={filters.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="Study, Fitness, Work..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}