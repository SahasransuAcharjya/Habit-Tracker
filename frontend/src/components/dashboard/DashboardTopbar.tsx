"use client";

import Link from "next/link";

type DashboardTopbarProps = {
  title?: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
};

export default function DashboardTopbar({
  title = "Dashboard",
  subtitle = "Plan, track, review, improve.",
  actionHref = "/tasks/create",
  actionLabel = "+ New Task",
}: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/85 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-white">{title}</h1>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>

        <Link
          href={actionHref}
          className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          {actionLabel}
        </Link>
      </div>
    </header>
  );
}