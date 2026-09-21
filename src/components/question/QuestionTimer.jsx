import { useEffect } from "react";
import { formatTime } from "../../utils/formatTime";
import { Badge } from "../ui/badge";
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
    <Badge
      variant="outline"
      className={`gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300 ${
        isUrgent
          ? "border-rose-500/40 bg-rose-500/10 text-rose-300 animate-pulse"
          : "border-zinc-700/60 bg-zinc-800/60 text-zinc-300"
      }`}
    >
      <Clock
        className={`w-3.5 h-3.5 shrink-0 ${
          isUrgent ? "text-rose-400" : "text-zinc-400"
        }`}
      />
      <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-zinc-100">
        {formatTime(remainingSeconds)}
      </span>
    </Badge>
  );
}
