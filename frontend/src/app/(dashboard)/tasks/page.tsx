"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  priority?: string;
  type?: string;
  isRecurring?: boolean;
  isActive?: boolean;
};

type TasksResponse = {
  success: boolean;
  message: string;
  data: Task[];
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("activity_token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result: TasksResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch tasks.");
      }

      setTasks(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const markComplete = async (taskId: string) => {
    try {
      const token = localStorage.getItem("activity_token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/complete`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to complete task.");
      }

      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed.");
    }
  };

  const markSkip = async (taskId: string) => {
    try {
      const token = localStorage.getItem("activity_token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/skip`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to skip task.");
      }

      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed.");
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem("activity_token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete task.");
      }

      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Tasks</h2>
          <p className="mt-1 text-sm text-slate-400">
            Manage one-time and recurring work for the day.
          </p>
        </div>

        <Link
          href="/tasks/create"
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
        >
          Create task
        </Link>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          Loading tasks...
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          No tasks found. Create your first task.
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                      {task.priority || "MEDIUM"}
                    </span>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                      {task.type || "ONE_TIME"}
                    </span>
                  </div>

                  {task.description ? (
                    <p className="mt-2 text-sm text-slate-400">{task.description}</p>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span>Category: {task.category || "General"}</span>
                    <span>Recurring: {task.isRecurring ? "Yes" : "No"}</span>
                    <span>Active: {task.isActive ? "Yes" : "No"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/tasks/${task.id}`}
                    className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => markComplete(task.id)}
                    className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => markSkip(task.id)}
                    className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-medium text-slate-950 hover:bg-amber-400"
                  >
                    Skip
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="rounded-xl bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}