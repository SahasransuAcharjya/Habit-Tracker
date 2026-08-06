import ScoreRing from "./ScoreRing";
import ReportFeedbackCard from "./ReportFeedbackCard";

type Report = {
  id?: string;
  reportDate?: string;
  score?: number;
  summary?: string;
  praiseText?: string;
  tauntText?: string;
  motivationText?: string;
};

type ReportCardProps = {
  report: Report;
};

export default function ReportCard({ report }: ReportCardProps) {
  const score = report.score ?? 0;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
        <div className="grid gap-6 md:grid-cols-[160px_1fr] md:items-center">
          <div className="flex justify-center">
            <ScoreRing score={score} />
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary-400">
                  Daily report
                </p>
                <h3 className="mt-2 text-2xl font-bold text-foreground">
                  {report.reportDate || "Today"}
                </h3>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  score >= 75
                    ? "bg-sky-500/15 text-sky-600 ring-1 ring-sky-500/25"
                    : score >= 45
                    ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/25"
                    : "bg-primary-500/15 text-primary-300 ring-1 ring-primary-500/25"
                }`}
              >
                {score >= 75
                  ? "Strong day"
                  : score >= 45
                  ? "Average day"
                  : "Poor day"}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {report.summary || "No summary available for this report yet."}
            </p>
          </div>
        </div>
      </div>

      {report.praiseText ? (
        <ReportFeedbackCard
          title="Praise"
          text={report.praiseText}
          tone="praise"
        />
      ) : null}

      {report.tauntText ? (
        <ReportFeedbackCard
          title="Reality check"
          text={report.tauntText}
          tone="warning"
        />
      ) : null}

      {report.motivationText ? (
        <ReportFeedbackCard
          title="Motivation"
          text={report.motivationText}
          tone="motivation"
        />
      ) : null}
    </div>
  );
}