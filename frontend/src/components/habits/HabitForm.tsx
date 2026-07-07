"use client";

import { FormEvent, useState } from "react";

type HabitFormValues = {
  title: string;
  description: string;
  category: string;
  frequency: string;
  targetDays: string;
  reminderTime: string;
};

type HabitFormProps = {
  onSubmit: (values: {
    title: string;
    description: string;
    category: string;
    frequency: string;
    targetDays: number[];
    reminderTime: string | null;
  }) => Promise<void> | void;
  loading?: boolean;
};

const initialState: HabitFormValues = {
  title: "",
  description: "",
  category: "",
  frequency: "DAILY",
  targetDays: "",
  reminderTime: "",
};

export default function HabitForm({
  onSubmit,
  loading = false,
}: HabitFormProps) {
  const [formData, setFormData] = useState<HabitFormValues>(initialState);
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
      setError("Habit title is required.");
      return;
    }

    const parsedDays = formData.targetDays
      ? formData.targetDays
          .split(",")
          .map((day) => Number(day.trim()))
          .filter((day) => !Number.isNaN(day) && day >= 0 && day <= 6)
      : [];

    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        frequency: formData.frequency,
        targetDays: parsedDays,
        reminderTime: formData.reminderTime ? formData.reminderTime : null,
      });

      setFormData(initialState);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save habit.");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-white">Create habit</h3>
      <p className="mt-1 text-sm text-slate-400">
        Add a recurring routine you want to track every week.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Habit title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Morning workout"
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
            placeholder="45 minutes cardio and stretching"
            className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Category
          </label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Fitness / Study / Health"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Frequency
            </label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
            >
              <option value="DAILY">DAILY</option>
              <option value="WEEKLY">WEEKLY</option>
              <option value="CUSTOM">CUSTOM</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Reminder time
            </label>
            <input
              name="reminderTime"
              type="datetime-local"
              value={formData.reminderTime}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Target days
          </label>
          <input
            name="targetDays"
            value={formData.targetDays}
            onChange={handleChange}
            placeholder="0,1,2,3,4,5,6  (Sun=0 ... Sat=6)"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
          />
          <p className="mt-2 text-xs text-slate-500">
            Example: 1,2,3,4,5 for weekdays.
          </p>
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
          {loading ? "Saving..." : "Save habit"}
        </button>
      </form>
    </div>
  );
}