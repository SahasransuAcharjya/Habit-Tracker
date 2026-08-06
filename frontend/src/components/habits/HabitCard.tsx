import { Habit } from "@/types/habit";
import { formatTime } from "@/lib/date";
import { formatEnumLabel } from "@/lib/utils";

type HabitCardProps = {
  habit: Habit;
  onDelete?: (habitId: string) => void;
  onToggleActive?: (habitId: string, nextValue: boolean) => void;
};

const dayMap: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

export default function HabitCard({
  habit,
  onDelete,
  onToggleActive,
}: HabitCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{habit.title}</h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                habit.isActive
                  ? "bg-sky-500/15 text-sky-600 ring-1 ring-sky-500/25"
                  : "bg-stone-100 text-muted-foreground"
              }`}
            >
              {habit.isActive ? "Active" : "Paused"}
            </span>

            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-muted-foreground">
              {formatEnumLabel(habit.frequency || "DAILY")}
            </span>
          </div>

          {habit.description ? (
            <p className="mt-2 text-sm text-muted-foreground">{habit.description}</p>
          ) : null}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Category</p>
              <p className="mt-2 text-sm text-foreground">{habit.category || "General"}</p>
            </div>

            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reminder</p>
              <p className="mt-2 text-sm text-foreground">
                {formatTime(habit.reminderTime)}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Target days</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {habit.targetDays && habit.targetDays.length > 0 ? (
                habit.targetDays.map((day) => (
                  <span
                    key={day}
                    className="rounded-full bg-primary-500/15 px-3 py-1 text-xs font-medium text-primary-600 ring-1 ring-primary-500/20"
                  >
                    {dayMap[day] ?? day}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No target days selected</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {onToggleActive ? (
            <button
              onClick={() => onToggleActive(habit.id, !habit.isActive)}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                habit.isActive
                  ? "bg-amber-500 text-white hover:bg-amber-400"
                  : "bg-sky-500 text-white hover:bg-sky-400"
              }`}
            >
              {habit.isActive ? "Pause" : "Activate"}
            </button>
          ) : null}

          {onDelete ? (
            <button
              onClick={() => onDelete(habit.id)}
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