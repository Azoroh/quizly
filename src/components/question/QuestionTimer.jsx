import { useEffect } from "react";
import { formatTime } from "../../utils/formatTime";

export default function QuestionTimer({ remainingSeconds, dispatch }) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "tickTock" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="flex items-center gap-2 self-start sm:self-auto bg-black/30 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
      <span className="material-symbols-outlined text-primary text-[18px]">
        schedule
      </span>
      <span className="font-headline font-bold text-primary tracking-tight text-xs sm:text-sm">
        {formatTime(remainingSeconds)}
      </span>
    </div>
  );
}
