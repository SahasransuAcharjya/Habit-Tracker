import { Task } from "@/types/task";
import { formatDateTime } from "@/lib/date";
import { formatEnumLabel } from "@/lib/utils";

type TaskCardProps = {
  task: Task;
  onComplete?: (taskId: string) => void;
  onSkip?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onSelect?: (task: Task) => void;
};

const priorityStyles: Record<string, string> = {
  LOW: "bg-slate-800 text-slate-200",
  MEDIUM: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/20",
  HIGH: "bg-red-500/15 text-red-300 ring-1 ring-red-500/20",
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/20",
  DONE: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/20",
  MISSED: "bg-red-500/15 text-red-300 ring-1 ring-red-500/20",
  SKIPPED: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/20",
};

export default function TaskCard({
  task,
  onComplete,
  onSkip,
  onDelete,
  onSelect,
}: TaskCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{task.title}</h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                priorityStyles[task.priority || "LOW"]
              }`}
            >
              {formatEnumLabel(task.priority || "LOW")}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                statusStyles[task.status || "PENDING"]
              }`}
            >
              {formatEnumLabel(task.status || "PENDING")}
            </span>
          </div>

          {task.description ? (
            <p className="mt-2 text-sm text-slate-400">{task.description}</p>
          ) : null}

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Category</p>
              <p className="mt-2 text-sm text-slate-200">{task.category || "General"}</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Start</p>
              <p className="mt-2 text-sm text-slate-200">{formatDateTime(task.startTime)}</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">End</p>
              <p className="mt-2 text-sm text-slate-200">{formatDateTime(task.endTime)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:w-52 md:justify-end">
          {onSelect ? (
            <button
              onClick={() => onSelect(task)}
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              View
            </button>
          ) : null}

          {task.status === "PENDING" && onComplete ? (
            <button
              onClick={() => onComplete(task.id)}
              className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
            >
              Complete
            </button>
          ) : null}

          {task.status === "PENDING" && onSkip ? (
            <button
              onClick={() => onSkip(task.id)}
              className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-amber-400"
            >
              Skip
            </button>
          ) : null}

          {onDelete ? (
            <button
              onClick={() => onDelete(task.id)}
              className="rounded-xl bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-400"
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}