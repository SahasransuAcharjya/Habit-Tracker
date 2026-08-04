"use client";

import { useReport } from "@/hooks/useReport";
import ReportCard from "@/components/reports/ReportCard";
import ErrorMessage from "@/components/ui/ErrorMessage";
import PageLoader from "@/components/ui/PageLoader";

export default function ReportsPage() {
  const { report, loading, error, generateTodayReport } = useReport();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Today&apos;s report</h2>
          <p className="mt-1 text-sm text-slate-400">
            Review your performance and get honest feedback.
          </p>
        </div>

        <button
          onClick={() => generateTodayReport()}
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate report"}
        </button>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <PageLoader text="Loading report..." />
      ) : !report ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          No report available yet. Click generate to create one.
        </div>
      ) : (
        <ReportCard report={report} />
      )}
    </section>
  );
}