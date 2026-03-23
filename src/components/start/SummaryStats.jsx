const stats = [
  {
    icon: "quiz",
    label: "questions",
    value: "15 Total",
    // value: "15 Total",
    color: "text-primary-dim",
    hover: "hover:border-primary/20",
  },
  {
    icon: "bar_chart",
    label: "difficulty",
    value: "Medium",
    color: "text-tertiary-dim",
    hover: "hover:border-tertiary/20",
  },
  {
    icon: "schedule",
    label: "time",
    value: "8 min",
    color: "text-secondary-dim",
    hover: "hover:border-secondary/20",
  },
];

export default function SummaryStats({ questionCount }) {
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4">
      {stats.map(({ icon, label, value, color, hover }) => (
        <div
          key={label}
          className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5 ${hover} transition-colors`}
        >
          <span className={`material-symbols-outlined ${color} opacity-80`}>
            {icon}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">
            {label}
          </span>
          <span className="text-base font-bold text-on-surface">
            {label === "questions" ? `${questionCount} Total` : value}
          </span>
        </div>
      ))}
    </div>
  );
}
