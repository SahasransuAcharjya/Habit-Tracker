"use client";

import { FormEvent, useState } from "react";

type TaskFormValues = {
  title: string;
  description: string;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  startTime: string;
  endTime: string;
  reminderInterval: string;
  recurrenceRule: string;
};

type TaskFormProps = {
  onSubmit: (values: {
    title: string;
    description: string;
    category: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    startTime: string | null;
    endTime: string | null;
    reminderInterval: number | null;
    recurrenceRule: string | null;
  }) => Promise<void> | void;
  loading?: boolean;
};

const initialState: TaskFormValues = {
  title: "",
  description: "",
  category: "",
  priority: "MEDIUM",
  startTime: "",
  endTime: "",
  reminderInterval: "",
  recurrenceRule: "",
};

export default function TaskForm({
  onSubmit,
  loading = false,
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormValues>(initialState);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Task title is required.");
      return;
    }

    const reminderValue = formData.reminderInterval
      ? Number(formData.reminderInterval)
      : null;

    if (reminderValue !== null && Number.isNaN(reminderValue)) {
      setError("Reminder interval must be a valid number.");
      return;
    }

    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        priority: formData.priority,
        startTime: formData.startTime || null,
        endTime: formData.endTime || null,
        reminderInterval: reminderValue,
        recurrenceRule: formData.recurrenceRule.trim() || null,
      });

      setFormData(initialState);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save task.");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-white">Create task</h3>
      <p className="mt-1 text-sm text-slate-400">
        Add a task with time windows, reminders, and performance tracking.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Task title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Study DSA for 2 hours"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Focus on graphs and dynamic programming problems"
            className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Category
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Study / Fitness / Project"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Start time
            </label>
            <input
              name="startTime"
              type="datetime-local"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              End time
            </label>
            <input
              name="endTime"
              type="datetime-local"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Reminder interval (minutes)
            </label>
            <input
              name="reminderInterval"
              type="number"
              min="1"
              value={formData.reminderInterval}
              onChange={handleChange}
              placeholder="15"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Recurrence rule
            </label>
            <input
              name="recurrenceRule"
              value={formData.recurrenceRule}
              onChange={handleChange}
              placeholder="Daily / Weekdays / Mon-Wed-Fri"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
            />
          </div>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save task"}
        </button>
      </form>
    </div>
  );
}