import { CheckCircle2, Gauge, Timer } from "lucide-react";

export default function SummaryStats({
  correctAnswers,
  accuracyPercent,
  time,
}) {
  const stats = [
    {
      icon: (
        <CheckCircle2
          className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500"
          strokeWidth={1.75}
        />
      ),
      label: "Correct",
      value: `${correctAnswers} Answers`,
    },
    {
      icon: (
        <Gauge
          className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500"
          strokeWidth={1.75}
        />
      ),
      label: "Accuracy",
      value: `${Math.round(accuracyPercent)} %`,
    },
    {
      icon: (
        <Timer
          className="w-6 h-6 sm:w-7 sm:h-7 text-violet-500"
          strokeWidth={1.75}
        />
      ),
      label: "Time",
      value: time,
    },
  ];

  return (
    <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-10">
      {stats.map(({ icon, label, value }) => (
        <div
          key={label}
          className="bg-zinc-800/50 border border-zinc-700/60 px-3 sm:px-5 py-4 sm:py-5 rounded-2xl flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2 sm:gap-4 shadow-sm"
        >
          <div className="shrink-0 drop-shadow-sm">{icon}</div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1 sm:mb-0.5">
              {label}
            </p>
            <p className="text-sm sm:text-base font-bold text-zinc-100">
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
