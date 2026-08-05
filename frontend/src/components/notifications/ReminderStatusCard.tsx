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
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Reminder status</p>
          <h3 className="mt-2 text-lg font-semibold text-stone-800">
            {remindersEnabled ? "Active reminders" : "Reminders disabled"}
          </h3>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            remindersEnabled
              ? "bg-sky-500/15 text-sky-600 ring-1 ring-sky-500/25"
              : "bg-stone-100 text-stone-600"
          }`}
        >
          {remindersEnabled ? "Enabled" : "Disabled"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-stone-200 bg-[#fdfaf6] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Interval</p>
          <p className="mt-2 text-sm text-stone-700">
            {reminderInterval ? `${reminderInterval} min` : "Not set"}
          </p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-[#fdfaf6] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Tracked tasks</p>
          <p className="mt-2 text-sm text-stone-700">{totalTrackedTasks}</p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-[#fdfaf6] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Auto missed</p>
          <p className="mt-2 text-sm text-stone-700">
            {autoMarkMissedEnabled ? "Enabled" : "Disabled"}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-stone-500">
        Pending tasks can keep reminding you until you complete them or the time window expires.
      </p>
    </div>
  );
}