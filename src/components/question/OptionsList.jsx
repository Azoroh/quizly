import { useQuiz } from "@/context/QuizContext";
import { Check, X } from "lucide-react";

const letters = ["A", "B", "C", "D"];

export default function OptionsList() {
  const {
    answer,
    dispatch,
    curQuestion: { options = [], correctOption } = {},
  } = useQuiz();

  const hasSelected = answer !== null;

  return (
    <div className="grid grid-cols-1 gap-2 mb-6">
      {options?.map((option, i) => {
        const isSelected = answer === i;
        const isCorrect = correctOption === i;

        let stateClasses =
          "bg-zinc-950/50 border-zinc-900 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/50 cursor-pointer";
        let badgeClasses = "bg-zinc-900 border border-zinc-800 text-zinc-400";
        let Icon = null;

        if (hasSelected) {
          if (isCorrect) {
            stateClasses =
              "bg-zinc-900 border-zinc-700 text-zinc-100 font-medium";
            badgeClasses = "bg-zinc-800 border border-zinc-600 text-zinc-100";
            Icon = (
              <Check className="w-3.5 h-3.5 text-zinc-300 ml-3 shrink-0" />
            );
          } else if (isSelected && !isCorrect) {
            stateClasses =
              "bg-zinc-950/30 border-zinc-900 text-zinc-500 opacity-60";
            badgeClasses = "bg-zinc-950 border border-zinc-900 text-zinc-700";
            Icon = <X className="w-3.5 h-3.5 text-zinc-600 ml-3 shrink-0" />;
          } else {
            stateClasses =
              "bg-zinc-950/20 border-zinc-900/50 text-zinc-600 opacity-30 cursor-not-allowed";
            badgeClasses =
              "bg-zinc-950/40 border border-zinc-900 text-zinc-700";
          }
        }

        return (
          <button
            key={i}
            type="button"
            onClick={() => {
              !hasSelected && dispatch({ type: "selectAnswer", payload: i });
            }}
            disabled={hasSelected}
            className={`flex items-center text-left p-3 rounded-lg border transition-all w-full text-xs sm:text-sm ${stateClasses}`}
          >
            <div
              className={`flex items-center justify-center size-6 rounded font-mono text-xs mr-3 shrink-0 ${badgeClasses}`}
            >
              {letters[i]}
            </div>

            <span className="flex-1 leading-relaxed">{option}</span>

            {Icon}
          </button>
        );
      })}
    </div>
  );
}
