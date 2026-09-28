import { useEffect } from "react";
import { formatTime } from "../../utils/formatTime";
import { Clock } from "lucide-react";

export default function QuestionTimer({ remainingSeconds, dispatch }) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "tickTock" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const isUrgent = remainingSeconds <= 10;

  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-colors ${
        isUrgent
          ? "border-zinc-700 bg-zinc-900 text-zinc-100 animate-pulse"
          : "border-zinc-900 bg-zinc-950 text-zinc-400"
      }`}
    >
      <Clock className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
      <span className="tracking-tight">{formatTime(remainingSeconds)}</span>
    </div>
  );
}
