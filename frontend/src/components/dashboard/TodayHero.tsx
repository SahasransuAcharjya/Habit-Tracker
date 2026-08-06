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
    <section className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary-500/10 p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-primary-400">Today</p>
      <h2 className="mt-2 text-3xl font-bold text-foreground">{todayText}</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Finish what matters, avoid fake productivity, and give yourself a day worth
        respecting tonight.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Completed</p>
          <p className="mt-2 text-2xl font-bold text-sky-500">{completedCount}</p>
        </div>

        <div className="rounded-xl border border-border bg-background/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pending</p>
          <p className="mt-2 text-2xl font-bold text-primary-500">{pendingCount}</p>
        </div>

        <div className="rounded-xl border border-border bg-background/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Skipped</p>
          <p className="mt-2 text-2xl font-bold text-amber-500">{skippedCount}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/tasks/create"
          className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-400"
        >
          Create task
        </Link>

        <Link
          href="/reports"
          className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Open report
        </Link>
      </div>
    </section>
  );
}