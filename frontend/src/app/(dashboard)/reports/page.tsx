"use client";

import { useEffect, useState } from "react";

type Report = {
  id: string;
  reportDate?: string;
  score?: number;
  summary?: string;
  praiseText?: string;
  tauntText?: string;
  motivationText?: string;
};

type ReportResponse = {
  success: boolean;
  message: string;
  data: Report;
};

export default function ReportsPage() {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);

  const fetchTodayReport = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("activity_token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/today`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result: ReportResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch report.");
      }

      setReport(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayReport();
  }, []);

  const generateReport = async () => {
    try {
      setGenerating(true);
      setError("");

      const token = localStorage.getItem("activity_token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const result: ReportResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to generate report.");
      }

      setReport(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate report.");
    } finally {
      setGenerating(false);
    }
  };

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
          onClick={generateReport}
          disabled={generating}
          className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
        >
          {generating ? "Generating..." : "Generate report"}
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          Loading report...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          {error}
        </div>
      ) : !report ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          No report available yet.
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold">{report.reportDate || "Today"}</h3>
              <span className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950">
                Score: {report.score ?? 0}
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-300">
              {report.summary || "No summary generated."}
            </p>
          </div>

          {report.praiseText ? (
            <div className="rounded-2xl border border-emerald-800 bg-emerald-950/30 p-5">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Praise
              </h4>
              <p className="mt-3 text-sm text-emerald-100">{report.praiseText}</p>
            </div>
          ) : null}

          {report.tauntText ? (
            <div className="rounded-2xl border border-amber-800 bg-amber-950/30 p-5">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Reality check
              </h4>
              <p className="mt-3 text-sm text-amber-100">{report.tauntText}</p>
            </div>
          ) : null}

          {report.motivationText ? (
            <div className="rounded-2xl border border-cyan-800 bg-cyan-950/30 p-5">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Motivation
              </h4>
              <p className="mt-3 text-sm text-cyan-100">{report.motivationText}</p>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}