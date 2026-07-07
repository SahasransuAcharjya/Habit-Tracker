"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

type TaskResponse = {
  success: boolean;
  message: string;
  data: Task[];
};

type Report = {
  id?: string;
  score?: number;
  summary?: string;
  praiseText?: string;
  tauntText?: string;
  motivationText?: string;
};

type ReportResponse = {
  success: boolean;
  message: string;
  data?: Report;
};

export default function TodayPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [report, setReport] = useState<Report | null>(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingReport, setLoadingReport] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string>("");
  const [error, setError] = useState("");

  const todayText = useMemo(() => {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);
      const token = localStorage.getItem("activity_token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result: TaskResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch tasks.");
      }

      setTasks(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks.");
    } finally {
      setLoadingTasks(false);
    }
  };

  const fetchReport = async () => {
    try {
      setLoadingReport(true);
      const token = localStorage.getItem("activity_token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/today`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result: ReportResponse = await response.json();

      if (response.ok && result.success) {
        setReport(result.data || null);
      } else {
        setReport(null);
      }
    } catch {
      setReport(null);
    } finally {
      setLoadingReport(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchReport();
  }, []);

  const handleTaskAction = async (taskId: string, action: "complete" | "skip") => {
    try {
      setError("");
      setActionLoadingId(taskId);

      const token = localStorage.getItem("activity_token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/${action}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || `Failed to ${action} task.`);
      }

      await fetchTasks();
      await fetchReport();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${action} task.`);
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">Today</p>
        <h2 className="mt-2 text-3xl font-bold text-white">{todayText}</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Focus on what must be finished today. Complete tasks on time, avoid skips, and
          build momentum before the day ends.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tasks/create"
            className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Create task
          </Link>
          <Link
            href="/reports"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            View report
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Today&apos;s tasks</h3>
              <p className="text-sm text-slate-400">Your active plan for the day.</p>
            </div>
            <Link href="/tasks" className="text-sm text-cyan-400 hover:text-cyan-300">
              View all
            </Link>
          </div>

          {loadingTasks ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
              No tasks found for now. Start by creating one.
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
                        <h4 className="text-lg font-semibold text-white">{task.title}</h4>
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
                        Details
                      </Link>
                      <button
                        onClick={() => handleTaskAction(task.id, "complete")}
                        disabled={actionLoadingId === task.id}
                        className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
                      >
                        {actionLoadingId === task.id ? "Working..." : "Complete"}
                      </button>
                      <button
                        onClick={() => handleTaskAction(task.id, "skip")}
                        disabled={actionLoadingId === task.id}
                        className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-medium text-slate-950 hover:bg-amber-400 disabled:opacity-60"
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">Today&apos;s report snapshot</h3>
            <p className="text-sm text-slate-400">Quick view of your current standing.</p>
          </div>

          {loadingReport ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
              Loading report...
            </div>
          ) : !report ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
              No report generated yet. It will appear after report generation.
            </div>
          ) : (
            <>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">Score</p>
                <h4 className="mt-3 text-4xl font-bold text-white">{report.score ?? 0}</h4>
                <p className="mt-3 text-sm text-slate-300">
                  {report.summary || "No summary available yet."}
                </p>
              </div>

              {report.praiseText ? (
                <div className="rounded-2xl border border-emerald-800 bg-emerald-950/30 p-5">
                  <p className="text-sm font-semibold text-emerald-300">Praise</p>
                  <p className="mt-2 text-sm text-emerald-100">{report.praiseText}</p>
                </div>
              ) : null}

              {report.tauntText ? (
                <div className="rounded-2xl border border-amber-800 bg-amber-950/30 p-5">
                  <p className="text-sm font-semibold text-amber-300">Reality check</p>
                  <p className="mt-2 text-sm text-amber-100">{report.tauntText}</p>
                </div>
              ) : null}

              {report.motivationText ? (
                <div className="rounded-2xl border border-cyan-800 bg-cyan-950/30 p-5">
                  <p className="text-sm font-semibold text-cyan-300">Motivation</p>
                  <p className="mt-2 text-sm text-cyan-100">{report.motivationText}</p>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}