type TaskStatsProps = {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  missedTasks: number;
};

export default function TaskStats({
  totalTasks,
  completedTasks,
  pendingTasks,
  missedTasks,
}: TaskStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total tasks</p>
        <h3 className="mt-3 text-3xl font-bold text-foreground">{totalTasks}</h3>
        <p className="mt-2 text-sm text-muted-foreground">All tasks currently available.</p>
      </div>

      <div className="rounded-2xl border border-emerald-800 bg-sky-50/20 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Completed</p>
        <h3 className="mt-3 text-3xl font-bold text-emerald-200">{completedTasks}</h3>
        <p className="mt-2 text-sm text-emerald-100/80">Tasks finished successfully.</p>
      </div>

      <div className="rounded-2xl border border-cyan-800 bg-primary-50/20 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-primary-600">Pending</p>
        <h3 className="mt-3 text-3xl font-bold text-cyan-200">{pendingTasks}</h3>
        <p className="mt-2 text-sm text-cyan-100/80">Tasks still waiting for action.</p>
      </div>

      <div className="rounded-2xl border border-primary-800 bg-primary-950/20 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-primary-300">Missed</p>
        <h3 className="mt-3 text-3xl font-bold text-primary-200">{missedTasks}</h3>
        <p className="mt-2 text-sm text-primary-100/80">Tasks that were not finished in time.</p>
      </div>
    </div>
  );
}