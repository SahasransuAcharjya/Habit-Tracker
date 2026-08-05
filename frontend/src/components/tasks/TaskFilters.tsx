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
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-lg">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-[#fdfaf6] px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-red-500"
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="DONE">Done</option>
            <option value="MISSED">Missed</option>
            <option value="SKIPPED">Skipped</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => updateField("priority", e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-[#fdfaf6] px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-red-500"
          >
            <option value="">All</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">
            Category
          </label>
          <input
            value={filters.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="Study, Fitness, Work..."
            className="w-full rounded-xl border border-stone-300 bg-[#fdfaf6] px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-red-500"
          />
        </div>
      </div>
    </div>
  );
}