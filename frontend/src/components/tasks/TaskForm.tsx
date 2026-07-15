"use client";

import { FormEvent, useState } from "react";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import FormSelect from "@/components/ui/FormSelect";
import Button from "@/components/ui/Button";

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
  }) => Promise<any> | any;
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
        <FormInput
          label="Task title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Study DSA for 2 hours"
          required
        />

        <FormTextarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Focus on graphs and dynamic programming problems"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Study / Fitness / Project"
          />

          <FormSelect
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={[
              { label: "LOW", value: "LOW" },
              { label: "MEDIUM", value: "MEDIUM" },
              { label: "HIGH", value: "HIGH" },
            ]}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Start time"
            name="startTime"
            type="datetime-local"
            value={formData.startTime}
            onChange={handleChange}
          />

          <FormInput
            label="End time"
            name="endTime"
            type="datetime-local"
            value={formData.endTime}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Reminder interval (minutes)"
            name="reminderInterval"
            type="number"
            min="1"
            value={formData.reminderInterval}
            onChange={handleChange}
            placeholder="15"
          />

          <FormInput
            label="Recurrence rule"
            name="recurrenceRule"
            value={formData.recurrenceRule}
            onChange={handleChange}
            placeholder="Daily / Weekdays / Mon-Wed-Fri"
          />
        </div>

        {error ? (
          <div className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        <Button type="submit" disabled={loading} fullWidth>
          {loading ? "Saving..." : "Save task"}
        </Button>
      </form>
    </div>
  );
}