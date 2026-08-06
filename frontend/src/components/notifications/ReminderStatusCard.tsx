type ReminderStatusCardProps = {
  remindersEnabled: boolean;
  reminderInterval?: number | null;
  totalTrackedTasks?: number;
  autoMarkMissedEnabled?: boolean;
};

export default function ReminderStatusCard({
  remindersEnabled,
  reminderInterval = null,
  totalTrackedTasks = 0,
  autoMarkMissedEnabled = true,
}: ReminderStatusCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reminder status</p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">
            {remindersEnabled ? "Active reminders" : "Reminders disabled"}
          </h3>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            remindersEnabled
              ? "bg-sky-500/15 text-sky-600 ring-1 ring-sky-500/25"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {remindersEnabled ? "Enabled" : "Disabled"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Interval</p>
          <p className="mt-2 text-sm text-foreground">
            {reminderInterval ? `${reminderInterval} min` : "Not set"}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tracked tasks</p>
          <p className="mt-2 text-sm text-foreground">{totalTrackedTasks}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Auto missed</p>
          <p className="mt-2 text-sm text-foreground">
            {autoMarkMissedEnabled ? "Enabled" : "Disabled"}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Pending tasks can keep reminding you until you complete them or the time window expires.
      </p>
    </div>
  );
}