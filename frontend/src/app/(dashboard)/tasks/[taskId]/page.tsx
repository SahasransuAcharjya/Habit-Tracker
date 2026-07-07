"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  type?: string;
  priority?: string;
  dueDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  isRecurring?: boolean;
  recurrenceDays?: number[];
  reminderEnabled?: boolean;
  reminderInterval?: number | null;
  autoMarkMissed?: boolean;
  isActive?: boolean;
};

type TaskResponse = {
  success: boolean;
  message: string;
  data: Task;
};

export default function TaskDetailsPage() {
  const params = useParams();
  const taskId = params.taskId as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("activity_token");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result: TaskResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch task.");
        }

        setTask(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load task.");
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
        Loading task...
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-red-800 bg-red-950/40 p-6 text-red-300">
        {error}
      </section>
    );
  }

  if (!task) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
        Task not found.
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <Link href="/tasks" className="inline-block text-sm text-cyan-400 hover:text-cyan-300">
        ← Back to tasks
      </Link>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {task.priority || "MEDIUM"}
          </span>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {task.type || "ONE_TIME"}
          </span>
        </div>

        {task.description ? (
          <p className="mt-4 text-sm text-slate-400">{task.description}</p>
        ) : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Info label="Category" value={task.category || "General"} />
          <Info label="Recurring" value={task.isRecurring ? "Yes" : "No"} />
          <Info label="Reminder enabled" value={task.reminderEnabled ? "Yes" : "No"} />
          <Info
            label="Reminder interval"
            value={task.reminderInterval ? `${task.reminderInterval} minutes` : "N/A"}
          />
          <Info label="Auto mark missed" value={task.autoMarkMissed ? "Yes" : "No"} />
          <Info label="Active" value={task.isActive ? "Yes" : "No"} />
          <Info label="Due date" value={task.dueDate || "N/A"} />
          <Info label="Start time" value={task.startTime || "N/A"} />
          <Info label="End time" value={task.endTime || "N/A"} />
          <Info
            label="Recurrence days"
            value={task.recurrenceDays?.length ? task.recurrenceDays.join(", ") : "N/A"}
          />
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm text-slate-200">{value}</p>
    </div>
  );
}