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
      value: `${accuracyPercent}%`,
    },
    { icon: "timer", color: "text-tertiary", label: "Time", value: time },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      {stats.map(({ icon, color, label, value }) => (
        <div
          key={label}
          className="bg-surface-container-low/40 px-5 py-4 rounded-xl flex items-center gap-4 premium-border"
        >
          <span className={`material-symbols-outlined ${color} text-2xl`}>
            {icon}
          </span>
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mb-0.5">
              {label}
            </p>
            <p className="text-base font-bold text-on-surface">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
