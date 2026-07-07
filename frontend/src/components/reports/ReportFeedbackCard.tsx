type ReportFeedbackCardProps = {
  title: string;
  text: string;
  tone?: "praise" | "warning" | "motivation";
};

const toneStyles = {
  praise: {
    wrapper: "border-emerald-800 bg-emerald-950/30",
    title: "text-emerald-300",
    text: "text-emerald-100",
  },
  warning: {
    wrapper: "border-amber-800 bg-amber-950/30",
    title: "text-amber-300",
    text: "text-amber-100",
  },
  motivation: {
    wrapper: "border-cyan-800 bg-cyan-950/30",
    title: "text-cyan-300",
    text: "text-cyan-100",
  },
};

export default function ReportFeedbackCard({
  title,
  text,
  tone = "motivation",
}: ReportFeedbackCardProps) {
  const styles = toneStyles[tone];

  return (
    <div className={`rounded-2xl border p-5 ${styles.wrapper}`}>
      <h4 className={`text-sm font-semibold uppercase tracking-[0.2em] ${styles.title}`}>
        {title}
      </h4>
      <p className={`mt-3 text-sm leading-6 ${styles.text}`}>{text}</p>
    </div>
  );
}