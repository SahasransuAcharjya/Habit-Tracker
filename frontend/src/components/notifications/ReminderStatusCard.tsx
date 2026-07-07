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
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Reminder status</p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            {remindersEnabled ? "Active reminders" : "Reminders disabled"}
          </h3>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            remindersEnabled
              ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/25"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          {remindersEnabled ? "Enabled" : "Disabled"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Interval</p>
          <p className="mt-2 text-sm text-slate-200">
            {reminderInterval ? `${reminderInterval} min` : "Not set"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Tracked tasks</p>
          <p className="mt-2 text-sm text-slate-200">{totalTrackedTasks}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Auto missed</p>
          <p className="mt-2 text-sm text-slate-200">
            {autoMarkMissedEnabled ? "Enabled" : "Disabled"}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Pending tasks can keep reminding you until you complete them or the time window expires.
      </p>
    </div>
  );
}