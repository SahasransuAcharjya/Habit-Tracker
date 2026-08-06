"use client";

import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { useReport } from "@/hooks/useReport";
import TodayHero from "@/components/dashboard/TodayHero";
import TaskCard from "@/components/tasks/TaskCard";
import ReportCard from "@/components/reports/ReportCard";
import ErrorMessage from "@/components/ui/ErrorMessage";
import PageLoader from "@/components/ui/PageLoader";

export default function TodayPage() {
  const { tasks, loading: tasksLoading, error: tasksError, completeTask, skipTask } = useTasks();
  const { report, loading: reportLoading, error: reportError } = useReport();

  if (tasksLoading && reportLoading) {
    return <PageLoader text="Loading today's dashboard..." />;
  }

  const todayTasks = tasks.filter(t => t.status === "PENDING" || t.status === "DONE" || t.status === "SKIPPED");
  const pendingTasks = todayTasks.filter(t => t.status === "PENDING").length;
  const completedTasks = todayTasks.filter(t => t.status === "DONE").length;
  const skippedTasks = todayTasks.filter(t => t.status === "SKIPPED").length;

  return (
    <div className="space-y-6">
      <TodayHero
        pendingCount={pendingTasks}
        completedCount={completedTasks}
        skippedCount={skippedTasks}
      />

      <ErrorMessage message={tasksError || reportError} />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Today&apos;s tasks</h3>
              <p className="text-sm text-muted-foreground">Your active plan for the day.</p>
            </div>
            <Link href="/tasks" className="text-sm text-primary-400 hover:text-primary-600">
              View all
            </Link>
          </div>

          {tasksLoading ? (
            <PageLoader text="Loading tasks..." />
          ) : todayTasks.length === 0 ? (
             <div className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
                No tasks found for now. Start by creating one.
             </div>
          ) : (
            <div className="grid gap-4">
              {todayTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={() => completeTask(task.id)}
                  onSkip={() => skipTask(task.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">Today&apos;s report snapshot</h3>
            <p className="text-sm text-muted-foreground">Quick view of your current standing.</p>
          </div>

          {reportLoading ? (
            <PageLoader text="Loading report..." />
          ) : !report ? (
             <div className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
                No report generated yet. It will appear after report generation.
             </div>
          ) : (
             <ReportCard report={report} />
          )}
        </div>
      </div>
    </div>
  );
}