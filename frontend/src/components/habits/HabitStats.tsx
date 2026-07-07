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
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total habits</p>
        <h3 className="mt-3 text-3xl font-bold text-white">{totalHabits}</h3>
        <p className="mt-2 text-sm text-slate-400">All recurring routines you created.</p>
      </div>

      <div className="rounded-2xl border border-emerald-800 bg-emerald-950/20 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Active</p>
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