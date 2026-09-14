export default function SummaryStats({
  correctAnswers,
  accuracyPercent,
  time,
}) {
  const stats = [
    {
      icon: "check_circle",
      color: "text-primary",
      label: "Correct",
      value: `${correctAnswers} Answers`,
    },
    {
      icon: "speed",
      color: "text-secondary",
      label: "Accuracy",
      value: `${Math.round(accuracyPercent)} %`,
    },
    { icon: "timer", color: "text-tertiary", label: "Time", value: time },
  ];

  return (
    <div className="w-full grid grid-cols-3 gap-2 sm:gap-4 mb-5 sm:mb-10">
      {stats.map(({ icon, color, label, value }) => (
        <div
          key={label}
          className="bg-surface-container-low/40 px-2.5 sm:px-5 py-3 sm:py-4 rounded-xl flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2 sm:gap-4 premium-border"
        >
          <span
            className={`material-symbols-outlined ${color} text-lg sm:text-2xl`}
          >
            {icon}
          </span>
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mb-0.5">
              {label}
            </p>
            <p className="text-xs sm:text-base font-bold text-on-surface">
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
