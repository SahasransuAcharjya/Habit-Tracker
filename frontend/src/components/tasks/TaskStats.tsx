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
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total tasks</p>
        <h3 className="mt-3 text-3xl font-bold text-white">{totalTasks}</h3>
        <p className="mt-2 text-sm text-slate-400">All tasks currently available.</p>
      </div>

      <div className="rounded-2xl border border-emerald-800 bg-emerald-950/20 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Completed</p>
        <h3 className="mt-3 text-3xl font-bold text-emerald-200">{completedTasks}</h3>
        <p className="mt-2 text-sm text-emerald-100/80">Tasks finished successfully.</p>
      </div>

      <div className="rounded-2xl border border-cyan-800 bg-cyan-950/20 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Pending</p>
        <h3 className="mt-3 text-3xl font-bold text-cyan-200">{pendingTasks}</h3>
        <p className="mt-2 text-sm text-cyan-100/80">Tasks still waiting for action.</p>
      </div>

      <div className="rounded-2xl border border-red-800 bg-red-950/20 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-red-300">Missed</p>
        <h3 className="mt-3 text-3xl font-bold text-red-200">{missedTasks}</h3>
        <p className="mt-2 text-sm text-red-100/80">Tasks that were not finished in time.</p>
      </div>
    </div>
  );
}