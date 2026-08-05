"use client";

import { useEffect, useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskList from "@/components/tasks/TaskList";
import PageLoader from "@/components/ui/PageLoader";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { apiGet } from "@/lib/api";
import { Report } from "@/types/report";

export default function HistoryPage() {
  const { tasks, loading: tasksLoading, error: tasksError } = useTasks();
  const [reports, setReports] = useState<Report[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportsError, setReportsError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setReportsLoading(true);
        const token = localStorage.getItem("activity_token");
        // Assuming GET /reports returns a list of older reports
        const result = await apiGet<{ data: Report[] }>("/reports", token);
        setReports(result.data || []);
      } catch (err) {
        setReportsError(err instanceof Error ? err.message : "Failed to load past reports.");
      } finally {
        setReportsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const historyTasks = tasks.filter(
    (t) => t.status === "DONE" || t.status === "MISSED" || t.status === "SKIPPED"
  );

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">History</h2>
        <p className="mt-1 text-sm text-stone-500">
          Review your past tasks and daily report summaries.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold border-b border-stone-200 pb-2">Past Reports</h3>
        <ErrorMessage message={reportsError} />
        {reportsLoading ? (
          <PageLoader text="Loading past reports..." />
        ) : reports.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-stone-600">
            No past reports found.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {reports.map((r) => (
              <div key={r.id} className="rounded-2xl border border-stone-200 bg-white p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-stone-700">{r.reportDate}</span>
                  <span className="text-red-400 font-bold">Score: {r.score}</span>
                </div>
                <p className="text-sm text-stone-500">{r.summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold border-b border-stone-200 pb-2">Task History</h3>
        <ErrorMessage message={tasksError} />
        {tasksLoading ? (
          <PageLoader text="Loading past tasks..." />
        ) : historyTasks.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-stone-600">
            No completed, missed, or skipped tasks found.
          </div>
        ) : (
          <TaskList
            tasks={historyTasks}
            onComplete={() => {}}
            onSkip={() => {}}
            onDelete={() => {}}
          />
        )}
      </div>
    </section>
  );
}