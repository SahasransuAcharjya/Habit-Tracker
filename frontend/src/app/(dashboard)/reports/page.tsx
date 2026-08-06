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
          <p className="mt-1 text-sm text-muted-foreground">
            Review your performance and get honest feedback.
          </p>
        </div>

        <button
          onClick={() => generateTodayReport()}
          disabled={loading}
          className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-400 disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate report"}
        </button>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <PageLoader text="Loading report..." />
      ) : !report ? (
        <div className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
          No report available yet. Click generate to create one.
        </div>
      ) : (
        <ReportCard report={report} />
      )}
    </section>
  );
}