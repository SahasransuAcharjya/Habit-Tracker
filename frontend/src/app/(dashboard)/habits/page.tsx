"use client";

import { FormEvent, useEffect, useState } from "react";

type Habit = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  frequency?: string;
  targetDays?: number[];
  reminderTime?: string | null;
  isActive?: boolean;
};

type HabitsResponse = {
  success: boolean;
  message: string;
  data: Habit[];
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    frequency: "DAILY",
    targetDays: "",
    reminderTime: "",
  });

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("activity_token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/habits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result: HabitsResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch habits.");
      }

      setHabits(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load habits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("activity_token");

      const payload = {
        ...formData,
        targetDays: formData.targetDays
          ? formData.targetDays.split(",").map((day) => Number(day.trim()))
          : [],
        reminderTime: formData.reminderTime
          ? new Date(formData.reminderTime).toISOString()
          : null,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/habits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create habit.");
      }

      setFormData({
        title: "",
        description: "",
        category: "",
        frequency: "DAILY",
        targetDays: "",
        reminderTime: "",
      });

      await fetchHabits();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create habit.");
    }
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Habits</h2>
          <p className="mt-1 text-sm text-slate-400">
            Track recurring routines like workouts, study, and reading.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
            Loading habits...
          </div>
        ) : habits.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
            No habits found yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {habits.map((habit) => (
              <div key={habit.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <h3 className="text-lg font-semibold">{habit.title}</h3>
                {habit.description ? (
                  <p className="mt-2 text-sm text-slate-400">{habit.description}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>Category: {habit.category || "General"}</span>
                  <span>Frequency: {habit.frequency || "DAILY"}</span>
                  <span>
                    Days: {habit.targetDays?.length ? habit.targetDays.join(", ") : "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="text-xl font-semibold">Create habit</h3>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          <input
            name="title"
            placeholder="Habit title"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="min-h-24 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          />

          <select
            name="frequency"
            value={formData.frequency}
            onChange={(e) => setFormData((prev) => ({ ...prev, frequency: e.target.value }))}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          >
            <option value="DAILY">DAILY</option>
            <option value="WEEKLY">WEEKLY</option>
          </select>

          <input
            name="targetDays"
            placeholder="Target days e.g. 1,3,5"
            value={formData.targetDays}
            onChange={(e) => setFormData((prev) => ({ ...prev, targetDays: e.target.value }))}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          />

          <input
            name="reminderTime"
            type="datetime-local"
            value={formData.reminderTime}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, reminderTime: e.target.value }))
            }
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          />

          {error ? (
            <div className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Save habit
          </button>
        </form>
      </div>
    </section>
  );
}