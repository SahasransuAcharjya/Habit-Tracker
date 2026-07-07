type ScoreRingProps = {
  score: number;
  size?: number;
  strokeWidth?: number;
};

export default function ScoreRing({
  score,
  size = 120,
  strokeWidth = 10,
}: ScoreRingProps) {
  const normalizedScore = Math.max(0, Math.min(100, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset =
    circumference - (normalizedScore / 100) * circumference;

  const toneClass =
    normalizedScore >= 75
      ? "text-emerald-400"
      : normalizedScore >= 45
      ? "text-amber-400"
      : "text-red-400";

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className={`${toneClass} transition-all duration-500`}
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{normalizedScore}</span>
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Score
        </span>
      </div>
    </div>
  );
}