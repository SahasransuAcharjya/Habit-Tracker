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
      <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
        Select a task to view its details.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary-400">Task details</p>
          <h3 className="mt-2 text-2xl font-bold text-foreground">{task.title}</h3>
        </div>

        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          {task.status || "PENDING"}
        </span>
      </div>

      {task.description ? (
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{task.description}</p>
      ) : (
        <p className="mt-4 text-sm leading-6 text-muted-foreground">No description added.</p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Category</p>
          <p className="mt-2 text-sm text-foreground">{task.category || "General"}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Priority</p>
          <p className="mt-2 text-sm text-foreground">{task.priority || "LOW"}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Start time</p>
          <p className="mt-2 text-sm text-foreground">{task.startTime || "Not set"}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">End time</p>
          <p className="mt-2 text-sm text-foreground">{task.endTime || "Not set"}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reminder interval</p>
          <p className="mt-2 text-sm text-foreground">
            {task.reminderInterval ? `${task.reminderInterval} min` : "Not set"}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Recurrence</p>
          <p className="mt-2 text-sm text-foreground">{task.recurrenceRule || "One-time task"}</p>
        </div>
      </div>
    </div>
  );
}