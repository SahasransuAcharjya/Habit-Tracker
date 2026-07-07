"use client";

import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskList from "@/components/tasks/TaskList";
import TaskStats from "@/components/tasks/TaskStats";
import ErrorMessage from "@/components/ui/ErrorMessage";
import PageLoader from "@/components/ui/PageLoader";

export default function TasksPage() {
  const {
    tasks,
    filteredTasks,
    filters,
    setFilters,
    loading,
    error,
    completeTask,
    skipTask,
    deleteTask,
  } = useTasks();

  if (loading && tasks.length === 0) {
    return <PageLoader text="Loading tasks..." />;
  }

  const pendingCount = tasks.filter((t) => t.status === "PENDING").length;
  const completedCount = tasks.filter((t) => t.status === "DONE").length;
  const missedCount = tasks.filter((t) => t.status === "MISSED").length;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tasks</h2>
          <p className="mt-1 text-sm text-slate-400">
            Manage one-time and recurring work for the day.
          </p>
        </div>

        <Link
          href="/tasks/create"
          className="shrink-0 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          + Create task
        </Link>
      </div>

      <TaskStats
        totalTasks={tasks.length}
        completedTasks={completedCount}
        pendingTasks={pendingCount}
        missedTasks={missedCount}
      />

      <TaskFilters filters={filters} onChange={setFilters} />

      <ErrorMessage message={error} />

      <TaskList
        tasks={filteredTasks}
        onComplete={completeTask}
        onSkip={skipTask}
        onDelete={deleteTask}
      />
    </section>
  );
}