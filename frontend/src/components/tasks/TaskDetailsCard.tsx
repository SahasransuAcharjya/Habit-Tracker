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
      <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center text-sm text-stone-500">
        Select a task to view its details.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-red-400">Task details</p>
          <h3 className="mt-2 text-2xl font-bold text-stone-800">{task.title}</h3>
        </div>

        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
          {task.status || "PENDING"}
        </span>
      </div>

      {task.description ? (
        <p className="mt-4 text-sm leading-6 text-stone-600">{task.description}</p>
      ) : (
        <p className="mt-4 text-sm leading-6 text-stone-400">No description added.</p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-stone-200 bg-[#fdfaf6] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Category</p>
          <p className="mt-2 text-sm text-stone-700">{task.category || "General"}</p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-[#fdfaf6] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Priority</p>
          <p className="mt-2 text-sm text-stone-700">{task.priority || "LOW"}</p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-[#fdfaf6] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Start time</p>
          <p className="mt-2 text-sm text-stone-700">{task.startTime || "Not set"}</p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-[#fdfaf6] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">End time</p>
          <p className="mt-2 text-sm text-stone-700">{task.endTime || "Not set"}</p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-[#fdfaf6] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Reminder interval</p>
          <p className="mt-2 text-sm text-stone-700">
            {task.reminderInterval ? `${task.reminderInterval} min` : "Not set"}
          </p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-[#fdfaf6] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Recurrence</p>
          <p className="mt-2 text-sm text-stone-700">{task.recurrenceRule || "One-time task"}</p>
        </div>
      </div>
    </div>
  );
}