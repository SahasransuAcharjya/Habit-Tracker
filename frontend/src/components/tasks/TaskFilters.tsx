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
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary-500"
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="DONE">Done</option>
            <option value="MISSED">Missed</option>
            <option value="SKIPPED">Skipped</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => updateField("priority", e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary-500"
          >
            <option value="">All</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Category
          </label>
          <input
            value={filters.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="Study, Fitness, Work..."
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  );
}