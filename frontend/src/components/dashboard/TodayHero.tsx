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
    <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">Today</p>
      <h2 className="mt-2 text-3xl font-bold text-white">{todayText}</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-300">
        Finish what matters, avoid fake productivity, and give yourself a day worth
        respecting tonight.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Completed</p>
          <p className="mt-2 text-2xl font-bold text-emerald-300">{completedCount}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Pending</p>
          <p className="mt-2 text-2xl font-bold text-cyan-300">{pendingCount}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Skipped</p>
          <p className="mt-2 text-2xl font-bold text-amber-300">{skippedCount}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/tasks/create"
          className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Create task
        </Link>

        <Link
          href="/reports"
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
        >
          Open report
        </Link>
      </div>
    </section>
  );
}