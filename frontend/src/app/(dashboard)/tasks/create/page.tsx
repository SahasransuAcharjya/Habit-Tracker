"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateTaskPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "ONE_TIME",
    priority: "MEDIUM",
    dueDate: "",
    startTime: "",
    endTime: "",
    isRecurring: false,
    recurrenceDays: "",
    reminderEnabled: true,
    reminderInterval: 15,
    autoMarkMissed: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("activity_token");

      const payload = {
        ...formData,
        recurrenceDays: formData.recurrenceDays
          ? formData.recurrenceDays.split(",").map((day) => Number(day.trim()))
          : [],
        reminderInterval: Number(formData.reminderInterval),
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        startTime: formData.startTime ? new Date(formData.startTime).toISOString() : null,
        endTime: formData.endTime ? new Date(formData.endTime).toISOString() : null,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create task.");
      }

      router.push("/tasks");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create task</h2>
        <p className="mt-1 text-sm text-slate-400">
          Add a task, set reminders, and define the deadline window.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <input
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="min-h-28 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          >
            <option value="ONE_TIME">ONE_TIME</option>
            <option value="RECURRING">RECURRING</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            name="dueDate"
            type="datetime-local"
            value={formData.dueDate}
            onChange={handleChange}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          />
          <input
            name="startTime"
            type="datetime-local"
            value={formData.startTime}
            onChange={handleChange}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          />
          <input
            name="endTime"
            type="datetime-local"
            value={formData.endTime}
            onChange={handleChange}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          />
        </div>

        <input
          name="recurrenceDays"
          placeholder="Recurrence days e.g. 1,2,3,4,5"
          value={formData.recurrenceDays}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
        />

        <input
          name="reminderInterval"
          type="number"
          placeholder="Reminder interval in minutes"
          value={formData.reminderInterval}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
        />

        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            name="isRecurring"
            checked={formData.isRecurring}
            onChange={handleChange}
          />
          Is recurring
        </label>

        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            name="reminderEnabled"
            checked={formData.reminderEnabled}
            onChange={handleChange}
          />
          Enable reminders
        </label>

        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            name="autoMarkMissed"
            checked={formData.autoMarkMissed}
            onChange={handleChange}
          />
          Auto mark as missed
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create task"}
        </button>
      </form>
    </section>
  );
}