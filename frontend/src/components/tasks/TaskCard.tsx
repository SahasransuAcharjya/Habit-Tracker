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
  LOW: "bg-stone-100 text-foreground",
  MEDIUM: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/20",
  HIGH: "bg-primary-500/15 text-primary-300 ring-1 ring-primary-500/20",
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-primary-500/15 text-primary-600 ring-1 ring-primary-500/20",
  DONE: "bg-sky-500/15 text-sky-600 ring-1 ring-sky-500/20",
  MISSED: "bg-primary-500/15 text-primary-300 ring-1 ring-primary-500/20",
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
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{task.title}</h3>

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
            <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
          ) : null}

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Category</p>
              <p className="mt-2 text-sm text-foreground">{task.category || "General"}</p>
            </div>

            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Start</p>
              <p className="mt-2 text-sm text-foreground">{formatDateTime(task.startTime)}</p>
            </div>

            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">End</p>
              <p className="mt-2 text-sm text-foreground">{formatDateTime(task.endTime)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:w-52 md:justify-end">
          {onSelect ? (
            <button
              onClick={() => onSelect(task)}
              className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-stone-100"
            >
              View
            </button>
          ) : null}

          {task.status === "PENDING" && onComplete ? (
            <button
              onClick={() => onComplete(task.id)}
              className="rounded-xl bg-sky-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-400"
            >
              Complete
            </button>
          ) : null}

          {task.status === "PENDING" && onSkip ? (
            <button
              onClick={() => onSkip(task.id)}
              className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-400"
            >
              Skip
            </button>
          ) : null}

          {onDelete ? (
            <button
              onClick={() => onDelete(task.id)}
              className="rounded-xl bg-primary-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-primary-400"
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}