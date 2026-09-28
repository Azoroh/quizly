import { CheckCircle2, Gauge, Timer } from "lucide-react";

export default function SummaryStats({
  correctAnswers,
  accuracyPercent,
  time,
}) {
  const stats = [
    {
      icon: <CheckCircle2 className="w-4 h-4 text-zinc-500" strokeWidth={2} />,
      label: "Correct",
      value: `${correctAnswers} Ans`,
    },
    {
      icon: <Gauge className="w-4 h-4 text-zinc-500" strokeWidth={2} />,
      label: "Accuracy",
      value: `${Math.round(accuracyPercent)}%`,
    },
    {
      icon: <Timer className="w-4 h-4 text-zinc-500" strokeWidth={2} />,
      label: "Time",
      value: time,
    },
  ];

  return (
    <div className="w-full grid grid-cols-3 gap-2 mb-6">
      {stats.map(({ icon, label, value }) => (
        <div
          key={label}
          className="bg-zinc-950/50 border border-zinc-900 px-3 py-3 rounded-lg flex flex-col items-center text-center gap-1.5"
        >
          <div className="shrink-0">{icon}</div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-600">
            {label}
          </span>
          <span className="text-xs sm:text-sm font-medium text-zinc-200">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
