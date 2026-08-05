"use client";

import Link from "next/link";
import { useMemo } from "react";

type TodayHeroProps = {
  completedCount?: number;
  pendingCount?: number;
  skippedCount?: number;
};

export default function TodayHero({
  completedCount = 0,
  pendingCount = 0,
  skippedCount = 0,
}: TodayHeroProps) {
  const todayText = useMemo(() => {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  return (
    <section className="rounded-2xl border border-stone-200 bg-gradient-to-br from-slate-900 via-slate-900 to-red-50/30 p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-red-400">Today</p>
      <h2 className="mt-2 text-3xl font-bold text-stone-800">{todayText}</h2>
      <p className="mt-2 max-w-2xl text-sm text-stone-600">
        Finish what matters, avoid fake productivity, and give yourself a day worth
        respecting tonight.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-stone-200 bg-[#fdfaf6]/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Completed</p>
          <p className="mt-2 text-2xl font-bold text-sky-600">{completedCount}</p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-[#fdfaf6]/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Pending</p>
          <p className="mt-2 text-2xl font-bold text-red-600">{pendingCount}</p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-[#fdfaf6]/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Skipped</p>
          <p className="mt-2 text-2xl font-bold text-amber-300">{skippedCount}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/tasks/create"
          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-red-400"
        >
          Create task
        </Link>

        <Link
          href="/reports"
          className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
        >
          Open report
        </Link>
      </div>
    </section>
  );
}