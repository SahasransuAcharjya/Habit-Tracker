type TaskDetails = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "PENDING" | "DONE" | "MISSED" | "SKIPPED";
  startTime?: string | null;
  endTime?: string | null;
  reminderInterval?: number | null;
  recurrenceRule?: string | null;
};

type TaskDetailsCardProps = {
  task: TaskDetails | null;
};

export default function TaskDetailsCard({ task }: TaskDetailsCardProps) {
  if (!task) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center text-sm text-slate-400">
        Select a task to view its details.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">Task details</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{task.title}</h3>
        </div>

        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
          {task.status || "PENDING"}
        </span>
      </div>

      {task.description ? (
        <p className="mt-4 text-sm leading-6 text-slate-300">{task.description}</p>
      ) : (
        <p className="mt-4 text-sm leading-6 text-slate-500">No description added.</p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Category</p>
          <p className="mt-2 text-sm text-slate-200">{task.category || "General"}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Priority</p>
          <p className="mt-2 text-sm text-slate-200">{task.priority || "LOW"}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Start time</p>
          <p className="mt-2 text-sm text-slate-200">{task.startTime || "Not set"}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">End time</p>
          <p className="mt-2 text-sm text-slate-200">{task.endTime || "Not set"}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Reminder interval</p>
          <p className="mt-2 text-sm text-slate-200">
            {task.reminderInterval ? `${task.reminderInterval} min` : "Not set"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Recurrence</p>
          <p className="mt-2 text-sm text-slate-200">{task.recurrenceRule || "One-time task"}</p>
        </div>
      </div>
    </div>
  );
}