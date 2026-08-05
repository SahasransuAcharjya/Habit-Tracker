type HabitStatsProps = {
  totalHabits: number;
  activeHabits: number;
  pausedHabits: number;
};

export default function HabitStats({
  totalHabits,
  activeHabits,
  pausedHabits,
}: HabitStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Total habits</p>
        <h3 className="mt-3 text-3xl font-bold text-stone-800">{totalHabits}</h3>
        <p className="mt-2 text-sm text-stone-500">All recurring routines you created.</p>
      </div>

      <div className="rounded-2xl border border-emerald-800 bg-sky-50/20 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Active</p>
        <h3 className="mt-3 text-3xl font-bold text-emerald-200">{activeHabits}</h3>
        <p className="mt-2 text-sm text-emerald-100/80">Habits currently being tracked.</p>
      </div>

      <div className="rounded-2xl border border-amber-800 bg-amber-950/20 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Paused</p>
        <h3 className="mt-3 text-3xl font-bold text-amber-200">{pausedHabits}</h3>
        <p className="mt-2 text-sm text-amber-100/80">Habits temporarily inactive.</p>
      </div>
    </div>
  );
}