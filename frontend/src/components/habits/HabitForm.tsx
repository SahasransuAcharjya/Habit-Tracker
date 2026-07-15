"use client";

import { FormEvent, useState } from "react";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import FormSelect from "@/components/ui/FormSelect";
import Button from "@/components/ui/Button";

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
        <FormInput
          label="Habit title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Morning workout"
          required
        />

        <FormTextarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="45 minutes cardio and stretching"
        />

        <FormInput
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Fitness / Study / Health"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormSelect
            label="Frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            options={[
              { label: "DAILY", value: "DAILY" },
              { label: "WEEKLY", value: "WEEKLY" },
              { label: "CUSTOM", value: "CUSTOM" },
            ]}
          />

          <FormInput
            label="Reminder time"
            name="reminderTime"
            type="datetime-local"
            value={formData.reminderTime}
            onChange={handleChange}
          />
        </div>

        <div>
          <FormInput
            label="Target days"
            name="targetDays"
            value={formData.targetDays}
            onChange={handleChange}
            placeholder="0,1,2,3,4,5,6  (Sun=0 ... Sat=6)"
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

        <Button type="submit" disabled={loading} fullWidth>
          {loading ? "Saving..." : "Save habit"}
        </Button>
      </form>
    </div>
  );
}