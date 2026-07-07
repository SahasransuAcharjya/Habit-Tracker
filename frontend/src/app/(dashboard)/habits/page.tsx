"use client";

import { useHabits } from "@/hooks/useHabits";
import HabitCard from "@/components/habits/HabitCard";
import HabitForm from "@/components/habits/HabitForm";
import HabitStats from "@/components/habits/HabitStats";
import ErrorMessage from "@/components/ui/ErrorMessage";
import PageLoader from "@/components/ui/PageLoader";

export default function HabitsPage() {
  const {
    habits,
    loading,
    error,
    createHabit,
    deleteHabit,
    toggleHabitActive,
  } = useHabits();

  if (loading && habits.length === 0) {
    return <PageLoader text="Loading habits..." />;
  }

  const activeCount = habits.filter((h) => h.isActive).length;
  const pausedCount = habits.length - activeCount;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Habits</h2>
        <p className="mt-1 text-sm text-slate-400">
          Track recurring routines like workouts, study, and reading.
        </p>
      </div>

      <HabitStats
        totalHabits={habits.length}
        activeHabits={activeCount}
        pausedHabits={pausedCount}
      />

      <ErrorMessage message={error} />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {habits.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
              No habits found yet. Start by creating one.
            </div>
          ) : (
            <div className="grid gap-4">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onDelete={deleteHabit}
                  onToggleActive={toggleHabitActive}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <HabitForm onSubmit={createHabit} loading={loading} />
        </div>
      </div>
    </section>
  );
}